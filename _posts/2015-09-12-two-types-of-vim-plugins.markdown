+++
title= "Two Types of Vim Plugins"
date= "2015-09-12 11:11:31 -0400"
comments = "true"
+++

Last week I watched most of the videos in [this YouTube playlist of Vim meetups from Thoughtbot](https://www.youtube.com/playlist?list=PL8tzorAO7s0jy7DQ3Q0FwF3BnXGQnDirs). One of the more revelatory for me was [one from John Crepezzi](https://www.youtube.com/watch?v=BhwtnCaFTFk&list=PL8tzorAO7s0jy7DQ3Q0FwF3BnXGQnDirs&index=7) in which he simply goes over how he uses Vim, with an emphasis on the plugins that he uses.

<!-- more -->

<iframe width="640" height="360" src="https://www.youtube.com/embed/BhwtnCaFTFk?list=PL8tzorAO7s0jy7DQ3Q0FwF3BnXGQnDirs" frameborder="0" allowfullscreen></iframe>

At about the 10 minute mark in the video he makes a distinction between "2 types of plugins": ones the blend in and ones that don't blend in. 

The ones that don't blend in are more obvious to me. They are the plugins that add new features, usually necessitating new keystrokes to be learned. NERDTree was the first plug-in I installed, giving me a file manager sidebar that I had gotten so reliant on in Sublime Text. I've since switched to Vinegar and Ctrl+p for file management, combined with a few nifty key re-mappings in my [vimrc](https://github.com/sts10/terminal_and_vim_settings/blob/master/vimrc) that I wrote myself, however I still use plenty of plugins that don't blend in, like Sneak, Surround, and Unimpaired. All four of these, however, don't require much extra learning, and I feel they align with the philosophy of Vim (Surround for example), as well as I understand it at this point.

But what about this other category of plugins, that ones that blend in? Crepezzi's simple definition from the talk: "...they just enhance the Vim experience without you having to learn anything new." 

The idea that there are plugins that exist that work behind the scenes to improve Vim without necessitating the user to learn any new keystrokes or even alter his or her vimrc in any way was a new concept for me. Most software I have used in my life has been relatively new and polished. The idea that there is room for standard Vim, even the latest version, to me improved this seamlessly, was a new concept for me. Vim is clearly one of the older programs still being actively used and developed today ([vi was written in 1976](https://en.wikipedia.org/wiki/Vi)). 

I believe I'm correct in assuming that every new version brings new features and tricks to Vim, but obviously opinions vary enough, and the core developers are cautious enough, that there are some blend-in-able (maybe we can call them "seamless") features, existing as plugins that, to some, enhance the Vim experience without even adding to its complexity in terms of keystrokes or mappings. They are, if accepted/installed, unambiguous improvements on the core functionality.

Examples of Vim plugins that "just blend in" are: 
- [vim-pasta](https://github.com/sickill/vim-pasta)
- [supertab](https://github.com/ervandew/supertab)
- [vim-vinegar](https://github.com/tpope/vim-vinegar)

Pasta helps with indenting pasted and inserted text, Super Tab enforces some nice defaults in regard to tab-completion (though I attempted to do this with some keymappings in my vimrc that I've left in for now), and Vinegar is a slight, mostly aesthetic change to Vim's built-in file manager, [netrw](http://www.vim.org/scripts/script.php?script_id=1075) (here's [a great Vimcast on file management, netrw and NERDTree](http://vimcasts.org/episodes/the-file-explorer/)). Crepezzi also talks about a plugin called [Match It](https://github.com/tmhedberg/matchit), which allows you to switch between matching HTML tags with Vim's `%` command, which already does that in most but not all matching situations.

I find this fascinating. To me, the seamless plugins represent a layer between changes and functionality in the core of Vim and the plugins that add new, non-blended features to Vim. Even Crepezzi, who says in his talk that he generally "favors the default [Vim] configuration for pretty much everything, rather than trying to customize things," via plugins and keymappings, actually uses 10 or so plugins. Maybe we can think of the blended-in changes as something closer to hardware or firmware, while the plugins that don't blend in would me more like software. 

As Crepezzi says "These things I think should just be part of Vim." It's impressive to me that Vim has such distinctions, and allows users to, relatively painlessly, add features that operate at the same level as the core of Vim.



