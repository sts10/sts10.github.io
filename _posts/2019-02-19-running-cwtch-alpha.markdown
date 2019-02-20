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

Note: I'm running Ubuntu 18.04, specifically Kubuntu. I had both the Tor Browser and Go installed before attempting this.

### Prerequisites

#### Ensure you have the latest version of Tor installed. 

Unfortunately, on Ubuntu, `sudo apt install tor` will give you a version of tor that's too old to run Cwtch. Instead, [follow instructions found here](https://www.torproject.org/docs/debian.html.en#ubuntu), which I outline below as well. 

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

#### Do you need Golang installed?

Cwtch is written in the Go programming language. I already had `go version go1.11.4 linux/amd64` installed on my machine (for other purposes), so I don't know if that's required to run this build of Cwtch. I kind of doubt it, but if it is required, you can (pretty easily) install Go [here](https://golang.org/doc/install).

### Installing and running Cwtch

OK let's do this.

1. Download [pre-built Linux binary called "linux-x86-64.zip"](https://git.openprivacy.ca/cwtch.im/ui/releases). 

2. Extract the downloaded zip file.

3. Launch Cwtch by running `./linux/ui.sh` from the appropriate location. Cwtch should launch!

Success! I think my username/address/handle is `alice~xg4j2xfz2k7zl2apy4nyrye7qesnjrqebgjhu2q544wydfypgyshk3yd` if you want to say hi (can't seem to change my handle from "alice" just yet...).

