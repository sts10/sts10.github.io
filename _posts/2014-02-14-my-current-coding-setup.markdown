+++
title= "Apps, Fonts, and Colors of my Current Coding Setup"
date= "2014-02-14 01:06:10 -0500"
comments = "true"
+++

I’ve been playing with my color theme and default font-face in my code editor, Sublime Text 2, this cold, snowy weekend, so I thought I’d share a little about my current application setup. I don’t know, maybe this is boring? Self-involved? I try not to get too bogged down in tricking out my gear (while I should be writing code). But on the other hand, now that I’m using my computer even more than I have in the past, I do think it’s important to get it feeling right and looking good. 

This post will probably end up serving as an interesting sort of time capsule for me to see what I’m still using six months or a year from now. And hey, maybe one of you will find a new app or setting to use. 

By no means is any of this set in stone— I even made some big changes this week, some of which may not last. 

<!-- more -->

### Main Applications

For all my coding needs I’m still going strong with [Sublime Text 2](http://www.sublimetext.com/2), which I started using while at The Daily Beast. I like to have a separate writing app, but Word is too slow. About a month ago I bought [Writer Pro](http://writer.pro/) and I’ve stuck with it, writing and editing in Markdown for the first time. Sublime, Writer Pro, Chrome and the terminal really handle my day-to-day needs (plus Adium for gchat). For example I check my gmail in Chrome. 

I’m trying to get into the habit of using command + tab to switch between programs and using [Alfred](http://www.alfredapp.com) to open new applications (I think I’ll buy the PowerPack soon-- Update: I have, but the free version is pretty great). Flatiron also recommended [Dash](http://kapeli.com/dash), a free-to-try-forever app that let’s you search multiple coding language APIs offline. Haven’t used it much at this point, but glad it’s there if I’m ever need to look up a Ruby method or CSS selector on a beach without wifi someday. 

### Aesthetics 

For Sublime Text 2 I’m now using [Deja Vu Sans Mono](http://dejavu-fonts.org/wiki/Download) at 16 px as my font. I also just switched to a new color theme called [Mustard](http://colorsublime.com/?page=9). Gotta say I’m pretty happy with the look—the masculine colors work well with the boldness of Deja Vu. I’ve got my tab width set to 2 and am indenting with spaces, which is apparently how the cool kids roll. 

![My Sublime color and font choices](http://i.imgur.com/teATEpJ.png)

Also, in Sublime Text 2’s `Preferences > Settings - User` I switched “drag_text” to false, as I never use drag-and-drop to cut and paste text. I’d only do it sometimes by mistake, which really sucked. One less thing to worry about. Here's my full User Settings file:

```json
{
    "color_scheme": "Packages/Colorsublime-Themes/Mustard.tmTheme",
    "font_face": "DejaVu Sans Mono",
    "font_size": 16.0,
    "tab_size": 2,
    "translate_tabs_to_spaces": true,
    "drag_text": false,
    
    "ignored_packages":
    [
        "Vintage",
        "Markdown",
        "ERBAutocomplete"
    ]
}
```

In my terminal, the customization of which [I wrote about last week](http://sts10.github.io/blog/2014/02/05/flatiron-day-two/), I’m sticking with [Droid Sans Mono](http://www.fontsquirrel.com/fonts/droid-sans-mono) size 13 px. I can’t find any other font that looks good with the terminal’s formatting. 

### Less-Frequently Used Applications

I use [CyberDuck](http://cyberduck.io/) for uploading to my personal site (although it’s been a little glitchy for me recently). [xScope](http://xscopeapp.com/) is a nice little measurement app that helps for front-end web stuff (I’m currently rocking the free version). 

I’m not super happy with [Jing](http://www.techsmith.com/jing.html), my screenshot handler. On Avi’s recommendation I’m considering trying [Glui](http://glui.me/).  For editing my own photos, I shelled out some bills for Adobe Lightroom to escape the grasp of iPhoto. 
