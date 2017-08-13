+++
title= "A Problem with Vim's gx Command, And One Solution"
date= "2016-02-16 23:31:58 -0500"
comments = "true"
+++

I've been playing around with Vim's `gx` command, which in normal mode, when on a URL, opens that URL in your default browser (see `:h gx`). However today I ran into an interesting problem-- if a URL has a `?` in it `gx` thinks the URL ends at the `?`. Note that I'm using OS X and Chrome is my default browser. I'm seeing this problem in both MacVim 7.4 (88) and Neovim v0.1.3-61-gf03ab69.

This might not seem like a big deal for most URLs, since usually the characters after a `?` are superfluous tracking codes (though for my job they're pretty important). However there are the very large exceptions of YouTube video URLs, like `https://www.youtube.com/watch?v=wlR5gYd6um0`, and Google search results pages, like `https://www.google.com/webhp?sourceid=chrome-instant&ion=1&espv=2&ie=UTF-8#q=vim%20gx%20command`. 

Placing your normal mode cursor anywhere before the `?` in either of those URLs and hitting `gx` will open the URL up to but not past the `?`, thus taking you to a different location than intended. There are probably other examples where the `?` is non-trivial. 

<!-- more --> 

This same problem is described in [this Stack Exchange question](http://vi.stackexchange.com/questions/2801/how-can-i-make-gx-recognise-full-urls-in-vim). Interestingly, the top answer to the Stack Exchange question says that the variable `g:netrx_gx` "determines what will be considered part of a URI" and that by default this is set to "<cfile>" (see `:help <cfile>`). The suggested fix is to change this variable from `<cfile>` to `<cWORD>`, however after some testing with that I found that it frequently selects MORE than a given URL, since it usually goes from space to space. 

Note there's also [Issue #190](https://github.com/vim/vim/issues/190) in [vim/vim](https://github.com/vim/vim) which seems relevant, and presents some more clues. One user gives [this answer](https://github.com/vim/vim/issues/190#issuecomment-132351369), which points to [a function in his vimrc](https://github.com/drmikehenry/vimfiles/blob/9b987c0349c9b1739242369d3e2cd62deacfd28c/vimrc#L2467) that may work as a fix-- I didn't try it. Here's what I did. 

## My Solution

So it's not pretty, but here goes: 

The first clue I got was from the very end of that Stack Exchange answer: "Hint: Using `gx` in visual mode, it will open the visually selected string (regardless of the above configuration)." The same feature is touched upon in the [Vim Github issue](https://github.com/vim/vim/issues/190#issuecomment-132351362) that I mention above.

Kind of coincidentally, I recently installed the [jceb/vim-textobj-uri Plugin](https://github.com/jceb/vim-textobj-uri) (which requires you to install [kana/vim-textobj-user](https://github.com/kana/vim-textobj-user) first!). vim-textobj-uri, as you might guess, makes URIs text objects, and maps `iu` and `au` to interact with them. 

Now that I had a well-made URI text object at my finger tips (which is helpful on it's own!), I then typed this remapping into my vimrc: 

```
nmap gx viugx<Esc>
```

As you can probably guess, this mapping visually selects the URI, then runs `gx` (from visual mode), then Escapes you back into normal mode. 

Later I refined this in two ways. First, I chose to use my `x` mark in order to preserve my cursor position in the URI. And secondly, thanks to [a comment from Carudo](https://sts10.github.io/blog/2016/02/16/one-solution-to-a-problem-with-vims-gx-command/#comment-2793361989), I found that I could use the preferable `nnoremap` by doing this:

```
nnoremap gx :normal mxviugx<Esc>`x
```

which you may prefer. 

From my point of view this is a problem that should be solved by default by Vim itself, or at least there should exist something better to set `g:netrx_gx` to. Right?

## Other Strangeness with gx

Sometimes when I run `gx` on some URLs (one example was: `http://vimcasts.org/episodes/meet-the-yank-register/`), it seems like Vim runs a `curl` command and attempts to download the source code of the file (sometimes it's successfully and Vim opens the source code as a new buffer). This may be the case for URLs that end in trailing slashes, as [this Stack Exchange user points out](http://vi.stackexchange.com/questions/5439/why-does-gx-call-curl-when-the-cursor-is-on-a-url-with-trailing-slash), though, frustratingly, I haven't been able to reproduce the behavior consistently.


