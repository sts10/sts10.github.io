---
layout: post
title: "Fishing in an Abyss: Building a Password Cracker in Rust"
date: 2018-05-16 19:28:50 -0400
comments: true
publish: false
---

Ahead of this year's World Password Day, 1Password -- maker of password management software -- announced [a password cracking challenge](https://blog.agilebits.com/2018/04/26/how-strong-should-your-master-password-be-for-world-password-day-wed-like-to-know/). The company ostensibly wanted to find out how hard it would be to crack a three-word passphrase master password on one of their vaults, given that the derived hash of the passphrase was exposed.

## Wait, What? 

First of all, the 1Password blog post explaining the challenge does a pretty good job at explaining what the challenge is all about. But we can step back for a minute and ask "how are passwords stored?" For example, how does Amazon (or 1Password) store my password?

They are NOT just stored in plain text. 

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/8ZtInClXe1Q" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
