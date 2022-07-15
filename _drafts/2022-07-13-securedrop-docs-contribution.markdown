---
layout: post
title: "Contributing passphrase guidance to SecureDrops docs"
date: 2022-07-13 14:00:00 -0400
draft: true
publish: false
comments: true
---

Back in May, I was reading over [SecureDrop's documentation](https://docs.securedrop.org/en/stable/index.html) and its GitHub Issues. (If you don't know, [SecureDrop](https://securedrop.org/) "is an open-source whistleblower submission system that media organizations can use to securely accept documents from and communicate with anonymous sources." It's maintained by the Freedom of the Press Foundation.)

Running SecureDrop involves generating and storing multiple, unique passphrases. In fact, [the documentation's page on passphrases](https://docs.securedrop.org/en/stable/passphrases.html) mostly outlines all of the passwords users need to create and keep track of. As you may have gleaned, I'm very interested in passphrases.

I was excited to spot not one but two issues related to passphrases that I felt able to contribute to: ["Explain how to generate a diceware passphrase #332"](https://github.com/freedomofpress/securedrop-docs/issues/332) and ["Provide guidance on how strong the Tails admin password should be #335"](https://github.com/freedomofpress/securedrop-docs/issues/335). 

## More about these passphrases

I'll note now that these passphrases are mostly used to protect Tails persistent storage volumes. Basically, SecureDrop makes heavy use of an operating system called [Tails](https://tails.boum.org/). The features of Tails, while awesome, are a bit beyond the scope of this blog post. What we need to know is that: if you want to any files you create or download while using Tails to exist after shutting down Tails, you need to save them in a volume or partition called "persistent storage", which is encrypted. Given [SecureDrop's threat model](https://docs.securedrop.org/en/stable/threat_model/threat_model.html), we want these persistent storage volumes to be well protected in case the USB drives that Tails is installed on get compromised.

## How the documentation started

At the time, the Tails setup page in the documentation advised users to use dice to create passphrases, linking to an Intercept article. 

> Each Tails persistent volume should have an unique and complex passphrase that’s easy to write down or remember. We recommend using [Diceware passphrases](https://theintercept.com/2015/03/26/passphrases-can-memorize-attackers-cant-guess/).

## Is KeePassXC's passphrase generator acceptable for SecureDrop users?

Tails comes with a password manager called KeePassXC. As you might imagine, KeePassXC can generate random passphrases (using the EFF long list, which is 7,776 words long). I figured it was worth at least suggesting in a PR that users be able to trust KeePassXC's random passphrase generator. Not everyone wants to find and roll dice to make a passphrase! 

This idea seems to have been uncontroversial and well received! 

## How strong should the passphrases be? 

The next question in re-writing these recommendations in the docs was how **strong** to suggest these passphrases should be. In practical terms, how many _words_ should each unique passphrase be. I was a little surprised that there wasn't more guidance on this!

I'll pause here and say that most of these passphrases are for protecting encrypted storage on the Tails USB stick itself. This is necessary to store passwords and other files, since we wouldn't want Tails to delete them on shutdown.

In my initial PR, I conservatively suggested a 7-word passphrase. Since KeePassXC, by default, uses the EFF long list, 7 words gives about 90 bits of entropy. I figured that was a decent balance between usability and security, but admittedly it was a bit of a shot in the dark. But I figured we could hash out the exact number in the comments of the PR on GitHub.

Thankfully, [David Huerta](https://github.com/huertanix), a Freedom of the Press digital security trainer, [answered a few of our questions](https://github.com/freedomofpress/securedrop-docs/pull/351#issuecomment-1119714484): 

> I haven't yet seen solid evidence showing that 7 words is necessary for Tails persistent storage passphrases. Most password cracking models that I've explored don't seem to go into detail on whether or not they take things like the speed of a hashing function into account. If LUKS's encryption scheme would have any mitigations that would slow password cracking attempts, as algorithm implementations in some password managers do, for example (https://security.stackexchange.com/a/137307, "Bruteforcing the master password"), then it may be that a shorter passphrase would be fine, and I think it's useful to explore that possibility.

> Based only on my anecdotal evidence (but in this case anecdotes from newsrooms) the longer a passphrase is, the more difficult it will be to memorize. Without going into detail I've seen journalists use other means to store their long passphrases. Easier-to-remember passphrases may make those other means less necessary.

This told me a few things. First -- and I maybe should have know this beforehand -- the Tails persistent storage volumes use [LUKS disk encryption](https://en.wikipedia.org/wiki/Linux_Unified_Key_Setup). Second, as expected, journalists are humans and there is indeed a trade off between security and convenience here. Was 7 words too many? David provided a route to an answer by asking what mitigations LUKS has to slow cracking attempts. 

## Wait, remind me what we're doing here

Ultimately, we want to figure out how many guesses at the passphrase an attacker can make in a second. The mitigations Huerta references are steps that LUKS takes to slow these guesses down. For example, _if_ we can slow it down such that it takes, say, 1 full second for an attacker to make a guess, it'll take 11 days for them to make a million guesses. It'll take 31 years to make a billion guesses.

Here's a metaphor for us to think about. Let's say the lock on your apartment door accepts 1 of 100 keys that the company makes. In this case, an attacker could buy all 100 keys and then just try every one before any one noticed. If it takes 3 seconds to try a particular key, the attacker will get through all of them in 5 minutes (and on average, will try your key about halfway through, so only 150 seconds after their first attempt). 

One way we can slow this attacker down is by makes more possible keys-- say 200 or 1,000,000. Another way would be to make the lock in such a way that it takes longer than 3 seconds to try a key. For example, what if the lock required you to turn the key 5 full rotations before the key either worked or did not work. Now it takes the attacker 15 seconds per key, thus tripling expected attack time. 

To tie this back to the technological issue at hand, in our LUKS encryption situation, we're looking to see how long it takes for an attacker to find out if a password is correct or incorrect. Does LUKS have some protections in place to slow guessing down? How many times do you have to turn the key in their lock?

### Learning about Tails and LUKS

To find out, I first had to make an encrypted volume, just like a SecureDrop admin would (obviously mine is just for testing purposes). As I replied on Github: 

> I took this as a challenge to do a little investigating. I installed and started up Tails (first time!) following [these instructions](https://tails.boum.org/install/linux/index.en.html). I then created a persistent storage partition (using a trivial passphrase) following [these instructions](https://tails.boum.org/doc/first_steps/persistence/index.en.html). In both cases, I was attempting to do what I'd assume a regular SecureDrop user would do, following current documentation.

Next, we need a tool to tell us about the protections on this LUKS "lock".

> Then I went off-script, and I set an admin password for Tails and installed cryptsetup from [the tar file linked from this Gitlab repo](https://gitlab.com/cryptsetup/cryptsetup#download) (installing via `sudo apt install cryptsetup` was giving me issues, I assume because its Tails). I then ran `sudo ./cryptsetup luksDump /dev/sdb2` to learn more about our new encrypted partition. Here's what it output:

(In other words, here's what information we got about the lock.)

```text
LUKS header information for /dev/sdb2

Version:       	1
Cipher name:   	aes
Cipher mode:   	xts-plain64
Hash spec:     	sha256
Payload offset:	4096
MK bits:       	512
MK digest:     	42 83 6b 5b f7 86 c4 43 9f a4 3a e0 88 7e 96 dd bb f1 e7 1b 
MK salt:       	2d a6 f7 26 07 ee b5 6d 7e 88 c1 4b ac 62 4e 7e 
                74 d5 61 69 df f2 7b 4b 50 d2 71 ca 32 bb 42 82 
MK iterations: 	113580
UUID:          	c2874e1b-fbf0-49ff-85b8-ec4c17de2047

Key Slot 0: ENABLED
    Iterations:         	1820444
    Salt:               	0a 38 61 15 4b b6 39 b5 45 c4 a7 22 59 59 2c 34 
                            65 cc d0 73 6a 57 58 8c 6a bf 24 97 00 7f 43 f1 
    Key material offset:	8
    AF stripes:            	4000
Key Slot 1: DISABLED
Key Slot 2: DISABLED
Key Slot 3: DISABLED
Key Slot 4: DISABLED
Key Slot 5: DISABLED
Key Slot 6: DISABLED
Key Slot 7: DISABLED
```

This gives us a few useful pieces of information about our "lock". First, that this fresh Tails persistent storage volume uses LUKS version 1. I'm pretty sure that [LUKS version 1 uses PBKDF as its key derivation function](https://infosecwriteups.com/how-luks-works-with-full-disk-encryption-in-linux-6452ad1a42e8). 

Next, I focused on the "Hash spec": "sha256". I guessed that that means that the partition uses PBKDF2-sha256 to hash the passphrase (the "internal hash function" is HMAC-SHA-256). 

Finally, 

> the other number we're interested in is number of iterations... I'm not sure if that's the 113,580 number or 1,820,444. If I had to guess I'd say "MK" stands for "master key", which is not the passphrase the users sets, so for our purposes, we're more concerned with the ~1.8 million number. (Obviously neither are round numbers, so my guess is that the Tails GUI uses a time-based benchmark to set this value?)

For our lock metaphor, this is information about the lock I made when I created my test LUKS volume. To see if a password is correct, users (or attackers) much complete 1.8 _million_ iterations (or, turns of a key) to find out if it's the correct password (key)!!

That might sound like a lot, but my same laptop can do about 1,736,052 iterations per second on this type of "lock". (Maybe we can imagine the attacker putting each key into an high-powered drill that turn 1.7 million times per second?) I don't think it's a coincidence that these numbers are relatively close: It's likely that Tails/LUKS used a one-second benchmark from my laptop when it say the 1.8 million number. 

Let's call it about 1 second per guess. If users set a passphrase by randomly selecting 3 random words from a list of 7,776 words (why 7,776? That's how many words are on the list that KeePassXC uses by default), like "crook-pushover-faceted", it'd take an attacker about 156 centuries to guess them all. If the passphrase is 4 words long ("expansive-unison-carport-latter"), we get up to 121,500 millenia. 

## A slightly more realistic estimate

Of course, an attacker trying to break into a Tails USB drive used by a SecureDrop user is likely going to be using a bit more computer power than a 5-year-old laptop. 

Luckily, [1Password held a passphrase-cracking contest back in 2018](https://blog.1password.com/how-strong-should-your-master-password-be-for-world-password-day-wed-like-to-know/) with similar goals to ours:

> Our (1Password's) goals in offering these challenges is to gain a better sense of the resistance of various types of user Master Passwords to cracking if 1Password data is captured from a user's device.

Even more luckily, the parameters of their challenge are similar to the LUKS defaults I found on Tails: They [published a series of hashes](https://github.com/agilebits/crackme) derived from 100,000 rounds of HMAC-SHA256 on a 3-word passphrase from their word list (about 18,000 words). [The (eventual) winners say they used 21 NVIDIA cards worth of computing power and sustained an average speed of 209.85 kH/s.](https://github.com/agilebits/crackme/blob/master/write-ups/DOHB6DC7.md) Given our formula above, and for conservative sake, maintaining the 100k iterations of the contest, that's `1/(209.85*1000) * 7776**4 /60 / 60 / 24 / 365` or 552 years to get through the entire space of a 4-word passphrase from the EFF long list. 3 words gets us down to 25 days.

Thus, 3 words is a little dicey, 4 feels better... 

In the end, I stuck by my recommendation of 7 words: I figured _I_ didn't want to be the reason one of these encrypted drives gets cracked. I think you'd want more user stories to make a call on whether the trade-off between security and convenience is worth knocking this down to 6 or 5 words. And obviously it'd be easy to tweak the number of the recommendation in the documentation. I'm proud that I got the ball rolling.
