+++
title= "Neovim, An Open-Source Project"
date= "2015-08-11 21:38:40 -0400"
comments = "true"
+++

When I was moving around [Watch People Code](http://www.watchpeoplecode.com/) the other day while figuring out how to livestream my work on [a new project](http://sts10.github.io/blog/2015/08/07/from-terminal-vim-to-mac-vim/), I found a interview by the site's administrator, [Alexander Putilin](https://github.com/eleweek), with [Justin M. Keyes](https://github.com/justinmk), a contributor to an open-source project called [Neovim](http://neovim.io/). 

<!-- more -->

Here's the [video of the interview](https://www.youtube.com/watch?v=R7z2GQr9-tg):

<iframe width="520" height="390" src="https://www.youtube.com/embed/R7z2GQr9-tg" frameborder="0" allowfullscreen></iframe>

Neovim is a new version of a classic text editor called Vim, which I've become more interested in the last few months. 

It's an interesting interview as it offers a view into the problems and joys of running a loosely-organized open source project, with references to something he calls "the trust model." 

But for me two specific points from Keyes stuck out to me: 

1. At about 16:20 in the YouTube video he talks about the notion of "intuition" and "taste," citing [Linus Torvald](https://en.wikipedia.org/wiki/Linus_Torvalds). 

2. At 25:50 Keyes talks about how if you've [edited your vimrc file](http://sts10.github.io/blog/2015/02/18/text-file-preferences/)-- even just to add a custom key mapping, you're effectively a plug-in author. I think it's smart to erase the somewhat artificial line between those who package their vimscript functions and key mappings into plug-ins and someone who just adds their own key mappings and vimscript functions to their vimrc files. 

For example, I'm super-satisfied with [my little Markdown keymap](http://sts10.github.io/blog/2015/08/02/markdwon-hyperlink-remap-for-vim/) that I wrote the other day, and I'd be happy to offer it to others who had the same problem/need as I did when I wrote it. And of course, I'd be excited to see how they'd improve it. 

By the way, here are [the instructions I followed to install Neovim](https://github.com/neovim/homebrew-neovim/blob/master/README.md) on my machine using [Homebrew](http://brew.sh/). Apparently it's pretty stable as of this summer. 

Note that when you install (via Homebrew at least), in the console window it gives you two suggested commands for linking your current `.vimrc` file and `.vim` directory to where Neovim will look for these files, and it worked like clockwork for me. Here they are:

```
The Neovim executable is called 'nvim'. To use your existing Vim
configuration:
    ln -s ~/.vimrc ~/.nvimrc
    ln -s ~/.vim ~/.nvim
See ':help nvim' for more information on Neovim.
```

But for now I'm still going steady with [MacVim](http://sts10.github.io/blog/2015/08/07/from-terminal-vim-to-mac-vim/). 

*Update:*

Due to [a recent change to Neovim's master branch](https://github.com/neovim/neovim/commit/6b4063fafe5401b95d1f35ecb7f8dfe0079b7450), the above symlinks are no longer correct. 

See [this Reddit thread](https://www.reddit.com/r/neovim/comments/3qgsza/psa_if_neovim_stopped_loading_your_nvimrc_after/), which points to [issue #78](https://github.com/neovim/neovim/issues/78), for more information.

Here are the new symlinks I ran. They seem to have brought everything back to normal.

```
ln -s ~/.vimrc ~/.config/nvim/init.vim
ln -s ~/.vim ~/.config/nvim
```

Interesting that they'd push such a significant change to master. Guess that's part of the thrill of using pre-release software!
