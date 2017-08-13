+++
title= "Flatiron Day Two"
date= "2014-02-05 12:33:24 -0500"
comments = "true"
+++

It’s day 2 and I’m already thinking about my computer differently. As Avi says, for us it will become more of a tool to build things and less of a device to consume media (he doesn't like iPads either!). 

After going over some more Git stuff in the morning, today’s lecture and the focus of the exercise following it was about Bash and setting up our “development environment.” I had been looking forward to this— it’s like that part in a video game where you get to upgrade all your stuff. Except it’s even cooler because upgrading this kind of software involves typing things like “rvm install 2.0.0” into the terminal and then having a budget little ascii progress bar fill up like in The Matrix.  

<!-- more -->

We went through a long list, checking versions of Ruby, Ruby Version Manager (RVM), Git, Xcode, etc. We also edited some git config files like .gitconfig and .gitignore— it amounted to a good amount of work in the terminal, which helped me get more comfortable using it. 

Thankfully I had a done a fair chunk of this upgrading work last week, as well as a little last night. I even upgraded to OS X Mavericks to make everything a little easier. So I got to get to the more superficial, fun personalizations a little earlier than some other students. This mostly consisted of customizing the look and feel of my terminal window via my Bash profile and my terminal preferences. (Here’s [Treehouse’s intro to the console](http://teamtreehouse.com/library/console-foundations-2#getting-started-with-the-console) if you’re interested in learning more.)

Here’s a screenshot of what my terminal looks like now (I was going for a sort-of Hemingway theme I think). 

![](https://31.media.tumblr.com/5df40924b49f8a63df2ec41444a9512c/tumblr_inline_n0i4ortZMQ1qa5078.png)

If you look at the first two lines, that’s what my prompt looks like now. The first line gives the time is 24-hour format, then in bold navy-blue it displays whatever folder I’m currently in (in this case, I was in my “code” folder). The second line is where I type my command, and I have it start with a red cross (_Farewell to Arms_ I guess). For that first prompt in the screenshot above I typed “cd test”, which means that’s I’m telling the computer to open the “test” folder that’s inside the “code” folder (“cd” stands for change directory”). I hit enter, we moved to the test folder, and then the terminal asks me what I want to do next. 

But notice this next prompt now has an orange “dev” in brackets. This is because the test folder is being watched by Git, [my awesome robot secretary](http://schlinkblog.tumblr.com/post/75555785850/flatiron-004-day-1) (the code folder, unlike the test folder, is NOT being watched by Git). I edited my terminal window so that Git can tell me right in the prompt that, hey, you’re currently operating in a branch called “dev”. 

At that point I went to my open Sublime Text 2 and changed a file inside the “test” folder called index.html. I then went back to the terminal and ran a command called “git status”, which is the equivalent of saying “Hey Git, anything new?” And Git’s like, “Yeah man, somebody changed this file called index.html. Do you want to add this change to my ‘dev’ file cabinet, or did you just screw up again?” (Oh Git.) 

In the subsequent prompt, you can see there’s an asterisk next to the word dev. That’s another function I added to my Bash profile. Now, next to the branch name (in this case, “dev”), it puts an asterisk whenever something has been changed in that branch. So even if I hadn’t used the “git status” command to ask Git if there was anything new in the “test” folder, the word “dev” would have had an asterisk next to it regardless. Sweet, right? Gotta make things your own, you know? 

I also downloaded the free version of [Alfred](http://www.alfredapp.com/), a productivity app for OS X that is supposed to be an improvement over Mac's Spotlight. We'll see if I end up using it (Avi and some of the T.A. swear by it). 

Tomorrow is the first day with Ruby, so it should be a good one. But man, today I am really happy. My brain hurts in a good way and this stuff is really fun.

