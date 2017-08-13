+++
title= "A Brief, Accessible History of Cryptography"
date= "2015-09-20 21:21:06 -0400"
comments = "true"
+++

After reading [a history of Bell Labs](http://sts10.github.io/blog/2015/09/14/bell-labs-the-idea-factory/), I took a slight detour in my reading list. First, I read about half of [an introduction to information theory](http://www.amazon.com/Information-Theory-Introduction-James-Stone/dp/0956372856/ref=sr_1_1?ie=UTF8&qid=1442798583&sr=8-1&keywords=information+theory+tutorial), then sort of bailed when I got to calculating the information entropy of continuous variables and jumped to a lighter history of cryptography called [The Code Book: The Science of Secrecy from Ancient Egypt to Quantum Cryptography](http://www.amazon.com/Code-Book-Science-Secrecy-Cryptography/dp/0385495323/ref=sr_1_1?ie=UTF8&qid=1442798113&sr=8-1&keywords=code+book) by Simon Singh. 

<!-- more --> 

In a relatively-breezy 432 pages, Singh takes us from ancient Roman and Egyptian ciphers all the way to RSA/[PGP](http://sts10.github.io/blog/2015/07/01/my-basic-understanding-of-pgp-encryption/) and quantum cryptography. We get a brief lesson on how Linear B was deciphered, as well as a pretty in-depth explanation of what Turing and co. did at Bletchley Park with the Enigma machine during World War II. 

First of all Singh was good at giving just enough historical context to these code-making and code-breaking techniques to keep me interested-- the history of cryptography seems to be a war between code-makers and code-breakers. [Poor Mary Queen of Scots](https://en.wikipedia.org/wiki/Mary,_Queen_of_Scots#Trial)! But of course each stop of the historical school bus includes a well-balanced technical explanation of what made the new technique (making or breaking) work the way it did. 

This includes the revelation of public key encryption, and almost immediately afterward the mathematical system of encryption known as [RSA](https://en.wikipedia.org/wiki/RSA_(cryptosystem)). Singh explains that the engine that powers RSA encryption is two "one-way" mathematical functions, one involving the modulus operator and the other involving multiplying two prime numbers. A "one-way" mathematical function is one that is easy to do in one direction, but very difficult to do in the reverse direction. A common real-world example is mixing two colors of paint (see below).

I won't get into too many of the details-- I'm certainly no expert, I just read a book--, but I believe this book is super useful today, even if you're not interested in cryptography. It is essentially a chronicle of ideas thought to be perfect or unbreakable, only to be challenged and broken through unconventional thinking, usually by an outsider. 

When Singh would describe a new code-making technique, the Enigma for example, I found myself in awe of the design and having no idea how anyone would break it, until I read the next section. One interesting theory Singh puts forward is that code-breaking may require an intense sense of life-or-death urgency. His main example is the Polish code-breakers who, sandwiched between Russia and Nazi Germany, began to crack Enigma in the 1930s ([BBC](https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=1&cad=rja&uact=8&ved=0CB0QFjAAahUKEwj4z5iAgIfIAhWFVz4KHRNFD9s&url=http%3A%2F%2Fwww.bbc.co.uk%2Fnews%2Fmagazine-28167071&usg=AFQjCNGRGiVFkEeTt6lm4e4TJKXLPIKJwg&sig2=jO9ckhWFsKLFh2vGYtj30g), [some website](http://www.codesandciphers.org.uk/virtualbp/poles/poles.htm)) before Bletchley and Turing made their advances against the infamous German encryption system. 

Another fun story is how Whitfield Diffie and Martin Hellman thought up [asymmetric-key cryptography](https://en.wikipedia.org/wiki/Public-key_cryptography), known as [Diffie-Hellman key exchange](https://en.wikipedia.org/wiki/Diffie%E2%80%93Hellman_key_exchange). The problem for code-makers at that time (1970s) was that every system seemed to rely on two parties sharing a secret key before any communication could begin. If all of your communication to this other party is monitored, how can you convey a secret key to them? 

Singh relates one idea Diffie, Hellman, and Ralph Merkle tossed around before nailing the idea. Let's say "Alice" and "Bob" are trying to communicate by mail, but "Eve" is trying to eavesdrop, opening any mail she can. Alice could put a lock on a safe and mail it to Bob, but Bob wouldn't be able to open it without a key, which, if Alice sent by mail first, Eve could copy it. Huh. 

One idea is to have Alice put her lock on the box, mail it to Bob, then have Bob put _his_ lock on the box and mail it back to Alice. Then when Alice gets the box, she simply removes her lock with her key, and mails it back to Bob. At no point Eve can open the box when it's intercepted. 

There are a few more concepts needed to take us to the [Diffie-Hellman key exchange](https://en.wikipedia.org/wiki/Diffie%E2%80%93Hellman_key_exchange)-- including one involving paint described in the image below-- but I thought that mail one was damn clever. I think it's an example of the kind of outside-the-box thinking that can solve seemingly difficult problems. 

![paint colors as secret key exchange](https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Diffie-Hellman_Key_Exchange.svg/250px-Diffie-Hellman_Key_Exchange.svg.png)

This system of exchanging a secret enabled RSA encryption and PGP software, which I [wrote about previously](http://sts10.github.io/blog/2015/07/01/my-basic-understanding-of-pgp-encryption/). Briefly, it works because encrypting keys and decrypting keys are different (asymmetric), so we can make our encrypting key very public while keeping our decrypting key very private. 
