---
layout: post
title: "Creating a decent Netflix password"
date: 2022-10-24 10:00:00 -0400
comments: true
---

Pop quiz you're at an Airbnb in the Hamptons with 10 friends. After a rousing game of flip cup, the party is threatening to slow down... until someone says they want to watch the new Beyonce live documentary. Someone else navigates to the Netflix icon on the AppleTV in the den. But then... bam! Log in to Netflix? You want to help. You want to offer your log in, confident that in a few days you'll remember to "LOG OUT OF ALL DEVICES" so that the next guests at this Airbnb don't watch ahead of you in Peaky Blinders. But then you remember that your Excellent password, stored in your password manager that you have access to on your phone, looks something like ")9CaCAX7/t2nXFSb%=Y" or ":cn}@}>{j5p/)XV&L=?". How long will it take you to read or type out that string of characters on AppleTV's linear keyboard?

We can do better. I'll walk us through a series of claims, using almost everything I've learned about passwords over the past few years, toward a process for creating a decent password for the situation described above.

## Use words

First, we're going to use words rather than random characters. 

![correct horse battery staple](https://imgs.xkcd.com/comics/password_strength.png)

If you're reading your password to someone inputting it into a device, it's much quicker to read 4 to 6 words than 15 to 25 characters. It's also more error resistant. If your friend hears "correcb" they can probably turn that into "correct". And if you're typing the password in yourself, while using words is more characters, it's easier to "carry" a word in your head mentally as you move from the password manager app on your phone to the TV.

Plus, it's usually a pain to switch to the numbers/punctuation keyboard on SmartTVs, and it costs "clicks" (more on this below).

So we could select, say, 4 random words and make that our password. But we can be a bit smarter about this...

## Fewer button presses?

What _list_ of words should we use to create our Netflix password? A classic choice is [the EFF long list](https://www.eff.org/dice). This list has 7,776 words on it, so each word in your passphrase gives 12.925 bits of entropy. 

(Some security assumptions: Going forward, we will assume that our attacker has the exact word list that we used to create our passphrase. Below, I'm going to assume that 51 bits of entropy is sufficient for Netflix, but users can increase that based on their threat model by either using more than 4 words from the final list, or by creating a longer list themselves.)

But what if we made a list that is more optimized for our Hamptons party? We're trying to minimize the number of "clicks" we or a friend has to make on the remote as party enthusiasm wanes. What if we assume the linear keyboard that AppleTV uses. It looks like this:

```txt
abcdefghijklmnopqrstuvwxyz
```

Then, we could "score" a given word by how many "clicks" it takes to type, including the left-right movement between characters. So for example, "bad" would score 6 clicks. "zap" would cost 43 clicks. 

As large base word list of common English words to start from, we could [scrape Google Books for frequently used words since 1975](https://github.com/sts10/common_word_list_maker). Let's arbitrarily take the 18,000 most common words. 

We could then [sort these 18,000 words by click score (given our assumed linear keyboard)](https://github.com/sts10/remote-words/blob/main/lists/raw/alpha-line.txt), putting low click scores first. Then we could take the top 7,776 words from this list and randomly select, say, 4 words to make a decent Netflix password like "rust gps fearing scaled" or "vat tamil sly sadly".

Not bad! But what about those spaces between the words? Those cost clicks! Do we need them? Can we just mash the words together?

## Uniquely decodable lists

If we were to remove the spaces from these passphrases ("rustgpsfearingscaled") (i.e. remove the delimiter), we would save a bunch of clicks, but we would also expose ourselves to a subtle security issue. 

As a brief example, if a list has "boy", "hood", and "boyhood" on it, users who specified they wanted two words worth of randomness (entropy) might end up with "boyhood", which an attacker guessing single words would try _before_ moving on to two-word combinations. This is bad! We're picking 2 (or 4) words based on important security assumptions, namely that an attacker, even one who has our exact word list, would have to work through 7776<sup>2</sup> possible combinations (or, if we're using 4 words, 7776<sup>4</sup>).

But we can solve this issue by removing certain words from the list. In this toy example, if we removed the word "boy" from our list, we'd be safe to mash the words together without a delimiter. This is because "boy" is the only "prefix word" on the list, so removing it makes the remaining list something called [a prefix code](https://en.wikipedia.org/wiki/Prefix_code), a key concept in coding theory. Lists that are free of prefix words are guaranteed to be **uniquely decodable**. This is the property we're interested in -- this is what makes it safe to combine words without a delimiter, since they can be "decoded" in only one way. 

Cool. We could remove all prefix words from our list and go with that (an example passphrase "exotic officials flavors months" which we could safely make "exoticofficialsflavorsmonths"). The issue here is that removing all prefix words removes some great, easy-to-type words (like "boy"). Ideally, we'd **want to make our word list uniquely decodable while removing the fewest number of words possible**.

### Schlinkert pruning

Is there another way to make a list uniquely decodable, besides removing al prefix words? Well, turns out we could remove all _suffix_ words ("hood", in the above example). With English words at least, removing all suffix words seems to "save" more words than removing all prefix words, so that's good. But was there an even better algorithm?

To learn more about this, I read about the Sardinas–Patterson algorithm, an algorithm created in 1953 by August Albert Sardinas and George W. Patterson. [From Wikipedia](https://en.wikipedia.org/wiki/Sardinas%E2%80%93Patterson_algorithm): 

> In coding theory, the Sardinas–Patterson algorithm is a classical algorithm for determining in polynomial time whether a given variable-length code is uniquely decodable, named after August Albert Sardinas and George W. Patterson, who published it in 1953. The algorithm carries out a systematic search for a string which admits two different decompositions into codewords. As Knuth reports, the algorithm was rediscovered about ten years later in 1963 by Floyd, despite the fact that it was at the time already well known in coding theory.

Sardinas-Patterson only tells us whether a given list (or code) is uniquely decodable -- we want an algorithm that takes a list and spits out a list of words to remove to make it uniquely decodable (and hopefully the list of necessary removals is short!).

To accomplish this, I tweaked the Sardinas-Patterson algorithm to create a new process that I call ["Schlinkert pruning"](https://sts10.github.io/2022/08/12/efficiently-pruning-until-uniquely-decodable.html). In [simple tests](https://sts10.github.io/2022/08/12/efficiently-pruning-until-uniquely-decodable.html#schlinkert-pruning-preliminary-results), Schlinkert pruning does remove fewer words than removing all prefix words or all suffix words. Awesome!

So, instead of removing all prefix words or all suffix words, we'll "Schlinkert prune" our word list to (finally) get a safe list of low-click-cost words that we can safely combine and use.

## Final list 

Finally, we now have [a usable word list](https://github.com/sts10/remote-words/blob/main/lists/usable/alpha-line.txt) for our particular use-case. (Note that I've removed some profane words, as well as things like Roman numerals, from this final, "usable" list.)

Some example 4-word passphrases from this final list that we could use for Netflix and keep that Hamptons party going:

```
areasfitnesscutsspotted
folderflungsmilesgrooves
savebuddolphinscouncils
hinderedpurpleslickchoose 
clotheddaisymotionlessoffense 
```

If you want more than 51 bits of entropy, you can use more than 4 words. Please use your own threat model!

## Epilogue: Other smartTV keyboard layouts? 

Above, we assumed the Hamptons house had an AppleTV with a particular strange linear keyboard. 

Following the process above, we can make separate lists for other layouts. As you might expect, this results in different word lists. See [this repo for more](https://github.com/sts10/remote-words).
