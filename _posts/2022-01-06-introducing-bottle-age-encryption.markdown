---
layout: post
title: "Introducing Bottle"
date: 2022-01-06 16:08:00 -0400
comments: true
---

Now that [age, a new tool to encrypt and decrypt files,](https://github.com/FiloSottile/age) has [hit version 1.0](https://github.com/FiloSottile/age/releases/tag/v1.0.0), I've been trying to use it more. (I wrote [a basic exploration of age a few months ago](https://sts10.github.io/2021/09/06/exploring-age-1-point-0.html).)

I found a use-case where I often wanted to compress and encrypt a directory before uploading it to a cloud service, as a sort-of casual back-up. To make this task as simple as possible, I wrote a shell script that I'm calling [Bottle](https://github.com/sts10/bottle). 

## As simple as possible

Since `age`'s command-line tool is already pretty simple, I wanted to make this program, which is essentially a wrapper around a few tar and age commands, as simple as possible. 

To that end, not only is there no config, but Bottle doesn't have any flags, options, or subcommands. Users simply point the `bottle` command-line tool at a file or directory and its internal logic figures out what to do.

Bottle always and only uses an age key-pair file located at `~/age/arhive.txt`.

And the output of the program is always created in the current working directory and the name is wholly based on the input file.

## Usage

[Check the readme for latest on usage](https://github.com/sts10/bottle/blob/main/readme.markdown#usage), but here's a summary.

- Encrypt a file with `bottle <path/to/file>`
- Compress and encrypt a directory with `bottle <path/to/directory>`. 
- Decrypt an age-encrypted file with `bottle <path/to/file>.age`
- Decrypt and extract a `.tar.gz.age` file with `bottle <path/to/archive>.tar.gz.age`.

Users and print help information with `bottle --help`.

## Current state of the project

I'm happy with it so far -- it seems to work as advertised! --, but I'm not a regular shell script writer so there's probably a bunch of improvements to make. 

Again, you can [check it out here](https://github.com/sts10/bottle).

## Shell formatting

I did find [a shell formatter](https://github.com/mvdan/sh#shfmt) that was very useful. I then added this to vim config file to match: 

```vim
" tabs are 8 spaces for these files
autocmd FileType sh setlocal tabstop=8
autocmd FileType sh setlocal shiftwidth=8
```
