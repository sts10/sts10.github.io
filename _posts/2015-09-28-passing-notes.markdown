+++
title= "Passing Notes, Or How I Quit Evernote"
date= "2015-09-28 19:37:46 -0400"
comments = "true"
+++

About a week ago I started thinking about how I take notes on desktop and my iPhone. Sometimes I email links and information to myself, other times I use [Evernote](https://evernote.com/). But, like everyone else, my email inbox is a messy place (despite my GMail label just for emails from and to myself, which does help), and I found Evernote slow and clunky on both desktop and iOS. How could I improve on this system? My goal was to store notes taken on desktop and iOS in one place, but not necessarily use the same app suite to edit them in both environments. 

<blockquote class="twitter-tweet" lang="en"><p lang="en" dir="ltr">Evernote feels like Word at this point. What should I use to pass notes from desktop to iOS?</p>&mdash; Sam Schlinkert (@sts10) <a href="https://twitter.com/sts10/status/645753188168171521">September 21, 2015</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

<!-- more --> 

Obviously there might be other iOS + desktop apps that might work better for me: 

<blockquote class="twitter-tweet" lang="en"><p lang="en" dir="ltr"><a href="https://twitter.com/sts10">@sts10</a> OneNote</p>&mdash; jake beckman (@jakebeckman) <a href="https://twitter.com/jakebeckman/status/645753354539372548">September 21, 2015</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet" lang="en"><p lang="en" dir="ltr">.<a href="https://twitter.com/sts10">@sts10</a> I couldn&#39;t answer you until today, but I love Keep (<a href="http://t.co/mcJuJ1xhX5">http://t.co/mcJuJ1xhX5</a>). I am, admittedly a bit biased. :)</p>&mdash; Scott Johnston (@happyinwater) <a href="https://twitter.com/happyinwater/status/647135445395075076">September 24, 2015</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet" data-conversation="none" data-cards="hidden" lang="en"><p lang="en" dir="ltr"><a href="https://twitter.com/sts10">@sts10</a> I&#39;m a huge fan of Simplenote <a href="http://t.co/imsG4UgUSJ">http://t.co/imsG4UgUSJ</a></p>&mdash; Corbin Page (@corbpage) <a href="https://twitter.com/corbpage/status/646157770023149568">September 22, 2015</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

But Ernie Smith's answer caught my eye. 

<blockquote class="twitter-tweet" data-conversation="none" lang="en"><p lang="en" dir="ltr"><a href="https://twitter.com/sts10">@sts10</a> Create a folder in Dropbox for Markdown files. I use that strategy for everything. It&#39;s ace.</p>&mdash; Ernie Smith (@ShortFormErnie) <a href="https://twitter.com/ShortFormErnie/status/645753617807486976">September 21, 2015</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

Like most folks, I'd used Dropbox before for moving files and photos between computers or friends. But Ernie's suggestion made me realize that there were definitely iOS note-taking apps that sync with Dropbox (I had [heard of Byword](http://thesweetsetup.com/apps/our-favorite-markdown-writing-app-for-the-iphone/), an iOS + desktop suite that used Markdown and sync'd with Dropbox, so I knew there were such apps).

## My New System

You could use any pair of text editors to edit Markdown files on your computer and phone. There are many text editors that handle Markdown well both for desktop and phones. Below I outline the pair I found that work best for me. 

So first, I modified a Bash script I had used to take notes all the way back at the Flatiron School that I called Jot. It had lived in by `.bash_profile`, but for this project I liberated it into a stand-alone `.sh` file and [pushed it to GitHub](https://github.com/sts10/jot) to make it easier to work with and for others to use. 

[Jot](https://github.com/sts10/jot) is very simple. At installation, the user specifies a path to save files to as well as a command line command to open her preferred text editor (`vim`, `nano`, `subl`, etc.). Once installed, she can run any of the following from anywhere in her system: 

- `jot new file` to create `new-file.mdown` in your specified directory. Jot will also open the new file for you.
- `jot select` to be presented with list of your files
- `jot all` to open your specified jot directory in your chosen text editor. 
- `jot where` to ask where you're currently jotting

Obviously I pointed the path to save these files to `/Users/"$USER"/Dropbox/notes/`, a `notes` directory within my shared Dropbox directory. I describe Jot's installation process in more detail in [the GitHub readme](https://github.com/sts10/jot), however know that to install it you'll need to comfortable adding text to your `.bash_profile` and enjoy using a text editor you can call from the command line. These days [I'm using MacVim](http://sts10.github.io/blog/2015/08/07/from-terminal-vim-to-mac-vim/), which is my preferred way to edit text on desktop at this point.

Once I had that little script working to my liking (I could verify that the created markdown files were successfully saving and updating to the Dropbox folder), I set out to find a iOS markdown note-taking app that sync'd with Dropbox. Since [the Sweet Setup recommended it](http://thesweetsetup.com/apps/our-favorite-markdown-writing-app-for-the-iphone/), I started with [Byword](https://itunes.apple.com/us/app/byword/id482063361?mt=8). Yes, it's $5.99 now, but I'm generally fine with one-time purchases under $10 if it's something that will live on my home screen. 

![Byword preview, via the app store](http://a5.mzstatic.com/us/r30/Purple3/v4/f0/4a/46/f04a46d0-aedc-e0d4-7314-fb59e7825529/screen322x572.jpeg)

It's relatively clean, with a nice exception of a tricked-out keyboard, which includes markdown shortcuts like list, emphasis, tab, header, image, link, etc. It also has left and right arrow keys, making navigation that much easier.

![keyboard](http://a2.mzstatic.com/us/r30/Purple1/v4/7c/bf/c6/7cbfc6d3-2d4c-924b-987b-e41968c0b783/screen322x572.jpeg) 

Best of all, once connected, it syncs with Dropbox (or whichever of the other syncing options you chose-- too lazy to look them up) right away. I opted to have it sync of cell networks, though by default it will sync only when connected to wifi. 

Byword also has some publishing options that I believe you have to buy in app, but I just wanted to use it for private notes. 

## How I Like It

So far so good. It syncs both ways impressively quickly. I obviously knew what I was getting with Vim, so Byword was the bigger X factor, but it's been good. By default it saves files as `.txt`, which seemed very strange considering the app promotes markdown syntax. But with a quick complaining tweet I got to the bottom of it: 

<blockquote class="twitter-tweet" lang="en"><p lang="en" dir="ltr"><a href="https://twitter.com/sts10">@sts10</a> save one file adding .mdown in the Save As text field and Byword will remember that as your preferred extension from there.</p>&mdash; Byword app (@bywordapp) <a href="https://twitter.com/bywordapp/status/646077837187936256">September 21, 2015</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

Now that that's been solved, things are pretty smooth. Both sides-- desktop and iOS-- play well with subfolders, which is nice (I never liked the way Evernote handled this concept with "notebooks"). One down side of the vim solution on desktop is that when I create a new note in Byword, I can't really have spaces in the filename. Also, if no filename is specified in Byword, it just uses `Untitled.mdown`. Would be flashier if it used either the first line of text, downcased with hyphens replacing spaces, or the date and time (like Evernote does). But that's a minor-enough flaw that I'll stick with Byword for a while longer. 

## Possible Improvements to the System

I was thinking of adding an option to encrypt notes with the `gpg` command line tool before uploading them to Dropbox. I'd obviously decrypt them when you choose to read an encrypted idle on desktop, but I'm note sure to handle the encryption/decryption elegantly on iOS (Byword certainly doesn't support RSA). Could just have it only apply to desktop notes. Open to creative ideas. 

Another hiccup is that both my Jot shell script and MacVim, when you call `mvim .` on a directory, sorts files alphabetically rather than by most recently modified (as Byword and Evernote do). I think I prefer sorting by recently modified. There's probably coding solutions to both the MacVim buffer view and the bash code though.
