+++
title = "Installing Ricochet 1.1.4 on Lubuntu 16.04"
date = "2017-01-24T21:10:42-04:00"
comments = "true"

+++

When I first installed [Ricochet IM](https://ricochet.im/) on my machine running Lubuntu, I either ran `sudo apt install ricochet-im`, or downloaded it through Ubuntu's GUI "Software" application. Regardless of which I chose, I think both methods install Ricochet version 1.1.2, as opposed the to latest release: [1.1.4](https://github.com/ricochet-im/ricochet/releases/tag/v1.1.4). Considering this is a secure instant messaging app and new versions may contain important security fixes, I wanted to be using the latest version available (which I'm actually thanked in, due to [some extremely minor documentation fixes](https://github.com/ricochet-im/ricochet/commit/fe40045cec8bed9a735c3cecbcca6ae2276d9902)). 

<!-- more --> 

So I went over to [ricochet.im](https://ricochet.im/), found the [releases page](https://ricochet.im/releases/1.1.4/) and downloaded the latest release for Linux, which is currently 1.1.4. I'm running Linux on a 64-bit machine ([an old Macbook Pro](https://sts10.github.io/blog/2016/11/07/installing-ubuntu-on-my-old-macbook-pro/)), so I went with `ricochet-1.1.4-linux-x86_64.tar.bz2`. I downloaded this compressed file to my `Downloads/` directory.

## Verifying the downloaded tar file

To verify the contents of the downloaded tar file, I also downloaded the `.asc` signature file associated with the release I downloaded from to the [releases page](https://ricochet.im/releases/1.1.4/). I then went to the [ricochet.im website](https://ricochet.im/) and downloaded [John Brooks' public gpg key](https://ricochet.im/john-brooks.asc). 

Then in terminal I navigated to my `~/Downloads` directory (`cd ~/Downloads`) and ran `gpg2 --import john-brooks.asc`. gpg2 informed me that 1 key was successfully imported-- woohoo. To double check that this was actually John Brooks' public key that he signs Ricochet releases with, I ran `gpg2 --fingerprint` to list the fingerprints of the ekys on my key ring. I saw the fingerprint for the Brooks key was `9032 CAE4 CBFA 933A 5A21 45D5 FF97 C53F 183C 045D`, which is exactly the same fingerprint listed in [the Ricochet Github README](https://github.com/ricochet-im/ricochet#downloads). 

Next I needed to actually verify the tar file, so I ran `gpg2 --verify ricochet-1.1.4-linux-x86_64.tar.bz2.asc`. gpg2 correctly assumed that the signed data was in `ricochet-1.1.4-linux-x86_64.tar.bz2` and gave me the message:

```
gpg: Good signature from "John Brooks <john.brooks@dereferenced.net>" [unknown]
gpg: WARNING: This key is not certified with a trusted signature!
gpg:          There is no indication that the signature belongs to the owner.
Primary key fingerprint: 9032 CAE4 CBFA 933A 5A21  45D5 FF97 C53F 183C 045D
```

Again, the fingerprint listed on the last line of the output above matches the one listed on [the Ricochet Github README](https://github.com/ricochet-im/ricochet#downloads).

My understanding is that this "Good signature" message means I got a good tar file from the website. The "WARNING" that it's not a trusted signature just means that I didn't manually mark John Brooks' public key as "ultimately trusted" before running the verify command. 

For more about this and the process of verifying signatures generally, checkout [this page in the Qubes OS documentation](https://www.qubes-os.org/doc/verifying-signatures/) and/or [KeePassXC's page on the subject](https://keepassxc.org/verifying-signatures).

## Extraction... and Installing?

After I found a good signature, I double-clicked the `.tar.bz2` file to uncompress/extract it (though I understand that I could have been a badass and also [done this in the terminal](https://linuxjourney.com/lesson/compressed-archives-tar)). 

I then got a new directory called `ricochet` that had subdirectories like `config` and `QtQuick`, a README file, a file called `tor` I was scared to click, and a file called `ricochet` that when I clicked I got asked what application I wanted to use to open it. I couldn't figure out how to run the actual Ricochet application-- [the README](https://github.com/ricochet-im/ricochet/blob/master/packaging/linux-static/content/README) didn't help me much.  

So first I Googled (actually Duck Duck Go) something like "ubuntu how to install from tar file" and landed on [this askubuntu answer](https://askubuntu.com/questions/25961/how-do-i-install-a-tar-gz-or-tar-bz2-file#1030), which talks about opening a file called `INSTALL` that I didn't have, and/or running `./configure`, which was returning an error for me. 

Eventually, I figured out that I could just run `./ricochet` from my `ricochet` directory and the real application-- version 1.1.4-- opened right up. Cool. But it would be kind of shitty if I had to first open Terminal, then run a command to launch Ricochet. Ideally I'd have a Ricochet icon in my Lubuntu start menu.

## Creating an icon in the Lubuntu start menu

After some more searching I found a subheading on an Ubuntu/Lubuntu help page called ["How to make/add an application to the "start" menu."](https://help.ubuntu.com/community/Lubuntu/Windows#How_to_make.2Fadd_an_application_to_the_.22start.22_menu.) that described how to make a `.desktop` file. 

The help page states: "Making a .desktop file in `~/.local/share/applications` will show the item in the LXDE start menu."

First I moved my `ricochet` directory into `~/Desktop/my_programs`, a directory I made for programs I've downloaded through the browser and am not sure where else to put (I know isn't ideal but I figure it's better than `~/Downloads`-- [hit me on Twitter](https://twitter.com/sts10) if you know a better way). Next I confirmed that the new absolute command for launching Ricochet the application was `~/Desktop/my_programs/ricochet/ricochet`, which indeed worked. 

Next, as described in the [help page](https://help.ubuntu.com/community/Lubuntu/Windows#How_to_make.2Fadd_an_application_to_the_.22start.22_menu.), I created a `Ricochet.desktop` text file from scratch in `~/.local/share/applications` using a desktop file for another program that was also in that directory as a loose template (the other program is [Cryptocat](https://crypto.cat/), just another program I had previously downloaded that had its .desktop file in `~/.local/share/applications`).

Here's the `Ricochet.desktop` file I typed out in its entirety: 

```
[Desktop Entry]
Type=Application
Name=Ricochet
Exec=/home/USER/Desktop/my_programs/ricochet/ricochet
Icon=/home/USER/Desktop/my_programs/ricochet/ricochet.png
Terminal=false
Categories=Network;InstantMessaging;Internet;
```

And be sure to substitute where it says "USER" for your username. If you're not sure what your username is, just run `pwd` in your terminal.

As you can see, the `.desktop` format also allows you to specify an icon image, so I went over to [the Ricochet IM Github repo](https://github.com/ricochet-im/ricochet) and downloaded [a PNG logo](https://github.com/ricochet-im/ricochet/blob/master/icons/ricochet.png) and put it in my ricochet directory.  

I think I had to restart the machine in order to see the icon appear in the start menu. After restart it was there in "Internet" next to Cryptocat and some other applications. 

## Things I haven't figure out

So running `ricochet` from anywhere other than my ricochet directory does not launch the application. I could likely solve this pretty easily with an `ln` command or a line in my `bashrc`, but I've never need to launch a non-text editor from the command line before. 

I'm also not 100% how I'll go about upgrading to a new version of Ricochet, but the README says "To upgrade, extract the new version to the same location." I assume I'll be able to download a new tar file, extract it, and switch it out from old directory. I'll likely keep the `config` directory, as that has my username, contact list, and (I think) my private key (the README notes: "Once you run Ricochet, configuration will be stored in a 'config' directory inside this folder".). 

I also might not even have to edit the .desktop file (assuming I put the executable and the PNG icon in the same place). 

## Is it supposed to be this difficult? I'm not even building from source

To be honest, I'm too new to Linux/Ubuntu/Lubuntu to know. It does seem strange that there isn't at least a copy of the Ricochet icon included in the tar that I downloaded. And I could also imagine there being a script that creates and places the `Ricochet.desktop` file for you. In fact there is a [ricochet.desktop file](https://github.com/ricochet-im/ricochet/blob/master/src/ricochet.desktop) in the source of the project, but I couldn't find it in the 1.1.4 tar.

Of course I could have missed some step in the installation that does exactly these things and maybe more. And I should say that this tar I downloaded is meant to serve the needs of many Linux distributions, whose configurations processes may be very different than the ones I took. 

Of course this pre-built distribution does take care of a lot of things that could be big headaches, most notable the Tor configuration, which just works. As the README notes: "You do not need to manually run or configure tor. An unmodified tor binary is included with this package, and Ricochet will run it automatically, similiar [sic] to Tor Browser." which is obviously awesome.

At the end of the day I've got version 1.1.4 working and an icon for it in my start menu. I'm not sure how similar the process is on Ubuntu 16.04. 

Plus I learned a bit about Linux and Lubuntu. And yes, I did submitted [a fresh pull request](https://github.com/ricochet-im/ricochet/pull/521) to fix that pesky little typo in the README which has since been merged.

