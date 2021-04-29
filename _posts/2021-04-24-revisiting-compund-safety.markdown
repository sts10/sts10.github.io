---
layout: post
title: "Revisiting Compound Safety"
date: 2021-04-24 08:26:00 -0400
comments: true
---

Back in 2018 I wrote [a Rust script](https://github.com/sts10/compound-passphrase-list-safety-checker) and [corresponding blog post](https://sts10.github.io/2018/05/05/compound-passphrase-list-safety-checker.html) about a concept involving passphrase word lists that I imagined and then named "compound safety".

Basically, a passphrase word list is "compound-safe" (that is, it's safe to join words without punctuation or spaces) if it does NOT contain any pairs of words that can be combined such that they can be guessed in two distinct ways within the same word-length space. This includes instances in which two words can be combined and form another word on the list.

I heard of this potential issue in [this YouTube video](https://youtu.be/Pe_3cFuSw1E?t=8m36s). 

## Brief examples of compound safety violations

**Example #1**: If a word list included "under", "dog", and "underdog" as three separate words, it would NOT be compound-safe, since "under" and "dog" can be combined to make the word "underdog". A user not using spaces between words might get a passphrase that included the character string "underdog" as two words, but a brute-force attack would guess it as one word. Therefore this word list would NOT be compound-safe. (I refer to this as a "compounding".)

**Example #2**: Let's say a word list included "paper", "paperboy", "boyhood", and "hood". A user not using punctuation between words might get the following two words next to each other in a passphrase: "paperboyhood", which would be able to be brute-force guessed as both `[paperboy][hood]` and `[paper][boyhood]`. Therefore this word list would NOT be compound-safe. 

Another way to think about example 2: if, for every pair of words, you mash them together, there must be only ONE way to split them apart and make two words on the list. This is how I approached the issue when writing the code for CSafe: Mash all pairs of words, (1) check if combined word in on the list, (2) iterate through each character of mashed_word checking each split, though forgiving the original split.

Note that putting any punctuation between words in your passphrases, as 1Password requires of users, negates this issue.

## CSafe, my new code 

Inspired by some tweets I saw recently, I decided to take a fresh look at this project, having 3 more years of Rust experience under my belt. The result is [CSafe](https://github.com/sts10/csafe). 

CSafe makes a number of **improvements** over [my original checker](https://github.com/sts10/compound-passphrase-list-safety-checker). First off, I think it's all more readable that my original checker code, which I wrote when I was newer to Rust. CSafe also has some basic tests and benchmarks.

But more importantly for end-users, CSafe is more considerate about which words it discards when making a compound-safe version of the inputted word list. For example, given [a version of the word list 1Password once used](https://github.com/sts10/csafe/blob/main/word_lists/agile_words.txt), it was able to [save 16,789](https://github.com/sts10/csafe/blob/main/word_lists/agile_words.txt.csafe) of the original list of 18,328 words. The original checker only saved 16,103 words. (And [removing all prefix words, the more "nuclear" option, leaves you with just 15,190 words](https://github.com/sts10/prefix-safety-checker/blob/master/word_lists/agile_words.txt.no-prefix).) 

### Speeding it up

CSafe is faster than the original checker on lists of equal length, especially on longer lists. On my machine, CSafe takes about 73 seconds to get through the 1Password word list (18k words) (`time csafe agile.txt`). My old compound checker takes 35 minutes to process the same list.

What's the magic sauce? Here, a big thanks to [Wesley Moore](https://github.com/wezm), who provided [two key pull requests](https://github.com/sts10/csafe/pulls?q=is%3Apr+is%3Aclosed+author%3Awezm) that boosted the speed of the program by some multiples. 

[One of these PRs](https://github.com/sts10/csafe/pull/2) has the program make use of [Fx Hash](https://github.com/cbreeden/fxhash) rather than a regular old Vector. Fx Hash is even faster at look-ups that a regular Rust HashSet, though it's not cryptographically secure (we don't care about that here). This sped the benchmark up by about 8x.

[The other pull request from Moore](https://github.com/sts10/csafe/pull/3) deals with variable allocation in the crucial `find_unsafe_words` function. I don't _quite_ understand it yet, so I'll just point you to [Moore's helpful explanation](https://github.com/sts10/csafe/pull/3#issuecomment-826252236). Basically we want to be careful how we concatenate strings within nested loops. 

So rather than re-allocate `mashed_word` in each inner loop, as I was doing before, we're going to declare it before the first loop, then, when we need to use it, `clear` it and then `push_str` to it to do the actual word concatenation ("mashing"). This allows us to avoid creating any new Strings within the inner loop.

```rust
    let mut mashed_word = String::new();
    for root_word in list {
        // ...
        for second_word in list {
            mashed_word.clear();
            mashed_word.push_str(root_word);
            mashed_word.push_str(second_word);
            for i in 0..mashed_word.len() {
                // more work
```

Update: With a few other tricks -- mostly removing a check for empty words in the inner loop -- I've actually now gotten the agile words time down to about 60 seconds. 

## How the actual program works

While the above sections looks at some of the recent changes that helped speed up the program, below are some hints to understanding how the rest of the program works.

### What's a "Contender"?

CSafe's `find_unsafe_words` function returns a `Vec<Contenders>`, a Vector of structs called Contender. Basically, each contender represents a problem with compound safety. Each struct has either 3 or 4 words. I call them "Contenders" because, for each Contender struct, one of the 3 or 4 words must be removed for the list to become compound-safe. 

Here's an example of a contender from the 1Password list. 

```rust
Contender { root_word: "pew", second_word: "terrain", head: "pewter", tail: "rain" }
```

How many ways can we split `pewterrain` and make two words from the word list? It should be exactly one, but here there are two ways: `pew|terrain` and `pewter|rain`. To solve this problem, we need to remove at least one of the four words. For example, if we remove "rain", this issue goes away: combining pew and terrain is the only way to make `pewterrain`.

But how should we choose which of the four words to remove? 

### Removing the fewest number of words to make a compound-safe list

Ideally, the program would remove the fewest words from the original list to produce the new, compound-safe list. My old code made a small effort to optimize for this, but CSafe takes this a bit further. What we want to do is remove the word that is in the most _other_ contenders. So to return to our previous example, if "pew" is in 4 other Contender structs, "terrain" is in 2 other Contender structs, "pewter" is in 0 other Contender structs, and "rain" is in 6 other Contender structs, we want to remove "rain". That way, we "solve" 7 Contenders but only lose one word from the original list.

This work happens in the `find_fewest_words_to_remove` function. 

First, the program makes a flat Vector containing all of the words in all of the Contenders:

```rust
let mut flat_vec = vec![];
for contenders in &unsafe_words {
    flat_vec.push(contenders.root_word.to_string());
    flat_vec.push(contenders.second_word.to_string());
    flat_vec.push(contenders.head.to_string());
    if contenders.tail != "" {
        flat_vec.push(contenders.tail.to_string());
    }
}
```

Next, we're going to make a HashMap where each key is a word and each value is the number of times that word appears in the `flat_vec`. (This has been a super useful Rust pattern for me to have in my tool kit!).

```rust
let mut counts_hashmap: HashMap<String, usize> = HashMap::new();
for word in &flat_vec {
    counts_hashmap
        .entry(word.to_string())
        .and_modify(|count| *count += 1)
        .or_insert(1);
}
```

Next, we iterate through every Contenders struct. We check if any of its words are already in our `words_to_remove` HashSet. If not, we search for the highest scoring word in the Contender struct, and then insert that into the `words_to_remove` HashSet.

Finally, we actually remove these words, sort it, and send it back

```rust
pub fn make_clean_list(
    words_to_remove: FxHashSet<String>,
    original_list: &FxHashSet<String>,
) -> Vec<String> {
    let mut clean_words = original_list
        .difference(&words_to_remove)
        .map(|s| s.to_owned())
        .collect::<Vec<_>>();
    clean_words.sort();
    clean_words
}
```

To be printed to a new file.

## Dealing with characters with accents

As described above, the way that CSafe finds problems is by mashing two words together, then checking if that `mashed_word` can be create in more than one way, using words on the list. 

To do this, the program has to iterate through each character of `mashed_word`. Originally, I did that like this:

```rust
for i in 0..mashed_word.len() {
    // set-up work
    let head = &mashed_word[0..i];
    let tail = &mashed_word[i..mashed_word.len()];
    // Check head and tail
}
```

This worked fine, until I tried running the program on a word list that had words with accented letters in them. In one test, I had the words "meal" and "clichés" on a list. When the program tried to iterate through that mashed_word, I got this error:

```
thread 'main' panicked at 'byte index 10 is not a char boundary; it is inside 'é' (bytes 9..11) of `mealclichés`'
```

As I understand it, the character 'é' takes up more than one byte, unlike most "normal" characters. When you blindly iterate through each byte of a word, you _usually_ get one character per iteration. But when you hit 'é', Rust gets confused -- it's trying to iterate with just half of the 'é' character.

If you to play with this yourself, here's code you can paste into a playground:

```rust
fn main() {
    let word = "clichés";
    for i in 0..word.len() {
        println!("{}", &word[0..i]);
    }
}
```

On the other hand, running

```rust
for c in word.chars() {
    println!("{}", c);
}
``` 

prints each character successfully and as you would expect, no errors.

At this point I thought the `char()` method was what I needed to use. So I tried: 

```rust
for (i, _c) in word.chars().enumerate() {
    println!("{}", &word[0..i]);
}
```

But that trips the same character-boundary error that my original code hits. 

Eventually, mostly through trial and error, I used [String's `get` method](https://doc.rust-lang.org/std/string/struct.String.html#method.get) to do what I wanted: 

```rust
let head = match mashed_word.get(0..i) {
    Some(head) => head,
    None => continue,
};
let tail = match mashed_word.get(i..mashed_word.len()) {
    Some(tail) => tail,
    None => continue,
};
```

What's a little strange to me is that: OK, when the `get` returns a `None` we `continue` the `for` loop to the next `i` (byte). What I was worried would happen in that that skip would mean we'd never get a real 'é' in the `head` or `tail` variable. We'd only get the second byte -- which would be some _other_ character -- maybe a plain old 'e'. But that doesn't seem to the be the case. 

Here's the test I wrote to convince me this approach was sound.

```rust
#[test]
fn can_find_unsafe_words_with_accents() {
    let word_list = [
        "cliché", "éspirit", "spirit", "clich", "passé", "dog", "meal",
    ]
    .iter()
    .map(|&s| s.to_owned())
    .collect();
    let mut unsafe_words_contenders = find_unsafe_words(&word_list, false);
    unsafe_words_contenders.sort_by(|a, b| a.root_word.cmp(&b.root_word));
    let contenders_should_find = vec![
        Contenders {
            root_word: "clich".to_string(),
            second_word: "éspirit".to_string(),
            head: "cliché".to_string(),
            tail: "spirit".to_string(),
        },
        Contenders {
            root_word: "cliché".to_string(),
            second_word: "spirit".to_string(),
            head: "clich".to_string(),
            tail: "éspirit".to_string(),
        },
    ];
    assert_eq!(unsafe_words_contenders, contenders_should_find);
}
```

which passes.

### A general solution for iterating through Strings in Rust? 

I don't have a grand general solution for iterating through Strings like `mashed_word` at this point. But I did learn to write test for accented characters, and be wary of assuming each character is one byte.
