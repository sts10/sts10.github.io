+++
title= "Software Updating As Ritual"
date= "2016-01-30 12:39:02 -0500"
comments = "true"
+++

A few weeks ago I read [a blog post](http://mirrorshades.net/post/132753032310) by [Bryan Horstmann-Allen](https://github.com/bdha) (h/t [Paul Ford](https://twitter.com/ftrain/status/671127035675353088)) about him getting frustrated with OS X. Here's how he framed his issue: 

>Around OS X 10.9, though, things started going wrong. 10.10 improved a few of these things, but overall it just kept degrading. It's slower, there are a lot of really distracting "features" I can't seem to actually reliably disable: It's tied into my phone, and my wife's phone, so when she adds events I get duplicate notifications (deliver once being a fallacy, I suppose), disrupting me from my work. I disable this, but...

>It harasses me every day to upgrade. It _desperately_ wants to just upgrade whenever it wants. More and more it acts like the Windows machines I've had to support over the last 20 years, which is deeply frustrating.

>It regularly does things in the background without asking, consuming all my bandwidth...

<!-- more --> 

Horstmann-Allen ended up switching to an alternative operating system called [FreeBSD](https://www.freebsd.org/), which he specifically praises for its simple installation and upgrading procedure: "The freebsd-update(8) tool just works. Sometimes it works so well I wonder if it actually did anything." 

At the time it felt a bit drastic to me-- to lose all that OS X offers only to avoid a sometimes-convenient integrated system and some pesky update messages. But I was also noticing frequent asks to be updated from both my iPhone's operating system and all the apps I have on it. At this point I have to remove music from my phone in order to make room for seemingly-unimportant updates to apps like Slack and Flixster, which I don't use often but probably involve a headache if I ever wanted to re-install after removing from my phone to get more free space.  

(Interestingly, just last week [Christine Teigen](https://twitter.com/chrissyteigen) aired a similar complaint.)

<blockquote class="twitter-tweet" lang="en"><p lang="en" dir="ltr">Hate this macbook relationship. &quot;When do you want to update?&quot; &quot;Later&quot; &quot;later today or later tomorrow?&quot; Oh my god just fucking LATER</p>&mdash; christine teigen (@chrissyteigen) <a href="https://twitter.com/chrissyteigen/status/690584538121015296">January 22, 2016</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

But it also reminded me of [my recent switch from Evernote to a involving multiple loosely-connected parts (one of which I coded myself) instead of one integrated piece of software](http://sts10.github.io/blog/2015/09/28/passing-notes/). When things get too big it's easy for that thing to get in your way. Convenience soon becomes a hassle, especially when users' needs differentiate (note that Horstmann-Allen's needs were extreme in their simplicity compared to the average OS X user, who likely didn't notice that nagging software updates until later). 

## Convergence and Divergence

I had these ideas floating in my mind when I read Nilay Patel [welcoming us to the divergence](http://www.theverge.com/2016/1/25/10828208/welcome-to-the-divergence-vinyl-turntables-film-cameras) on The Verge this week. He lays out the paired concepts of "convergence": when many technologies merge into one device (think the iPhone), and "divergence": "when experiences and devices that operate independently of a smartphone become more interesting than the phones themselves." His thesis is that the pendulum is swinging back to divergence from the "smartphone convergence."

>But there are little signs that the smartphone convergence might be over, and the pendulum might be swinging back a little. At CES this year Kodak introduced [a new film Super 8 camera](http://www.theverge.com/2016/1/5/10719012/kodaks-new-gadget-is-a-super-8-film-camera-and-it-kind-of-warms-my) that became the talk of the show; the other big introduction was [a revived Technics SL-1200 turntable](http://www.theverge.com/2016/1/6/10725560/technics-1200gae-turntable-hands-on-luxury-tank-ces-2016). Sony also [introduced a turntable](http://www.theverge.com/2016/1/5/10721108/sony-turntable-ces-2016-video-hi-res-audio) — as in, something designed to play phonograph records in 2016. Sony Electronics COO Mike Fasulo told me with a straight face that "vinyl is different, it's happening, it's new... it's a huge trend."

I have a turntable and a mirrorless camera each of which I love far more than my iPhone 6. I love them for their analog-ness, the ritual of putting on a record and playing music that has never been digitized into 1s and 0s. But the other reason I love these types of products is that they are parts of larger systems. 

We can talk about [the ritualistic-ness of playing a record](https://youtu.be/vmVaCbxkd34?t=57s) or developing film. But let's just start with systems build of small, independent, loosely-connected components that do one job well, of which I would argue a turntable + stereo is one.  

## Small, Independent, Loosely-Connected Components That Do One Job Well

My turntable, an [Audio Technica LP120](http://www.amazon.com/Audio-Technica-AT-LP120-USB-Direct-Drive-Professional-Turntable/dp/B002S1CJ2Q/ref=sr_1_1?ie=UTF8&qid=1454167884&sr=8-1&keywords=audio+technica+at+lp120+usb), connects to a stereo integrated amplifier (an [NAD C 320BEE](http://nadelectronics.com/products/hifi-amplifiers/C-320BEE-Stereo-Integrated-Amplifier))-- which could be split into a separate pre-amplifier and amplifer by the way. My NAD is connected to a pair of [Klipsch speakers](http://www.amazon.com/gp/product/B003XRD9UA?psc=1&redirect=true&ref_=oh_aui_detailpage_o04_s00). I can also connect an iPhone to the amplifier via a cheap, non-proprietary audio cable. Each component does its single job well, and plays wells with a variety of other components I could switch in whenever I choose, including ones that are being designed as I write this. When someone brings over a record pressed in England in 1974, I put it on the platter, select one of three speeds, and it comes through the speakers. No software updates or iTunes passwords. 

The antithesis here is something like Sonos-- total integration and convergence, from the music source to the proprietary cables and speakers. That is what my dad opted for, wiring the Sonos system through ever room in their new empty-nest home. Sure, there are benefits here, but I still am often unable to get music to play in that house.

Another, more digital example: My main text and code editor, [Neovim](https://github.com/neovim/neovim), is an open-source project that's very regularly updated to Github. It's also able to be easily [installed and updated through Homebrew](https://github.com/neovim/homebrew-neovim/blob/master/README.md). That means I can upgrade to the latest developer version-- bleeding edge! -- by running a single command (`brew reinstall --HEAD neovim`) which completely reinstalls the program. It never nags me, but there's (almost) always a shiny new version available if I feel like being on the cutting edge. 

While it is a vital component in my "coding system" (which includes other software like Google Chrome, Git, Ruby, RVM, etc.), it is a component so interchangable that I have at least three other text editors I could use to edit code while Neovim updates (which takes about 5 minutes and requires no restart), two of which share the [same exact configuration files](https://github.com/sts10/terminal_and_vim_settings/blob/master/vimrc) as Neovim ([text preferences FTW](https://medium.com/@sts10/why-i-want-text-file-preferences-for-every-application-i-use-72c368f9b6fd#.dyvblrzaw)). 

We're balancing convenience, integration, upgrade-ability, and ritual-ness (which includes any preference for "analog-ness" or "digital-ness"). But also (backwards-)compatibility and portability. 

## Why Focus on Updating?

Updates, both of software and of hardware, are necessary to these systems, whether as an offer to (or in some cases, nagging ask for) users to improve their current version or to adapt to some outside change (compatibility with a new technology, a response to a new security threat, etc.). Thus I think updates, and the ease of updating, offer an interesting view of how these system measure up against each other. (Granted, some technologies really never need to be updated [a hammer, a table, a knife, even my refrigerator], but not everything we use is so stable.)

Let's get to an example. Software updates, if your software is sufficiently small, shouldn't derail your workflow. If, hypothetically, Audio Technica notified me that I could freely and instantly upgrade my LP120 to the latest version (LP121.3.4, say), I would hypothetically be more inclined to run it compared to a Sonos update. The reasons are multiple. 

## The (Possible) Pains of Updating, And How Divergent Systems Handle Them Better Than Converged Systems

What are the hassles or problems associated with updating anything? For one, in accepting (and running) a given update I run the short-term risk/hassle that a large part of my system goes down temporarily. But secondly there's the longer-term issue of whether this update is going to move the product closer to or further away from my use and needs, i.e. a feature I rely on will be changed or even completely removed in such a way that prevents or hinders me from using the product as I wish. 

In my mind Teigen complained of problem #1, while Horstmann-Allen was more concerned about problem #2. 

(Of course I'll never get the option to update the software on my particular turntable because it has no software-- that's part of the advantage it has over the other options we're discussing. But (a) they may come likely come out with a new physical piece of hardware called the LP130, and (b) that LP130 may have software in it.)

In both cases, divergent systems comprised of small, dedicated components hold an advantage. Since you only have small, independent parts, updating these individual components is relatively low-risk and painless. The maintainers of these smaller components know they have to work with other components, usually made by different companies, so they are less likely to undertake large changes in how they operate via an update.

Regarding the second problem, I have what I think is a slightly more interesting idea. We have to assume that a very high percentage of LP120 owners use the device to play records. (Compare that to the insanely varied use-cases of something like an iPhone or OS X 10.10.) The user makes the peculiarities of her use-case clear in the way she sets up her unique system-- for example I might want to play my records louder than another user, so I have a different needle, amplifier, and speakers, but we can both attach those components (including the needle) to LP120s. 

Plus if a component does diverge from your use-case, you can easily switch it out for a competing product that more closely aligns with your needs.

Compare this to the power that the lead product manager of Sonos or iTunes or Spotify have over the user experience. Theoretically, iTunes could change from a music player to a video streaming product with one software update. 

## Some Lingering Questions

Are complaints about updating software symptoms of some kind of bloat-- canaries in the coal mine for the pendulum swinging back from convergence to divergence? 

What is the mirrored symptom? In other words, what starts the pendulum away from divergence?

### The Master Switch Cycle

Is there a cycle, a pendulum, that switches between divergence and convergence? How do convergent times and divergent times stack up to the cycle in the development of information technologies swinging between the "open" eras dominated by "tinkerers" and the "closed" periods dominated by big industry and capitalism described by Tim Wu in _The Master Switch_? A quick explanation of what I'm talking about from [my quick post on the book](http://sts10.github.io/blog/2015/07/15/master-switch-and-hackers/):

> Wu's main idea in the book is that information systems go through “a long 'cycle' whereby open information systems become consolidated and closed over time, reopening only after disruptive innovation” comes along again... Wu observes that these information technologies (telephone, radio, TV, internet) go through cycles of “open” (personified by low barrier to entry, amateurs fooling around for little pay, and spotty service and quality of product-- more of people pursuing “what could be”) and “closed” (large companies growing powerful, more money injected into an industry, a cleaning-up of standards [either by government regulations or large companies pushing out smaller competition]). 

My obvious guess would be that periods where a technology is "open" correlates with times of divergence, since (a) no one player is big enough to dominate the industry, let alone with one product, and (b) odds are no one knows exactly how this open technology will be used or should be used, and thus products will be unable to be converge multiple products into one pipeline without loosing a significant amount of users. Plus these tinkerers, almost by definition, enjoy switching out components and, in some cases, creating their own. After all, you could open and "hack" the first Macintosh computer. 

### Where does that leave "the ritual"?

We also have what seems to me a distinct notion of why turntables and film cameras are "coming back", which is that they are arguably less convenient to use than their newer, more digital alternatives. It seems to me that what you're buying with this loss of convenience is the sense of a ritual. Dictionary.com [defines](http://dictionary.reference.com/browse/ritual?s=t) "ritual" as "an established or prescribed procedure for a religious or other rite."

<blockquote class="twitter-tweet" lang="en"><p lang="en" dir="ltr"><a href="https://twitter.com/reckless">@reckless</a> My running theory is that they require more dedicated attention—an enjoyably mindful sort of engagement.</p>&mdash; David Yee (@tangentialism) <a href="https://twitter.com/tangentialism/status/686940062446125056">January 12, 2016</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

But where does the pleasure of ritual, of devices that "require more dedicated attention-- an enjoyably mindful sort of engagement," come from? For example, if I bought or created a physical robot-like thing that moved vinyl records out of their sleeves and onto my turntable, taking its orders, say, an iOS app on my phone, would that ruin the "ritual" of playing records? Does it need to involve something that is analog? Are there digital rituals, or must they be mostly/entirely an analog process?

I'm not sure about that, but I will say that running one command and re-installing Neovim has become a bit of an "established or prescribed procedure" for me. 

![Neovim re-installation process/ritual](http://i.imgur.com/zCPZIvM.gif)

<blockquote class="twitter-tweet" lang="en"><p lang="en" dir="ltr"><a href="https://twitter.com/reckless">@reckless</a> Ritual never goes out of fashion.</p>&mdash; David Yee (@tangentialism) <a href="https://twitter.com/tangentialism/status/686940173033148417">January 12, 2016</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>
