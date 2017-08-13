+++
title= "Checking In On My Coding Color and Font Preferences"
date= "2015-08-29 10:39:11 -0400"
comments = "true"
+++

About 18 months ago I wrote a post on my [apps, fonts, and color preferences](http://sts10.github.io/blog/2014/02/14/my-current-coding-setup/) for my coding setup. Interestingly, not much has changed! 

I do now [use MacVim](http://sts10.github.io/blog/2015/08/07/from-terminal-vim-to-mac-vim/) more often than Sublime Text, but I still use ST2 for some things. 

### Colors: An Imperfect Understanding

7 months ago, towards the beginning of my slow transition to Vim, I recreated my favorite Sublime Text theme to vim's color format. I called it [mustard.vim](https://github.com/sts10/terminal_and_vim_settings/blob/master/mustard.vim) and it goes in `~/.vim/colors/`, which you may have to `mkdir` yourself. 

<!-- more --> 

This color scheme system is not as smooth and simple as I'd like. Note that in my `mustard.vim` file we have one section called `GUI color definitions` and another called `Terminal color definitions`. 

From my understanding, only one of these sections is used by a given application. If the application supports GUI fonts/colors, that application uses the GUI colors and basically ignores the rest of the document. 

If the application does not support GUI colors (or in some cases, I think, if the user hasn't specified for the application to use the GUI colors), it uses the terminal color definitions. Only console applications like OS X's default Terminal and iTerm use these, from my understanding. When an application uses the terminal color settings, it relies wholly on the color choices set in the console application's preferences. 

![my current Terminal preferences](http://i.imgur.com/FRNVXKE.png)

![my current iTerm2 color preferences](http://i.imgur.com/eHau3Dz.png)

Setting these colors in these GUI preference menus is far from ideal. When setting up a coding environment on a new machine, I do not want to be manually entering RGB codes into my consoles preference menu-- I want to upload a text file into it (or better yet, place a text file into a certain directory) and have it all sorted. 

Applications that use the GUI section of the .vim color file solve this problem nicely, since the actual hex color codes are right there. So far the only application that I'm pretty sure uses these color codes is MacVim, which makes a lot of sense. I take comfort in the fact that at least what's now become my main code-writing application will always use the exact colors specified in the mustard.vim file, regardless of my console application preferences. 

[iTerm2 boasts support for 256 colors](https://www.iterm2.com/features.html), but I guess that's not nearly enough to use real hex codes.

### Fonts

Back in February '14 I had recently starting using [Deja Vu Sans Mono](http://dejavu-fonts.org/wiki/Download) for Sublime Text. Now I use it for my console and for MacVim. Consistency! 

Just the other day, though, I got [a Sublime Text tips email](http://sublimetexttips.com/) that featured a new coding font called [Hack](https://github.com/chrissimpkins/Hack?__s=zqtsopr3dvarx5aep2ga). Being naturally interested in fonts and my coding environment, I generally try out any coding font that looks decently good to me on first pass. 

From Hack's About section: 

> No frills. No gimmicks. Hack is hand groomed and optically balanced to be a workhorse face for code.
> It has deep roots in the libre, open source typeface community and expands upon the contributions of the Bitstream Vera & DejaVu projects. The face has been re-designed with a larger glyph set, modifications of the original glyph shapes (including distinct point styles and semi-bold punctuation weight in the regular set to make analphabetic characters less transparent), and meticulous attention to metrics (including numerous spacing adjustments to improve the rhythm of the face and the legibility of code at small text sizes)

From this short description, and the samples in the GitHub readme, Hack looked pretty good to me, so I decided to try it out.

First of all, I was happy to see that Hack is apparently based on, and looks very similar to my go-to coding font: DejaVu Sans Mono. Here's a sample of Hack:

![This is Hack](https://raw.githubusercontent.com/chrissimpkins/codeface/master/images/hack.png)

And here's DejaVu:

![This is DejaVu Sans Mono](https://raw.githubusercontent.com/chrissimpkins/codeface/master/images/dejavu-sans-mono.png)

For comparison, here's [Droid Sans Mono](http://www.fontsquirrel.com/fonts/droid-sans-mono), which I used in Terminal for a time.

![This is Droid Sans Mono](https://raw.githubusercontent.com/chrissimpkins/codeface/master/images/droid-sans-mono.png)

In general I like Hack. But when it comes to a font that I'll look at for hours every day, I have extremely high standards. DejaVu has survived a number of challengers in the past 18 months, and every time it does I realize a bit more how much it works for me. 

In my opinion, compared to DejaVu, Hack looks to have slightly increased line spacing, more stylized punctuation characters like asterisk, comma, exclamation point, question mark, and semi-colon, and a slightly thinner stroke. 

Also, the lowercase i in Hack is "swooped" to the right rather than DejaVu's full feet/serif. (I'm not sure what the technical terms are here.) I now see that DejaVu has swoops rather than feet on lowercase t's and l's, so shouldn't it be strange that it has feet on the lowercase i? Shouldn't I prefer the uniformity of Hack in this case? Maybe I'm just used to the DejaVu i! 

Overall I'd say Hack is slightly more feminine than DejaVu, and I've always liked DejaVu for it's straight-forwardness and heavier weight. I think I'll continue to stick with DejaVu for now, but I'm glad I tried Hack. Again, you can download [Hack here](https://github.com/chrissimpkins/Hack?__s=zqtsopr3dvarx5aep2ga) and [DejaVu can be downloaded here](http://dejavu-fonts.org/wiki/Download), both for free!  

2016 Update: Google also has nice, open source monospaced font called [Noto Mono](https://www.google.com/get/noto/#mono-mono) that looks pretty good! Wish it had a slashed or dotted zero though...

![Noto Mono](https://noto-website.storage.googleapis.com/samples/mono-mono_en-Latn_400_normal.svg)

But yeah, I'm still going strong with Deja Vu Sans Mono.
