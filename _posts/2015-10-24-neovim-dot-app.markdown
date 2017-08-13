+++
title= "Neovim dot app"
date= "2015-10-24 11:22:23 -0400"
comments = "true"
+++

I was lurking in the [Neovim Gitter room](https://gitter.im/neovim/neovim) this morning and saw someone drop in a link to [this page on projects related to Neovim](https://github.com/neovim/neovim/wiki/Related-projects). 

Among the related projects was a Mac OS X GUI called [Neovim dot app](https://github.com/rogual/neovim-dot-app). Every since [my adoption of MacVim](http://sts10.github.io/blog/2015/08/07/from-terminal-vim-to-mac-vim/) I've learned to enjoy the practical advantages of using a GUI of vim for everyday use (though I've been careful to try not to learn or rely to heavily upon practices that will not work in Terminal vim). Thus I was willing to give this GUI (seemingly the most-developed Mac OS X GUI listed on the related-projects page) a try, even though it's pretty clear there are a good number of outstanding [bugs and issues](https://github.com/rogual/neovim-dot-app/issues).

<!-- more -->

## Installation

As described in [the project's GitHub readme](https://github.com/rogual/neovim-dot-app), I ran the following commands to install the app:

```
brew tap neovim/neovim
brew tap rogual/neovim-dot-app
brew install --HEAD neovim-dot-app
```

This installs the program into the following directory: `/usr/local/Cellar/neovim-dot-app` (which I found by running the helpful Homebrew command: `brew info neovim-dot-app`).

To use Homebrew to create a link (like a shortcut) to Neovim dot app in you `Applications/` directory, run: `brew linkapps neovim-dot-app`. 

## Not Working

While I'm pretty sure I installed the app correctly, I'm having some trouble opening files. The most common way that I open files with my text editors is by the command line... more on this below. 

I CAN open files with this Neovim app by using Command-o when the app is open.

However, for example, when I drag a .html file onto the Neovim app icon in the Homebrew folder, I get the following error message:

`The document "test.html" could not be opened. Neovim cannot open files in the "HTML text" format.`

This is an almost identical error to the one [described in this issue](https://github.com/rogual/neovim-dot-app/issues/146), and it appears that there's [an open pull request that attempts to address the problem](https://github.com/rogual/neovim-dot-app/pull/127).

As for a command line tool similar to MacVim's: per [issue #146](https://github.com/rogual/neovim-dot-app/issues/146) and [PR #127](https://github.com/rogual/neovim-dot-app/pull/127) it looks like the contributors want to use a bash command something like `open -a Neovim --args <filename>` to open a given file from the command line. This command was flaky for me, though they seem to be working on it. There's also what looks like [a first attempt at a command line tool](https://github.com/rogual/neovim-dot-app/issues/162).

I'll try to keep an eye on the project and keep my version up-to-date (which I assume I do by running `brew reinstall --HEAD neovim-dot-app`, similar to [how NeoVim itself is upgraded via Homebrew](https://github.com/neovim/homebrew-neovim/blob/master/README.md).

### Update (11/13/2015) 

I just reinstalled neovim dot app by running `brew reinstall --HEAD neovim-dot-app`. (Note that I did not to run the `brew linkapps neovim-dot-app` line again.) I'm not sure exactly what version I got upgraded to, it seems much more stable than the version I first installed. Also, I found that it does now come with a command line launcher, invoked by using `gnvim` from the command line, so for example `gnvim .` or `gnvim <filename>`. Seems to work OK!
