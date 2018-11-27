---
layout: post
title: "Running Syncthing in a tmux Session"
date: 2018-11-27 18:12:30 -0400
comments: true
---

I run [Syncthing](https://syncthing.net/) to keep one of my KeePass databases in sync between multiple computers. (Here's [my "getting started" guide to using Syncthing](https://sts10.github.io/2017/05/24/getting-started-with-syncthing.html).)

Before using tmux, I used to run Syncthing by opening a terminal and running `syncthing -no-browser`, then minimizing that terminal window for the day (the `-no-browser` flag tells Sycnthing not to launch the GUI dashboard in a browser tab). However, using tmux makes this flow a little smoother. 

Our goal here is to run Syncthing "in the background", so that we don't have to keep a terminal window open with it running all the time. We also want to preserve the ability to easily stop Syncthing if we need to.

First, let's install [tmux](https://github.com/tmux/tmux). On macOS, I used Homebrew and ran `brew install tmux`. On Linux, `sudo apt-get install tmux`. Here's ["A Gentle Introduction to tmux"](https://hackernoon.com/a-gentle-introduction-to-tmux-8d784c404340) that I found helpful, but for this tutorial you'll mostly be copying and pasting tmux commands into bash functions.

Next, let's create a tmux config file: `touch ~/.tmux.conf`. Enter this code into that file:

```
# in ~/.tmux.conf

# Neovim color help (https://github.com/neovim/neovim/issues/7764#issuecomment-411995268)
set -g terminal-overrides ',xterm-256color:Tc'
set -g default-terminal "tmux-256color"
set -as terminal-overrides ',xterm*:sitm=\E[3m'


# Set Neovim escape delay to 0 milliseconds (https://github.com/neovim/neovim/wiki/FAQ#esc-in-tmux-or-gnu-screen-is-delayed) 
set -sg escape-time 0
```

Next, in your `~/.bash_profile` or `~/.bashrc`, add these two functions:

```bash
# in ~/.bash_profile or ~/.bashrc
function ss {
  echo "Starting up Syncthing at http://127.0.0.1:8384/"
  tmux new-session -d -s synct
  tmux send-keys -t synct "syncthing -no-browser" Enter
}

function se {
  echo "Stopping Syncthing and killing the tmux session"
  tmux send-keys -t synct C-c
  tmux kill-session -t synct
}
```

Run `tmux source-file ~/.tmux.conf` and then `source ~/.bash_profile` or `source ~/.bashrc`

Now you should be able to run `ss` in your terminal to Start Syncthing, and `se` to end Syncthing ("Syncthing End"). 

So for me, when I boot up any of my computers, I just run `ss` in a terminal window. Syncthing runs in a tmux session, so I can either use that terminal window for something else or safely close it. If I need to stop Syncthing for any reason (which is rare) I can run `se`.


