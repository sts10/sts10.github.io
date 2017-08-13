+++
title= "Some Privacy and Security Measures I've Taken Recently"
date= "2016-11-12 22:24:33 -0500"
comments = "true"
+++

Over the summer of 2016 I started to pay a little more attention to my privacy and security on the internet and when using computers more generally. Some of this impetus had been slowly growing since the Snowden/NSA revelations and catching the documentary _Citizen 4_. More recently I read a few books about computer security, most notably [_Data and Goliath_ by Bruce Schneier](https://www.amazon.com/Data-Goliath-Battles-Collect-Control/dp/039335217X), and a few on open-source software and Linux: [_The Cathedral and the Bazaar_](https://www.amazon.com/Cathedral-Bazaar-Musings-Accidental-Revolutionary/dp/0596001088/ref=sr_1_1?s=books&ie=UTF8&qid=1479008290&sr=1-1&keywords=cathedral+bazaar), [_Coding Freedom_](https://www.amazon.com/Coding-Freedom-Ethics-Aesthetics-Hacking/dp/0691144613/ref=sr_1_1?s=books&ie=UTF8&qid=1479008327&sr=1-1&keywords=coding+freedom) (which [I admired for its liberal art sensibility](https://twitter.com/sts10/status/778426748321005569)), and [_Code and Other Laws of Cyberspace_ by Lessig](https://www.amazon.com/Code-Other-Laws-Cyberspace-Version/dp/0465039146/ref=sr_1_1?ie=UTF8&qid=1470604763&sr=8-1&keywords=lessig+code), the last of which I wrote [a blog post](https://sts10.github.io/post/2016-08-31-how-we-screw-it-up/) if you're interested.

<!-- more -->

## How and Where I Got Information

In addition the books mentioned above, I got most of my information from Reddit and Twitter.

Mostly through a collection of subreddits like [r/privacy](https://www.reddit.com/r/privacy), [r/privacytoolsIO](https://www.reddit.com/r/privacytoolsIO), [r/security](https://www.reddit.com/r/security), [r/crypto](https://www.reddit.com/r/crypto), and [r/encryption](https://www.reddit.com/r/encryption) I got some basic information and found some well-regarded privacy guides:

### Guides

- [Securing Your Life Like a Normal Person](https://medium.com/@mshelton/securing-your-digital-life-like-a-normal-person-a-hasty-and-incomplete-guide-56437f127425) by Martin Shelton
  - Shelton's also written a sort of ["guide to security guides"](https://medium.com/@mshelton/current-digital-security-resources-5c88ba40ce5c#.8l3y54xjz) that I haven't read yet but is likely useful.
- [NYTimes: Protecting Your Digital Life in 7 Easy Steps](http://www.nytimes.com/2016/11/17/technology/personaltech/encryption-privacy.html?partner=rss&emc=rss&_r=0) is fine though I don't think you need to change passwords bi-weekly, as it suggests in one paragraph. See passwords section below for more.
- [Surveillance Self-Defense Against the Trump Administration](https://theintercept.com/2016/11/12/surveillance-self-defense-against-the-trump-administration/)
  - Micah Lee has some other easy-to-follow security guides on [his Intercept author page](https://theintercept.com/staff/micah-lee/).
- [Electronic Frontier Foundation's Surveillance Self-Defense Guide](https://ssd.eff.org/)
  - EFF also has [guides for different roles](https://ssd.eff.org/en/playlist) like [activist or protester](https://ssd.eff.org/en/playlist/activist-or-protester#playlist). Separately, they recently published a blog post called ["Digital Security Tips for Protesters"](https://www.eff.org/deeplinks/2016/11/digital-security-tips-for-protesters).
- [privacytools.io](https://www.privacytools.io/) - A well-maintained list of recommended tools and settings to enhance your privacy. 
- An unofficial [macOS Security and Privacy Guide](https://github.com/drduh/macOS-Security-and-Privacy-Guide) - a bit more intense, but good to read through to learn about more advanced steps.
- [Select All's Two-Step, 14-Word Guide to Comprehensive Digital Security](http://nymag.com/selectall/2017/03/digital-security-information-hackers-internet-privacy.html)
- [How to encrypt your entire life in less than an hour](https://medium.freecodecamp.com/tor-signal-and-beyond-a-law-abiding-citizens-guide-to-privacy-1a593f2104c3#.wwonlaaud) - Repeats a lot of the tips in the other guides I link to above, but it got [decent comments when posted to r/crypto](https://www.reddit.com/r/crypto/comments/5cecij/how_to_encrypt_your_entire_life_in_less_than_an/?st=ivlr2eka&sh=79ada075).
- [Security in a Box](https://securityinabox.org/en) - a "toolkit was created by the [Tactical Technology Collective](http://www.tacticaltech.org/) and [Front Line Defenders](http://www.frontlinedefenders.org/)" that looks pretty comprehensive. If you're using Tor, they also have [an onion address](http://bpo4ybbs2apk4sk4.onion/). 
  - I'll note that Security in a Box, unique to other guides I found, has [a guide](https://securityinabox.org/en/guide/veracrypt/os-x) for using [Veracrypt](https://veracrypt.codeplex.com/), a seemingly well-respected file encryption tool. However I haven't explored Veracrypt as of this writing, so I can't evaluate their guide for it. 

I also followed a number of computer security-and-privacy-minded journalists, researchers, and other folks on Twitter: [@mshelton](https://twitter.com/mshelton), [@micahflee](https://twitter.com/micahflee), [@cfarivar](https://twitter.com/cfarivar), [@xor](https://twitter.com/xor), [@evacide](https://twitter.com/evacide), [@jessysaurusrex](https://twitter.com/jessysaurusrex), [@matthew_d_green](https://twitter.com/matthew_d_green), [@iblametom](https://twitter.com/iblametom), [@bcrypt](https://twitter.com/bcrypt), [@geminiimatt](https://twitter.com/geminiimatt), [@csoghoian](https://twitter.com/csoghoian), [@a_greenberg](https://twitter.com/a_greenberg), [@lorenzoFB](https://twitter.com/lorenzoFB), [@josephfcox](https://twitter.com/josephfcox), [@thegrugq](https://twitter.com/thegrugq), [@mattblaze](https://twitter.com/mattblaze), and [@senykam](https://twitter.com/senykam).

I also read (and enjoyed!) the dissertation of a privacy user researcher named [Martin Shelton](https://twitter.com/mshelton) called ["The Role of Corporate and Government Surveillance in Shifting Journalistic Information Security Practices"](https://mshelt.onl/p/shelton_2015.pdf).

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">My thesis is now public: Role of corporate and government surveillance in journalists&#39; infosec practices. Read here. <a href="https://t.co/1OECgIP2tR">https://t.co/1OECgIP2tR</a></p>&mdash; Martin Shelton 🔑 (@mshelton) <a href="https://twitter.com/mshelton/status/676459334369329153">December 14, 2015</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

## Disclaimers, etc.

So let's get this out of the way: **I am just learning and am far from an expert** and I encourage readers to double check all of my recommendations made here with outside sources that you feel good about trusting. When possible I try to link out to the source of where I got specific tips or recommendations. If anything, I've learned that there's no silver bullet here, and that you should not put your life or anything too important in the hands of software.

Below is what I have learned and some of my subsequent actions-- things I have done given the information I gathered and ultimately trusted enough. If not specified, software and links included assume you're using OS X / macOS (apologies if I switch between the names for Apple's desktop operating system). I mostly wrote this all down as an exercise for myself, but I figured it'd be nice to publish if I ever need to refer to it or point others to it. Again, not an expert. Say it out loud if it helps.

If you see something wrong or misleading here, or you have suggestions, feel free to [tweet at me](https://twitter.com/sts10) or [contact me by one of the means -- including PGP -- listed here](https://gist.github.com/sts10/4a4e01021b3a5ad42e9b73e0abd7b7e3). 

## What I Learned About Passwords

From what I gathered, the basic idea with passwords is that you want (a) to enable two-factor authentication whenever possible, (b) do your best never to re-use a password between multiple services, and \(c) make sure those passwords are random and unique (`fido3` and `fido4` are not random or unique enough-- `VoF3cRLxhcfpCLd298Fd9Y` and `f@[6:7)nSH#i#RMg".8>-a1` are).

### Turning on 2-Factor Authentication

Turning on two-factor authentication means that whenever you log into your account, a code will be sent to your phone that you'll have to enter after entering your correct password. The idea here is that even if an attacker gets your password, they would also need your phone to get this code. As [Shelton writes](https://medium.com/@mshelton/securing-your-digital-life-like-a-normal-person-a-hasty-and-incomplete-guide-56437f127425#.zf9977k7v): [Gmail](https://www.google.com/landing/2step/), [Twitter](https://support.twitter.com/articles/20170388), [Facebook](https://www.facebook.com/help/148233965247823), [Dropbox](https://www.dropbox.com/en/help/363), GitHub, and [a number of other services](https://twofactorauth.org/) allow two-factor authentication. 

**There are different ways to receive and give this 2nd factor code.** The most basic but least secure way is via SMS (text message) -- though note that the National Institute of Standards and Technology, as of July 2016, [advises against this SMS method for security reasons](https://techcrunch.com/2016/07/25/nist-declares-the-age-of-sms-based-2-factor-authentication-over/). However it's important to note that SMS 2as your 2nd-factor is safer than not having a 2nd factor at all, so if SMS is the only choice a service provides, go for it.

The next most secure is a system by which you store a ["time-based one-time password"](https://en.wikipedia.org/wiki/Time-based_One-time_Password_Algorithm) in an app on your smartphone like [Google Authenticator](https://support.google.com/accounts/answer/1066447?hl=en) or [Authy](https://authy.com/). A third, and apparently even more secure method is using a physical key, like a [YubiKey](https://www.yubico.com/), as your 2nd factor. 

As mentioned above, you can also use a physical piece of hardware as your 2nd factor. The most popular option for this product seems to a [YubiKey](https://www.yubico.com/start/). It looks like a thin USB drive you can attach to your key chain. Instead of typing in a code you see on your phone, you plug your YubiKey into a USB slot on the computer and the YubiKey "sends" a code to the service proving that the user has the key. This method is considered more secure and works even if you don't have you phone or its battery is dead. 

Currently Google (gmail), Facebook Dropbox, Windows, masOS Sierra, and password managers LastPass, dashlane, and some versions of KeePass accept a YubiKey as a second factor. You can compare YubiKey options [here](https://www.yubico.com/products/yubikey-hardware/). Separately, here's [an unofficial guide to setting up a YubiKey as a second factor for your Google/gmail account](https://techsolidarity.org/resources/security_key_gmail.htm) that looks pretty good.

**What happens if you lose your phone?** One solution is to store backup codes which can be used instead of the 2nd factor code. Most services give you one or more of these codes when you enable 2-factor for just this reason ([here's more info on GMail backup codes](https://support.google.com/accounts/answer/1187538?hl=en)). Store these somewhere safe obviously, like on a piece of paper you store somewhere secure. Once you use a backup code to login, you can choose to temporarily disable two-factor authentication until you get your phone back or get a new one.

### Use a Password Manager to Keep Track of All Those Unique Passwords

For all your other services (and even the ones that you have two-factor turned on for), you're going to want different passwords for each service. That's because, as Shelton writes in [his password managers guide](https://medium.com/@mshelton/password-managers-for-beginners-d1f49866f80f#.w2pvjawj1):

> If you use the same password everywhere, a hacker only needs to get your password once in order to break into many of your online accounts. And it seems like every week, we hear about a massive new password breach. For example, Yahoo recently announced that passwords for 500 million Yahoo users were breached in 2014. Imagine if an attacker used your single, easy-to-remember password to access your health care records, your home address, credit card numbers, or your social security number. (You can check if your password has already been leaked here.) To minimize the damage from a breach, you should use unique passwords on each account. But it can be a challenge to remember each password.

To keep track of all those unique passwords, it seems that the best solution is to effectively put all your apples in one basket and use a password manager with a (very) strong master password.

### The Password Manager(s) I Chose

So I've jumped between two different password managers. Here I'll describe each of them, with some of the pros and cons. (Note that I currently use all Mac and iOS systems.)

#### KeePassX (No Frills, Get the Job Done)

[KeePassX](https://www.keepassx.org/) is a trusted, simple, open-source, no-frills password manager. The best way I can explain it is to say that it's like Excel, and you can use it to create or open databases of usernames and passwords. Obviously the difference here is that these database files are always well-encrypted when not in use. To access them, you first open the database using KeePassX just as you would open a spreadsheet with Excel, then you must enter the master password for that database. 

Martin Shelton has a nice guide called [KeePass for Beginners](https://medium.com/@mshelton/keypass-for-beginners-dc8adfcdad54) that I'd highly recommend you read through.

![A KeePassX screenshot](https://www.keepassx.org/images/screenshots/main_window.png)

Inside you'll see all your accounts. To log in to a website, highlight the account, then you hit a button to copy your username, paste that in the web form, then back to KeePassX to copy the password, and paste that into the web form. This is a bit time consuming, but as I understand it's the most secure way to use a password manager. 

If you're looking for more features-- such as being able to easily access your passwords on a mobile device-- you may want to look elsewhere.

#### 1Password (More features right out of the box)

In direct response to these problems, at one point I paid for and setup [1Password](https://1password.com/). This is a slicker password manager, with more features than KeePassX right from the get go. 

For example you can install a Google Chrome extension that automatically fills in usernames and passwords for the page you're on. It also syncs with Dropbox seamlessly for you (if you so choose to put your encrypted password file on the cloud), and they have an iPhone app for accessing your passwords. This allows me to sign in both on my phone and, if I wish, on other computers. 

Here's Shelton's guide [1Password for Beginners](https://medium.com/@mshelton/introduction-to-password-managers-5e15baa8b26e) and [an even more recent one from Lifehacker](https://lifehacker.com/the-beginners-guide-to-1password-1794464866?utm_campaign=socialflow_lifehacker_twitter&utm_source=lifehacker_twitter&utm_medium=socialflow).

##### 1Password Account vs. 1Password One-Time License

If you open a 1Password account your username and passwords will be stored and synced on 1Password's servers. There is a sort-of-hidden alternative in which you can pay 1Password an approximately $65 one-time fee for a standalone license to use their software and host it on your own Dropbox account, but the company's pretty actively discouraged new users from taking that route ([here's an AgileBits employee admitting that they've intentionally buried the license option on their website in order to avoid confusing customers](https://news.ycombinator.com/item?id=12376841). Here's [where you can still buy the one-time license](https://agilebits.com/store).

Here's how [Lifehacker](https://lifehacker.com/the-beginners-guide-to-1password-1794464866) explains the choice: 

> While 1Password has a trial version you can check out free for 30 days, it is a paid service after that. You can choose between two different payment models, a subscription or a one-time purchase. The [one-time purchase is $65](https://agilebits.com/store) and only works for Mac. You do not get password syncing between devices (like your phone and your desktop computer) with this purchase, though you can manually sync passwords between devices using [Dropbox or iCloud](https://support.1password.com/sync-options/#sync-it-yourself-with-icloud-or-dropbox).

> Otherwise, you have two subscription options: $3/month for yourself, or $5/month for a family plan. The family plan includes up to five people. With a subscription plan, you get syncing using 1Password’s servers. Most people will likely want to go with the subscription plan.

This and other unnecessary complexity of 1Password, plus its incompatibility with Linux (which I hope to transition to at some point in the near future) are downsides for me. For these (admittedly specific and small) reasons I have mostly switched back to KeePassX and live without being able to access my passwords on my smartphone. However if you want the mobile and Chrome extension features, I don't really have a problem recommending 1Password. 

At this point, for most services I have a randomly-created password stored in my KeePassX or 1Password vaults, and almost none of them are duplicates. (Both KeePassX and 1Password are able to generate random passwords for you.) See EFF's article on [Creating Strong Passwords](https://ssd.eff.org/en/node/23/) for more. 

For creating strong but memorable master passwords (which you obviously can't store in a manager, since they're used to open the password vault), I sometimes use a technique recommended in [the EFF guide linked to above](https://ssd.eff.org/en/node/23/) called [Diceware passphrases](https://theintercept.com/2015/03/26/passphrases-can-memorize-attackers-cant-guess/), which I find absolutely fascinating.

## Other Ways to Secure Your Accounts 

I've now learned that there are other ways bad actors (or anyone) can use your accounts in ways that you don't want without even getting your password. Let's look at those.

### Managing which apps that have access to your accounts

Services like Google, Facebook, and Twitter offer ways for other applications to access your account to varying degrees. Some applications only ask for permission to, say, the email associated with your Facebook account. Others are used so that you can log in to the their service (you may log in to Spotify using your Facebook account, or to Medium by using your Twitter account, etc.). Some of these apps have permission to do more serious things like read your email or post to your account. 

Thus it's important to keep an eye on which apps have what permissions to which of your accounts.

A recent example of a user base that was unfamiliar with the terms and permissions they had given to an app was the [Unroll.me privacy revelations and subsequent backlash](https://www.nytimes.com/2017/04/24/technology/personal-data-firm-slice-unroll-me-backlash-uber.html?_r=0).

It's relatively easy to check which apps have what permissions to your accounts. For example, to see what apps have access to your Google/gmail account, visit [this page](https://myaccount.google.com/security?utm_source=OGB#connectedapps). For Facebook, [the page is here](https://www.facebook.com/settings?tab=applications). I checked to make sure I recognized every service listed and still used it. I revoked the permissions of any apps that I didn't recognize or no longer used. [BuzzFeed has a great how-to](https://www.buzzfeed.com/nicolenguyen/how-to-de-authorize-forgotten-twitter-integrations?utm_term=.frE9b4dZLk#.jnEBXGboPJ) on this for more. 

### Disabling Recovery Methods (for example, Google's SMS account recovery)

Your accounts may have "recovery options" that might be a security risk for you.

For example, Google has a method of recovering your account via SMS (text message). This seems to turned on automatically when you add a phone number to your account. 

[The "Signing in" section of Google's security page](https://myaccount.google.com/security#signin) explains these "account recovery options" as: "If you forget your password or cannot access your account, we will use this information to help you get back in." When I investigated this section of the security page (at the [suggestion of a friend on Twitter](https://twitter.com/dwr/status/871737650457133058)), I found that my cell phone number was listed as a recovery option (even though I had enabled two-factor authentication years ago).

This seems pretty important! As I understand this means that an attacker would only need access to my SMS messages in order to take full control of my Google account, bypassing my TOTP 2nd factor and even my account password. I did not want that to be possible-- I want them to have to know my password _and_ have access to my Google Authenticator app. So in that ["Signing in" section of that Google security page](https://myaccount.google.com/security#signin) I simply removed my "Recovery phone" and confirmed that I had no "Recovery email" listed.

## Browser Use and Tracking 

Most broadly, most services we use on the internet make money, either directly or indirectly, from tracking what we look at online. Google places ads related to what you've recently searched for, Twitter serves ads based on who you follow, Facebook serves ads based on nearly everything you tell it. Separately, thanks to third-party companies you've never heard of, these internet services can easily share information about you. Think about how after do one casual search for lawnmowers on Amazon you see ads for those products follow you around the web. (Update March 2017: Now your internet service provider [may soon have the right to sell your data without your permission](https://www.nytimes.com/2017/03/29/opinion/how-the-republicans-sold-your-privacy-to-internet-providers.html?_r=0).)

A year or even six months ago I would have shrugged this off. "That's how Amazon's recommendations are so good" or "It's not like lawnmowers are illegal" or even the standard "I don't have anything to hide, so..." are the types of reactions I might have had. (If you hold this belief and would like to challenge it try [this Glenn Greenwald TED Talk](https://www.youtube.com/watch?v=pcSlowAhvUk).)

For a variety of reasons my views have apparently shifted, mostly just from my reading and then observing my habits. There was actually one concrete occurrence that freaked me out and drove me to action: While trying to learn more about Linux I must have, at my apartment, done some Googling in Google Chrome about different distributions of Linux. Shortly there after, while at work, Twitter started suggesting I follow Linux-related accounts. I didn't like that idea that a topic I'd Googled at home was now appearing on a website I had to use for work, and furthermore that that information about me was stored _somewhere_ on a server where I couldn't delete it or even read it.

If you want to feel a little more paranoid, the Electronic Frontier Foundation (EFF) has a tool called [Panopticlick](https://panopticlick.eff.org/) that attempts to show you to what extent and how you're being tracked through your browser.

### Multiple Browsers, Multiple Plugins

First, I split my browsing activity at home between two browsers. If I was using a service that necessitated use of my real name or a credit card, I used Google Chrome. This includes online banking, GMail, Twitter, Facebook, Github, Netflix, etc. For everything else I used Firefox (or, optionally, the Tor Browser). This includes random search queries (especially about privacy issues!), most Reddit use, most Youtube watching, etc.

Then, on both my home and office installations of Google Chrome, I went to Settings > Advanced sync settings and unchecked everything, in an attempt to prevent data being shared between the two without my understanding it would be shared. 

On my home installation of Chrome, I then installed two extensions created by the EFF relating to privacy: [HTTPS Everywhere](https://www.eff.org/https-everywhere) and [Privacy Badger](https://www.eff.org/privacybadger). Descriptions from HTTPS Everywhere's official page:

> Many sites on the web offer some limited support for encryption over HTTPS, but make it difficult to use. For instance, they may default to unencrypted HTTP, or fill encrypted pages with links that go back to the unencrypted site. The HTTPS Everywhere extension fixes these problems by using clever technology to rewrite requests to these sites to HTTPS. 

And from Privacy Badger's:

> Privacy Badger is a browser add-on that stops advertisers and other third-party trackers from secretly tracking where you go and what pages you look at on the web. If an advertiser seems to be tracking you across multiple websites without your permission, Privacy Badger automatically blocks that advertiser from loading any more content in your browser. To the advertiser, it's like you suddenly disappeared.

On Firefox, where I might be running into weirder websites, I was a little more aggressive with my add-ons, choosing to take all of the recommendations from [privacytools.io](https://www.privacytools.io/#addons) (though I saw the add-ons they recommend cited by other sources as well).

Thus on Firefox I installed the following extensions: [HTTPS Everywhere](https://www.eff.org/https-everywhere), [Decentraleyes](https://addons.mozilla.org/en-US/firefox/addon/decentraleyes/), [Random Agent Spoofer](https://github.com/dillbyrne/random-agent-spoofer), [Self-Destructing Cookies](https://addons.mozilla.org/en-US/firefox/addon/self-destructing-cookies/?src=api), and [uBlock Origin](https://github.com/gorhill/uBlock). (In general I'd strongly recommend you check what privacytools.io currently recommends, as I won't really be updating this post.) I also set the default search engine to [Duck Duck Go](https://duckduckgo.com/) rather than Google, as they claim not to track users-- though at the time of this writing privacytools.io [recommends other search engines](https://privacytoolsio.github.io/privacytools.io/#search).

I then tweaked my Firefox to further enhance the privacy of the browser by using [these settings](https://www.privacytools.io/#about_config) recommended by [privacytools.io](https://www.privacytools.io/).

You can read even more about setting up your browser for privacy and security in [the "Browser" section of the unoffical macOS Security and Privacy Guide](https://github.com/drduh/macOS-Security-and-Privacy-Guide#browser) I link to above.

In both Chrome and Firefox, these extensions rarely interfere with my normal browsing, but they're all easy to temporarily disable. I could be more intense with both by disabling JavaScript or taking other, more extreme measures, but this seems to be a good balance for me.

#### The Tor Browser

More recently, I decided to try the [Tor Browser](https://www.torproject.org/projects/torbrowser.html.en). I found that, from a user's perspective, it's really just a more secured version of Firefox-- nothing scarier. You can easily avoid visiting the dark/deep web by simply browsing the normal internet, or "surface web", as you normally do. The difference from using regular Firefox is that your connection uses Tor.

The Tor Browser runs a version of NoScript ([website](https://noscript.net/getit), [Firefox add-on download page](https://addons.mozilla.org/en-US/firefox/addon/noscript/)) by default, which may cause some pages to load incompletely, plus it's overall much slower than a normal browser.

From the Tor Browser's [main landing page](https://www.torproject.org/projects/torbrowser.html.en):

> The Tor software protects you by bouncing your communications around a distributed network of relays run by volunteers all around the world: it prevents somebody watching your Internet connection from learning what sites you visit, it prevents the sites you visit from learning your physical location, and it lets you access sites which are blocked. Tor Browser lets you use Tor on Windows, Mac OS X, or Linux without needing to install any software. It can run off a USB flash drive, comes with a pre-configured web browser to protect your anonymity, and is self-contained (portable).

I'd also encourage potential users to read [Tor's list of warnings to consider](https://www.torproject.org/download/download.html.en#warning) and [FAQ](https://www.torproject.org/docs/faq.html.en) before downloading and using the browser. Tor's documentation is located [here](https://www.torproject.org/docs/documentation.html.en).

I also looked into a new browser called [Brave](https://www.brave.com/), a relatively new open source browser that has ad-blocking and privacy features built in. As I see it the pros are that you get some of the benefits you get from some of the add-ons I mention above right out of the box. Brave also comes bundled with a password manager of its own, but you can switch that out for 1Password, Dashlane, or LastPass. The cons are that you, currently, can't add other extensions to your liking. For these reasons, I have it installed on my iPhone, but stick with Tor and Chrome when on desktop. 

Note that when using version 0.12.9 of Brave for OS X you need to [enable "Google Widevine" support](https://github.com/brave/browser-laptop/issues/468#issuecomment-255938042) to use services like Netflix in the browser. Also, in regard to the advantages that the Tor Browser provides over Brave, apparently Brave developers are [looking into adding Tor support for Brave](https://twitter.com/bcrypt/status/798383317959602176) ([GitHub link](https://github.com/brave/browser-laptop/wiki/Brave-Tor-Support)), which would be pretty interesting!

## Communication (Texts, Instant Messaging, and Email)

Basically you want to communicate using tools that encrypt your communications such that not even the toolmaker can read them, even under threat from the law. This feature is generally known as "end-to-end encryption" and a number of services advertise having it. There's bonus points if the service you're using obfuscates or hides your metadata, as well as the contents of your communication, though this seems to be difficult to get from a service at this point.

Gchat/Google Hangouts, Google Allo, Facebook Messenger, and normal SMS have neither of the features mentioned above, at least by default, as of this writing. Facebook [now offers "Secret Conversations"](http://money.cnn.com/2016/10/05/technology/facebook-secret-conversations-mode/index.html), and Google has released Allo, which has an "incognito" mode, but neither service turns on end-to-end encryption by default (["Google's Allo won't include end-to-end encryption by default"](https://techcrunch.com/2016/05/18/googles-allo-wont-include-end-to-end-encryption-by-default/)). 

Releasing software in which the encryption is not enabled by default is a bigger issue than I originally assumed. EFF wrote on their blog that, with Allo, Google is ["teaching the wrong lessons about encryption"](https://www.eff.org/deeplinks/2016/09/googles-allo-sends-wrong-message-about-encryption), not to mention confusing users about what "incognito" means. 

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Google&#39;s decision to disable end-to-end encryption by default in its new <a href="https://twitter.com/hashtag/Allo?src=hash">#Allo</a> chat app is dangerous, and makes it unsafe. Avoid it for now.</p>&mdash; Edward Snowden (@Snowden) <a href="https://twitter.com/Snowden/status/733253324301053952">May 19, 2016</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

### Metadata

Besides preventing anyone from reading the contents of your messages, you _may_ also be concerned about who can see different types of metadata from your conversations. One example of this metadata is who you are talking to, which may be important for whistleblowers or activists. (General Michael Hayden, former head of the NSA, [once said](http://abcnews.go.com/blogs/headlines/2014/05/ex-nsa-chief-we-kill-people-based-on-metadata/) the U.S. Government "kill[s] people based on metadata.") Metadata also includes when you send messages, who you send them to, your address book/instant messaging contact list, history of phone numbers you've called, the subject line of emails, etc.

Micah Lee [gives an example services that handle metadata differently](https://theintercept.com/2016/11/12/surveillance-self-defense-against-the-trump-administration/): 

> All of the messages you send to groups of people using these apps [that offer end-to-end encryption] will be end-to-end encrypted. No one, not even the app developers who have access to the servers these apps use, will be able to read the plaintext of your messages, except for the other members of your group.

> But while the messages are encrypted, the list of members of the group might not be, and this is also important information to protect. WhatsApp and Semaphor might be able to hand over group membership information if the government comes knocking.

He then gives an example of a service, Signal, that he says does a better job at handling user metadata:

> On the other hand, the developer of Signal, Open Whisper Systems, is [way ahead of the game](https://theintercept.com/2016/06/22/battle-of-the-secure-messaging-apps-how-signal-beats-whatsapp/) here. The one time they [received](https://whispersystems.org/bigbrother/eastern-virginia-grand-jury/) a request for data about a Signal user, all they were technically able to hand over to the FBI was the account creation time and the last date that the user connected to the Signal server — they didn't have the users’ contacts, they didn't have a list of groups they were in or members of those groups. The company also successfully fought a gag order designed to keep them from publicizing the request. That said, Signal groups can be buggy, have scaling issues when groups get too big, and at the moment there are far fewer people using Signal than there are using WhatsApp.

### Signal: The Current Reigning Champ

For phone-to-phone texting and calling, a lot of people recommend [Signal](https://whispersystems.org/). [Downloads of the application have spiked since the US election results](https://motherboard.vice.com/read/signal-downloads-spiked-after-election-results), which is good as you can only communicate with other Signal users, and it recently [passed an audit](http://www.theregister.co.uk/2016/11/08/trust_it_results_of_signals_first_formal_crypto_analysis_are_in/) (though I am not sure how legit the organization behind the audit is). 

The New York Times's [Brian X. Chen recommends Signal to his readers](http://www.nytimes.com/2016/12/07/technology/personaltech/worried-about-the-privacy-of-your-messages-download-signal.html?_r=0), and Snowden is also a fan: 

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">I use Signal every day. <a href="https://twitter.com/hashtag/notesforFBI?src=hash">#notesforFBI</a> (Spoiler: they already know) <a href="https://t.co/KNy0xppsN0">https://t.co/KNy0xppsN0</a></p>&mdash; Edward Snowden (@Snowden) <a href="https://twitter.com/Snowden/status/661313394906161152">November 2, 2015</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Use Tor. Use Signal. <a href="https://t.co/VLvBsbVHKs">https://t.co/VLvBsbVHKs</a></p>&mdash; Edward Snowden (@Snowden) <a href="https://twitter.com/Snowden/status/778592275144314884">September 21, 2016</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

[The Clinton campaign also used it](http://www.vanityfair.com/news/2016/08/how-the-clinton-campaign-is-foiling-the-kremlin).

Signal is [open source](https://github.com/WhisperSystems/Signal-iOS) and is licensed under the [GPLv3](http://www.gnu.org/licenses/gpl-3.0.html). Its founder is Moxie Marlinspike, a computer security researcher recently [profiled in _Wired_](https://www.wired.com/2016/07/meet-moxie-marlinspike-anarchist-bringing-encryption-us/). Also, Signal [recently released a desktop client for iPhone users](https://whispersystems.org/blog/signal-desktop-ios/), meaning you can send messages to your Signal contacts from your desktop.

<!-- Note that [there are some complaints](https://sandervenema.ch/2016/11/why-i-wont-recommend-signal-anymore/) that it has a what I understand to be a small dependency on Google Cloud Messaging. But given [this response from Marlinspike](https://news.ycombinator.com/item?id=12883410) and [another blog post responding to the GCM issue](http://dephekt.net/2016/11/10/managing-security-trade-offs-why-i-still-recommend-signal.html), I'm not too concerned. It seems like any security trade-off is worth it for making the app easier to install and use. -->

Micah Lee has recently written [a thorough guide on how to use Signal](https://theintercept.com/2017/05/01/cybersecurity-for-the-people-how-to-keep-your-chats-truly-private-with-signal/). Martin Shelton also has ["Signal for Beginners"](https://medium.com/@mshelton/signal-for-beginners-c6b44f76a1f0).

### Wire: A (debatably small) security comprise for more features

As of February 2017 I've taken a serious look at [Wire](https://wire.com/en/), a messaging app that offers end-to-end encryption similar to Signal, but has some added benefits like stand-alone native desktop applications on Mac, Windows, and [Linux](https://medium.com/@wireapp/a-step-forward-for-wire-for-linux-52f0538cac15) (no connection to Google necessary), and things like GIFs and drawings. It's also free and open source, promising no ads or third-party tracking.

Wire was [audited in February 2017](https://techcrunch.com/2017/02/10/messaging-app-wire-now-has-an-external-audit-of-its-e2e-crypto/), and [more of its server code has been open sourced](https://medium.com/@wireapp/open-sourcing-wire-server-code-ef7866a731d5), which has ostensibly helped to it recently being [listed on privacytools.io as a suitable alternative to Signal](https://privacytoolsio.github.io/privacytools.io/#im). 

Wire recently got the coveted Snowden recommendation on a ["Pod Save the People" episode](https://art19.com/shows/pod-save-the-people/episodes/cedb8657-71d7-4ab3-b41c-ce705dfa71ac) (in which he highlights the fact that, unlike Signal, you don't need to give Wire you phone number), and he's [tweeted about it since then](https://twitter.com/Snowden/status/872880404780503040).

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">&quot;If you don&#39;t want to to share your phone number […] use Wire.&quot; Thanks for recommending Wire, <a href="https://twitter.com/Snowden">@Snowden</a>! <a href="https://t.co/cq2eDH6uvY">https://t.co/cq2eDH6uvY</a></p>&mdash; Wire (@wire) <a href="https://twitter.com/wire/status/865499400021303297">May 19, 2017</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

Though note that [Wire currently stores a good amount of metadata on their servers in an unencrypted state](https://motherboard.vice.com/en_us/article/secure-messaging-app-wire-stores-everyone-youve-ever-contacted-in-plain-text) to improve multi-device support-- likely more metadata than Signal. For completeness sake, here's [Wire's sort-of response](https://medium.com/@wireapp/product-design-decisions-for-secure-messengers-e8a5e7d1a373) to these metadata revelations.

These encrypted communications only work if your contacts use them, so I'm hoping that the non-encryption-based benefits of Wire help sway some of my friends from things like gchat and iMessage. 

I wrote [more about Wire in another blog post](https://sts10.github.io/post/goodbye-to-all-gchat/) if you want more of my thoughts on it.

### Don't Need Mobile Access? Ricochet: A different approach to metadata

I also found a desktop-only messaging app called [Ricochet](https://ricochet.im/) which uses the Tor network in an attempt to obfuscate or "eliminate" metadata of your conversations. From their documentation:

> Ricochet uses the [Tor network](https://www.torproject.org/about/overview.html.en) to reach your contacts without relying on messaging servers. It creates a [hidden service](https://www.torproject.org/docs/hidden-services.html.en), which is used to rendezvous with your contacts without revealing your location or IP address. Instead of a username, you get a unique address that looks like ricochet:rs7ce36jsj24ogfw. Other Ricochet users can use this address to send a contact request - asking to be added to your contacts list.

> You can see when your contacts are online, and send them messages (and soon, files!). Your list of contacts is only known to your computer - never exposed to servers or network traffic monitoring.

> Everything is encrypted end-to-end, so only the intended recipient can decrypt it, and anonymized, so nobody knows where it's going and where it came from.

Ricochet's website goes on to warn that the software is "an experiment" and that "Security and anonymity are difficult topics, and you should carefully evaluate your risks and exposure with any software." However Ricochet was audited in January 2016 ([PDF](https://ricochet.im/files/ricochet-ncc-audit-2016-01.pdf)) and [Joseph Cox of Motherboard says it passed](https://motherboard.vice.com/read/ricochet-encrypted-messenger-tackles-metadata-problem-head-on).

I like its design-- you don't have a password and you don't pick a username. As I understand it your identity is connected to the computer you're using and the (private) key file that is created and stored on your computer when you install the software. More on Ricochet's design [here](https://github.com/ricochet-im/ricochet/blob/master/doc/design.md). Ricochet is open source ([GitHub](https://github.com/ricochet-im/ricochet)) and can be [built from source](https://github.com/ricochet-im/ricochet/blob/master/BUILDING.md). You can find my Ricochet username [here](https://gist.github.com/sts10/4a4e01021b3a5ad42e9b73e0abd7b7e3). 

I'll also mention [Cryptocat](https://crypto.cat/), another desktop-only, open source encrypted messaging app. Cryptocat is mentioned by name as a good option in _Data and Goliath_ and on [privacytools.io](https://privacytoolsio.github.io/privacytools.io/#im), and it allows file transfers which is nice. One thing to note is that previous version(s) of the app were criticized for a lack of security, but, after re-writing the program, the developer has now asked security-minded users to [take a second look at the code](https://www.reddit.com/r/netsec/comments/4fyzyc/cryptocat_rewritten_from_scratch_invitation_to/?st=ivgs41yw&sh=c25b60a8). 

Note that both Signal and Wire offer desktop applications as well. 

### Encrypting Email is Hard

Apparently encrypting email is (still) hard. 

A standard method that's been around for a while is [PGP ("Pretty Good Privacy")](https://en.wikipedia.org/wiki/Pretty_Good_Privacy), for which I wrote [a basic explainer when I first learned how to use it](https://sts10.github.io/post/2015-07-01-my-basic-understanding-of-pgp-encryption/). Shelton, in [a post called "Security Compromises in Journalism"](https://medium.com/@mshelton/security-compromises-in-journalism-4cc32ba0709d#.sofplhy72), writes:

> PGP is a protocol for encrypting messages, and it's become a tool both security specialists and journalists both love to hate. Today, its open source implementation, GnuPG, is widely used by journalists and media activists around the world to encrypt the body of their emails. PGP isn't easy to set up, and once it's running, users can very easily make mistakes. For example, users can send an encrypted message using an incorrect or expired key, essentially making the message unreadable to the recipient.

> Glenn Greenwald, who broke the early Snowden disclosures with the Guardian, is perhaps one of the most famously resistant PGP users. Edward Snowden provided detailed instructions on how to set up the protocol, but Greenwald held off for months. In an interview, I asked Greenwald about the challenges of using PGP. He told me, "PGP hasn't really evolved that much since [the 1990s] in terms of being user friendly because it's mostly been used by nerds and hackers, and people who almost like the fact that it's so complicated."

As Shelton observes, PGP is (still) difficult to use, but [GPG Tools](https://gpgtools.org) makes it easier for Mac users (they also have [a guide for new users](https://gpgtools.tenderapp.com/kb/how-to/first-steps-where-do-i-start-where-do-i-begin-setup-gpgtools-create-a-new-key-your-first-encrypted-mail)). 

This set of tools includes GPGMail, "an open source plugin for Apple Mail" which does seem to make the process easier when using OS X's default mail app. However, for encrypting email with PGP, both [the EFF](https://ssd.eff.org/en/module/how-use-pgp-mac-os-x) and the [Free Software Foundation](https://emailselfdefense.fsf.org/en/mac.html) recommend using Thunderbird and Enigmail. If you use Gmail's web interface, you can look in to [Mailvelope](https://www.mailvelope.com/). I'm sure there are other plugins and pieces of software that attempt to make usage easier.

I admit I don't have a full grasp of how to use PGP. For example, the idea of signing the keys of others, as described in [the FSF guide](https://emailselfdefense.fsf.org/en/mac.html), continues to elude me. Regardless, my public PGP key is [here](https://pgp.mit.edu/pks/lookup?op=get&search=0x5BF6E5C2B80500F2). I've also purchased a YubiKey and put a new PGP key on it, [which you can read about](https://sts10.github.io/post/2016-12-06-yubikey-and-gpg/). 

As you might expect, it's difficult to get friends into PGP, so I haven't used it to communicate in a while. However I have found GPG Tools' "GPG Services" (included in GPG Tools) useful for quickly encrypting specific files on my Mac, either for safe storage or safely emailing to myself.

To avoid Google reading my email, realistically I'd have to get off of GMail. One alternative that [many are flocking to recently](https://techcrunch.com/2016/11/11/signups-for-encrypted-mail-client-protonmail-double-after-election/) is [ProtonMail](https://protonmail.com/), a provider based in Switzerland that encrypts emails _between ProtonMail users_, and is [open source](https://github.com/ProtonMail/WebClient). 

I'm honestly not sure how difficult it would be for me to change email addresses these days, as I've had the same GMail address since 2005. But it might not be too hard, given that I doubt my email address gets typed out that often, and when it does it gets auto-completed.

### What I Did

I set myself up on Ricochet, Signal, Wire and Cryptocat and created a public PGP key and put all that information online in [a GitHub gist](https://gist.github.com/sts10/4a4e01021b3a5ad42e9b73e0abd7b7e3). I then linked to that gist in my the bio of my Twitter account, which is verified. Of all of those I'm using Wire the most (which [I wrote more about here](https://sts10.github.io/post/goodbye-to-all-gchat/)). 

## Encrypting Your Hard Drive

A lot of the guides I found recommend encrypting your computer's hard drive. As [Shelton writes](https://medium.com/@mshelton/securing-your-digital-life-like-a-normal-person-a-hasty-and-incomplete-guide-56437f127425#.dcxdkpedk):

> **Encrypt your hard drive.** If your device is ever lost or stolen, it's easy for thieves to take data off your hard disk. Good news: If you have a new password-protected iPhone [your disk is already encrypted](https://support.apple.com/en-us/HT202064). If you have an Android Device, [it's pretty easy to encrypt your phone](https://support.google.com/nexus/answer/2844831). A few Android phones (in the Nexus line) are [encrypted by default](http://nexus%205x%2C%206p%2C%206%2C%209/). For your laptop or desktop, you can encrypt your hard drive using your operating system's native software: [FileVault for Mac](https://support.apple.com/en-us/HT204837), or [BitLocker on Windows](http://www.pcworld.com/article/2308725/a-beginners-guide-to-bitlocker-windows-built-in-encryption-tool.html).

I actually _haven't_ done this yet (on my Mac it would mean enabling FileVault) as I'm little freaked out about straight-up forgetting my password or screwing it up in some other way, but you should consider it! One way to mitigate the risk of forgetting this password would be to write it down on a piece of paper and store it someplace safe.

## Additional Resources

This [Witness blog post](https://blog.witness.org/2016/11/getting-started-digital-security/) pointed me to a few of the guides I link to above, including to [Security in a Box](https://securityinabox.org/en). 

## See Something Say Something

I'm low-key terrified that there is misinformation above. Again, if you see something wrong or misleading here, or you have suggestions, feel free to [tweet at me or DM me](https://twitter.com/sts10) or send me an encrypted message using [one of the services listed here](https://gist.github.com/sts10/4a4e01021b3a5ad42e9b73e0abd7b7e3).
