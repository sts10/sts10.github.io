---
layout: post
title: "The somewhat lucky history of SecureDrop's English word list"
date: 2023-05-17 13:00:00 -0400
comments: true
---

The [SecureDrop project](https://securedrop.org/) uses a few different (English) word lists. One of them is located [in their public repo](https://github.com/freedomofpress/securedrop/) at [`securedrop/wordlists/en.txt`](https://github.com/freedomofpress/securedrop/tree/develop/securedrop/wordlists). 

Since its initial publication to GitHub in October of 2017, the list has been changed twice. Below, I make some observations about these changes that I think are of interest and illuminate how a word list might come to have prefix words on it, but remain uniquely decodable.

## The original list

Here's [the first version of the list, from October of 2017](https://github.com/freedomofpress/securedrop/blob/202aa7fc8abf049d1f84dc098d14a387a387e891/securedrop/wordlists/en.txt).

Crucial to our study, the list has no prefix words, meaning no words on the list are prefixes of any other word on the list. This property gives the list some nice qualities, one of which is that it guarantees that the list **uniquely decodable**, an important property for a word list to have.

Among other things, if a word list is uniquely decodable, words on the list can be safely combined without a delimiter between words, for example: "fridgedetracthardeningcultural".

Here are some attributes describing the original list from 2017:

```text
List length               : 7603 words
Mean word length          : 6.98 characters
Length of shortest word   : 3 characters (aim)
Length of longest word    : 9 characters (zoologist)
Free of prefix words?     : true
Free of suffix words?     : false
Uniquely decodable?       : true
Entropy per word          : 12.892 bits
Efficiency per character  : 1.847 bits
Assumed entropy per char  : 4.297 bits
Above brute force line?   : true
Shortest edit distance    : 1
Mean edit distance        : 6.852
Longest shared prefix     : 8
Unique character prefix   : 9
```

## A few word swaps

In April of 2022, Kevin O'Gorman replaced a few vulgar on the list. Here's [the list after that change](https://github.com/freedomofpress/securedrop/blob/4030aec73cf5d0aecdaeb0aaea09834a3eb465da/securedrop/wordlists/en.txt).

Words removed include: arrest, baboon, douche, goon, handcuff, impotence, impotency, impotent. In order to keep the list the same length, for each word that was removed, a new word was added. One such word that was added was "impress". This is notable because the list still had "impressive" and "impressing" on it, meaning that now the list had a prefix word on it ("impress"). This means that, as of April 2022, the list was no longer free of prefix words. 

However, since "ive" and "ing" are not on the list as words themselves or prefixes of over words, the list **remained uniquely decodable**.

```text
List length               : 7603 words
Mean word length          : 6.98 characters
Length of shortest word   : 3 characters (aim)
Length of longest word    : 10 characters (impressive)
Free of prefix words?     : false
Free of suffix words?     : false
Uniquely decodable?       : true
Entropy per word          : 12.892 bits
Efficiency per character  : 1.846 bits
Assumed entropy per char  : 4.297 bits
Above brute force line?   : true
Shortest edit distance    : 1
Mean edit distance        : 6.852
Longest shared prefix     : 8
Unique character prefix   : 9
```

## Is this a security issue?

Before we move on, I'll note now that, after raising these questions with SecureDrop, a member of the team assured me that SecureDrop passwords are delimited, I assume with some punctuation between words, e.g. "underling-riverbank-cubbyhole-severity-mustard-credible". This means that, from a security perspective, this word list need not be free of prefix words or uniquely decodable. Nevertheless I think this is an interesting file history to walk through.

## More swaps (by me)

Later in 2022, [I removed a few more awkward/inappropriate words from the list](https://github.com/freedomofpress/securedrop/commit/7c7dada9e0e8ad62e5a52f2d3d5c2fcf816e7223), like "gonad", "grope"," junky", "opium", and "rectal". As one of my replacement words, I added "gala" to the list, not realizing at the time that this was a prefix word of "galaxy". Now the list has two prefix words on it: "impress" and "gala".

I did not check to see if the words I was adding as replacements were prefix words of words already on the list, nor did I check that the end resulting list was free of prefix words or uniquely decodable. And yet, luckily enough, [the list as it stands today](https://github.com/freedomofpress/securedrop/blob/develop/securedrop/wordlists/en.txt) is still uniquely decodable. 

```text
List length               : 7603 words
Mean word length          : 6.98 characters
Length of shortest word   : 3 characters (aim)
Length of longest word    : 10 characters (impressive)
Free of prefix words?     : false
Free of suffix words?     : false
Uniquely decodable?       : true
Entropy per word          : 12.892 bits
Efficiency per character  : 1.846 bits
Assumed entropy per char  : 4.297 bits
Above brute force line?   : true
Shortest edit distance    : 1
Mean edit distance        : 6.852
Longest shared prefix     : 8
Unique character prefix   : 9
```

## Why this _could have_ been a security issue

As covered, SecureDrop uses delimiters between words in their passphrases. But if they did not use delimiters, here are some interesting issues that could come up.

Imagine if the words "neighbor" and "hood" had been on the original list. Next, imagine that, when replacing one of the vulgar words, the word "neighborhood" had been added to the list. If a user randomly generated a 3-word passphrase or username, expecting 12.892 * 3 == 38.7 bits of entropy, they might get "chip", "neighbor", and "hood". If these words were **combined without a delimiter**, the resultant passphrase or username would be "chipneighborhood", indistinguishable from the (25.78 bit) passphrase "chip" + "neighborhood".

We can then imagine an attacker brute forcing their way through the list, guessing passphrases, would reach "chip" + "neighborhood" while checking **2-word** combinations, rather than 3. 

## Conclusions

The two tweaks made to the word list, both in spring of 2022, clearly did not ensure that the list remained free of prefix words. Interestingly, despite word additions, the list remained uniquely decodable.

To the best of my knowledge, the list has never been not uniquely decodable through its existence, at least on GitHub since 2017. And, as mentioned above, SecureDrop's passwords are delimited, so it wouldn't even be an issue if the list was not uniquely decodable at some point, (and thus I do not think I'm reporting a security issue here). But I still think that it's an interesting illustration of the above concepts!
