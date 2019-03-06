---
layout: post
title: "Installing and Running Cwtch (Alpha Release)"
date: 2019-02-19 19:55:00 -0400
comments: true
---

This past Valentine's Day, [Open Privacy released an alpha build of an encrypted messaging app called Cwtch](https://openprivacy.ca/blog/2019/02/14/cwtch-alpha/).

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Happy Valentine&#39;s Day! 💜💜💜<br><br>What better day to launch the alpha of a project designed to bring people together safely and securely than on Valentine’s day?<br><br>Cwtch is our metadata resistant, group messaging tool  Time for truly consensual applications!<a href="https://t.co/Dcru1WxAft">https://t.co/Dcru1WxAft</a> <a href="https://t.co/5mk03Q0duH">pic.twitter.com/5mk03Q0duH</a></p>&mdash; Open Privacy (@OpenPriv) <a href="https://twitter.com/OpenPriv/status/1096077069920788480?ref_src=twsrc%5Etfw">February 14, 2019</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

You can read more about Cwtch either in [this blog post](https://openprivacy.ca/blog/2019/02/14/cwtch-alpha/) or [their main Gitlab repo](https://git.openprivacy.ca/cwtch.im/cwtch). But it's basically a decentralized chat application that uses end-to-end encryption for all communication. It also uses Tor Onion services to further protect the metadata of communication, similar to how [Ricochet](https://ricochet.im/) works.

Important: The developers are keen to point out that "Cwtch is an experimental concept and prototype. We do not recommend you use Cwtch today if you require secure communication. At least, not yet." So you know, don't send sensitive information over Cwtch just yet.

## Getting this Alpha release up and running on Ubuntu 18.04

Note: I'm running Ubuntu 18.04, specifically Kubuntu. I had both the Tor Browser and Go installed before attempting this.

### Dependency: An up-to-date version of Tor (not included)

In order to run this build of Cwtch, you need to have Tor installed separately, and it needs to be a pretty recent version. I needed to get up to `Tor version 0.3.5.7` for Cwtch to work (you can check which version you have with `tor --version`). 

#### Installing the latest version of Tor on Ubuntu 18.04

If you run `tor --version` and get version `0.3.5.7`, you're all good to skip this section. If it's a lower version number, you may need a newer version of tor. 

If you're running Ubuntu, unfortunately simply running `sudo apt install tor` may give you [a version of Tor that's too old to run Cwtch](https://packages.ubuntu.com/bionic/tor), at least at the time of this writing.

To get a newer version of Tor on Ubuntu, [follow instructions found here](https://www.torproject.org/docs/debian.html.en#ubuntu), which I outline below as well.

1. `sudo apt install apt-transport-https`
2. Add the following lines to `/etc/apt/sources.list`:
```bash
deb https://deb.torproject.org/torproject.org bionic main
deb-src https://deb.torproject.org/torproject.org bionic main
```
3. Import GPG key
```bash
sudo curl https://deb.torproject.org/torproject.org/A3C4F0F979CAA22CDBA8F512EE8CBC9E886DDD89.asc | gpg --import
sudo gpg --export A3C4F0F979CAA22CDBA8F512EE8CBC9E886DDD89 | sudo apt-key add -
```

4. Install tor and keyring
```bash
sudo apt update
sudo apt install tor deb.torproject.org-keyring
```

After doing the above, running `tor --version` returns `Tor version 0.3.5.7.` for me, which Cwtch worked with.

### Installing and running Cwtch

OK let's do this.

1. Download the latest [pre-built Linux binary, labeled "linux-x86-64.zip"](https://git.openprivacy.ca/cwtch.im/ui/releases). (This guide was written for release version 0.1.2.)

2. Extract the downloaded zip file.

3. Launch Cwtch by running `./cwtch/ui` from the appropriate location. Cwtch should launch!

Success! Hopefully!

I think my username/address/handle is `schlink~xek4wvclrozoecg535wndbksyid6fczi5q5kbvvtu7pyt2kb3ghdywid` if you want to say hi! (I changed that first part from the default "alice" to "schlink" by clicking on the word "alice" and typing "schlink" -- that I could do that wasn't intuitive to me for a few days.)

## Cwtch Alpha testing group 

There's also a "Cwtch Alpha" group where -- as explained in [this friendly blog post](https://openprivacy.ca/blog/2019/03/04/cwtch-alpha-0.1.2/) -- users are welcome to test out Cwtch and chat in. To request an invite to the group, just paste the following code (called an address) into the address text box in Cwtch that says "paste an address here to add a contact":

```
torv3frgCHN7wBNpDdOVvSixgbsIwIjYKD/kl768gRG4hiaQ=EsABCiA2NmI0NmM4OGMxNDc1ZGUxODE5YWYyYTk1ZDM5NTQ4ZBIgDSFY2mxYJiSJs0b442hFChzaHB5B8EERcFqLAkpb5kAaODJjM2ttb29ibnlnaGoyenc2cHd2N2Q1N3l6bGQ3NTNhdW8zdWdhdWV6enB2ZmFrM2FoYzRiZHlkIkBgg+E0T4YKtxnw57sHQbuG3C6myjU2aS496O4n3jpzQu8iT25NReJnuwqv9ER93wE1N9g1f7WY8JCtx0bnvyQK
```

## Getting the very latest builds

If you wish to download and installed the very latest builds of Cwtch, you can find compiled binaries [here](https://build.openprivacy.ca/files/). Personally I think I'm going to stick to the Alpha releases for now, though. 

## Creating an application icon by creating a `.desktop` file (Ubuntu systems)

If you wish to create an application icon for Cwtch on your Ubuntu-based system, you'll likely want to create a `.desktop` file. First, let's download [a nice PNG image file of the Cwtch logo](https://cwtch.im/images/cwtch-peer.png) and save it inside the `cwtch` directory. 

Next, in `~/.local/share/applications/`, create a file called `cwtch.desktop`. Assuming you've got version 0.1.2 of Cwtch -- put this in that file:

```text
[Desktop Entry]
Type=Application
Name=Cwtch
Exec=/home/$USER/other_apps/cwtch/ui
Icon=/home/$USER/other_apps/cwtch/cwtch-peer.png
Terminal=false
Categories=Network;InstantMessaging;Internet
```

Once you save that file, you should have a Cwtch file available in your applications menu.

