---
layout: post
title: "Blasting off with starship.rs"
date: 2021-10-27 16:46:00 -0400
comments: true
---

Back in 2014, while at the Flatiron School bootcamp, I configured my BASH prompt.

![My old BASH prompt](/img/prompt-starship/old-prompt.png)

The configuration code has lived in directly in my `~/.bashrc` on Ubuntu and `~/.bash_profile` on macOS for years, traveling with me from install to install. 

Seven years ago, I remember working out the colors was non-intuitive and particularly tricky; and the only really fancy bit is that it tells me if the git repository I'm in has uncommitted changes or not. 

```bash
# git dirty functions for prompt
function parse_git_dirty {
  [[ $(git status --porcelain 2> /dev/null) ]] && echo "*"
}

# This function is called in your prompt to output your active git branch.
function parse_git_branch {
  git branch --no-color 2> /dev/null | sed -e '/^[^*]/d' -e "s/* \(.*\)/ (\1$(parse_git_dirty))/"
}

# set a fancy prompt (non-color, unless we know we "want" color)
case "$TERM" in
    xterm-color|*-256color) color_prompt=yes;;
esac

if [ -n "$force_color_prompt" ]; then
    if [ -x /usr/bin/tput ] && tput setaf 1 >&/dev/null; then
    # We have color support; assume it's compliant with Ecma-48
    # (ISO/IEC-6429). (Lack of such support is extremely rare, and such
    # a case would tend to support setf rather than setaf.)
    color_prompt=yes
    else
    color_prompt=
    fi
fi

if [ "$color_prompt" = yes ]; then
    RED="\[\033[0;31m\]" # This syntax is some weird bash color thing I never
    LIGHT_RED="\[\033[1;31m\]" # really understood
    BLUE="/e[0;34m"
    CHAR="✚"
    CHAR_COLOR="33"
    PS1="[\[\e[30;1m\]\t\[\e[0m\]]$RED\$(parse_git_branch) \[\e[0;34m\]\W\[\e[0m\]\n\[\e[0;31m\]$CHAR \[\e[0m\]"
else
    PS1='${debian_chroot:+($debian_chroot)}\u@\h:\w\$ '
fi
unset color_prompt force_color_prompt
```

I liked the `✚` character right at my prompt because it made me feel like coding could be akin to helping people get things done.

This hunk of code still works as well as ever, but it's 2021 and I'm up for trying something new. 

How about [Starship](https://starship.rs/), a "minimal, blazing-fast, and infinitely customizable prompt for any shell!" that's written in Rust!

## Installing Starship 

### Nerd Font prerequisite

At the top of the installation page, Starship [tells me](https://starship.rs/guide/#%F0%9F%9A%80-installation) I need to install a [Nerd Font](https://www.nerdfonts.com/font-downloads) of my choice. I assume this is to ensure we have all the nice icons that Starship uses.

I like [JetBrains Mono](https://www.jetbrains.com/lp/mono/) for coding, so I downloaded that Nerd Font. I extracted the downloaded file, then launched the Font Management GUI program on Ubuntu and added the font through its interface, selecting all of the files in the downloaded archive (not sure if I was supposed to be more selective). 

### Installing Starship itself

With my desired Nerd Font installed, the Starship [guide](https://starship.rs/guide/#%F0%9F%9A%80-installation) tells me to run:

```bash
sh -c "$(curl -fsSL https://starship.rs/install.sh)"
```

This produced this message, asking me to confirm that I wanted to install Starship to `/usr/local/bin`:

```text
Configuration
> Bin directory: /usr/local/bin
> Platform:      unknown-linux-musl
> Arch:          x86_64

> Tarball URL: https://github.com/starship/starship/releases/latest/download/starship-x86_64-unknown-linux-musl.tar.gz
? Install Starship latest to /usr/local/bin? [y/N
```

That sounds fine, so I said `y`. It prompted me for my sudo password, then installed without issue. 

Since I use Bash, I then added the given initializing line of code to very end of my ~/.bashrc:

```bash
eval "$(starship init bash)"
```

Then I launched a new window of my terminal (called Konsole) and, boom, I saw the default Starship prompt!

![Out of the box Starship prompt](/img/prompt-starship/out-of-box-starship.png)

### Upgrading Starship

The docs also [helpfully notes that](https://starship.rs/guide/#%F0%9F%9A%80-installation): 

> To update the Starship itself, rerun the above script. It will replace the current version without touching Starship's configuration.

### Uninstalling Starshipp

I appreciate that [their FAQ answers this question](https://starship.rs/faq/#how-do-i-uninstall-starship), and that the answer is pretty simple.

You just remove the Starship-related line from your Bash config file, then run:

```bash
sh -c 'rm "$(which starship)"'
```

## Basic configuration

One of the reasons I wanted to try Starship is that it seems to give you a lot of great features right out of the box, by default. And the out-of-the-box prompt is pretty robust!

But you can [config some things](https://starship.rs/config/#prompt) in `~/.config/starship.toml`, a file I created. 

## My slightly tweaked Starship config file

Following the example config, here's what I ended up with:

```toml
# Inserts a blank line between shell prompts
add_newline = false

[character]  
success_symbol = "[✚](bold red)"     

# Disable the package module, hiding it from the prompt completely
[package]
disabled = true
```

## Questions partially answered

My two main questions before installing Starship were: 

_What would happen to all my prompt work in my bashrc file?_

Since the init BASH line is at the way end of my bashrc, I think Starship quietly supersedes all that Bash color code at the top of this post. This is pretty much ideal, since I can now either keep it as a fall back for if/wehn Starship is not installed, or remove it, cleaning up my bashrc file that's already very long.

_What about my terminal colors?_

It seems like Starship generally kept the hex color codes I set in my terminal's settings, which is good, though it definitely uses some colors I don't recognize. These are likely colors I set in my terminal config but haven't seen in years. (It would be cool if Starship also somehow took care of these colors for you, but it's also fine that they don't.)

## First impressions

There's definitely more information in the prompt than I had before, which is nice. Think I need to spend some time with it to get used to it and what each of the symbols mean.
