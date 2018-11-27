---
layout: post
title: "Reading and Writing TOTP URIs into and out of QR Codes for Fun and Profit"
date: 2018-11-26 19:42:30 -0400
comments: true
---

If you're like me you've got a lot of [time-based one-time passwords](https://en.wikipedia.org/wiki/Time-based_One-time_Password_algorithm) (aka "TOTP") in a smartphone app like Google Authenticator. This system works pretty well: The service presents you with a QR code, you scan it with Google Authenticator, and then every 30 seconds you get a fresh 6-digit code to use as your second factor when logging in to the service. It's more secure than using SMS for reasons I won't spell out here.

As you might have intuited, this QR code contains a secret code -- a string of random alphanumeric characters unique to your account. Google Authenticator stores this secret code, but doesn't allow the user to read them (I assume for security reasons). Google Authenticator then uses [an algorithm](https://en.wikipedia.org/wiki/Time-based_One-time_Password_algorithm#Algorithm) to mix the secret with the current time and generate a new 6-digit code every 30 seconds. Thus we can think of these secret codes as "seeds", but for the remainder of this post I'll refer to them as "secrets" or "text secrets".

If you indeed use Google Authenticator to store and display these codes, you should know that Google Authenticator does NOT offer a method for backing up the stored secrets. ([Authy](https://authy.com/) does offer back-ups, but they live on their servers.)

So what if you lose or break your phone? Well, that's what the "back-up codes" that the service gives you are for. Store them somewhere secure, and then when you break/lose your phone, use one of the back-up codes instead of the 6-digit code.

But I've found some services either give you only one back-up code, and reset it every time you ask to view it (Twitter), or don't even give you any back-up codes at all (ConEdison). In these cases, I think I'd like a way to store the QR codes, or better yet: store the actual TOTP secrets (the random text strings) and make QR codes as needed.

## But Isn't This Less Secure Than Not Retrieving and Storing the Secrets?

Short answer: yeah, it can make your system less secure. But my logic is that if I store these secrets in the same location and/or with the same care and procedure as I store back-up codes, I'm not really losing much security.

I will say you probably do NOT want to store these secrets in the same KeePass database as your account passwords.

## My Goal

I wanted to create a reliable procedure to extract these secrets from a given QR code, and store these secrets somewhere off of my phone. (Note: this is distinct from storing the _back-up codes_, which I was already doing). My hope is to make my inevitable transition from a lost or destroyed phone to a new phone as easy as possible. (Though if my phone was stolen, I'd probably want to fully reset all of my TOTPs just to be safe...)

To accomplish this, I could have simply screenshotted the QR codes when they're presented to me and store the image files securely, ready to be rescanned on my new phone. However I wanted to instead store the secrets themselves (a string of random characters) for two reasons: (1) my password manager of choice, [KeePassXC](https://keepassxc.org/), [can store these secrets and present TOTPs on command](https://keepassxc.org/docs/#faq-security-totp), but you have to input the secret as text, as opposed to a QR code, and (2) I was curious how the QR codes worked.

## A Bit More About QR Codes

[One of the things that a Quick Response code (QR code) can contain is a URL](https://en.wikipedia.org/wiki/QR_code#URLs) or URI ([Uniform Resource Identifier](https://en.wikipedia.org/wiki/Uniform_Resource_Identifier)). The QR codes we're dealing with here contain an otpauth URI, which look like `otpauth://totp/hereisthelabel?secret=hereisthesecret&issuer=hereistheissuer`. This particular URI format is [defined further](https://github.com/google/google-authenticator/wiki/Key-Uri-Format) in the Google Authenticator GitHub repo. The `secret` parameter is the most important for us, but we'll use the label and issuer too.

There are a few online tools to make your own QR codes containing otpauth URIs: I found [Authenticator Test](https://authenticator.ppl.family/) and [2FA QR code generator](https://stefansundin.github.io/2fa-qr/). I would NOT recommend entering your actual account secrets into these online generators cuz they are on the internet. However you can use them to test my procedure I outline below if you don't want to use your real account secrets.

## The System I Ended Up With

I ended up installing two separate command line tools to accomplish my goal, one to convert screenshots of QR code into their base URIs, and another to take URIs and create new QR codes. If you're not comfortable using the command line, sorry, this procedure is going to be hard for you. However there may be GUI options for this for your OS.

## Setup

### MacOS

1. Install [Homebrew](https://brew.sh/)
2. Run `brew install zbar qrencode`

### Ubuntu-based Linux
1. Run `sudo apt install zbar-tools qrencode`

## Steps For Accessing TOTP Secret for Twitter (QR Code to Text Secret)

As mentioned above, I dislike Twitter's handling of back-up codes. First, because Twitter only gives me one back-up code (as opposed to 8 or 10 like other services), but also because it's my understanding that every time I ask to view the back-up code, it gives me a new one, implying that the previous back-up codes will no longer work.

So I went about getting a new QR code form Twitter, getting the secret out of the QR code and storing it in a KeePass database using [KeePassXC](https://keepassxc.org/). 

Here are the steps I took to do this.

If you already have any login verification setup, you'll need to turn it off first then turn it back on. Note: To turn it back on via any method, you'll need to receive an SMS message to your set phone number.

Once you do this, you'll get a new back up code -- store it some place safe.

1. (Re)Setup "Mobile security app" (aka TOTP) 2nd factor for your Twitter account.
2. Take a screenshot of the QR code  you're presented with. Save it to your desktop.
3. Add this QR code to your Google Authenticator just in case the rest of this procedure fails.
4. Run `zbarimg --raw <path to screenshot>`. The output should contain a otpauth URI; something like `otpauth://totp/Twitter?secret=hereisthesecret&issuer=Twitter`. We'll be using the "secret" soon.
5. Now either write down this secret, next to "Twitter" and your username, and store it somewhere safe and away from your password -- wherever you store your back-up codes for example. (Alternatively you can store the secret in a KeePass database. To do this, create a new entry in a KeePass database called "Twitter TOTP code". Right-click the entry and select "Setup TOTP". In the "Key" text field, enter the secret from the URI we got before from the `zbarimg` command. Select the radio button for "Default RFC 6238 token settings". Click "OK".)
6. As a test, let's generate a fresh QR code from this secret/key. Run `qrencode -s 10 -o ~/Pictures/generated_qr_code.png 'otpauth://totp/Twitter:@twitter_username?secret=hereisthesecret&issuer=Twitter'`
7. Open `~/Pictures/generated_twitter_qr_code.png` on your computer. You should see a QR code! Next open Google Authenticator on your phone and point it at the newly generated QR code.
8. Compare the two 6-digit codes in Google Authenticator -- they should be the same! If they are the same, feel free to remove one of them from your Google Authenticator app.

### Moderately Secure Clean Up on Linux

On Linux: 
```bash
shred -ufv --iterations=20 ~/Pictures/generated_qr_code.png
shred -ufv --iterations=20 ~/Pictures/<original screenshot of QR code>
```

### Notes on Other Methods of Twitter Login Verification

The above procedure will leave SMS (text message) login verification **enabled**. If you don't want this enabled (for example if you're afraid of [a SIM-swapping attack](https://motherboard.vice.com/en_us/article/zm8a9y/how-to-protect-yourself-from-sim-swapping-hacks)), you'll have to disable it yourself.

Also, if you had enabled a security key (like a [YubiKey](https://www.yubico.com/)) for Twitter login verification, you'll need to set that up again. (Here's [a guide from Vice](https://motherboard.vice.com/en_us/article/bj3qxw/how-to-twitter-account-yubikey-guide).)

## Using a Secret to Create a QR Code (Text Secret to QR Code)

Now we have the secret stored securely. So let's say we want to use this secret to make a QR code to scan with our new phone. 

For my Twitter account (@sts10), I'd run: 

```bash
qrencode -s 10 -o generated_twitter_qr_code.png 'otpauth://totp/Twitter:@sts10?secret=hereisthesecret&issuer=Twitter'
```

To get your secret out of a KeePassXC entry, Edit the entry > Click the Advanced icon > Highlight "TOTP Seed" under Additional Attributes > click the "Reveal" button on the right. 

## Appendix 

Here's [a shell script that takes an otpauth URI and presents the current 6-digit code](https://github.com/shello/2fa_scripts), among other things ([h/t @shello@octodon.social](https://octodon.social/@shello/101099361987648303)).

