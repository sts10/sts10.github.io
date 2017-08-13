---
layout: post
title: "YubiKey and OpenPGP"
date: 2016-12-06 22:40:37 -0500
comments: true

---

On Cyber Monday, I took advantage of [Yubico](https://www.yubico.com)'s 2-for-1 YubiKey deal and got two [YubiKey 4](https://www.yubico.com/products/yubikey-hardware/yubikey4/)s for the price on one ($40).

My understanding is that usually these keys are used as a 2nd factor in 2-factor authentication schemes. In this capacity it works with Google and Dropbox, as well as a number of password managers including LastPass, dashlane, Keepass, and a [number of others](https://www.yubico.com/applications/password-management/). Also, there's [a breakdown of some of the technical differences between models of YubiKeys](https://www.yubico.com/products/yubikey-hardware/).

However I was more interested in using it to store a PGP key, so that I might be able to use one PGP key on any computer I might find myself. I also wanted this PGP Key to be an RSA key of length of 4,096, so I needed either a YubiKey 4 or a YubiKey 4 Nano. As I say above, I went for the YubiKey 4. 

<!-- more --> 

(Note that according to [the YubiKey 4's FAQ section](https://www.yubico.com/products/yubikey-hardware/yubikey4/#toggle-id-2), "On the same YubiKey, at the same time, you can use U2F to secure your Gmail account, access services like LastPass, as well as secure your communication using applets loaded on your device, such as the OpenPGP applet.")

The most immediate reason I wanted to be able to take my private keys with me when I left a room was that I didn't want them on my work computer.

**Note**: I'm not an expert. While I think I've gotten pretty far with this, I don't understand everything yet. This blog post is mostly for my personal reference of how I got this to work, while consulting a combination of tutorials written by others linked to just below. If that doesn't sound like what you're looking for, check out the tutorials themselves and close this tab-- no hard feelings!

I have a basic understanding of PGP (I also have [an earlier post outlining some basics of PGP](https://sts10.github.io/2015/07/01/my-basic-understanding-of-pgp-encryption.html) if you like), but I knew setting up and using a YubiKey would be tricky for me and I still don't have a full grasp of it. So I spent the $40 and figured I could figure it out. Here's what I did.

![A YubiKey 4](https://hao0uteruy2io8071pzyqz13-wpengine.netdna-ssl.com/wp-content/uploads/2015/04/YubiKey-4-1000-2016-444x444.png)

## What I Did (Tutorials I Found)

To do this I consulted these two tutorials: [this one from Trammel Hudson](https://trmm.net/Yubikey) and [a more official one on the Yubico website](https://www.yubico.com/support/knowledge-base/categories/articles/use-yubikey-openpgp/). 

There's also [this drduh gist](https://github.com/drduh/YubiKey-Guide), however it's does everything though the command line and is done on a Linux Debian installation (not MacOS).

There's also [this GnuPG.org manual](https://www.gnupg.org/gph/en/manual.html) (which has a [key management section](https://www.gnupg.org/gph/en/manual.html#MANAGEMENT)) that I'll reference later.

## PGP Strategy / Goals

As mentioned above, my goal was to have one PGP key that would follow me around from computer to computer. And rather than use a regular USB key to shuttle my private keys to each computer, I figured there was a more secure option with similar portability, which seems to be what the YubiKey 4 is made for (it's small enough to live on key chain). 

So I'd make this key and put it on the YubiKey. This key pair's public key would (hopefully) never be uploaded to a public key server. The reason I didn't want it on any public key servers is that I'd be able to **completely delete it** and make a new one without having to revoke it from public key servers. When I left BuzzFeed I had to revoke the key I made and associated with my buzzfeed.com email address. Now when you search "Sam Schlinkert" on the MIT server, you see two keys:

```
pub  4096R/B80500F2 2015-09-16 Sam Schlinkert <sschlinkert@gmail.com>
Fingerprint=EF45 36E5 6440 EF4D 5D31  E82A 5BF6 E5C2 B805 00F2 
---------------
pub  4096R/3CC91D33 2015-06-24 *** KEY REVOKED *** [not verified] Sam Schlinkert <sam.schlinkert@buzzfeed.com>
Fingerprint=56AB EFDF 1373 7728 2394  B9FF 77D9 AF85 3CC9 1D33 
```

As you can see, while the revoked key is relatively well labeled as "REVOKED", it's still there, meaning that there'd be another revoked key every time I deleted and made a new key pair for the YubiKey. If I reovked my keys frequently, this search result page would keep getting more cluttered.

That said, I still wanted to maintain a key on the public servers-- ostensibly for initial contact. Since I already have a key on the servers, I figured I'd just keep that for now.  ([here it is](https://pgp.mit.edu/pks/lookup?op=get&search=0x5BF6E5C2B80500F2) on MIT's server). I still have it linked to from my Twitter account.

My inspiration for prioritizing this ability to recycle my (relatively) more-secure key (the one on the YubiKey in this situation) frequently and easily is this [blog post by Filippo Valsorda](https://blog.filippo.io/giving-up-on-long-term-pgp/) and [this Gist on "Operational PGP"](https://gist.github.com/grugq/03167bed45e774551155) by [@thegrugq](https://twitter.com/thegrugq).

In [his blog post](https://blog.filippo.io/giving-up-on-long-term-pgp/) about why he's giving up on long-term PGP, Valsorda writes: 

> But the real issues I realized are more subtle. I never felt confident in the security of my long term keys. The more time passed, the more I would feel uneasy about any specific key. Yubikeys would get exposed to hotel rooms. Offline keys would sit in a far away drawer or safe. Vulnerabilities would be announced. USB devices would get plugged in.

> A long term key is as secure as the minimum common denominator of your security practices over its lifetime. It's the weak link.

> Worse, long term keys patterns like collecting signatures and printing fingerprints on business cards discourage practices that would otherwise be obvious hygiene: rotating keys often, having different keys for different devices, compartmentalization. It actually encourages expanding the attack surface by making backups of the key.

I learned more from [thegrugq's Gist on "Operational PGP"](https://gist.github.com/grugq/03167bed45e774551155):

> A more secure mitigation against key loss is to generate new keys frequently, use them for specific operations, and then destroy them. For example, when traveling, create a new Travel PGP Key and use that until you are back home. That way if anyone compromises your travel laptop they only breach the compartment for the duration of your travel. The impact of the compromise is contained by the limitation on the utility of the PGP key.

> So -- more keys, more often.

Given that the key on my YubiKey won't be public, I would be able to recycle them often or between "operations". So maybe every few months, or if I start using PGP more, every few weeks.

One downside to this strategy is that the key on the YubiKey won't be very useful for authenticating myself. However I have that public-facing key linked to on my verified Twitter account as well as on my Facebook account, which I think replaces my need to have any of my PGP keys signed by members of a web of trust.

## Preparation

**OK let's get a new, fresh key pair on to my new YubiKey 4.**

From the [official tutorial](https://www.yubico.com/support/knowledge-base/categories/articles/use-yubikey-openpgp/) I learned that, since I have a YubiKey 4, I did NOT need to change the mode to enable CCID: "Note that all YubiKey 4 devices and all YubiKey NEO devices are now shipped with CCID mode enabled by default."

I also made sure I had the latest version of [GPG Suite](https://gpgtools.org/gpgsuite.html) installed.

(For the record I'm running OS X Yosemite (10.10.5).)

I also already had an up-to-date version of GnuPG installed on my command line. When I run: `gpg --version` I get the following:

```
gpg (GnuPG/MacGPG2) 2.0.30
libgcrypt 1.6.6
Copyright (C) 2015 Free Software Foundation, Inc.
```

If `gpg` gives you version 1, you may have GPG version 2 but need to use `gpg2` on the command line. If running `gpg2 --version` gives you a version over 2, you'll need to use the `gpg2` command everywhere you see me use `gpg` below.

In order to use an RSA key with a length of 4,096 with your YubiKey 4, you'll need to use `gpg` version 2 (as the tutorial notes: "If you are using a YubiKey 4 and want to work with 4096 key sizes, you need to use GPG v 2")

## A Choice: "Orphan" vs. "Mothership"

As the [official tutorial](https://www.yubico.com/support/knowledge-base/categories/articles/use-yubikey-openpgp/) explains: 

> Before you begin, decide if you want to generate the private key on the YubiKey device, or if you want to generate the private key off of the YubiKey and then move the subkeys to the YubiKey. For greater security, we recommend that you store your subkeys on the device (therefore, generate your private key off of the device). 

So our choices are "Generating Your OpenPGP Key Directly on your YubiKey" or "Generating the key on your local system". I'm a little confused by the differences between these two methods. The idea of generating the key on the YubiKey makes sense to me-- the YubiKey is independent of the computer we're using, like an "orphan". Since the other method uses the computer to generate the keys, then has us move them to the card, I think of it as the "mothership" procedure.  

Given my reading of the rather cryptic sentence in the tutorial's introduction: "For greater security, we recommend that you store your subkeys on the device (therefore, generate your private key off of the device)", I figured the "mothership" procedure was a more secure choice.

Thus I decided to generate my private key not on my YubiKey but rather on my computer, and then move them to my YubiKey (i.e. the "mothership" procedure). 

## Generating a New Key Pair on my Computer

At this point, I switched to [the Hudson tutorial](https://trmm.net/Yubikey), skipping down to the section called "Create your key". (The reason I followed Hudson's tutorial at this point is actually because I hadn't found the official tutorial yet, but I'm going to keep writing this as if I meant to do all this in the order that I did it.)

Using the GPG Keychain application included in [GPG Suite](https://gpgtools.org/gpgsuite.html), I generated a new key pair as the Hudson tutorial describes. The only difference is that I specified a length of 4,096, since I knew the YubiKey 4 could handle that length. My new key's Key ID was `03FC30EE`, which will be important to have handy for the rest of this.

I also followed Hudson's instruction to create a second subkey for signing, as he says that's necessary when using cards (like YubiKey)-- however I again made mine 4096 long:

> By default GPG Keychain tool create the primary key that has all access and one encryption subkey. For the cards you need to create a second subkey for signing. Double click on your key to bring up the Key Inspector window, select Subkeys and click + to create a new one of type RSA (sign only) and of length 2048.

Since I was just learning I also did NOT export my key (in other words I did NOT "At this point you should export your key and save it somewhere safely offline."), nor did I upload my new public key to a key server, for reasons stated above. However I did generate a revoke certificate, just in case I later uploaded the public key, either on purpose or accidentally. I saved the revoke certificate to my computer's hard drive and an external hard drive.

## Transferring Keys to the YubiKey

At this point, Hudson writes "First you need to enable the OpenPGP Card / CCID mode." However from the official tutorial I knew I did NOT need to do this (since I have a YubiKey 4), so I skipped this step. 

I went down to where he writes "Now let's edit your public key:" (though we're really about to edit the private keys). As instructed, in terminal I typed: `gpg --edit-key 03FC30EE`, which will first display information about the public keys associated with this key.

```
gpg (GnuPG/MacGPG2) 2.0.30; Copyright (C) 2015 Free Software Foundation, Inc.
This is free software: you are free to change and redistribute it.
There is NO WARRANTY, to the extent permitted by law.

Secret key is available.

pub  4096R/03FC30EE  created: 2016-12-07  expires: 2020-12-07  usage: SC
                     trust: ultimate      validity: ultimate
sub  4096R/17DA7011  created: 2016-12-07  expires: 2020-12-07  usage: E
sub  4096R/0CBB0A5F  created: 2016-12-07  expires: 2020-12-07  usage: S
[ultimate] (1). Sam Schlinkert <sschlinkert@gmail.com>

gpg>
```

As Hudson writes: "GnuPG [the command line tool] is now waiting for another command from you. We need to switch to editing the secret key portion of this key with the `toggle` command and then select the first non-primary key with the key command." So I typed `toggle` and got a result similar to what Hudson shows: 

``` 
gpg> toggle
sec  2048R/17DB29BE  created: 2014-11-16  expires: 2018-11-16
ssb  2048R/FAFFECA6  created: 2014-11-16  expires: never     
ssb  2048R/A9057450  created: 2014-11-16  expires: never     
(1)  Trammell Hudson <hudson@trmm.net>
gpg>
```

At the next prompt, I entered `1` as instructed to select the _second_ key listed, which is a subkey. (I assume `0` would select the first key listed.)

```
gpg> key 1
sec  2048R/17DB29BE  created: 2014-11-16  expires: 2018-11-16
ssb* 2048R/FAFFECA6  created: 2014-11-16  expires: never     
ssb  2048R/A9057450  created: 2014-11-16  expires: never     
(1)  Trammell Hudson <hudson@trmm.net>
gpg>
```

You can see we've selected the second key by the asterisk next to `ssb` ([the GnuPG manual](https://www.gnupg.org/gph/en/manual.html#MANAGEMENT) notes: "The keyword sec identifies the private master signing key, and the keyword sbb identifies the private subordinates keys.")

I then followed Hudson's script: "Now we'll run the `keytocard` command to copy this key to the card."

```
gpg> keytocard
Signature key ....: none
Encryption key....: none
Authentication key: none

Please select where to store the key:
    (2) Encryption key
Your selection? 2
``` 

I'm assuming we only have one choice ("Encryption key") presented to us here because the command line tool recognized that first subkey as the encryption key (as opposed to the signing subkey we made earlier).

After entering the passphrase for the key and the Admin PIN (which is `12345678` by default), I got something similar to what Hudson has: 

```
sec  2048R/17DB29BE  created: 2014-11-16  expires: 2018-11-16
ssb* 2048R/FAFFECA6  created: 2014-11-16  expires: never     
                     card-no: 0006 03036660
ssb  2048R/A9057450  created: 2014-11-16  expires: never     
(1)  Trammell Hudson <hudson@trmm.net>
```

Now we can sort see that that first subkey is on the card, since it says `card-no` underneath it. Cool!

Now we need to get the second subkey (the signing key) to the card. As Hudson writes: first "deselect key 1, [then] select key 2 and upload the signing key":

```
gpg> key 1       
sec  2048R/17DB29BE  created: 2014-11-16  expires: 2018-11-16
ssb  2048R/FAFFECA6  created: 2014-11-16  expires: never     
                     card-no: 0006 03036660
ssb  2048R/A9057450  created: 2014-11-16  expires: never     
(1)  Trammell Hudson <hudson@trmm.net>

gpg> key 2
sec  2048R/17DB29BE  created: 2014-11-16  expires: 2018-11-16
ssb  2048R/FAFFECA6  created: 2014-11-16  expires: never     
                     card-no: 0006 03036660
ssb* 2048R/A9057450  created: 2014-11-16  expires: never     
(1)  Trammell Hudson <hudson@trmm.net>
gpg> keytocard
Signature key ....: none
Encryption key....: D04F 94C6 EF86 C150 9486  3F5C 2695 8563 FAFF ECA6
Authentication key: none
Please select where to store the key:
   (1) Signature key
   (3) Authentication key
Your selection? 1

You need a passphrase to unlock the secret key for
user: "Trammell Hudson <hudson@trmm.net>"
2048-bit RSA key, ID A9057450, created 2014-11-16
```

We store this second key as the signature key.

Once you've done that you'll see both keys are on the card: 

```
sec  2048R/17DB29BE  created: 2014-11-16  expires: 2018-11-16
ssb  2048R/FAFFECA6  created: 2014-11-16  expires: never     
                     card-no: 0006 03036660
ssb* 2048R/A9057450  created: 2014-11-16  expires: never     
                     card-no: 0006 03036660
(1)  Trammell Hudson <hudson@trmm.net>
```

Now, writes Hudson, "Save the changes to the secret key on disk and exit gnupg:"

```
gpg> save
```

## Set Hardware PINs

We also have to change both the PIN and the Admin PIN of our YubiKey to something other than the defaults. The default PIN (different than the Admin PIN) is `123456`. The default Admin PIN is `12345678`. 

Follow [Hudson's](https://trmm.net/Yubikey) instructions on how to change both of them. The PIN has to be at least 6 digits. The Admin PIN has to be at least 8.

Note that the PIN will be what you enter to decrypt text and files with the key that's on the YubiKey-- not the passphrase (I found this strange and kind of a bummer, as I'm far better at remembering letters and words than solely digits, but [it's indeed explained in the GnuPG manual](https://www.gnupg.org/howtos/card-howto/en/ch04s02.html)).

OK we're in pretty good shape in achieving the goal I outline above (specificlaly the "mothership" procedure). Let's pause and recap a bit.

## OK What Did We Just Do?

As I understand we just moved an encrypting subkey and a signing subkey to the YubiKey. (I also think the "encrypting" subkey also does the decrypting.) 

Those particular subkeys are no longer on my computer's hard drive. One reason I believe that is because when I `gpg --edit-key 03FC30EE` and then `toggle` to see the private keys, the two subkeys have my card number on them. The other reason I think this is that if I encrypt text with a totally different key for my `03FC30EE` key, **I am unable to decrypt the message when the YubiKey is not inserted, but I am able to decrypt when it is inserted**. Sweet! 

Here's the message I get when I try to decrypt without the YubiKey inserted:

```
Decrypt failed! 

Decrypt failed! (Card error)
Code = 108
```

Now we get to the edge of my understanding. The question is what exactly gets left behind on my home computer thanks to doing the "mothership" procedure. 

I think there's something called a "master secret key" and I think it's still on my home computer's hard drive's keyring. 

Furthermore I think this means that I can still create other subkeys from this master key on my hard drive without my YubiKey plugged in, but I'm not sure. Among other things that means that (I think) I have to protect this particular computer as well as I protect my YubiKey. Maybe the "orphan" procedure would not have this problem, but it's fine as long as I don't have to protect any other devices I choose to use the subkeys on my YubiKey with.

Interestingly, with my YubiKey not inserted I can still encrypt messages with this key (though I can't decrypt them). I believe this is because I still have a public subkey labeled `usage: E` on my hard drive keyring (not on the card). I suppose I could delete (or revoke?) this key, but I'm a little weary of experimenting just now.

I should note here that [an older tutorial](https://wiki.fsfe.org/TechDocs/CardHowtos/CardWithSubkeysUsingBackups) from the Free Software Foundation Europe (FSFE) has a section called ["Removing master key from the keyring"](https://wiki.fsfe.org/TechDocs/CardHowtos/CardWithSubkeysUsingBackups#Removing_the_master_key_from_the_keyring), implying that you could totally detach the computer you use to generate your keys and move them to your card/YubiKey from your card/YubiKey. Again, it's not clear to me whether this is a better situation for me-- I suppose it depends on my threat model with regard to this key, and whether I have at least one computer I can protect/trust.

## Using the PGP key on my YubiKey while Using Other Computers

Now for another big test.

With the two subkeys on my new YubiKey, I headed into work to see if I could use my keys on a different computer with minimal setup. I needed to get the private key "stubs" on to the computer, so that they could point to the subkeys on my YubiKey. If the YubiKey was present, it would use the keys on my YubiKey. But if the YubiKey wasn't inserted, it'd get that `Decrypt failed! (Card error)` error.

After consulting [this short GPGTools article](https://gpgtools.tenderapp.com/kb/gpg-keychain-faq/gpg-keychain-not-showing-key-from-smart-card), I learned that step one is to get your public key on to that computer's key ring. I did this by emailing myself my new public key (unencrypted), and then opening the GPG Suite Keychain and importing the key. This is only because I did not want to upload this public key to any key server.

Once I got imported the public key and had it appear in GPG Suite Keychain (under "type" it says `pub`, indicating it's just the public key present), I plugged in my YubiKey and simply ran `gpg --card-status` in the terminal, as per [that GPGTools article](https://gpgtools.tenderapp.com/kb/gpg-keychain-faq/gpg-keychain-not-showing-key-from-smart-card). After a few seconds the terminal sent back some kind of success message that I forget now, and when I restarted the GPG Suite Keychain the key had `sec/pub` as its "type". I was then able to decrypt a message I had emailed myself, and was _unable_ to decrypt it after I removed the YubiKey. Success! 

## Learning More About What I Did (An Appendix of Sorts)

In my search to learn more about key management, Duck Duck Go led me to [this GnuPG manual](https://www.gnupg.org/gph/en/manual.html), specifically [the key management section](https://www.gnupg.org/gph/en/manual.html#MANAGEMENT), which helped me a bit.
