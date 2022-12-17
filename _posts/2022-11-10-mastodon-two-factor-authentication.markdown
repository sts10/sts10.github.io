---
layout: post
title: "How to enable two-factor authentication on your Mastodon account"
date: 2022-11-10 20:00:00 -0400
comments: true
---

I don't know [if](https://mastodon.social/@Gargron/109330358838921654) you've [heard](https://www.cnn.com/2022/11/05/tech/mastodon/index.html), but [a lot](https://www.bbc.co.uk/news/technology-63534240) of [new](https://www.nytimes.com/2022/11/07/technology/mastodon-twitter-elon-musk.html) users [have been](https://www.nbcnews.com/tech/mastodon-social-media-twitter-rcna56288) joining [Mastodon](https://joinmastodon.org) these past few weeks! Awesome! 

I thought I'd explain how to enable two-factor authentication on a Mastodon account. This tutorial will assume you're logged in on a desktop/laptop computer -- I think it's far easier to set-up two-factor authentication on a computer, as opposed to a mobile device. 

**Disclaimer**: I'm not a cybersecurity professional.

## What is two-factor authentication?

Normally, online accounts like your Mastodon account are only protected by a password. That's all that an attacker would need to know to access your account. So to make your account harder to get into, we can add what's called a "second factor". 

Turning on two-factor authentication means that whenever you log into your account, after entering your regular password as usual, you'll then have to enter a 6-digit number (called a "token") displayed on an app on your phone. The idea here is that even if an attacker gets your password, they would also need your phone to get this code. 

There are different ways to receive this 2nd factor code, but for most of this guide, we're going to focus on what's referred to as "Authenticator-app" 2-factor (or sometimes "TOTP"). This is more secure than using SMS for [a variety of reasons](https://techcrunch.com/2016/07/25/nist-declares-the-age-of-sms-based-2-factor-authentication-over/). 

**TL;DR** It makes your Mastodon account more secure.

## OK, I'm convinced. Let's do this.

First, you'll need to download an authenticator app for your smartphone or other mobile device. You may already have one installed, which you can likely use for Mastodon as well. 

If you don't have an authenticator app already, an easy-to-use option is Google Authenticator, which is available for both [Android](https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&gl=US) and [Apple iOS](https://apps.apple.com/us/app/google-authenticator/id388497605) apps. 

Other easy-to-get-started options include: [Aegis Authenticator](https://getaegis.app/) for Android, [Tofu](https://www.tofuauth.com/) for iPhone users, and Free OTP ([iPhone](https://apps.apple.com/us/app/freeotp-authenticator/id872559395) or [Android](https://play.google.com/store/apps/details?id=org.fedorahosted.freeotp)). (A slightly more involved option, which offers things like back-ups, is [Authy](https://authy.com/download/).) <!-- [Raivo OTP](https://raivo-otp.com/) -->

With one of these authenticator apps installed, log in to your Mastodon account on a desktop browser (like Firefox, Safari, or Chrome). If you've never done this before, go to your instance's URL. For example, if your Mastodon user name is bob@mastodon.social, you'll want to go to [mastodon.social](https://mastodon.social) and find the "sign in" button to log in. I'm schlink@hachyderm.io, so I go to [hachyderm.io](https://hachyderm.io).

Then find your user **Preferences**, usually on the right side of the screen.

![Go to Mastodon preferences](/img/mastodon-two-factor/1-preferences.png)

On the left-hand side, find the "Account" section.

![Go to Account](/img/mastodon-two-factor/2-account.png)

Next, click in to the "Two-factor auth" sub-section.

![Go to Two-factor auth](/img/mastodon-two-factor/3-two-factor.png)

Click the big wide "SET UP" button.

![Click the big SET UP button](/img/mastodon-two-factor/4-setup-2fa.png)

You'll now be presented with a square QR code and a text string of uppercase letters and numbers. Both the QR code and the text string represent your second-factor "secret".

![QR code and text codes exposed](/img/mastodon-two-factor/5-2fa-codes.png)

We want to scan this QR code into your authenticator app. Get out your mobile device and open your authenticator app.Depending on the app, you'll need to tap a button to add a new account via scanning a QR code. Hold your phone up to the computer monitor, framing the QR code with your camera. Your authenticator app should add your Mastodon account and display a 6-digit number (called a "token") that changes every 30 seconds. (Optionally, you can store the text secret somewhere safe, like a piece of paper.)

![Tofu displaying a 6-digit token, after proper set up](/img/mastodon-two-factor/tofu-code.PNG)

Enter the current 6-digit token and click ENABLE to continue.

### Recovery codes

Next, you'll be presented with 10 **recovery  codes**. 

![Sample recovery codes](/img/mastodon-two-factor/6-back-up-codes.png)

If you lose your phone and can't get the 6-digit token, you can use one these recovery codes to regain access to your account. Store these in a safe place. For example, you may print them out (or write them down by hand on a piece of paper) and store them with other important documents. While tempting, it's best NOT to take a photo of your recovery codes, since your photos may not be stored/backed-up in a very secure way.

### All done!

**All done!** You did it! Next time you log-in to your Mastodon account, you'll first enter your password, and then you'll be prompted to enter your "Two-factor code".

![Logging in with a second factor](/img/mastodon-two-factor/11-logging-in-with-totp-code.png)

If you have your mobile device, you'll read and enter the 6-digit token your authenticator app presents at the time. If you don't have access to your mobile device, you can enter one of the recovery codes.

If you want to add a bit more security to your account, and have ~$45 to spend, check out [my guide for adding a physical security key as an alternate second factor](https://sts10.github.io/2022/11/12/mastodon-2fa-security-key.html).

## Further reading

For more tips on how to protect yourself online, checkout [the EFF's Surveillance Self-Defense site](https://ssd.eff.org/).

## Questions? Comments? General feedback?

I'm [@schlink@hachyderm.io](https://hachyderm.io/@schlink). Please let me know if you have questions or comments on how to make this guide better!

---

If you liked this blog post, I'm currently looking for work. Please get in touch! Here's [my website](https://www.samschlinkert.com/), [Github](https://github.com/sts10/), [Twitter](https://www.twitter.com/sts10), [LinkedIn](https://www.linkedin.com/in/samschlinkert), and [Mastodon](https://hachyderm.io/@schlink).
