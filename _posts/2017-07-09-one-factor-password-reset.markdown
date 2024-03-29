---
layout: post
title : "Attempting to Opt Out of SMS Password Reset"
date: 2017-07-09 20:00:00 -0400
comments: true
---

This past week, someone gained access to the PayPal account of a mobile applications developer named Justin Williams. 

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Someone socially engineered AT&amp;T to get a new SIM for my phone, signed into my Paypal (using 2FA) and withdrew a bunch of money.<br><br>I am livid</p>&mdash; Justin Williams (@justin) <a href="https://twitter.com/justin/status/883171036283285508">July 7, 2017</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

He later [wrote a blog post about it](https://carpeaqua.com/2017/07/07/hack-the-planet/). He begins: 

> I like to think I take an above average amount of steps to secure myself online: I use a password manager, unique passwords as complex as the site will allow, and turn on 2-factor authentication when possible. A true security expert will likely find some sort of flaw in my setup, but I'll argue that I am doing more than 95% of the planet.

> So how did I, someone who is reasonably secure, have his cell phone disabled, his PayPal account compromised, and a few hundred dollars withdrawn from his bank account?

It sounds like what happened is an attacker got AT&T to port his phone number to the attacker's phone. Then the attacker reset Williams' PayPal password via an **SMS password recovery**.

> You're likely wondering how my cell phone being compromised leads to my PayPal account being compromised? All you need to reset a PayPal password is an email address and a phone number to accept the verification code.

Williams is seemingly right when he notes that PayPal's SMS 2-factor authentication is useless in this case, since that confirmation messages also goes to his phone, which in this case the attackers already have access to. Also note that his complex PayPal password stored in a password manager was of no help-- the attacker simply reset it.

<blockquote class="twitter-tweet" data-conversation="none" data-lang="en"><p lang="en" dir="ltr">You only need SMS to reset a paypal password. It&#39;s comically insecure.</p>&mdash; Justin Williams (@justin) <a href="https://twitter.com/justin/status/883697835689902080">July 8, 2017</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

(This story reminds me a bit of what happened to Cody Brown in May: ["How to lose $8k worth of bitcoin in 15 minutes with Verizon and Coinbase.com"](https://medium.com/@CodyBrown/how-to-lose-8k-worth-of-bitcoin-in-15-minutes-with-verizon-and-coinbase-com-ba75fb8d0bac); and, of course, [Mat Honan's hacking in 2012](https://www.wired.com/2012/08/apple-amazon-mat-honan-hacking/).)

## Is the fault with PayPal or AT&T?

In concluding his blog post, Williams writes: 

> I don't even place blame on PayPal for this directly. The fault lies with the AT&T call center representative who let someone manipulate my account without knowing my passcode. I've been told this is being escalated internally, but I haven't heard anything from corporate channels, so I remain skeptical until I see or hear something.

That makes sense to me, but even so, I think PayPal should have a way to opt out of the ability SMS password reset. And ideally you could do that and still have 2-factor authentication, even if just via SMS. 

In general I don't think phone numbers should be considered identification. AT&T's security doesn't seem to be built for it, as Williams' story shows: he had set up a passcode with AT&T, and it only slowed the attackers down for a few hours.

## The Difference Between SMS as a 2nd Factor and SMS Password Recovery

One important thing I'm starting to understand is that there is a (big) difference between using SMS as a second factor for login and having SMS as a password reset option.

Williams writes under a sub heading "Lessons Learned?" 

> I have spent the morning trying to evaluate my security practices and there's not much I can think about that I'd do otherwise. Twitter tells me I shouldn't use SMS-based 2 factor authentication and should use app-based 2 factor instead. I agree! The problem is that some sites like PayPal don't offer the better security. The alternative is to just go back to single factor, which I am not so sure is the best solution either.

My guess is that once you give PayPal a phone number, it enables SMS password recovery automatically. Maybe you gave PayPal your phone number for the first time when you enabled SMS two-factor authentication, but even if that were the case, I think it's wrong to conflate SMS password reset with SMS as a 2nd factor for login. (In my case, PayPal had my phone number before I enabled SMS 2-factor.)

### Another Example: Google 

Note that Google/Gmail also automatically sets up SMS password recovery. I'm not sure if it does it when you enable 2-factor, or when you add a phone number by some other method, but when I checked, I indeed had SMS password recovery enabled on my Google account.

I only knew (a) that it was likely turned on and (b) to turn it off because I spotted this tweet from my friend Dan last month:

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">This—and turn off SMS recovery for your Gmail account. <a href="https://t.co/sCzjfgEsyW">https://t.co/sCzjfgEsyW</a></p>&mdash; Dan Romero (@dwr) <a href="https://twitter.com/dwr/status/871737650457133058">June 5, 2017</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

Even then, last month, I knew to quickly disabled this (I explain how I did this below).

A lot of people disparage SMS as a second factor for login, and the fact that it's pretty easy to attack shows that, but I'm not sure it's fair to blame it for attacks that exploit SMS _password reset_, at least directly. These two settings can (and maybe should) be totally separate -- I don't see why Google couldn't leave SMS password recover as an option but have it turned off by default.

#### How to remove SMS password recovery for your Google account

First, go to [the "Signing in" section of Google's security page](https://myaccount.google.com/security#signin). Scroll down a bit to the section titled "Account recovery options". Now remove the "Recovery phone" option. 

![No recovery options](/img/no-recovery-options.jpg)
<!-- <img src="https://pbs.twimg.com/media/DBkNOsMVoAAod2x.jpg"> -->

It's your call as to whether to leave a recovery email in place -- I chose not to. (The recovery email for Honan's Gmail account plays a key part of [his story](https://www.wired.com/2012/08/apple-amazon-mat-honan-hacking/).)

I vaguely remember that either Facebook or Twitter enabled SMS password recovery, but I can't find proof of that in either of the settings.

## Back to PayPal: Some Investigation

As I mentioned, I already have my cell phone number tied to my PayPal account. To confirm what Williams wrote, I successfully reset my PayPal password using just my email address and access to my cell phone. Creepy!

![enter your email](/img/sms-reset/enter-email.png)

![confirm it's you](/img/sms-reset/confirm-its-you.png)

![type in code](/img/sms-reset/type-in-code.png)

![choose new password](/img/sms-reset/choose-new-password.png)

![all set OR AM I?](/img/sms-reset/all-set.png)

Again, the issue here is that these two things -- my email address (not access to it, just knowledge of the address) and access to my SMS messages -- are not very hard to get a hold of. 

I see two possible solutions to this issue: (1) ideally I'd find some setting in PayPal's security page similar to Google's that allows me to disable SMS password recovery. 

The second and less ideal solution would be to (2) simply remove my cell phone from my PayPal account. This is a worse solution because (a) I would then not be able to use SMS 2-factor authentication and (b) PayPal would be unable to alert me of new logins and other  potentially suspicious activity via text message. But I figure my random password is more secure that my phone number, so I think I'd go for it if given the option. 

I couldn't figure out how to do either of these things on my own. So I took to Twitter and asked @AskPayPal if either of these solutions were possible (maybe I was missing something).

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr"><a href="https://twitter.com/AskPayPal">@AskPayPal</a> is there a way to remove the SMS recovery option? Is there a way to remove my phone number from my account completely?</p>&mdash; Sam Schlinkert (@sts10) <a href="https://twitter.com/sts10/status/883702010570313728">July 8, 2017</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

The account's initial response seems to be incorrect: 

> Great question! You should be able to remove the phone number and SMS by clicking settings and edit next to the mobile number and uncheck appropriate boxes. 

I think the support person was referring to these two checkboxes in PayPal settings:

![no alerts](/img/no-alert-checkboxes.jpg)

But even with these unchecked I was again able to reset my PayPal password via SMS. 

We then took to things to DMs. 

Me: "As I wrote in a series of tweets, I'm trying to ensure that an attacker CANNOT reset my password with my only my phone number. What steps can I take to ensure that happens?"

PayPal support:

> Your PayPal account is more secure with a phone number registered to the account. Keep in mind that you are 100% covered for any unauthorized activity that may occur. I recommend reaching out to your service provider with your concerns and to inquire about steps to safeguard the security of your mobile phone. ^LJ

This first answer claimed three things: (a) that my account was more secure with a phone number attached (dubious, considering the Williams story), (b) told me I'm covered for unauthorized activity, and \(c) told me this is more of a concern for my service provider than for PayPal (which I understand the logic of, but wasn't wholly satisfactory).

In subsequent DMs, the support person claimed, "You can remove the phone number from the PayPal account," but I sent screenshots showing there was only a way to add a new number or edit my current number. Eventually he or she threw me their 1-800 support phone number. 

On the phone, I first asked if there was a way to remove my phone number from my account. A nice woman informed me that there had to be a phone number attached to my account, and that there was no way to remove it. 

I then attempted to describe the attack on Williams and ask if there was a way for me to disable password reset by SMS. She said no, but did seem to imply that in some cases PayPal will asks security questions if a password reset request seems strange-- as in it's coming from a strange location. I'm not sure if she was referring to the security questions I set in the settings of my account or other questions from public record.

## What to Do 

It seems like the best solution, in addition to enabling 2 factor authentication via SMS for PayPal logins (which doesn't defend against the attack on Williams, but hey, they have my phone number anyway), is for me to call my service provider and ask them for some increased security against this kind of attack. Though, as mentioned, Williams had a passcode set up with AT&T and it didn't do a whole lot of good, but I suppose it's better than not having it.

One creative solution would be to switch the number PayPal has for me to a Google Voice number, on the bet that SMS messages to that number would be more difficult to intercept. I don't know enough about Google Voice to know this though. The other more radical solution would be to delete my PayPal account and attempt to create a new one without a phone number attached to it, but from what they said on the phone that seems impossible.

Beyond PayPal, I'm going to be on the lookout for the ability to disable SMS password reset on all of my online accounts going forward, especially if that reset bypasses any and all forms of two factor authentication I may have set up. I also can see now how clicking the "I forget my password" link next to various login screens would give me a good clue as to what recovery options that particular service offers.

I'm sure SMS password reset has saved some people's bacon in some cases, but disabling it seems to be an important step toward greater security after (1) enabling the best form of two-factor authentication and (2) using unique, random passwords for all your accounts. I'd almost say we need a site like [Two Factor  Auth](https://twofactorauth.org/) but that shows sites and services where users may have SMS password reset on without knowing it, and with instructions on how to turn it off (if possible). 

## Update: A Decent Solution

Taking advice from [this article](https://motherboard.vice.com/en_us/article/zm8a9y/how-to-protect-yourself-from-sim-swapping-hacks), I ended up creating and using a Google Voice number to help mitigate these issues. 

## Epilogue: Beyond 2-Factor?

Today Russel Brandom wrote [an article](https://www.theverge.com/2017/7/10/15946642/two-factor-authentication-online-security-mess) for The Verge talking about what a mess two-factor authentication is currently. It reflects a bit of the hopelessness and resignation I express above:

> None of this means two-factor is pointless, but it isn't the silver bullet that it seemed to be in 2012. Adding an authentication code hardens the login page, but smart attackers will just find another angle of approach, whether it's a carrier account, a preregistered device, or just a customer service department that's a little too eager to reset the password. Those weak points are the real measure of how secure an account is, but they're impossible to spot from the outside. The result is that, if you're looking for the chat app that's hardest to hijack, it's hard for even sophisticated users to know what to look for.

So we beat on, boats against the current, etc.

## Update: November 2023

PayPal emailed me this month, informing me that they now support security keys for 2-factor authentication. It seems they also now support regular TOTP for use with an authenticator app like Google Authenticator. Finally!
