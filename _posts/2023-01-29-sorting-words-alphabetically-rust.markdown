---
layout: post
title: "How hard could it be? Sorting words alphabetically in Rust"
date: 2023-01-29 11:00:00 -0400
comments: true
---

One of the more basic things my wordlist-manipulating program, [Tidy](https://github.com/sts10/tidy/), does is to sort words alphabetically. By that I mean: given a wordlist, two of the few things it does by default is to (a) remove duplicate words and (b) alphabetize them. 

Removing duplicate words is critical to the security of the wordlist: If the word "apple" appears three times on a passphrase word list, it'll be three more times likely to appear in a user's passphrase, thus throwing off all the wonderful math of randomness that the passphrase system relies on. Alphabetizing, by contrast, isn't strictly necessary to the security of the end-product list. In fact, I at one point added an option to NOT sort the list (`-O`) (though duplicate words are still removed).

Following traditional Rust, here's [how Tidy 2.71 sorts the Vector of Strings that will become the outputted, tidied list](https://github.com/sts10/tidy/blob/233c627cab9392100a822de7071fa7642b9d2e2e/src/lib.rs#L302-L305):

```rust
// Finally, sort list alphabetically, if the user didn't override this default behavior
if req.sort_alphabetically {
    tidied_list.sort();
}
```

Seems fine! Right? We just use [sort](https://doc.rust-lang.org/std/primitive.slice.html#method.sort).

```rust
let mut foods = ["carrot", "banana", "zucchini", "apple"];
foods.sort();

assert_eq!(foods, ["apple", "banana", "carrot", "zucchini"]);
```

## Capitalized words

What if we capitalize the 'b' in "banana"? Any guesses if the `.sort()`ed list will change?

It does! `.sort()` gives us: `["Banana", "apple", "carrot", "zuccini"]` 

But that's fine; it's a chosen default to place all capitalized letters _before_ all lowercase characters. As long as it's consistent, I'm fine with that. Plus, most passphrase lists are all lowercase, hence Tidy's `--to-lowercase` option.

At the moment, I don't know if you can change this default sorting behavior without using a crate. For now, we're going to press on, because we have bigger issues...

## There are language besides English

What about a list of words like: `["énigme", "enlever", "abbey", "zoo", "Zambia", "eager", "ezra", "año", "antena"]`?

`.sort()` gives us `["Zambia", "abbey", "antena", "año", "eager", "enlever", "ezra", "zoo", "énigme"]`

We knew "Zambia" would be first from our capitalization example above. But now we learn that, luckily, "año" is sorted correctly after "antena" -- as I understand it (and correct me if I'm wrong) in Spanish, 'ñ' is a letter distinct from 'n' and comes after 'n' in Spanish. 

But! The French word "énigme" is way at the end, as if 'é' is a unique letter that goes at the end of the alphabet! As I understand it (and I know even less French than Spanish), 'é' should be sorted as if it is a regular 'e'. In other words, this list should be sorted: "eager", "énigme", "enlever", "ezra". 

## A more worldly sorting function

(Optional: Begin listening to [this wonderful, mostly French playlist](https://open.spotify.com/playlist/1kv8kOkwyl9xsRk8nD5wLI?si=89d1a6e430a94601).)

Rather than try to reinvent the wheel here, I figured it was time to look at adding a new crate to my project to get this right. 

The brilliant [Wesley Moore suggested](https://github.com/sts10/tidy/pull/25#issuecomment-1406013696) [icu_collator](https://docs.rs/icu_collator/1.1.0/icu_collator/).

Here's how I adapted one of the crate's examples for us:

```rust
use icu::collator::*;
use icu_collator::Collator;
use icu_collator::CollatorOptions;
/// Sort a Vector of words a bit more carefully than Rust's default .sort(), 
/// treating capitalized letters and accented letter a bit better.
/// `.sorted()` words -> ["Zambia", "abbey", "eager", "enlever", "ezra", "zoo", "énigme"]
/// sort_carefully words -> ["abbey", "eager", "énigme", "enlever", "ezra", "Zambia", "zoo"]
pub fn sort_carefully(list: Vec<String>) -> Vec<String> {
    let mut options_l2 = CollatorOptions::new();
    options_l2.strength = Some(Strength::Secondary);
    let collator_l2: Collator =
        Collator::try_new_unstable(&icu_testdata::unstable(), &Default::default(), options_l2)
            .unwrap();
    let mut newly_sorted_list = list;
    newly_sorted_list.sort_by(|a, b| collator_l2.compare(a, b));
    newly_sorted_list
}
```

With this change, here's how it sorts our list: 

`"abbey", "año", "antena", "eager", "énigme", "enlever", "ezra", "Zambia", "zoo"`

It got the French right (yay!), and it's mixing capitalized with lowercase, which I think I prefer for Tidy. 

**BUT** it sorts Spanish incorrectly! 'ñ' is now (incorrectly) sorted as if it were a 'n', rather than a separate character that comes after 'n'.

## Resigning myself to the fact that we need to add a locale option to Tidy

At this point, I was willing to do something I had been resisting during this project: Add an option for users to specify which language their word list is in. I had been resisting it because I thought it was an unnecessary complication. But if I wanted Tidy to be able to work well with non-English word lists, I think getting the alphabetical sort right is important enough to take this step. 

For example, if a user wants to work on an established non-English word list, like [the French BIP-0039 list](https://github.com/bitcoin/bips/blob/master/bip-0039/french.txt), Tidy needs to get everything right, so that the Tidy user's submitted changes reflect only and exactly what they want to change (and not, for example, re-order the list incorrectly).

## Adding a locale option to Tidy

Thankfully, the icu_collator crate we're already using accepts an optional locale variable.

First, I added a new `locale` option to Tidy with a default of "en-US";

```rust
// src/main.rs
/// Specify a locale for words on the list. Aids with sorting. Examples: en-US, es-ES
#[clap(long = "locale", default_value = "en-US")]
locale: String,
```

Step two is to `parse`/validate the user's inputted string in `src/lib.rs` (this wasn't super clear in icu_collator documentation):

```rust
// src/lib.rs
// First, parse the given locale into a valid Locale
let locale: Locale = req
    .locale
    .parse()
    .expect("Error: given locale is not parse-able. Try form similar to en-US or es-ES.");
// Now use that Locale to sort the list more carefully
tidied_list = sort_carefully(tidied_list, locale);
```

All so that we can use this `locale` variable in our new and improved `sort_carefully` function:

```rust
use icu::collator::*;
use icu::locid::Locale; // New
use icu_collator::Collator;
use icu_collator::CollatorOptions;
/// Sort a Vector of words a bit more carefully than Rust's
/// default .sort(), treating capitalized letters and accented letters a
/// bit more smart.
/// `.sorted()` words -> ["Zambia", "abbey", "eager", "enlever", "ezra", "zoo", "énigme"]
/// sort_carefully words -> ["abbey", "eager", "énigme", "enlever", "ezra", "Zambia", "zoo"]
pub fn sort_carefully(list: Vec<String>, locale: Locale) -> Vec<String> {
    let mut options_l2 = CollatorOptions::new();
    options_l2.strength = Some(Strength::Secondary);
    let collator_l2: Collator =
        Collator::try_new_unstable(&icu_testdata::unstable(), &locale.into(), options_l2).unwrap();
    let mut newly_sorted_list = list;
    newly_sorted_list.sort_by(|a, b| collator_l2.compare(a, b));
    newly_sorted_list
}
```

As the comment states, we now sort both French and Spanish correctly, though to do so, the user must specify the correct locale, either "fr" or "es-ES" in these cases. I find this an acceptable solution for Tidy and its users!

The above is [the version that exists today in Tidy 0.2.82](https://github.com/sts10/tidy/blob/main/src/list_manipulations.rs#L23-L45).

## Unicode normalization

Thus far, I've been hiding another big issue from you. Forgive me. 

Let's start with a quiz: These two French words look the same, yeah? "sécréter" and "sécréter". Let's make sure.

```rust
let version1 = "sécréter";
let version2 = "sécréter";
assert_eq!(version1, version2);
```

Fails! Huh! It's almost like `version2` is encoded differently:

```text
left: `"sécréter"`,
right: `"se\u{301}cre\u{301}ter"`', src/main.rs:8:5
```

To learn a little more, let's see if they have the same number of characters:

```rust
let version1 = "sécréter";
let version2 = "sécréter";
assert_eq!(version1.len(), version2.len());
```

Fails! But we get another clue: 
```text
thread 'main' panicked at 'assertion failed: `(left == right)`
left: `10`,
right: `12`'
```

For completeness, we'll also try counting the characters: `assert_eq!(version1.chars().count(), version2.chars().count());` 

This also fails, but gives us the slightly different failure message: 

```
thread 'main' panicked at 'assertion failed: `(left == right)`
left: `8`,
right: `10`'
```

Hm!

### Unicode

As you may have figured out by now, I have rigged the deck. 

The characters in `version1`, specifically the es-with-accents, are "composed", meaning they each are a single character. In `version2`, they are "decomposed", meaning that they actually take up _two_ characters (the accent is first character, the 'e' being the second).

To get these two strings to be equal, we'll need to **normalize** them such that: either both are "composed" or both are "decomposed". 

#### Normalization Forms

Thankfully, Unicode has a system to [normalize characters](https://www.unicode.org/faq/normalization.html). 

For better or worse, [there are 4 normalization forms](https://www.unicode.org/reports/tr15/#Norm_Forms):

* Normalization Form D (NFD): Canonical Decomposition
* Normalization Form C (NFC): Canonical Decomposition, followed by Canonical Composition
* Normalization Form KD (NFKD): Compatibility Decomposition
* Normalization Form KC (NFKC): Compatibility Decomposition, followed by Canonical Composition

<!-- In our How have been "normalized" with [Unicode Normalization Form C](https://www.unicode.org/glossary/#normalization_form_c). The es-with-accents in `version2` use a different Normalization Form, I think [Form D](https://www.unicode.org/glossary/#normalization_form_d) or [Form ND](https://www.unicode.org/glossary/#normalization_form_kd). -->

In our example, `version1` is NFC, with `version2` is NFD. (I'm too lazy right now verify, but I can later. The point is, they're not the same.)

### Performing Unicode normalization in Rust

To do some Unicode normalization in Rust, we're going to use the well-titled [unicode_normalization crate](https://docs.rs/unicode-normalization/latest/unicode_normalization/). This crate [can normalize (convert) a given String to any of the four forms listed above](https://docs.rs/unicode-normalization/latest/unicode_normalization/trait.UnicodeNormalization.html). Great!

As explained above with the "apple" example, we cannot let a list get through Tidy with "sécréter" and "sécréter" on it as two different words. At first, I figured I'd have Tidy, by default, normalize all characters of all words to one of the forms (I arbitrarily picked NFC). 

```rust
/// Normalize the Unicode of a string
pub fn normalize_unicode(word: &str) -> String {
    word.nfc().collect::<String>()
}
```

But later I convinced myself that I should, as with locales, let the user choose from any of the four forms, or, if not specified by the user, perform no normalization at all. This is a risk that I'm trusting Tidy users with, since if their inputted word lists are not normalized, they could have the "apple" problem. But at this point I feel OK with this.

Here's how I wrote the choose-your-own-normalization-form function:

```rust
/// Normalize the Unicode of a string
/// See https://docs.rs/unicode-normalization/latest/unicode_normalization/trait.UnicodeNormalization.html#tymethod.nfc
pub fn normalize_unicode(word: &str, nf: &str) -> Result<String, String> {
    if nf.to_lowercase() == "nfc" {
        Ok(word.nfc().collect::<String>())
    } else if nf.to_lowercase() == "nfd" {
        Ok(word.nfd().collect::<String>())
    } else if nf.to_lowercase() == "nfkc" {
        Ok(word.nfkc().collect::<String>())
    } else if nf.to_lowercase() == "nfkd" {
        Ok(word.nfkd().collect::<String>())
    } else {
        Err("Unknown Unicode normalization form received in arguments.\nPlease use one of the following normalization forms: nfc, nfd, nfkc, or nfkd.".to_string())
    }
}
```

(For Rust folks: I think this is probably a great use-case for [Cows](https://doc.rust-lang.org/std/borrow/enum.Cow.html), as most `word`s will NOT change from input to output through this function, but I haven't refactored this code yet.)

## A better way to count characters?

Since I had decided to NOT have Tidy normalize Unicode by default, I wanted to try to make the rest of Tidy's functions more robust if/when they have to handle non-normalized Unicode. 

One basic function that Tidy relies on quite a bit is counting the number of characters in a word. For example, when a user specifies that a list should have a certain minimum and/or maximum word length, Tidy counts characters and removes words based on that count. 

But, as we saw above, this seemingly simple task can be tricky. I had been relying on `word.chars().count()`, but this now felt a bit naive. I had seen too much! 

My goal was to align Tidy's character counting with what a human would expect.

At first, I was going to have Tidy count characters with `word.nfc().chars().count()`, normalizing the Unicode before counting. This would give each accented character a character count of 1, which I argue is reasonably in-line with human expectation.

But this didn't seem quite right. While the accented characters I had seen and tested with did give a count of 1 when run through `.nfc().chars().count()`, I wasn't sure this was the case for _every_ character users might throw at it. From what I've gathered, this isn't what NFC normalization was made for.

Then, a Fediverse friend recommended I count what's called [grapheme clusters](https://www.unicode.org/reports/tr29/#Grapheme_Cluster_Boundaries) instead. To do this, I had to add yet another crate called [unicode_segmentation](https://docs.rs/unicode-segmentation/latest/unicode_segmentation/), but its API is thankfully pretty simple.

```rust
use unicode_segmentation::UnicodeSegmentation;
/// When counting characters of a word, we want to count all accented characters as 1 character,
/// regardless of the Unicode, to better approximate how humans would count the number
/// of characters in a word.
/// An alternate approach would be to convert each character to NFC before counting `word.nfc().count()`
/// but I don't think this handles emoji as well as grapheme cluster counting.
pub fn count_characters(word: &str) -> usize {
    word.graphemes(true).count()
}
```

Not only does this count accented characters exactly as `.nfc().chars().count()` does (good), I'm pretty sure it also counts each and any emoji as one character. In the test of this function, I went back to our example word from earlier (and had some fun in the comments):

```rust
#[test]
fn can_accurately_count_characters() {
    let normal_word = "normal";
    assert_eq!(count_characters(normal_word), 6);

    // These two words below seem the same, don't they?
    let word_with_combined_accents = "sécréter";
    let word_with_two_char_accents = "sécréter";

    // Oh, you sweet summer child...
    assert_ne!(
        word_with_combined_accents.chars().count(),
        word_with_two_char_accents.chars().count()
    );
    // Hence, my count_characters function, which normalizes
    // Unicode via NFC before counting the length of given string slice
    // I chose NFC because it seems to be closest to how human read/count
    // letters (e.g. and accented e always counts as 1 character).
    assert_eq!(count_characters(word_with_combined_accents), 8);
    assert_eq!(count_characters(word_with_two_char_accents), 8);

    // Counts each emoji as 1 character, which seems good.
    let emojis = "😀😃😄😁😆";
    assert_eq!(count_characters(emojis), 5);
}
```

Now, Tidy diligently uses this `count_characters` function every time it needs to get the length of a string slice, as a standard. Hurray for standardizations!

## A real-world test

Remember earlier when I slyly referred to [the French BIP-0039 list](https://github.com/bitcoin/bips/blob/master/bip-0039/french.txt) as an example of a French word list? Let's return to it now as a sort of real-world test of Tidy's new worldliness. 

As per [the BIP-0039 specification](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki#wordlist), this list needs to be normalized using the NFKD form. It should also, presumably, alphabetize the French words correctly.

As a test of our new version of Tidy, let's run the French list through Tidy, doing an NFKD normalization and a sort using the French locale. If we got everything right, **the list _should_ come out exactly the same as it came in** (on the assumption that the BIP list is correctly normalized and correctly sorted, which seems like a pretty safe assumption).

So, using our two new options, we run: `tidy -z nfkd --locale fr -o bip-0039/french.txt --force bip-0039/french.txt`. 

Lo and behold, git detects no change in the list after running this command. This confirms to me that Tidy (a) normalizes to NFKD correctly, and (b) sorts French words correctly, when given `fr` as a locale.

## Try it yourself 

All these changes described above are present in [Tidy version 0.2.82](https://github.com/sts10/tidy/releases/tag/v0.2.82). Please [open an issue on the Github repo](https://github.com/sts10/tidy/issues) if you find an issue!

## So, what normalization form should passphrase word lists be in?

By giving Tidy users the choice of which normalization form to use, I was passing the buck to them. But of course, I am a Tidy user myself, using the tool to maintain [a number of word lists](https://github.com/sts10/generated-wordlists). 

Granted, all of these word lists are, for now, in English. But I had now given myself another choice: Should these lists be normalized (yes), and if so, to which form? 

As we saw earlier, [the BIP-0039 specification](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki#wordlist), that project normalizes the NFKD form. Given that they're describing word lists to be used as, presumably, Bitcoin wallet passphrases, this seems like a choice that's relevant to our question. 

### A theory without evidence
I have an inkling that, while decomposed Unicode may be better for computers handling strings, I _think_ composed Unicode is better for preventing what I'd call a human-perceived duplicate. This is based on the assumption that we may lose information in the conversion from decomposed to composed, but that's not the case in the other direction. By this I mean that two different decomposed Unicode characters (called them A and B) may be converted to one single composed character (C). I am further assuming that all three of these character A, B, and C, likely look pretty similar to a human. So we wouldn't want words with A and B on the list, when we could instead risk losing a few words and only have these similar characters represented as C in all cases.

But I fully admit that (a) I don't have a specific example of such a case, and (b) I'm in not position to say whether a speaker of this hypothetical language would have an issue distinguishing between characters A and B.

For now, I'm normalizing my word lists with NFKD, following the BIPS spec.

I [welcome arguments for or against NFKD, though](https://github.com/sts10/generated-wordlists/issues).
