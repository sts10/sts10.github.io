+++
title= "True HEX Colors with Neovim and iTerm2"
date= "2015-10-24 14:05:03 -0400"
comments = "true"
+++

**Note: I've written [an updated version of this post that shows how to get true colors with terminal Vim or Neovim and iTerm2](https://sts10.github.io/post/2016-06-14-true-hex-colors-in-vim-with-iterm2/)**

For a few weeks now, I've been picking at the problem of getting "true" colors in Neovim, as the creators [tout on the official website](https://neovim.io/). I understood that I would probably need to use a terminal emulator rather than OS X's default Terminal app, and I knew one such emulator was called [iTerm2](https://www.iterm2.com/). I also understood that I'd need to put some settings in my nvim config file (wherever that is these days), or a "nvim section" of my symlinked `.vimrc`. 

However this configuration didn't "just work," as I hoped it would at least, and it frustrated me to no end. But! Today I seem to have figured it out, and I figured I'd put it up here on the blog for next time I need to do it, or in case anyone else had the same problem as me. 

<!-- more -->

## My Goal

I made a decent colorscheme for Vim called [Mustard](https://github.com/sts10/vim-mustard) (it's based on my favorite theme for Sublime Text, which is also called [Mustard](http://colorsublime.com/theme/Mustard)). 

In that Vim colorscheme file, following the pattern of another such file, I entered both a set of hex color codes and assigned variables like `s:cterm08`. My understanding, still, is that you specify the hex color codes for when they can be used (GUI), then as a fall back, you tell the colorscheme to rely on the user's terminal to color different parts of code syntax. 

It's my view that a setup that uses the hex color codes is infinitely preferable for 2 reasons: (1) You get a far larger variety of colors to use in your theme, and (2) the theme always appears the same, no matter the user's terminal color preferences. 

The first way I made a setup that used the hex color codes in a Vim colorscheme was by using [MacVim](https://sts10.github.io/post/2015-08-07-from-terminal-vim-to-mac-vim/). But given the advantages of Neovim (some which I read about in [this blog post](http://geoff.greer.fm/2015/01/15/why-neovim-is-better-than-vim/)), and its advertisement of true (read: hex) colors, I wanted to figure out how to get my precious hex colors in Neovim and/or the terminal somehow. 

Part of this desire was to try to get my day-to-day Vim usage back into a terminal, since that feels more authentic and may be the only way to use Vim when working on a remote box. Maybe I'll compare the current pros and cons below. 

## How I Did It

First, assuming you're running OS X 10.8 or higher and want to use [iTerm2](http://iterm2.com/), you currently need to download and install either the recommended test release, iTerm2 2.0.20160206 beta ([dmg direct download](https://iterm2.com/downloads/beta/iTerm2-2_9_20160206.zip)), iTerm2 2.9.20160113 beta (OS 10.8+) ([dmg direct download](https://iterm2.com/downloads/beta/iTerm2-2_9_20160113.zip)), or a [Nightly](http://iterm2.com/downloads/nightly/#/section/home) build of iTerm2. This had been my problem for the last few weeks-- I was using the standard-issue release of iTerm2, which doesn't support what I had been trying to do at this point at least.

Once that's installed, it's mostly a matter of tweaking some settings. In your shiny new iTerm2 Beta/Nightly:

iTerm2 > Preferences > Profiles > Terminal > set Report Terminal Type "xterm-256color"

Then in iTerm 2 > Preferences > Profiles > Text

1. Uncheck "Draw Anti-alias text with thin strokes"
2. Have both fonts be anti-aliased
3. (Optional:) Set Cursor to "Box" and turn on blinking (helpful in Vim).

Then in your `~/.vimrc` (or your nvim config file, without the if statement I suppose):

```
if has("nvim")
  set termguicolors
endif 
```

**UPDATE:** In earlier versions of Neovim the setting to set here was `let $NVIM_TUI_ENABLE_TRUE_COLOR=1`, however as of [05/11/2016](https://github.com/neovim/neovim/wiki/Following-HEAD#20160511) you need to have `set termguicolors` in your vim config file. (I'm running version `NVIM v0.1.5-172-gd02cfe8` and need to use `set termguicolors` rather than the `TUI` line.) The code block above has been updated to reflect the change.

On fonts: Whatever you have guifont set to in your vimrc still won't work-- iTerm2 will use the font that's set in Preferences. 

## Neovim's Terminal Emulator

As if this isn't confusing enough, Neovim has [a terminal emulator built inside of it](https://neovim.io/doc/user/nvim_terminal_emulator.html). In fact it's another one of Neovim's big advantages over normal Vim. 

From somewhere I saw that you can define the colors for this emulator with hex color codes in you `.vim` colorscheme file as such: 

```
" These are supposedly colors for Neovim's terminal emulator

let g:terminal_color_0 = "#202020"
let g:terminal_color_1 = "#333333"
let g:terminal_color_2 = "#666666"
let g:terminal_color_3 = "#80a78c"
let g:terminal_color_4 = "#f7c527"
let g:terminal_color_5 = "#ffffff"
let g:terminal_color_6 = "#333333"
let g:terminal_color_7 = "#ffffff"
let g:terminal_color_8 = "#ec691e"
let g:terminal_color_9 = "#73e4f6"
let g:terminal_color_10 = "#ffffff"
let g:terminal_color_11 = "#a1d7f2"
let g:terminal_color_12 = "#73e4f6"
let g:terminal_color_13 = "#f7c527" 
let g:terminal_color_14 = "#ec691e"
let g:terminal_color_15 = "#f7c527"
let g:terminal_color_16 ="#202020"
let g:terminal_color_background="#202020"
let g:terminal_color_foreground="#eee"
```

I haven't played around with this too much yet, but it seems to work with the setup described in this post!

## Lingering Issue(s)

The `if` statement in my `vimrc` is not smart enough to NOT run that `set termguicolors` line when I'm running ol' fashioned default OS X Terminal, so now when I run Neovim there all the colors are totally fucked. Ideally my `vimrc` would be smart enough to use Terminal's given colors when running Neovim. 

I'm betting there's some conditional I can add to that if statement to accomplish this, but I don't know it at this point. 

## Lingering Disadvantages to iTerm Beta/Nightly + Neovim as compared to MacVim

1. iTerm cannot detect key inputs shift + space or shift + enter, [as far as I can tell](http://stackoverflow.com/a/281484/3160994). I recently mapped `<Space>` to use [vim-sneak](https://github.com/justinmk/vim-sneak) in [my vimrc](https://github.com/sts10/terminal_and_vim_settings/blob/master/vimrc), which is pretty aggressive/awesome, but it is super natural to make `<S-Space>` set to Sneak `S`. Same goes for `<C-Space>` and `<C-Enter>` I think.

2. Mouse use. Though this is something I should not use at all anyway. 

3. Interactions with system clipboard. It is not yet clear to me if the combinations of Neovim's saner defaults and my `vimrc` are enough to make interactions with the system clipboard as fluid in iTerm Beta/Nightly + Neovim as they are in MacVim. Maybe they are-- I'll have to try it out.

*Note:* You can find instructions for [how to install Neovim here](https://github.com/neovim/neovim/wiki/Installing-Neovim).

## Update (2/12/2016) 

In terms of those three "lingering disadvantages," I've overcome (2) and (3) but not really (1). However in iTerm (`Build 2.9.20160206` at least) it seems that Neovim can accept maps of Shift + Tab. I map Tab and Shift + Tab to the Sneak plugin as follows: 

```
nmap <Tab> <Plug>Sneak_s
nmap <S-Tab> <Plug>Sneak_S
vmap <Tab> <Plug>Sneak_s
vmap <S-Tab> <Plug>Sneak_S
```

What's a little strange is that when I try to use `nnoremap` rather than `nmap` these mappings don't work. Not a huge deal though. 

## Another Nice Preference Change to iTerm2

This has nothing to do with colors or even Vim, but! To allow iTerm2 to expand correctly and smoothly in OS X, go to Preferences -> Advanced, and look for "Terminal windows resize smoothly". Change this to "Yes" (h/t [this Reddit comment](https://www.reddit.com/r/vim/comments/4clr3d/bleeding_bottom_and_right_edges_of_vim_how_to_fix/d1jkpvg)).
