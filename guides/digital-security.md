---
layout: page
title: Digital Security Guide for Friends and Loved Ones 
comments: true
---

As 2019 approaches, I thought I'd write a new, updated version of [my casual security guide from 2016](https://sts10.github.io/2016/11/13/some-privacy-and-security-measures.html). Same disclaimers apply: I am still not an expert. I'm writing this mostly to have something to send to friends and family who ask me questions about this stuff. Note: I reference a lot of work by [Martin Shelton](https://twitter.com/mshelton), a researcher at Google. Also, this is a work in progress!

## Level 1: Enable 2-factor authentication (at the very least, on your email)

Turning on two-factor authentication (2FA) for an online account means that whenever you log into the account, a code will be sent to your phone that you’ll have to enter after entering your correct password. The idea here is that even if someone gets ahold of your password, they would also need your phone to get this code. 

<img src="https://cdn-images-1.medium.com/max/800/1*TMyswLat4xWqrEt8_o7N-Q.png" width="250" align="center" />

You should set up 2-factor authentication for all of your online accounts that support it. Here's [a general guide](https://medium.com/@mshelton/two-factor-authentication-for-beginners-b29b0eec07d7), and here are some how-to guides from some popular services: [GMail](https://www.google.com/landing/2step/), [Twitter](https://support.twitter.com/articles/20170388), [Facebook](https://www.facebook.com/help/148233965247823), [Dropbox](https://www.dropbox.com/help/security/enable-two-step-verification), [GitHub](https://help.github.com/articles/securing-your-account-with-two-factor-authentication-2fa/) and [a list of other services](https://twofactorauth.org/). If you enable 2-factor for only one account, do it on your email.

Note: **There are different _ways_ to receive/present this 2nd factor code.** Not all of them are equally secure. 

- Worst: No 2nd-factor at all 
- OK: SMS (text message) 
- Better: Storing a ["time-based one-time password"](https://en.wikipedia.org/wiki/Time-based_One-time_Password_Algorithm) (TOTP) in an app on your smartphone like [Google Authenticator](https://support.google.com/accounts/answer/1066447?hl=en) or [Authy](https://authy.com/).
- Best: Using a physical security key, like a [YubiKey](https://www.yubico.com/product/security-key-by-yubico/#security-key), as your 2nd factor

### More on Security Keys

As mentioned above, you can also use a physical piece of hardware called a security key as your second factor.

Compared to SMS or TOTP (Google Authenticator), a security key is a more secure second factor, since you need the key to login to a new computer. It also helps mitigate phishing attempts better than alternative methods.

One such example of a security key is a [YubiKey](https://www.yubico.com/product/security-key-by-yubico/). Facebook, Twitter, and Google all support using a YubiKey as a second factor. Once you [purchase a YubiKey](https://www.yubico.com/product/security-key-by-yubico/), you can follow these guides from [Google](https://support.google.com/accounts/answer/6103523?hl=en&visit_id=1-636657158187444959-142829807&rd=1), [Facebook](https://www.facebook.com/notes/facebook-security/security-key-for-safer-logins-with-a-touch/10154125089265766/), [Twitter](https://help.twitter.com/en/managing-your-account/two-factor-authentication#security-key). (Here's an [alternate Google guide from Yubico](https://support.yubico.com/support/solutions/articles/15000006418-using-your-yubikey-with-google) if you need.) 

## What happens if you lose your phone/security key?

Most services give you **back-up codes** when you enable 2-factor for just this reason ([here's more info on GMail backup codes](https://support.google.com/accounts/answer/1187538?hl=en)). In a pinch, you can use these codes as your 2nd factor. 

Store these somewhere safe, like on a piece of paper you store somewhere secure. Once you use a backup code to login, you can choose to temporarily disable two-factor authentication until you get your phone back or get a new one.

## Level 2: Check which devices and third-party applications have access to your accounts

It's important to periodically check the devices you're currently logged into an account with. Here's how to... 

- [Check which devices are logged in to your Google account](https://myaccount.google.com/device-activity?utm_source=google-account&utm_medium=web)
- [Check which devices are logged in to your Facebook account](https://www.facebook.com/settings?tab=security) (under "Where You're Logged In")
-  [Check which devices are logged in to your Twitter account](https://twitter.com/settings/applications) (under "Recently used devices to access Twitter"). 

This is something you'd want to do after you log in to one of these accounts on a hotel or friend's computer, or, say, after a breakup. Change your password to these accounts as well (see below for more on passwords).

It's also very important to periodically review which third-party applications have access to your accounts. This is because some of these applications may well have permission to read your otherwise private information or even post on your behalf. You should **only keep the access permissions that are absolutely necessary**. Remove any apps you don't recognize or look sketchy. [BuzzFeed has a good article](https://www.buzzfeed.com/nicolenguyen/how-to-de-authorize-forgotten-twitter-integrations) on this if you want to learn more.

- [Check third-party access to your Google account](https://myaccount.google.com/permissions)
- [Check third-party access to your Twitter account](https://twitter.com/settings/applications?lang=en)
- [Check third-party access to your Facebook account](https://www.facebook.com/settings?tab=applications)

Google/GMail users should also periodically complete Google's ["Security Checkup"](https://myaccount.google.com/security-checkup) and ["Privacy Checkup"](https://myaccount.google.com/privacycheckup).
 
## Level 3: Use better passwords

You should use long, randomly generated passwords for every account, but even more important is that you should **never reuse passwords** (even if you give them small variations). This is because services get breached and passwords leak all the time, and someone could simply try your password from the leaked service for your other services (you can see which services you use that have been breached at [haveibeenpwned.com](https://haveibeenpwned.com/)).

What's a good password look like? `Vy<{t/W~Ee.5}k(D[Bm(N` and `uncoiled armful polymer appeasing shredder recast` are both examples of strong passwords. `StarWars13`... not so much.

Since our goal is to not reuse any passwords, we're going to have tens if not hundreds of long passwords to remember. The easiest way to handle this problem is to use a **password manager**, which is software that stores all of your passwords within a password "vault." 

As long as you choose a good manager (see below) and make the password to open this vault very strong, you'll likely be more secure overall. 

One way to create a strong, but memorable password is to generate a _passphrase_ [using dice](https://www.eff.org/dice) ([more info on diceware passphrases](https://theintercept.com/2015/03/26/passphrases-can-memorize-attackers-cant-guess/)). This process will create a passphrase like "rubdown cytoplasm sculptor kindred unsubtle roamer", which should be easy for you to memorize, but very hard for anyone else to guess ([this invaluable xkcd comic explains the concept well](https://xkcd.com/936/)). 

### Password manager recommendations

Easiest to use: [LastPass](https://www.lastpass.com/) is an easy-to-use online password manager that has a free option. Here's [a beginner's guide to LastPass](https://medium.com/@mshelton/lastpass-for-beginners-e921f35d4114) by Shelton.

A solid, paid option: [1Password](https://1password.com/) is another popular option, though it costs a fee, paid either monthly or yearly ($36). Here's [a guide to getting started with 1Password](https://medium.com/@mshelton/introduction-to-password-managers-5e15baa8b26e) from the same author.

More secure: [KeePassXC](https://keepassxc.org/) is a free, "offline" password manager, meaning that your encrypted passwords only lives on your computer -- think of it as Excel For Passwords. I've got three guides for you on KeePassXC: [Shelton's](https://medium.com/@mshelton/keypass-for-beginners-dc8adfcdad54), [the Electronic Frontier Foundation's](https://ssd.eff.org/en/module/how-use-keepassxc), and [mine](https://sts10.github.io/2017/06/27/keepassxc-setup-guide.html).

Once you have a manager you like, and a strong vault password, go through each of your online accounts and reset your password to a unique, long, and random password. 

You can [read more about creating and storing strong passwords from the EFF](https://ssd.eff.org/en/module/creating-strong-passwords).

## Level 4: General tips

### Don't get phished

Basically don't click on sketchy looking links, especially in your email. One apparently common trick is to send you an email ("Fraud alert" it might say) with a link to go log into an account, like your bank account. It may _look_ like your bank's website, but it could be faked to steal your password. To avoid this, just open your browser and type in your bank's website and log in there. 

Here are [some examples of phishing emails](https://motherboard.vice.com/en_us/article/ezpmyw/fake-gmail-alerts-phishing). Don't click anywhere inside of emails like this!

<img src="https://motherboard-images.vice.com/content-images/contentimage/no-id/1476977290821129.png" width="450" />

<img src="https://motherboard-images.vice.com/content-images/contentimage/no-id/1476977310675950.png" width="450" />

Here's [the EFF's guide to avoid phishing attacks](https://ssd.eff.org/en/module/how-avoid-phishing-attacks) and [one from Security in a Box](https://securityinabox.org/en/guide/malware/). If you see a suspicious-looking URL and want to check if it's safe, [Google has a service for that](https://transparencyreport.google.com/safe-browsing/search).

### Keep your apps and operating systems up-to-date

It may be annoying to keep everything up-to-date, but it's often important for security. Hackers are constantly looking for vulnerabilities in software, and software companies are constantly "patching," or updating their software to prevent this. But you only get the benefit of these patches if you click that sometimes-annoying "Update" button, rather than continuously put it off till tomorrow. 

### Your browser

For desktop, **[Firefox](https://www.mozilla.org/en-US/firefox/new/)** is generally thought of as more privacy-respecting than Google Chrome, but they're both good choices. Personally I use both: Chrome when I need to be logged in under my real name (email, banking, most social networking, etc.), Firefox for everything else. 

On your iPhone, you can use [Firefox's iOS app](https://itunes.apple.com/us/app/firefox-web-browser/id989804926?mt=8), or add a privacy-protecting add-on like to Safari like [Better](https://better.fyi/). Personally I've been using [Brave](https://brave.com/), though I'm keeping an on eye [some concerning business practices](https://twitter.com/tomscott/status/1076160882873380870).

For bumping up your browser security/privacy, I'd recommend the following extensions:

- [Privacy Badger](https://www.eff.org/privacybadger) - Block trackers
- uBlock Origin ([Firefox](https://addons.mozilla.org/firefox/addon/ublock-origin/) / [Chrome](https://chrome.google.com/webstore/detail/ublock-origin/cjpalhdlnbpafiamejdnhcphjbkeiagm?hl=en)) - Block ads
- [HTTPS Everywhere](https://www.eff.org/https-everywhere) - Ensure you're using HTTPS when you can

If you want to make your Firefox installation more privacy-respecting, you can [follow these steps](https://www.privacytools.io/#fingerprint) and, to further disrupt sites that try to track your browsing habits, [install the Multi-Account Containers add-on](https://addons.mozilla.org/en-US/firefox/addon/multi-account-containers/) and/or the [Cookie AutoDelete add-on](https://addons.mozilla.org/en-US/firefox/addon/cookie-autodelete/). You can also change Firefox's default search engine from Google to [DuckDuckGo](https://duckduckgo.com/).

If you want to browse more anonymously, consider using the [Tor Browser](https://www.torproject.org/projects/torbrowser.html.en). However there are some important things to note about the Tor Browser, which Shelton [summarizes nicely](https://medium.com/@mshelton/securing-your-digital-life-like-a-normal-person-a-hasty-and-incomplete-guide-56437f127425):

> Tor Browser encrypts your traffic and bounces your secured connection within the Tor network before connecting to the Web from a remote location... It is important to note that network eavesdroppers can still tell that you’re using Tor — they just can’t tell what you’re doing within Tor. If you’re looking for real anonymity, avoid sharing personal information in websites you access through Tor Browser.

Another good resource, [Tor's official overview](https://www.torproject.org/about/overview.html.en), adds: to stay anonymous while using the Tor Browser, "[d]on't provide your name or other revealing information in web forms." In other words, you probably don't want to log in to Facebook. 

### More secure texting/voice calls/instant messaging 

Apple's iMessage is pretty secure for everyday use, but if you want to step it up a notch (or you have any Android users in your group text), consider using [Signal](https://whispersystems.org/) or [Wire](https://wire.com/en/), which both use "end-to-end" encryption. 

As mentioned above, periodically review which devices you're logged in on. Both services also support disappearing messages. Here's [a beginner's guide to Signal](https://medium.com/@mshelton/signal-for-beginners-c6b44f76a1f0) and [one for Wire](https://medium.com/@mshelton/wire-for-beginners-8ee6caef49cb). 

### Private note-taking

I use [Standard Notes](https://standardnotes.org/) for taking notes (rather than Evernote or other alternatives). 

## Level 5: Understanding methods by which your passwords can be reset

This section is probably only necessary for journalists/activists/political folks, but we'll press on. If someone can easily reset your account's password, they can also gain access and lock you out. While this is sometimes mitigated by 2-factor authentication, it's worth thinking through some examples. 

For example, [SIM-jacking](https://motherboard.vice.com/en_us/article/zm8a9y/how-to-protect-yourself-from-sim-swapping-hacks) or SIM-swapping is when attackers get your cellphone service provider to route your calls and text messages to their phone rather than yours. They can then (usually) do a bunch of other things at this point, like reset passwords to your online accounts. [Scary](https://motherboard.vice.com/en_us/article/vbqax3/hackers-sim-swapping-steal-phone-numbers-instagram-bitcoin), right?  

As Lorenzo Franceschi-Bicchierai [writes for Motherboard](https://motherboard.vice.com/en_us/article/zm8a9y/how-to-protect-yourself-from-sim-swapping-hacks), the general advice to avoid getting SIM-jacked is to consider removing your real phone number from your online accounts. If the online service requires a phone number, consider creating a [Google Voice](https://voice.google.com/) phone number for that purpose. Then remove your real phone number from these accounts. Alternatively, you can call up your cell phone service provider and ask to set a PIN that will need to be given to get access to your account. 

### Why you may want to disable SMS-password recovery altogether

You may want to remove SMS as a password recovery method altogether. This is safer and may be good for your Google account (this is NOT the same thing as SMS as a second authentication factor).

To do this, first go to [the "Signing in" section of Google's security page](https://myaccount.google.com/security). Scroll down a bit to the section titled "Account recovery options". Now remove the "Recovery phone" option.

![Google account recovery options: none](https://i.imgur.com/0Ud8ksD.png)

## Guides I cited or recommend
 
- [Securing Your Digital Life Like a Normal Person](https://medium.com/@mshelton/securing-your-digital-life-like-a-normal-person-a-hasty-and-incomplete-guide-56437f127425)
- [EFF Surveillance Self-Defense](https://ssd.eff.org/en)
- [privacytools.io](https://www.privacytools.io/)

## See Something Say Something

I'm low-key terrified that there is misinformation above. If you see something wrong or misleading here, or you have suggestions, feel free to ping me on [Twitter](https://twitter.com/sts10) or [Mastodon](https://octodon.social/@schlink), or [send me an encrypted message using one of the services listed here](https://gist.github.com/sts10/4a4e01021b3a5ad42e9b73e0abd7b7e3).

Last updated: January 2, 2019
