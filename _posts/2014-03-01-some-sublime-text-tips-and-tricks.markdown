+++
title= "Some Sublime Text Tips and Tricks"
date= "2014-03-01 17:54:50 -0500"
comments = "true"
+++

Thanks to [a blog post](http://ifeisshort.wordpress.com/2014/02/28/simply-sublime-part-1/) by fellow-Flatiron student Emma Ife I found a free tuts+ course called ["Perfect Workflow in Sublime Text 2"](https://tutsplus.com/course/improve-workflow-in-sublime-text-2/) by Jeffrey Way. 

As you may have gathered from [one of my previous posts](http://sts10.github.io/blog/2014/02/14/my-current-coding-setup/), I'm into this whole make-your-computer-your-personalized-tool concept. When I'm in the Ruby debugging trenches I want every advantage I can get, you know? Obviously having a better understanding of my main code editor, Sublime Text 2, fits into this category. 

The 4 (and a half) coolest things I picked up from Way's course are...

<!-- more -->

### 1. The Command Palette is your friend

I had seen our instructors and other students use Sublime Text's command palette, but I never really understood what it was or even what keyboard shortcut they were using to access it so quickly. 

From what I gather, the command palette (accessible by hitting command+shift+p) provides the user with a search of every menu function that Sublime has. You can do all sorts of things with it, but the most common seems to be setting the syntax of your current file. Never again will I go down to the bottom-right hand corner of my Sublime window to set syntax with my mouse!

Relatedly, command+p opens a text box to search for files in your current project. This helps makes the sidebar less necessary, saving screen real estate. 

### 2. Markdown Editing Plug-in

What notes I have been taking during my time in class at Flatiron I've taken using Writer Pro and using Markdown. But as these notes include code more and more and as I've been getting more comfortable in Sublime, it made sense for me to try to use Sublime for my Markdown writing as well. 

For using Markdown, Way recommends buying a separate Markdown preview program called Marked, which I already had. Unfortunately I don't like it very much-- I can't get the code syntax to work quite right. So I kept looking for other ways to make writing Markdown in Sublime a little more friendly. 

Once you install Will Bond's [Package Control](https://sublime.wbond.net/) you can easily install new syntaxes and plugins for Sublime through the command palette. I don't think I committed to any of the cool plugins Way shows in the course, but I did install [MarkdownEditing](https://sublime.wbond.net/packages/MarkdownEditing), which as I understand is a more advanced syntax reader for Markdown. It also changes the color scheme of your file when you set it to Markdown (a nice light-black-on-off-white). 

So for now I've changed my default Markdown editor from Writer Pro to Sublime. It just seems more conducive to inputting code blocks, plus the more time I spend in Sublime the better.

### 3. Explore the default key bindings and don't be afraid to add your own

While I had ventured into setting some user settings in Sublime, I hadn't waded into adding custom key bindings (or keyboard shortcuts). I also hadn't really endeavor to learn many of the default bindings, beyond the awesome command + d selector. 

### 3.5 Paste_and_indent

In the default settings I picked up one new shortcut I'll try to use. It's called **paste_and_indent** and by default it's set to shift+command+v. You know how when you paste multiple lines of code and then you usually have to take a second to redo the indentation? I _think_ this command tries to help do that for you. So far it seems to work well. And what's cool is if I really prefer it to the normal paste, I could easily add a new user key binding to set paste_and_indent to command+v. 

Another thing I wanted to figure out was how to quickly toggle the Sublime sidebar (which shows your project's files). By default hide sidebar is set to command+k, command+b, but I thought this was pretty silly. So I just changed it to alt+s by adding the following to my user key bindings (accessible via Preferences > Key Bindings - User) within the array (i.e. inside the square braces): 

```
{ "keys": ["alt+s"], "command": "toggle_side_bar" }
```

Not so scary, right? 

### 4. Split windows

The section on managing split layouts was probably my favorite part of Ways lesson. I had always wanted to get into using multiple columns, but I didn't feel like I had enough control or understanding of how to go about it. Plus, with the sidebar and mini-map always framing my window, I never had much room on my 13" MacBook Air. 

By default, alt+command+2 creates 2 columns. ctrl+shift+2 then moves your current file from wherever it is to column 2. I quickly rewrote the move_to_group command to alt+[column number], like so: 

```
  { "keys": ["alt+1"], "command": "move_to_group", "args": { "group": 0 } },
  { "keys": ["alt+2"], "command": "move_to_group", "args": { "group": 1 } },
  { "keys": ["alt+3"], "command": "move_to_group", "args": { "group": 2 } },
  { "keys": ["alt+4"], "command": "move_to_group", "args": { "group": 3 } }
```

So knowing those two commands I was already feeling more confident using multiple columns, but there's a third piece that Way shows us that really makes it all work. 

Basically, sometimes you want two columns, but you're really working on one of them and just referring the file in the other column. For this situation, a 50/50 split isn't ideal. What if you could quickly resize the column widths? Check this out: 

```
{
    "keys": ["super+alt+right"],
    "command": "set_layout",
    "args":
    {
      "cols": [0.0, 0.38, 1.0],
      "rows": [0.0, 1.0],
      "cells": [[0, 0, 1, 1], [1, 0, 2, 1]]
    }
  },

  {
    "keys": ["super+alt+left"],
    "command": "set_layout",
    "args":
    {
      "cols": [0.0, 0.62, 1.0],
      "rows": [0.0, 1.0],
      "cells": [[0, 0, 1, 1], [1, 0, 2, 1]]
    }
  }
```

As Way explains, these two bindings allow me to re-size the 2 columns from the keyboard. Now, alt+command+"left arrow key" makes the left column 62% of the screen and shrinks the right column to 38%. Likewise, alt+command+right does the opposite. I left alt+command+2 as is from default, so that still returns me to a 50/50 split. Checkout the section Way's course called ["Configuring and Mastering Split Windows"](https://tutsplus.com/lesson/configuring-and-mastering-split-windows/) for more. 


That's about it for now. For reference, here's my full user key bindings file at this point. Notice the commas after all the curly braces except the last one.


```
[
  { "keys": ["alt+s"], "command": "toggle_side_bar" },

  {
    "keys": ["super+alt+right"],
    "command": "set_layout",
    "args":
    {
      "cols": [0.0, 0.38, 1.0],
      "rows": [0.0, 1.0],
      "cells": [[0, 0, 1, 1], [1, 0, 2, 1]]
    }
  },

  {
    "keys": ["super+alt+left"],
    "command": "set_layout",
    "args":
    {
      "cols": [0.0, 0.62, 1.0],
      "rows": [0.0, 1.0],
      "cells": [[0, 0, 1, 1], [1, 0, 2, 1]]
    }
  },

  { "keys": ["alt+1"], "command": "move_to_group", "args": { "group": 0 } },
  { "keys": ["alt+2"], "command": "move_to_group", "args": { "group": 1 } },
  { "keys": ["alt+3"], "command": "move_to_group", "args": { "group": 2 } },
  { "keys": ["alt+4"], "command": "move_to_group", "args": { "group": 3 } }

]
```








