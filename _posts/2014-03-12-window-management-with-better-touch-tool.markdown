+++
title= "Window Management with Better Touch Tool"
date= "2014-03-12 22:10:30 -0400"
comments = "true"
+++

In my most-recent post I wrote about [some Sublime Text tips and tricks](http://sts10.github.io/blog/2014/03/01/some-sublime-text-tips-and-tricks/) I had picked up from an instructional video. I've since been using these new techniques almost constantly, especially the window management keyboard shortcuts (set via Sublime's key-bindings). I've found them to be super-helpful, especially as we moved into Sinatra and now Ruby on Rails, which involves projects with many files. Naturally, I began to explore ways in which I could set keyboard shortcuts to manage the windows of all my programs, not just Sublime Text. 

<!-- more -->

I knew that Avi uses an app called [Moom](http://manytricks.com/moom/). It looks great-- I like how it enhances OS X's green expand button. But it also costs $10, and I figured I'd explore some free alternatives first. 

On the advice of fellow Flatiron student Daniel Spector, I tried [Better Touch Tool](http://www.boastr.net/). Better Touch Tool seems to be made for setting custom mouse-touch shortcuts (like 3 finger left-right swiping), but it also supports global keyboard shortcuts. 

### Setup and Usage

If I remember correctly, Better Touch doesn't come with any default shortcuts enabled. Setting your custom shortcuts is pretty simple, although a little janky. For instance, I think it's the case that if you want to set a shortcut (say command + arrow-up), that trigger cannot also be currently set to another command. But in general it offers tons of customization options and it's free, so I can't really complain.  

### My Current Settings

Below are my current settings: 

![My Better Touch Tool keyboard shortcuts](http://i.imgur.com/3k3bkeM.png)

Basically, I have control + command + arrows set to move the current, or active, window. 'Left' moves it to the left half of the monitor, 'right' to the right half, 'up' maximizes it, and 'down' returns it to its original size ("Restore Old Window Size"). Since I have an external monitor at home, I set control + command + = to maximize on the other monitor, and control + command + - to simply have it switch monitors (which would basically undo the "maximize on the other monitor" command). 

The control + command combo works well with [the Sublime key-bindings I already had in place](http://sts10.github.io/blog/2014/03/01/some-sublime-text-tips-and-tricks/)-- namely using alt + command + arrows to manage my Sublime displays. To switch between these two sets of functions all I have to do is move a finger from alt to control or visa versa. 

### Notes

Setting these up was a little tricky, but once set (and once I set Better Touch Tool to open on start-up) the shortcuts have worked very well. 

Before I installed BBT and used command+tab to navigate open applications, I rarely maximized windows. It was just too hard to switch applications unless I left a little bit of another window visible so I could click on it. But now that I've become practiced with command+tab and Alfred, I don't need to use the mouse to open apps from my dock or switch between open applications. Thus, I was able to set my Mac dock to only appear on hover. With BBT I really get to take advantage of the extra screen real-estate this gives me. 

I don't have any touchpad shortcuts set up at this point, but BTT offers plenty of options. Checkout their [documentation](http://blog.boastr.net/documentation-faq/new-bettertouchtool-documentation/) for ideas. 

