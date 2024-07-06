---
layout: post
title: "Sorting a word list by word length and then alphabetically"
date: 2024-07-05 20:00:00 -0400
comments: true
---

I recently learned about a secrets manager called [Passbolt](https://www.passbolt.com/). Given my interest in word lists, I asked [them on Mastodon](https://mastodon.social/@passbolt) if they use one. They promptly replied that, yes, they do, and provided me with [the GitHub URL to their word list](https://github.com/passbolt/passbolt_styleguide/blob/master/src/shared/lib/SecretGenerator/PassphraseGeneratorWords.js).

As is common, they seem to be using the [EFF long list](https://www.eff.org/dice). What was more interesting to me, as a possible contributor, was that, for whatever reason, they sort the list by word length, and then alphabetically. In other words, all the 9-letter words are placed at the top, sorted alphabetically, then the 8-letter words, and so on.

```text
"abdominal",
"acclimate",
"accompany",
"activator",
"acuteness",
"aerospace",
// ...
"zigzagged",
"zookeeper",
"zoologist",
"abnormal",
"abrasion",
"abrasive",
// ...
"zap",
"zen",
"zit"
```

I toyed with the idea of opening a PR suggesting [my Orchard Street Diceware list](https://github.com/sts10/orchard-street-wordlists) as a replacement. But in order to make this PR match their sorting method, I needed to write some code. (I of course first trying running a series of Vim commands, but I couldn't figure it out.)

Since I already have [a word list manipulation tool written in Rust](https://github.com/sts10/tidy), I figured I'd go ahead and add it as a feature to that program, since I might need to sort lists like this again, or some other user of the tool might appreciation the feature.

## A naive, twice-sorting approach
I'm not a computer science student, so I don't know much about the ins and outs of different approaches to sorting and the different results you may get. But apparently, you can get this desired order by first sorting the inputted words alphabetically, and _then_ by word length.

```rust
/// Sort by word length, with longest words first. First sorts word alphabetically, respecting
/// inputted locale. Since the latter sort is a stable sort, I think this should work.
pub fn sort_by_length(list: Vec<String>, locale: Locale) -> Vec<String> {
    // First, sort words alphabetically, respecting locale
    let mut list = sort_alphabetically(list, locale);
    // Now sort by word length, putting longer words first.
    list.sort_by(|word_a, word_b| word_b.len().cmp(&word_a.len()));
    list
}
```

However, this requires the second sort to be a "stable sort." From [a popular Stack Overflow answer](https://stackoverflow.com/a/1517824) I just found:

> A sorting algorithm is said to be stable if two objects with equal keys appear in the same order in sorted output as they appear in the input array to be sorted.

This is a downside, since at a later time we might want to make the second sort an unstable sort, something we might want to do to speed the process up.

## Custom Ordering function
I figured it would be better to do both comparisons "at the same time". This led me to interrogate that little [`cmp`](https://doc.rust-lang.org/std/cmp/) method and see how to open it up for more customization or replace it with something lower level.

I landed on this solution, where I defined a helper function that returns an [`Ordering`](https://doc.rust-lang.org/std/cmp/enum.Ordering.html) enum just how I want it.

```rust
/// Sort by word length, with longest words first. For words of equal length, sorts
/// word alphabetically, respecting inputted locale.
pub fn sort_by_length(list: Vec<String>, locale: Locale) -> Vec<String> {
    let mut options = CollatorOptions::new();
    options.strength = Some(Strength::Secondary);
    let collator: Collator = Collator::try_new(&locale.into(), options).unwrap();

    let mut list = list;
    list.sort_by(|word_a, word_b| compare_by_length_then_alphabetically(word_a, word_b, &collator));
    list
}

use std::cmp::Ordering;
/// Returns an `Ordering` enum based on `word1` and `word2`'s word length 
/// (character count), and then alphabetically, respecting the given collator
fn compare_by_length_then_alphabetically(
    word1: &str,
    word2: &str,
    collator: &Collator,
) -> Ordering {
    // Compare on word length first
    match count_characters(word2).cmp(&count_characters(word1)) {
        Ordering::Greater => Ordering::Greater,
        Ordering::Less => Ordering::Less,
        // if equal length, compare alphabetically with locale-aware collator
        Ordering::Equal => collator.compare(word1, word2),
    }
}
```

## A more concise version
Thanks to [a Fediverse friend](https://mastodon.online/@latk), we were able to make this code more concise by using [`then_with`](https://doc.rust-lang.org/std/cmp/enum.Ordering.html#method.then_with), which allows us to "chains the ordering with the given function." I couldn't quite get a handle on this at first, but with some more help here's what it looks like:

```rust
/// Sort by word length, with longest words first. For words of equal length, sorts
/// word alphabetically, respecting given locale.
pub fn sort_by_length(list: Vec<String>, locale: Locale) -> Vec<String> {
    let mut options = CollatorOptions::new();
    options.strength = Some(Strength::Secondary);
    let collator: Collator = Collator::try_new(&locale.into(), options).unwrap();

    let mut list = list;
    // Order by count_characters(w) descending, then within that,
    // alphabetically
    list.sort_by(|word1, word2| {
        count_characters(word2)
            .cmp(&count_characters(word1))
            .then_with(|| collator.compare(word1, word2))
    });
    list
}
```

This more concise solution seems to work just as well as the second solution, so let's use it! [Here it is in the project, Tidy](https://github.com/sts10/tidy/blob/main/src/list_manipulations.rs#L35-L52). 

But I did want to paste that second, longer solution somewhere I could find it later if I needed to get down into the nitty gritty of writing a helper function that returns an Ordering enum again.

## Epilogue

I did end up submitting [a PR to the relevant Passbolt repository, proposing my Orchard Street Diceware list, nicely sorted](https://github.com/passbolt/passbolt_styleguide/pull/39), but they want me to sign a Contributor License Agreement (CLA), and I'm still mulling over whether to sign it. But at least we got a new feature for Tidy out of this little adventure!
