---
layout: post
title: "Cyber Scripting: Trying out the Cyber scripting language"
date: 2023-01-30 18:20:00 -0400
comments: true
---

I recently learned about [Cyber](https://cyberscript.dev), a [very new](https://github.com/fubark/cyber/commit/d21f435e64da3463441da6dde504838810ea1c38) scripting language written in [Zig](https://ziglang.org/). Intrigued, I decided to try to write a tic-tac-toe game with it.

I've written this same little tic-tac-toe game before in [Go](https://github.com/sts10/tic-tac-go/blob/main/game.go), [Rust](https://github.com/sts10/rusty-tac) and [Zig](https://github.com/sts10/zig-zac-zoe).

## Cyber resources
Cyber only had its first commit last month! For such a young langauge, it has a nice number of resources:

* How to **[Build Cyber](https://github.com/fubark/cyber/blob/master/docs/build.md)**. Note that you'll [need Zig v 0.11+ installed](https://github.com/ziglang/zig/wiki/Install-Zig-from-a-Package-Manager). If all goes well, your built Cyber executable will be at `./zig-out/cyber/cyber` (to get it into my PATH, I ran `cp ./zig-out/cyber/cyber ~/.local/bin/`).
* [Cyber's Github repo](https://github.com/fubark/cyber) and [website](https://cyberscript.dev)
* [Cyber's online playground](https://cyberscript.dev/play.html) (awesome!)
* [Cyber docs](https://github.com/fubark/cyber/blob/master/docs/docs.md)
* [Some examples of Cyber code](https://github.com/fubark/cyber/tree/master/examples)

## Why I wanted to try a new scripting language

Cyber is a scripting language. This means different things to different people, but I think it basically means it doesn't compile to a binary and it likely is not strongly typed.

[Cyber's "Who's it for" section reads](https://cyberscript.dev/index.html):
> Cyber wants to provide fast and delightful scripting. You can embed Cyber into your applications, games, and engines on desktop or the web. Cyber also comes with a CLI so you can do scripting on your computer. 

As someone who's been writing Rust for the past few years, Cyber feels _very_ different. In fact, I realize how much I've come to accept Rust and its philosophy as programming and programming philosophy in general. I miss strong types!

All that said, I thought it'd be interesting to try out a very new scripting language. And I loved that Cyber is written in Zig, [is fast](https://cyberscript.dev/performance.html), promises concurrency in the future, and is memory-safe.

## The Cyber I wrote 

Here's [my 2-human-player tic-tac-toe CLI game in Cyber](https://github.com/sts10/cyber-tack). (I might add a "computer" opponent soon...)

To be honest there's nothing really to highlight at this point that is much different from my [Go](https://github.com/sts10/tic-tac-go) or [Zig](https://github.com/sts10/zig-zac-zoe) implementations (which is good!). Perhaps the most exotic aspect is that comments start with a `--`, which I don't hate? 

I did have trouble getting a `for` loop to work in the `check_for_winner` function (I opted for a `while` instead), and not knowing how to print text to the terminal without a newline at the end made for some awkwardness in the `present_board` function, but I'm sure that functionality will be added soon.

### Types

As I alluded to above, I've been [writing Rust almost exclusively since this past summer](https://github.com/sts10?tab=repositories&q=&type=&language=rust&sort=). So Cyber's lack of strong typing felt a bit like running on ice in tap-dancing shoes. But again, scripting languages are for quick tasks, not slowly built-up complex systems (Rust!). Choose the right tool for the task! And after all, part of why I'm looking at new languages in the first place is because I think Rust is ultimately too low-level for me...

## Finding and reporting bugs in Cyber v 0.1

Cyber is not even three months old as of this writing(!), so I expected bugs. 

I was proud to find and [report a few](https://github.com/fubark/cyber/issues?q=is%3Aissue+author%3Asts10). Not only that, but [the lead developer replied with open questions about the future of language](https://github.com/fubark/cyber/issues/33#issuecomment-1409522333), questions that I could ostensibly reply to and affect the outcome! This potential for early influence over a new language was exciting for me, and made dealing with the bugs more than worth it. And I think, perhaps surprising even myself, I hold some pretty strong opinions about language syntax, especially for a language aimed at beginners. I tried to let them out in the GitHub Issues slowly.

I'll also note here that the existence of [an online playground](https://cyberscript.dev/play.html) helped this bug-reporting process more than I might have guessed, since all users had access to a shared runtime. 

## Dealing with a lack of syntax highlighting

Actually, one of my biggest issues writing Cyber at this point is that I didn't have any syntax highlighting in my code editor (Neovim). I hadn't realized how dependent I was on syntax highlighting until I didn't have it! 

The best I could do was to make Vim get out of my way by not using any other languages' (incorrect) highlighting:

```vim
autocmd BufRead,BufNewFile *.cy call SetCyberOptions()
function SetCyberOptions()
  setlocal syntax=off
  setlocal nospell
  setlocal tabstop=4
  setlocal shiftwidth=4
  set filetype=cyber
  " If you have tpope/vim-commentary installed, this line gives you easy commenting
  setlocal commentstring=--\ %s
endfunction
```

If anyone comes across a vim plugin for Cyber, let me know [on Mastodon](https://hachyderm.io/@schlink) or [open an Issue](https://github.com/sts10/cyber-tack/issues)!

## Wrapping up 

I'll keep an eye on Cyber, as well as potential use-cases for it, going forward. In general, I think it's exciting to see new languages written in new languages (Zig, in this case)!

Give it a try! I'd be particularly interest in how well Python/Ruby devs can get started with it...


## Appendix: More of my notes on using Cyber

### Building Cyber v0.1 from source (with Zig)

Following [this guide](https://github.com/fubark/cyber/blob/master/docs/build.md):

#### Prerequisites 

You need [Zig](https://ziglang.org/) version 0.11+ installed. Check with `zig version`. 

If you need to install or upgrade Zig, see [Zig installation wiki](https://github.com/ziglang/zig/wiki/Install-Zig-from-a-Package-Manager) for how to do this on your machine.

#### Building Cyber from source

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

#### Hello world

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
