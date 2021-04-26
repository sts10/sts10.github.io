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

Another way to think about example 2: if, for every pair of words, you mash them together, there must be only ONE way to split them apart and make two words on the list. This is how I approached the issue when writing the code for csafe.

Note that putting any punctuation between words in your passphrases, as 1Password requires of users, negates this issue.

## csafe: New code 

Inspired by some tweets I saw recently, I decided to take a fresh look at this project, having 3 more years of Rust experience under my belt. The result is [CSafe](https://github.com/sts10/csafe). 

CSafe makes a number of **improvements** over [my original checker](https://github.com/sts10/compound-passphrase-list-safety-checker). First off, I think it's all more readable that my original checker code, which I wrote when I was newer to Rust. CSafe also has some basic tests and benchmarks.

But more importantly for end-users, CSafe is more considerate about which words it discards when making a compound-safe version of the inputted word list. For example, given [a version of the word list 1Password once used](https://github.com/sts10/csafe/blob/main/word_lists/agile_words.txt), it was able to [save 16,773](https://github.com/sts10/csafe/blob/main/word_lists/agile_words.txt.csafe) of the original list of 18,328 words. The original checker could only save 16,103 words. (And [removing all prefix words, the more "nuclear" option, leaves you with just 15,190 words](https://github.com/sts10/prefix-safety-checker/blob/master/word_lists/agile_words.txt.no-prefix).) 

### Speed up

Lastly, I think CSafe is faster than the original checker on lists of equal length, especially on longer lists. 

Here, a big thanks to [Wesley Moore](https://github.com/wezm), who provided [two key pull requests](https://github.com/sts10/csafe/pulls?q=is%3Apr+is%3Aclosed+author%3Awezm) that boosted the speed of the program by some factor. 

[One of these PRs](https://github.com/sts10/csafe/pull/2) has the program make use of [Fx Hash](https://github.com/cbreeden/fxhash) rather than a regular old Vector. 

[The other](https://github.com/sts10/csafe/pull/3) deals with variable allocation in the crucial `find_unsafe_words` function. I don't _quite_ understand it yet, so I'll just point you to [Moore's helpful explanation](https://github.com/sts10/csafe/pull/3#issuecomment-826252236).

