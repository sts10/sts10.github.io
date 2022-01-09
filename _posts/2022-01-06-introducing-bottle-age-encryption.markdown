---
layout: post
title: "Introducing Bottle"
date: 2022-01-06 16:08:00 -0400
comments: true
---

Now that [age, a new tool to encrypt and decrypt files,](https://github.com/FiloSottile/age) has [hit version 1.0](https://github.com/FiloSottile/age/releases/tag/v1.0.0), I've been trying to use it more. (I wrote [a basic exploration of age a few months ago](https://sts10.github.io/2021/09/06/exploring-age-1-point-0.html).)

I found a use-case where I often wanted to compress and encrypt a directory before uploading it to a cloud service, as a sort-of casual back-up. To make this task as simple as possible, I'm working on a tool I'm calling Bottle. I have published to GitHub [a shell script version](https://github.com/sts10/bottle) and [a Rust command-line tool version](https://github.com/sts10/bottle-rs).

## What does it do?

Bottle (both the shell and Rust ports) allows users to compress and encrypt (and decrypt and extract) files and directories using age and tar or files using age.

It's basically a wrapper around some age and tar commands. The use-case is to compress and encrypt files and directories for your future self, for example on a cloud service like Dropbox.

## As simple as possible

Since `age`'s command-line tool is already pretty simple, I wanted to make this program as simple to use as possible. 

To that end, not only is there no config, but Bottle doesn't have any flags, options, or subcommands. Users simply point the `bottle` command-line tool at a file or directory and its internal logic figures out what to do.

To that end, the current version of Bottle has:

- No flags or options. 
- Only accepts exactly one single parameter.
- No subcommands
- No configuration (like age)
- No choice of what key to use. (Bottle always and only uses an age key-pair file located at `~/age/archive.txt`.)
- No choices about output. The output of the program is always created in the current working directory and the name is wholly based on the input file.

## Usage

For specific usages, be sure to check the readme of the port of Bottle you choose, but here's a port-agnostic summary.

- Encrypt a file with `bottle <path/to/file>`
- Compress and encrypt a directory with `bottle <path/to/directory>`. 
- Decrypt an age-encrypted file with `bottle <path/to/file>.age`
- Decrypt and extract a `.tar.gz.age` file with `bottle <path/to/archive>.tar.gz.age`.

Users and print help information with `bottle --help`.

## Current state of the project(s)

I worked on the shell script first. It works fine on my Ubuntu machine, but a Mac user who tried it kept hitting error messages when Bottle tried to run the complex `tar` commands I included in the script. (I also haven't written that much shell, so I don't think I ever would have gotten very confident in it.)

In an effort to make a more compatibility tool, I started from scratch in Rust. Going forward, I think I'll focus my efforts on [the Rust port](https://github.com/sts10/bottle-rs/).

## Things I learned about writing shell scripts

### Shell formatting and linting

I found [a shell formatter](https://github.com/mvdan/sh#shfmt) that was very useful. I then added this to vim config file to match: 

```vim
" tabs are 8 spaces for shell files
autocmd FileType sh setlocal tabstop=8
autocmd FileType sh setlocal shiftwidth=8
```

I also ran my script through this ["spellcheck" linter](https://www.shellcheck.net/), which gave me some useful tips when calling variables.

### Good command for how to uninstall a binary?

I wanted to include _uninstall_ instructions in the README of Bottle. 

Taking a lead [from Starship.rs's docs](https://starship.rs/faq/#how-do-i-uninstall-starship), I put this command in Bottle's [README](https://github.com/sts10/bottle/blob/main/readme.markdown):

```bash
sh -c 'rm "$(which bottle)"'
```

Which I think should work well for users?
