+++
title= "Changing Where Your Screeshots Are Saved"
date= "2015-05-28 19:53:03 -0400"
comments = "true"
+++

Earlier today BuzzFeed published these [17 Desktops So Untidy They Will Make You Seriously Uncomfortable](http://www.buzzfeed.com/lukebailey/desktop-stuff). From experience I know that since by default OS X saves screenshotted images to your Desktop, they often contribute to Desktop clutter. 

<!-- more -->

I've written about [how I take screenshots before](http://sts10.github.io/blog/2014/12/06/screenshots-mouse-trick/), but just to be thorough, I thought I'd write my own version of [this insightful Lifehacker post on how to change OS X's default screenshot format and location](http://lifehacker.com/quickly-change-os-xs-default-screenshot-format-and-loc-1489014578). 

OK, let's get to it. 

We're going to set it up so that your screenshotted images (that you take with Shift + Command + 4) get saved to a folder on your Desktop called screenshots. 

**Step 1:** Open an application called Terminal. It is located in Applications > Utilities > Terminal. 

![Where Terminal is](http://dl.dropboxusercontent.com/s/x4g4joq854vglm1/2015-05-28%20at%208.08%20PM.png)

**This Seems Scary...**

Terminal gives you access to your computer's command line, where you can do all sorts of cool stuff. Basically you type or paste text commands, then hit enter, and your computer executes the command. But if you've never used it before you're going to want to stick to these instructions closely.

**Step 2:** Copy all of the following text to your clipboard as one line:

`mkdir ~/Desktop/screenshots; defaults write com.apple.screencapture location ~/Desktop/screenshots; killall SystemUIServer`

**Step 3:** Go back to Terminal and paste that text into the prompt (can use keyboard shortcut Command +v). Then hit enter.

**Step 4:** Quit Terminal by going to Terminal > Quit.

You should now be good to go! Test it out by taking a screenshot (Shift + Command + 4) and verifying that it gets saved to the new screenshots folder, rather than the desktop! 
