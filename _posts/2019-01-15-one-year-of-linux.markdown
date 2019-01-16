---
layout: post
title: "One Year of Running Linux"
date: 2019-01-15 22:15:00 -0400
comments: true
---

In his last column of 2018, New York Times tech writer Farhad Manjoo offered [some advice on "how to survive the next era of tech": "Slow down and be mindful."](https://www.nytimes.com/2018/11/28/technology/how-to-survive-the-next-era-of-tech-slow-down-and-be-mindful.html) 

While five years ago, Manjoo writes, "technology felt thrilling and world-changing," it also felt confusing. Back then, "it was easy to get lost in the hype. It was also easy to pick the wrong horse." Now, however, Manjoo observes that tech, in general, works better, but also that "the tech industry in 2018 is far more consequential than it was in 2014."

Manjoo then offers three maxims for "an ethical and upstanding user of tech, navigate this misbegotten industry": "Don't just look at the product. Look at the business model," "Avoid feeding the giants," and "Adopt late. Slow down." 

I think those are all worthy resolutions for users of technology (nearly everyone with access to the internet) to carry into 2019. But one thing that stuck out for me about a column that primarily addresses tech business models is that there's no mention of free or open source software, software licensing, or Linux. I think this is more a failure of the free software movement to make in-roads in what I'll call "mainstream tech," but nevertheless the omission made me a bit sad for both parties.

## Free software

In this context, "free" software doesn't just mean software that you can get for $0 ("free as in beer"). Free software, or libre software, according to [Wikipedia](https://en.wikipedia.org/wiki/Free_software), is: 

> ... computer software distributed under terms that allow users to run the software for any purpose as well as to study, change, and distribute it and any adapted versions. Free software is a matter of liberty, not price: user's individually or in cooperation with computer programmers are free to do what they want with their copies of a free software... regardless of how much is paid to obtain the program. Computer programs are deemed free insofar as they give users (not just the developer) ultimate control over the first, thereby allowing them to control what their devices are programmed to do.

The source code of any given piece of free software is public -- anyone can not only read it, but is free to run it and, if they choose, modify it. Developers donate their time and skills -- knowing full well they will not be compensated monetarily outside of the relatively rare donation -- to launch, develop, and make contributions to these software projects, improving them over time. If a significant amount of users do or don't want a certain new change, they are free to create and maintain rival versions, or "forks," of the software. The legal machinery for this system revolves around software licenses like the [GPL license](https://en.wikipedia.org/wiki/GNU_General_Public_License) or the [MIT license](https://en.wikipedia.org/wiki/MIT_License) (check out [Gabriella Coleman's _Coding Freedom_](https://www.amazon.com/Coding-Freedom-Ethics-Aesthetics-Hacking-ebook/dp/B009PD9LA8/ref=sr_1_fkmr0_1?ie=UTF8&qid=1547610006&sr=8-1-fkmr0&keywords=coleman+ethics+code+gabriella) for more).

What you (at least theoretically) end up with is software that effectively has no business model, or, if we must, runs on [a gift economy](https://en.wikipedia.org/wiki/Gift_economy). Only the larger projects (for example, operating systems) have formal monetary funding streams, which, as I understand it, are either run on donations from users or corporate sponsors, or run on profits from corporate customers. My chosen password manager, [KeePassXC](https://keepassxc.org/), has [a webpage on how to donate](https://keepassxc.org/donate/), which includes [a Patreon](https://www.patreon.com/keepassxc). 

Crucially, these funding schemes seem to have very little in common with the traditional venture capital system most of us our used to from places like Silicon Valley, in which money will have to be made at some point, one way or the other, sometimes at the cost of the user's privacy. 

About a year ago, with some of these ideas in mind, I set out on a personal challenge to use more free software. While I learned that I could switch from Google's Chrome to Mozilla's Firefox, from Microsoft Office to Libre Office, from Twitter to Mastodon even, I soon realized that to really jump into the world of free software, I'd have to ditch MacOS, a closed-source operating system owned by Apple, to an open operating system licensed as free software.

After a bit of research I decided Linux was at least worth a shot. I learned that, with Linux, I wouldn't be able to use Adobe applications like Light Room and Photoshop (which is, understandably, a show-stopper for some people), nor could I use Microsoft Office programs, or run iMessage or Airplay or most other Apple-made applications, not to mention access to the Apple Store and their Genius Bars (admittedly this could be a pro or a con, given your experience). 

But once I confirmed that I could watch Netflix, load GMail's site, listen to Spotify, write text, run code, open and edit a PowerPoint presentation in an application that's not PowerPoint, and use my password manager, I figured I could get the hang of the rest as I went along. (Aside: Making a list of what you use your non-work computer to do is an interesting exercise! Especially considering how much you can do in a browser (i.e. Slack) and/or on a smartphone.) 

(You can learn more about Linux from [this brief New York Times Tech Tip](https://www.nytimes.com/2018/01/04/technology/personaltech/taking-a-look-at-linux.html?smid=tw-nytimesbits&smtyp=cur&_r=0&pagewanted=all)!)

## Buying into Linux

So, after a lot of more research, in November of 2017 I ordered a laptop from a company based in Colorado called [System76](https://system76.com/), which sells computers built for running Linux. ([I wrote about all of this at the time.](https://sts10.github.io/2018/01/06/switching-to-linux.html)) System76 is not a "tech giant" by any means, in fact they actively contribute to and support free software that they of course know their users will use (to be fair, [most large tech companies encourage their employees to create and contribute to open source software](https://www.techrepublic.com/article/why-microsoft-and-google-are-now-leading-the-open-source-revolution/)).

I've been using my [Oryx Pro](https://system76.com/laptops/oryx) for about 15 months now, and overall I love it. I don't _think_ I'll be going back to Apple for a computer any time soon. That said, to use it, I've had to do things that most users of computers I know would balk at, like opening the terminal. (I'll note that I did have to ship my laptop back to System76 for a repair, but with my one-year warranty it was all free. And System76 offers a lifetime of _software_ support.) 

While Linux, which was created in 1991 by Linus Torvalds, has apparently made solid improvements for everyday users in the last few years, it is still a bit rough around the edges. As of the beginning of 2019, Linux is still not for everyone. But some folks are containing the work to change that, most notably the folks running a version of Linux (known as a "distribution" or "distro") called [Elementary OS](https://elementary.io/), which seems to be aimed more directly at replacing Mac and Windows for everyday computer users.

![screenshot of Elementary OS Juno 5](https://elementary.io/images/screenshots/desktop.jpg)

(I should note that I haven't tried Elementary OS yet; I've stuck with a different "distribution" called [Kubuntu](https://kubuntu.org/), which fits me well. There are many different distributions of Linux, most of which can be paired with a number of "desktop environments"... it gets nerdy real quick with this stuff. But tl;dr users get a ton of choices, which protects them further from the tyranny of one team of developers or one company. Crucially, switching isn't super hard-- for example, if I had to, I'm confident I could switch from Kubuntu to Elementary in a few hours. Most of these distributions take user privacy very seriously, and none of them are much like the "giants" Manjoo warns us of.

One night out at a bar with a friend, early on in my Linux experiment, I started breathlessly talking about how I'd made the switch and maybe preaching about how great it was. My friend finally got a question in: "Why should I switch?" In my mind I thought he was asking, essentially, "What's Linux's killer app?" or more basically, what can I do on Linux that I can't do on, say, MacOS?" 

I admit I was stumped. (There are some things Linux does better than MacOS, no philosophical sales pitch needed, but in my experience these are mostly things having to do with running and/or compiling code from source.) 

### What it's like to use Linux

If Linux has an underlying mantra, it's that, for better or worse, **you're** running your computer. You _can_ (and very well might) accidentally render your computer unusable (known as "bricking"). There's a bit of a learning curve. But this also means you're more free to make it work, look, and act the way you want. Want lots of updates? Use a "rolling" distro like Arch Linux. Have old hardware? You've got XFCE. There's [a whole subbreddit of users showing off their aesthetic tweaks](http://reddit.com/r/unixporn). As Tim Wu writes, [some technology should be a little demanding](https://www.newyorker.com/tech/annals-of-technology/the-problem-with-easy-technology). Once you get the hang of Linux, and you know which compatible apps you like, it _can be_ very smooth. 

I've also found a certain humility in the Linux community. Rarely is anything advertised as "it just works" -- there's no economic incentive for such claims. So when things aren't quite right, support is generally easy to find online -- without much defensive posturing as preamble -- and if something isn't right, there are places non-developers can post about it where it may get fixed.

That said, I'm not _quite_ ready to say Linux is for everyone.... though I should push myself, in the future, to enumerate the reasons more specifically. At this point it's mostly: Foreignness of the command line, loss of applications users rely on, and maybe some hardware compatibility.

## My top reason to use Linux, at this point

At this point, if forced to give one answer to the question of why some users should switch to Linux, it's that it allows you (or forces you) to be a more conscientious and ethical consumer of technology. As Manjoo writes, 

> But you don't have to wait for politicians to weigh in. Your choices as a consumer matter, too -- and for a better, healthier tech industry ... The lesson of the last decade is that our private tech choices can alter economies and societies. They matter. And they matter most in the mindless rush, when everyone seems to be jumping on board the latest new thing, because it's in these heady moments that we lose sight of the precise risks of turning ourselves over to tech.

Yes, it's an adjustment. Yes, it's not as smooth as MacOS. No, you can't use Photoshop. But it's fun to need to take a wrench to your computer every once in a while. Nobody asks to be buried with their iPad.
