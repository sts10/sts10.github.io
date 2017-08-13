+++
title= "The Hacker Ethic"
date= "2015-08-02 20:07:50 -0400"
comments = "true"
+++

As I mentioned in [my post about _The Master Switch_](http://sts10.github.io/blog/2015/07/15/master-switch-and-hackers/), right after I finished Wu's book I dove into [_Hackers_](http://www.amazon.com/Hackers-Heroes-Computer-Revolution-Anniversary/dp/1449388396/ref=sr_1_3?ie=UTF8&qid=1437012859&sr=8-3&keywords=hackers) by Steven Levy. 

The 31-year-old book is broken into three main sections: MIT hackers in the '50s, Wozniak and hardware hackers in the '70s, and video game creators in the '80s. I saw each part as less and less interesting personally-- the MIT kids were inspiring, the [Homebrew Club](https://en.wikipedia.org/wiki/Homebrew_Computer_Club) interesting, the [On-Line Systems](https://en.wikipedia.org/wiki/Sierra_Entertainment) a bit egotistical and off. 

<!-- more -->

The MIT section was really amazing and eye-opening for me though. At the time, it seems to have been nearly a utopia of ["blue sky" research](https://en.wikipedia.org/wiki/Blue_skies_research) funded by the U.S. military. A group of undergraduates involved in [a model train club](https://en.wikipedia.org/wiki/Tech_Model_Railroad_Club) at MIT got interested in the early computers on campus, and would sneak around the campus at odd hours to find and play with the room-sized and incredibly expensive IBM machines. Sometime around 1956 MIT got hold of a less-expensive and more interactive "mini-computer" called a [TX-0](https://en.wikipedia.org/wiki/TX-0). The young undergrads began staying up seemingly around the clock building new assemblers, graphic systems, and eventually games for the machine, establishing norms, behaviors, and vocabulary for programmers for decades to come, including readily sharing code in the name of having it improved my others.  

Nearly right off the bat, in chapter 2 of the section, Levy lays out something that he calls the [Hacker Ethic](https://en.wikipedia.org/wiki/Hacker_ethic). First, to note: apparently from the 1950s into the '80s the term "hacker" did not have its modern-day negative connotation (nefarious actors who use computers to exploit security flaws and gain access to sensitive information), as Levy explains later in the book. Though with the advent of the term "life hack" the term seems to be having a bit of a resurgence toward at least one part of the more positive original meaning: a hack as something that made your life easier. 

From my reading of the MIT section of _Hackers_, [the Hacker Ethic](https://en.wikipedia.org/wiki/Hacker_ethic#The_hacker_ethics) is:

1. The "Hands-On Imperative": Basically what Wikipedia says: "[A]ccess gives hackers the opportunity to take things apart, fix, or improve upon them and to learn and understand how they work. This gives them the knowledge to create new and even more interesting things."

2. All information should be free: A free exchange of information is a good thing. If I remember correctly, when computer "time-sharing" came to MIT (multiple users on one computer), the hackers fought against the implementation of user passwords. They also literally broke locks on physical doors. For me this connected well with the tragic case of [Aaron Swartz](https://en.wikipedia.org/wiki/Aaron_Swartz#JSTOR). A more positive example would be the open-source movement and technologies like Git and GitHub.

3. You can create art and beauty on a computer: There is a certain beauty in elegant solutions, whether in code or elsewhere. And furthermore, elegance is a worthy pursuit, even after a working solution to the present-day problem is found. Continued refinement, in the name of solution elegance or otherwise, may lead to new and important discoveries previously un-thought-of. 

This notion of solution elegance is the richest part of the ethic for me. It reminds me of the [practical object-oriented design ideas](http://sts10.github.io/blog/2014/02/23/refactoring-with-structs/) espoused by Sandi Metz and others. Getting a bit above the actual code, Metz's idea is that programmers should write code in such a way that prepares for the inevitable changes to the code's requirements, applications, and adaptations that the future will bring: Keep system loosely tied together, so that they can be re-organized; make sure each part of the code as one single responsibility; reduce dependencies whenever possible, etc. 

In my experience programming, solving problems "inelegantly"-- for example, hard-coding settings that a user will likely want to change frequently down the road-- leads directly to increasing a system's [technical debt](https://en.wikipedia.org/wiki/Technical_debt), a problem that will most likely grow until a programmer has to fix it later. ([POODR](http://www.amazon.com/Practical-Object-Oriented-Design-Ruby-Addison-Wesley/dp/0321721330/ref=sr_1_1?s=books&ie=UTF8&qid=1393199505&sr=1-1&keywords=practical+object-oriented+design+in+ruby) is still a good and worthy read, even on this more philosophical level.)

I'm sure there are books and business school lectures on applying the "Hacker Ethic" to business management and all other manner of doing things (and if not, there should be). Personally I'm trying to use it as a framework for understanding and evaluating systems (I use that word in a very general, hazy sense here) I encounter in my personal and professional life, and have so far found it useful. The ideas grouped in the Hacker Ethic are ideas that I had a fuzzy notion of before reading Levy. It was, as it always is, an exhilarating experience to learn that I was not alone in my judgment of systems and simultaneously learn how others in the past and present had advanced the concepts, illuminating ideas I would probably never realized on my own.

I'm now on to [_Where Wizards Stay Up Late_](http://www.amazon.com/Where-Wizards-Stay-Up-Late/dp/0684832674/ref=sr_1_1?s=books&ie=UTF8&qid=1438568639&sr=1-1&keywords=where+wizards+stay+up+late), a history of ARPANET's creation by Katie Harfner.
