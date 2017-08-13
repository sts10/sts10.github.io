+++
title= "From Terminal Vim to MacVim"
date= "2015-08-07 17:17:48 -0400"
comments = "true"
+++

On my work computer I've been having some trouble getting the 2015 MacBook Pro's Terminal Vim to access the system clipboard. There is a chance that the version of Vim that shipped with the computer does not support the feature in which the `*` register is connected to the system clipboard. (I'll note the version number next time I'm in the office.)

<!-- more -->

For the record, at home, where the `*` register works great, I'm running `Vim 7.4.488` in the Terminal. If the problem with the work machine is that the shipped version of Vim is 7.2 or 7.3, I could do what I did on my home machine to upgrade Vim-- [using homebrew to install Vim](http://www.prioritized.net/blog/upgrading-vim-on-os-x/) (not MacVim) and then add `alias vim="/usr/local/Cellar/vim/7.4.488/bin/vim"` to my `.bash_profile`, although that sucks because the version number is hard-coded...  

If that doesn't fix the system clipboard problem, or we just object to hard-coding the Vim version number into our `.bash_profile`, another fall back for the work computer is to just use MacVim. 

Obviously, besides the actual MacVim editor, I also need to be able to launch it from the command line as easily as Terminal Vim or Sublime Text. For that, I found [this simple but excellent blog post](http://michaellee.co/launch-macvim-from-terminal/). 

The blog post links to [this snapshot of MacVim](https://github.com/b4winckler/macvim/releases) on GitHub, HOWEVER [this seems to be a newer, more active fork](https://github.com/macvim-dev/macvim/releases/) of the project. I've since switched to this fork, and am now running VIM 7.4.769. Also the icon is nicer and more modern: a better fit for OS X Yosemite.

(P.S. There's also [a link on macupdate.com](http://www.macupdate.com/app/mac/25988/macvim), but that active fork on GitHub is probably way better.)

In that release, besides the actual text editor application which (I think) you install like any other OS X application, there's a shell script called `mvim`. To set up the ability to open files from the command line with the command `mvim`, simply move that `mvim` script to `/usr/local/bin`. If you're in the downloaded directory, you can run: 

```
mv mvim /usr/local/bin/
```

After restarting Terminal (probably), you should be able to run `mvim filename.rb` to open files in MacVim. Best of all, no changes needed to your `.bash_profile`. 

## Thoughts on Actually Using MacVim, As Compared to Vim in Terminal 

Today I started work on a new Ruby CLI allowing the user to play [Connect Four](https://github.com/sts10/connect_four) and used MacVim as an experiment. I really liked it-- having the mouse, normal OS X commands, and easy access to the system clipboard was definitely nice. 

When I [first started experimenting with Vim](http://sts10.github.io/blog/2014/09/10/getting-started-with-vim/) I decided to be "hardcore" and only use it in the Terminal. And I suppose using Vim for the first 11 months (on and off) in the Terminal did two things: (1) Program me not rely on either the mouse (in any way), or on very common OS X commands like Cmd + v or Cmd + a, and (2) made me comfortable in times when I'll _need_ to use Vim in a console, like on a remote box (which I have had to do for work and [Totally Nuclear Club stuff](http://sts10.github.io/blog/2014/10/15/totally-nuclear-and-radiation/)).

But at this point I'm decently comfortable using Vim commands and working with files in Vim rather than Sublime Text. This comfort has led me to see and understand the advantages to the commands better. The reasons that I will occasionally choose to open a project in Sublime over Vim have now shrunk, though sometimes I do run Sublime, mostly when I know I'll be dealing with a lot of files and a good amount of complex clipboard work.  

I certainly _could_ get "good enough" with Terminal Vim to be able to manage tons of files and move big blocks of preciously sweated-over-and-not-well-backed-up code around flawlessly. But MacVim's advantages in terms of system clipboard integration AND some nice mouse highlighting, easy window resizing with the mouse, and scrolling compatibility make these problems more manageable. In fact MacVim feels closer to Sublime-in-Vintage-Mode (or at least closer than Terminal Vim), but of course you still get full-featured Vim, with all of your `vimrc` settings and keymapping, and plug-ins coming with you.

As a side note, I actually, for the first time, used [WatchPeopleCode](http://www.watchpeoplecode.com/) to livestream my work on the Connect Four game using MacVim and Terminal side-by-side ([here's my WPC page](http://www.watchpeoplecode.com/streamer/sts10)). To do this I only needed one new piece of software: [Open Broadcast Software](https://obsproject.com/). It took up more CPU processing power than I thought I would, and the lag when sending the video to WPC was sometimes more than a minute or two. But it's good to know how to do it, and be set up. 

## Lingering Questions about MacVim

What is the process for upgrading MacVim if you use this method? MacVim does have a checkbox preference that asks whether we want to check for updates when the application launches, so my hope is that that would catch new versions. We'd also have to hope that that `mvim` shell script will work for subsequent versions, but that could be the case! I'm running some version of 7.4.X so that's probably good for a while. 
