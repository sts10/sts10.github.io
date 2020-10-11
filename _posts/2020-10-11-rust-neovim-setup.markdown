---
layout: post
title: "Notes on my Rust + Neovim setup (2020)"
date: 2020-10-11 14:46:00 -0400
comments: true
---

I've been writing a fair amount of mediocre Rust in Neovim. I finally have a setup I like, but to be honest I'm not _entriely_ sure how to reproduce it on a fresh machine. This post represents my best-effort at reproducing the procedure I'd take on a new machine, for when I need to in the future. It is ugly and confusing! If you have ideas for how to simiplify it, or see redundancies, please let me know on [Twitter](https://www.twitter.com/sts10) or [Mastodon](https://octodon.social/@schlink)!

This assumes you have [Neovim](https://github.com/neovim/neovim/wiki/Installing-Neovim) installed already.

## What I'm using

I'm using Kubuntu 18.04 (Linux) and Neovim 0.4.4. I use [vim-plug](https://github.com/junegunn/vim-plug) to manage my plugins.

## Installing some components for this setup

1. [Install Rust](https://www.rust-lang.org/en-US/install.html). Make sure to add `export PATH="$HOME/.cargo/bin:$PATH"` to end of `~/.bashrc`. Note: you can uninstall at anytime with `rustup self uninstall`.

2. Install [rustfmt](https://github.com/rust-lang-nursery/rustfmt) 

3. Install the [Rust.vim plugin](https://github.com/rust-lang/rust.vim#formatting-with-rustfmt). I use vim-plug, so that means putting `Plug 'rust-lang/rust.vim'` in my init.vim and running `:PlugInstall`.

4. Check if you have [Rust Clippy](https://github.com/rust-lang-nursery/rust-clippy#usage) installed. If you can run `cargo clippy` on a project, you do have it installed. If you need to install it, you likely do that with `rustup component add clippy`.

## Getting Autocomplete in Neovim with Deoplete 

Install [Deoplete](https://github.com/Shougo/deoplete.nvim#install). This may be difficult! 

For example, you may first be required to install a working Python environment. If you're new to that, I'd point you to [pyenv](https://github.com/pyenv/pyenv-installer) or [pipx](https://pypi.org/project/pipx/). However, in a pinch, these commands have worked for me in the past: 

```bash
# Install pip3 with 
sudo apt-get install python3-pip 
# install the pip package for Neovim
pip3 install neovim 
```

Then make sure you've got all this (or something similar) in your init.vim file:

```vim
" Auto-complete
if has('nvim')
  Plug 'Shougo/deoplete.nvim', { 'do': ':UpdateRemotePlugins' }
else
  Plug 'Shougo/deoplete.nvim'
  Plug 'roxma/nvim-yarp'
  Plug 'roxma/vim-hug-neovim-rpc'
endif

" then further down
let g:deoplete#enable_at_startup = 1
```

## rust-analyzer and LanguageServer

To get some nice Rust-specific, IDE-esque goodies in Neovim, we're going to install [rust-analyzer](https://rust-analyzer.github.io/manual.html). Below, I outline the [relatively simple installation option that uses LanguageClient-neovim](https://rust-analyzer.github.io/manual.html#languageclient-neovim), though do check documentation for latest instructions.

### 1. Install rust-analyzer Language Server Binary

[Install rust-analyzer Language Server Binary](https://rust-analyzer.github.io/manual.html#rust-analyzer-language-server-binary) by running the following:

```bash
git clone https://github.com/rust-analyzer/rust-analyzer.git && cd rust-analyzer
cargo xtask install --server
```

The relevant executable is `rust-analyzer`, so can check that it's in your PATH by running `rust-analyzer --version`. 

This method appears to install the crate in `~/.config/nvim/rust-analyzer/`. Not entirely sure how or if we need to keep this thing up-to-date... I guess a `git pull && cargo xtask install --server`?

### 1.5 rust-src?

It's unclear if you need `rust-src` to be installed at this point. To do that, try:

```bash
rustup component add rust-src
```

### 2. Get the neovim LanguageClient installed

```vim
Plug 'autozimu/LanguageClient-neovim', {
\ 'branch': 'next',
\ 'do': 'bash install.sh',
\ }

" (Optional) Multi-entry selection UI.
Plug 'junegunn/fzf'
```

### 3. Configure rust-analyzer by adding this to your init.vim config file

```vim
let g:LanguageClient_serverCommands = {
\ 'rust': ['rust-analyzer'],
\ }
```

If you already have a Rust-specific line that looks like this in your init.vim file, **replace it** with these lines.

Then below this in init.vim, let's add some mappings. The [plugin's readme provides some ideas](https://github.com/autozimu/LanguageClient-neovim#quick-start), but as a minimum:

```vim
nmap <F5> <Plug>(lcn-menu)
```

### 4. Actually install these plugins

Back in the terminal, run `nvim +PlugInstall +UpdateRemotePlugins +qa`

## init.vim when we're done

Think you should now be good-to go? F5 will give you some options for analysis. 

Maybe the above was a bit of tortuous explanation, especially with regard to what to put in your initi.vim file. So here's all the relevant lines in my init.vim in one block: 

```vim
call plug#begin('~/.config/nvim/plugged')

" ...

" autocomplete
if has('nvim')
  Plug 'Shougo/deoplete.nvim', { 'do': ':UpdateRemotePlugins' }
else
  Plug 'Shougo/deoplete.nvim'
  Plug 'roxma/nvim-yarp'
  Plug 'roxma/vim-hug-neovim-rpc'
endif

" Language Server Client
Plug 'autozimu/LanguageClient-neovim', {
\ 'branch': 'next',
\ 'do': 'bash install.sh',
\ }
let g:LanguageClient_serverCommands = {
\ 'rust': ['rust-analyzer'],
\ }

" For improved UI
Plug 'junegunn/fzf'


Plug 'rust-lang/rust.vim',         { 'for': 'rust' }

call plug#end()
" ...

" Configure deoplete
let g:deoplete#enable_at_startup = 1

" note that if you are using Plug mapping you should not use `noremap` mappings.
nmap <F5> <Plug>(lcn-menu)
" Or map each action separately
" nmap <silent> <F2> <Plug>(lcn-rename)
autocmd FileType rust nmap <silent> gr <Plug>(lcn-rename)
" nmap <silent>K <Plug>(lcn-hover)
" nmap <silent> gd <Plug>(lcn-definition)

" Configure Rust formatter https://github.com/rust-lang/rust.vim#formatting-with-rustfmt
" autocmd Filetype rust nnoremap == :RustFmt<CR>
let g:rustfmt_autosave = 1
```

## Notes on alternative approaches to making Neovim more of a Rust IDE

### Alternative methods of installing rust-analyzer

For rust-analyzer, there is [an alternative installation process described](https://rust-analyzer.github.io/manual.html#coc-rust-analyzer) where it's integrated with [coc.nvim](https://github.com/neoclide/coc.nvim), which you might be using anyway, or like for its other features. To me, right now, it seems a bit intense, and requires Node to be installed.

### Racer

There also seems to be another way to "teach" Neovim about the Rust language using [**Racer** ("code completion for Rust")](https://github.com/racer-rust/racer) and its [associated Vim plugin](https://github.com/racer-rust/vim-racer). I tried this once and it kept throwing halting errors as I was typing code.
