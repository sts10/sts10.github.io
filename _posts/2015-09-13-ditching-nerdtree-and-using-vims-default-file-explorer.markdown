+++
title= "Ditching NERDTree and Using Vim's 'Default' File Explorer"
date= "2015-09-13 12:43:56 -0400"
comments = "true"
+++

When I started using Vim the first plugin I downloaded was [NERDTree](https://github.com/scrooloose/nerdtree), a sidebar file explorer similar to what the text editor I was leaving, Sublime Text, had. It was a good crutch to get me into managing multiple files in Vim, but as I get more comfortable in Vim I'm running into a problem detailed in [this Vimcasts blog post](http://vimcasts.org/blog/2013/01/oil-and-vinegar-split-windows-and-project-drawer/), namely that when you open or split a new file from NERDTree, it is difficult to predict where the new window will open.

<!-- more -->

What you want instead is a way to call `edit`, `split`, or `vsplit` (shortcutted to `e`, `sp`, and `vs`) first, then get a directory in the window that will shortly be replaced by whatever file you chose to open or create. 

I watched [a YouTube video](https://www.youtube.com/watch?v=WfyXKnQ9kAQ&list=PL8tzorAO7s0jy7DQ3Q0FwF3BnXGQnDirs&index=6) today and learned about netrw, Vim's "default" file explorer, which apparently does exactly what I describe above. 

The [netrw documentation](http://vimdoc.sourceforge.net/htmldoc/pi_netrw.html) is pretty good. Important functionality includes: `%` to create a new file, `d` to create a new directory, `<c-l>` or `:e.` to refresh the directory, and `-` to go up a directory. 

While I have adopted the style and philosophy of netrw over that those of NERDTree, I do have two lighter-weight plugins that help me out. The first is one created by Time Pope called [Vinegar](https://github.com/tpope/vim-vinegar) which adds some lightweight improvements to netrw. 

The second, and more intrusive, is [ctrlp](https://github.com/kien/ctrlp.vim), a fuzzy file finder. I have three keymappings in my vimrc associated with ctrlp: 

```
" Ctrl- P mapping and two custom split keymappings (https://github.com/kien/ctrlp.vim)
let g:ctrlp_map = '<c-p>'
nmap <c-n>s :split<CR><c-w>j<c-p>
nmap <c-n>v :vsplit<CR><c-w>l<c-p>
```

Thus I have un-installed NERDTree and have been using ctrlp and Vinegar. We'll see how it goes.
