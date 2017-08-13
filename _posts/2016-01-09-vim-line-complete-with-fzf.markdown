+++
title= "Vim Line Completion with FZF"
date= "2016-01-09 21:10:06 -0500"
comments = "true"
+++

On [r/vim](http://reddit.com/r/vim) and [r/neovim](https://www.reddit.com/r/neovim) I've heard a lot about [fzf](https://github.com/junegunn/fzf), "A command-line fuzzy finder written in Go" by [junegunn](https://github.com/junegunn) that plays well with Vim and Neovim. 

But I was finally inspired by [this blog post](http://tilvim.com/2016/01/06/fzf.html), which shows how you can use fzf to enable linewise completion in Vim, a feature I'd been looking to figure out for a bit.

<!-- more -->

![Vim GIFs FTW](http://tilvim.com/img/fzflinewise.gif)

It works OK! But mostly I wanted to write this down as an installation guide.

## On Vim's built-in line-completion

So after doing all this and writing this post I found out that Vim has a built-in insertion mode line complete function, which by default is invoked by `<C-x><C-l>`. I believe, like its word-wise companions, it only searches the current buffer. But it's certainly far easier to get up and running than fzf, if indeed all you're looking for is line-completion (and you can settle for only searching the current buffer as opposed to all open buffers).

I successfully remapped this command to `<S-Tab>` (shift + tab), which I think works logically with [Super-Tab](https://github.com/ervandew/supertab). 

```
inoremap <S-Tab> <C-x><C-l>
```

But! If you want your linewise auto-complete to search all open buffers, or if you want fzf for its many other features, here's how I installed it. 

## Installing fzf

First, from fzf repo, I [installed fzf using git and GitHub](https://github.com/junegunn/fzf#using-git-recommended). That apparently installs fzf on my system, the `fzf` executable, some Shell extensions, and the Vim/Neovim plugin. 

## fzf Install Script Targets .bashrc, but not .bash_profile

Now here's where it went off the rails for me a bit. When I installed fzf (`~/.fzf/install`), I noticed that the [install script](https://github.com/junegunn/fzf/blob/master/install) edited `~/.bashrc`. It added the following line:

```bash
[ -f ~/.fzf.bash ] && source ~/.fzf.bash
```
On my system though, up until today, when I make changes concerning bash I edited `~/.bash_profile`. That may not be orthodox, but it's how it worked for me. However I figured that if junegunn was targeting `bashrc` here it's probably something I should source in my `bash_profile`. I accomplished this by adding the following lines to the end of my `~/.bash_profile` (having consulted [this blog post](http://www.joshstaiger.org/archives/2005/07/bash_profile_vs.html)):

```bash
if [ -f ~/.bashrc ]; then
  source ~/.bashrc
fi
```

I guess the fzf install script makes the assumption that the `.bashrc` is sourced in `~/.bash_profile`, which isn't that crazy of an assumption, but still one that wasn't true for me when I began the installation process.

## Vim

But then I think I needed [vim-plug](https://github.com/junegunn/vim-plug) (also written by junegunn!) to manage this thing, so I ended up adding these two lines to my .vimrc, one for [fzf](https://github.com/junegunn/fzf) and another for [fzf.vim](https://github.com/junegunn/fzf.vim).

```
Plug 'junegunn/fzf', { 'dir': '~/.fzf', 'do': './install --all' }
Plug 'junegunn/fzf.vim'
```


Then, for the line-completion, I added: 

```
imap <C-f> <plug>(fzf-complete-line)
```

So now, in insert mode, I can press control + f and fzf will run line-completion. I wanted to map it to `<S-Tab>` (shift + tab), but I coudln't get it to work reliably in terminal Neovim. 

If it finds multiple matches in open buffers it opens a small horizontal split on the bottom for me to choose from. 

Since fzf doesn't seem to work in MacVim (only in Neovim?), I put this remapping into my `if has("nvim")` conditional. 

```
if has("nvim")
  imap <S-Tab> <plug>(fzf-complete-line)
endif
```

I guess I'd ideally make a new `if` statement for `if has("fzf")`, but I tried that and couldn't get it to work. 

Since fzf opens in a `terminal` window in Neovim, I also freshened up my `tmap` settings in my `vimrc` to make that navigation a bit easier. (Note: Elsewhere I have `<Space><Space>` mapped to `<C-w><C-p>`, which goes to previous window.)

```
if has("nvim")
  tnoremap <Space><Space> <C-\><C-n><C-w><C-p>
  tnoremap <Esc><Esc> <C-\><C-n>:q<CR>

  autocmd BufWinEnter,WinEnter term://* startinsert
  autocmd BufLeave term://* stopinsert
 
  imap <S-Tab> <plug>(fzf-complete-line)
endif
```

On r/neovim some users have [shared their fzf/vim configurations](https://www.reddit.com/r/neovim/comments/3oeko4/post_your_fzfvim_configurations/). Here's [a simple one](https://github.com/euclio/vimrc/blob/master/plugins.vim#L207) to use fzf as you would use [ctrlp](http://github.com/ctrlpvim/ctrlp.vim): 

```
" Fuzzy file finder
Plug 'junegunn/fzf', { 'dir': $XDG_DATA_HOME . '/fzf', 'do': 'yes n \| ./install' }
let g:fzf_action = {
      \ 'ctrl-s': 'split',
      \ 'ctrl-v': 'vsplit'
      \ }
nnoremap <c-p> :FZF<cr>
```

I still have some exploring to do, but I wanted to get this down, since I didn't find the fzf installation instructions super clear.
