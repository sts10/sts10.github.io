---
layout: post
title: "Cleaning up Rust target directories"
date: 2021-10-26 15:46:00 -0400
comments: true
---

As a (bad) Rust developer, I have a lot of built projects sitting in target directories. These take up quite a bit of space, and ideally I would not back them up.

## Using cargo wipe crate

[Cargo wipe](https://github.com/mihai-dinculescu/cargo-wipe) is a Rust crate that does just what we want.
   
It [checks for the presence of a file that rustc puts into target](https://github.com/mihai-dinculescu/cargo-wipe/blob/ddbe3ab0c64feb15d1254c28d1b211cce17bb46d/src/dir_helpers.rs#L45), so it won't arbitrarily delete all directories named target 

And by default, it does a dry run, which shows how much storage will be freed up, which is nice. Then you can run the same command with `-w` flag to do the actual removing.

## More DIY approaches

- `find . -name target | xargs rm -r`
- [from Kevin Hoffman](https://twitter.com/KevinHoffman/status/1250077166982828033) `find . -type d -name target -prune -exec rm -r {} +`
- If we want to use a Rust replacement for `find`, there's [fd](https://github.com/sharkdp/fd): `fd -I -t d target`. To do the actual removing, I think it'd be: `fd -I -t d target | xargs rm -r`

