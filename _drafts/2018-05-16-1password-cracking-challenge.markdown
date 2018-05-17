---
layout: post
title: "Fishing in an Abyss: Building a Password Cracker in Rust"
date: 2018-05-16 19:28:50 -0400
comments: true
---

Ahead of this year's World Password Day, 1Password -- maker of password management software -- announced [a password cracking challenge](https://blog.agilebits.com/2018/04/26/how-strong-should-your-master-password-be-for-world-password-day-wed-like-to-know/). The company ostensibly wanted to find out how hard it would be to crack a three-word passphrase master password on one of their vaults, given that the derived hash of the passphrase was exposed.

## Wait, What? 

First of all, the 1Password blog post explaining the challenge does a pretty good job at explaining what the challenge is all about. But we can step back for a minute and ask "how are passwords stored?" For example, how does Amazon (or 1Password) store my password?

They are NOT just stored in plain text. [This video](https://www.youtube.com/watch?v=8ZtInClXe1Q) does a good job of explaining why, but basically it's because if someone gets their hands on that database, they'll have every user's username and password right there. 

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/8ZtInClXe1Q" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

Vaguely, generally, from a non-expert, the best way to store passwords (as a website) is to _hash_ and _salt_ the passwords. To hand-wave over that, let's stick to "hashing". Hashing, I've only recently learned, basically means you run the password through a one-way mathematical function. Wikipedia defines [one-way mathematical function](https://en.wikipedia.org/wiki/One-way_function) thusly:

> In computer science, a one-way function is a function that is easy to compute on every input, but hard to invert given the image of a random input. Here, "easy" and "hard" are to be understood in the sense of computational complexity theory, specifically the theory of polynomial time problems. Not being one-to-one is not considered sufficient of a function for it to be called one-way.

An example of a (apparently devent) one-way function is [multiplying to very large prime numbers](https://en.wikipedia.org/wiki/One-way_function#Multiplication_and_factoring). Multiplying two numbers isn't hard (even if they're huge), but if I gave you a huge number and said "guess the two prime numbers that I multiplied together to make this number" you'd be forced to do a lot of factoring to get the answer.
