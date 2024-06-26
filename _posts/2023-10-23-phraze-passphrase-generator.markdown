---
layout: post
title: "Introducing Phraze, a passphrase generator"
date: 2023-10-23 20:00:00 -0400
comments: true
---

I wrote a random passphrase generator command-line tool! I'm calling it [Phraze](https://github.com/sts10/phraze).

```
$ phraze
northern-ruined-recruited-profound-vectors-drive-bringing
```

If you have Rust installed, you can install Phraze with `cargo install phraze`. If you don't have Rust installed, check [the latest releases](https://github.com/sts10/phraze/releases). See [the project's README](https://github.com/sts10/phraze/blob/main/readme.markdown) for more information on installation and usage.

## Why I hadn't written a passphrase generator like this before
Despite having written [a tool to create passphrase word lists](https://github.com/sts10/tidy) and later [my own passphrase word lists](https://github.com/sts10/orchard-street-wordlists), I had been hesitant to write my own passphrase generator. Why? Because I was worried about writing a real security tool. And there already is [a relatively popular one written in Rust called Pgen](https://github.com/ctsrc/Pgen) and Michah Lee's [passphraseme](https://github.com/micahflee/passphraseme). 

But I figured it'd be fun to try! And that the tool wouldn't get much _real_ use before it had been combed over by well-informed users looking for security issues. And I figured it might be a good way to spread my Orchard Street Wordlists.

## When would you use a standalone, command-line passphrase generator? Who is the user?
Usually when I generate a passphrase or password, I put it right into my password manager. As you would guess, it makes sense for password managers to include password and passphrase generators, and thus many do.

So what use does a tool like Phraze serve? Honestly I'm not totally sure. And maybe there's a reason I haven't found [a passphrase generator with over 300 stars on GitHub](https://github.com/topics/passphrase-generator). 

But if there's a password you DON'T want to put in your password manager for whatever reason, you'd likely want it to be one you could memorize or write on a piece of paper with accuracy. For those two use-cases, I think passphrases made up of words serve better than a shorter string of random characters. One example might be for things like Bitcoin wallets, which I believe [uses a short word list](https://github.com/bitcoin/bips/blob/master/bip-0039/english.txt). But I'd probably use physical dice for something like that. Anyway, we push on.

## What word lists does Phraze use? 
By default, Phraze uses my [Orchard Street Medium list](https://github.com/sts10/orchard-street-wordlists#orchard-street-medium-list), but users have their choice of most of the other [Orchard Street lists](https://github.com/sts10/orchard-street-wordlists) or to use their own word list.

## Some feature creep, as a treat
At least initially, I wanted to try to keep the Rust code simple and straight-forward.

But over time, I couldn't resist and kept adding features, like providing multiple "built-in" word lists, word separator choice, set minimum entropy, allow users to provide their own word list... with the result that the project is currently up to 529 lines of Rust (though I assume this includes tests and benchmarks)!

## Different ways of including a word list text file within a Rust project

Phraze currently includes [7 "built-in" word lists](https://github.com/sts10/phraze/tree/main/word-lists). By built-in, I mean that the word lists are included during compile time, in the `cargo`-generated binary. This improves performance at runtime, but also probably improves security. 

Figuring out exactly how to do this to maximize performance became the most interesting part of the project so far. Let's go through my approaches in the order that I used them.

### Approach #1: `include_str!` macro

Here's how, in early versions, I read in word list files:

```rust
/// Read in the appropriate word list, given the enum of the desired list
fn make_list(list_to_use: List) -> Vec<&'static str> {
    match list_to_use {
        List::Medium => include_str!("../word-lists/orchard-street-medium.txt")
            .split('\n')
            .collect(),
        List::Long => include_str!("../word-lists/orchard-street-long.txt")
            .split('\n')
            .collect(),
        List::Qwerty => include_str!("../word-lists/orchard-street-qwerty.txt")
            .split('\n')
            .collect(),
        List::Alpha => include_str!("../word-lists/orchard-street-alpha.txt")
            .split('\n')
            .collect(),
        List::Eff => include_str!("../word-lists/eff-long.txt")
            .split('\n')
            .collect(),
    }
}
```

This handy [`include_str!` macro](https://doc.rust-lang.org/std/macro.include_str.html) "Includes a UTF-8 encoded file as a string." Since these lists are effectively constants (they're not provided by the user), we want to read them in as string slices rather than `String`s for improved performance.

However! If I had read [the provided example of `include_str!`](https://doc.rust-lang.org/std/macro.include_str.html#examples) more carefully, I would have realized something! 

```rust
let my_str = include_str!("spanish.in");
assert_eq!(my_str, "adiós\n");
```

As you can see, the `\n` comes along with every word. This means that my `split('\n')` calls, which I've used in the past, will give one extra blank (`""`) string at the end of the returned Vector.

For Phraze, this is a pretty serious problem because it means that one "word" in every list is a blank list. Thus a user could ask for a 6-word passphrase and get what is effectively a 5-word passphrase if one of the words is the blank word. A tricky bug to discover!

#### Fixing this bug

I could have written in a check for blank words, but that felt like treating the symptom rather than the underlying cause. And I knew that none of the included lists had any blank lines.

Thanks to some help from a Fediverse friend, I tried simply using the `lines()` method rather than `split('\n')`. I believe that solves the problem (maybe `lines()` is a bit smarter in handling the last lines of files?).

```rust
/// Read in the appropriate word list, given the enum of the desired list
fn make_list(list_to_use: List) -> Vec<&'static str> {
    match list_to_use {
        List::Medium => include_str!("../word-lists/orchard-street-medium.txt")
            .lines()
            .collect(),
        List::Long => include_str!("../word-lists/orchard-street-long.txt")
            .lines()
            .collect(),
        List::Qwerty => include_str!("../word-lists/orchard-street-qwerty.txt")
            .lines()
            .collect(),
        List::Alpha => include_str!("../word-lists/orchard-street-alpha.txt")
            .lines()
            .collect(),
        List::Eff => include_str!("../word-lists/eff-long.txt").lines().collect(),
        List::Effshort => include_str!("../word-lists/eff-short-1.txt")
            .lines()
            .collect(),
        List::Mnemonicode => include_str!("../word-lists/mnemonicode.txt")
            .lines()
            .collect(),
    }
}
```

But we're still needing to parse each line at runtime. Wouldn't it be great if we could do that at compile time, thus speeding up the runtime by that much?

### Approach #2: Using a build script

Luckily, Rust has a thing/feature called a [build script](https://doc.rust-lang.org/cargo/reference/build-scripts.html#case-study-code-generation), which I could use to read-in or "load" the "built-in" word list files.

And sure enough, once I implemented benchmarking with [Criterion.rs](https://github.com/bheisler/criterion.rs), I saw that using this approach is about 99% faster than the `include_str!` method described above. Nice! See [the build.rs file](https://github.com/sts10/phraze/blob/main/build.rs) for the gist of how that works.

```rust
use std::env;
use std::fs::File;
use std::io::{BufRead, BufReader, Write};
use std::path::Path;

// Docs:
// https://doc.rust-lang.org/cargo/reference/build-scripts.html#case-study-code-generation

/// Write the words from the word list file into a Rust Array for program's use.
fn words(mut f_dest: &File, const_name: &str, fname_src: &str, list_size: usize) {
    // Declare a new Rust constant that is an array of slices.
    // To maximize efficiency, make it the exact size of this word list.
    write!(f_dest, "const {const_name}: &[&str; {list_size}] = &[").unwrap();

    // Read words in and add them to this array
    let f_src = BufReader::new(File::open(fname_src).unwrap());
    for word in f_src.lines() {
        match word {
            // We're writing a Rust Array programmtically, so need the word to be surround by
            // double quotes and have a comma between words.
            Ok(word) => write!(f_dest, "\"{word}\",").unwrap(),
            Err(_e) => panic!("Error reading line from built-in list"),
        }
    }

    // Close array syntax
    f_dest.write_all(b"];").unwrap();
}

fn main() {
    let out_dir = env::var("OUT_DIR").unwrap();
    let dest_path = Path::new(&out_dir).join("wordlists.rs");
    let f = File::create(dest_path).unwrap();

    words(&f, "WL_LONG", "word-lists/orchard-street-long.txt", 17576);
    words(
        &f,
        "WL_MEDIUM",
        "word-lists/orchard-street-medium.txt",
        8192,
    );
    words(
        &f,
        "WL_QWERTY",
        "word-lists/orchard-street-qwerty.txt",
        1296,
    );
    words(&f, "WL_ALPHA", "word-lists/orchard-street-alpha.txt", 1296);
    words(&f, "WL_EFF", "word-lists/eff-long.txt", 7776);
    words(&f, "WL_EFFSHORT", "word-lists/eff-short-1.txt", 1296);
    words(&f, "WL_MNEMONICODE", "word-lists/mnemonicode.txt", 1633);
}
```

This works pretty well! You could stop reading this section now and go with this!

But, as Alan Evans [persuasively argued](https://github.com/sts10/phraze/pull/17#issuecomment-1784313115), it's a bit "smelly" that I'd have to edit this build script every time I wanted to (a) add or remove or a word list or (b) change the length of a word list. Plus, writing Rust is hard enough -- writing Rust that writes Rust feels like it could get complicated quickly.

### Approach #3: `includes_lines!`

Instead, Evans [suggested](https://github.com/sts10/phraze/pull/17) returning to the macro approach, but instead of `include_str!`, find one like the one offered by [the crate includes_lines](https://crates.io/crates/include-lines).

Now we get to go back to using just a normal function (rather than a build script, which we can now delete), which I renamed to `fetch_list`:

```rust
/// Take enum of list_choice and use the `include_lines!` macro to read-in the appropriate word
/// list in.
pub fn fetch_list(list_choice: ListChoice) -> &'static [&'static str] {
    match list_choice {
        ListChoice::Long => &include_lines!("word-lists/orchard-street-long.txt"),
        ListChoice::Medium => &include_lines!("word-lists/orchard-street-medium.txt"),
        ListChoice::Qwerty => &include_lines!("word-lists/orchard-street-qwerty.txt"),
        ListChoice::Alpha => &include_lines!("word-lists/orchard-street-alpha.txt"),
        ListChoice::Eff => &include_lines!("word-lists/eff-long.txt"),
        ListChoice::Effshort => &include_lines!("word-lists/eff-short-1.txt"),
        ListChoice::Mnemonicode => &include_lines!("word-lists/mnemonicode.txt"),
    }
}
```

As you can hopefully see, contra the `include_str!` approach, we don't have to parse/find line endings at runtime. And the `include_lines!` macro returns `&'static [&'static str]` -- just what we want. 

In addition to cleaner code, we also maintain the performance of the build script method, without the build script file/overhead. Phenomenal!

My informal, non-Criterion, benchmark of `hyperfine -N -w 1000 -m 1000 phraze` clocks in at under 2 ms again. Awesome!

## Having a function accept either Strings or str slices

The part I've hidden till now is that, at the end of the day, to take advantage of reading the built-in lists as string slices, but also being able to graceful handle user-provided word list files (which we'll need to use `String`s for), is that we need a function that can take either type in its input. 

To do this, we need to use this ugly Rust syntax that I kind of hate -- the `T` business.

```rust
/// Actually generate the passphrase, given a couple necessary parameters.
/// This function uses some Rust magic to be able to accept a word list as
/// either a &[&str] (built-in word lists) or as a &[String] if user provides a file
/// as word list.
pub fn generate_a_passphrase<T: AsRef<str> + std::fmt::Display>(
    number_of_words_to_put_in_passphrase: usize,
    separator: &str,
    title_case: bool,
    list: &[T], // Either type!
) -> String {
    let mut rng = thread_rng();
    // Create a blank String to put words into to create our passphrase
    let mut passphrase = String::new();
    for i in 0..number_of_words_to_put_in_passphrase {
        // Check if we're doing title_case
        let random_word = if title_case {
            make_title_case(&get_random_element(&mut rng, list))
        } else {
            get_random_element(&mut rng, list)
        };
        // Add this word to our passphrase
        passphrase += &random_word;
        // Add a separator
        if i != number_of_words_to_put_in_passphrase - 1 {
            passphrase += &make_separator(&mut rng, separator);
        }
    }
    passphrase.to_string()
}
```

If you have ideas for these functions or the project in general, feel free to [create an issue or PR](https://github.com/sts10/phraze).

## A hot take about Rust!
It's probably on me, but obtuse function signatures like the one I needed for `generate_a_passphrase` -- which I think of as "Ugly Rust" -- make me think it's time for me to stop writing and maintaining Rust code. (This and async Rust.) But for this project, I held my nose and tried a mix of `'`s and `<`s till it compiled and the tests passed.

I would much rather have the ability to define a type called List that holds multiple "string like" objects, then use this type declaration everywhere and anywhere I want (function inputs, outputs, variables, etc.) I learned to code writing Ruby, so maybe I'm forever object-oriented. Maybe you can effectively do this in Rust with Structs and Traits, but it doesn't seem to be the encouraged approach.

Could I have just using `Vec<String>`s for the built-in lists and sprinkled `to_string()` calls around to make the code more readable (less obtuse)? Yes. Would that have only increased runtime from 1.8 ms to about 4 ms? Yes. Am I making unrealistic demands on a language, expecting the performance of a low-level language with the aesthetics of a high-level one? Maybe. But it's 2023, and I want it all! Or at least, I don't want these "hard parts" to appear most commonly in the already-claustrophobic space of function signatures.

I've been [playing with Rust for six years now!](https://sts10.github.io/2017/11/18/trying-go-and-rust.html), and it stills feel like I'm a small child swinging around a hammer that's too heavy for me to use comfortably; that when I hit the nail there's still quite a bit of luck involved. 

I'm super grateful for my experience with Rust -- its strict and descriptive compiler makes working alone an educational experience. It was my first real typed language since a brush with C++ in high school! And it's clearly ideal for writing command-line tools that don't touch the web much -- just the type of programs that I'm interested in. Lastly, I'm sure I'll be a better programmer in any language I pick up in the future because of my time with Rust.

But maybe it's time to put the mighty hammer away -- my education from the Rust compiler at a stopping point? A passphrase generator does feel a bit like the culmination of [my work on passphrases](https://www.samschlinkert.com/#passphrases), which has roughly overlapped with my time writing Rust (starting in 2018).

### Other languages?
If you have suggestions for other languages I might migrate to as a hobby language, [I'm all ears](https://hachyderm.io/@schlink). (Though I'm a little worried Rust, particularly its descriptive errors and toolchain, has set my expectations too high.) I'm actually curious about [trying Zig again](https://sts10.github.io/2022/08/20/a-summer-fling-with-zig.html), as, ironically, maybe a slightly lower level language(?) could use more explicit and less obtuse code syntax and patterns(?). I'm still afraid of real functional languages like OCaml and F#. The realistic answer is probably (still) Go or Python... 

I'm aware that the better way to frame this question is "What kind of programs do you want to write?" and then find a language that is the best tool for that job. Rust was and is a great tool for command-line tools that [check KeePass databases for compromised passwords](https://github.com/sts10/medic), [make word lists to specification](https://github.com/sts10/tidy), [handle TOTP codes](https://github.com/sts10/qr-forge), and randomly generate passphrases. Maybe the question is: What kinds of things do I want to write next?!

## Appendix: On licensing

Kind of just for fun, I decided to license Phraze using [the Mozilla Public License (version 2.0)](https://github.com/sts10/phraze/blob/main/LICENSE.txt), a "weak copyleft" license that I like and that I think strikes a nice balance between "strong" copyleft licenses, like the [GNU Public License (GPL)](https://www.gnu.org/licenses/gpl-3.0.en.html), and permissive licenses, like [the MIT license](https://opensource.org/license/MIT/).

Interestingly, only later did I realize that two of the word lists I might have wanted to include in Phraze -- [KeePassXC's word list](https://github.com/keepassxreboot/keepassxc/blob/develop/share/wordlists/eff_large.wordlist) and [SecureDrop's French word list](https://github.com/freedomofpress/securedrop/blob/develop/securedrop/wordlists/fr.txt) -- are licensed under the Affero General Public License (AGPL). I _think_ this means I could only integrate them in to Phraze if I offered Phraze under the GPL or AGPL. (If you have thoughts on this, I have opened [an issue](https://github.com/sts10/phraze/issues/5).)

I could of course still switch to a GPL license... still considering. 
