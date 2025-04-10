---
layout: post
title: "Reviving a 16-year-old ThinkPad with Linux"
date: 2022-08-23 13:00:00 -0400
comments: true
---

I recently inherited [a ThinkPad X40](https://www.thinkwiki.org/wiki/Category:X40) from the mid-2000s. It's got 1241 MiB of RAM, a 24-ish GB hard drive, and an Intel Pentium M 1.10 GHz CPU, which, if I understand correctly, is 32-bit. 

![My ThinkPad X40](/img/thinkpad/full-ibm-start.jpg) 

When I started it up it loaded Windows XP<sup>TM</sup>. While I guess I _theoretically_ could have Windows, I'm assuming there were plenty of bugs found since 2007 and I didn't know what the update process would be like. Plus, I'm pro-Linux for philosophical reasons.

## Which Linux distribution should I install? 

I had to rule out [Xubuntu](https://xubuntu.org/), [Lubuntu](https://lubuntu.me/downloads/), and [Linux Lite](https://www.linuxliteos.com/download.php), as none them offer a 22.04 LTS for 32-bit systems.

I'd been meaning to learn more about [Alpine Linux](https://www.alpinelinux.org/), but I got a bit intimidated by the installation process. I'll admit that I did not consider trying [Debian](https://www.debian.org/) for long enough... would have been interesting.

Ultimately, I decided to try installing [Puppy Linux](https://puppylinux-woof-ce.github.io/index.html), "a unique family of Linux distributions meant for the home-user computers." It seems to be aimed at old machines, so I figured its assumptions would line up well with my needs. 

## Installing Puppy Linux

Using my main laptop, I went over to [the Puppy Linux download section](https://puppylinux-woof-ce.github.io/index.html#download) and downloaded "Ubuntu Bionic; x86 32-bit; BionicPup32 8.0". I easily flashed this onto a fresh USB thumb drive with Pop_OS's "USB Flasher" app. I stuck it in the ThinkPad (thankfully, it has 2 USB-A ports), and rebooted, hitting F12 when the ThinkPad logo came up to enter the boot menu.

### Forcing PAE
Just running Puppy from the USB stick was a bit of a trick as I had to add the parameter `forcepae` to the series of boot commands. "PAE" stands for "Physical Address Extension". [Apparently after 12.10, Lubuntu and Xubuntu require PAE to install. Luckily, this Pentium M processor can "force" PAE, but you've got to modify the installation process a bit](https://help.ubuntu.com/community/pae). 

I admit that I didn't take great notes during this part of the process, but basically, when you boot Puppy from USB, you need to edit the command. To edit the command, I think you hit tab (or 'e'?) rather than enter, at which point you're presented with one line of the command Puppy is about to run. You want to to add `forcepae` to the end: 

`./linux vmlinuz pmedia=cd initrd=initrd.gz forcepae`

![Working boot parameters for forcing pae](/img/thinkpad/boot-from-usb-parameters.jpg)

Once Puppy Linux loaded (from the USB, not the hard drive), I used GParted, a partition manager that luckily ships with Puppy, to clear out sda1, the ThinkPad's main internal hard drive. I chose to format both partitions on the hard drive as ext3... kind of figured it was a compromise between compatibility and working well on the old hardware (rather than ext2 or ext4). I then removed the Windows XP<sup>TM</sup> sticker from the machine -- bye, Windows<sup>TM</sup>! 

### Installing Puppy Linux _to the hard drive_

Happy with the speed and functionality of Puppy Linux, I decided to install it to the machine's hard drive. This was less intuitive than on other, more modern Ubuntu flavors; I think because Puppy is designed to run from USB sticks, rather than hard drives (kind of like Tails). (This makes me wonder if it was a poor choice for installing on this machine's hard drive...) 

I assume this design choice is why the "Install Puppy" program didn't have a shortcut on the Desktop. I found it in the Applications menu > Setup > Puppy Installer. This installer allows you to target USB sticks or hard drives. I targeted the hard drive and ended up doing a "full" install, taking over all of sda1. 

Either during this process or right after, I had to add that `forcepae` argument to the boot from the hard drive so that it would be applied every time I booted Puppy from the hard drive from now on. I forget if the Puppy Installer gave me that choice, but [basically](https://oldforum.puppylinux.com/viewtopic.php?p=1006544) you need to add that `forcepae` option to a file called `/menu.lst`, which is in the root directory, `/`. Here's an excerpt of my (working!) `/menu.lst`: 

```
# Full installed Linux

title BionicPup32 19.03 (sda1/boot)
  find --set-root uuid () 7408d00d-836c-4caa-bce2-87dfcf35848c
  kernel /boot/vmlinuz root=UUID=7408d00d-836c-4caa-bce2-87dfcf35848c ro forcepae 
#                      root=/dev/sda1
  initrd /boot/initrd.gz
  
# More after this
```

Once I got everything settled, I installed [Neofetch](https://github.com/dylanaraps/neofetch) for a celebratory pic. 

![Neofetched stats for Puppy Linux install](/img/thinkpad/neofetch.jpg)

Menus and apps launch pretty quickly. Seems pretty stable after reboots. Think I've got Puppy installed well.

## Limitations

So far as I've discovered, the biggest limitation is its lack of WiFi. This machine doesn't seem to have a WiFi card, though I'm not 100% sure. Running `lspci | egrep -i 'wifi|wireless|wlan'` only returns one entry: `Network controller Intel Corporation PRO/Wireless 2200BG [Calexico2] Network Connection (rev 05)`.

It does have an Ethernet port, which works, but only if it's plugged in when the computer is booted. If you plug a cable in _after_ the machine is running, it won't automatically connect to the internet. (Wonder if there's a way to troubleshoot this...)

Also, the battery life isn't great -- maybe 25 minutes? Though at its age, it definitely could have been 0 minutes! I'm comforting myself by telling myself that the power adapter is very light and its cord is pretty long overall.

### Some software that did NOT come with Puppy Linux

While Puppy comes with a nice suite of GUI software (more on this below), I was a little surprised that I couldn't run `apt` to update or install new software (despite choosing what I figure was an Ubuntu base when I downloaded the iso file). I also didn't have `git`, and didn't really want to try to figure out how to get it working. I wasn't too bummed about these limitations, since this was never going to be a machine for development for me. But I thought I'd note it here. 

## Physically, the X40 is great

The physical footprint of the laptop is delightfully small and close to a 8.5 by 11" sheet of paper: 10.5 x 8.3 in (268 x 211 mm). Some spec sites I've found say it weighs 2.7 pounds, which, hilariously, is about the same as [a Dell XPS 13](https://www.dell.com/en-us/shop/cty/pdp/spd/xps-13-9310-laptop) and [a MacBook Air M2](https://www.apple.com/macbook-air-m2/). (I think they called these laptops "netbooks" or ultra-portable notebooks?) 

Corresponding to the footprint, the display feels almost square (it's 1024x768), closer to a piece of paper than modern, 16:9 screens. The quality of the screen seems fine -- plenty bright. It doesn't have a trackpad -- only one of those red "nipples", but it works fine. I think I like that there isn't a trackpad to get in the way of my wrists while typing the next great American novel.

The IBM keyboard is really the star of the show here, though. I might rate it above any laptop keyboard I've ever used. Haven't found a key that doesn't work yet. The keyboard is probably what inspired me to see this laptop as a good candidate for a dedicated writing computer. 

## Purpose and goals for our cute lil machine

Given these features and limitations, I began to think more concretely about what I might use it for. 

I figured a fun guiding star would be to make this machine specifically **a tool for writing**. I've always been a bit sentimental for typewriters -- dedicated writing machines that offer no other distractions. 

As you might imagine, I'm not the only person who thinks they'd write more/better fewer of the myriad of distractions of the (wireless) internet. I have a writer friend who goes to a cafe where she doesn't know the WiFi password to write. 

There are hardware solutions to be bought and sold as well: A company called Freewrite offers [a $649 "Smart Typewriter"](https://getfreewrite.com/products/freewrite-smart-typewriter-3rd-gen) that actually looks pretty awesome. I've also seen [some](https://www.reddit.com/r/AlphaSmart) [love](https://www.inputmag.com/reviews/the-alphasmart-neo-2-is-the-best-distraction-free-writing-tool-you-can-buy-right-now) for a device called the Alphasmart Neo2 Word Processor (coincidentally, [Freewrite just announced a similarly named "Alpha" product](https://alphasmart.com/reveal/) -- it's an active market, apparently).

[This Medium post from 2021](https://medium.com/the-shadow/why-we-need-dedicated-modern-typewriters-c1597a72d25a) actually lists "An old laptop running Linux" as what the author calls a "modern typewriter." The author then, interestingly, hypothesizes what a "typewriter" Linux distro would look like -- just a text editor, a few themes and fonts, and, I'd stress, a great sync/back-up system. Wouldn't need to worry about sound, video, or browsers. Configured to be easy to install on a wide variety of hardware (to the extent that that is possible)... I agree -- that would be cool! 

In my research, I did find an article about a "Linux distro for writers" called [GhostWriter](https://www.linux.com/news/ghostwriter-linux-distro-writers/), but the site appears to be down. 

Given that internet access on this thing is iffy, but the keyboard is great, I figure it's perfect for this. Just boot it up, full-screen AbiWord, pick a font, and write! 

Though if I really can't get the Ethernet to work, I'll need to transfer writing off of this machine using a USB stick (which I did for this blog post). (While I was able to connect via the Ethernet port, I used [croc](https://github.com/schollz/croc), which installed on Puppy easily, to transfer files back and forth between my main laptop and the ThinkPad. Neat!) Luckily, [Rsync](https://rsync.samba.org/), a tool [I've used before](https://sts10.github.io/2021/10/26/restic-rsync-backup-ideas.html#a-first-step-in-the-right-direction-rsync), came installed with Puppy, so I can add something like this to the `~/.bashrc`:

```bash
function export {
    # check if there's an sdb1 mounted
    if mountpoint -q /mnt/sdb1; then
        echo "USB drive found. Rsyncing documents directory..."
        rsync -a /root/my-documents/ /mnt/sdb1/thinkpad-writing
        echo "Done"
    else
        echo "USB drive not found. May not be mounted."
    fi
}
```

## Software for writing

For word processors, my Puppy install comes with [AbiWord](http://abiword.org/) 3.0 and a basic IDE called [Geany](https://www.geany.org/) (version 1.29). Both work pretty well -- I'm writing this in Geany, but for longer, less technical writing, I'll try AbiWord. In both programs, F11 toggles a nice "full-screen" mode, which I'll probably think of as "distraction-free" mode.  

I experimented with [changing AbiWord to save as .odt files by default](https://www.abisource.com/wiki/WinFaqAlwaysSaveAsWord), but one of these resulting .odt files was unreadable by Libre Writer on my main laptop, just the issue I was attempting to avoid! So I switched the default file save type back to AbiWord (`.abw`). Back on my main laptop, Libre Writer seems to open these `.abw` AbiWord files just fine, so no compatibility issue there, really. But still a bit spooked by that corrupted file... something about a line in `content.xml` being unreadable.

I also re-mapped Caps Lock to be another Control, something I've come to get used to. This was pretty easy to do in Puppy's GUI setting menus!

I also installed Neovim just in case I need to edit more config files or end up using that for writing. I used the built-in Puppy Package Manager to do this. Interestingly, this process gave me Neovim version 0.2.2 -- maybe that's the last version they packaged for 32-bit machines? Grateful to have it! I then whipped up [a basic, no-plugin init.vim for it](https://gist.github.com/sts10/afd5e98d4724935b55163a0d89d58878). Though I'm having some issues with colors, particularly in visual mode.

I'd love to try more writing-focused word processors like [Manuskript](https://www.theologeek.ch/manuskript/), [novelWriter](https://novelwriter.io/#features), [GhostWriter](https://wereturtle.github.io/ghostwriter/), [Typora](https://typora.io/), or [Focus Writer](https://gottcode.org/focuswriter/), but I can't figure out how to get them installed on this 32-bit machine. A notes app called [Laverna](https://laverna.cc/#download) offers a 32-bit Linux download, but I haven't tried installing it yet. Apparently there is a way to get [Libre Office](https://www.libreoffice.org/) for 32-bit, but the install didn't work for me on this machine. I don't think my choice of distro affects this compatibility issue. 

### Fonts
Puppy only came with 3 fonts: Deja Vu family of Serif, Sans, and Mono. While I like Deja Vu Sans Mono for coding, I wanted some nicer "writing" font options on this machine. 

On my main laptop, I went to Google Fonts (ugh, I know, not very free-software of me) and downloaded a bunch of serif fonts that I thought would work well for writing long documents, including [PT Serif](https://fonts.google.com/specimen/PT+Serif?query=pt+serif), [Poly](https://fonts.google.com/specimen/Poly?query=poly), [Lora](https://fonts.google.com/specimen/Lora?query=lora), [Bitter](https://fonts.google.com/specimen/Bitter?query=bitter), and [Literata](https://fonts.google.com/specimen/Literata?query=literata).

I also grabbed [Fira Sans](https://github.com/mozilla/Fira), [IBM Plex Sans](https://github.com/IBM/plex/releases) (feels right to use an IBM font on an IBM laptop!), [Courier Code](https://fontlibrary.org/en/font/courier-code) (which I think I like better than [Courier Prime](https://quoteunquoteapps.com/courierprime/)),  and [JetBrains Mono NL](https://www.jetbrains.com/lp/mono/), my favorite monospaced font. 

Tip: If you want to install a bunch of ttf fonts at once, a nice way to do it is `mkdir ~/.local/share/fonts` and then `cp` all your `*.ttf` font files into that directory. Next, run `fc-cache -f -v` to force a refresh of your font cache. (This command will also display all the locations your system looks for font files.)

## Closing Thoughts / Future Plans

Think I'm going to try to stop tinkering and... just use it to write some thoughts on for a bit? One project might be installing and learning [TLP](https://linrunner.de/tlp/) to try to boost the battery life.

I am kind of bummed that I didn't give Debian a shot (though, phew, they don't make choosing an appropriate ISO easy!). But that'll be a good project for some point in the future.

I don't know if I'd _buy_ an X40? It looks like they go for anywhere [between $30 and $120+ on eBay](https://www.ebay.com/sch/i.html?_from=R40&_trksid=p2334524.m570.l1313&_nkw=ibm+thinkpad+x220&_sacat=0&LH_TitleDesc=0&_odkw=ibm+thinkpad+x230&_osacat=0) as I write this. I'd peruse [r/thinkpad](https://www.reddit.com/r/thinkpad/) and [r/LinuxOnThinkPad](https://www.reddit.com/r/LinuxOnThinkpad/) a bit first before buying.

[Let me know](https://hachyderm.io/@schlink) if you have any suggestions for other distros, software, or fonts!

### Update from 2025

Just learned about [Tinker Writer Deck](https://tinker.sh/), which promises to "Convert any laptop and most chromebooks into a writer deck. A device designed solely for writing." It probably won't work on my particular ThinkPad due to its chip architecture, but I figure folks finding this article might be interested in it! Neat idea!
