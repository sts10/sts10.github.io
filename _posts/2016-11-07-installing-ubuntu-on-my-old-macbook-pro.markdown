+++
title= "Installing Ubuntu on my old MacBook Pro"
date= "2016-11-07 23:07:09 -0500"
comments = "true"
+++

I had an old 17 inch MacBook Pro from 2009 (college) lying around and I figured it'd be a fun challenge to install Linux on it. I had never installed or even used Linux before (to my knowledge). I also, confusingly, hadn't found a clean, step-by-step guide for doing this, so I promised I'd write my process out as thoroughly but simply as I could once I got it done. 

I now realize, I think, that the reason the process of installing even a popular Linux distribution on a common (if old) model computer isn't written out or easily findable is that the process is a bit different for everyone, depending on the distro, the version, and the hardware you're starting with. Note that I didn't want to partition my hard drive to allow myself to dual-boot either in OS X or Ubuntu-- I was going for a full replacement, and thus would and did lose all the files on applications I had on the old Mac.

But regardless, here is the process I took. 

<!-- more -->

## About This Mac

```
Model name: MacBook Pro
Model Identifier: MacBookPro3,1
Processor Name: Intel Core 2 Duo
Processor Speed: 2.4GHz
Number of Processors: 1
Total number of cores: 2
L2 Cache: 4 MB
Memory: 2GB
Boot ROM Version: MBP31.0070.B07

It's a 17 inch screen. I believe I bought it in the summer of 2009.

was running:
OS X 10.9.2 (13C64)
```

## How I Got Ubuntu 16 Installed

Again, note, this worked for me and my machine but may not for you. For example I believe I had to do steps 4, 5, 8, 9, 10, and 11 only because I have a MBP with an Intel chip. 

Also, **WARNING**, this procedure completely wiped my OS X and all the files and applications on that installation, as I intended. There are ways to dual-boot both, but I wasn't interested in that as Mavericks was running super slow on this computer. Furthermore I think all the data I had on my USB stick is lost due to it being formatted in a certain way at some point in the procedure.

**UPDATE (February 2017)**: Before moving ahead, you may want to consider the following. A helpful commenter, Brian Moran, writes that, when installing Ubuntu on an older Mac with a NVIDIA graphics card, it may be better to "boot in 'Legacy BIOS mode', not in 'EFI' mode": 

> Apparently what is happening is that both the open source and Nvidia drivers are buggy when doing an "EFI Install" on Mac machines. If full graphics performance is desired, a "Legacy BIOS Install" is needed. 

From [the forum post that the commenter cites](https://ubuntuforums.org/showthread.php?t=2209602), which is concerned with a MacBook Air 3,2:

> The core problem with the [generic] installation is this. The graphic driver that Ubuntu installs by default (Nouveau) has bugs with the MacBook Air 3 graphic processor, the nvidia GeForce 320M (G320M). You can do a default install, it will boot normally, but you'll soon see little glitches here and there and the computer will normally crash after a few minutes of use (especially when transparency or shadow effects are used, it seems). The problem exists with Raring and I expect it arises with Precise (though see ''alternative solutions" below). 

> To avoid that, you need to install the proprietary nvidia driver. But here is the catch: the driver requires the computer to boot in "Legacy BIOS mode", not in "EFI" mode (see here or here). If you install the nvidia drivers while Ubuntu is in EFI mode, you'll get a blank/black screen at the beginning of the boot. (If you got to that stage, see the ''recovery for nvidia drivers EFI crash'' below). On a PC you can force Ubuntu to install in BIOS Legacy mode by selecting that mode in the computer BIOS. But on a Mac you can't (easily) do that, and if you install from a USB key by default you will be in EFI mode. 

> So summing up, if you do a default installation of Ubuntu from a USB on a MacBook Air 3,1 or 3,2, you'll either have buggy graphics and random crashes, or you'll install the nvdida drivers and have a blank/black screen at startup.

For the record, I followed the procedure detailed below with my MackBook Pro 3,1 and while I now believe that my nvidia card is NOT being used, basic computing (web browser, document editing coding, simple games) are working just fine. Not being a gamer I don't know much about graphics cards, but for what it's worth I believe my MacBook Pro has a G84M [GeForce 8600M GT] card, which is _not_ the same model listed in the forum post the commenter cites.

But if I were starting over I might instead consider the procedure outlined in [the forum post](https://ubuntuforums.org/showthread.php?t=2209602) the commenter links to in hopes of even better performance. End of February 2017 update.

Alright, with all that said here's what I think I would do if I were starting fresh, knowing what I know now:

### What I Did to Install Ubuntu

1. Get a USB drive with at least 2 GB of storage. Know that it's going to get wiped, so move important files off it first. Then use the MacOS Disk Utility to format the USB stick as DOS FAT32.
2. I'd follow [this guide](https://www.ubuntu.com/download/desktop/create-a-usb-stick-on-mac-osx) to download Ubuntu 16.04 LTS and get it onto the USB stick, using UNetbootin. 
3. As described in the final step in that guide, when you restart, hold down the option key on your Mac. In the resulting menu, select the "EFI" device as the device to boot from.
4. You'll be confronted with a text-only menu that's from a piece of software called GNU GRUB. Key down so your cursor is on "Install Ubuntu", but instead of pressing enter, press `e` to edit the commands before booting. 
5. This opens an options file in a basic text editor. Find the line that has `ro quiet splash` in it and make that bit of the line read `ro nomodeset quiet splash`. Then press either F10 or Ctrl-X to boot (read the text at the bottom of the screen to be sure of the key(s) to press).
6. If presented with a choice in GRUB (a text menu) with an option to `install Ubuntu`, choose that option. 
7. You should be then presented with a nice GUI (not text only) Ubuntu installer, or maybe an icon that says `Install Ubuntu`. Double click the icon if you see it. Go through everything, decide whether or not to connect your Wifi to download updates, decide whether or not to encrypt your home folder, and then choose restart. 
8. We now need to boot Ubuntu in [recovery mode](https://wiki.ubuntu.com/RecoveryMode). To do this, as the computer is starting up again after restart, right after you hear the Apple/Mac start-up sound, hold the SHIFT key. Repeat step #3 above if you're presented with the EFI option. Once you're at a text-only menu, press `e` and add `nomodeset` to the line of code discussed above. Then press the key(s) to boot. Ubuntu should boot up-- though the display may be screwy. In either case, we're not done yet.
9. Now we need to make that `nomodeset` setting permanent. Open terminal (ctrl+option+t) and run `sudo nano /etc/default/grub`. ([Reference](https://askubuntu.com/questions/38780/how-do-i-set-nomodeset-after-ive-already-installed-ubuntu#38782))
10. In that file, add `nomodeset` to `GRUB_CMDLINE_LINUX_DEFAULT` as seen below:

```
GRUB_DEFAULT=0
GRUB_HIDDEN_TIMEOUT=0
GRUB_HIDDEN_TIMEOUT_QUIET=true
GRUB_TIMEOUT=5
GRUB_DISTRIBUTOR=`lsb_release -i -s 2> /dev/null || echo Debian`
GRUB_CMDLINE_LINUX_DEFAULT="quiet splash nomodeset"
GRUB_CMDLINE_LINUX=""
```

11. Save this text file by hitting Ctrl+O, then exit nano with Ctrl+X, then, back in Terminal, run: `sudo update-grub`
12. Restart the computer (the menu for which is in the top-right corner of Ubuntu 16).

I think that would do it. I don't think I needed rEFInd. And apparently the warning on UNetbootin that I could run the device on Macs was not accurate.

**For completeness sake, here is the actual process I went through over three days.**

## Attempt #1: Ubuntu 16.04

I found [this guide](https://www.ubuntu.com/download/desktop/create-a-usb-stick-on-mac-osx) which involved downloading and using the [UNetbootin USB installer](https://unetbootin.github.io/).

I believe I successfully downloaded the Ubuntu 16.04 ISO and UNetbootin. I then installed UNetbootin (by dragging it into Application) and then I used UNetbootin as described in the tutorial. However at step 7 when I restarted my Mac and held the option key I was presented with a menu to try or install Ubuntu. Every time I selected "install" it just went to a black screen. I waited minutes but no installation screen appeared. I then held down the power button and the computer rebooted in OS X, back to square one.

I will say that after using UNetbootin to load the USB stick the program warned the device could only boot the new OS on PCs, not on Macs. I chose to ignore that warning and try anyway, but as I reported above, it didn't work.

Upon further research I believe the Ubuntu 16.04 may not work on Intel-based MBPs made circa 2009. One page, https://help.ubuntu.com/community/MacBookPro, seemed to encourage those with MBPs this old should instead opt for Ubuntu 14.04. 

I didn't want to run an old version of a distro I wasn't particualrly excited about if I could find a distro that I could run the lastest version of. Plus I couldn't quite figure out how to download an (official) copy of version 14.04.

## Attempt #2: Mint 18 ("Sarah") Cinnamon 64-bit

I understand that [the other distro well-reviewed for beginners](https://lifehacker.com/5993297/ubuntu-vs-mint-which-linux-distro-is-better-for-beginners) is [Mint](https://www.linuxmint.com). And I saw that Mint 18 was itself [got good reviews](http://arstechnica.com/information-technology/2016/08/mint-18-review-just-works-linux-doesnt-get-any-better-than-this/).

So I headed over to [their download page](https://www.linuxmint.com/download.php) and chose ["Cinnamon 64-bit"](https://www.linuxmint.com/edition.php?id=217) and downloaded it via a torrent. 

The [only tutorial that I found for installing Linux Mint via USB](https://community.linuxmint.com/tutorial/view/744) seemed strange and brief. Thus my current plan is to try to use UNetbootin again, following [the Ubuntu guide](https://www.ubuntu.com/download/desktop/create-a-usb-stick-on-mac-osx) but with Mint this time rather than Ubuntu 16.04. 

However, as before, after using UNetbootin it told me the device could only boot the new OS on PCs, not on Macs. 

When I restarted my Mac and held down the option key, I got a similar menu as when I tried Ubuntu, but eventually came to a dark black screen. I waited a few minutes, and then forced the computer to shut down by holding down the power button.

## Attempt #3: Back to Ubuntu 16.04 by a different method

I followed [the instructions presented here](https://help.ubuntu.com/community/How%20to%20install%20Ubuntu%20on%20MacBook%20using%20USB%20Stick), which I was optimistic about it because it avoided using UNetbootin, along with the potentially helpful warning:

> UNetbootin for Mac OS X can be used to automate the process of extracting the Ubuntu ISO file to USB, and making the USB drive bootable. The resulting USB drive, however, can be booted on PCs only.

Which mirrors the warning UNetbootin gave me. 

However the method described in the link above failed in the same way the others did-- I restarted, held down the option key, chose the EFI boot, chose to install Ubuntu, and then was met with a black screen. For the first time I thought to check the light on my USB stick to see if it was at least thinking but it was off.

## Attempt #4: Using rEFInd Boot Manager

From [here](http://www.linux-on-laptops.com/apple.html) I found [an article about installing Debian](http://research.naumachiarius.com/articles/macbook-debian.html) (a more advanced distro of Linux).

That let me to believe [rEFInd](http://www.rodsbooks.com/refind/) was something I needed to [install](http://www.rodsbooks.com/refind/installing.html) first. 

However this program (I admittedly didn't take the time to figure out what it actually does) did not seem to help. Afterward, and before my next attempt, I [bypassed rEFInd](http://www.rodsbooks.com/refind/installing.html#uinst_osx) by going to System Preferences > Start Up Disk, selecting my hard drive and hitting the restart button. Thus I do not think I actually needed to install rEFInd to successfully get Ubuntu installed, however I'm not 100% of this, since [the rEFInd uninstall instructions for OS X](http://www.rodsbooks.com/refind/installing.html#uinst_osx) recommend bypassing rEFInd rather than actually uninstalling it.

## Attempt #5: Having bypassed rEFInd, I replace `quiet splash` with `nomodeset`

Big success! 

Somewhere else I remember seeing someone recommend turning on an option called `nomodeset` in GNU GRUB, but for some reason didn't think I had that option in the menu that I kept getting. Turns out, as described [here](http://askubuntu.com/a/38834), when you get to the GRUB menu you hit the `e` key. Then you add `nomodeset` as a parameter in one of the lines of code in the text file that opens. Removing `quiet splash` seems to just present more text as output-- the `nomodeset` solved the problem. 

After maybe 40 seconds I was presented with an Ubuntu desktop and a shortcut icon to an Ubuntu installer. I double-clicked the installer and followed the wizard. 

I connected to my wifi network and told it to download updates as it installed to make things quicker. The only hard choice was whether to encrypt my home folder (which I believe you can't do later). I decided not to based on [this answer](https://askubuntu.com/questions/37/when-installing-im-given-the-option-of-encrypting-my-home-folder-what-does-t#62) as I was worried about the performance hit on decrypting on a machine with 2GB memory. Then I just waited for Ubuntu 16.04.1 LTS to install.

After installation it asked me to restart. I clicked yes. I then got an ugly error message that said something like "remove the installation device and hit enter". I still had the USB stick in, unsure when I was to remove it. I pulled it out and hit enter. The computer then restarted, making the familiar Mac start-up sound and presenting the familiar Mac gray, but then it switched to a purple Ubuntu-like color and stayed there for a minute. 

## Setting `nomodeset` permanently 

When I came back from that restart it was stuck on a purple screen. I figured I needed to set `nomodeset` permanently on. I needed to get back to the GRUB screen, which I figured out from somewhere:

1. Switch on your computer.
2. Wait until the BIOS has finished loading, or has almost finished. (During this time you will probably see a logo of your computer manufacturer.)
3. Quickly press and hold the Shift key, which will bring up the GNU GRUB menu. (If you see the Ubuntu logo, you've missed the point where you can enter the GRUB menu.) 

Then, to set `nomodeset` to be on permanently, I followed [this Ask Ubuntu answer](https://askubuntu.com/questions/38780/how-do-i-set-nomodeset-after-ive-already-installed-ubuntu#38782) that reads:

```
You should add this option to /etc/default/grub, firstly:

sudo nano /etc/default/grub

and then add nomodeset to GRUB_CMDLINE_LINUX_DEFAULT:

GRUB_DEFAULT=0
GRUB_HIDDEN_TIMEOUT=0
GRUB_HIDDEN_TIMEOUT_QUIET=true
GRUB_TIMEOUT=5
GRUB_DISTRIBUTOR=`lsb_release -i -s 2> /dev/null || echo Debian`
GRUB_CMDLINE_LINUX_DEFAULT="quiet splash nomodeset"
GRUB_CMDLINE_LINUX=""

And then save by hitting Ctrl+O, then exit nano with Ctrl+X, then simply run:

sudo update-grub

```

I saved that file and ran `sudo update-grub` as instructed. I then restarted my computer once again and I think that's when things went smoothly for the first time.

(FYI a similar process to the one described above seems to be given [here](https://ubuntuforums.org/showthread.php?t=1613132) but with some other stuff as well, if you need more help at this stage.)

## Initial Thoughts

Woohoo! It seems snappier that OS X 10.9, but it's not a speed demon like my 2012 MacBook Air with 8 GB of memory. 

But the desktop and dock are familiar enough to me. It comes with Firefox, [Libre Office](https://www.libreoffice.org/), a basic text editor, and a link to Amazon.com(?) in the dock that's on the left by default. I got terminal Vim and [RVM](https://rvm.io/) running with a few Google-able tweaks from the OS X installation process. Remapping caps lock to control was [one line in Terminal](http://askubuntu.com/a/614664) (`setxkbmap -option caps:ctrl_modifer`), however that did not persist when restarted. I followed [this AskUbuntu answer](https://askubuntu.com/questions/53038/how-do-i-remap-the-caps-lock-key#comment460778_336988) and went to Startup Applications > Add > and entered `setxkbmap -option caps:ctrl_modifer`. It seems to persist on restart now.

I was able to install git by running `sudo apt install git`. Similarly I was able to install KeePassX by running `sudo apt-get install keepassx` (I'm not 100% in the difference between `apt` and `apt-get` here but that's what I saw on the internet help sites I found). I also installed a fresh version of vim but I forget what line I ran in terminal. 

To run a general update and upgrade, I run `sudo apt update && sudo apt upgrade`, which seems to work.

We'll see how much I use this old computer going forward, and what for. 

Update: Just found [this website that aims to teach Linux for beginners](https://linuxjourney.com/), which I might checkout. There's also this series of YouTube videos: [Ubuntu Beginners Guide](https://www.youtube.com/watch?v=1dQTEw8n9yc) that looks nice, is Ubuntu-specific, and is, as of this writing, only one month old.

## Switching to Lubuntu

To avoid the high memory usage of Ubuntu's Unity desktop environment, I installed Ubuntu's LXDE desktop environment (called Lubuntu). I had a gist that Unity was a bit of a memory hog compared to other desktop environments. I also spotted [this Reddit post](https://www.reddit.com/r/linux/comments/5l39tz/linux_distros_ram_consumption_comparison_updated/?st=ixpgu5wy&sh=67b8f57f) that compares some lightweight distros in terms of RAM consumption and Lubuntu did well.

To install Lubuntu, I ran `sudo apt-get install lubuntu-desktop` (I learned this from a helpful user in the [Ubuntu Riot.im channel](https://riot.im/app/#/room/ubuntu:matrix.org)). The size of the installation was about 340 mb. 

After installing the Lubuntu desktop environment, you want to run the software updater, restart the computer (logging out is not enough), and at the login screen choose Lubuntu (or LXDE... that's another option and I'm not sure what the difference is). 

You can check how much RAM you have available by running `free -m` in the terminal. Thanks to [this site](http://www.linuxatemyram.com/), I knew to look for the value under "available" to get an accurate estimate of how many megabytes of my memory were "free". With my terminal and Firefox running on Lubuntu, I have about 1187 MB RAM of my 2 GB available, as opposed to Ubuntu, which generally only left about 700 or 800 MB available when I was running a couple of programs (not a very scientific test, I know).

Plus I can always switch back to regular Ubuntu via the login screen.

Lubuntu is pretty snappy! I did want to disable my touchpad from clicking, which I did by doing this:

### How to disable tap to click persistently in Lubuntu

1. Open `~/.config/lxsession/lubuntu/autostart` or possibly `~/.config/lxsession/LXDE/autostart` (not sure which)
2. To disable tap touchpad to click, add `synclient MaxTapTime=0`

You can find other settings to set [here](https://help.ubuntu.com/community/Lubuntu/Mouse), like enabling two-finger horizontal scroll (`synclient HorizTwoFingerScroll=1`).

### Installing an application launcher for Lubuntu

On macOS I make frequent use of [Alfred](https://www.alfredapp.com/) as an application launcher. Ubuntu's Unity desktop environment sort of had something like that, which you can initiate by pressing the command key on its own at any time. But I couldn't find something similar in LXDE-- the application menu (similar to the Start menu in Windows) was just not fast enough for me coming from macOS + Alfred). 

So I found [this askubuntu answer](https://askubuntu.com/questions/203851/any-search-tool-for-lxde-menu/203852#203852) that recommends installing an application called Synapse by running `sudo apt-get install synapse`. By default the launcher is invoked by hitting `ctrl + space`, but I changed it to `alt+Enter` by launching Synapse and clicking on the not-super-obvious round button on the right side of the pop-up display and clicking "Preferences". Works great! 

### My attempt to make the Gnome terminal the default

The default Terminal in Lubuntu (think it's called LXTerminal) didn't support true color in Vim, so I looked for other options. I had gotten used to the terminal in regular Ubuntu (which I'm pretty sure is the Gnome Terminal), so I figured I could switch that in on Lubuntu. Oddly it's not in the main menu of applications, but I figured out a way to set it as the "default" terminal:

1. menu > Preferences > Default applications LXSession
2. Launching applications > Terminal manager > More > write in "gnome-terminal" for "Manual setting"

This seems to have worked-- but only way I know how to launch Gnome Terminal is with the standard launch-terminal shortcut of `option + control + t`.

But note that if you're a Vim user the only way I could get a version of Vim with system clipboard support was to [install Neovim](https://github.com/neovim/neovim/wiki/Installing-Neovim#ubuntu) and then install [xsel](https://apps.ubuntu.com/cat/applications/xsel/) by running something like `sudo apt-get install xsel`. Restart your Gnome Terminal and you should be good to go. 

### More Lubuntu configuration ideas

Just found [this long forum post](https://ubuntuforums.org/showthread.php?t=1905408) with more ideas of recommended features for Lubuntu.

