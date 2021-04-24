---
layout: post
title: "Revisiting Compund Safety"
date: 2020-12-30 18:26:00 -0400
comments: true
---

Back in 2018 I wrote [a Rust script](https://github.com/sts10/compound-passphrase-list-safety-checker) and [corresponding blog post](https://sts10.github.io/2018/05/05/compound-passphrase-list-safety-checker.html) about a concept involving passphrase word lists that I imagined and then named "compound safety".

Basically, a passphrase word list is "compound-safe" (that is, it's safe to join words without punctuation or spaces) if it does NOT contain any pairs of words that can be combined such that they can be guessed in two distinct ways within the same word-length space. This includes instances in which two words can be combined and form another word on the list.

Inspired by some tweets I saw, I decided to take a fresh look at this project, having 3 more years of Rust experience under my belt. The result is [csafe](https://github.com/sts10/csafe). 

**Improvements over my original checker**: csafe is more considerate about which words it discards. For example, given the 1Password word list, it was able to save 16,820 of the original list of 18,328 words. The original checker could only save 16,103 words. The Rust code is also, in my opinion, much easier to understand than the functions of the original checker. 

**Downsides to using csafe over my original checker**: For some reason I can't quite figure out, csafe is much slower than my original word checker -- like 50x slower. Maybe it's doing a lot of unnecessary checks? Feel free to create an issue or pull request if you spot any major improvements for speed that I can make.
