---
layout: post
title: "Trying a new permissive software license"
date: 2023-01-25 23:00:00 -0400
comments: true
---

I've been thinking about software licenses this month for two reasons. First, I saw [this blog post](https://daniel.haxx.se/blog/2023/01/08/copyright-without-years/) from Daniel Stenberg, who created [curl](https://github.com/curl/curl), about whether developers really have to update the years in their copies of software licenses. He concludes "I don’t think we risk much by" removing the years from most of curl's license-related files, and thus, on January 3rd, Stenberg [removed the years on almost all of the relevant curl project files](https://github.com/curl/curl/commit/2bc1d775f510196154283374284f98d3eae03544). Interesting!

And second: for the first time ever, [one of my open source Rust projects, Tidy,](https://github.com/sts10/tidy) passed 25 stars on Github. Woohoo! Now that one of my projects was gaining a modicum of popularity, I wondered if I was satisfied with [its license](https://github.com/sts10/tidy/blob/main/LICENSE), which is the MIT License. I also have an at-this-point-private repo that I would make public if I was assured it wouldn't be used for illegal hacking...

[The MIT License](https://en.wikipedia.org/wiki/MIT_License) is known as a "permissive" license, meaning that users and other would-be contributors have lots of permission about what they can do with the project's code. This is the license I was slapping on most of my projects between 2014 and 2021-ish, mostly on recommendation from the Flatiron School instructors.

(Before I continue, for those who do not know, I am NOT a lawyer. And this post is not intended to be an overview of all open software licenses out there.)

## Permissive vs. Copyleft

In my mind, the other strongest contender that I would hypothetically switch to would be [GNU General Public License](https://www.gnu.org/licenses/gpl-3.0.en.html) or GNU AGPL (probably version 3), which are known as "strong copyleft" licenses. As [GitHub's "Choose a License" project](https://choosealicense.com/) summarizes:

> Permissions of this strong copyleft license are conditioned on making available complete source code of licensed works and modifications, which include larger works using a licensed work, under the same license.

During my research, I found a nonprofit called [Blue Oak Council](https://blueoakcouncil.org/), whose website explains software licensing in the most clear language I've seen so far. For example, [here is their comparison, broadly, of the two main categories of software licenses: permissive and copyleft](https://blueoakcouncil.org/copyleft):

> _Permissive_ licenses give everyone the right to do nearly anything with software, for free. That includes building new software that’s made available under different, commercial license terms, rather than open terms, or that’s kept secret within an organization.

> _Copyleft_ licenses work like permissive licenses with a catch: they require sharing and licensing the source code for new software built with copyleft-licensed software as open software, too. For this reason, copyleft licenses are sometimes called “share-alike” licenses, though “copyleft” is the term you’ll hear most in software.

(Blue Oak Council also has [a long "primer" on open software licenses](https://blueoakcouncil.org/primer).)

To be more blunt, paraphrasing ["Choose a License,"](https://choosealicense.com/) if you want a simple license that lets people do almost anything they want with your work, go with MIT. If you want people to be able to do whatever they want, but have those changes remain public, go with GNU GPL v3.

### I still think using Copyleft is good

In general, [my early free software training](https://sts10.github.io/2018/01/06/switching-to-linux.html) from books like [Gabriella Coleman's _Coding Freedom_](https://www.amazon.com/Coding-Freedom-Ethics-Aesthetics-Hacking-ebook/dp/B009PD9LA8/ref=sr_1_fkmr0_1?ie=UTF8&qid=1547610006&sr=8-1-fkmr0&keywords=coleman+ethics+code+gabriella) and _Two Bits: The Cultural Significance of Free Software_ by Chris Kelty tells me I should always prefer to use copyleft licenses, since they keep software free and open, a universal good thing in the eyes of some. And I'm not disagreeing with that here. 

But from what I've seen in the world of software licenses, there seems to be more movement and innovation on the permissive side of the spectrum, as opposed to on the copyleft side, where GPL v3 and AGPL v3 and the other GPL licenses still reign. And thus I generally was exploring permissive license when writing this post.

## What other licenses are out there?

The MIT License -- the only permissive license I had ever used personally -- is from the 1980s. While I still think the MIT License is a fine choice, I figured there must be some new licenses with interesting ideas and protections.

<!-- Coming into this informal study, I knew about MIT, GPL, and AGPL. --> 

I'd heard of [Apache 2.0 License](https://apache.org/licenses/LICENSE-2.0), a permissive license, notable because the Rust programming language [is dual-licensed under it and MIT](https://github.com/rust-lang/rust#license); and [Mozilla Public License](https://www.mozilla.org/en-US/MPL/), a "weak" copyleft license that I've always meant to understand better...

But I hadn't really ever sat down and surveyed the world of software licenses. Below is a grab-bag list of licenses I was either reminded of or found in my research (by no means comprehensive!).

* There's a family of licenses called [BSD licenses](https://en.wikipedia.org/wiki/BSD_licenses) that I've seen used on projects, including [age encryption](https://github.com/FiloSottile/age). I don't know much about them!
* [The Unlicense](https://unlicense.org/) seems to seek to be a super permissive license. I know of [a prominent developer in the Rust community who uses and supports the Unlicense](https://github.com/BurntSushi/notes/blob/master/2020-10-29_licensing-and-copyleft.md).
* [Creative Commons](https://creativecommons.org/choose/) offers a family of licenses, but as I understand it they are not meant for software.

### Stranger licenses
* The [JSON License](https://www.json.org/license.html) has the fun and likely legally murky clause: "The Software shall be used for Good, not Evil."
* Microsoft(!) has a license called the [Microsoft Public License](https://choosealicense.com/licenses/ms-pl/).

### Other lists of licenses
* Open Source Initiative has [a list of "approved" licenses](https://opensource.org/licenses/category).
* Here's a list of [ethical licenses](https://ethicalsource.dev/licenses/), which includes [the Hippocratic License](https://firstdonoharm.dev/).
* GitHub's "Choose a License" site has [an "Appendix" page that lists about two dozens licenses in a convenient chart form](https://choosealicense.com/appendix/).
* Fossa.com has a list of [the "Top 6 Out-There Open Source Licenses"](https://fossa.com/blog/top-6-most-out-there-open-source-licenses/), which I appreciate!

## Which licenses does the Blue Oak Council like?
Ever helpful, the Blue Oak Council website has [a list of permissive licenses, which they rated from Gold to Lead](https://blueoakcouncil.org/list), including a few I listed above. 

Among established licenses, [they like](https://blueoakcouncil.org/list#gold) BSD-2-Clause Plus Patent License (also known as BSD-2-Clause-Patent). I also got the sense that Apache License 2.0 was well-liked by them.

But in their survey, the Council decided to write their own license, which they named the [Blue Oak Model License 1.0.0](https://blueoakcouncil.org/license/1.0.0).

Let's take a look at that one.

## The Blue Oak Model License, a permissive license published in 2019

As Blue Oak Council [notes](https://blueoakcouncil.org/license-faq):
> The Council didn't set out to write a model license. While preparing the first version of the permissive license list, members ended up trading notes about the features of a good permissive license they were using to judge existing terms. No existing license boasted all of those features. Rather than simply list them out, the Council found it easier just to write out a new, model license showing what's possible.

What's good about the Blue Oak Model License 1.0.0? The project creators [explained their reasoning in a post](https://blueoakcouncil.org/2019/03/06/model.html). Some notes from my non-legal mind:

* To me it seems like the authors were concerned about how, with most existing permissive licenses, ["patent owners [may be able to] sue users and distributors of open software."](https://blueoakcouncil.org/primer#patent) I _think_ the worry that the Blue Oak Model License authors are attempting to squash here is that if software user A files a patent that involves the software, user B might be in legal trouble.
* Their license also clearly states that "No contributor can revoke this license," which I presume is (or may be) an issue with licenses that don't explicitly state this. 
* And of course, there's a "No Liability" section to protect me from the consequences, especially the projects that COULD, theoretically, be used for illegal activities.

All good, smart ideas, as far as I can tell.

## Finding more new-to-me licenses

I found more licenses by the executive director of the Blue Oak Council, Kyle Mitchell, listed in [one of his blog posts](https://writing.kemitchell.com/2021/06/20/License-Round-Up). As you'd expect, Blue Oak Model License is listed, but there are many other interesting ones. I made note of the [Big Time Public License](https://bigtimelicense.com/versions/2.0.1) and [the Prosperity License](https://prosperitylicense.com/) in particular.

## Obligatory note on license compatibility

One potential issue with using a new or just less-than-popular license is that, even if the license you choose is pretty permissive, it may not legally jibe well with the licenses of other software that developers may use in tandem with your code in their project. This is a big point in favor of sticking with the older, much more common licenses like MIT or Apache. But to me that is just not as fun as finding and using the hot new thing.

For what it's worth, [the Blue Oak Model License authors address this](https://blueoakcouncil.org/license-faq):

> The Council doesn't see any reason why software licensed under the Blue Oak Model License 1.0.0 can’t be used, combined, and distributed with software under GPLv2, LGPLv2.1, GPLv3, LGPLv3, or AGPLv3.

> Some have argued that GPLv2 and Apache 2.0 are incompatible, because if a patent claim was brought against the software, Apache 2.0’s patent grant would terminate, leaving the recipient with fewer rights than required by GPLv2. Without commenting on the accuracy of this analysis, the Council notes that the Blue Oak Model License doesn't have patent termination, so this hypothetical conflict cannot occur between the Model License and the GPL.

which is reassuring!

## Other reasonable advice: Stick with your community's license

GitHub's Choose a License website reminds developers [to consider what licenses your related projects use when selecting a license](https://choosealicense.com/community/), which seems like solid advice. For example, it notes that "Rust crates are overwhelmingly licensed under both MIT and Apache License 2.0." This is part of the reason I initially chose MIT for Tidy and most of my other Rust projects (though in hindsight I could have dual-licensed with MIT and Apache v2). It's also the reason [I chose the BSD-3-Clause license for a project of mine that works with and depends on age file encryption](https://github.com/sts10/bottle).

## Changing the license of an existing project

Can a developer change the license of an existing project? Mitchell [addresses that question specifically in a more recent post](https://writing.kemitchell.com/2022/03/07/Switching-Open-Software-Terms). I won't attempt to summarize, but it sounds like a "Yes, with these notes" on things like "license revocation."

I _think_ the risk one takes in straight up "revoking" an existing license and plopping a new one into your code repository is that you theoretically could be sued by past contributors to the project. Thus, I think for my projects to which I am the sole contributor (hopefully not counting [GitHub's Dependabot](https://docs.github.com/en/code-security/dependabot/dependabot-security-updates/configuring-dependabot-security-updates)?!), I could just switch to Blue Oak or GPL v3 or whatever I want, whenever I want since I'd only be violating my own rights (and I won't sue myself). 

### A more real-world example 

What about a project that already has a number of contributors?

A Fedi friend pointed me to [an open-source project that is currently in the process of changing its license from from GPL 2.0 to BSD-3-Clause](https://github.com/10up/wp_mock/issues/198). This "process" appears to be being organized as a GitHub issue, in which a contributor states the reasons for the proposed change. They then write "Since this change would affect past contributors, I need to ask for their agreement. I will ping them below in case they'd like to discuss this" and tag about two dozen fellow GitHub users (presumably all other contributors to the project). 

This makes sense to me, but one question I _still_ have about this situation is: let's say you get all past contributors to agree to a license change. I'm assuming what they're effectively agreeing to is something like "Are you OK with future versions of this project, which will include your past contributions, to be licensed in this new way?" My question is: Can future versions of the project be solely available under the new license (BSD-3 in this case), or will they have to be dual licensed? Or is that what this Github issue is seeking to prevent by getting buy-in from past contributors? Lastly, will _older_ versions of the project still be available under the previous license (assuming yes)? 

## Slapping the Blue Oak Model License on a few of my projects that did not have an explicit license specified

I did find a few of my public Github repositories that did not have a license on them at all, which feels like a loophole when worrying about whether you can _change_ the license of a project. These included:
* [the repo for my personal website](https://github.com/sts10/samschlinkert_com)
* [a homophones scraper](https://github.com/sts10/homophones) 
* [a little passphrase guesser](https://github.com/sts10/passphrase-guesser)
* command-line tic-tac-toe games in [Go](https://github.com/sts10/tic-tac-go), [Rust](https://github.com/sts10/rusty-tac), and [Zig](https://github.com/sts10/zig-zac-zoe)
* [a card-game scoring web app](https://github.com/sts10/contract_score_card)
* [two](https://github.com/sts10/switch) JavaScript [games](https://github.com/sts10/strike-9) I wrote years ago
* [An exploration of Lemire's nearly divisionless random using Rust](https://github.com/sts10/lemire_nearly_divisionless_random)

Since none of these had licenses as of a few hours ago, I figured they'd be excellent candidates for me to (safely) use the Blue Oak Model License 1.0.0. So I did it! Neat!

### What about Tidy's license?

Hey, remember by 25-star project, Tidy?

After all of this research, I've found myself a bit slower to change the license on my most popular project, Tidy. I want to be sure I'm doing things more by-the-book with what is likely my most-used project (not counting [my Vim colorscheme](https://github.com/sts10/vim-pink-moon)).

Plus, Tidy _just_ got its [first contribution by a human other than me just this past weekend](https://github.com/sts10/tidy/commits?author=bugaevc&since=2023-01-01&until=2023-01-27), while licensed under MIT! Thankfully, I interact with this contributor on Mastodon often, so I could get in contact with him, but I'm not even sure how to get his legal permission to change the license of his contribution retroactively. I think I could add something called a [contributor license agreement](https://en.wikipedia.org/wiki/Contributor_License_Agreement) to the project, but I'm guessing that would only apply to future contributions? 

As usual, feel free to [mention or DM me on Mastodon](https://hachyderm.io/@schlink) if you know of a license you like, or spotted an error in this post.

## Epilogue: Some movement on the copyleft side?

I wrote above that there doesn't seem to be much innovation in the copyleft space. (I think this is because license compatibility between 2 different copyleft licenses is usually a gnarly mess.) It seems I may have been wrong!

Another Fediverse friend points me to a copyleft license (confusingly) called [copyleft-next](http://next.copyleft.org/) ([GitHub repo where they take contributions](https://github.com/copyleft-next/copyleft-next)). The creators [describe it](https://github.com/copyleft-next/copyleft-next#copyleft-next) as "a new, post-post-modern, non-weak copyleft license inspired by, though different from, the GNU GPL." It was apparently first published in 2012, but it seems to be on the cusp of a "re-launch". 

Here's [a recent article about one of the people behind it](https://lwn.net/Articles/926788/) that provides some great and useful historical context on software and software licensing that  I won't try to quote here. Instead, the exciting news about the near future:

> Kuhn has decided to help relaunch the [copyleft-next](http://next.copyleft.org/) project that was [started by Richard Fontana](https://lwn.net/Articles/505589/) a little over ten years ago. The project is going to try to write a copyleft license in an open and transparent way; "write a free-software license the way we write free software". That is really how it should be done. 

I'm rooting for the project, but I will say I don't love the name!

Semi-relatedly, [developer Drew DeVault has written a blog post](https://drewdevault.com/2023/04/11/2023-04-11-The-FSF-is-dying.html) criticizing the Free Software Foundation.

> The GPL family of licenses are essential for our movement, but few people understand its dense and esoteric language, despite the 16,000-word FAQ which supplements it. And hip new software isn’t using copyleft: over 1 million npm packages use a permissive license while fewer than 20,000 use the GPL; cargo sports a half-million permissive packages and another 20,000 or so GPL’d.

He also explicitly calls for the creation of new copyleft licenses: 

> **Develop new copyleft licenses.** The GPL family of licenses has served us well, but we need to do better. The best copyleft license today is the [MPL](https://www.mozilla.org/en-US/MPL/), whose terse form and accessible language outperforms the GPL in many respects. However, it does not provide a comprehensive answer to the needs of copyleft, and new licenses are required to fill other niches in the market...

Partially on DeVault's recommendation, I looked a bit more into the Mozilla Public License 2.0 and it seems really intuitive. It seems like it applies copyleft restrictions by _file_ rather than the entire project.
