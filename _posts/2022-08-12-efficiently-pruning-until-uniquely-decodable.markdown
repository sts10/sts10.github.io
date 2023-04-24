---
layout: post
title: "Schlinkert Pruning: Making a word list uniquely decodable with minimal cuts"
date: 2022-08-12 17:00:00 -0400
comments: true
---

Earlier this summer, [I wrote about uniquely decodable codes](https://sts10.github.io/2022/06/27/revisiting-prfix-codes.html).

To re-cap, we're, as usual, talking about word lists that can be used to create passphrases. I've been working on [a tool that aids in the creation of these lists](https://github.com/sts10/tidy) and been making [some word lists of my own](https://github.com/sts10/generated-wordlists).

## Uniquely decodable lists

One interesting quality that some word lists have is they're "uniquely decodable". That means that if you pick words and concatenate them (like `efficientsliderrented`), they can only be "read" or "decoded" in one way -- the way they were assembled.

As an example: the word list "news" "newspaper" and "paper" is NOT uniquely decodable. To see why, let's say we have the "message" "newspaper". Interestingly, we wouldn't be able to tell if "newspaper" is a combination of the two word "news" + "paper" or the word "newspaper". You can think of this as an ambiguity.

In contrast, let's say our list was the word "news", "newspaper" and "elephant". Now, if we got the "message' "newspaper", we'd know, unambiguously it's the word "newspaper". In fact, we'd be able to read (or decode) _any_ combination of words from this 3-word list without ambiguity. This is because "news", "newspaper" and "elephant" is a **uniquely decodable code**.

## How can we know if a code is uniquely decodable?

You might be wondering how I knew "news", "newspaper" and "elephant" was uniquely decodable. I know of three basic ways that prove a given code is uniquely decodable. If one of the following 3 conditions are met, you know you have a uniquely decodable code:

* All the words are the same length OR
* None of the words are "prefixes" of any other words on the list OR
* None of the words are "suffixes" of any other words on the list

For "news", "newspaper" and "elephant", we're a "no" on number 1 (the words are all different lengths), and we're a "no" on number 2, since "news" is a prefix of "newspaper"; But we're saved by option 3: None of the words are suffixes of other words on the list. Thus, it's uniquely decodable.

### Are there other ways to verify that a code in uniquely decodable?

What if a list fails all three of the above criteria? It actually still could be uniquely decodable. Consider the list:

```text
101
00
0001
1
```

Clearly not all the same length. And "1" is a prefix of "101" and a suffix of "0001". And yet! This list is uniquely decodable.

To _know_ this, we can play with some examples, like "110100001101".

* It starts with a 1, so we know the first "word" is either "101" or "1"
* The second digit it "1", so that "1" in the first person must be the word "1".
* Now we're looking at digits 2 and on... we see that digits 2 through 4 are "101", which can only be word "101"
* Next, we're got a lot of 0s: 4 of them. This could only be "00" twice.
* Coincidentally, we finish how we start: "1" + "101"

Giving us a "decoded" message of: `1 101 00 00 1 101`. I argue that there's no _other_ way to decode this message.

### Implications of this example

This example shows that the three procedures I outlined above are NOT sufficient for determining whether a code is uniquely decodable. And, we hope, this so-far-unknown procedure (or procedures) may preserve more words when making a code uniquely decodable.

<!-- Let's tackle the first issue first. We need a procedure for checking if a given code is uniquely decodable or not -- this procedure should output a "yes" or "no". (We can't, realistically, check every possible message!) -->

### The Sardinas–Patterson algorithm

Back in 1953, August Albert Sardinas and George W. Patterson published an algorithm now called Sardinas–Patterson algorithm.

[From Wikipedia](https://en.wikipedia.org/wiki/Sardinas%E2%80%93Patterson_algorithm):

> In coding theory, the Sardinas–Patterson algorithm is a classical algorithm for determining in polynomial time whether a given variable-length code is uniquely decodable, named after August Albert Sardinas and George W. Patterson, who published it in 1953. The algorithm carries out a systematic search for a string which admits two different decompositions into codewords. As Knuth reports, the algorithm was rediscovered about ten years later in 1963 by Floyd, despite the fact that it was at the time already well known in coding theory.

I learned about it from [a helpful Redditor who pointed to it answer to a question of mine](https://www.reddit.com/r/informationtheory/comments/vnretf/comment/iecfbxz/).

I won't lie, I had some trouble understanding the algorithm or how to implement it in code. Before we get to my amateur attempt at an explanation, here are [two](https://www.youtube.com/watch?v=SkrLnr-KVOE) different [videos](https://www.youtube.com/watch?v=8YNEVyHCIjs) where presenters more qualified than me walk through the algorithm by hand.

#### My amateur summary of how the Sardinas-Patterson algorithm does
Here is what I have gathered:

In broad strokes, the algorithm involves repeatedly finding "dangling suffixes" between words on the initial list: the left over from removing a prefix word from a word. An example is if a list has "accident" and "accidental" on it, a dangling suffix would be "al". We then check if any of these dangling suffixes are on the list as words ("al" likely isn't, but "accident" and "accidentally" gives a dangling suffix of "ally", which we could imagine could be on the list).

If any of these dangling suffixes _ARE_ on the original list, we now know the list is NOT uniquely decodable. This makes sense to me: we're basically cutting words in half and seeing if they make two words that are also on the list (a problem for unique decodability!). But that's just the first iteration. Next, we add these dangling suffixes to the (original) list and make _more_ dangling suffixes from this _new_ list. Then we again check _these_ latest dangling suffixes against the original list. Again: any overlap means the list is not uniquely decodable.

A list is uniquely decodable by this method only if, after repeating this process **infinitely**, there's never a dangling suffix that is also on the original list. As you might expect, things get a bit... math-y once we throw in infinity, but \* waves hands \* math!

For me, I needed to see it in code, so this [Jupyter Notebook](https://github.com/danhales/blog-sardinas-patterson/blob/master/index.ipynb) and [blog post](https://towardsdatascience.com/the-sardinas-patterson-algorithm-in-simple-python-9718242752c3) by Dan Hales helped me get start writing a Rust implementation.

### My code

Here's [my Rust implementation](https://github.com/sts10/tidy/blob/main/src/display_information/uniquely_decodable.rs), closely adapted from Hales' Python.

The public function in my module is a function called `check_decodability`. It takes a word list and returns a boolean: `true` for uniquely decodable, `false` for not.

And... drumroll... the function returns `true` when given `["101", "00", "0001", "1"]`.

## How can we _make_ a not uniquely decodable code uniquely decodable, while preserving the most amount of words from the original list?

No doubt it's powerful to be able to tell if a given list in uniquely decodable. (We're going to need that later!) But what I'm really after is an "algorithm to remove the fewest number of code words to make a given list uniquely decodable." This is because we want to preserve the most number of words for our long list of words to make passphrases from -- a longer list means (theoretically) stronger passphrases.

To get a better understanding of how this connects to passphrases, let's work through another example.

As part of a separate project, I created [a word list of 18,250 words](https://github.com/sts10/generated-wordlists/blob/main/lists/basic.txt). It's important to note that this list is NOT uniquely decodable.

What if we wanted to make this list uniquely decodable? We're going to have to eliminate some words from the list. Let's assume that all 18,250 are pretty good words for passphrases, like "canal phrase disrupted trappings coincides translator".

This six-word passphrase, like all six-word passphrases generated from a list of 18,250 words, has almost 85 bits of entropy. Every word we cut from the list decreases this number. So in order to keep passphrases generated from list strong, we want to **eliminate the fewest number of words possible**. With that goal in mind, how should we go about picking which words to remove?

* The most common word length on the list is 5 characters. We could eliminate all words that are not 5 characters. This would leave 1,802 words on the list. Not great.
* We could remove all prefix words. This would leave 13,312 words.
* We could remove all suffix words. This would leave 15,959 words on the list.

If we want to preserve the most words from the original list (again, to keep passphrases strong), it looks like, in this list's particular case, we'd go with removing suffix words.

But we learned earlier that there are lists that are uniquely decodable but don't follow any of these procedures. Thus, I posit there must be another way to make a list uniquely decodable beyond these three procedures.

So to recap: what we're after is some sort of procedure that makes a list uniquely decodable, while removing fewer words than any of the three strategies outlined above.

## A first attempt

I figured looking at, and potentially modifying, the Sardinas-Patterson code would be a good place to start exploring.

At the very end of the Sardinas-Patterson algorithm's process, there's a point where you compare a set of dangling suffixes with the original list. If there's any overlap, you've got a NOT uniquely decodable list. But if there's no overlap (or, in set theory, the sets are ["disjoint"](https://en.wikipedia.org/wiki/Disjoint_sets)), the original list is uniquely decodable.

Here's what that step looks like in my Rust code:

```rust
fn sardinas_patterson_theorem(c: HashSet<String>) -> bool {
    let c_infinity = generate_c_infinity(c.clone());
    c.is_disjoint(&c_infinity)
}
```

So I figured, why not run the entire Sardinas-Patterson algorithm up until that point. Then, instead of returning a boolean (true/false), return the intersection (overlap) of the two sets, which will, by definition, be some subset of words on our original word list. What if we then just... removed those words from the original list?

```rust
pub fn get_sardinas_patterson_final_intersection(c: &[String]) -> Vec<String> {
    // Right off the bat, convert inputted Slice to a HashSet
    let c = vec_to_hash(c);
    let c_infinity = generate_c_infinity(c.clone());
    // We want to collect a list of words that "caused" the Sardinas-
    // Patterson algorithm to determine that this list was not
    // uniquely decodable.
    // If the given list is in fact uniquely decodable,
    // this list of words will be empty, which is what we want.
    // If there are words in the list, we'll
    // remove these from the final list.
    c.intersection(&c_infinity)
}
```

Then we can run this new, modified list through the Sardinas-Patterson again and see if it's now uniquely decodable. And if it is, maybe the number of words we removed along the way will be less than the other three options outlined above.

(Spoiler alert: This is the method I went with. You can find this procedure implemented in Rust code in context of a larger tool, Tidy, [here](https://github.com/sts10/tidy/blob/main/src/sardinas_patterson_pruning.rs).)

## Schlinkert pruning: Preliminary results

Amazingly, this pruning procedure seems to work for the handful of word lists I've tried it on, in that the resulting lists are uniquely decodable, at least according to my implementation of Sardinas-Patterson.

Not only that, but the procedure seems to preserve more words than the three procedures outlined above. Here we can compare it to removing prefix words and suffix words:

|           | length | prefix-free | suffix-free | Schlinkert-pruned |
|-----------|:------:|:-----------:|:-----------:|:-----------------:|
| 1Password | 18176  |    15076    |    15727    | 15841             |
| Niceware  | 65536  |    52276    |    54430    | 54959             |
| basic.txt | 18250  |    13312    |    15958    | 16291             |

Interestingly, the resulting list includes prefix words and suffix words, and obviously has different word lengths (the technical term is [variable-length code](https://en.wikipedia.org/wiki/Variable-length_code)).

For lack of a better term for now, I'm calling this removal procedure "Schlinkert pruning," after myself.

## Limitations

* I (still) don't know if this is _the_ optimal procedure for preserving words. (Or even if it always preserves more words than the other procedures.) In other words, some other procedure, known or unknown to me, may preserve more words from the original list.
* I don't know that running this procedure on any list _guarantees_ you'll get a uniquely decodable list as a result.

To answer either of these two questions, it feels like I'd need to use some math that I don't know just yet. Maybe someone between 1953 and now has already figured all this out! Let me know if you know any ideas that could help!

<!-- ### 2023 Update: The strange case of BIPS39 -->

<!-- I just tried Schlinkert pruning [the BIPS39 English word list](https://github.com/bitcoin/bips/blob/master/bip-0039/english.txt). It's got 2,048 words on it. Schlinkert pruning this list gives us 1914 words. BUT what's strange is that removing all prefix words save 1999 words! A head-scratcher! I kind of thought this situation wasn't possible. Perhaps users would be wise to Schlinkert prune, remove all prefix words, and remove all suffix words, and then see which process saves the most words. -->

## Trying it out yourself

You can play with the procedure yourself by [installing Tidy](https://github.com/sts10/tidy#installation). To see if a given list is uniquely decodable or not, use 4 attributes flags (`-AAAA`). To perform "Schlinkert pruning" on the given list, use the option `-K` (or `--schlinkert-prune`).

Again, [here's my code file with the pruning functions on GitHub](https://github.com/sts10/tidy/blob/main/src/sardinas_patterson_pruning.rs).

## A new word list

As a further experiment, I created [a new long word list using this pruning technique](https://github.com/sts10/generated-wordlists/blob/main/lists/experimental/ud1.txt).

In fact, this list is just about **the best list I can produce at the moment**.

* Its initial data source, like many of my word lists, is from [my Google Book Ngram scraping project](https://github.com/sts10/common_word_list_maker). It takes (approximately) the 25,000 most-used words as a starting point.
* From that raw input, it filters out a number of profane words, awkward words, words that are _too_ common (e.g. "she" and "also") and some British spellings of English words (like "favour" and "theatre").
    * It also filters out any words not found in `/usr/share/dict/words` (this is a bit of controversial choice, but I find that it helps weed out a lot of "words" we definitely don't want, but would take too long to find one-by-one).
* It then uses this new "Schlinkert pruning" method I've described above to make the list uniquely decodable while cutting a minimal amount of words.
* By tweaking the number of words taken from the Google Ngram data, I orchestrated the list to be exactly 17,576 words. Why 17,576 words? That list length means the list just barely clears what I call [the brute force line](https://github.com/sts10/tidy#the-brute-force-line). At 17,576 words, the list is the longest it can be while still including 3-character words and not being more susceptible to a brute-force _letter_ attack than a brute-force _word_ attack (assuming no word separators are used).

Here are some (more) attributes of the list:

```text
List length               : 17576 words
Mean word length          : 8.01 characters
Length of shortest word   : 3 characters (add)
Length of longest word    : 15 characters (vulnerabilities)
Free of prefix words?     : false
Free of suffix words?     : false
Uniquely decodable?       : true
Entropy per word          : 14.101 bits
Efficiency per character  : 1.761 bits
Assumed entropy per char  : 4.700 bits
Above brute force line?   : true
Above Shannon line?       : false
Shortest edit distance    : 1
Mean edit distance        : 7.942
Longest shared prefix     : 14
Unique character prefix   : 15
```

And some pseudorandomly generated sample passphrases from the list:
```text
sweeping relocated contradictory ornamented conscience complexion
publicity assesses trunk penetrates warden literature
undated acknowledgement histories performances scan conceit
succeeding contains grievous motivated minimize definitively
triumphed sleeping proven sadly algorithms rendered
```

### A new _diceware_ word list

I also made [a 7,776-word diceware list using this procedure](https://github.com/sts10/generated-wordlists/blob/main/lists/experimental/diceware-ud.txt).
```text
List length               : 7776 words
Mean word length          : 7.06 characters
Length of shortest word   : 3 characters (add)
Length of longest word    : 10 characters (worthwhile)
Free of prefix words?     : false
Free of suffix words?     : false
Uniquely decodable?       : true
Entropy per word          : 12.925 bits
Efficiency per character  : 1.830 bits
Assumed entropy per char  : 4.308 bits
Above brute force line?   : true
Above Shannon line?       : false
Shortest edit distance    : 1
Mean edit distance        : 6.962
Longest shared prefix     : 9
Unique character prefix   : 10

Pseudorandomly generated sample passphrases
-------------------------------------------
acquire pit tobacco religion revenues appearing
enabled pressures directory enable excel occurring
compare prohibited parties managing learns accepting
universal theme orderly furniture securities declined
youthful deficits hazard issuing disciple creek
```

## Links

You can find [more word lists I've created](https://github.com/sts10/generated-wordlists), or [learn more about Tidy](https://github.com/sts10/tidy), the tool I wrote to make creating these word lists easier.
