---
layout: post
title: "Introducing Phraze, a passphrase generator"
date: 2023-10-23 20:00:00 -0400
comments: true
---

I wrote a random passphrase generator command-line tool! I'm calling it [Phraze](https://github.com/sts10/phraze).

```
$ phraze
northern-ruined-recruited-profound-vectors-drive-bringing
```

By default, it uses my [Orchard Street Medium list](https://github.com/sts10/orchard-street-wordlists#orchard-street-medium-list), but users have their choice of most of the other [Orchard Street lists](https://github.com/sts10/orchard-street-wordlists).

## Why I hadn't written a passphrase generator this before
Despite having written [a tool to create passphrase word lists](https://github.com/sts10/tidy) and later [my own passphrase word lists](https://github.com/sts10/orchard-street-wordlists), I had been hesitant to write my own passphrase generator. Why? Because I was worried about writing a real security tool. And there already is [a relatively popular one written in Rust called Pgen](https://github.com/ctsrc/Pgen) and Michah Lee's [passphraseme](https://github.com/micahflee/passphraseme). 

But I figured it'd be fun to try! And that the tool wouldn't get much _real_ use before it had been combed over by well-informed users looking for security issues. And I figured it might be a good way to spread my Orchard Street Wordlists.

## When would you use a standalone, command-line passphrase generator?

Usually when I generate a passphrase or password, I put it right into my password manager. As you would guess, it makes sense for password managers to include password and passphrase generators, and thus many do.

So what use does a tool like Phraze serve? Honestly I'm not totally sure. And maybe there's a reason I haven't found [a passphrase generator with over 300 stars on GitHub](https://github.com/topics/passphrase-generator). 

But if there's a password you DON'T want to put in your password manager for whatever reason, you'd likely want it to be one you could memorize or write on a piece of paper with accuracy. For those two use-cases, I think passphrases made up of words serve better than a shorter string of random characters. One example might be for things like Bitcoin wallets, which I believe [uses a short word list](https://github.com/bitcoin/bips/blob/master/bip-0039/english.txt). But I don't know if even I am ready to trust Phraze for something like that?

## Some feature creep, as a treat
That said, as a result of these worries, I very much wanted to try to keep the Rust code simple and straight-forward.

But over the hours I couldn't resist and kept adding features. Word list choice, word separator choice, set minimum entropy... with the result that the it's up to 182 lines of Rust.

As an example, here's the core `generate_passphrase` function, which itself has gotten a little longer and more complex than I'd like:

```rust
/// Actually generate the passphrase, give a couple necessary parameters.
pub fn generate_passphrase(
    number_of_words: Option<usize>,
    minimum_entropy: Option<usize>,
    separator: &str,
    title_case: bool,
    list_to_use: List,
) -> String {
    // Make our word list based on user choice
    let list = make_list(list_to_use);

    let number_of_words =
        calculate_number_words_needed(number_of_words, minimum_entropy, list.len());

    let mut rng = thread_rng();
    // Create a blank String for our passphrase
    let mut passphrase = String::new();
    for i in 0..number_of_words {
        // Check if we're doing title_case
        let random_word = if title_case {
            make_title_case(&get_random_element(&mut rng, &list))
        } else {
            get_random_element(&mut rng, &list)
        };
        // Add random_word to our passphrase
        passphrase += &random_word;
        // Add a separator
        if i != number_of_words - 1 {
            passphrase += &make_separator(&mut rng, separator);
        }
    }
    passphrase.to_string()
}
```

## Non-features

In an effort to keep things simple and safe, I've resisted implementing a few features. (But we'll see if I cave and implement them soon!)

### Not letting users use their own word lists

One feature I haven't added yet is allowing the user to use any word list they want. This is mostly because I'm proud of the included Orchard Street Wordlists, but also that all of them are uniquely decodable, meaning that they are safe to use without a separator between words. I figure it's one less thing for a user to worry about.

However this is a bummer for users who want a passphrase in a different language. I could add a "custom word list" option and just assume that list is not uniquely decodable, so have the code not allow a lack of word separator.

### Can only generate one passphrase at a time

Currently, you can only generate one passphrase at a time with Phraze. I know other password/phrase generators allow users to ask for a certain number of passphrases at once. But that seems like a pretty niche feature to need? Is it word the extra lines of code and complexity?

## Despite these precautions... a bug that affected security

Obviously the crucial thing is for this program to do what it says on the tin: Give a passphrase of the desired entropy.

Here's how, in early versions, I read in word list files:

```rust
/// Read in the appropriate word list, given the enum of the desired list
fn make_list(list_to_use: List) -> Vec<&'static str> {
    match list_to_use {
        List::Medium => include_str!("../word-lists/orchard-street-medium.txt")
            .split('\n')
            .collect(),
        List::Long => include_str!("../word-lists/orchard-street-long.txt")
            .split('\n')
            .collect(),
        List::Qwerty => include_str!("../word-lists/orchard-street-qwerty.txt")
            .split('\n')
            .collect(),
        List::Alpha => include_str!("../word-lists/orchard-street-alpha.txt")
            .split('\n')
            .collect(),
        List::Eff => include_str!("../word-lists/eff-long.txt")
            .split('\n')
            .collect(),
    }
}
```

For some reason, these `split('\n')` calls, which I've used in the past, give one extra blank (`""`) string at the end of the returned Vector.

For Phraze, this is a pretty serious problem because it means that one "word" in every list is a blank list. Thus a user could ask for a 6-word passphrase and get what is effectively a 5-word passphrase if one of the words is the blank word.

This was a difficult bug to discover. And I even had trouble recreating it. But given the stakes, I had to fix it somehow.

### Fixing it

I could have written in a check for blank words, but that felt like treating the symptom rather than the underlying cause. And I knew that none of the included lists had any blank lines.

Thanks to some help from a Fediverse friend, I tried simply using the `lines()` method rather than `splt('\n')`. I believe that solves the problem.

```rust
/// Read in the appropriate word list, given the enum of the desired list
fn make_list(list_to_use: List) -> Vec<&'static str> {
    match list_to_use {
        List::Medium => include_str!("../word-lists/orchard-street-medium.txt")
            .lines()
            .collect(),
        List::Long => include_str!("../word-lists/orchard-street-long.txt")
            .lines()
            .collect(),
        List::Qwerty => include_str!("../word-lists/orchard-street-qwerty.txt")
            .lines()
            .collect(),
        List::Alpha => include_str!("../word-lists/orchard-street-alpha.txt")
            .lines()
            .collect(),
        List::Eff => include_str!("../word-lists/eff-long.txt").lines().collect(),
        List::Effshort => include_str!("../word-lists/eff-short-1.txt")
            .lines()
            .collect(),
        List::Mnemonicode => include_str!("../word-lists/mnemonicode.txt")
            .lines()
            .collect(),
    }
}
```

I'm guessing this function could be refined and refactored further, but I do like that it only reads in one list, not all of them.

## Wrap up

I enjoyed writing a Rust project from scratch! It had been a minute since I ran `cargo new --bin`! 

I'll probably keep making tweaks to Phraze, and maybe adding more features for a bit. Feel free to create Issues or Pull Requests! I'm sure there are more bugs in my code, but hopefully none that (drastically) affect the security of the produced passphrases.
