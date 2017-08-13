+++
title= "Why I Want Text-File Preferences For Every Application I Use"
date= "2015-02-18 20:14:35 -0400"
comments = "true"
+++

I recently started using a text editor called Vim. For the uninitiated, Vim is a lightweight text editor often used for writing code. It comes pre-loaded on some if not all remote servers. Since it's designed to be used without a mouse, there are tons of keyboard shortcuts to learn. This part isn't a huge deal-- for now just know that Vim is a text editor, like Notepad or Sublime Text or Word. (And note that I am still pretty shitty at using it.)

<!-- more -->

Like most programs, Vim has a bunch of preferences you can set however you like. If you're like me, when you download a new program like TweetDeck or Slack or Adium or whatever, sooner rather than later you go into the program's preferences and see what things you can tweak to your taste. It's usually a series of GUI tabs, checkboxes, and drop-down menus. Here's the “General” panel of my Adium settings:

![My Adium Settings](https://d262ilb51hltx0.cloudfront.net/max/800/1*H4tjCbmxS1ypa0I_wXBndA.png)

However, since you can run Vim without a graphical interface, users set their preferences and settings in a text file called “vimrc”. Necessarily, this text needs to be written in a certain way, so it's technically code. But let's not freak out. What does that look like? Well, here is a portion of [my vimrc file](https://github.com/sts10/terminal_and_vim_settings/blob/master/vimrc) (Note that lines that begin with a double quotation mark are comments, not read by Vim, only us humans.)

```
" set font for gui vim
set guifont=DejaVu\ Sans\ Mono:h17
" for color scheme
colorscheme mustard
set background=dark
" Turn syntax highlighting on 
syntax on
" show command as you type them
set sc
" set tab as 4 spaces
set tabstop=4
set shiftwidth=4
set expandtab
" auto indent
set autoindent
" turn on the wildmenu cuz everyone says to
set wildmenu
" search characters as they're entered
set incsearch
" have vim re-load files when they're changed outside of vim
set autoread
```

So let's take an example: set tabstop=4 means that I want my tabs to be equal to 4 spaces. I could change that to 2, or I could remove the line from my vimrc file altogether and Vim would fall back to the default tab size (which is 8 I think?). The important thing to note is that it's just text. You, reader, could copy and paste that code block into your vimrc file and once you restarted Vim you'd be using my settings. Thus I'm calling it “text-file preferences,” a phrase I made up today.

Now, depending on your experiences, this may seem like a confusing and unnecessary disadvantage over the graphical preferences menus that more “normal” programs like Adium have. But I argue that having your user preferences stored in a text file like this is incredibly powerful.

### Why This Is Good

There are two reason I think it's very powerful. The first is that your setup becomes extremely portable. When I setup Vim on my work computer, all I had to do was copy and paste my vimrc file into the appropriate location and boom, all my settings were good to go. If I had needed to manually enter all of these settings into a graphical interface, it would have taken much longer.

With all of my preferences in a text file, I could have hundreds of settings set just how I like them and it would take me the same amount of time to transfer them to a new environment as if I had only 2 settings specified. In this way text-file preferences make it easy for applications makers to offer more options for power users without confusing newbies (assuming they have sensible defaults). Also, backing-up your preferences is as easy as saving a text file.

The second, and far more important reason that text-file preferences are awesome is that they make sharing settings very easy. If you [Google vimrc example](https://www.google.com/webhp?sourceid=chrome-instant&ion=1&espv=2&ie=UTF-8#q=vimrc%20example) you'll find tons of example vimrc files of Vim users. I picked up a bunch of tips for my personal vimrc file, learning new settings I didn't know about or alternate ways of changing defaults that I didn't like, for poking around in the settings of other users. Sample vimrc files can be advertised as optimized for a specific task, style, or programming language. Thus these settings and customizations can be debated in the public forum of the internet, helping everyone find a set of preferences that best suits them.

NOTE: This second argument is a bit inflated because developers (of which almost all Vim users are, from what I can tell) are comfortable with the philosophy of open sourcing code and have working knowledge of Git and GitHub (an insanely powerful system). But perhaps the general population of computer users will start to move in that direction. Certainly they are always gaining more ways of publishing and sharing text publicly.

Additionally, Vim's [color settings](https://github.com/sts10/terminal_and_vim_settings/blob/master/mustard.vim) and custom keyboard shortcuts (called mappings) are stored as text, so these additional customizations benefit in the same way.

### This is Just For Power Users. And Isn't The Power User is Dead?

Obviously the bulk of the benefits of text-file preferences I've described really only apply to power users. Maybe some of you never dive into the GUI preferences menus of your applications, or never use keyboard shortcuts, let alone have a desire to add custom ones. Hell, maybe you think good programs should only need a handful of setting options. My now-colleague Charlie Warzel declared [the power user dead way back in October of 2013](http://www.buzzfeed.com/charliewarzel/the-end-of-the-power-user), with the formidable thesis that for large, established companies like Facebook and Twitter, the eyeballs of a new user are just as valuable as that of a power user. Perhaps I am a strange outlier overly-influenced from my dabbling as a programmer.

But!

I have faith that as more and more people become more computer literate and, more importantly, become even a bit more comfortable with “code,” they will begin to care about seemingly small things like granular customizations and portability of their user settings. And as a response, app developers will both feel more comfortable, and eventually NEED, to offer users more options and customizations.

Of course developers could offer users both a graphical menu for their settings AND a text file option, assuming the graphical interface allows users to easily import and export their settings.

Naturally the next step here would be allowing third-party plugins for applications, for which I've added 3 to Vim already. But that's a battle for another day.
