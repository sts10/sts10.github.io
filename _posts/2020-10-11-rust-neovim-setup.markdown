---
layout: post
title: "Notes on my Rust + Neovim setup (2020)"
date: 2020-10-11 14:46:00 -0400
comments: true
---

I've been writing a fair amount of mediocre Rust in Neovim. I finally have a setup I like, but to be honest I'm not _entirely_ sure which components I've install do what, or if I've listed all of the necessary components to reproduce that setup below.  

This post represents my best-effort at reproducing the procedure I'd take to get my current setup on a new machine, for when I need to in the future. I broke it into two versions: The first presents a BASH script and a section of my init.vim file (what Neovim uses in place of Vim's vimrc). The second is a more written-out version of the same procedure.

If you have ideas for how to simplify it, or see redundancies, please let me know on [Twitter](https://www.twitter.com/sts10) or [Mastodon](https://hachyderm.io/@schlink)!

## What I'm using

I'm using Kubuntu 18.04 (Linux) and Neovim 0.4.4. I use [vim-plug](https://github.com/junegunn/vim-plug) to manage my plugins.

## Install necessary programs

Assuming you have [Rust installed](https://www.rust-lang.org/tools/install) already (the installation process seems to change over time, so I won't paste the current process here), via `rustup`, here's a BASH script to install all the programs we'll be using:

```bash
#!/bin/bash

if ! command -v rustup &> /dev/null
then
    echo "rustup command could not be found. Install Rust via rustup and try running this script again."
    exit
fi

# Only works for Ubuntu 18.04+
sudo apt install neovim
sudo apt install python-neovim
sudo apt install python3-neovim
# alt:
# pip3 install neovim pynvim

rustup component add clippy
rustup component add rustfmt
rustup component add rust-src


# https://rust-analyzer.github.io/manual.html#rust-analyzer-language-server-binary
git clone https://github.com/rust-analyzer/rust-analyzer.git && cd rust-analyzer
cargo xtask install --server
cd ..
rm -rf rust-analyzer
```

If `python3-neovim` didn't install correctly, or you are running a version of Ubuntu older than 18.04, you may need to install `pip` and use that to run `pip3 install pynvim neovim`.

I'd point you to [pyenv](https://github.com/pyenv/pyenv-installer) or [pipx](https://pypi.org/project/pipx/). However, in a pinch, these commands have worked for me in the past: `sudo apt-get install python3-pip && pip3 install pynvim neovim`

## Install vim-plug

If you already have a plugin manager for Neovim that you use and like, use that. If you don't have one installed you'll need one. I like [vim-plug](https://github.com/junegunn/vim-plug#installation).

## Now add this to your init.vim 

In `~/.config/nvim/init.vim`, paste the following:

```vim
call plug#begin('~/.config/nvim/plugged')

" ... other plugins here

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

Now, in Neovim, run `:PlugInstall` and then `:UpdateRemotePlugins`. Alternatively, if you want to do this from the command line you can run: `nvim +PlugInstall +UpdateRemotePlugins +qa`

Next, while still in Neovim, run `:CheckHealth` to check the "health" of Neovim.

-----

## Things to look forward to

From [rust-analyzer documentation](https://rust-analyzer.github.io/manual.html#nvim-lsp):

> NeoVim 0.5 (not yet released) has built-in language server support. For a quick start configuration of rust-analyzer, use [neovim/nvim-lsp](https://github.com/neovim/nvim-lsp#rust_analyzer). Once neovim/nvim-lsp is installed, use lua require'nvim_lsp'.rust_analyzer.setup({}) in your init.vim.

## Longer version of same/similar process 

If you want the slightly older, more written-out description of what we're doing.

### Installing some components for this setup

1. [Install Rust](https://www.rust-lang.org/en-US/install.html). Make sure to add `export PATH="$HOME/.cargo/bin:$PATH"` to end of `~/.bashrc`. Note: you can uninstall at anytime with `rustup self uninstall`.

2. Install [rustfmt](https://github.com/rust-lang-nursery/rustfmt) 

3. Install the [Rust.vim plugin](https://github.com/rust-lang/rust.vim#formatting-with-rustfmt). I use vim-plug, so that means putting `Plug 'rust-lang/rust.vim'` in my init.vim and running `:PlugInstall`.

4. Check if you have [Rust Clippy](https://github.com/rust-lang-nursery/rust-clippy#usage) installed. If you can run `cargo clippy` on a project, you do have it installed. If you need to install it, you likely do that with `rustup component add clippy`.

### Getting Autocomplete in Neovim with Deoplete 

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

### rust-analyzer and LanguageServer

To get some nice Rust-specific, IDE-esque goodies in Neovim, we're going to install [rust-analyzer](https://rust-analyzer.github.io/manual.html). Below, I outline the [relatively simple installation option that uses LanguageClient-neovim](https://rust-analyzer.github.io/manual.html#languageclient-neovim), though do check documentation for latest instructions.

#### 1. Install rust-analyzer Language Server Binary

[Install rust-analyzer Language Server Binary](https://rust-analyzer.github.io/manual.html#rust-analyzer-language-server-binary) by running the following:

```bash
git clone https://github.com/rust-analyzer/rust-analyzer.git && cd rust-analyzer
cargo xtask install --server
```

The relevant executable is `rust-analyzer`, so can check that it's in your PATH by running `rust-analyzer --version`. 

This method appears to install the crate in `~/.config/nvim/rust-analyzer/`. Not entirely sure how or if we need to keep this thing up-to-date... I guess a `git pull && cargo xtask install --server`?

#### 1.5 rust-src?

It's unclear if you need `rust-src` to be installed at this point. To do that, try:

```bash
rustup component add rust-src
```

#### 2. Get the neovim LanguageClient installed

```vim
Plug 'autozimu/LanguageClient-neovim', {
\ 'branch': 'next',
\ 'do': 'bash install.sh',
\ }

" (Optional) Multi-entry selection UI.
Plug 'junegunn/fzf'
```

#### 3. Configure rust-analyzer by adding this to your init.vim config file

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

#### 4. Actually install these plugins

Back in the terminal, run `nvim +PlugInstall +UpdateRemotePlugins +qa`

## Notes on alternative approaches to making Neovim more of a Rust IDE

### Alternative methods of installing rust-analyzer

For rust-analyzer, there is [an alternative installation process described](https://rust-analyzer.github.io/manual.html#coc-rust-analyzer) where it's integrated with [coc.nvim](https://github.com/neoclide/coc.nvim), which you might be using anyway, or like for its other features. To me, right now, it seems a bit intense, and requires Node to be installed.

### Racer

There also seems to be another way to "teach" Neovim about the Rust language using [**Racer** ("code completion for Rust")](https://github.com/racer-rust/racer) and its [associated Vim plugin](https://github.com/racer-rust/vim-racer). I tried this once and it kept throwing halting errors as I was typing code.
