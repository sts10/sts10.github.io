---
layout: post
title: "How to use a security key as two-factor authentication on your Mastodon account"
date: 2022-11-12 10:00:00 -0400
comments: true
---

This is a continuation of [my post on enabling two-factor authentication for Mastodon accounts](https://sts10.github.io/2022/11/11/mastodon-two-factor-authentication.html). For users new to two-factor authentication, I highly recommend you start there.

Recent versions of Mastodon allow you to add a security key as an alternate form of a second factor.

### What's a security key?

Basically, you can use a physical piece of hardware as your 2nd factor. Most of these security keys look like a thin USB drive you can attach to your key chain. Instead of typing in a 6-digit token you see on your phone, you plug your security key into a USB slot on the computer and the security key sends a code to Mastodon, proving that you, the user, has the key that you set up to correspond to your account.

From a technical perspective, using a security key as a second factor can provide [extra protection against certain attacks](https://krebsonsecurity.com/2018/07/google-security-keys-neutralized-employee-phishing/).

A popular maker of security keys is [Yubikey](https://www.yubico.com/products/). They cost about $50 USD, which I'm definitely aware is not within the budget of all users. 

![Image of two popular Yubikey models](https://www.yubico.com/wp-content/uploads/2022/09/Security-key-set-pair-new-front@2x-768x672.png)

### Adding a security key as a second factor for Mastodon

To add a security key as an alternate second factor for your Mastodon account, head to the "Two-factor Auth" section of your preferences/settings. 

**Once you've added an authenticator app as a 2nd factor (see [other post](https://sts10.github.io/2022/11/11/mastodon-two-factor-authentication.html))**, you'll "unlock" the ability to add a security key. Click "Add".

![Security key set up](/img/mastodon-two-factor/7-add-security-key.png)

Next, you'll be asked to name your security key. This is helpful for folks who have multiple security keys (a good idea if they're kept in secure but different locations!). Name it whatever you like.

![Name your security key](/img/mastodon-two-factor/8-name-security-key.png)

Next, you'll be asked to insert your security key into your computer and touch it (which usually means: press the button on it).

![Insert your security key](/img/mastodon-two-factor/9-insert-sec-key.png)

Assuming that went smoothly, you should be all set! If your browser has trouble recognizing your security key, try updating your browser to the latest version, or switching to Firefox.

![All done with both Authenticator app and security key](/img/mastodon-two-factor/10b-all-set-up.png)

Now, when logging in to your Mastodon account, after entering your password as usual, you'll be able to use **either** use your phone's authenticator app OR your security key as your second factor. (When I have both on me, I try to use the security key, due to it being harder for an attacker to phish.)

I recommend keeping the authenticator app method enabled, since that's the easiest way to log in on a mobile device that doesn't have a USB port.
