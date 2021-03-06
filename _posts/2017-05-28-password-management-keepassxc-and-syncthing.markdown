---
layout: post
date : 2017-05-28 15:50:47 -0400
title : "Reexamining my Password Management System"
comments: true

---

For the last year and a half I've been using both [1Password](https://1password.com/) and [KeePassX](http://keepassx.org/) to manage my passwords. I've been storing most usernames and passwords using 1Password, since I can easily access it on my iPhone and I have the Chrome extension installed at home, making signing in that much easier. I use 1Password with Dropbox by purchasing the [license](https://agilebits.com/store) rather than pay a regular fee to 1Password (I took some [brief  notes](https://sts10.github.io/2015/09/29/1password-setup.html) when I set it up in 2015). This means that my password database lives on my Dropbox account (though it's still actually lives on somebody else's computer).

I use [KeePassX](https://www.keepassx.org/) (though I'm flirting with moving to [KeePassXC](https://keepassxc.org/)) for storing more important information that I'm too paranoid to trust to 1Password and Dropbox. Granted, this might not be _normal_ but that's where I'm at. I have one KeePass database at home for important personal information (banking, some back up codes, etc.) and another separate database at work for important work logins. I have both of these databases backed up on at least one of device, but I do this backup manually whenever I think to do it.

Disclaimer before we get into this: I'm a social media editor. I say this mostly to tell you that I'm _not_ a security researcher or anything like that-- just a normal internet user who's comfortable on the command line, uses Neovim, and has written some shitty Ruby in the past.

If you've never used a password manager before I'd strongly advise you read [this guide](https://medium.com/@mshelton/password-managers-for-beginners-d1f49866f80f) from Martin Shelton (who is a user researcher!) first. And I'd advise you to use one!

## Problems with my current setup

For the most part, I think I've been handling my shit pretty well. Like, these problems aren't that I'm leaking passwords everywhere or one of the services I've been using was hacked (that I know of at least). But that said, given the sheer number of logins (74, not including work) I have to manage, multiple machines, the (hopeful) coming addition of Linux into the mix, and my distaste for Dropbox, I've got some things to tackle.

1. **1Password doesn't work on Linux:** I'm hoping to switch from Mac to Linux at home (likely [System76](https://system76.com/laptops/oryx)). Unfortunately 1Password doesn't work on Linux, and doesn't look like it will anytime soon.

2. **Logins stored in too many places and not automatically synced:** Currently some of my logins live both in my 1Password database as well as one or both of the KeePass databases. While this makes accessing these logins easier, it also means that changing them is painstaking. I even have some logins that live in Dropbox and two KeePass databases-- and sometimes only one of them has the correct, most recent password.

3. **1Password + Dropbox installation is "heavy":** I haven't installed Dropbox on my work computer, as (a) I don't want my other more personal Dropbox data on a work machine, (b) it's kind of a "heavy" install, as it adds my Dropbox folders to the computer's Finder, would run synchronizations a lot of the time if not constantly, etc., and \(c) it seems kind of unprofessional. This isn't to mention that 1Password is yet another install. For these reasons I'm uncomfortable setting up 1Password + Dropbox on my work computer. Note that I currently can pull out my phone, open my 1Password app, look up a login, and either use it once or store it in my work KeePass database for regular use (but then I've gone and created a duplicated and unsynced entry).

4. **Don't Trust 1Password + Dropbox (three reasons):** Why don't I just use 1Password for everything, including those logins and information I currently only store with KeePass? If I did that would solve problem #2. There are 3 reasons that I don't do this (here's where I get a little paranoid): (a) neither 1Password nor Dropbox is open source, meaning that critical security flaws and/or back doors _could_ exist. (b) my (encrypted) password database is stored on Dropbox servers, which reside in the U.S. and I have no control over. And \(c) 1Password requires a Chrome extension for auto-filling, which, from my understanding, introduces a lot more security vulnerabilities.

5. **No way to easily sync KeePass databases:** I could use Dropbox + 1Password less (or not at all) if I had a good way of keeping KeePass database(s) in sync across multiple devices.

I should probably outline a more formal threat model here, but to be honest I'm not sure how to do that, especially without revealing information that I wouldn't want to be public.

## Plan A: LastPass

[LastPass](https://www.lastpass.com), a 1Password competitor, solves a lot of the problems mentioned above. It works on Linux, and its install, at least on Mac, can be pretty lightweight-- I think one option is to [just install a Chrome extension](https://medium.com/@mshelton/lastpass-for-beginners-e921f35d4114), though there are also [two(?) apps for Mac](https://lastpass.com/misc_download2.php). I'm not sure if you can use LastPass + Dropbox, as opposed to their cloud servers, but even I could do that, I think I'd rather go all in with LastPass so I wouldn't have to worry about Dropbox and it's heavy install bringing my personal stuff on Dropbox onto every computer where I want to access my passwords.

There are a lot of pros here, including great iPhone access. Where this plans fails hard is problem #4. All of my eggs are in the LastPass basket on servers I don't control (4B). LastPass, like 1Password, is closed source and thus unavailable to be reviewed by those outside of the company (fails 4A). LastPass also relies heavily on browser integration to auto-fill information, so it fails problem 4C as well. In fact LastPass had to [patch some critical security flaws in March](https://www.engadget.com/2017/03/22/critical-exploits-found-in-lastpass-on-chrome-firefox/) that seem to have involved the browser extensions. 

Pros: Simple, cross-platform, iPhone access. Can even access it on a friend's computer without my iPhone. Cons: Everything is in a closed-source, browser integrated basket that lives on LastPass servers.

## Plan B: Syncthing + KeePassXC

I'm not sure how many of these plans I want to write out, so let's just cut to the front runner now. It's broken into to two parts: a password manager and a syncing mechanism. We'll start with the password manager.

### The Password Manager: KeePassXC

I waved my hand over explaining what KeePassX/KeePassXC are up till this point. Now I'll need to be more specific. Let's start with Martin Shelton's description from his post, ["KeePass for Beginners"](https://medium.com/@mshelton/keypass-for-beginners-dc8adfcdad54):

> KeePass is a free and open source password manager. The official build of KeePass is for Windows. In practice, KeePass it isn't really one application-- **it's more of an ecosystem of compatible software created by open source developers** [bolding mine]. It's got some great security options not seen elsewhere, and can be found on most platforms and browsers. KeePass isn't quite as pretty as 1Password or LastPass and requires a bit more work, but it does its job well.

This KeePass ecosystem has a lot of different parts-- for example, Shelton points to both a Chrome extension and Firefox add-on that can be used with a KeePass database. As for desktop apps, Mac OS users have the choice between [KeePassX](https://www.keepassx.org/) and now a newer "fork" or version: [KeePassXC](https://keepassxc.org/). But what I like most about this KeePass ecosystem is that, at its simplest, the password databases that you create simply live as files on your computer and are very well encrypted. 

This gives users a lot of choice. If you want to put that file on the cloud, that's your call-- it is pretty well encrypted. If you want to download a browser extension and give it access to that database, that's your choice. But at its simplest it's something that seems reasonably secure to me-- a file on your computer locked pretty well behind a master password, and not sent anywhere that you don't send it to.

#### KeePassXC's Auto-Type Feature

[KeePassXC](https://keepassxc.org/) is a newer desktop client for creating and editing KeePass databases. Like KeePassX, it works well on both Mac and Linux (problem 1). Crucially, KeePassXC brings an extra feature to Mac-- Auto-Type. 

It's my understanding that Auto-Type brings most of the usefulness of the browser plugin-based auto-fill features that LastPass and 1Password offer, but without the security risk. Rather than integrate with the browser, Auto-Type is a function that (1) navigates to the last window you had open, the (2) types your username, hits tab, types your password, then hits enter. It's just as if you're typing it in yourself. (Thus it also works for applications outside of the browser as well.)

You can also change that pattern per account. So for example, when you log in to Google, you enter your email, then hit next, then enter your password, then hit submit again. I've entered a custom "Auto-Type sequence" for Google, `{USERNAME}{ENTER}{DELAY 2500}{PASSWORD}`, so that KeePassXC waits 2500 milliseconds for the password prompt to appear. I also took off the last Enter command, just in case something went wrong with the Auto-Type. You can [read more about these Auto-Type and the Auto-Type "sequences" on the KeePass website](http://keepass.info/help/base/autotype.html#autoseq).

One downside to Auto-Type compared to some browser auto-fill solutions is that Auto-Type doesn't check the URL of the page you're entering your credentials into, which a browser extension could. This increases your chance of entering your login into a fraudulent site.

As alluded to above, KeePassXC does support browser extensions via a protocol called KeePassHTTP, but KeePassXC devs have put a note on [their project page](https://keepassxc.org/project) about how KeePassHTTP is "not a highly secure protocol". KeePassHTTP comes turned off by default on KeePassXC and I intend to leave it that way and just use Auto-Type.


### The Synchronizer: Syncthing

One problem with KeePass on its own is that there's no built-in way to synchronize your password database across multiple devices. Probably the simplest way to do this is to upload your KeePass database to a service like Dropbox or Google Drive, as Shelton suggests. 

Now I could use Dropbox to synchronize my KeePass database. The downsides to this are that, as I've mentioned, the Dropbox install feels a little obtrusive for my work machine. Plus I always forget how to specify _which_ folders to sync with a given computer.

What if I could host my KeePass database on my own computers and never have it touch a cloud service but still have it be automatically kept in sync between any number of computers? That's basically what [Syncthing](https://syncthing.net/) does. I [wrote about it a few days ago](https://sts10.github.io/2017/05/24/getting-started-with-syncthing.html), but here's their intro paragraph on their website: 

> Syncthing replaces proprietary sync and cloud services with something open, trustworthy and decentralized. Your data is your data alone and you deserve to choose where it is stored, if it is shared with some third party and how it’s transmitted over the Internet.

You can read more about it on [their website](https://syncthing.net/) or [their GitHub page](https://github.com/syncthing/syncthing). I did an decent job of detailing how I set it up for the first time in my [blog post](https://sts10.github.io/2017/05/24/getting-started-with-syncthing.html)-- they also have a helpful ["Getting Started" page](https://docs.syncthing.net/intro/getting-started.html).

One cool aspect of Syncthing that I'll explain in a little detail is how new devices (computers) are added. Let's say I have a new computer that I want to access a shared folder on. Rather than login with a Syncthing username and password, I must send a request to the other device via the other device's ID. Then that device must accept the invitation to share. 

The downside here is that I can't share anything with a new device until I can access the new device and then access the old device again. This means I **can not** access my passwords at a friend's computer while away from any of my computers, even if I have my iPhone (Syncthing has no iOS support that I know of). The upside is extra security, and no Syncthing password to remember.

Another benefit is that it's very easy to select which folders get shared with what devices. i.e. if I want to share a folder of photos between computer A and B, computer C doesn't have to ever know about those photos.

### How I'd implement Syncthing + KeePassXC

On each computer I'd have a folder called something like "sync". One computer, an old MacBook Pro running Ubuntu 16.04, would have Syncthing running almost constantly, such that all changes made on other computers would always be synced to that old MacBook Pro-- it'd effectively be my cloud. I'd likely set [ignoreDelete](https://docs.syncthing.net/advanced/folder-ignoredelete.html) on and set up one of Syncthing's [file versioning options](https://docs.syncthing.net/users/versioning.html) on that old MacBook Pro, if not also on my normal home computer.

I'd then make a fresh KeePass database with a new six-word [diceware](https://theintercept.com/2015/03/26/passphrases-can-memorize-attackers-cant-guess/) password (actually rolled with dice) that would also require a key file to open it. I'd benchmark the [transform rounds](http://www.laurencegellert.com/2015/02/a-keepass-setting-that-might-save-your-online-identity/) to 1 second on one of my computers, ensuring it's over 10 million. I'd copy the key file to all computers that I'd need to access the passwords via physical USB stick at setup time-- they'd just live on the computers, but never be sent over Syncthing. I'd then put the KeePass database in the "sync" folder (but not the key file). 

Lastly, if at a particular computer I needed to save information that I felt was too sensitive to transmit over Syncthing, I'd create a second KeePass database with a separate passphrase (but likely no key file) that would just live on that particular computer.

### Benefits of Syncthing + KeePassXC

This combo knocks out a ton of issues. There's no cloud storage and all of the components are open source. With KeePassXC I get to rely on the arguably safer Auto-Type feature. KeePassXC (as well as KeePassX) easily allows me to have two databases open at once -- one that's synced with Syncthing and one that always lives on a given computer and never moves, for more sensitive information.

The Syncthing CLI (command line interface) + Web GUI installation option is pretty light. As an added bonus, this system gives me a safe way of syncing other types of files across my computers, without having to worry about monthly fees or size restrictions of a cloud service (one of my worries with 1Password + Dropbox was that a friend would share a ton of large files with me, maxing out my 100GB and thus preventing me from writing to my 1Password database).

### Cons of Syncthing + KeePassXC

Obviously there's more maintenance involved here than with LastPass. I have to keep the old MacBook Pro running Ubuntu running and up to date-- both the operating system and Syncthing itself. Though keeping Syncthing up-to-date is super easy-- it just does it on its own 24 hours after each stable release (see [this Syncthing doc](https://docs.syncthing.net/users/faq.html?#how-do-i-upgrade-syncthing)).

There's also no way to access my passwords from my iPhone. And even given a new/friend's/public computer, I can't easily get to my files, given Syncthing's security model described above. I of course could put my KeePass database, key file, and a portable version of KeePassXC on a USB stick for travel, if I knew I'd need to access my passwords.

## Plan C: KeePassXC + SpiderOak

When I asked about Syncthing and KeePass on Mastodon, [one user responded by saying](https://octodon.social/@jalefkowit/2437931) that they used SpiderOak to sync his KeePass database across multiple devices. However [another user wrote](https://mastodon.hasameli.com/users/munin/updates/6470): "Spideroak is reputable and going to be better implemented than most homegrown solutions," referring to Syncthing as homegrown (which it is in many ways!).

[Spideroak](https://spideroak.com/) is company that offers a product called [Spideroak One](https://spideroak.com/personal/spideroak-one) that offers "secure, reliable backup to protect your most important files." They advertise what sounds like a higher level of security than other cloud providers like Dropbox: 

> Because our software encrypts every piece of data before it ever leaves a computer, we never know the types or content of your files. Everything we store is encrypted end-to-end (at-rest and in-transit). You alone have sole ownership and complete control of the keys to unlock your data. We call this No Knowledge privacy.

That "No Knowledge" policy is explained more in-depth [here](https://spideroak.com/manual/no-knowledge-explained). 

I should probably try the free trial, but my gut is that it's going to be similar to Dropbox in that it'll have a heavy install. Also, I'm pretty sure Spideroak One is closed source. 

Privacytools.io recommends other services for [encrypted cloud storage](https://privacytoolsio.github.io/privacytools.io/#cloud)-- currently Seafile and NextCloud. I also found [Tresorit](https://tresorit.com/), which says it's "Protected by Swiss privacy laws" and claims to be zero-knowledge. It looks like it would run me about $125 per year for 100GB. I guess I could check those out. Privacytools also has a section on [Secure File Sync Software](https://privacytoolsio.github.io/privacytools.io/#sync), with other options besides Syncthing. 

## Plan D: KeePassXC + Dropbox + Mini KeePass

We've gone over the first two parts of this plan pretty heavily above. But I should note that if I were to put my KeePass database on Dropbox, there is one large advantage: I believe that I would be able to access it from my iPhone using [MiniKeePass](https://itunes.apple.com/app/id451661808). I'm not sure if the syncing is automatic or what. 

Frankly Plan D here is pretty strong, except for the Dropbox middleman. 

## Plan F: Pass

Another solution would be to use [Pass: "The Standard Unix Password Manager"](https://www.passwordstore.org/). 

> Password management should be simple and follow Unix philosophy. With `pass`, each password lives inside of a `gpg` encrypted file whose filename is the title of the website or resource that requires the password. These encrypted files may be organized into meaningful folder hierarchies, copied from computer to computer, and, in general, manipulated using standard command line file management utilities.

I'd have to learn more about pass, but my understanding is that it's a CLI that uses GPG to encrypt your passwords. It also uses Git, implying that it can be easily synchronized between multiple computers using a service like Github. I'm curious if people trust GPG enough to push this file to a public Github repo (does making it a private Github repo provide that much more security?).

I'd also have to look into easy ways of filling out forms in browsers as well as iOS apps (there's [a list of compatible clients here](https://www.passwordstore.org/#other)). One pro for Pass though is that I like the pacing of pulling and pushing that Git offers. For example, the every-60-seconds synchronization that Syncthing offers feels a bit overkill for this use case. I'm only one person! I can only be at one machine at a time really. And I don't add or edit passwords that often.

## Conclusion

I've written this out both in the hopes of gaining feedback from readers but also to work through some of these options for myself. I think Plan B is the best-- and I know others use it. I've also come up with a few other crazy plans involving BASH scripts that encrypt KeePass databases using the `gpg` CLI before either syncing with Syncthing or pushing to Github, but I won't waste our time writing them out unless it comes to that.

So, some lingering questions, with a focus mostly on Plan B, which is the front runner in my mind:

1. Is a KeePass database encrypted well enough to survive being intercepted somehow, even if the key file isn't intercepted? Or should I endeavor to put more encryption on it? Should that be PGP/GPG before it syncs, or should I rely on the synchronizing software to do some encryption (as SpiderOak promises it does)?
2. How important is having access to my passwords on my iPhone or other computers? 
3. Assuming KeePassXC is the best password manager for me, is there a synchronization solution that suits me better than Syncthing that I just don't know about or haven't explored thoroughly enough?
4. Are the benefits of using open source software strong enough to outweigh the well-paid security teams of companies like 1Password, LastPass, Dropbox, and Spideroak? In a way open source is all fun and games when we're talking about text editors and web browsers and even social networks (what up, Mastodon); but my passwords hold the key to very important financial and work-related data. I understand the advantages of open source when it comes to security-- it's just a bit of a "put your money where your mouth is" moment here.
5. Did I totally just partially undermine the security of this plan by writing it out here in public? (jk, I'm trying to get some eyeballs to catch mistakes! Open source!)


