---
layout: post
title: "Performative Privacy"
date: 2023-01-25 17:00:00 -0400
comments: true
---

I read _Privacy at the Margins_ by Scott Skinner-Thompson a few weeks ago. One idea from the book has been bouncing around my head ever since: performative privacy. 

I think this passage, from pages 56 and 57) summarizes it best:

> Individuals' efforts to maintain privacy, anonymity, or obscurity while simultaneously engaged in public activity ought to be understood as performative, expressive acts -- expressions that may often be protected directly by the Free Speech Clause of the First Amendment. Certainly, as outlined at the outset of this chapter, maintaining anonymity while in public by wearing a hoodie or using internet obfuscation technology instrumentally aids one's freedom of thought, movement and association without being identified by public surveillance. But it is more than that. As government, corporate, and individual surveillance of both out physical and cyber activities becomes ubiquitous, efforts taken to shield activities from surveillance are not always just a means to an end -- a means to effectuate other constitutional values. Instead, they are often a direct statement of resistance to the pervasive surveillance society. In such instances, they are entitled to First Amendment protections from government infringement...
> Put differently, the notion of performativity as applied to privacy can help expose the extent to which individuals are subject of surveillance structures, and simultaneously reveals methods for maintaining democratic agency and points of resistance within those surveillance networks. That is to say "performative privacy" helps us understand the scope of privacy problems and identify potential solutions.

Sometimes, when I'm playing around with [age encryption](https://sts10.github.io/2021/09/06/exploring-age-1-point-0.html) or trying to figure out the best key derivation function for my KeePass database (Argon2id!), I feel a bit like I'm cosplaying, or prepping for some fantastic cyberpunk dystopia. Do I, a white, cis man living in Manhattan (who is not currently employed as a journalist) really need to encrypt family photos before uploading them to DropBox? 

Traditionally, I'd refute this as I would the "nothing to hide" argument: We want to live in a society where people have private thoughts and can keep them private. But maybe there's more here.

## Using Signal for grocery lists

To expand a bit further, this also reminds me of the idea of "If everyone uses [privacy measure], it will look less suspicious for those who really need to use [said privacy measure]." Use envelopes instead of postcards! I have thought of this as a reason for using Signal for sharing grocery lists. We should take privacy steps early, when we're boring and/or privileged enough to likely not be the subject of intense surveillance, so that we and others have access and knowledge of such methods when we need them. But I think Skinner-Thompson is adding something still new here.

For Skinner-Thompson, taking privacy (or security) measures is a form of _expression_. Indeed, Skinner-Thompson takes this far enough that he argues that privacy rights should rely not on the Fourth Amendment but on the First!

> ...depending on the context in which they arise, many of the acts of performative privacy discussed in Chapter 2 may be construed as expressive, political conduct entitled to First Amendment coverage and protection. In the context of the living history of state-sanctioned violence against black bodies, wearing a hoodie can be an attempt to maintain public anonymity and a statement of resistance against a surveilling, violent state.

and later:

> ... once conceptualized as acts of performative, expressive resistance, attempts to maintain privacy in public against government surveillance may fare better under the First Amendment's protections for expressive conduct than under traditional Fourth Amendment privacy protections, which have been severely hamstrung by doctrines such as the third-party doctrine. (95)

## A note on metadata

Interestingly, both of the privacy-increasing measures that Skinner-Thompson cites give off metadata that the measures are being taken: Even if they can't see the hoodie-wearers face, everyone can see that _someone_ there on the street or at a protest is wearing a hoodie, and ISPs can tell when users are connected to Tor nodes (but not what they're looking at). "Better" privacy tools seek to further obscure such metadata, [which can be as valuable to surveillers as the actual data itself](https://abcnews.go.com/blogs/headlines/2014/05/ex-nsa-chief-we-kill-people-based-on-metadata). Putting aside the more technical/theoretical question of whether it's even possible to not generate _any_ metadata describing a data transfer, I wonder if this lack of expressive metadata would undercut Skinner-Thompson's idea of privacy-measures-as-expressive. Though I suppose the boring and privileged can always blog about using Signal and Tor and have the apps on their phones!

