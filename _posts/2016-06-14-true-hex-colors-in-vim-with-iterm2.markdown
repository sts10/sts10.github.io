+++
title= "True (HEX) Colors in Vim with iTerm2 3.0.1"
date= "2016-06-14 20:59:32 -0400"
comments = "true"
+++

Last fall I was delighted to figure out [how to get true HEX colors with Neovim and iTerm2](http://sts10.github.io/blog/2015/10/24/true-hex-colors-with-neovim-and-iterm2/). However I have recently learned that you can have these same colors available in regular old terminal Vim (aka command line Vim) and iTerm2. 

<!-- more -->

In April Vim merged [patch 7.4.1799, which appears to simplify settings for using true colors in the terminal](https://groups.google.com/forum/#!topic/vim_dev/mAhjlVqpKts). After upgrading to this patch, users simply had to include `set termguicolors` in their vimrc to get true colors in the terminal-- the one caveat being that it has to be a terminal like iTerm2 that also supports "true colors". [Here's a list of other terminal emulators that support "truecolor"](https://gist.github.com/XVilka/8346728#now-supporting-truecolour).

To be honest it's unclear to me if users could get true colors in the terminal before this Vim patch was applied. But I do know that in Vim 7.4.1799 and above, the setting (when used with recent versions of iTerm2) gave me true colors running regular Vim (as opposed to Neovim) in iTerm2, something that I had previously thought only possible using either MacVim or Neovim+iTerm2.

## How To Get True Colors with Regular Terminal Vim and iTerm2

Anyway, if you only ever use iTerm2 and never OS X's Terminal app and want true colors in regular Vim:

1. [Upgrade to the confusingly-named iTerm2 3.0.4](https://iterm2.com/downloads.html).
2. If necessary, upgrade your terminal Vim to 7.4.1799 or higher ([I recommend using Homebrew to do this](https://github.com/sts10/terminal_and_vim_settings#flavors-of-vim), though I'm not totally confident that this method is without downsides)
3. Put `set termguicolors` in your vimrc. 

If you only want to run this setting when using iTerm, wrap it in this nifty if statement that [Chris Lesage](https://twitter.com/chrislesage) was nice enough to [leave in a comment](http://sts10.github.io/blog/2015/10/24/true-hex-colors-with-neovim-and-iterm2/#comment-2632598645) on my previous blog post:

```vim
" gui colors if running iTerm
if $TERM_PROGRAM =~ "iTerm"
  set termguicolors
endif
```

The above 3 lines are what I now use in my vimrc. The advantage of using the if statement is that if you do use your vimrc in OS X's Terminal app, your colors are at least readable, rather than totally messed up if you do execute `set termguicolors` without your terminal supporting guicolors. 

## MacVim vs. terminal Vim

Now that I can get true colors on a fresh machine by simply installing iTerm2 and a fresh version of terminal Vim, I'm tempted to revisit an old question of whether to prefer a GUI version of Vim like [MacVim](https://github.com/macvim-dev/macvim/releases/) or terminal Vim. To me there seem to be real advantages and disadvantages to both approaches, as seen by the [healthy amount discussion of this question on the internet](https://www.google.com/webhp?sourceid=chrome-instant&ion=1&espv=2&ie=UTF-8#q=vim%20gui%20or%20terminal). My approach these days is to stay comfortable in both, though I will say that as I use either version more, I am (a) using the mouse less and (b) growing more comfortable with my Vim mappings that deal with the system clipboard in relatively predictable ways.  

## What about Neovim

A month after the Vim patch, [Neovim merged patch 7.4.1799](https://github.com/neovim/neovim/pull/4690), following the new `set termguicolors` name for the setting. In other words, the same setting will work if you're running Neovim and iTerm2. No need to use an `if has("nvim")` statement for different settings to get true colors.  

## The Last Frontier

As you may have gathered, I have yet to figure out how to get true colors in terminal Vim _when using OS X's default Terminal app_ (as opposed to iTerm2). Hopefully that makes sense. If you know how to do this, leave a comment! Perhaps it's a matter of me updating my Terminal application, which is 2.5.3 (343.7). 
