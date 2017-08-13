+++
date = "2017-04-03T23:01:15-04:00"
title = "Building KeePassXC from GitHub Source on MacOS 10.10.5"
comments = "true"
tags = []
subtitle = ""

+++

I'm excited about a community fork of [KeePassX](https://www.keepassx.org/) called [KeePassXC](https://keepassxc.org). They offer binary builds for the three major operating systems [on their website](https://keepassxc.org/download), however I wanted to build it from source for two reasons: (1) I was a little dubious of KeePassHTTP, which the developers are now building into the pre-built binaries (it appears to be disabled by default, but they have [a warning in the README](https://github.com/keepassxreboot/keepassxc#note-about-keepasshttp)), and (2) I simply wanted the latest version, which already sports some UI improvements from the last time they made the binaries. Plus, to my knowledge, I've never built a real application from the source code before.

So, I headed over to [their repo on GitHub](https://github.com/keepassxreboot/keepassxc) and got started. Here's how I did it on OS X 10.10.5.

<!-- read more -->

1. Set up build environment by following [these instructions](https://github.com/keepassxreboot/keepassxc/wiki/Set-up-Build-Environment-on-OS-X).

2. Clone down the current code from GitHub repo: `git clone https://github.com/keepassxreboot/keepassxc.git` 

3. Follow the updated [OS X build instructions](https://github.com/keepassxreboot/keepassxc/wiki/Building-KeePassXC#os-x)

I decided to disable two features of KeePassXC: Auto Type and KeePassHTTP, so in the line below I turned those flags `OFF`. Also, I needed to find out what version of qt5 I had in order to put the correct version in the `DCMAKE_PREFIX_PATH` flag below. To do this I navigated to `/usr/local/Cellar/qt5` and looked at what the latest folder was there. In my case it was `5.8.0_1`. 

Obviously you may need to edit the line below according to what flags you want and your version of qt5.

```
mkdir build
cd build
cmake -DCMAKE_OSX_ARCHITECTURES=x86_64 -DCMAKE_BUILD_TYPE=Release \
  -DWITH_XC_AUTOTYPE=OFF -DWITH_XC_HTTP=OFF -DWITH_XC_YUBIKEY=ON \
  -DCMAKE_PREFIX_PATH=/usr/local/Cellar/qt5/5.8.0_1/lib/cmake ..
make -j8 package
```

The above step, if completed successfully, will create a fresh DMG file in the `build` directory you created. Double click it to install KeePassXC (then drag it into your Applications folder).


My resulting debug info:

```
KeePassXC - Version 2.1.3
Revision: b7546b45b3c48e2ffa150be72fc6ce03db1adf00

Libraries:
- Qt 5.8.0
- libgcrypt 1.7.6

Operating system: OS X Yosemite (10.10)
CPU architecture: x86_64
Kernel: darwin 14.5.0

Enabled extensions:
- YubiKey
```

**Update**: I tried pulling down the updated source code from GitHub and building the new version, but now, after I install the built DMG, I can't open KeePassXC. The error is a bit long and complex... I might generate it again to post on here at some point. 

I even tried to check out the 2.1.4 and then the 2.1.3 tags but I got the same error. Hopefully it's some glitch in the source code...? 
