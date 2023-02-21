---
layout: post
title: "Using playing cards to create passphrases"
date: 2023-02-21 09:00:00 -0400
comments: true
---

As you may know, there is [a method for using dice to create strong passphrases](https://www.eff.org/dice). If users have 6-sided dice, this means the wordlists used in conjunction with this method usually must be 7,776-words long. This means that each additional word chosen gives the resulting passphrase 12.925 bits of entropy. 

I argue that we can also use a deck of well-shuffled playing cards as an easy source of human-generated randomness.

If we compress spade and clubs suits into their color, black, and diamonds and hearts into their color, red, we get a nice base-26 source of randomness. This can allow for a word list of 17,576 words, which would provide 14.101 bits of entropy per additional word.

## How use playing cards to create a strong passphrase

### Set-up
1. Open [this cardware word list](https://raw.githubusercontent.com/sts10/generated-wordlists/main/lists/experimental/cardware.txt) in your browser, or print it out.
2. Prepare any deck of playing cards by removing any jokers. There should be 52 cards in the deck.

### Getting a random word
1. Shuffle the deck
2. Pick a random card, say a 7 of diamonds. 
3. Write down "R07" (for red 7) on a sheet of paper. (The list uses "Ja" for jacks, "Qu" for queens, "Ki" for kings, and "Ac" for aces.)
4. Re-insert the selected card back into the deck. This step is crucial.

Repeat these steps 3 times until you've written down codes for 3 cards, for example something like "R07-BKi-RJa" ("Red 7, Black King, Red Jack"). Consulting the cardware list, we see this example correlates to the word "replies". This is the first word of your passphrase. 

Repeat these steps as many times as you like to create a strong passphrase, like `replies tunnels deteriorating repository regeneration treatise` (6 words gives about 84 bits of entropy). 

Note that you can use any delimiter you like between the words, or none at all (`repliestunnelsdeterioratingrepositoryregenerationtreatise`). 
