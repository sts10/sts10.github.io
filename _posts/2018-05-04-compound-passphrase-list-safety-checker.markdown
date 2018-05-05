---
layout: post
title: "My Compound Passphrase List Safety Checker"
date: 2018-05-04 22:13:50 -0400
comments: true
---

I've been thinking about [information theory](https://www.amazon.com/Introduction-Information-Theory-Symbols-Mathematics/dp/0486240614/ref=sr_1_1?ie=UTF8&qid=1525486758&sr=8-1&keywords=john+R.+Pierce), [entropy](https://github.com/sts10/bits-to-die), and passphrases for a couple of months now. I've been particularly interested in using random passphrases as passwords. An example of one of these passphrases would be "stamina turret backlands ruby". The words have to be as purely random as possible -- using your four dogs' names is not nearly as strong as a password, as an attacker would likely guess that relatively early. 

If you chose the words randomly from a list (more on these lists below), the resulting passphrase is actually _mathematically_ pretty strong compared to passwords you may have be trained to think are strong. There's a classic xkcd comic illustrating this point:

![An illustration of how random-word passphrases are pretty strong](https://imgs.xkcd.com/comics/password_strength.png)

Crucially, _even_ if an attacker knows what list you used and how many words long your passphrase, there's just too many possible combinations to guess.

And of course, four words are surprisingly easy for a human to memorize. A long-lasting turret planted in ruby-filled backlands is an easier story to remember than "V7L8HQu6K", which has about the same amount of strength according to the password strength estimator [zxcvbn](https://github.com/dropbox/zxcvbn). 

The fact that these phrases take advantage of humans' ability to create a story to remember the phrase seems notable to me. There's something fundamentally human about creating and carrying stories with us. If using complex passwords is a battle between human and machine (say [a password-cracking GPU](https://www.youtube.com/watch?v=7U-RbOKanYs)), we need to use every advantage humans have over computers. It's a peculiar inversion of Licklider's ["Man-Computer Symbiosis"](https://groups.csail.mit.edu/medg/people/psz/Licklider.html), a revolt of sorts against the frightening and (I would argue) underestimated capacity of modern computers (again, [watch Computerphile's video on password cracking](https://www.youtube.com/watch?v=7U-RbOKanYs) or check out [_Weapons of Math Destruction_](https://www.amazon.com/Weapons-Math-Destruction-Increases-Inequality/dp/0553418831/ref=sr_1_2?ie=UTF8&qid=1525487280&sr=8-2&keywords=weapons+of+math+destruction)).

## A Question

Earlier this year I watched this Computerphile video called ["Diceware & Passwords"](https://www.youtube.com/watch?v=Pe_3cFuSw1E), which offers a nice introduction to a method of generating these random passphrases using [dice](https://www.eff.org/dice). [About 8 minutes in](https://youtu.be/Pe_3cFuSw1E?t=8m36s) the presenter, Dr. Mike Pound, explains something that perked my ears up: He explained that you need spaces (or other punctuation) in between the words because "sometimes you might accidentally join two words together and they'd actually be a different word on their and in which case your [phrase] goes down to four words."

Here's the hypothetical he's describing: What if we just mashed our words together, so instead of "casket-stoppage-desk-top" we just used "casketstoppagedesktop" as our password. The problem here is that, if "desktop" is also a word on your word list (and thus the attacker's list, given our assumptions above), this passphrase is only a _three_ word phrase, which is notably weaker than a four-word phrase. The user thinks they have the security of a four-word phrase, when they really only have three. Note that this would only happen in rare cases when two words that make a compound word that's on list are right next to each other, and, of course, the user chooses not put anything between the words. It's important to note that if there is punctuation between the words, this problem does not exist.

I knew that my chosen password manager, [KeePassXC](https://keepassxc.org), allows users to generate passphrases with punctuation between words _or without_ punctuation. (Below is an example with hyphens between words.)

![KeePassXC](https://sts10.github.io/img/keepassxc/random-master-passphrase.gif)

When generating passphrases, I generally put a hyphen or space between the words (as seen in the GIF), but what if for some I had not, and one of them had one of the "collisions" that Dr. Pound describes in the video? More broadly, was there a way to check or edit word lists in order to make this problem impossible (and thus more foolproof?). 

## First Results

By the end of February I had slapped together [a quick Rust script](https://github.com/sts10/compound-passphrase-list-safety-checker/tree/3ed1b56507559dd926e10da79fd1918db875afb9) in an attempt to answer this question. I was specifically interested in testing the word list that KeePassXC uses, namely the [EFF long word list](https://www.eff.org/files/2016/07/18/eff_large_wordlist.txt), which is 7,776 words long. 

I'm new to Rust, so I had to use poor logic to get the program to work: It mashes every pair of words together, then check that "mashed" word is one of the other 7,774 words on the list. Since this program had to run `7776^2` checks against the list, it was pretty slow (I also didn't know to run Rust as a release rather than in debug mode). But 11 hours later the program informed be that it found no "bad words" in the EFF long word list. This means that, even without punctuation between words, there's no way to encounter the problem described by Dr. Pound.

I later learned that this is likely because the EFF, in [making the list](https://www.eff.org/deeplinks/2016/07/new-wordlists-random-passphrases), "ensured that no word is an exact prefix of any other word."

## Taking it a Step Further: Compound Safety

I let this idea sit for a while, but eventually I made some more observations and even invented a term to help me get my head around this problem of weakness in passphrases without punctuation between words. There are of course other word lists that are used to generate these passphrases, and some of them, unlike the EFF list, might be susceptible to this issue! 

OK, so here's a definition for us. A passphrase word list is "compound-safe" (that is, it's safe to join words without punctuation or spaces) if it...

1. does NOT contain any pairs of words that can be combined to make another word on the list. (We'll call this a "compounding")

2. does NOT contain any pairs of words that can be combined such that they can be guessed in two distinct ways within the same word-length space (We'll call this a "problematic overlap").

Number 1 is the Dr. Pound issue described above. Number 2 is new -- it was suggested to me by a social media user. Some further explanation, from [my current tool's README](https://github.com/sts10/compound-passphrase-list-safety-checker/blob/master/readme.markdown): 

> An example of condition #1: If a word list included "under", "dog", and "underdog" as three separate words, it would NOT be compound-safe, since "under" and "dog" can be combined to make the word "underdog". A user not using spaces between words might get a passphrase that included the character string "underdog" as two words, but a brute-force attack would guess it as one word. Therefore this word list would NOT be compound-safe. (I refer to this as a "compounding".)

> An example of condition #2: Let's say a word list included "paper", "paperboy", "boyhood", and "hood". A user not using spaces between words might get the following two words next to each other in a passphrase: "paperboyhood", which would be able to be brute-force guessed as both [paperboy][hood] and [paper][boyhood]. Therefore this word list would NOT be compound-safe. (I call this a "problematic overlap".)

> Another way to think about problematic overlaps: if, for every pair of words, you mash them together, there must be only ONE way to split them apart and make two words on the list.

My idea was that it would be useful to know, given a word list, if it is "compound-safe" or not. That is, is it safe to generate passphrases without punctuation between the words without fear of the two issues described above. 

## Just Tell Me About the Thing You Made

[Compound Passphrase List Safety Checker](https://github.com/sts10/compound-passphrase-list-safety-checker) is a command line tool written in Rust that takes a given word list and checks to see if it's compound-safe, according to the two conditions above. If it is found to be safe, it simply exports the list as is. But if the tool finds compound-safe violations, it removes enough words for the list to be compound-safe. Since a longer list leads to "stronger" (read: higher entropy) passphrases, it attempts to remove the minimum number of words to make the outputted list compound-safe, however I have yet to spend a lot of time optimizing this.

Here's the [section of the README on how to use to tool to check a word list](https://github.com/sts10/compound-passphrase-list-safety-checker#how-to-use-this-tool-to-check-a-word-list).

## Safe Enough?

I hadn't thought of the second condition ("problematic overlaps") until it was suggested to me by a [Fediverse](https://joinmastodon.org/) user. And even then it took me a sleepless night to understand it. My point being: there may well be other ways that putting random words together without punctuation to create passphrases can be problematic in terms of entropy and/or guessability. In other words, I don't know if the edited lists outputted by this tool are actually safe enough to use without punctuation between words. If you can think of any, be sure to [submit an issue](https://github.com/sts10/compound-passphrase-list-safety-checker/issues/new) or [drop me a line](https://gist.github.com/sts10/4a4e01021b3a5ad42e9b73e0abd7b7e3).

## The 1Password List

The EFF long list is compound-safe even given the second, "problematic overlap" condition described above (again, phew/cool). However, I found [the word list](https://github.com/agilebits/crackme/blob/master/doc/AgileWords.txt) (named [agile_words.txt](https://github.com/sts10/compound-passphrase-list-safety-checker/blob/master/word_lists/agile_words.txt) in my project) used by the [1Password](https://1password.com/) password manager is NOT compound-safe. PLEASE NOTE: this is NOT a security problem, since 1Password _requires_ users put punctuation between the generated words. Let me say this again: **This is not a security issue with 1Password**. 

I found [2,661 compound words](https://github.com/sts10/compound-passphrase-list-safety-checker/blob/master/scrap-lists-of-compound-words-and-components/agile_single_bad_words.txt) (like "underdog"), made up of [1,511 unique single words](https://github.com/sts10/compound-passphrase-list-safety-checker/blob/master/scrap-lists-of-compound-words-and-components/agile_single_bad_words.txt) ("under", "dog"). The tool was able to remove just 498 of these single words to make compoundings impossible.

The tool also found 2,117 problematic overlaps in the 1Password list, and marked 2,117 words for removal.

All told, the tool removed 2,225 unique words from the 1Password list to make a new, compound-safe list. Thus [my compound-safe version of the Agile list](https://github.com/sts10/compound-passphrase-list-safety-checker/blob/master/word_lists/agile_words-compound-safe.txt) has 16,103 words, down from the original 18,328 words. With 16,103, each word from this list would add about 13.98 bits of entropy to a passphrase, compared to the original 1Password list, which adds about 14.16 bits.

Now, listen, I don't recommend you go download the 16,103 word list and start generating phrases without punctuation. I'm a social media editor, not a security researcher. 

Again, with emphasis: 1Password's software, as far as I know, does NOT allow users to generate random passphrases without punctuation or spaces between words. Users must choose to separate words with a period, hyphen, space, comma, or underscore. So these findings do NOT constitute a security issue with 1Password.

## How Often Are Non-Safe Passphrases Generated

As I [note in the tool's README](https://github.com/sts10/compound-passphrase-list-safety-checker#realistically-what-are-the-odds-of-either-a-compounding-or-a-problematic-overlap-occurring-in-a-randomly-generated-passphrase), I don't really know. I'm just not that strong at probability math. I appreciate any insight on this -- and I'd be curious what an "acceptable" probability would be, if any.

## A Practical Use?

KeePassXC still lets user generate phrases without punctuation, and it now also lets users use their own word list ([source](https://github.com/keepassxreboot/keepassxc/issues/978#issuecomment-331441600)) (though it appears to be not very easy to do). This is certainly a nice feature, particularly for non-English speaking users. However I wonder if the lists added by users will be as carefully constructed as the EFF list. This tool could be used to "clean" lists before use (I have no reason to believe it wouldn't work for languages other than English, assuming special characters are handled well). Or it could even be re-written in C++ and integrated into KeePassXC, to be run on any user-selected word list. 

It may seem more practical to have a random passphrase generator like KeePassXC's check _individual_ generated passphrases for compound-safety (and maybe only when the user chooses to have no punctuation between words). But I think this would decrease the entropy-per-word of the passphrases in a complex, unintuitive way. But that's just a guess really. Of course KeePassXC could also force users to use a word separator, like 1Password does.

## Caveat about "Three-Word Compounding"

While we've explored "two-word compounding", where two words are actually one, I accept that there is a possibility of a three-word compounding -- where three words become two. No idea how likely that is, or how to efficiently check for that, but know that this tool does NOT currently check for this, and thus I can't actually guarantee that the lists outputted by the tool are completely compound-safe.

## Toward a more theoretical understanding of compound safety

EFF notes that, in [making the list](https://www.eff.org/deeplinks/2016/07/new-wordlists-random-passphrases), they "ensured that no word is an exact prefix of any other word." My compound-safe lists have words that are exact prefixes of other words, prompting the question: Is the no prefix-rule _too strict_? In other words, are there word lists that don't satisfy the prefix rule but are compound-safe? My compound-safe version of the 1Password list purports to be this, but I don't know if there are further conditions necessary to ensuring compound-safety. 

At present I'm not sure why EFF fellow Joseph Bonneau avoided exact prefixes. But considering [his extensive experience in this area](http://www.jbonneau.com/doc/jbonneau_cv.pdf) I'd assume it was to avoid problems at least related to the one I've been describing. What I'm more interested in is understanding a more formal definition of what makes a good word list, and, if possible, developing a tool to check if a given list is safe to use in the most ways possible. Toward that end, I'd say my tool is a proof of concept at best. Hopefully someone far smarter than me has been working on something like this already.
