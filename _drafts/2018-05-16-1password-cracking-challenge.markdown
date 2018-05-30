---
layout: post
title: "Fishing in an Abyss: Building a Password Cracker in Rust"
date: 2018-05-16 19:28:50 -0400
comments: true
---

Ahead of this year's World Password Day, 1Password -- maker of password management software -- announced [a password cracking challenge](https://blog.agilebits.com/2018/04/26/how-strong-should-your-master-password-be-for-world-password-day-wed-like-to-know/). The company ostensibly wanted to find out how hard it would be to crack a three-word passphrase master password on one of their vaults, given that the derived hash of the passphrase was exposed.

(As of the night of May 29th, none of the passwords has been cracked.)

## Wait, What? 

First of all, the 1Password [blog post](https://blog.agilebits.com/2018/04/26/how-strong-should-your-master-password-be-for-world-password-day-wed-like-to-know/) announcing the challenge does a pretty good job at explaining what the challenge is all about in a pretty non-technical way. But we can step back for a minute and ask "how are passwords stored?" For example, how does Amazon (or 1Password) store my password?

They are NOT just stored in plain text. [This video](https://www.youtube.com/watch?v=8ZtInClXe1Q) does a good job of explaining why, but basically it's because if someone gets their hands on that database, they'll have every user's username and password right there. 

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/8ZtInClXe1Q" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

Vaguely, generally, from a non-expert, the best way to store passwords (as a website) is to _hash_ and _salt_ the passwords. To hand-wave over that, let's stick to "hashing". Hashing, I've only recently learned, basically means you run the password through a one-way mathematical function. Wikipedia defines [one-way mathematical function](https://en.wikipedia.org/wiki/One-way_function) thusly:

> In computer science, a one-way function is a function that is easy to compute on every input, but hard to invert given the image of a random input. Here, "easy" and "hard" are to be understood in the sense of computational complexity theory, specifically the theory of polynomial time problems. Not being one-to-one is not considered sufficient of a function for it to be called one-way.

An example of a (apparently useful) one-way function is [multiplying to very large prime numbers](https://en.wikipedia.org/wiki/One-way_function#Multiplication_and_factoring). Multiplying two numbers isn't hard (even if they're huge), but if I gave you a huge number and said "guess the two prime numbers that I multiplied together to make this number" you'd be forced to do a lot of dividing (factoring) to get the answer. One non-mathematical example that helped me get a handle on this is mixing paint colors: it's easy to mix red and blue paint and get purple, but it's very hard to take purple and somehow get the exact shades of red and blue back.

Specifics aside, the general idea is that we're going to pass some parameters (information) into a function and we're going to get an output that we can reliably compare to a stored output. 1Password stores your exact shade of purple. You type in your master password (a specific shade of red), the program does the mixing (the "easy" direction of the one-way function) with a standardized shade of blue, in the case, and then compares the produced (or "derived") shade of purple with the shade it has on file. If they match, it decrypts your password database; if they don't, it doesn't. 

It's basically a game of Go Fish -- exactly what you'd want to protect a password.

To translate a bit: the shade of red-- the password -- is the "secret"; the method by which we'll mix the colors is called the digest algorithm; the shade of purple (correct or incorrect) is called the "derived hash". We'll have some other variables as well that don't fit the metaphor too well -- for example, the "salt" could be defined as the shade of blue we're using to mix (it can be known to the attack and indeed is in the 1Password challenge), and the number of iterations could be thought of as how _much_ paint we're dealing with in total: the more paint the longer it takes a given computer to "mix" the colors, slowing down a brute force attack.

The one-way function that 1Password actually uses to hash its master passwords is Password-Based Key Derivation Function 2 (or [PDKF2](https://en.wikipedia.org/wiki/PBKDF2)). 

## What I Wrote

Now I'm pretty sure that the tool you're _supposed_ to use for something like this is [hashcat](https://hashcat.net/hashcat/) or [John the Ripper](http://www.openwall.com/john/) -- here's [one user's screenshot of hashcat or something similar](https://twitter.com/netmux/status/992086115459977217). But I've been slowly teaching myself a programming language called Rust, and I wanted to learn more about password hashing (plus, with only access to my personal laptop, I felt I didn't really have a chance of winning the challenge no matter the method I used). Note: during almost every step of the way outlined below I got some help from Fediverse users (if any of y'all want a shout-out here, let me know, though I assumed you wouldn't).

Here's my Github repo-- [the master branch](https://github.com/sts10/crackme-rust/tree/master) uses Rayon to use threading, while [the "no-threads" branch](https://github.com/sts10/crackme-rust/tree/no-threads) does not (it's easier to read my crappy Rust without the threading).

### PDKDF2 from the Ring crate

I found a Rust "crate" or library called [Ring](https://github.com/briansmith/ring) that has [a pdkdf2 function already defined](https://briansmith.org/rustdoc/ring/pbkdf2/index.html) (it's [defined here](https://github.com/briansmith/ring/blob/b73e2a248b9239d86f45711238499189d256fe29/src/pbkdf2.rs#L142)). It takes five variables as inputs: algorithm type, number of iterations, the "salt", the secret (aka our password guess), and the output variable you want to store the derived hash in.

To actually use Ring's pdkdf2 function to attack the 1Password challenge format, I found that I needed to write a wrapper function that did some basic text formatting before and after actually calling the function from the Ring crate. Here is that wrapper function, plus some global variables I grabbed from [the example the Ring library gave](https://briansmith.org/rustdoc/ring/pbkdf2/index.html#password-database-example):

```rust
static DIGEST_ALG: &'static digest::Algorithm = &digest::SHA256;
const CREDENTIAL_LEN: usize = digest::SHA256_OUTPUT_LEN; // or just put 32 I think
pub type Credential = [u8; CREDENTIAL_LEN];

fn derive(iterations: u32, salt: &str, password: &str) -> String {
    // first, make salt_vec (thanks to https://stackoverflow.com/a/44532957)
    let mut salt_vec = vec![];
    for i in 0..(salt.len() / 2) {
        let mut byte = u8::from_str_radix(&salt[2 * i..2 * i + 2].to_string(), 16).unwrap();
        salt_vec.push(byte);
    }

    let mut derived_hash: Credential = [0u8; CREDENTIAL_LEN];

    pbkdf2::derive(
        DIGEST_ALG,
        iterations,
        &salt_vec,
        password.as_bytes(),
        &mut derived_hash,
    );

    let mut lower = String::new();
    for &byte in derived_hash.iter() {
        write!(&mut lower, "{:02x}", byte).expect("Unable to write byte");
    }
    return lower;
}
```

Getting the salt formatted correctly took a bit of doing. Likewise, as you can see, after calling the library's `derive` function I had to give some zero-padding to each byte of the derived hash, as well as make it lowercase, before I could compare it to the derived hashes that 1Password presents in its challenge. 

Now we're ready to look at the shorter `guess` function. This function takes our guess, the number of iterations, the salt, and the derived hashed that we want to compare our output to. If they match, it returns the boolean True. If they don't match, it returns False.

```rust
fn guess(password_guess: &str, iterations: u32, salt: &str, derived: &str) -> bool {
    println!("Guessing {}", password_guess);
    derive(iterations, salt, password_guess) == derived
}
```

Obviously we're going to be running this guess function a lot (we are going to be mixing a lot of shades of red and comparing the outputted shade of purple with the given shade of purple).

### The guessing loops

1Password tells us that the passwords will be three words [RANDOMLY chosen](https://github.com/agilebits/crackme/tree/master/cmd) from [this word list](https://github.com/agilebits/crackme/blob/master/doc/AgileWords.txt), with a space in between each word. (To understand why it's important to have a character in between each word, you can read [an earlier post of mine](https://sts10.github.io/2018/05/05/compound-passphrase-list-safety-checker.html).)

We want to run through every possible password (since their made up of three words we could also call them passphrases), performing what's called a brute force attack. For example, our first guess is going to be `aardvark aardvark aardvark`, and then our second guess will be `aardvark aardvark abaci`, and so on, until our produced derived hash matches the given derived hash.

Here is the `run_crack` function (as seen in [the "no-threads" branch of the Github repo](https://github.com/sts10/crackme-rust/blob/no-threads/src/main.rs)). It sports three nested `for` loops, each of which work through the same array of words created from the word list text file. If the `guess` function (shown above) returns `true`, it prints the correct guess and then returns it; else it prints the incorrect guess and moves on to the next guess.

```rust
fn run_crack(given_iterations: u32, given_salt: &str, given_derived: &str) -> Option<String> {
    let words = make_word_list("agile_words.txt");

    for word1 in &words {
        for word2 in &words {
            for word3 in &words {
                let password_guess = format!("{} {} {}", word1, word2, word3);
                if guess(&password_guess, given_iterations, given_salt, given_derived) {
                    println!("Found it! {}", password_guess);
                    return Some(password_guess);
                } else {
                    println!("Tried {} unsuccessfully", password_guess);
                }
            }
        }
    }
    None
}
```

At this point you may be wondering how many different passphrases are possible given 1Password's stated rules. The number of words on the word list is 18,328, so the number of possible passphrases is 18,328 * 18,328 * 18,328 -- roughly 6,156,000,000,000, or over 6 trillion. 

## So... How long?

So how long would it take my System76 Oryx Pro with a not-too-shabby Intel i7-7700HQ? As a test I set the mystery password as `aardvark aardvark accolade`, the 100th passphrase that my program would guess. My janky benchmark code tells me I do those 100 guesses in about 4,167 milliseconds. Extrapolating from there, it would take 8,193 years to check all of the passphrases (using one core). 

We can speed up the cracking by telling Rust to use all eight _threads_ that my laptop has in parallel. I did this using [the Rayon crate](https://github.com/rayon-rs/rayon) -- you can see [that version of the `run crack` function here](https://github.com/sts10/crackme-rust/blob/master/src/main.rs#L34), but it is a bit messier than the above. 

<blockquote class="twitter-tweet" data-conversation="none" data-lang="en"><p lang="en" dir="ltr">well, I&#39;m putting the 8 cores to use at least <a href="https://t.co/R12GV0FNIZ">pic.twitter.com/R12GV0FNIZ</a></p>&mdash; Sam Schlinkert (@sts10) <a href="https://twitter.com/sts10/status/992247500160421888?ref_src=twsrc%5Etfw">May 4, 2018</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

If I were to use all 8 threads, and assume they'd all run as fast as when I running on just one core, that's still over a thousand years. _Even if_ the password we were looking for was square in the middle of the list, we're still at five centuries!

Unfazed, I ran the finished script for about 36 hours, figuring I might get lucky. I didn't trust my benchmark, and as I fell asleep to the sounds of my laptop's fan presumably working at top speed, I dared to dream about miraculously winning the $4,096 top prize, and what fame it would gain me, a social media producer who just started writing Rust. But of course, I was just mixing the wrong shades of paint very quickly, casting for fish in a very large sea.

