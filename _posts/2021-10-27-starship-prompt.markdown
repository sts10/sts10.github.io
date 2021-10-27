---
layout: post
title: "Blasting off with starship.rs"
date: 2021-10-27 16:46:00 -0400
comments: true
---

Back in 2014, I configured my BASH prompt.

![My old BASH prompt](img/prompt-starship/old-prompt.png)

The configuration code lives in directly in my `~/.bashrc` on Ubuntu and `~/.bash_proifle` on macOS for years, traveling with me from install to install. 

Working out the colors was hard; and the only really fancy bit is that it tells me if the git repository has uncommitted changes or not. 

```bash
# git dirty functions for prompt
function parse_git_dirty {
  [[ $(git status --porcelain 2> /dev/null) ]] && echo "*"
}

# This function is called in your prompt to output your active git branch.

function parse_git_branch {
  git branch --no-color 2> /dev/null | sed -e '/^[^*]/d' -e "s/* \(.*\)/ (\1$(parse_git_dirty))/"
}
# Old version
# function parse_git_branch {
#   git branch --no-color 2> /dev/null | sed -e '/^[^*]/d' -e 's/* \(.*\)/ (\1)/'
# }

# set a fancy prompt (non-color, unless we know we "want" color)
case "$TERM" in
    xterm-color|*-256color) color_prompt=yes;;
esac

# uncomment for a colored prompt, if the terminal has the capability; turned
# off by default to not distract the user: the focus in a terminal window
# should be on the output of commands, not on the prompt
#force_color_prompt=yes

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
    # PS1='${debian_chroot:+($debian_chroot)}\[\033[01;32m\]\u@\h\[\033[00m\]:\[\033[01;34m\]\w\[\033[00m\]\$ '
    RED="\[\033[0;31m\]" # This syntax is some weird bash color thing I never
    LIGHT_RED="\[\033[1;31m\]" # really understood
    BLUE="/e[0;34m"
    CHAR="✚"
    CHAR_COLOR="33"
    # PS1="\[\e]2;\u@\h\a[\[\e[30;1m\]\t\[\e[0m\]]$RED\$(parse_git_branch) \[\e[0;34m\]\W\[\e[0m\]\n\[\e[0;31m\]$CHAR \[\e[0m\]"
    PS1="[\[\e[30;1m\]\t\[\e[0m\]]$RED\$(parse_git_branch) \[\e[0;34m\]\W\[\e[0m\]\n\[\e[0;31m\]$CHAR \[\e[0m\]"
else
    PS1='${debian_chroot:+($debian_chroot)}\u@\h:\w\$ '
fi
unset color_prompt force_color_prompt

# If this is an xterm set the title to user@host:dir
case "$TERM" in
xterm*|rxvt*)
    PS1="\[\e]0;${debian_chroot:+($debian_chroot)}\u@\h: \w\a\]$PS1"
    ;;
*)
    ;;
esac

# enable color support of ls and also add handy aliases
if [ -x /usr/bin/dircolors ]; then
    test -r ~/.dircolors && eval "$(dircolors -b ~/.dircolors)" || eval "$(dircolors -b)"
    alias ls='ls --color=auto'
    #alias dir='dir --color=auto'
    #alias vdir='vdir --color=auto'

    alias grep='grep --color=auto'
    alias fgrep='fgrep --color=auto'
    alias egrep='egrep --color=auto'
fi

# colored GCC warnings and errors
#export GCC_COLORS='error=01;31:warning=01;35:note=01;36:caret=01;32:locus=01:quote=01'
```

I liked the `✚` character as a prompt because it made me feel like coding akin to helping people get things done.

But it's 2021 and I'm up for trying something new. How about [Starship](https://starship.rs/), a "minimal, blazing-fast, and infinitely customizable prompt for any shell!" that's written in Rust!

## Installing Starship 

### Nerd Font prerequisite

Starship tells me I need to install a [Nerd Font](https://www.nerdfonts.com/font-downloads) of my choice. I assume this is to ensure we have all the nice icons that Starship uses.

I like JetBrains Mono for coding, so I downloaded that Nerd Font. I extracted the downloaded file, then launched Font Management on Ubuntu and added the font, selecting all of the files in the downloaded archive (not sure if I was supposed to be more selective. 

### Installing Starship itself

Font installed, the [guide](https://starship.rs/guide/#%F0%9F%9A%80-installation) tells me to run:

```bash
sh -c "$(curl -fsSL https://starship.rs/install.sh)"
```

```
Configuration
> Bin directory: /usr/local/bin
> Platform:      unknown-linux-musl
> Arch:          x86_64

> Tarball URL: https://github.com/starship/starship/releases/latest/download/starship-x86_64-unknown-linux-musl.tar.gz
? Install Starship latest to /usr/local/bin? [y/N
```

I said `y`. It prompted me for my sudo password, then installed without issue. I launched a new window of my terminal and, boom, I saw the default Starship prompt!

![Out of the box Starship prompt](img/prompt-starship/out-of-box-starship.png)

## Basic configuration

One of the reasons I wanted to try Starship is that it seems to get a lot right out of the box. But you can [config some things](https://starship.rs/config/#prompt) in the `~/.config/starship.toml`. 

Here's the default they suggest you start with:

```toml
# Inserts a blank line between shell prompts
add_newline = true

# Replace the "❯" symbol in the prompt with "➜"
[character]                            # The name of the module we are configuring is "character"
success_symbol = "[➜](bold green)"     # The "success_symbol" segment is being set to "➜" with the color "bold green"

# Disable the package module, hiding it from the prompt completely
[package]
disabled = true
```

## My slightly tweaked Starship config file

```toml
# Inserts a blank line between shell prompts
add_newline = false

# Replace the "❯" symbol in the prompt with "➜"
[character]                            # The name of the module we are configuring is "character"
# success_symbol = "[➜](bold green)"     # The "success_symbol" segment is being set to "➜" with the color "bold green"
success_symbol = "[✚](bold red)"     # The "success_symbol" segment is being set to "➜" with the color "bold green"

# Disable the package module, hiding it from the prompt completely
[package]
disabled = true
```

You can probably guess the changes I made: no new line at the start, and changed the prompt symbol from a "bold" green `➜` to a "bold" red `✚`.

## Questions partially answered

My two main questions when starting this were: (1) What would happen to all my prompt work in my bashrc file?; and (2) what about my terminal colors? It seems like Starship overwrote everything except the hex color codes I set in my terminal's settings, which is good.
