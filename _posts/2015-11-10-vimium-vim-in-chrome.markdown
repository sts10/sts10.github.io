+++
title= "Vimium: Vim in Chrome"
date= "2015-11-10 21:13:31 -0500"
comments = "true"
+++

I was browsing [my vim multireddit](https://www.reddit.com/user/sts10/m/vim_multi) today and, a few turns down a rabbit hole, found a Chrome Extension called [Vimium](https://vimium.github.io). It's purpose is to provide Vim-like keyboard shortcuts for navigating the web. Here is [the link to the Chrome Store page](https://chrome.google.com/webstore/detail/vimium/dbepggeogbaibhgnhhndojpepiihcmeb). 

The default key mappings are spelled out in [the GitHub repo's ReadMe](https://github.com/philc/vimium/blob/master/README.md). However the scroll bindings and link opening commands seemed a bit much for me. Plus the tab navigation seems redundant to me, considering the Chrome already has good shortcuts for tab navigation (`Command + shift [` and `Command + <tab number>`, plus `Command + t`, `Command + w` and `Command + Shift + t` [reopen last closed tab]), all of which I've become trained to use.

But there are some tricks and functionality that Vimium genuinely adds to Google Chrome. By that I mean not only does it make functions you could do in default Chrome with a mouse accessible via keyboard shortcut (like pin tab), but it adds functions that, to my knowledge, users simply could not do in default Chrome (for example: search open tabs and close tabs to the left). These are the commands I was and am most interested in adding via this extension. 

<!-- more -->

However I knew I probably didn't want to have a keyboard shortcut for _every_ Vimium command. I wanted to be able to pick and choose which mappings were enabled. Wonderfully, Vimium accepts custom key mappings in a nifty, simple text-field in the extension's options menu. 

![Partial view of Vimium options menu](http://i.imgur.com/NE6CtIe.png)

You can even clear all default mappings by starting with `unmapAll`. After that, users are free to specify only the mappings that they want. 

So here is my first stab at my custom key mappings:

```
unmapAll
map <a-p> togglePinTab
map <c-p> Vomnibar.activateTabSelection
map yy copyCurrentUrl
map yt duplicateTab
map vs toggleViewSource
map / enterFindMode
map n performFind
map N performBackwardsFind
map <c-h> moveTabLeft
map <c-l> moveTabRight
map <a-h> closeTabsOnLeft
map <a-l> closeTabsOnRight
map ? showHelp
```

### Notable Mappings:

- `<a-p>` (meaning alt-p) pins current tab-- a shortcut I've always wanted. 
- `<c-p>` (control-p) searches your open tabs-- super awesome for users like me who often have a ton of tabs open at once. It's actually what seems like a fuzzy search, which is dope. (I chose control-p after [a Vim plugin I use called ctrlp](https://github.com/kien/ctrlp.vim) that performs a similar operation in Vim.)
- `yt` - As with pin tab, I always wanted a keyboard shortcut for duplicating the current tab.
- the Find mode stuff is straight Vim-- I'm going to give it a try, since you can navigate to the next and previous matches straight from the keyboard.
- And lastly I have some commands to move tabs and close tabs to the left and right of the current tab. You can right-click a tab and choose to close tabs to the right of it, which is super useful. But now I can close to the left as well, and both without leaving the home row of the keyboard.

Again note, **search open tabs** and close tabs to left and  are new functions! Very cool! 


For the record, here are all the Vimium commands that are available to be mapped (including the advanced commands), which I found by clicking the "Show available commands" link next to the "Custom key mappings" text-field:

```
Navigating the page

Scroll down (scrollDown)
Scroll up (scrollUp)
Scroll left (scrollLeft)
Scroll right (scrollRight)
Scroll to the top of the page (scrollToTop)
Scroll to the bottom of the page (scrollToBottom)
Scroll all the way to the left (scrollToLeft)
Scroll all the way to the right (scrollToRight)
Scroll a page down (scrollPageDown)
Scroll a page up (scrollPageUp)
Scroll a full page up (scrollFullPageUp)
Scroll a full page down (scrollFullPageDown)
Reload the page (reload)
vs	:	View page source (toggleViewSource)
yy	:	Copy the current URL to the clipboard (copyCurrentUrl)
Copy a link URL to the clipboard (LinkHints.activateModeToCopyLinkUrl)
p	:	Open the clipboard's URL in the current tab (openCopiedUrlInCurrentTab)
P	:	Open the clipboard's URL in a new tab (openCopiedUrlInNewTab)
Go up the URL hierarchy (goUp)
Go to root of current URL hierarchy (goToRoot)
Enter insert mode (enterInsertMode)
Enter visual mode (beta feature) (enterVisualMode)
Enter visual line mode (beta feature) (enterVisualLineMode)
Focus the first text box on the page. Cycle between them using tab (focusInput)
Open a link in the current tab (LinkHints.activateMode)
Open a link in a new tab (LinkHints.activateModeToOpenInNewTab)
Open a link in a new tab & switch to it (LinkHints.activateModeToOpenInNewForegroundTab)
Open multiple links in a new tab (LinkHints.activateModeWithQueue)
Download link url (LinkHints.activateModeToDownloadLink)
Open a link in incognito window (LinkHints.activateModeToOpenIncognito)
Follow the link labeled previous or < (goPrevious)
Follow the link labeled next or > (goNext)
Cycle forward to the next frame on the page (nextFrame)
Select the tab's main/top frame (mainFrame)
Create a new mark (Marks.activateCreateMode)
Go to a mark (Marks.activateGotoMode)

Using the vomnibar

Open URL, bookmark, or history entry (Vomnibar.activate)
Open URL, bookmark, history entry, in a new tab (Vomnibar.activateInNewTab)
<c-p>	:	Search through your open tabs (Vomnibar.activateTabSelection)
Open a bookmark (Vomnibar.activateBookmarks)
Open a bookmark in a new tab (Vomnibar.activateBookmarksInNewTab)
Edit the current URL (Vomnibar.activateEditUrl)
Edit the current URL and open in a new tab (Vomnibar.activateEditUrlInNewTab)

Using find

Enter find mode (enterFindMode)
Cycle forward to the next find match (performFind)
Cycle backward to the previous find match (performBackwardsFind)

Navigating history

Go back in history (goBack)
Go forward in history (goForward)

Manipulating tabs

Go one tab right (nextTab)
Go one tab left (previousTab)
Go to the first tab (firstTab)
Go to the last tab (lastTab)
Create new tab (createTab)
yt	:	Duplicate current tab (duplicateTab)
Close current tab (removeTab)
Restore closed tab (restoreTab)
Move tab to new window (moveTabToNewWindow)
<a-p>	:	Pin/unpin current tab (togglePinTab)
Close tabs on the left (closeTabsOnLeft)
Close tabs on the right (closeTabsOnRight)
Close all other tabs (closeOtherTabs)
Move tab to the left (moveTabLeft)
Move tab to the right (moveTabRight)

Miscellaneous

?	:	Show help (showHelp)
```
