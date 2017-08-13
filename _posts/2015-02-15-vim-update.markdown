+++
title= "Getting Friendlier With Vim"
date= "2015-02-15 18:47:39 -0400"
comments = "true"
+++

A few months ago I wrote [a post about my first time tipping a toe in the water of Vim](http://sts10.github.io/blog/2014/09/10/getting-started-with-vim/), an intensely keystroke-based text editor. Despite getting the basics down, I still did 95% of my coding in Sublime Text 2, my old go-to editor. 

However in the last few weeks I had a need for a fresh project to take up, and, considering that at least some of my future work will be on remote servers which will force me away from editors like Sublime Text, I figured I'd resume my exploration of Vim.

<!-- more -->

As I mentioned in that first post, I went through most of [Derek Wyatt's video tutorials](http://derekwyatt.org/vim/tutorials/novice/#Welcome), which was super-helpful. Then I found and went through [tuts+](http://code.tutsplus.com/articles/25-vim-tutorials-screencasts-and-resources--net-14631) and found [vimcasts.org](http://vimcasts.org/episodes/page/7/), which helped even more, introducing my to some helpful patterns and plugins. 

Basically after the first pass with Vim I got the basic movements down. I installed NERDTree, which helped with project and window management. And I copied and pasted some suggested settings and key mapping into my .vimrc file. But there were still plenty of things I was far more comfortable doing in Sublime Text.

A partial list of these tasks would include: 
1. advanced copy and pasting
2. the ability to quickly comment and uncomment lines of code
3. a certain amount of code and variable autocompletion
4. spellcheck functionality
5. An easier way to indent multiple lines
6. More comfort with find and replace (ideally something as simple and powerful as Sublime text's Cmd + d)

I ended up solving these problems with edits to my vimrc file, plus the addition of two new plugins: [NERDCommenter](https://github.com/scrooloose/nerdcommenter) and [Unimpaired](https://github.com/tpope/vim-unimpaired). NERDCommenter allows you to comment out lines of code based on its syntax. My preferred mappings at this point are: 

```
nmap <C-l> <Leader>c<Space>
vmap <C-l> <Leader>c<Space>gv
imap <C-l> <ESC><Leader>c<Space>a
```

And Unimpaired I only use for 4 commands that allows me to move single or multiple liens up and down a document. This is not something I ever did using Sublime Text but after first struggling with simple cut and pasting in Vim and then watching [this Vimcast on "bubbling text"](http://vimcasts.org/episodes/bubbling-text/) I decided to set it up and it seems useful. Mappings:

```
nmap <C-k> [e
nmap <C-j> ]ev
map <C-k> [egv
vmap <C-j> ]egv
```

Beyond those plugin mappings I also wrote some custom mappings for standard Vim functions. Here is a sample:

```
" j and k don't skip over wrapped lines
nnoremap j gj
nnoremap k gk

" H to beginning of line, L to the end
noremap H ^
noremap L $

noremap <c-a> ^
noremap <c-e> $

" J and K move up and down 10 lines
noremap J 10j
noremap K 10k

" Tab and Shift tab to indent and un-indent
nnoremap <Tab> >>
nnoremap <S-Tab> <<

" D deletes to the end of the line, as it should
noremap D d$

" X removes line without placing it in the default registry
nmap X "_dd
" In visual mode, X removes selection without placing it in the default registry
vmap X "_d

" Control + p pastes from the 'yank register', and the ] formats it to indent you're pasting into (http://vimcasts.org/episodes/  meet-the-yank-register/)
nmap <c-p> "0]P

```

You can see my whole setup here in [my new .vimrc file](https://github.com/sts10/terminal_and_vim_settings/blob/master/vimrc).

As for a better find and replace, I learned a somple pattern. First, use / or ? to search for the pattern you want to replace. Replace that first instance with `cw` or `ciw`, change the word, then hit escape to return to normal mode. Now, hit `n` to go to the next instance. Hit `.` to make the replacement to that instance, or just hit `n` to leave that instance and go to the next instance. For me it's easier and cleaner than remembering the unintuitive `:%s/texttoreplace/replacementtext/gc` (if that's even right). 

Separately, another nice trick is the r command to replace one character. As opposed to the to `s` command, it returns you to normal mode after you replace the single character automatically. 

Another thing I didn't realize I needed were the following mappings: 

```
nnoremap j gj
nnoremap k gk
```

which makes j and k go through wrapped lines. Really helpful for navigating through long markdown paragraphs that are all technically one "line" to Vim. 

I also found the I kept needing to delete lines, usually blank lines, but I didn't want them to go to the default registry. I figured out that the _ registry goes nowhere, thus hitting `p` won't paste anything tat goes to the underscore registry. So I made shift X just delete a line to nowhere. Then when I hit `p` it pastes not the blank line but what I hopefully expect.

```
" X removes line without placing it in the default registry
nmap X "_dd
" In visual mode, X removes selection without placing it in the default registry
vmap X "_d
```

Speaking of registries, there's also a registry reserved for text that is yanked-- the 0 registry. Thus:

```
nmap <c-p> "0]P
```

makes Control + p paste from that registry, and the ] bracket auto-formats it for me. 

