---
layout: post
title: "Playing with binary fuse filters"
date: 2023-01-11 10:00:00 -0400
comments: true
---

I was reading some Amazon S3 documentation and they recommended a program called apg for generating strong passwords. I wanted to learn more about it, so I ran `man apg`, where I learned about apgbfm, which 
> is used to manage Bloom filter that is used to restrict password generation in APG pasword generation software. Usage of the Bloom filter allows to speed up password check for large dictionaries and has some other benefits.

This reminded me of my project [**Medic**](https://github.com/sts10/medic), which, among other things, can check a KeePass database's passwords against [the very large list of breached passwords stored in HaveIBeenPwned](https://haveibeenpwned.com/Passwords). 

Medic currently takes from 1 to 4 minutes or 5 minutes to check a KeePass database's passwords against the text file. Naturally, I wondered if I could use a Bloom filter to cut this time down. 

## A foothold

I posted about Bloom filters on Mastodon and Graydon Hoare pointed me to [this paper](https://arxiv.org/pdf/2201.01174.pdf), which details an improved version of a Bloom filter called a "binary fuse filter". Hoare also pointed me to [a C++ project on GitHub called FilterPassword](https://github.com/FastFilter/FilterPassword), which, amazingly, tests a binary fuse filter against other filters on the HaveIBeenPwned list of passwords! What luck! 

I haven't written C++ since high school, so I had trouble even grokking the FilterPassword code, but thankfully I easily found [a Rust crate called xorf](https://github.com/ayazhafiz/xorf) that offers an API for a variety of these filters, including the latest and greatest binary fuse filter.

## What is a binary fuse filter?

I'm not a mathematician, so I won't pretend that I've already learned how these filters work. But I do understand the idea behind them: 

1. Create the "filter" by pushing a large array/Vector of elements into it.
2. Now you can ask the filter "Do you contain element 'foo'"? If it says "no" it's 100% that foo is not in the filter. If it says "yes" it's more like a "maybe", with a varying probability of that "maybe" being a "no" (but never 100%). In other words, if never has false negatives, but sometimes has false positives.

The **key advantage** is that these "contains" look-ups are significantly faster than if we ran contains on a normal Vector or hash.

So here was my idea for using one of these filters with my Medic program: 

1. Make a filter of all the breached password hash digests
2. Check all the given KeePass entry digests against the filter
3. If Medic gets all "No"s, we're golden-- we know none of the user's passwords are in the breached list, so we can quickly print "No passwords breached" and exit (hopefully much faster than the current checking code). If we get some "Maybes", we still have to go check those more thoroughly the old way, but at least it'll be fewer entries to check.

## Some code

From [the xorf crate docs](https://docs.rs/xorf/latest/xorf/), I found [this relevant example](https://docs.rs/xorf/latest/xorf/struct.BinaryFuse32.html). For testing purposes, I adapted it to use the first 5 million lines of the [HIBP password file](https://haveibeenpwned.com/Passwords).

One catch I encountered is that the way xorf set up its binary fuse filter, it only excepts elements of 64-bit unsigned integers (`u64` in Rust speak). This is an issue since each password digest from HIBP is given in the form of a SHA-1 digest, which is by definition 120 bits.

So I wrote a function that takes the first 13 characters of a SHA-1 hash digest and converts that into a `u64`: 
```rust
fn truncate_hash_to_u64(hash: &str) -> u64 {
    let truncated_hash = hash[..13].to_string();
    u64::from_str_radix(&truncated_hash, 32).unwrap()
}
```

I figure if the first 13 characters of the SHA-1 hash match, it's OK calling that a "maybe". 

With that understood, here's the entire toy Rust program I wrote:

```rust
use core::convert::TryFrom;
use rand::prelude::*;
use std::fs::File;
use std::io::BufRead;
use std::io::BufReader;
use xorf::{BinaryFuse8, Filter};

// From https://docs.rs/xorf/latest/xorf/struct.BinaryFuse32.html
fn main() {
    let mut rng = thread_rng();
    const SAMPLE_SIZE: usize = 5_000_000; // Only take first 5 million digests

    let hash_file = "../hibp/pwned-passwords-sha1-ordered-by-count-v8.txt";
    let f = File::open(hash_file).expect("Unable to open file");
    let file = BufReader::new(&f);
    let mut keys = vec![];
    for line in file.lines() {
        let truncated_hash = line.unwrap()[..13].to_string();
        let hash_as_decimal: u64 = u64::from_str_radix(&truncated_hash, 32).unwrap();
        keys.push(hash_as_decimal);
        if keys.len() >= SAMPLE_SIZE {
            break;
        }
    }
    let filter = BinaryFuse8::try_from(&keys).unwrap();

    // no false negatives
    for key in keys {
        assert!(filter.contains(&key));
    }

    // bits per entry
    let bpe = (filter.len() as f64) * 8.0 / (SAMPLE_SIZE as f64);
    assert!(bpe < 9.1, "Bits per entry is {}", bpe);

    // false positive rate
    let false_positives: usize = (0..SAMPLE_SIZE)
        .map(|_| rng.gen())
        .filter(|n| filter.contains(n))
        .count();
    let fp_rate: f64 = (false_positives * 100) as f64 / SAMPLE_SIZE as f64;
    assert!(fp_rate < 0.406, "False positive rate is {}", fp_rate);

    // Actually test the filter

    // a SHA1 hash of a definitely breached password:
    let hash_a = "9AC20922B054316BE23842A5BCA7D69F29F69D77";
    // a SHA1 hash of a definitely NOT breached password:
    let hash_b = "D909947C92C711A285AC8480A116A20CA20460B6";
    if filter.contains(&truncate_hash_to_u64(hash_a)) {
        println!("hash_a might be breached");
    } else {
        println!("hash_a is definitely safe");
    }
    if filter.contains(&truncate_hash_to_u64(hash_b)) {
        println!("hash_b might be breached");
    } else {
        println!("hash_b is definitely safe");
    }
}

fn truncate_hash_to_u64(hash: &str) -> u64 {
    let truncated_hash = hash[..13].to_string();
    u64::from_str_radix(&truncated_hash, 32).unwrap()
}
```

This runs and finishes correctly and pretty quickly (1.521 seconds), which is pretty awesome! But it's of course only checking the 2 hard-coded sample passwords against 5 million digests. [Version 7 of the HIBP password database](https://haveibeenpwned.com/Passwords) has 613 million. If it takes 1.521 seconds to check against 5 million, that's 3 minutes for all 613 million, and plus we still have to go back to check any and all "maybes" we find. 

## Putting this code into Medic

Undeterred, I opened Medic and adapted the code above into the project.

A note here: In order not to to use too much system memory, Medic reads 5.5 million password digests into system memory at a time. Each of these batches of 5.5 million is called a "chunk" in the code. I figured that was also a good size for a filter(?), so I would be making a filter of each chunk, then checking every entry against that filter in search of "maybes".

To keep things simple, I wanted to use a binary fuse filter to return a `bool`, where `false` meant there is definitely no matches found in the given chunk (i.e. none of the passwords in this chunk were found in the breached password file) and where `true` meant there was at least one "maybe." 

First, I inserted an `if` statement at the top of my `check_this_chunk` function to act as a sort of short circuit: 

```rust
fn check_this_chunk(entries: &[Entry], chunk: &[String]) -> io::Result<Vec<Entry>> {
    if are_there_maybes_in_this_chunk(entries, chunk) == false {
        // Nothing to check more thoroughly in this chunk!
        eprintln!("No maybes in this chunk. I get to take a shortcut!");
        return Ok(vec![]);
    } else {
        eprintln!("Found at least 1 maybe in this chunk, so checking it more thoroughly.");
    }

    let mut definitely_breached_entries = Vec::new();
    for line in chunk {
        let this_hash = &line[..40];
        for entry in entries {
            if this_hash == entry.digest {
                definitely_breached_entries.push(entry.clone());
            }
        }
    }
    Ok(definitely_breached_entries)
}
```

Then I adapted the toy program code above to write the `are_there_maybes_in_this_chunk` function:
```rust
use xorf::{BinaryFuse8, Filter};
fn are_there_maybes_in_this_chunk(entries: &[Entry], chunk: &[String]) -> bool {
    let mut keys = Vec::new();
    for line in chunk {
        let hash_as_decimal: u64 = truncate_hash_to_u64(&line);
        keys.push(hash_as_decimal);
    }

    let filter = BinaryFuse8::try_from(&keys).unwrap();
    for entry in entries {
        if filter.contains(&truncate_hash_to_u64(&entry.digest)) {
            return true; // got one maybe, so let's return true and end this 
        }
    }
    false
}
```

This seems to work, in that tests pass. And you can [see this code yourself on GitHub on the binaryfuse branch](https://github.com/sts10/medic/tree/binaryfuse). 

But it was actually slower than the old Medic code that just plows through each chunk!

## Informal benchmarks

My informal benchmark involved running 

```bash
cargo test --release can_check_keepass_db_against_full_haveibeenpwned_local_list_of_hashes --no-run && time cargo test --release can_check_keepass_db_against_full_haveibeenpwned_local_list_of_hashes`
```

Here are some quick results:

```text
On the main branch of Medic currently on Github, with chunk_size set to 500_000_000:
real	3m5.987s
user	2m34.868s
sys	0m20.961s

On binary fuse branch (chunk_size = 500_000_000):
real	6m11.824s
user	4m58.728s
sys	0m44.431s

On binary fuse branch (chunk_size = 10_000_000):
real	6m17.165s
user	4m49.884s
sys	0m36.258s

On binary fuse branch (chunk_size = 2_000_000_000):
real	6m47.406s
user	5m20.949s
sys	0m47.862s
```

As you can see, the binary fuse implementation above took about twice as long as the straight-forward, check-them-all method currently in use on the main branch of the project. This held even when I varied the chunk size a bit in either direction. 

At this point I'm not sure why this method is so much slower. Obviously if we get any "maybe"s in a given chunk, we've got to iterate through every line in the chunk again to do the "thorough" check. But the test database doesn't have that many breached passwords in it -- the majority of chunks should have `are_there_maybes_in_this_chunk == false`, and thus give us that promised speed-up.

I think the biggest cost is _building_ each filter, rather than that `contains` calls against them. This is part of the reason I chose the BinaryFuse8 filter, rather than 16-bit or 32-bit, since it's my understanding that the 8-bit version has the quickest built time (at cost of slightly more false positives).

## Little improvements I could make?

* Give each Entry object a `truncated_digest` field, so I only have to compute those once per entry. But I don't think this will be a game-changer. Basically turn `if filter.contains(&truncate_hash_to_u64(&entry.digest))` into `if filter.contains(&entry.truncated_digest) {`.
* I could have the filter function pass back a Vector of Entries that are maybe-breached, so that the thorough check only has to check those, but again I don't think that'll 2x or 10x the speed.

## Pausing for now

I'll keep playing with this this week, cuz I think it's interesting stuff (and if that C++ example is anything to go on, I chose a good tool for my problem). 

If you spot any mistakes that are slowing this code down, or have any tips or ideas or questions, [let me know on Mastodon](https://hachyderm.io/@schlink).
