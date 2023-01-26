---
layout: post
title: "A new permissive software license to try?"
date: 2023-01-25 23:00:00 -0400
comments: true
---

I've been thinking about software licenses this month for two reasons. First, I saw [this blog post](https://daniel.haxx.se/blog/2023/01/08/copyright-without-years/) from Daniel Stenberg, who created [curl](https://github.com/curl/curl), about whether developers really have to update the years in their copies of software licenses. He concludes "I don’t think we risk much by" removing the years from most of curl's license-related files, and thus, on January 3rd, Stenberg [removed the years on almost all of the relevant curl project files](https://github.com/curl/curl/commit/2bc1d775f510196154283374284f98d3eae03544). Interesting!

And second: for the first time ever, [one of my open source Rust projects, Tidy,](https://github.com/sts10/tidy) passed 25 stars on Github. Woohoo! Now that one of my projects was gaining a modicum of popularity, I wondered if I was satisfied with [its license](https://github.com/sts10/tidy/blob/main/LICENSE), which is the MIT License. 

[The MIT License](https://en.wikipedia.org/wiki/MIT_License) is known as a "permissive" license, meaning that users and other would-be contributors have lots of permission about what they can do with the project's code. This is the license I was slapping on most of my projects between 2014 and 2021-ish, mostly on recommendation from the Flatiron School instructors.

(Before I continue, for those who do not know, I am NOT a lawyer.)

## Permissive vs. Copyleft

In my mind, the other strongest contender that I would hypothetically switch to would be [GNU General Public License](https://www.gnu.org/licenses/gpl-3.0.en.html) or GNU AGPL (probably version 3), which are known as "strong copyleft" licenses. As [GitHub's "Choose a License" project](https://choosealicense.com/) summarizes:

> Permissions of this strong copyleft license are conditioned on making available complete source code of licensed works and modifications, which include larger works using a licensed work, under the same license.

During my research, I found a nonprofit called [Blue Oak Council](https://blueoakcouncil.org/), whose website explains software licensing in the most clear language I've seen so far. For example, [here is their comparison, broadly, of the two main categories of software licenses: permissive and copyleft](https://blueoakcouncil.org/copyleft):

> _Permissive_ licenses give everyone the right to do nearly anything with software, for free. That includes building new software that’s made available under different, commercial license terms, rather than open terms, or that’s kept secret within an organization.

> _Copyleft_ licenses work like permissive licenses with a catch: they require sharing and licensing the source code for new software built with copyleft-licensed software as open software, too. For this reason, copyleft licenses are sometimes called “share-alike” licenses, though “copyleft” is the term you’ll hear most in software.

(Blue Oak Council also has [a long "primer" on open software licenses](https://blueoakcouncil.org/primer).)

To be more blunt, paraphrasing ["Choose a License,"](https://choosealicense.com/) if you want a simple license that lets people do almost anything they want with your work, go with MIT. If you want people to be able to do whatever they want, but have those changes remain public, go with GNU GPL v3.

## What's new?

So I knew about MIT, GPL, and AGPL. But the MIT License -- really the only permissive license I was familiar with -- is from the 1980s. While I still think the MIT License is a fine choice, I figured there must be some new licenses with interesting ideas and protections. 

## The Blue Oak Model License, a permissive license published in 2019

Ever helpful, the Blue Oak Council website has [a list of permissive licenses, which they rated from Gold to Lead](https://blueoakcouncil.org/list). Apparently during this process, the group of lawyers wrote their own permissive license that became [Blue Oak Model License 1.0.0](https://blueoakcouncil.org/license/1.0.0).

As Blue Oak Council [notes](https://blueoakcouncil.org/license-faq):
> The Council didn't set out to write a model license. While preparing the first version of the permissive license list, members ended up trading notes about the features of a good permissive license they were using to judge existing terms. No existing license boasted all of those features. Rather than simply list them out, the Council found it easier just to write out a new, model license showing what's possible.

What's good about the Blue Model License 1.0.0? The project creators [explained their reasoning in a post](https://blueoakcouncil.org/2019/03/06/model.html). To me it seems like the authors were concerned about how, with most existing permissive licenses, ["patent owners [may be able to] sue users and distributors of open software."](https://blueoakcouncil.org/primer#patent). I don't quite follow this legal concern completely, but these folks seem smart, so I'm almost ready to take them at their word and try this license for my next open code project.

## Finding more new-to-me licenses

I found more licenses by the executive director of the Blue Oak Council, Kyle Mitchell, listed in [one of his blog posts](https://writing.kemitchell.com/2021/06/20/License-Round-Up). As you'd expect Blue Oak Model License is listed, but there are many other interesting ones. I made note of the [Big Time Public License](https://bigtimelicense.com/versions/2.0.1) and [the Prosperity License](https://prosperitylicense.com/) in particular.

## Changing the license of an existing project

Can a developer change the license of an existing project? Mitchell [addresses that question specifically in a more recent post](https://writing.kemitchell.com/2022/03/07/Switching-Open-Software-Terms). I won't attempt to summarize, but it sounds like a "Yes, with these notes" on things like "license revocation."

I _think_ the risk one takes in straight up "revoking" an existing license and plopping a new one into your code repository is that you theoretically could be sued by past contributors to the project. Thus, I think for my projects to which I am the sole contributor (hopefully not counting [GitHub's Dependabot](https://docs.github.com/en/code-security/dependabot/dependabot-security-updates/configuring-dependabot-security-updates)?!), I could just switch to Blue Oak or GPL v3 or whatever I want, whenever I want since I'd only be violating my own rights (and I won't sue myself). 

Unfortunately, Tidy _just_ got its [first contribution by a human other than me just this past weekend](https://github.com/sts10/tidy/commits?author=bugaevc&since=2023-01-01&until=2023-01-27)! Thankfully, I interact with this contributor on Mastodon often, so I could get in contact with him, but I'm not even sure how to get his legal permission to change the license of his contribution retroactively. I think I could add something called a [contributor license agreement](https://en.wikipedia.org/wiki/Contributor_License_Agreement) to the project, but I'm guessing that would only apply to future contributions? Also, I'm not decided whether I want to move away from MIT -- Blue Oak is cool, but I think this is one of those things that is fine to move slow on.

[Mention or DM me on Mastodon](https://hachyderm.io/@schlink) if you have suggestions. 
