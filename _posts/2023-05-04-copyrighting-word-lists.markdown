---
layout: post
title: "Are word lists sufficiently original to be copyrighted?"
date: 2023-05-04 13:00:00 -0400
comments: true
---

I recently pushed to GitHub [a set of word lists intended to be used to generate secure passphrases called the Orchard Street Wordlists](https://github.com/sts10/orchard-street-wordlists). I'm pretty proud of them -- you can [read more about the lists here](https://sts10.github.io/2023/04/03/orchard-street-wordlists.html). 

The words on the list come from two sources: [Google Ngram data](https://storage.googleapis.com/books/ngrams/books/datasetsv3.html) and [Wikipedia word frequency data](https://dumps.wikimedia.org/enwiki/), via [this project](https://github.com/IlyaSemenov/wikipedia-word-frequency/). 

[Google Ngram data is licensed under Creative Commons BY 3.0 Unported](https://storage.googleapis.com/books/ngrams/books/datasetsv3.html). [Wikipedia text, as of this writing, is licensed under CC BY-SA 3.0](https://foundation.wikimedia.org/wiki/Policy:Terms_of_Use#7._Licensing_of_Content). That "SA" stands from ShareAlike, which basically means you can use it, but you have to share your work under the same or a similar license. Thus, I figured that I would have to use that same license (CC BY-SA 3.0) for my word lists. 

However, I'm obviously not doing what most people do with Wikipedia text, namely extract/recreate a sentence or few paragraphs from an individual article. By using word frequency data, I'm doing something a bit more broad and complex. Do I really need to maintain the ShareAlike license?

## Is an alphabetized word list sufficiently original?

But setting even that question aside: We should also ask if an alphabetized word list, such as [the Orchard Street Long List](https://github.com/sts10/orchard-street-wordlists/blob/main/lists/orchard-street-long.txt), is original enough to even be copyrighted in the first place. That all of my lists are in alphabetical order likely helps the argument that they are not original enough to copyright.

Clearly everything is not copyrightable, even under Creative Commons. I can't write a very simple programming function that, say, lower-cases any string given to it and then license it under GPL.

Ironically, I wouldn't be upset if I could not copyright my word lists. While my pride might be a little hurt, it would make sharing the lists easier. 

## Next steps?

In practical terms, I think replacing the current CC BY-SA 3.0 Unported license with the [CC0 license](https://creativecommons.org/share-your-work/public-domain/cc0/) would be a proper way to show/assert/embrace this lack of originality and thus lack of copyright.

Unfortunately I just don't have enough information to know exactly what to do. Leaving the CC BY-SA 3.0 license on there feels safe, but part of me wants to slap the CC0 on there and not think about this anymore!

Feel free to comment on [this GitHub issue](https://github.com/sts10/orchard-street-wordlists/issues/1) or [find me on the Fediverse](https://hachyderm.io/@schlink) if you have thoughts!
