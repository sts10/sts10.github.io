---
layout: post
title: "Best of My vimrc"
date: 2016-02-12 23:06:59 -0500
comments: true
---

I just realized that I've been using Vim for just about a year now (here's [one of my early posts on starting to make the switch](http://sts10.github.io/post/2015-02-15-vim-update/)), so I figured it'd be a good time to go over some of favorite parts of [my vimrc](https://github.com/sts10/terminal_and_vim_settings/blob/master/vimrc). I'm certainly no Vim expert, but if nothing else than recording my "progress," here's a bit about how I use Vim at this point.

I've already written about [a Markdown hyperlink remap](http://sts10.github.io/post/2015-08-02-markdwon-hyperlink-remap-for-vim/) that still works really well and [how I ditched NERDTree in favor of netrw](http://sts10.github.io/post/2015-09-13-ditching-nerdtree-and-using-vims-default-file-explorer/). But there's plenty of more, smaller tricks I've picked up since then.

<!-- more -->

**Note from May 2017**: My vimrc has changed a bit since I wrote this post, which I wrote in February of 2016. But rather than update it with each new plugin and mapping, I'm going to leave this post as is, as the setup is still pretty solid. You can see [my relatively up-to-date vimrc here](https://github.com/sts10/terminal_and_vim_settings/blob/master/vimrc).

## Vim vs. MacVim vs. Neovim

Basically I split my usage between [Neovim](https://github.com/neovim/neovim) and [MacVim](https://github.com/macvim-dev/macvim/releases/). Sometimes I want to stay in the terminal (in which case I fire up Neovim), and other times I want a separate GUI. I'll also admit that part of the reason I do this is because the iTerm2 + Neovim combo isn't super stable at this point, as I'm running a beta version of iTerm2 [in order to get better/more colors for Neovim](http://sts10.github.io/post/2015-10-24-true-hex-colors-with-neovim-and-iterm2/). 

One way to make using both easier is to use your existing configuration by making these two symlinks: 

```vim
To use your existing Vim configuration:
    ln -s ~/.vim ~/.config/nvim
    ln -s ~/.vimrc ~/.config/nvim/init.vim
See ':help nvim' for more information on Neovim.
```

Neovim + iTerm2 is a pretty great combo, but for somethings I like using a GUI (MacVim). (I haven't found a good Neovim GUI yet, though there are some other there, including [Neovim dot app](https://github.com/rogual/neovim-dot-app).) 

## My Plugin Manager

To manage my ever-changing list of vim plugins I use [vim-plug](https://github.com/junegunn/vim-plug), which works really well. 

![vim-plug in action](https://raw.githubusercontent.com/junegunn/i/master/vim-plug/installer.gif)

In fact the first few lines of my vimrc automatically installs vim-plug if it's not detected then installs all the listed plugins, a trick I picked up from vim-plug's [FAQ](https://github.com/junegunn/vim-plug/wiki/faq): 

```text
" vim-plug (https://github.com/junegunn/vim-plug) settings 
" Automatically install vim-plug and run PlugInstall if vim-plug not found
if empty(glob('~/.vim/autoload/plug.vim'))
  silent !curl -fLo ~/.vim/autoload/plug.vim --create-dirs
    \ https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim
  autocmd VimEnter * PlugInstall | source $MYVIMRC
endif
```

I can then list my desired plugins as Github addresses:

```vim
call plug#begin('~/.vim/plugged')
Plug 'ctrlpvim/ctrlp.vim'
Plug 'terryma/vim-smooth-scroll'
Plug 'matze/vim-move'
Plug 'tpope/vim-commentary'
Plug 'sickill/vim-pasta'
Plug 'justinmk/vim-sneak'
Plug 'tpope/vim-vinegar'
Plug 'ervandew/supertab'
Plug 'vim-ruby/vim-ruby'
Plug 'tpope/vim-rails'
Plug 'tpope/vim-unimpaired'
Plug 'tpope/vim-markdown'
Plug 'sts10/vim-mustard'
Plug 'junegunn/seoul256.vim'
Plug 'altercation/vim-colors-solarized'
Plug 'tpope/vim-surround'
Plug 'tpope/vim-repeat'
Plug 'bronson/vim-visual-star-search'
Plug 'terryma/vim-multiple-cursors'
Plug 'junegunn/goyo.vim'
Plug 'tmhedberg/matchit'
Plug 'AndrewRadev/splitjoin.vim'
Plug 'dhruvasagar/vim-table-mode'
Plug 'alvan/vim-closetag'
Plug 'kana/vim-textobj-user'
Plug 'lucapette/vim-textobj-underscore' | Plug 'kana/vim-textobj-user'
Plug 'jceb/vim-textobj-uri'             | Plug 'kana/vim-textobj-user'
Plug 'kana/vim-textobj-indent'          | Plug 'kana/vim-textobj-user'
Plug 'kana/vim-textobj-line'            | Plug 'kana/vim-textobj-user'
Plug 'wellle/targets.vim'
Plug 'sts10/vim-zipper'
Plug 'tpope/vim-fugitive'

" All of your Plugins must be added before the following line
call plug#end()
```

And I'm good to go. I can run `:PlugUpdate` to get the latest versions of all the plugins, or `:PlugUpgrade` to upgrade vim-plug itself. For me vim-plug offers three advantages over [Vundle](https://github.com/VundleVim/Vundle.vim): (1) The automatic install script (shown above) is nice for portability, (2) When using Neovim, vim-plug updates the plugins asynchronously, and (3) you don't have to turn off file type detection (`filetype off`) in your vimrc when you list your plugins with vim-plug, [as you do with Vundle](https://github.com/VundleVim/Vundle.vim#quick-start). 

## Quick Note on Remappings

[This blog post](http://learnvimscriptthehardway.stevelosh.com/chapters/05.html) recommends always using `nnoremap` over `nmap` (and the `inoremap` and `vnoremap` equivalents) to avoid recursion. So I've strived to do that in all situations where both options work. If `nnoremap` doesn't work but `nmap` does (which is the case some of the time), I just use `nmap`.

## Favorite Plugins and My Configurations


While, as you can see, I've got a more than 20 plugins listed above, there's only a few that are super important to my workflow. Among these I would include [vim-surround](https://github.com/tpope/vim-surround), [vim-sneak](https://github.com/justinmk/vim-sneak), [vim-commentary](https://github.com/tpope/vim-commentary), [vim-move](https://github.com/matze/vim-move), and maybe [vim-smooth-scroll](https://github.com/terryma/vim-smooth-scroll). 

I map sneak to Tab and Shift + Tab as follows (works in MacVim and Neovim + iTerm2):

```text
" https://github.com/justinmk/vim-sneak
" Map Sneak_s using nmap-- not nnoremap. That seems to cause problems
nmap <Tab> <Plug>Sneak_s
nmap <S-Tab> <Plug>Sneak_S
vmap <Tab> <Plug>Sneak_s
vmap <S-Tab> <Plug>Sneak_S
``` 

(Update from 2017: [A Reddit user points out](https://www.reddit.com/r/vim/comments/6912rf/best_of_my_vimrc/dh33shb/) that by using these mappings I'm giving up Vim's default mapping/functionality, which I must be true. That's a choice I made and I like it.)  

And I set vim-move to `<c-j>` and `<c-k>` with `let g:move_key_modifier = 'C'`. Previously, I had used [vim-unimpaired](https://github.com/tpope/vim-unimpaired)'s `[e` and `]e` mappings to move lines up and down (aka "bubbling" text), but I eventually switched to vim-move because vim-move auto-indents your code as you move it, which isn't without a speed cost sometimes, but is really nice for me visually. Plus vim-unimpaired has a bunch of other default mappings besides `[e` and `]e` that I didn't use (but that you may like!). 

![vim-move in action](https://camo.githubusercontent.com/c06acab07e6bf0bb27086c9694fe2f456101d21c/687474703a2f2f692e696d6775722e636f6d2f524d76384b734a2e676966)

For more of my ~opinions~ plugins, I previously wrote about what I see as the [two types of vim plugins](http://sts10.github.io/post/2015-09-12-two-types-of-vim-plugins/).

## Colorscheme

I adapted a colorscheme I used in Sublime Text 2 called Mustard (located [here](https://github.com/panrafal/mustard-theme)) to make a colorscheme that I also called [Mustard](https://github.com/sts10/vim-mustard). 

Thanks to its file structure, you can have vim-plug install and manage it by including `Plug 'sts10/vim-mustard'` in your vimrc (Mustard should work with other plugin managers too). Then be sure to have `colorscheme mustard` and `set background=dark` in your vimrc.

## Line Numbers

I love my line numbers settings. I have relative number lines on every line except the one I'm currently on, which I have display the absolute number line rather than just `0`. Here's how I get that set up:

```text
" Display relative line numbers
set relativenumber
" display the absolute line number at the line you're on
set number

" Keep the line number gutter narrow so three digits is cozy. 
set numberwidth=2
```

This way, I can easily go up or down to specific line with `count + j` or `k`, but if Ruby tells me I have an error on line 76 I can just run `:76` and the absolute line number will confirm that I landed on line 76. 

## Page Navigation

I have two nice sets of mappings that make file navigation a little easier for me. 

This first one is a bit tricky to explain. First, know that I linewrap on certain filetypes with the following autocmds: 

```text
" By default don't wrap lines
set nowrap 

" But do wrap on these types of files...
autocmd FileType markdown setlocal wrap
autocmd FileType html setlocal wrap
```

But then I ran into the problem of `j` and `k` skipping over wrapped lines. I initially fixed this by simply remapping `j` as `gj` and `k` as `gk`. However, this gets screwy when you use a count with `j` or `k`. If you're navigating by relative numbers with a count, you want `j` and `k`, when using a count, treating wrapped lines as one line rather than multiple lines. 

Thanks to [this Reddit comment](https://www.reddit.com/r/vim/comments/2k4cbr/problem_with_gj_and_gk/cliuz1o), I found the perfect solution to this problem: 

```text
" j and k don't skip over wrapped lines in following FileTypes, unless given a count (helpful since I display relative line numbers in these file types)
autocmd FileType html nnoremap <expr> j v:count ? 'j' : 'gj'
autocmd FileType html nnoremap <expr> k v:count ? 'k' : 'gk'
autocmd FileType markdown nnoremap <expr> j v:count ? 'j' : 'gj'
autocmd FileType markdown nnoremap <expr> k v:count ? 'k' : 'gk'
```

I later simplified these mappings and added visual mode support (plus using it in `text` files) like this: 

```text
autocmd FileType html,markdown,text nnoremap <expr> j v:count ? 'j' : 'gj'
autocmd FileType html,markdown,text nnoremap <expr> k v:count ? 'k' : 'gk'

autocmd FileType html,markdown,text vnoremap <expr> j v:count ? 'j' : 'gj'
autocmd FileType html,markdown,text vnoremap <expr> k v:count ? 'k' : 'gk'
```

My next trick is just to switch `<c-e>` (by default scrolls up one line without moving cursor) and `<c-u>` (by default scrolls up half a page). This conveniently puts scroll half page up (now `<c-e>`) right above the default keymap for scroll half page down, which is `<c-d>`. 

```text
" Easier page navigation
nnoremap <C-e> <C-u>
nnoremap <C-u> <C-e>
```

However I found that scrolling by this much instantly was a bit jarring. It took me a while to figure out why until, I realized that in Sublime Text I usually scrolled with my mouse's scroll wheel (ugh), which was a bit more gradual. After some Googling I found [vim-smooth-scroll](https://github.com/terryma/vim-smooth-scroll), which slows down any scroll/movement command that you specify. 

Here's how I configure the plugin:

```text
noremap <silent> <c-e> :call smooth_scroll#up(&scroll, 30, 2)<CR>
noremap <silent> <c-d> :call smooth_scroll#down(&scroll, 30, 2)<CR>
noremap <silent> <c-b> :call smooth_scroll#up(&scroll*2, 30, 4)<CR>
noremap <silent> <c-f> :call smooth_scroll#down(&scroll*2, 30, 4)<CR>
```

I also make use of Vim's default normal commands `{` and `}` to navigate by "paragraph" (blank lines).

## Statusline

Just recently I decided to write my own custom statusline. Previously I had tried a plugin solution to a statusline, like [airline](https://github.com/vim-airline/vim-airline) or [lightline](https://github.com/itchyny/lightline.vim). I forget which one I actually tried, but I couldn't get it to work for me. 

Later I found a few blog posts ([this one in particular](http://got-ravings.blogspot.co.at/2008/08/vim-pr0n-making-statuslines-that-own.html)) that helped me write my own, which is pretty similar to the one that blog post says Tim Pope was using. 

```text
set statusline=%f
set statusline+=\ %h%w%m%r
set statusline+=%=
set statusline+=%-16(%{exists('g:loaded_fugitive')?fugitive#statusline():''}\%)
set statusline+=\ %P/%L
set statusline+=\ 
```

It gives basics like filename, percentage through the file, total number of lines, necessary flags, etc. The only fancy part is the `fugitive#statusline`, which gives me the current Git branch, if you're in a git directory AND you have [Fugitive](https://github.com/tpope/vim-fugitive) installed. At this point this is the only reason I have Fugitive installed, though I'm sure others find its other features helpful (from the README: "I'm not going to lie to you; fugitive.vim may very well be the best Git wrapper of all time."). 

## Setting Default FileType

I write Markdown pretty frequently, so I set Vim to set new files to Markdown syntax with the following line: 
```text
" if no filetype specified, set ft=markdown (alternative would be text)
autocmd BufEnter * if &filetype == "" | setlocal ft=markdown | endif
```

## Markdown Tricks

For Markdown, I use [tpope's vim-markdown](https://github.com/tpope/vim-markdown) mostly for improved syntax highlighting. I also spell out some languages for it to highlight in between code fences with: 

```text
let g:markdown_fenced_languages = ['html', 'css', 'javascript', 'ruby', 'python', 'bash=sh', 'yaml', 'json']
```

As mentioned above, I also wrote a handy little mapping for quickly creating links in Markdown, assuming the URL is in your system clipboard: 

```text
" In markdown files, Control + a surrounds highlighted text with square
" brackets, then dumps system clipboard contents into parenthesis
autocmd FileType markdown vnoremap <c-a> <Esc>`<i[<Esc>`>la](<Esc>"*]pa)<Esc>
```

Read more about my process coming to that mapping in [this slightly-too-long blog post](https://sts10.github.io/post/2015-08-02-markdwon-hyperlink-remap-for-vim/) if you like.

## Backup, Swap, and Undo

For backup, swap, and undo files-- which I found frequently got mixed into Git repos no matter what I did with my gitignores-- I found this solution, which basically shoves all those files into three directories, rather than individual local project directories. We also have to [setup Vim's persistent undo](http://stackoverflow.com/a/22676189/3160994).

```text
" Save temporary/backup files not in the local directory, but in your ~/.vim
" directory, to keep them out of git repos. 
" But first mkdir backup, swap, and undo first to make this work
call system('mkdir ~/.vim')
call system('mkdir ~/.vim/backup')
call system('mkdir ~/.vim/swap')
set backupdir=~/.vim/backup//
set directory=~/.vim/swap//

" Keep undo history across sessions by storing it in a file
if has('persistent_undo')
    call system('mkdir ~/.vim/undo')
    set undodir=~/.vim/undo//
    set undofile
    set undolevels=1000
    set undoreload=10000
endif
```

This code even creates the directories for you (at least in macOS, using `mkdir`) if they haven't already been created, so portability is maintained. The commands do not overwrite the directory if it already exists. 

## Search Settings

I like my search settings: ignore case unless you uppercase a letter, search as you type, and don't highlight all matches.
```text
" set search case to a good configuration http://vim.wikia.com/wiki/Searching 
set ignorecase
set smartcase

" search characters as they're entered
set incsearch
" don't highlight all search matches
set nohlsearch
```

## Text Objects

```text
Plug 'kana/vim-textobj-user'
Plug 'lucapette/vim-textobj-underscore' | Plug 'kana/vim-textobj-user'
Plug 'jceb/vim-textobj-uri'             | Plug 'kana/vim-textobj-user'
Plug 'kana/vim-textobj-indent'          | Plug 'kana/vim-textobj-user'
Plug 'kana/vim-textobj-line'            | Plug 'kana/vim-textobj-user'
```

I've recently added four extra text objects, using [kana's vim-textobj-user](https://github.com/kana/vim-textobj-user) plugin. With `underscore`, `uri`, `indent`, and `line`, I get more text objects in Vim. So for example `viu` visually-selects the URI you're on, and `yil` yanks the inner "line". There's a ton more information in [the wiki](https://github.com/kana/vim-textobj-user/wiki). 

At one point I thought that I needed the `|` there because [vim-plug](https://github.com/junegunn/vim-plug) syntax allowed it to denote [a plugin dependency](https://github.com/junegunn/vim-plug#example). (My understanding is that putting the "textobj-user" first in my vimrc is not sufficient due to vim-plug + Neovim's asynchronous plugin installing and updating.) I indented it like so to make it look nice. 

But [this Reddit user points out](https://www.reddit.com/r/vim/comments/6912rf/best_of_my_vimrc/dh2ywoj/) that "`|` is just a way to simulate line breaks in vim script. Vim-plug doesn't have support for "dependencies", it's just a way of writing it so you can keep track of it."

According to that Reddit comment, I think I could just have:

```text
Plug 'kana/vim-textobj-user'
Plug 'lucapette/vim-textobj-underscore' 
Plug 'jceb/vim-textobj-uri'            
Plug 'kana/vim-textobj-indent'        
Plug 'kana/vim-textobj-line'         
```

Also, with `textobj-uri`, I can remap `gx` to work better and with more type of URLs (see [this blog post for more](https://github.com/kana/vim-textobj-user/wiki)):

```text
" map gx and go to visually select a URI and then open it in default browser
" see: http://sts10.github.io/post/2016-02-16-one-solution-to-a-problem-with-vims-gx-command/
nmap gx mxviugx<Esc>`x
```

I also added [targets.vim](https://github.com/wellle/targets.vim) to get even more text objects. Basically my reasoning is the more text objects the better for when I'm creating a complex macro on the fly or need to do something complex within one command so that it is repeatable with the dot command (see [vim-repeat](https://github.com/tpope/vim-repeat), a plugin for making the dot command work with some plugins).

## Folding with vim-zipper, My First Vim Plugin

I learned about Vim's folding functionality pretty early on (see `:help folding`) but I never really used it. In fact I still can't quite get `set foldmethod=syntax` to find the folds that I think it should. 

So for a while I just `set foldmethod=marker` and really only used it in my vimrc. 

Later I realized the power of `set foldmethod=indent`. I particularly liked that it was pretty intuitive to see how it would fold code (by indent!) but it also wouldn't slow Vim down like the `syntax` method could. 

However I wanted to make opening folds easier so I eventually made my first Vim plugin called [vim-zipper](https://github.com/sts10/vim-zipper). You can read about it [on GitHub](https://github.com/sts10/vim-zipper) or in [another blog post](https://sts10.github.io/post/2016-03-20-vim-zipper-my-first-vim-plugin/). 

![vim-zipper in action](https://raw.githubusercontent.com/sts10/vim-zipper/master/vim-zipper-gif.gif)

## System Clipboard

I use my leader (mapped to space) to interact with the system clipboard. I'm not 100% sure if this is true even on all Unix systems, but when I use Neovim in iTerm2 or MacVim, `*` is the register of the system clipboard. I frequently interact with the system clipboard from Vim, so I set up these key mappings to make that easier:

```text
" use leader to interact with the system clipboard
nnoremap <Leader>p "*]p
nnoremap <Leader>P "*]P

nnoremap <Leader>y :y*<cr>
nnoremap <Leader>c ^"*c$
nnoremap <Leader>d ^"*d$

vnoremap <Leader>y "*y
vnoremap <Leader>c "*c
vnoremap <Leader>d "*d
```

The `]` in there automatically auto-indents the pasted text for me, which has worked well in both MacVim and Neovim but not _every time_. I don't think I have any other settings pertaining to the system clipboard at this point.

## Deleting Text Without Overwriting Any Registers

I don't love how easy it is to overwrite the contents of your default registry (i.e. when you delete something with `d` with the desire to paste it somewhere else, but in the meantime you use `d` again trying to actually delete something, but now that's overwritten the default registry). To solve this I did my best to make `X` (shift + `x`) a new operator that deletes things to the "black hole registry," `_`, which doesn't effect the default registry.

```text
nmap X "_d
nmap XX "_dd
vmap X "_d
vmap x "_d
```

Similarly I make `x` in normal mode go to the black hole registry as well: 

```text
" have x (removes single character) not go into the default registry
nnoremap x "_x
```

## Make Visual Mode a Little More Powerful

Again in [a Reddit comment](https://www.reddit.com/r/vim/comments/3y2mgt/do_you_have_any_minor_customizationsmappings_that/cya0x04) I picked up this one-liner that makes the powerful dot command work on visually-selected lines: 

```text
" Make the dot command work as expected in visual mode (via
" https://www.reddit.com/r/vim/comments/3y2mgt/do_you_have_any_minor_customizationsmappings_that/cya0x04)
vnoremap . :norm.<CR>
```

Note I've also got the [vim-repeat](https://github.com/tpope/vim-repeat) plugin to help make the dot command work a little better with other plugins. 

Then, in [a Medium post](https://medium.com/@schtoeffel/you-don-t-need-more-than-one-cursor-in-vim-2c44117d51db#.65mg9br0l) linked to from a [r/vim subreddit](http://reddit.com/r/vim) post that I have since lost track of, I just recently picked up this function that makes macros work over visually-selected lines.

```text
" Allows you to visually select a section and then hit @ to run a macro on all lines
" https://medium.com/@schtoeffel/you-don-t-need-more-than-one-cursor-in-vim-2c44117d51db#.3dcn9prw6
xnoremap @ :<C-u>call ExecuteMacroOverVisualRange()<CR>

function! ExecuteMacroOverVisualRange()
  echo "@".getcmdline()
  execute ":'<,'>normal @".nr2char(getchar())
endfunction
```

Both of these have come in handy often. Highly recommended, as they don't seem to require new learning or get in the way of any other functionality. 

## UnMinifying Javascript

My latest addition to my vimrc is this function and two keymaps for minifying and unminifying Javascript, which I do pretty frequently at work. I picked the function up from [this gist](https://gist.github.com/timtyrrell/0640d02bd08cd54f739a). 

I did edit it a bit: (1) I added the `e` after the `g`s so that it never throws an error if it doesn't find a match, (2) removed lines 5 and 8 from the gist-- removing line 5 was a personal preference and I'm not sure what line 8 does, and (3) I attempted to use a mark `j` to save my place, but that doesn't seem to work as I wanted it to.

I also added a mapping to join the whole file-- effectively a "minify" command-- so I could easily go back and forth. Works well so far!

```text
" Simple re-format for minified Javascript
function! UnMinify()
    normal mj
    %s/{\ze[^\r\n]/{\r/ge
    %s/};\?\ze[^\r\n]/\0\r/ge
    %s/;\ze[^\r\n]/;\r/ge
    normal ggVG=`j
endfunction

autocmd FileType javascript nnoremap <Leader>j :call UnMinify()<CR>
autocmd FileType javascript nnoremap <Leader>k mjggvGJ<Esc>`j
```

## Other Random Tips

Here's another remapping of Vim's default behavior that I consider pretty essential when indenting or un-indenting in visual mode. 

```text
" Have the indent commands re-highlight the last visual selection to make
" multiple indentations easier
vnoremap > >gv
vnoremap < <gv
```

Though I have since removed these lines from my vimrc. The reason being that if I want to indent something multiple times it's slightly faster (and more "Vim-like in my mind) to use the dot command. 

Forgoing the above remappings and using the dot command is faster since if you only want to indent something once (a relatively common case) using visual mode, you want to be dropped into normal mode so you can move on to other tasks that much quicker. You don't need to exit visual mode. But it you want to indent the text you just indented, or undo your last indentation move, you can use the dot command or undo (`u`) respectively. Both are one keystroke, so no loss there.

## Default Parts of Vim That I Use Frequently

### Exiting Insert Mode

In my early days I had remapped `<Esc>` to `ii` (`imap ii <Esc>`), since escape was so far away, but now I just use `<C-[>`, which by default does almost the exactly same thing as `<Esc>`. 

### File Management

I've tried to find solutions for a couple of problems but have learned to just use Vim's defaults. One example would be file-management: I used to use NERDTree, but [now just use Vim's built-in file explorer](http://sts10.github.io/post/2015-09-13-ditching-nerdtree-and-using-vims-default-file-explorer/), netrw, combined with Tim Pope's [vim-vinegar](https://github.com/tpope/vim-vinegar). I do have [ctrlp.vim](https://github.com/ctrlpvim/ctrlp.vim) (a fuzzy finder) installed, and I even tried [fzf](http://sts10.github.io/post/2016-01-09-vim-line-complete-with-fzf/),but I find that I use netrw more frequently. Though granted I have yet to do a lot of work in a project that has many files, like a Rails project would have, which may necessitate a fuzzy finder.

### Closing Syntax

After using Vim for a while I started to miss how Sublime Text would automatically close brackets and parentheses for you. In Sublime, be default, if you type `def test(` it gives you the closing parenthesis and keeps your cursor between them: `def test(|)`. Then, most importantly, if you type your argument and type the closing parenthesis, you just "type over" the closing parenthesis that Sublime added for you. It's a nice, out-of-the-way implementation that I have been hoping to find in a vim plugin but haven't yet ([tweet at me if you have ideas](https://twitter.com/sts10)). 

I've tried a few plugins for auto-closing so far: [vim-autoclose](https://github.com/Townk/vim-autoclose) and [vim-closer](https://github.com/rstacruz/vim-closer), as well as [vim-endwise](https://github.com/tpope/vim-endwise), but these days I don't use anything and have resigned to just closing my parentheses and brackets and Ruby methods myself by hand. (Update: A Twitter user whose account is private DM'd me pointing to [delimitMate](https://github.com/Raimondi/delimitMate) as an alternative. Separately, [@VimLinks](https://twitter.com/VimLinks/status/780693728545693696) has tweeted about [lexima.vim](https://github.com/cohama/lexima.vim), which is another option. I've yet to give either a try-- mostly because I've grown so used to closing brackets and parentheses manually, but you might find one of them to be the best option for you.)

### Spellcheck

I use `]s` and `[s` to navigate to the next misspelled word. Once on a misspelled word, just hit `z=` to get some suggestions. To "teach" Vim the word under the cursor, use `zg`. Looks like `zug` undoes the adding to your learned-words list. See `:help spell` for more.

### Find and replace

While I have `multiple-cursors` installed, I rarely use it (I just had to look up the default mapping). Instead I use `/` or `?` to search, make the change with `c` and a motion, exit insert mode with `<C-[>`, then use `n` or `N` to go to the next instance and hit `.` to make the change. If the repeated change I want to make is too complex for the dot command to retain, I make use of Vim's macros (see `:h complex-repeat`).

I do have [vim-visual-star-search](https://github.com/bronson/vim-visual-star-search) installed to make `*` and `#` work a bit more intuitively for me, and I certainly could make use of it when finding and replacing, but I haven't.  

Update: If you're really missing Sublime Text's multiple cursor feature, [this solid blog post](http://www.kevinli.co/posts/2017-01-19-multiple-cursors-in-500-bytes-of-vimscript/) gives some unique recommendations of ways to reproduce Sublime's functionality in Vim with a few lines of Vimscript and remapping.

### Other Vim Defaults That I Use Frequently

Know that when your cursor is on a URL you can hit `gx` in normal mode Vim will open that URL in your default browser. I've found this to be more helpful than I thought it would be (though there appears to be at least [one strange problem with it](http://sts10.github.io/post/2016-02-16-one-solution-to-a-problem-with-vims-gx-command/)).

`o` in visual mode changes which "end" of a visual selection you're changing, which I love for its granularity. 

`<C-x><C-l>` auto completes an entire line, looking within your current buffer for a line to match. (If you're looking for a command to auto-complete lines from your entire project, check out [my post on fzf](http://sts10.github.io/post/2016-01-09-vim-line-complete-with-fzf/).) You may also want to checkout the `:copy Ex` command, explained in [this great vimcast](http://vimcasts.org/episodes/long-range-line-duplication/).

## Things I Don't Really Have an Answer For At This Point

In addition to auto-closing parentheses and brackets that I mentioned above, I don't have a good general auto-completion solution setup beyond what [SuperTab](https://github.com/ervandew/supertab) gives me. A lot of people seem to use [YouCompleteMe](https://github.com/Valloric/YouCompleteMe) or [Deoplete](https://github.com/Shougo/deoplete.nvim) for Neovim, but honestly the installation process daunts me a bit, and surely would decrease the portability of my whole setup for a feature that I don't think I'd use a ton. I should probably instead spend time investigating snippets. 

Another thing I'm not sure about is how to best search your entire working directory/project for a bit of code. I think the [vimgrep](http://vimcasts.org/episodes/search-multiple-files-with-vimgrep/) command is the default, but I could also use ack or fzf? Again it's one of those things I haven't really needed yet, though I did use quite a bit when wrestling large Ruby on Rails projects in Sublime Text. With Vim, there's always something more to learn.
