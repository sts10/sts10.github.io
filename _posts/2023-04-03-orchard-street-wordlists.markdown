---
layout: post
title: "Introducing Orchard Street Wordlists"
date: 2023-04-03 10:00:00 -0400
comments: true
---

About five years ago I started thinking about passphrases and the word lists used to generate them. At first, I just built [tools](https://sts10.github.io/2018/05/05/compound-passphrase-list-safety-checker.html) to audit, and later create, word lists rather than actually create word lists myself. [In 2020, I finally started working on making lists](https://sts10.github.io/2020/09/30/making-a-word-list.html).

My work building word list tools has culminated in the latest versions of [Tidy](https://github.com/sts10/tidy), which, among other things, incorporates [a pretty neat process I created for making a list uniquely decodable](https://sts10.github.io/2022/08/12/efficiently-pruning-until-uniquely-decodable.html).

Today, I've polished up four of my word lists and am freshly publishing them as **[Orchard Street Wordlists](https://github.com/sts10/orchard-street-wordlists)**, named after the first street I lived on in Manhattan. I'm hoping that a little branding will help them get some attention and use.

## The Lists
_I updated this section of October 24, 2023, when I rename a few of these lists._

The lists are comprised of words taken from two sources: [Google Books Ngram data](https://storage.googleapis.com/books/ngrams/books/datasetsv3.html) and [a Wikipedia word frequency project](https://github.com/IlyaSemenov/wikipedia-word-frequency/). I basically blended the most frequently used words from both sources, then cut profane and strange words. I then made all of the lists **uniquely decodable**, using [Schlinkert pruning](https://sts10.github.io/2022/08/12/efficiently-pruning-until-uniquely-decodable.html). Crucially, this attribute means that users can create passphrases without separators between words (e.g. "adjudicationhisssynodmanlyacculturationinextricably"). This means the lists are suitable for use with password managers like KeePassXC, which allow users to not use a word separator. I also removed some strange words, profane words, some (but not all) homophones, and as many British spellings of English words (like "colour") that I could find/think of.

The [**Orchard Street Long List**](https://github.com/sts10/orchard-street-wordlists/blob/main/lists/orchard-street-long.txt) is a 17,576-word list. It provides a robust 14.1 bits of entropy per word, meaning a 7-word passphrase gives almost 99 bits of entropy. (It is a new version of [my UD1 list](https://github.com/sts10/generated-wordlists/blob/main/lists/experimental/ud1.txt).) I think it's a pretty solid choice for using with KeePassXC if the user wants an extra bump in security (about 1.1 bits per word more than if you used the EFF long list).

The [**Orchard Street Medium List**](https://github.com/sts10/orchard-street-wordlists/blob/main/lists/orchard-street-medium.txt) is a 8,192-word list that I think is a nice sweet spot for length. 8,192 is 2^13, so it should be a little extra efficient for random number generators. And it gives 13 bits of entropy per word, which makes passphrase entropy calculations a bit easier for us humans.

The [**Orchard Street Diceware List**](https://github.com/sts10/orchard-street-wordlists/blob/main/lists/orchard-street-diceware-clean.txt) is my version of the classic Diceware lists of 7,776 words, like the [EFF long list](https://www.eff.org/deeplinks/2016/07/new-wordlists-random-passphrases). The EFF long list has become popular since its release in 2016 -- for example KeePassXC [uses an only slightly modified version of it](https://github.com/keepassxreboot/keepassxc/blob/develop/share/wordlists/eff_large.wordlist) as its default word list. I hope that my list offers a slight advantage of having more common words, since I used [a technique called Schlinkert pruning](https://sts10.github.io/2022/08/12/efficiently-pruning-until-uniquely-decodable.html) to make the list uniquely decodable rather than removing all prefix words. I also published [a version of the list with corresponding dice rolls prepending each word](https://github.com/sts10/orchard-street-wordlists/blob/main/lists/orchard-street-diceware.txt) for use with actual dice.

And lastly, I included two short lists from [my Remote Words project](https://github.com/sts10/remote-words). [**Orchard Street Alpha**](https://github.com/sts10/orchard-street-wordlists/blob/main/lists/orchard-street-alpha.txt) and [**Orchard Street QWERTY**](https://github.com/sts10/orchard-street-wordlists/blob/main/lists/orchard-street-qwerty.txt) both have 1,296 words that are optimized for inputting into devices like smart TVs and video game consoles when using TV remotes and controllers. You can [read more about these lists in this post](https://sts10.github.io/2022/10/24/a-good-netflix-password.html) or [the Remote Words repo](https://github.com/sts10/remote-words).

I also created included versions of the Medium and Short lists with corresponding dice roll numbers (e.g. `34565	holiday`), if users want to use dice to create passphrases (see [EFF's guide on how to do that](https://www.eff.org/dice)).

## Licensing

Currently, I'm licensing all of the lists under [a Creative Commons Attribution-ShareAlike 4.0 International License](http://creativecommons.org/licenses/by-sa/4.0/), since that's what [Wikipedia's text is licensed under](https://foundation.wikimedia.org/wiki/Policy:Terms_of_Use#7._Licensing_of_Content).

However, I admit that it may not be possible to copyright a list of alphabetical words, no matter their source or what manipulations I have performed on them beforehand. If this is the case, maybe I should use [CC0](https://creativecommons.org/share-your-work/public-domain/cc0/). Again, I'm not a lawyer!

If you have thoughts on licensing this project, I've created [a related GitHub Issue](https://github.com/sts10/orchard-street-wordlists/issues/1) or welcome input on [Mastodon](https://hachyderm.io/@schlink).

---

Hitting `git push` on this particular project felt like a culmination of all of my work with word lists. After five years thinking about very niche questions surrounding word lists, part of me hopes I can let these lists be as they are and maybe find something else to think about in my spare, creative moments!
