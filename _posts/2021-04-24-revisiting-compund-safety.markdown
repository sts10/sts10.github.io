---
layout: post
title: "Revisiting Compound Safety"
date: 2021-04-24 18:26:00 -0400
comments: true
---

Back in 2018 I wrote [a Rust script](https://github.com/sts10/compound-passphrase-list-safety-checker) and [corresponding blog post](https://sts10.github.io/2018/05/05/compound-passphrase-list-safety-checker.html) about a concept involving passphrase word lists that I imagined and then named "compound safety".

Basically, a passphrase word list is "compound-safe" (that is, it's safe to join words without punctuation or spaces) if it does NOT contain any pairs of words that can be combined such that they can be guessed in two distinct ways within the same word-length space. This includes instances in which two words can be combined and form another word on the list.

I heard of this potential issue in [this YouTube video](https://youtu.be/Pe_3cFuSw1E?t=8m36s). 

## Brief examples of compound safety violations

**Example #1**: If a word list included "under", "dog", and "underdog" as three separate words, it would NOT be compound-safe, since "under" and "dog" can be combined to make the word "underdog". A user not using spaces between words might get a passphrase that included the character string "underdog" as two words, but a brute-force attack would guess it as one word. Therefore this word list would NOT be compound-safe. (I refer to this as a "compounding".)

**Example #2**: Let's say a word list included "paper", "paperboy", "boyhood", and "hood". A user not using punctuation between words might get the following two words next to each other in a passphrase: "paperboyhood", which would be able to be brute-force guessed as both `[paperboy][hood]` and `[paper][boyhood]`. Therefore this word list would NOT be compound-safe. 

Another way to think about example 2: if, for every pair of words, you mash them together, there must be only ONE way to split them apart and make two words on the list. This is how I approached the issue when writing the code for csafe.

## csafe: New code 

Inspired by some tweets I saw, I decided to take a fresh look at this project, having 3 more years of Rust experience under my belt. The result is [csafe](https://github.com/sts10/csafe). 

**Improvements over my original checker**: csafe is more considerate about which words it discards. For example, given [a version of the word list 1Password once used](https://github.com/sts10/csafe/blob/main/word_lists/agile_words.txt), it was able to [save 16,820](https://github.com/sts10/csafe/blob/main/word_lists/agile_words.txt.csafe) of the original list of 18,328 words. The original checker could only save 16,103 words. The Rust code is also, in my opinion, much easier to understand than the functions of the original checker. 

**Downsides to using csafe over my original checker**: For some reason I can't quite figure out, csafe is much slower than my original word checker -- like 50x slower. Maybe it's doing a lot of unnecessary checks? Feel free to create an issue or pull request if you spot any major improvements for speed that I can make.

### The main function

It's not pretty, but it's prettier than the original.

```rust
pub fn find_unsafe_words(list: &[String]) -> Vec<Vec<String>> {
    let mut unsafe_words: Vec<Vec<String>> = vec![];
    let mut count = 0;
    for root_word in list {
        count += 1;
        println!("Checking {} (word {} of {})", root_word, count, list.len());
        let root_word_length = root_word.len();
        for second_word in list {
            if root_word == second_word {
                continue;
            }
            let mashed_word = root_word.to_owned().to_owned() + second_word;
            for i in 0..mashed_word.len() {
                if i == root_word_length {
                    continue;
                }
                if i == 0 && list.contains(&mashed_word) {
                    println!("Found a mashed whole word ");
                    unsafe_words.push(vec![
                        root_word.to_string(),
                        second_word.to_string(),
                        mashed_word.to_string(),
                    ]);
                    // I don't know if I can break here or I need to keep checking
                    // this mashed_word... Think it's safe to break
                    break;
                }
                let first_part = &mashed_word[0..i];
                let second_part = &mashed_word[i..mashed_word.len()];
                // Honestly not sure about these &&s
                if (first_part.trim() != "" && is_on_list(first_part, &list))
                    && (second_part.trim() != "" && is_on_list(second_part, &list))
                {
                    let contenders_for_removal = vec![
                        root_word.to_string(),
                        second_word.to_string(),
                        first_part.to_string(),
                        second_part.to_string(),
                    ];
                    println!("Adding contenders {:?}", contenders_for_removal);
                    unsafe_words.push(contenders_for_removal);
                    break;
                }
            }
        }
    }
    unsafe_words
}

```
