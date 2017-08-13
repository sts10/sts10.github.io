+++
title= "Markdown HyperLink Remap for Vim"
date= "2015-08-02 21:53:23 -0400"
comments = "true"
+++

I've been writing these blog posts in Vim for a few months now. It's been a great way to practice and hone my Vim skills in a slower, less intense environment (as compared to deployed code). 

This blog is run using [Octopress](http://octopress.org/) and a shell script I wrote more than a year ago called [ink](https://github.com/sts10/ink) (which has been really awesome!). Thus, the posts are actually written in Markdown. This has worked out great-- it remains my preferred syntax for writing on the internet. But one pesky problem was the headache of making text a link in Markdown using Vim. 

<!-- more -->

As you can read in the [Markdown Syntax](http://daringfireball.net/projects/markdown/syntax#link), link text is surrounded by square brackets, followed immediately with the URL in parenthesis. 

While writing these blog posts, I'd often write a full sentence or paragraph, then go to my browser and find any URLs I'd want to insert links to. To do this, I would copy the URL to the system clipboard, then use Vim commands to navigate to the beginning of the text to link, insert a "[", navigate to the end of the text to link to insert a "]" then a "(", then use one of my remapping to paste from the system clipboard: 

``` 
" use leader to interact with the system clipboard 
nnoremap <Leader>p "*]p
nnoremap <Leader>P "*]P
nnoremap <Leader>v "*]p
nnoremap <Leader>V "*]P
```

Note 1: I'm using Terminal Vim. 

Note 2: It's not clear to me whether it is better/more correct to use the `*` register or the `+` register to interact with the system clipboard. If you want to use the `+` register, just substitute `+` for all the `*`s in the code examples in this post.

Note 3: The above block of Vimscript does NOT specifically allow Vim access to the system clipboard. I'm actually not 100% how I connect my version of Terminal Vim with my system clipboard. 

One route to take, one described in [this Vimcast](http://vimcasts.org/episodes/accessing-the-system-clipboard-from-vim/), is to [set the clipboard to unnamed](http://vim.wikia.com/wiki/Accessing_the_system_clipboard). I believe this puts all yank, delete and put (paste) commands to the system clipboard, which is pretty different from having one specific register connected to the system clipboard. There's _also_ a solution using [Tim Pope
's Unimpaired plug-in](https://github.com/tpope/vim-unimpaired), which I believe is described in this [Vimcast](http://vimcasts.org/episodes/using-vims-paste-mode-with-the-system-paste-command/).

Though this was good practice for my Vim cursor navigation skills, it was a bit of a pain in the ass, especially compared to Sublime Text. In Sublime, if you hit "\[" with a portion of your text highlighted, Sublime will place square brackets around the selected text. 

Note: There is a Tim Pope plug-in for Vim called [Surround](https://github.com/tpope/vim-surround) ([here's a Tuts+ video on YouTube about it](https://www.youtube.com/watch?v=5HF4jSyPpvs)), which I may still implement because it looks awesome yet simple, but I figured if I just wanted this one functionality _and_ I want my single command to paste from system clipboard.

With this functionality in mind, I went about writing a new custom Vim remapping just for inserting links in Markdown, with the assumption that I already have the URL to link to in my system clipboard (in the `*` register).

Here's what I came up with:

```
autocmd FileType markdown vnoremap <c-a> <Esc>`<i[<Esc>`>la](<Esc>"*]pa)<Esc>
```

The first bit, `autocmd FileType markdown`, says this remapping should only work in markdown files. \`< and \`> take you to the beginning and end of the previously highlighted text (in visual mode), respectively. So I got to the beginning of the highlight text, insert a square bracket, then go to the end of the highlighted text, move one character left, and insert the closing square bracket, an opening parentheses, then paste from the system clipboard register (`*`). (Note: the square bracket after the `*` just formats the pasted text... I don't think it's actually necessary...) Then we use `a` to insert the closing parentheses, then hit escape to return to normal mode. Phew! 

I haven't pushed the new line of up to [the publicly-hosted copy of my .vimrc](https://github.com/sts10/terminal_and_vim_settings/blob/master/vimrc) yet... still testing and debating whether mapping it to Ctrl + a is a good choice. 
