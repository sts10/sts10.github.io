---
layout: post
title: "Using Just to (further) automate the creation of word lists"
date: 2022-09-26 13:00:00 -0400
comments: true
---

As I've written about a [number](https://sts10.github.io/2022/08/12/efficiently-pruning-until-uniquely-decodable.html) [of](https://sts10.github.io/2022/06/27/revisiting-prfix-codes.html) [times](https://sts10.github.io/2021/12/09/tidy-0-2-0.html) recently, I've been working [a couple of word lists](https://github.com/sts10/generated-wordlists) this past year. To do this, I created a tool called [Tidy](https://github.com/sts10/tidy). 

At this point, Tidy accepts a number of flags and options. I generally add one whenever I think of some function I might want to perform on a word list. For example, `--skip-rows-end <SKIP_ROWS_END>`, which "Skip[s] last number of lines from inputted files" or `--ignore-after <IGNORE_AFTER_DELIMITER>`, which "Ignore[s] characters after the first instance of the specified delimiter until the end of line."

As I learned more about different qualities a word list could have, I kept generating new ones. I now ["maintain" 10 distinct lists in my repo](https://github.com/sts10/generated-wordlists#about-the-word-lists). I use the word "maintain" because I've found that I want to remove the same words from almost all of the lists, words like profane words, abbreviations, Roman numerals, and British spellings of common English words (assuming an American audience). Every time I find a new British spelling, or a new way to spell a profane word, I feel compelled to remove ti from all of my word lists. 
 
To do this, I would edit my local list of profane words or British spellings, then create all of the lists anew by re-running a long Tidy command. 

As mentioned, these commands could get pretty long. For example, here's the command to re-build the basic.txt list: 

```bash
tidy -AAAA --whittle-to 18250 -lL -m 3 -M 12 -a /usr/share/dict/words -r ../reject-words/profane-words.txt -r ../reject-words/roman-numerals-lower.txt -r ../reject-words/uncommon-words.txt -r ../reject-words/britishisms.txt -r ../reject-words/repeated-letters.txt -r ../reject-words/common_words.txt -r ../reject-words/mostly-abbreviations.txt --samples -o lists/basic.txt --force ../common_word_list_maker/word_list_raw.txt
```

Since it was difficult to remember 10 of these commands, I pasted them in a new text file. However, copying and pasting these commands out of the text file and into the command line become cumbersome, and I figured there must be a better way. That's when I remembered Just. 

## Just

Just ([Github](https://github.com/casey/just), [website](https://just.systems/)) is a "command runner" written in Rust. Its README describe it as a "a handy way to save and run project-specific commands," in other words, exactly what I needed.

Now, my command for re-building basic.txt lives in a "justfile" and looks like this: 

```just
# re-build basic.txt
basic:
  tidy -AAAA --whittle-to 18250 -lL -m 3 -M 12 -a /usr/share/dict/words {{reject_commands}} --samples -o lists/basic.txt --force {{path_to_ngram_list}}
```

Where, earlier in the file, I define variables I use in many of my commands, including `reject_commands` and `path_to_ngram_list`.

With this in place, I can simply run `just basic` to force a re-build of the basic.txt word list.

Now, when I want to make a new list, I can drop the command write in the justfile and I'm all set. I can even run `just --list` to list all of my available just commands. Nifty!

(Note that, for now, I haven't pushed the justfile to the word list repo, mostly to avoid confusion.)

## Why not use BASH/Shell?

Honestly, given my needs described above, I don't have a good answer to this, other than the convenience of not having to deal with permissions or writing your own `list` function. Though I have struggled with BASH variable syntax in the past.

## Epilogue: Just publishing with Jekyll

I was happy enough with Just that I added a justfile to this blog, since I kept forgetting the build and publish commands. 

```just
build: 
  bundle exec jekyll build

publish:
  git add .
  git commit -m "update"
  git push origin master
```

Now I can run `just build publish` and I'm all set!
