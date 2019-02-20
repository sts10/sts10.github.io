---
layout: post
title: "Installing and Running Cwtch (Alpha Release)"
date: 2019-02-19 19:55:00 -0400
comments: true
---

This past Valentine's Day, [Open Privacy released an alpha build of an encrypted messaging app called Cwtch](https://openprivacy.ca/blog/2019/02/14/cwtch-alpha/).

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Happy Valentine&#39;s Day! 💜💜💜<br><br>What better day to launch the alpha of a project designed to bring people together safely and securely than on Valentine’s day?<br><br>Cwtch is our metadata resistant, group messaging tool  Time for truly consensual applications!<a href="https://t.co/Dcru1WxAft">https://t.co/Dcru1WxAft</a> <a href="https://t.co/5mk03Q0duH">pic.twitter.com/5mk03Q0duH</a></p>&mdash; Open Privacy (@OpenPriv) <a href="https://twitter.com/OpenPriv/status/1096077069920788480?ref_src=twsrc%5Etfw">February 14, 2019</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

You can read more about Cwtch either in [this blog post](https://openprivacy.ca/blog/2019/02/14/cwtch-alpha/) or [their main Gitlab repo](https://git.openprivacy.ca/cwtch.im/cwtch). But it's basically a decentralized chat application that uses end-to-end encryption for all communication. It also uses Tor Onion services to further protect the metadata of communication.

## Getting this Alpha release up and running on Ubuntu 18.04

Note: I'm running Kubutnu 18.04.

### 1. Download [pre-built Linux binary](https://git.openprivacy.ca/cwtch.im/ui/releases). 
### 2. Extract the downloaded zip file and navigate into directory.
<!--
### 3. Try running `./ui.sh -local -debug 2>&1 | grep -v 'Detected anchors on an item that is managed by a layout.'`

But get following error:
```
QQmlApplicationEngine failed to load component
file:///home/sschlinkert/Downloads/cwtch/linux/qml/main.qml:-1 No such file or directory

2019/02/19 19:01:13 connectivity/torProvider.go [DBUG] dialing system tor control port
2019/02/19 19:01:13 connectivity/torProvider.go [INFO] tor version: 0.3.2.1
2019/02/19 19:01:13 connectivity/torProvider.go [DBUG] torversions: [0 3 2 1]
2019/02/19 19:01:13 connectivity/torProvider.go [INFO] tor version: 0.3.2.1
2019/02/19 19:01:13 connectivity/torProvider.go [DBUG] torversions: [0 3 2 1]
2019/02/19 19:01:13 ui/main.go [ERR ] Could not start Tor: Could not connect to or start Tor that met requirments (min Tor version 0.3.5.x)
```
-->
### 3. Ensure you have the latest version of Tor installed. 

Unfortunately, on Ubuntu, `sudo apt install tor` will give you a version of tor that's too old to run Cwtch. Instead, [follow instructions found here](https://www.torproject.org/docs/debian.html.en#ubuntu), which I outline below as well. 

a. `sudo apt install apt-transport-https`
b. Add the following lines to `/etc/apt/sources.list`:
```bash
deb https://deb.torproject.org/torproject.org bionic main
deb-src https://deb.torproject.org/torproject.org bionic main
```
c. Import GPG key
```bash
sudo curl https://deb.torproject.org/torproject.org/A3C4F0F979CAA22CDBA8F512EE8CBC9E886DDD89.asc | gpg --import
sudo gpg --export A3C4F0F979CAA22CDBA8F512EE8CBC9E886DDD89 | sudo apt-key add -
```

d. Install tor and keyring
```bash
sudo apt update
sudo apt install tor deb.torproject.org-keyring
```

### 4. Running Cwtch

To run Cwtch, you need to navigate one directory up and run `./linux/ui.sh`. Cwtch should launch!

I think my handle is `alice~xg4j2xfz2k7zl2apy4nyrye7qesnjrqebgjhu2q544wydfypgyshk3yd` (can't seem to change my handle from "alice" just yet...).
