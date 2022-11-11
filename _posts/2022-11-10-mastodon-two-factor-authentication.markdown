---
layout: post
title: "Enabling two-factor authentication on your Mastodon account"
date: 2022-11-10 20:00:00 -0400
comments: true
---

I don't know if you've [heard](https://www.cnn.com/2022/11/05/tech/mastodon/index.html), [but](https://www.nbcnews.com/tech/mastodon-social-media-twitter-rcna56288) [a lot](https://www.bbc.co.uk/news/technology-63534240) of [new](https://www.nytimes.com/2022/11/07/technology/mastodon-twitter-elon-musk.html) users have been joining [Mastodon](https://joinmastodon.org) these past few weeks! Awesome! 

I thought I'd explain how to enable two-factor authentication on a Mastodon account. This tutorial will assume you're logged in on a desktop/laptop computer -- I think it's far easier to set-up two-factor authentication on a computer, as opposed to a mobile device.

## What is two-factor authentication?

Normally, online accounts like your Mastodon account are only protected by a password. That's all that an attacker would need to know to access your account. So to make your account harder to get into, we can add what's called a "second factor". 

Turning on two-factor authentication means that whenever you log into your account, you'll have to enter your regular password as usual, but then you'll also have to enter a 6-digit code displayed on an app on your phone. The idea here is that even if an attacker gets your password, they would also need your phone to get this code. 

There are different ways to receive this 2nd factor code, but for most of this guide, we're going to focus on what's referred to as "Authenticator-app" 2-factor (or sometimes "TOTP"). This is more secure than using SMS for [a variety of reasons](https://techcrunch.com/2016/07/25/nist-declares-the-age-of-sms-based-2-factor-authentication-over/). 

**TL;DR** It makes your Mastodon account more secure.

## OK, I'm convinced. Let's do this.

First, you'll need to download an authenticator app for your mobile device. [Authy](https://authy.com/download/) has iOS and Android apps. There's also [andOTP](https://f-droid.org/en/packages/org.shadowice.flocke.andotp/) for Android. 

With this app installed, log in to your Mastodon account on a desktop browser (like Firefox, Safari, or Chrome). Then find your user **Preferences**, usually on the right side of the screen.

![Go to Mastodon preferences](/img/mastodon-two-factor/1-preferences.png)

On the left-hand side, find the "Account" section.

![Go to Account](/img/mastodon-two-factor/2-account.png)

Next, click the "Two-factor auth" sub-section.

![Go to Two-factor auth](/img/mastodon-two-factor/3-two-factor.png)

Click the big wide "SET UP" button.

![Click the big SET UP button](/img/mastodon-two-factor/4-setup-2fa.png)

You'll now be presented with a square QR code and a string of uppercase letters and numbers. Both the QR code and the letter s and numbers represent your second-factor "secret".

![QR code and text codes exposed](/img/mastodon-two-factor/5-2fa-codes.png)

Get out your mobile device and open your TOTP app. We want to scan this QR code into your app. Hold your phone up to the computer monitor, framing the QR code with your camera. Your TOTP app should add your Mastodon account and display a 6-digit number that changes every 30 seconds. (Optionally, you can store the text secret somewhere safe, like a piece of paper or a password manager.)

Enter the current 6-digit code and click ENABLE to continue.

### Recovery codes

Next, you'll be presented with 10 **recovery  codes**. If you lose your phone and can't get the 6-digit code, you can use one these recovery codes to regain access to your account. Store these in a safe place. For example, you may print them and store them with other important documents.

![Sample recovery codes](/img/mastodon-two-factor/6-back-up-codes.png)

**All done!** You did it! Next time you have to log-in to your Mastodon account, you'll first enter your password, and then you'll be prompted to enter your "Two-factor code".

![Logging in with a second factor](/img/mastodon-two-factor/11-logging-in-with-totp-code.png)

If you have your mobile device, you'll enter the 6-digit code your TOTP app presents at the time. If you don't have access to your mobile device, you can enter one of the recovery codes.

---

## Optional: Adding a security key as an alternate second-factor

Recent versions of Mastodon allow you to add a security key as a different form of a second factor. This is totally optional, but I figured I'd cover it. 

Basically, you can also use a physical piece of hardware as your 2nd factor. A popular maker of security keys is [Yubikey](https://www.yubico.com/setup/). It looks like a thin USB drive you can attach to your key chain. Instead of typing in a 6-digit code you see on your phone, you plug your YubiKey into a USB slot on the computer and the YubiKey “sends” a code to Mastodon, proving that the user has the key. This method is considered more secure and works even if you don’t have you phone or its battery is dead.

To add a security key as an alternate second-factor for your Mastodon account, head back to the "Two-factor Auth" section of your settings. 

Once you've added an authenticator app as a 2nd factor (see above), you'll "unlock" the ability to add a security key. Click "Add".

![Security key set up](/img/mastodon-two-factor/7-add-security-key.png)

Next, you'll be asked to name your security key. This is because some people have multiple security keys (a good idea!).

![Name your security key](/img/mastodon-two-factor/8-name-security-key.png)

Next, you'll be asked to insert your security key into your computer and press the button on it.

![Insert your security key](/img/mastodon-two-factor/9-insert-sec-key.png)

If that went smoothly, you should be all set!

![All done with both Authenticator app and security key](/img/mastodon-two-factor/10b-all-set-up.png)

Now you can **either** use your phone' authenticator app OR your security key as your second factor for your Mastodon account. 

## Questions? 

I'm [@schlink@octodon.social](https://octodon.social/@schlink). Please let me know if you have questions or comments on how to make this guide better!
