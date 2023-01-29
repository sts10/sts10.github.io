---
layout: post
title: "Trying out the Cyber scripting language"
date: 2023-01-29 16:20:00 -0400
comments: true
publish: false
---

I recently learned about [Cyber](https://cyberscript.dev), a [very new](https://github.com/fubark/cyber/commit/d21f435e64da3463441da6dde504838810ea1c38) scripting language written in [Zig](https://ziglang.org/). 

I decided to try to write a tic-tac-toe game with it.

I've written this same little tic-tac-toe game before in [Go](https://github.com/sts10/tic-tac-go/blob/main/game.go), [Rust](https://github.com/sts10/rusty-tac) and [Zig](https://github.com/sts10/zig-zac-zoe).

## Cyber resources
Cyber only had its first commit last month! For such a young langauge, it has a nice number of resources:
* [Cyber's Github repo](https://github.com/fubark/cyber) and [website](https://cyberscript.dev)
* [Cyber's online playground](https://cyberscript.dev/play.html)
* [Cyber 0.1 docs](https://github.com/fubark/cyber/blob/master/docs/docs.md)
* [Some examples of Cyber code](https://github.com/fubark/cyber/tree/master/examples)

## Building Cyber v0.1 from source (with Zig)

Following [this guide](https://github.com/fubark/cyber/blob/master/docs/build.md):

### Prerequisites 

You need [Zig](https://ziglang.org/) version 0.11+ installed. Check with `zig version`. 

If you need to install or upgrade Zig, see [Zig installation wiki](https://github.com/ziglang/zig/wiki/Install-Zig-from-a-Package-Manager) for how to do this on your machine.

### Building Cyber from source

```bash
git clone https://github.com/fubark/cyber.git
cd cyber/
zig version # => Verify that you have 0.11 or higher
zig build test # => Hopefully all tests pass! 
zig build cli -Drelease-fast
./zig-out/cyber/cyber help
cp ./zig-out/cyber/cyber ~/.local/bin/
```

Now test your install with `cyber --help`

### Hello world

`touch hello_word.cy`

```cyber
-- This is a comment
-- Put this code in hello_world.cy
worlds = ['World', 'Mundo']
for worlds each w:
    print 'Hello, {w}!'
```

`cyber hello_word.cy`

Run with:
`cyber run.cy`

## Scripting languages and me

Cyber is a scripting language. This means different things to different people, but I think it basically means it doesn't compile to a binary and it likely is not strongly typed.

As someone who's been writing Rust for the past few years, Cyber feels _very_ different. In fact, I realize how much I've come to accept Rust and its philosophy as programming and programming philosophy in general. I miss strong types!

## The Cyber I wrote 



## Dealing with a lack of syntax highlighting

One of my biggest issues writing Cyber at this point is that I didn't have any syntax highlighting. I hadn't realized how dependent I was on syntax highlighting in my code editor until I didn't have it! 

The best I could do was to make Vim get out of my way by not using any other languages' highlighting:

```vim
autocmd BufRead,BufNewFile *.cy call SetCyberOptions()
function SetCyberOptions()
  setlocal syntax=off
  setlocal nospell
  setlocal tabstop=4
  setlocal shiftwidth=4
  set filetype=cyber
  " If you have tpope/vim-commentary, this gives you easy commenting
  setlocal commentstring=--\ %s
endfunction
```
