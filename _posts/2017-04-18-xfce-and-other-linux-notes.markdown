---
layout: post
date: 2017-04-18 19:55:57 -0400
title : "Switching to Xfce and Other Linux Notes"
comments: true

---

This post is a bit of a sequel to my post about [installing Ubuntu on my old Macbook Pro](https://sts10.github.io/2016/11/07/installing-ubuntu-on-my-old-macbook-pro.html). This is just a collection of notes on improvements I've made to my Ubuntu 16.04 Unity installation, the bulk of which has been changing my desktop environment from Unity to other options.

Hope this helps you! 

## Application Launcher

On macOS I make frequent use of [Alfred](https://www.alfredapp.com/) as an application launcher. Ubuntu's Unity desktop environment sort of had something like that, which you can initiate by pressing the command key on its own at any time. But on other desktop environment the default "launcher" tool wasn't similar to Alfred enough for my liking.

So I found [this askubuntu answer](https://askubuntu.com/questions/203851/any-search-tool-for-lxde-menu/203852#203852) that recommends installing an application called Synapse by running `sudo apt-get install synapse`. By default the launcher is invoked by hitting `ctrl + space`, but I changed it to `alt+Enter` by launching Synapse and clicking on the not-super-obvious round button on the right side of the pop-up display and clicking "Preferences". Works great on all the desktop environments I tried (though its speed varied a little). 

## Ditching Unity Desktop Environment

### What's a Desktop Environment?

In the context of an operating system, a desktop environment (sometimes abbreviated DE) is essentially the GUI part of your operating system. On OS X, the desktop Environment is called Aqua, and in Windows it's called Aero, however in both cases users cannot change it. But with Linux, you can change your desktop environment, and pretty easily. Examples are GNOME, KDE, LXDE, Xfce, Unity, MATE, Cinnamon, etc. Note that these are different than Linux _distributions_ or "distros" (examples of which are Ubuntu, Arch, Mint, Debian, Manjaro, etc.). From what I understand, some desktop environments work better with certain distributions than others, one clue of which is what desktop environment a given distribution comes with -- for example Ubuntu ships with Unity, Manjaro ships with either (i.e. officially supports both) KDE or Xfce, etc.

### Why I Wanted to Change my Desktop Environment

To recap, I started with an old MacBook Pro with 2 GB of RAM running Ubuntu 16.04 LTS with Unity. With only 2 GB of RAM Unity ran pretty sluggishly. So to avoid the high memory usage of the Unity desktop environment, I explored installing a more lightweight desktop environment. I had a gist that Unity was a bit of a memory hog compared to other desktop environments. I also spotted [this Reddit post](https://www.reddit.com/r/linux/comments/5l39tz/linux_distros_ram_consumption_comparison_updated/?st=ixpgu5wy&sh=67b8f57f) that compares some lightweight distros in terms of RAM consumption. 

Note: When I installed new desktop environments (a) I was still running Ubuntu as my Linux distribution-- Ubuntu was my operating system the whole time. Also note that (b) I didn't lose any files or installed programs, and (c) I can easily switch between installed desktop environments by choosing from them in my computer login screen. You don't even need to restart the computer to switch environments. 

From that [list](https://www.reddit.com/r/linux/comments/5l39tz/linux_distros_ram_consumption_comparison_updated/?st=ixpgu5wy&sh=67b8f57f), I first installed Ubuntu's LXDE desktop environment (called Lubuntu). The size of the installation was about 343 mb. I later installed the Xfce desktop environment, which was probably big larger and uses a little more memory, but I like it considerably more. 

Also, a seemingly big advantage Xfce has over the other two I've tried (LXDE and Unity) is its popularity with other distros, including well-regarded "advanced" distros like Debian and Manjaro. From what I've gathered this effectively means that Xfce is a desktop environment users can "grow with", i.e. you can take your knowledge, comfort, and configuration with you to other distributions that are made to work well with it (unlike Unity, which seems to be only used with Ubuntu, and only until Ubuntu 18.04 which [will come with the GNOME desktop environment](http://www.omgubuntu.co.uk/2017/04/ubuntu-18-04-ship-gnome-desktop-not-unity) instead). I think the same could be said of KDE and GNOME, but those seem to be a little heavier.

## Xfce

From [xfce.org](https://www.xfce.org/): "Xfce is a lightweight desktop environment for UNIX-like operating systems. It aims to be fast and low on system resources, while still being visually appealing and user friendly." There's also [a subreddit](https://www.reddit.com/r/xfce/). Let's get started!

### Installing Xfce on Ubuntu

1. In a terminal, run `sudo apt-get install xfce4 xfce4-goodies`
2. Restart your computer
3. At login screen, select "xfce session" from the dropdown menu in the top-right. Then login as usual
4. You then likely want to run `sudo apt update && sudo apt upgrade`

### Xfce: What You're Looking at Straight Out of the Box

- "Whisker menu" is the Start-menu-like menu in the top left
- A nice, MacOS-like dock on the bottom with GNOME Terminal, File Manager, Web Browser (default), and a search

### Xfce Settings

There's a nice Settings menu in Whisker menu > Settings > Settings Manager. Here are some the things I did in that menu right off (personal preference of course):

- In Window Manager > Keyboard, I set up a bunch of window resizing keyboard shortcuts. Nice to see there's a GUI menu of this built-in to the environment!
- In Session and Startup > Application Autostart, I entered a custom command to remap caps lock to control. I entered the following:

```
Name: remap caps
Description: remap caps lock to control
Command: /usr/bin/setxkbmap -option "ctrl:nocaps"
```

- In Mouse and Touchpad > Devices > Touchpad, I enabled "Disable touchpad while typing" and I disabled "Tap touchpad to click". 

### Xfce Memory Usage

On Ubuntu (maybe all Linux distros?) you can check how much RAM you have available by running `free -m` in the terminal. Thanks to [this site](http://www.linuxatemyram.com/), I knew to look for the value under "available" to get an accurate estimate of how many megabytes of my memory were "free". 

With Firefox, Terminal, and Settings open, I've got about 980 MB out of 2GB RAM "available". (This is compared to abut 1180 MB available when using Lubuntu, which makes sense as I've read that Xfce/Xubuntu is slightly heavier than Lubuntu.)

### Xfce or Xubuntu?

Honestly I'm not sure whether it's more proper to say I'm running "Xfce on Ubuntu" or "Xubuntu", or even if there's a real difference. I prefer saying "Xfce on Ubuntu", as I never installed anything called [Xubuntu](https://xubuntu.org/), and when I run `screenfetch` my OS is listed as "Ubuntu 16.04 xenial". But if you have a better handle of this please leave a comment!

### Customizing Appearance of Xfce (Ubuntu)

Customizing the look of your desktop environment may seem like an afterthought to you, but I've come to realize it's at least a little important in how you use and approach your computer. On Mac such things aren't a big deal because the new OSs also update the look and feel of the environment, but I found that even my new installation of Xfce (and LXDE) looked straight out of 2000 if not earlier. Below I outline some of the tweaks that I made to my Xfce environment to bring it "up to speed" aesthetically. 

<!-- ![my xfce desktop](https://sts10.github.io/img/xfce.png) -->
![my xfce desktop](../../img/axiom-screenshot.png)

#### Desktop Background Image

1. Pick one (I found one I liked [here](https://www.buzzfeed.com/jessicaprobus/26-remarkably-soothing-desktop-backgrounds?utm_term=.uhwBX0qylL#.vxgE1Z8Yar)). 
2. Download the image file to your Pictures folder. 
3. Go to Settings Manager > Desktop > Background. In bottom-right change Folder to Pictures and find your desired background.

#### "Theme" 

I went with axiom, which I got [here](https://www.xfce-look.org/p/1016679/). To install it: 

1. I downloaded [the tar file](https://www.xfce-look.org/p/1016679/). 
2. In terminal I ran `mkdir ~/.themes`
3. I then extracted two directories from the tar file called "axiom" and "axiomd", and then moved them both into the new `~/.themes` directory. 
4. Go to Settings Manager > Appearance and choose either axiom or axiomd
5. Then is Settings Manager > Window Manager > Style and select either axiom or axiomd

#### Icons

I chose "Paper" icons for now, which you can find download instructions for on [the offical website](https://snwh.org/paper/download). After running those updates, I went to Settings Manager > Appearance > Icons and selected Paper. 

#### Login Window

Go to Settings Manager > LightDM GTK + Greeter Settings and select the theme and icon set you like. You can also change your user image or remove it all together. Unfortunately, for me, axiom was not available here, so I went with Adwaita for now. 

Note: [This video](https://www.youtube.com/watch?v=GR2y0xOIIdI) helped me quite a bit:

<iframe width="560" height="315" src="https://www.youtube.com/embed/GR2y0xOIIdI" frameborder="0" allowfullscreen></iframe>

#### Font

I'm going with [Noto Sans](https://www.google.com/get/noto/) for now (the actual choice says "Noto Sans CJK JP"). I selected this font in Settings Manager > Appearance > Fonts. I also selected basically every where else I encountered a choice of font in Settings. 

#### Panels

Odds are you Panel 1 is on top of your screen, and panel 2 is the dock-like panel that I think starts at the bottom of your screen. 

For customizing Panel 1, I followed some of the instructions in the first minute of [this video](https://www.youtube.com/watch?v=tJQ0y2XMoMw). I set the mode to Vertical, which puts in on the left, increased transparency, and made it 48 pixels wide, and had it never hide. Then, in Items > Applications Menu I deselected "show button title" and changed the image. In Items > Window Buttons I deselected "Show button labels", selected "Show flat buttons", deselected "Show handle", and set Window grouping to always. The end result is pretty similar to the Unity bar on the left-hand side. We'll see if I stick with it.

I'm not sure what I want out of panel 2 (the dock) yet, so I set it to be pretty small and have it hide intelligently. 

### Switching to Paper theme 

I did some more fiddling today and here's what I've got now:

![paper theme screenshot](../../img/paper-screenshot.png)

Basically I put panel 1 up top, switch the battery level item to the power management icon, and used the [Paper theme](https://snwh.org/paper/download) as well as the Paper icon, though from the Neofetch display in the screenshot it looks like it's a GTK2 theme, meaning that it won't work with GTK3 apps(?)

[Here's](https://www.reddit.com/r/wallpapers/comments/5blz1j/lowpoly_planet/?st=j1v38smk&sh=bb87167d) where I got the new wallpaper (seems like r/wallpapers is a good sub). I also switched the Whisker menu icon for a generic app launcher icon (top right).

Overall it's a bit darker than I'm used to, but I do like how the theme matches the wallpaper. I'm tempted to find a matching Vim colorscheme, but that'll be for another day.

## LXDE/Lubuntu

### Installing LXDE/Lubuntu

Before installing Xfce, I gave Lubuntu/LXDE a shot. It did consume less memory, but I found the UI a bit clunky and it was a little less intuitive to get things working like I wanted. But if you need a really light weight desktop environment, it might work for you.

To install Lubuntu, I ran `sudo apt-get install lubuntu-desktop`.

After installing the Lubuntu desktop environment, you want to run the software updater (you can also update software in the Terminal by running `sudo apt update && sudo apt upgrade`). Then restart the computer (that seems to have been pretty important), and at the login screen choose Lubuntu (or LXDE... that's another option and I'm not sure what the difference is). 

### Lubuntu Memory Usage

With my terminal and Firefox running on Lubuntu, I have about 1187 MB RAM of my 2 GB available, as opposed to Ubuntu, which generally only left about 700 or 800 MB available when I was running a couple of programs (not a very scientific test, I know).


## Appendix

Here's a bunch of little tasks I took notes on. Figure I'd put them here mostly for my personal reference in case I have to do them again on another installation, but you may find them helpful. 

### Installing rbenv on Ubuntu 16.04

We're attempting to install [rbenv](https://github.com/rbenv/rbenv) via the ["Basic GitHub Checkout" method](https://github.com/rbenv/rbenv#basic-github-checkout).

I think we're also going to want [ruby-build](https://github.com/rbenv/ruby-build#readme) plugin. I DON'T think I'm going to want [rbenv-gemset](https://github.com/jf/rbenv-gemset)?

#### Installing rbenv

As mentioned above, we're going to install rbenv via the ["Basic GitHub Checkout" method](https://github.com/rbenv/rbenv#basic-github-checkout). I reproduce them below, but you should consult the latest instructions for Ubuntu on that GitHub page.

Clone down rbenv:
```
git clone https://github.com/rbenv/rbenv.git ~/.rbenv
```

Make it more efficient:
```
cd ~/.rbenv && src/configure && make -C src
```

Add rbenv to your PATH:
```
echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> ~/.bashrc
```

And finally run this init script:
```
~/.rbenv/bin/rbenv init
```

Following instructions from the init script run, I added `eval "$(rbenv init -)"` to my `~/.bashrc`, just _below_ the `export PATH="$HOME/.rbenv/bin:$PATH"` line that we added with the echo command above.

Now restart your terminal and/or run `source ~/.bashrc`.

Check your rbenv installation by running `type rbenv`. It should say it's a function. 

#### Installing the ruby-build plugin

Wanting to build the latest version of Ruby a nice and clean way, I installed [ruby-build](https://github.com/rbenv/ruby-build#readme) by running `git clone https://github.com/rbenv/ruby-build.git ~/.rbenv/plugins/ruby-build`

#### Installing a version of Ruby using rbenv (some problems)

Now we can install some versions of Ruby using rbenv.

`rbenv install --list` gives us all available versions to install. 

I'm going with 2.3.3, so I ran `rbenv install 2.3.3`. It took a long time to install and then told my the build failed. It suggested running `apt-get install -y libreadline-dev` so I did that (prefaced with `sudo`) and that software seemed to install successfully. 

On second attempt I ran `rbenv install --verbose 2.3.3` so that I could better see what's going on (turns out, it's a lot!). Success this time!

Once that's all installed, I opened a new gnome-terminal window. I was greeted by this shitty message at the top of the terminal window: 

> The program 'rbenv' is currently not installed. You can install it by typing: `sudo apt install rbenv`

but I learned that this can be temporarily solved be running `source ~/.profile`. And that it will be solved permanently once you restart Ubuntu/Lubuntu (source: [this GitHub issue](https://github.com/rbenv/rbenv/issues/424)).

Then I had to set Ruby v. 2.3.3 as my global version of Ruby, which I did with `rbenv global 2.3.3`. After that, `ruby --version` gave me the familiar: `ruby 2.3.3p222 (2016-11-21 revision 56859) [x86_64-linux]`


#### Installing gems with rbenv

I definitely want to install the "bundler" gem. To do this, I ran: `gem install bundler`, just like with RVM. 

From there things seem to be just fine. Installed gems just work so far. 



### Using Pidgin with a Google Account, and Setting Up OTR

Pidgin comes installed with Ubuntu 16.04. To add my existing Google Account, I followed the steps outlined in [this Stack Overflow answer](https://stackoverflow.com/questions/28681341/how-to-add-google-talk-hangouts-to-pidgin-chat-client/33898893#33898893).

To summarize: 

In Pidgin, add a new account. Set the Protocol to "Google Talk", username to your Google username, and the Domain to "gmail.com". 

For the password you'll need to create a dedicated app password. You can do that [in your Google accounts Security > App Passwords section](https://security.google.com/settings/security/apppasswords). When creating the new app password, set "app" to "other" and call it something like "linux pidgin"-- it doesn't matter what you call it. Optionally, if on a secure computer, tick the "Remember password" checkmark. (Warning: This will mean your new app password will be stored in plain text in `~/.purple/accounts.xml`.) Leave "Resource" and "Local Alias" blank.

#### Installing and Enabling OTR

Once my Google account was successfully added, I installed the Pidgin-otr plugin by running `sudo apt-get install pidgin-otr` in terminal. To enable and setup OTR, I followed [this EFF guide](https://ssd.eff.org/en/module/how-use-otr-linux). That guide also describes how to install the otr plugin through the Ubuntu Software manager if you're more into GUIs (see the early steps of that EFF guide).

#### Further Pidgin Customizations

Some of my contacts/buddies set there status to "offline" nearly all the time, even when they're actually there.

To display offline buddies, go to Buddies > Show > Offline Buddies. There are more preferences, like muting sounds, in Tools > Preferences.

Not sure how to disable the pop up notifications yet though.


### How to Install Neovim on Ubuntu 16.04

I'm using Ubuntu 16.04 and we're assuming that we're going to be using gnome-terminal. I couldn't figure out how to get HEX colors in Vim when using either Xfce's default terminal or Lubuntu's default Terminal application, LXTerminal. Plus, the version of Vim on my system didn't come with system clipboard support (???).

Thus I took some steps to make Gnome terminal the default Terminal application and installed Neovim.

**Note:** If you're looking for info on installing plain Vim, see below.

#### Installation

First, we're going to want to install git in order to use vim-plug later: `sudo apt install git`

Next, I went over to [the Ubuntu section of the Neovim installation page](https://github.com/neovim/neovim/wiki/Installing-Neovim#ubuntu)

Assuming I needed this dependency, I probably ran: `sudo apt-get install software-properties-common`

I then chose the unstable version: https://launchpad.net/%7Eneovim-ppa/+archive/ubuntu/unstable 

To add the PPA to my system, I ran 

```
sudo add-apt-repository ppa:neovim-ppa/unstable
sudo apt-get update
```

I then installed Neovim from this PPA by running `sudo apt-get install neovim`. I think the `nvim` command worked after that.


#### Critical changes to Vim config file

First, since on Lubuntu I'm likely only going to use Neovim and not Vim, I renamed my vimrc to `init.vim` and put it in `~/.config/nvim/` (which I may have had to create myself). 

I then changed my [vim-plug](https://github.com/junegunn/vim-plug) call to download my plugins to `~/.config/nvim/plugged`: `call plug#begin('~/.config/nvim/plugged')`

I could have chosen to set vim-plug to download plugins to another directory somewhere in `~/.local/`, which may have kept the `~/.config` directory closer to what I assume is its intended purpose of just being configuration files, and not actual software.

Also, I had to redo this mappings that open my vim config file:

```vim
" Quickly open a vertical split of my VIMRC and source my VIMRC
nnoremap <silent> <leader>ev :vs $MYVIMRC<CR>
nnoremap <silent> <leader>sv :so $MYVIMRC<CR>
```

I also made sure that the following settings were specified in my init.vim: 

```
set termguicolors
set guicursor=
set mouse=
```

Instead of that last one you might need to use `autocmd BufEnter * set mouse=`. It's also a good idea to consult [Neovim's Following Head page](https://github.com/neovim/neovim/wiki/Following-HEAD) to see if anything else might break.

#### System Clipboard

Within Neovim I ran `:CheckHealth` which kindly informed me that to get system clipboard support, I'd need to install a program called [XSel](https://apps.ubuntu.com/cat/applications/xsel/). So back on the terminal I ran `sudo apt install xsel` and then restarted my terminal. 

Then in my `init.vim` I figured out through trial and error that I needed to use the `+` register to access the system clipboard, rather than `*` that I used on MacOS:

```vim
" use leader to interact with the system clipboard
nnoremap <Leader>p "+]p
nnoremap <Leader>P "+]P

nnoremap <Leader>y :y+<cr>
nnoremap <Leader>c ^"+c$
nnoremap <Leader>d ^"+d$

vnoremap <Leader>y "+y
vnoremap <Leader>c "+c
vnoremap <Leader>d "+d
```

Though strangely, custom mappings that use the systemclipboard register still work with the `*` rather than the `+`:

```vim
" place enter file on system clipboard
nnoremap <Leader>a :%y*<cr>

" In markdown files, Control + a surrounds highlighted text with square
" brackets, then dumps system clipboard contents into parenthesis
autocmd FileType markdown vnoremap <c-a> <Esc>`<i[<Esc>`>la](<Esc>"*]pa)<Esc>
```

#### Other Things To Consider

I have Lubuntu installed on an old MacBook, whose track pad sometimes gets triggered when I'm typing. Thus in this Vim configuration I chose to disable my mouse

```vim
" disable mouse
autocmd BufEnter * set mouse=
```


#### Some Notes on Vim (not Neovim)

As of this writing, you can install Vim 7.4.X with something like `sudo apt-get install vim`. To install, Vim 8 currently you need to use [a PPA](http://tipsonubuntu.com/2016/09/13/vim-8-0-released-install-ubuntu-16-04/). 

The 7.4.X version I got from `sudo apt-get install vim` does not come with system clipboard support, and I had trouble getting the clipboard to work with that version of 8 from the PPA, so I went with Neovim. Though you can have both installed, with their own configurations, pretty easily.

### Installing Pip and Magic Wormhole on Lubuntu 16.04

#### Python
Python 2 and Python 3 come with Ubuntu/Lubuntu. `python` calls v 2.7.12 and `python3` calls 3.5.2. 

#### Installing pip
I think you can install regular pip by running: `sudo apt install python-pip` and then upgrading it with `pip install --upgrade pip`. I'm not sure whether, after doing this, pip is tied to python 2 or 3. My guess is v 2, which is fine.

#### Installing Magic Wormhole
To install [magic-wormhole](https://github.com/warner/magic-wormhole#installation), a CLI to "get things from one computer to another, safely", I needed to install some other stuff. They suggest installing all at once with `apt-get install python-pip build-essential python-dev libffi-dev libssl-dev`. I likely could have run that command without `python-pip`.

I was then able to install magic-wormhole with `sudo pip install magic-wormhole`.
