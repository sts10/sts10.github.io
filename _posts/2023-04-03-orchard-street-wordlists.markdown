---
layout: post
title: "Introducing Orchard Street Wordlists"
date: 2023-04-03 10:00:00 -0400
comments: true
---

About five years ago I started thinking about passphrases and the word lists used to generate them. At first, I just built [tools](https://sts10.github.io/2018/05/05/compound-passphrase-list-safety-checker.html) to create word lists, rather than actual word lists. [In 2020, I finally started working on making lists](https://sts10.github.io/2020/09/30/making-a-word-list.html). 

Today, I've polished four of my word lists and am freshly publishing them as ["Orchard Street Wordlists"](https://github.com/sts10/orchard-street-wordlists). 

## The Lists

The lists are comprised of words taken from two sources: [Google Books Ngram data](https://storage.googleapis.com/books/ngrams/books/datasetsv3.html) and [a Wikipedia word frequency project](https://github.com/IlyaSemenov/wikipedia-word-frequency/). They are also all uniquely decodable, thanks to [Schlinkert pruning](https://sts10.github.io/2022/08/12/efficiently-pruning-until-uniquely-decodable.html), and thus suitable for use with password managers like KeePassXC.

The [**Orchard Street Long List**](https://github.com/sts10/orchard-street-wordlists/blob/main/lists/orchard-street-long.txt) is a 17,576-word list. It provides a robust 14.1 bits of entropy per word, meaning a 7-word passphrase gives almost 99 bits of entropy. It is a new version of [my UD1 list](https://github.com/sts10/generated-wordlists/blob/main/lists/experimental/ud1.txt).

The [**Orchard Street Medium List**](https://github.com/sts10/orchard-street-wordlists/blob/main/lists/orchard-street-medium.txt) is my version of the classic Diceware list of 7,776 words, same as the [EFF long list](https://www.eff.org/deeplinks/2016/07/new-wordlists-random-passphrases). (I hope it's not too confusing that my "medium" list is the same length as EFF's "long" list, but part of my claim is that one can create a 17k-word list of English words that is usable.)

And lastly, I included two short lists from [my Remote Words project](https://github.com/sts10/remote-words). [**Orchard Street Alpha**](https://github.com/sts10/orchard-street-wordlists/blob/main/lists/orchard-street-alpha.txt) and [**Orchard Street QWERTY**](https://github.com/sts10/orchard-street-wordlists/blob/main/lists/orchard-street-qwerty.txt) both have 1,296 words that are optimized for inputting into devices like smart TVs and video game consoles when using TV remotes and controllers. You can [read more about these lists in this post](https://sts10.github.io/2022/10/24/a-good-netflix-password.html).

I also created included versions of the Medium and Short lists with their dice roll numbers (e.g. `34565	holiday`), if users want to use dice to create passphrases (see [EFF's guide](https://www.eff.org/dice)).

Hitting `git push` on this particular project felt like a culmination of my work with word lists. After five years thinking about very niche questions surrounding word lists, part of me hopes I can let these lists be as they are now and find something else to think about.
