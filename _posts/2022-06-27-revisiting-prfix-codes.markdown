---
layout: post
title: "In pursuit of a uniquely decodable code algorithm"
date: 2022-06-27 13:00:00 -0400
comments: true
---

About a month ago, I [posted](https://www.reddit.com/r/1Password/comments/ur4otq/proposed_new_word_list/) [my proposed new word list for 1Password](https://github.com/sts10/generated-wordlists/blob/main/lists/1password-replacement/1password-replacement.txt) to r/1Password. I was happy to see [it was well received](https://www.reddit.com/r/1Password/comments/ur4otq/comment/i8v7g29/?utm_source=reddit&utm_medium=web2x&context=3)! 

In addition to some lovely praise, I got some good questions about my word list and word lists in general in the comments. One commentter, detailing situations in which using a passphrase might be more convenient than a string of random characters, [detailed an interesting use-case](https://www.reddit.com/r/1Password/comments/ur4otq/comment/i8yoaty/?utm_source=reddit&utm_medium=web2x&context=3):

> Passwords you have to manually enter on a device where typing mixed case letters, numbers, and symbols is difficult (e.g., entering a password on a TV using a remote).

This comment inspired me to [make a few word lists that optimize for low travel distance when entering the passphrase into a graphical keyboard, like on Smart TVs](https://github.com/sts10/remote-words).

I also got a few [questions about prefix codes](https://www.reddit.com/r/1Password/comments/ur4otq/comment/i8ylj8f/?utm_source=reddit&utm_medium=web2x&context=3), an old favorite concept. I answered them as best as I could, and left my posts to r/1Password at that for now. But the experience did get me re-visiting these concepts.

## A quick review: Why we care about prefix codes

From [a previous post of mine](https://sts10.github.io/2020/09/30/making-a-word-list.html#the-question-of-prefix-words): 

> If a list contains "prefix words" (also known as ["prefix codes"](https://en.wikipedia.org/wiki/Prefix_code)), users should not be permitted to create passphrases in which no punctuation separates words (e.g. "denimawningbondedreturncamisolepebblecrewlessbook"). 

> I learned about this issue while watching this YouTube video called [“Diceware & Passwords”](https://www.youtube.com/watch?v=Pe_3cFuSw1E), which offers a nice introduction to a method of generating these random passphrases using dice. [About 8 minutes in](https://youtu.be/Pe_3cFuSw1E?t=8m36s) the presenter, Dr. Mike Pound, explains something that perked my ears up: He explained that you need spaces (or other punctuation) in between the words because "sometimes you might accidentally join two words together and they'd actually be a different word on their and in which case your [phrase] goes down to four words."

> Here's the hypothetical he's describing: What if we just mashed our words together, so instead of "casket-stoppage-desk-top" we just used "casketstoppagedesktop" as our password. The problem here is that, if "desktop" is also a word on your word list (and thus on a hypothetical and informed attacker's list), this passphrase is only a three-word phrase, which is notably weaker than a four-word phrase. The user thinks they have the security of a four-word phrase, when they really only have three. Note that this would only happen in rare cases when two words that make a compound word that's on list are right next to each other, and, of course, the user chooses not put anything between the words. It’s important to note that if there is punctuation or a space between the words, this problem does not exist. Using TitleCase is another solution.

> You can read more about this issue [here](https://github.com/ulif/diceware#id3).

I still think it's a really interesting problem!

## The suffix code question

One new question that popped into my head was whether removing suffix words is a valid alternative to removing prefix words. By "valid alternative" here, I mean: **Can users create passphrases from a word list free of suffix words and safely not use delimiting characters between the words** (like `posingbrowseharmlesskiwicommodorewildness`)? 

I think the answer is yes, but it's hard for me to prove it to myself at the moment.

For what it's worth, [the Wikipedia entry on prefix codes](https://en.wikipedia.org/wiki/Prefix_code#Related_concepts) reads "A suffix code is a set of words none of which is a suffix of any other; equivalently, a set of words which are the reverse of a prefix code. As with a prefix code, the representation of a string as a concatenation of such words is unique." 

### CSafe test

As a fun little test, I created a 81,345-word list that was free of suffix words using [Tidy](https://sts10.github.io/2021/12/09/tidy-0-2-0.html) (see below). I then ran that list through [my compound passphrase list safety checker](https://github.com/sts10/csafe) (version 0.3.16) looking for problematic ambiguities. It didn't find any, which is evidence in favor of a "yes" to the question above, but **not definitive proof**.

### If the answer is yes...

If the answer to the above question is yes, than what's interesting is that we now have two procedures for making a word list safe: remove all prefix words OR remove all suffix words. So we could make two lists: one without prefix words (`prefix-free.txt`) and another without suffix words (`suffix-free.txt`). If we're optimizing word list length, we could choose whichever list is longer.

Using [Wikipedia word frequency data](https://github.com/IlyaSemenov/wikipedia-word-frequency/blob/master/results/enwiki-20190320-words-frequency.txt) as a corpus, we can do a quick test using [Tidy](https://github.com/sts10/tidy):

Removing prefix words from the first 70,000 words of the Wikipedia list (`tidy -AinP -m 3 -M 12 --take-first 70000 --dry-run results/enwiki-20190320-words-frequency.txt`) creates a list of 48,523 words. Removing all suffix words (`tidy -AinU -m 3 -M 12 --take-first 70000 --dry-run results/enwiki-20190320-words-frequency.txt`) leaves us with 55,545 words. This is evidence toward a theory that, when dealing with common English words, removing all suffix words may leave us with more words than removing prefix words.

## A new option for Tidy

Undaunted, I created a new option for [my word list making command-line tool](https://github.com/sts10/tidy) to remove suffix words from an inputted word list. Tidy users can now easily create a `prefix-free.txt` list (`tidy -AP -o prefix-free.txt inputted-word-list.txt`) and `suffix-free.txt` list (`tidy -AU -o suffix-free.txt inputted-word-list.txt`) and compare them.

I also opened [a GitHub issue asking for help answering this suffix codes question](https://github.com/sts10/tidy/issues/7). If you have any insights, please leave a comment!

## An "optimal" procedure?

A natural follow-up question here is what other procedures would guarantee safety while removing the least number of words. I attempted to create an even more optimal procedure with my ["Compound Passphrase List Safety Checker"](https://github.com/sts10/csafe), but there are issues with this procedure, including three-word combinations.

After thinking about it for a bit, I figured the field of information theory might already have a solution to this very issue. I ventured over to r/informationtheory on Reddit and [did my best to ask my question](https://www.reddit.com/r/informationtheory/comments/vnretf/question_about_suffix_codes_and_safe_concatenation/). 

After a back-and-forth with u/ericGraves, I learned a couple very useful things. First of all, this quality of a word list that I've been awkwardly calling "compound safety" or "concatenation safety" is what information theory calls a **uniquely decodable code**. I was excited that this term made sense to me: we want a "code" (a collection of words, in our case), that can be "decoded" (read) in only one, unique way.

### A realization

In the past, I conflated two things. I thought saying a word list was "free of prefix words" was the same as saying it's uniquely decodable. But I now see that removing all prefix words is simply one method of guaranteeing that the resulting code is uniquely decodable.

Understanding this difference is important for making room in our thinking for alternate procedures of creating uniquely decodable lists. It's for this reason that I'm most grateful to have learned this powerful phrase/concept.

### An algorithm

Later, this knowledgable Reddit user wrote:

> I would suggest [Sardinas-Patterson algorithm](https://en.wikipedia.org/wiki/Sardinas%E2%80%93Patterson_algorithm) for determining if a code is uniquely decodable, and removing failure points.

Whoa! Yes! Here is what is supposedly an algorithm that can tell you whether a given code is uniquely decodable. 

Clearly, this would be a great boolean to add to the attributes of a word list that [Tidy](https://github.com/sts10/tidy) (optionally) prints for users.

But the larger challenge is to go further and figure out how we might use the mechanism(s) of this algorithm to **remove the fewest number of code words to make a given list uniquely decodable**. I have a feeling that we can do better than removing all prefix words or removing all suffix words.

### Some code

To this end, I've played around with implementing Sardinas-Patterson for myself in Rust, in an effort to learn more about how it works and how I/we might develop a method of removing the fewest number of code words to make a code uniquely decodable.

However, I've yet to accomplish the first step of getting an implementation of the algorithm working. I can't quite understand how the algorithm works in subsequent rounds. A work in progress!

You can check out [the Github repo](https://github.com/sts10/uniquely-decodable). Feel free to contribute!

<!-- ### Can Huffman coding help us here? -->

<!-- https://www.youtube.com/watch?v=dM6us854Jk0 -->
