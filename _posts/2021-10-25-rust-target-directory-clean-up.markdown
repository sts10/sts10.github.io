---
layout: post
title: "Cleaning up large Rust binaries in target directories"
date: 2021-10-26 15:46:00 -0400
comments: true
---

As a (bad) Rust developer, I have a lot of built projects sitting in target directories. These take up quite a bit of space, and ideally I would not back them up. I, naturally, have been on the look out for easy solutions for this problem, preferably using tools written in Rust, because why not.

In [my previous survey of Rust command line tools](https://sts10.github.io/2019/04/08/terminal-redox-alacritty.html), I mentioned [Dust](https://github.com/bootandy/dust), a tool for finding large files like another tool called du. Dust is definitely very useful for finding large directories within a directory, but I wanted to see if there were any cool new tools out there for cleaning up my hard drive.

## Using cargo wipe

[Cargo wipe](https://github.com/mihai-dinculescu/cargo-wipe) is a Rust crate that does just what we want. It [checks for the presence of a file that rustc puts into target](https://github.com/mihai-dinculescu/cargo-wipe/blob/ddbe3ab0c64feb15d1254c28d1b211cce17bb46d/src/dir_helpers.rs#L45), so it won't arbitrarily delete all directories named target 

And by default, it does a dry run, which shows how much storage will be freed up, which is nice. Then you can run the same command with `-w` flag to do the actual removing.

## Tin Summer

Browsing [a monster list of command line tools written in Rust](https://lib.rs/command-line-utilities), I found [The Tin Summer](https://github.com/vmchale/tin-summer), which helps users "find build artifacts that are taking up disk space." Perfect!

Currently Tin Summer requires Nightly Rust to build, which I didn't have on this machine. I installed Nightly with `rustup toolchain install nightly`. I could then install Tin Summer with `rustup run nightly cargo install tin-summer`.

I had recently run `cargo wipe`, and Rust is the only language I write the produces large binaries, so when I ran `sn ar` the results weren't super exciting. 

Instead, I ran a more `du`-like command to find large directories in my `code/` directory: `sn sort ~/code -n12` and did some pruning with `rm -rf`. Both commands ran super fast!

## Diskonaut

[Diskonaut](https://github.com/imsnif/diskonaut) is a wild TUI for navigating disk space. It reminded me of the macOS app [GrandPerspective](http://grandperspectiv.sourceforge.net/) (which I love!).

![Diskonaut in action](https://raw.githubusercontent.com/imsnif/diskonaut/main/demo.gif)

## Other tools

- [Broot](https://dystroy.org/broot/) seems similar to Dust, but it's got a lot of documentation that I couldn't grok quickly. 

- [Durt](https://github.com/cauebs/durt) seems like a simpler version of the tools described above. It aims to calculate the size of files and directories.

## More DIY approaches

We can also use `find`, or its Rust equivalent, [fd](https://github.com/sharkdp/fd), to recursively find directories called "target" and optionally `rm -r` them. 

A basic version of this would look like: `find . -name target | xargs rm -r`

With a slightly more sophisticated version [from Kevin Hoffman](https://twitter.com/KevinHoffman/status/1250077166982828033) being: `find . -type d -name target -prune -exec rm -r {} +`

If we want to use a Rust replacement for `find`, there's [fd](https://github.com/sharkdp/fd): `fd -Ig -t d target`. To do the actual removing, I think it'd be: `fd -Ig -t d target | xargs rm -r`

How do you handle this issue? Let me know on [Mastodon](https://hachyderm.io/@schlink) or [Twitter](https://twitter.com/sts10/).
