+++
title= "Messy Technology"
date= "2016-08-31 22:10:07 -0400"
comments = "true"
+++

In [_Master Switch_](https://sts10.github.io/blog/2015/07/15/master-switch-and-hackers/) I got in my head the book's central idea: that information technology goes through a certain Cycle. A refresher: 

> Basically Wu observes that these information technologies (telephone, radio, TV, internet) go through cycles of “open” (personified by low barrier to entry, amateurs fooling around for little pay, and spotty service and quality of product— more of people pursuing “what could be”) and “closed” (large companies growing powerful, more money injected into an industry, a cleaning-up of standards, either by government regulations or large companies pushing out smaller competition)

<!-- more -->

Ultimately we're left with the question: Assuming we're still in the "open" era of the internet, is the internet "special" enough to resist this "closing", or is it just like the previous tent poles technologies of information distribution, similarly subjected to this Cycle?  

As a "digital native," I think it's little surprise that my first reaction was that, yes! we are special. This thing, which feels participatory enough that I and others may feel a special sense of ownership, is different than TV and radio.

There seems to be a certain DIY-freedom baked into the bedrock technology of the internet, from the decentralized reality of packet-switching to the fact that anyone can write and deploy code to the internet, usually without any permission or license necessary. As [Paul Ford observes in an essay called "Reboot The World"](https://newrepublic.com/article/133889/reboot-world), despite the increasing tendency for the internet to become centralized, "The technology that let people make web sites never went away. You can still set up a site as if it were 1995." 

Not only can anyone write code that can be deployed to the internet, developers can easily publish their code for others to tweak and improve within systems like Github. And open source technologies are still competing and sometimes beating closed-code alternatives sold and maintained by private companies. How could large profit-hungry corporations, with their sidekick the Government, "ruin" the internet? 

Wu of course discusses one timely, foreboding challenge to the openness of the internet: the battle over net neutrality. Readers of the book are easily able to draw parallels to other tricks employed by actors attempting to "close" older information technologies, namely attacks on "common carriage", that amounted to attempts to put smaller players at disadvantages. But, for one, Wu describes the concept of "net neutrality" to be a principle "at the core of the Internet's design."

> The ideal of neutrality bespeaks a network that treats all it carries equally, indifferent to the nature of the content or the identity of the user. In the same spirit as the end-to-end principle, the neutrality principle holds that the big decisions concerning how to use the medium are best left to the “ends” of the network, not the carriers of information.

Plus, Wu, in his telling of the downfall of AOL, gives us this paragraph: 

> The principle of net neutrality, instilled by the Internet’s founders, is ultimately what wrecked AOL Time Warner. And that now iconic wreck, if nothing else, would attest powerfully to the claim that the Internet was at last the great exception, the slayer of the Cycle we have been visiting and revisiting... In short, to be viable, the firm would have needed to overturn the net neutrality principles at the core of the Internet’s design.

Which seems to show that the internet at least has some innate defenses against "common carriage" "attacks." 

As I remember, the book doesn't explore other vulnerabilities of the internet in the face of these attacks. So maybe we're all good? 

## Code, What is it?

My dad has a section of a bookshelf filled with dusty hardcovers written in 1990s about the capital-I Internet and technology. To a computer-literate know-it-all high schooler they already seemed comically outdated-- likely filled with citations of poorly-executed Harvard Business School studies of Microsoft and maybe MySpace. 

However after devouring a couple books about the internet, some of which written more than a decade ago ([Hackers](https://sts10.github.io/blog/2015/08/02/the-hacker-ethic/), [Wizards](https://sts10.github.io/blog/2015/08/04/where-wizards-stay-up-late/), [A History of Bell Labs](https://sts10.github.io/blog/2015/09/14/bell-labs-the-idea-factory/)), I gave the shelf another glance during a recent trip to my folks' place. One author's name caught my eye right away: Lawrence Lessig. Lessig, most recently a presidential candidate this year, is a law professor at Harvard and an outspoken advocate for campaign finance reform, among other issues. I knew of him mostly through his work with Aaron Swartz on [Creative Commons](https://en.wikipedia.org/wiki/Creative_Commons). 

The book, called _Code and Other Laws of Cyberspace_, was written in 1999, though Lessig published an updated second edition of the book in 2006 called [_Code: Version 2.0_](https://www.amazon.com/Code-Other-Laws-Cyberspace-Version/dp/0465039146/ref=sr_1_1?ie=UTF8&qid=1470604763&sr=8-1&keywords=lessig+code) (which is the edition I ended up reading on my Kindle, though it's also freely [available as a PDF](http://codev2.cc/download+remix/Lessig-Codev2.pdf)). Basically, it's an investigation of the question of whether the internet can be regulated, but it wanders into some other interesting territory too. 

I'm going to organize my writing about the book into what I think are the most interesting concepts Lessig explores in the book. 

## Regulating the Internet

First, to give you a taste, here's how he starts his thesis that the internet is indeed able to be regulated ("regulable"):

> If there was a meme that ruled talk about cyberspace, it was that cyberspace was a place that could not be regulated. That it “cannot be governed”; that its “nature” is to resist regulation. Not that cyberspace cannot be broken, or that government cannot shut it down. But if cyberspace exists, so first-generation thinking goes, government ’s power over behavior there is quite limited. In its essence, cyberspace is a space of no control.
> Nature. Essence. Innate. The way things are. This kind of rhetoric should raise suspicions in any context. It should especially raise suspicion here. If there is any place where nature has no rule, it is in cyberspace. If there is any place that is constructed, cyberspace is it. Yet the rhetoric of “essence” hides this constructedness. It misleads our intuitions in dangerous ways.
> This is the fallacy of “is-ism”—the mistake of confusing how something is with how it must be. There is certainly a way that cyberspace is. But how cyberspace is is not how cyberspace has to be. There is no single way that the Net has to be; no single architecture that defines the nature of the Net. The possible architectures of something that we would call “the Net” are many, and the character of life within those different architectures is diverse.

Lessig then discusses what regulation is more generally and what he describes as the four major tools of regulation: law, social norms, the market, and architecture (or code). These are the tools an entity (like the government) could use to change some behavior (of its citizens). For example if the government wanted to decrease the numbers of cigarette smokers, it might pass a law directly regulating cigarette advertising and/or the sale of cigarettes to minors (law), or it might tax cigarettes (market), or it might spend money on an ad campaign to change the social norms around smoking (social norms), or it may introduce areas where smoking is explicitly banned (law and architecture). 

This four-part theory is apparently "sometimes called the ['pathetic dot theory'](https://en.wikipedia.org/wiki/Pathetic_dot_theory), after the 'dot' that is constrained by these regulators."

![the pathetic dot](https://upload.wikimedia.org/wikipedia/commons/8/87/Pathetic_dot_theory.png)

Architecture was the strangest one for me. Wikipedia quotes Lessig explaining it as: "'features of the world, whether made, or found'; noting that facts like biology, geography, technology and others constrain our actions." An example: When cars couldn't go that fast, we didn't see a need to regulate driving speeds. 

The twist Lessig gets to explain is that, for the internet's purposes, architecture is basically computer code written by engineers and developers.

Before reading Lessig, if I had to give a single answer as to why the internet is special in regards to Wu's Cycle or resistant in the face of it, it might be something about code. The government's inability to regulate the internet directly with laws or indirectly by affecting the market or social norms have generally failed due to the nature of architecture (code) of the internet. The biggest example of this, as Lessig observes, is how governments are still struggling to cope with the slippery nature of geography and the internet. What happens when a user living in a state that bans gambling accesses a site hosted on a server that is in a state that allows gambling? 

But since 2006, governments have gained an increased ability to regulate by geographic area on the internet. For example, thanks to what I believe we would correctly say are changes to the "code" (in Lessig's sense) of the internet, Netflix is able to release a movie to stream in Canada but not in the U.S. (Though note that it is still relatively easy to bypass by Googling for programs [more code] that allow users to get around this artificial geographic hurdle.) As we'll see, for Lessig, code cuts both ways. In the early days of the internet it helped provide a new sense of freedom, but as the internet matures ( * ominous music * ) it gives government and business awesome new powers to monitor, search, and control behavior. 

And yes, I did switch Netflix for the government here, but Lessig builds this bridge for us: "Technologies that make commerce more efficient are also technologies that make regulation simpler." And as we saw in _The Master Switch_, big business and government often find themselves allies in working to "close" information technologies. 


## Latent Ambiguities 

A more concrete idea that in Lessig's book that I thought was very powerful was that of latent ambiguities. Lessig explains the concept by telling a story about a hypothetical computer "worm":

> A “worm” is a bit of computer code that is spit out on the Net and works its way into the systems of vulnerable computers. It is not a “virus” because it doesn’t attach itself to other programs and interfere with their operation. It is just a bit of extra code that does what the code writer says. The code could be harmless and simply sit on someone’s machine. Or it could be harmful and corrupt files or do other damage that its author commands. 

> Imagine a worm designed to do good (at least in the minds of some). Imagine that the code writer is the FBI and that the FBI is looking for a particular document belonging to the National Security Agency (NSA). Suppose that this document is classified and illegal to possess without the proper clearance. Imagine that the worm propagates itself on the Net, finding its way onto hard disks wherever it can. Once on a computer’s hard disk, it scans the entire disk. If it finds the NSA document, it sends a message back to the FBI saying as much. If it doesn’t, it erases itself. Finally, assume that it can do all this without “interfering” with the operation of the machine. No one would know it was there; it would report back nothing except that the NSA document was on the hard disk. Is this an unconstitutional worm?

He then flags this as a pretty obvious violation of the Fourth Amendment, which protects "against unreasonable searches and seizures," which was inspired by searches conducted by the British Army before and during the Revolutionary War. But then Lessig wonders: 

> But is the worm really the same as the King’s general search? One important difference is this: Unlike the victims of the general searches that the Framers of our Constitution were concerned about, the computer user never knows that his or her disk is being searched by the worm. With the general search, the police were breaking into a house and rummaging through private stuff. With the worm, it is a bit of computer code that does the breaking, and (I’ve assumed) it can “see” only one thing. And perhaps more importantly, unlike the general search, the worm learns little and leaves no damage after it’s finished: The code can’t read private letters; it doesn’t break down doors; it doesn’t interfere with ordinary life.

So, did the original Fourth Amendment protect citizens against the inconvenience and indignity of a search (which in the 1780s involved physically searching ones home or person) or did it protect a more idealized sense of privacy? At the time of the writing of the Amendment it didn't much matter, as there was no difference. But given the progress of technology (or change in context), we are forced to make a choice. Thus this is a latent ambiguity. 

> In the original context, the rule was clear (no generalized search), but in the current context, the rule depends upon which value the Constitution was meant to protect. The question is now ambiguous between (at least) two different answers. Either answer is possible, depending upon the value, so now we must choose one or the other.

Lessig then gives us this nice summary line: 

> When the ability to search without burden increases, does the government's power to search increase as well? Or, more darkly, as James Boyle puts it: “Is freedom inversely related to the efficiency of the available means of surveillance?” For if it is, as Boyle puts it, then “we have much to fear.”

In my mind the idea is that the Constitution and the Bill of Rights were written in a very different time in terms of technology. For some sections of the documents-- the three branches of government, states' rights, etc.-- that's all fine and good. But for issues of privacy and copyright at least, things have gotten a bit screwy in that if the law stays static as technology progresses, the values at the heart of the law risk being distorted. Sometimes the laws only need to be updated in such a way that they are "translated" to new technologies, but other times judges and lawmakers are faced with a real latent ambiguity, which requires a genuine value judgment be made given the new technological circumstances. We are forced to ask "What were the founders thinking?" or "What was the intention" of a given section of the law.

I think the connections between the fear that Boyle refers to and the recent Snowden revelations about the data-collecting programs of the NSA (which of course weren't disclosed when Lessig published the second edition of the book) are obvious here. 

## Wiretapping as a Latent Ambiguity

To further illustrate the point, he also gives a nice tour of the issues involved in a famous wire-tapping case, [_Olmstead v. United States_](https://en.wikipedia.org/wiki/Olmstead_v._United_States), and the case that later overturned it, [_Katz v. United States_](https://en.wikipedia.org/wiki/Katz_v._United_States). Lessig's walkthough of this is really good, but I'll try to summarize. 

Basically, in _Olmstead_, the government was found to be able to wiretap suspects without a warrant because the intrusion was on government property (phone lines), not the suspect's personal property. Indeed up until _Katz_ the Fourth Amendment was backed up by trespass laws-- that was one's redress if your rights had been violated. 

> To make sense of the amendment, we must go back to its framing. At that time, the legal protection against the invasion of privacy was trespass law. If someone entered your property and rifled through your stuff, that person violated your common law rights against trespass. You could sue that person for trespass, whether he was a police officer or private citizen. The threat of such suits gave the police an incentive not to invade your privacy.

The problem is that tapping a phone need not involve trespassing if the tap was inserted on public or government property. 

Years later this ruling was overturned in _Katz_, following a new dictum that the Fourth Amendment “protects people, not places”: 

> In that decision, _Katz v. United States_, the Supreme Court finally repudiated Olmstead and the many decisions that had relied upon it, reasoning that, given the role of electronic telecommunications in modern life, the [First Amendment] purposes of protecting free speech as well as the [Fourth Amendment] purposes of protecting privacy require treating as a “search” any invasion of a person’s confidential telephone communications, with or without physical trespass.

The latent ambiguity was created by the popularity of telephones. 

> When telephones came along, however, this protection changed. A lot of private information was put out across the phone lines. Now, if tapping was not trespass, much less of private life was protected from government snooping. Rather than 90 percent being protected by the amendment, only 50 percent was protected.

## Copyright

Lessig says that the internet has produced a loss of control with both copyright and privacy. 

> with copyright, because the technology enables perfect and free copies of content; with privacy, as we’ll see in this chapter, because the technology enables perpetual and cheap monitoring of behavior...

> The big difference between copyright and privacy, however, is the political economy that seeks a solution to each problem. With copyright, the interests threatened are powerful and well organized; with privacy, the interests threatened are diffuse and disorganized.

Lessig, a co-founder of [Creative Commons](https://en.wikipedia.org/wiki/Creative_Commons), cares about the future of copyright. His sections on copyright in _Code_ posit that eventually, as the internet inevitably becomes more regulatable and thus regulated, businesses will gain more and more control over how and when and by who copyrighted material is consumed. The example here is that when everything is digital and connected, record companies can charge by plays or publishers can charge you to lend the book to a friend (think iTunes DRM and Amazon Kindle). I thought this was the best example of code eventually cutting *against* the freedom of the early web.

He also notes that, as the technology of monitoring copyright infractions becomes more efficient and cheap, it will be tempting for copyright holders to become more strict about things like fair use and the expiration of copyrights. This could present a latent ambiguity in copyright law: 

> We have never had to choose whether authors should be permitted perfectly to control the use of their intellectual property independent of the law, for such control was not possible. The balance struck by the law was the best that authors could get. But now, code gives authors a better deal.

> There has always been a set of uses of copyrighted work that was unregulated by the law of copyright. Even within the boundary of uses that were regulated by the law of copyright, “fair use” kept some uses free. The core question is why? Were these transactions left free because it was too costly to meter them? Or were these transactions left free because keeping them free was an important public value tied to copyright?

> This is a question the law never had to resolve, though there is support for both views. Now the technology forces us to resolve it. The question, then, is how.


## Privacy and P3P 

Clearly related to this idea of control on the internet is privacy. One concept on privacy that he mentions that particularly sparked my interest was a now-defunct idea he presents for helping take back control of user privacy on the web, called ["Platform for Privacy" or P3P](https://en.wikipedia.org/wiki/P3P). 

> A second PET [privacy enhancing technology] to enable greater control over the use of data would be a protocol called the Platform for Privacy Preferences (or P3P for short). P3P would enable a machine-readable expression of the privacy preferences of an individual. It would enable an automatic way for an individual to recognize when a site does not comply with his privacy preferences. If you surf to a site that expresses its privacy policy using P3P, and its policy is inconsistent with your preferences, then depending upon the implementation, either the site or you are made aware of the problem created by this conflict... 

As Lessig observes, this solution, which I immediately imagined manifesting for users in a browser extension, would require terms of services for websites and web apps be available to users in a machine-readable format, rather than solely being presented as walls of text that users simply agree to without reading. 

This obviously requires action and adoption on the part of websites (namely making their terms and services more machine-readable and perhaps adapting them to more of a standard), which could be coerced or convinced into doing this by any of the four tools of regulation mentioned above, but I assume this project has reached a standstill partially due to this rather large roadblock. Though you'd think privacy-minded sites like Reddit, etc. could start picking at it?

## A Fear of Perfection, In Defense of Messiness

Early on in _Code_, Lessig asks: 

> What does it mean to live in a world where problems can be coded away? And when, in that world, should we code problems away, rather than learn to work them out, or punish those who cause them?

The comment comes among a discussion about the then-popular game "Second Life," where community disputes about the yards of neighbors and digital pet dogs eating poisonous flowers could very realistically be coded away. But it seems to me-- and maybe Lessig doesn't make this jump-- that increasing we live in a world that more and more problems can be "coded away" rather than solved by messy-but-good processes like debate, consensus, and finally either the adoption of new social norms or the passing of new laws. 

Should control of copyright be absolute? And before you answer as you might have in 1780, know that this is every year becoming more and more possible. And as for privacy-- what of its increasing latent ambiguities as more of our lives are lived and recorded by digital technologies that are becoming more and more centralized?

In regard to the centralization of the internet (and we might say technology in general), we can return to [Paul Ford](https://newrepublic.com/article/133889/reboot-world):

> There's an obvious connection between a decentralized internet, in which individuals create and oversee their own digital identities, and a functioning democracy, in which we make informed choices about who rules us and how we are ruled. Yet too few people make that link. We live in a world in which sensitive information of every conceivable sort—financial, sexual, medical, legal, familial, governmental—is now kept, and presumably guarded, online. It's guarded in gigantic treasure chests labeled “important data here.” So many plums for hackers to pluck.

> If you don't take care of yourself online, someone else will. That someone is likely not a peer but a megacorporation that is tracking and selling your preferences in a silent auction, a government surveilling your movements and religious affiliations, or a hacker collective that feels entitled to publish your sexual indelicacies. That someone probably already is.

Ford-- for me, a modern stalwart of the old, decentralized, messy web (see [Tilde Club](https://medium.com/message/tilde-club-i-had-a-couple-drinks-and-woke-up-with-1-000-nerds-a8904f0a2ebf#.8b5zw4wdz))-- offers a more up-to-date articulation of the "keep the web weird" (or, at least "remember the weird web in your hearts, designers and coders") position. 

Should the web/technology be _easy_? Is a more regulable web _easier_ to use? Do most people just want to send text messaged and look at Chartbeat?

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">.<a href="https://twitter.com/ftrain">@ftrain</a> wrote about open-source geo <a href="https://t.co/yQtldH7oiz">https://t.co/yQtldH7oiz</a> <a href="https://t.co/5o4Cg1dHRX">pic.twitter.com/5o4Cg1dHRX</a></p>&mdash; Sam Schlinkert (@sts10) <a href="https://twitter.com/sts10/status/741055308798300161">June 9, 2016</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

Messy means set up time, changing defaults, managing incompatibilities, and overcoming medium learning curves. Messy means harder to use, harder to find, harder to monitor (decentralized).

In Mary H.K. Choi's piece ["LIKE. FLIRT. GHOST: A JOURNEY INTO THE SOCIAL MEDIA LIVES OF TEENS"](http://www.wired.com/2016/08/how-teens-use-social-media/) in _Wired_ there's a line describing one teen, a 15-year-old named Ubakim: "Ubakum loves her phone. Deeply. iPhones for her are too easy, a little basic. 'I'm not a fan of user-friendliness.'" User-friendliness as basic, from the mouth of a user of a prophetic age nonetheless.

The next thing I'm trying to understand in regard to where the web has been and where it's going is privacy and security. From [@SwiftonSecurity](https://twitter.com/SwiftOnSecurity) I found [this blog post called "Free As In Health Care"](http://exple.tive.org/blarg/2016/08/29/free-as-in-health-care/) by Mike Hoye. I'm still trying to understand it, but I think it gets at some important ideas. For example one idea, maybe summarized by this bit:

> Right now the tech sector is roughly where the automotive sector was in the late fifties. You almost certainly know or know of somebody on Twitter having a very 1959 Bel-Air Frontal-Offset Collision experience right now, and the time for us to stop blaming the driver for that is long past.

seems to imply that the closed, organized "web" that is Twitter doesn't even have all of the benefits that we were supposedly trading in the open web for, namely safety or freedom from harassment, etc. 

Interestingly, when it comes to security issues like encryption, innovators like Moxie Marlinspike ([recent _Wired_ profile](https://www.wired.com/2016/07/meet-moxie-marlinspike-anarchist-bringing-encryption-us/)) are focused on making encrypted messaging _easier_, so easy that it's seamless, in order, I'm assuming, to get it used by the most number of users as possible. (In fact, it was recently [reported Hillary Clinton campaign staffers have been instructed to use Marlinspike's "Snowden-approved" app Signal when discussing Donald Trump](http://www.vanityfair.com/news/2016/08/how-the-clinton-campaign-is-foiling-the-kremlin).) 

Though there seems to be some push back from some in the secure messaging community that relates to our discussion. In [this long back-and-forth on a GitHub issue between Marlinspike and a developer of an app called LibreSignal](https://github.com/LibreSignal/LibreSignal/issues/37#issuecomment-217211165) I think we get a taste of this.

One user, criticizing Marlinspike's Signal app of having a security flaw due to a connection with Google Play, and advocating for a solution that is arguably more secure but more difficult to setup/use, [writes](https://github.com/LibreSignal/LibreSignal/issues/37#issuecomment-217633128): 

> Of course it's a bit complicated. But that's what people who want communications security are able to put up with.

Marlinspike [responds](https://github.com/LibreSignal/LibreSignal/issues/37#issuecomment-217661076):

> If you define "people who want communications security" as cryptonerds and free software moralists, then sure. But all the dissidents, activists, NGOs, and journalists that I've met are not willing to put up with that. It's why they use Signal.

Perhaps sometimes, a bit of pragmatism is required. (For more on the issues surrounding usability in secure communication, I learned more from Martin's Shelton's thesis "Role of corporate and government surveillance in journalists' infosec practices." [Tweet](https://twitter.com/mshelton/status/676459334369329153), [PDF](https://mshelt.onl/p/shelton_2015.pdf).)

## A Closing Note On Elegant, Not Messy Code

For me, agreeing with Lessig and Ford's argument in favor of messiness seemed strangely at odds with an idea [I saw articulated in _Hackers_ by Steven Levy](https://sts10.github.io/blog/2015/08/02/the-hacker-ethic/), namely the idea of hackers searching for what I at least called an "elegant solution." I've certainly observed how bad-for-everyone messy code can be. It can stifle innovation where "clean," elegant code can not only allow innovation, but it can inspire it. 

But I think it's possible to see a real difference between a cleverly-written JavaScript function that can be re-used elsewhere and the controlling systems made possible by restrictive software licenses and the pervasiveness of internet trackers.
