---
layout: post
title: "8 Lessons from First Days of Advent of Code 2018"
date: 2018-12-02 19:22:00 -0400
comments: true
---

I've got two days of [Advent of Code 2018](https://adventofcode.com/2018) under my belt and four stars to show for it! But I'll be the first to admit that I had plenty of help, so I thought it only fair that I write out some of the things I've _already_ learned about Rust.

If you're still working on either day 1 or 2 (and there's no shame in that... I've yet to get to Day 10), heads up that there are SPOILERS below.

Note: Almost all of these lessons/tricks I snagged from either the code of others or Fediverse friends, some of whom I credit below and some of whom I don't. I don't think the uncredited will be upset, but if so please drop me a line on [Octodon](https://octodon.social/@schlink) or [elsewhere](https://gist.github.com/sts10/4a4e01021b3a5ad42e9b73e0abd7b7e3).

Here's [my AoC 2018 repo](https://github.com/sts10/advent-of-code-2018) that you might want open as you read.

## Lessons from Day 1

- [The AoC challenge](https://adventofcode.com/2018/day/1)
- [My solutions](https://github.com/sts10/advent-of-code-2018/blob/master/src/bin/day01.rs)

### 1. Rust has a `cycle` method

Did you know [Rust has a `cycle` method](https://doc.rust-lang.org/std/iter/struct.Cycle.html) (similar to Ruby's) that you can use on Vectors? I didn't!

```rust
// The cycle method is key here-- it makes the for loop go
// "around the horn" of frequency_changes changes
for frequency_change in frequency_changes.iter().cycle() {
  // <loop content here>
}
```


### 2. HashSets

In part 2 of day 1, I had a long vector that I had to perform a lot of look-ups with (actually a call to `contains`). In fact there were so many progressively more cumbersome `contains` calls that it took so long to run that I just assumed the compiler was in an infinite loop and I forced it to quit. In reality it was slowing down significantly and I wasn't just wasn't patient enough (it probably would have taken about 20 to 30 seconds I think).

On the advice of some of my livestream viewers, I replaced the Vector with a HashSet:

```rust
use std::collections::HashSet;
// ...

// To decrease look-up times, we're going to use a HashSet where I might have
// used a Vector
let mut recorded_frequencies = HashSet::new();
```

A [HashSet](https://doc.rust-lang.org/std/collections/struct.HashSet.html) is basically a HashMap with only values (no keys). Sounds like a Vector, right? It sort of is, but my understanding is that, like [HashMaps](https://doc.rust-lang.org/std/collections/struct.HashMap.html), it's optimized for look-ups rather than iteration. In my case, the "look-up" was a [`contains`](https://doc.rust-lang.org/std/collections/struct.HashSet.html#method.contains) call.

```rust
for frequency_change in frequency_changes.iter().cycle() {
  // find the new (current) frequency
  current_frequency += frequency_change;

  // now check list (Vector) of recorded_frequencies to see if this new_frequency
  // has occurred before
  if recorded_frequencies.contains(&current_frequency) {
    answer = Some(current_frequency);
    break;
  }
  // add the new_frequency to the list of recorded_frequencies
  recorded_frequencies.insert(current_frequency);
}
```

### 3. `insert` returns a bool of `false` if value you're trying to add is already present

As with a HashMap, you can add to a HashSet with [`insert`](https://doc.rust-lang.org/std/collections/struct.HashSet.html#method.insert).  (as opposed to `push`ing to a Vector). Interestingly, again while perusing others' code, I learned that `insert` returns `false` if the set already has the value you're trying to add. [From the docs](https://doc.rust-lang.org/std/collections/struct.HashSet.html#method.insert):

> Adds a value to the set. If the set did not have this value present, true is returned. If the set did have this value present, false is returned.

Thus, I think I could have removed that `contains` call and just recorded the result of the `insert` call. But I ended up not even trying this... I think my answer would have become less readable.

## Lessons from Day 2

- [The AoC challenge](https://adventofcode.com/2018/day/2)
- [My solutions](https://github.com/sts10/advent-of-code-2018/blob/master/src/bin/day02.rs)

### 4. What to borrow when nesting `for` loops

Day 2's 2nd part, at least [for me](https://github.com/sts10/advent-of-code-2018/blob/master/src/bin/day02.rs#L18), involves some tricky nested loops. Crucially, both loops need to iterate through the same data (a Vector of Vectors in the case below). 

At first, I tried two `for` loops, each in a pattern familiar to me. 

```rust
for box_id_vec in vector_of_box_ids_as_vecs {
  for box_id_vec_to_compare in vector_of_box_ids_as_vecs {
    if do_two_strs_differ_by_one_character_in_the_same_position(
      box_id_vec,
      box_id_vec_to_compare,
      ) {
      println!("found it; {:?} and {:?}"), box_id_vec, &box_id_vec_to_compare
      );
    }
  }
}
```

But, given my experience with nested loops in Rust (see [this beast](https://github.com/sts10/crackme-rust/blob/master/src/main.rs#L34)), I knew this would through a lot of borrow checker errors (spoiler alert: it did). 

I wrestled with it and started adding `&`s and `ref`s willy nilly, but it just wouldn't compile. Eventually I made two distinct copies of the Vector in question, and got the right answer and the gold star.

I left it at that for an hour or two and then started checking solutions from other people doing AoC in Rust. One of them (I can't find it now, but here's a similar [one](https://git.gitano.org.uk/personal/dsilvers/aoc.git/tree/2018/src/bin/day2.rs#n33)) used two `for` loops that, rather than iterating through Vectors, instead both looped through _ranges_ of `0..vector.len()`. This seems to nicely avoid a lot or the ownership and borrowing issues I hit with the code above.

I also switched the main data source, from a `Vec<Vec<char>>` called `vector_of_box_ids_as_vecs` to a more simple `Vec<String>` called `vector_of_box_ids`.

Here's my updated Part 2, using ranges/indexes:

```rust
let number_of_ids = vector_of_box_ids.len();
for index_of_box_id in 0..number_of_ids {
  for index_of_box_id_to_compare in 0..number_of_ids {
    if do_two_strs_differ_by_one_character_in_the_same_position(
        &vector_of_box_ids[index_of_box_id],
        &vector_of_box_ids[index_of_box_id_to_compare],
        ) {
      println!(
          "found it: {:?} and {:?}",
          &vector_of_box_ids[index_of_box_id],
          &vector_of_box_ids[index_of_box_id_to_compare]
          );
    }
  }
}
```

Obviously you can make the names of the index variables shorter if you like!

I'm going try to remember this ranges/index trick next time I'm messing around with nested loops in Rust (I could even use `while` loops and handle the iterators myself...). 

*Update*: With some help from a Fediverse friend, we got the original `for` loop pattern to compile and work. My original attempt was _sort of_ close?

```rust
// new, better version of part 2
for box_id_vec in &vector_of_box_ids {
    for box_id_vec_to_compare in &vector_of_box_ids {
        if let Some(common_characters) = find_common_characters_if_there_is_only_one_that_is_different(
                box_id_vec,
                box_id_vec_to_compare,
            ) {
            println!("common characters are {}", common_characters);
        }
    }
}
```

Hooray! (Though I'm still going to keep that range/index pattern in my bag of tricks.)

### 5. `Option`s and `zip`s, oh my

Now let's look at the helper function called `find_common_characters_if_there_is_only_one_that_is_different`. 

Given how I was going to use this function, I figured that the real Rust thing to do would be to have the helper function return an `Option`. This also means that it can return a nice-to-use `None` whenever it didn't find what it was looking for.

```rust
fn find_common_characters_if_there_is_only_one_that_is_different(
    a: &str,
    b: &str,
) -> Option<String> {
    let mut a_vec: Vec<char> = [].to_vec();
    let mut b_vec: Vec<char> = [].to_vec();
    let mut common_characters: String = "".to_string();

    for c in a.chars() {
        a_vec.push(c);
    }
    for c in b.chars() {
        b_vec.push(c);
    }
    let mut how_many_characters_are_different = 0;
    for (index, c) in a_vec.iter().enumerate() {
        if *c != b_vec[index] {
            how_many_characters_are_different += 1;
        } else {
            common_characters = format!("{}{}", common_characters, *c);
        }
    }
    if how_many_characters_are_different == 1 {
        Some(common_characters)
    } else {
        None
    }
}
```

However, I didn't love all those lines in `find_common_characters_if_there_is_only_one_that_is_different` that are used to build the Vectors, but I didn't know how to make it any smoother. 

Then, again with even more help from aforementioned Fediverse friend, we worked out a much better function, including my first use of [`zip`](https://doc.rust-lang.org/std/iter/trait.Iterator.html#method.zip) in Rust, which, I _think_, basically takes to iterators and zips them into a new iterator with tuples of the original iterators.

```rust
fn find_common_characters_if_there_is_only_one_that_is_different(
    a: &str,
    b: &str,
) -> Option<String> {
    let mut common_characters: String = "".to_string();
    let mut how_many_characters_are_different = 0;

    // make the zip
    let zipped = a.chars().zip(b.chars());

    // iterate through the zip
    for (a_char, b_char) in zipped {
        if a_char != b_char {
            how_many_characters_are_different += 1;
        } else {
            // add c to the end of common_characters using format!
            common_characters.push(b_char);
        }

        if how_many_characters_are_different > 1 {
            // there are already more than 1 character different,
            // so we don't need to keep checking for difference
            break;
        }
    }
    if how_many_characters_are_different == 1 {
        Some(common_characters)
    } else {
        None
    }
}
```

And here's how I use the new function in `main()`:

```rust
let number_of_ids = vector_of_box_ids.len();

for index_of_box_id in 0..number_of_ids {
    for index_of_box_id_to_compare in 0..number_of_ids {
        match find_common_characters_if_there_is_only_one_that_is_different(
            &vector_of_box_ids[index_of_box_id],
            &vector_of_box_ids[index_of_box_id_to_compare],
        ) {
            Some(common_characters) => println!("common characters are {}", common_characters),
            None => (),
        }
    }
}

```

I even wrote [a series of tests](https://github.com/sts10/advent-of-code-2018/blob/master/src/bin/day02.rs#L133) for `find_common_characters_if_there_is_only_one_that_is_different` to make sure it did what we wanted.

### 6. if let

Next, [Clippy](https://github.com/rust-lang/rust-clippy) informed me that I could use an `if let` rather than a `match` in `main()`. Honestly, I only recently got any sort of a handle of `if let`... it still seems very strange to me. ([Here's the section in the Rust Book on it](https://doc.rust-lang.org/book/second-edition/ch06-03-if-let.html).) But admittedly it is pretty concise.

I've left the `match` statement below, commented out, for reference.

```rust
// in main()
let number_of_ids = vector_of_box_ids.len();

for index_of_box_id in 0..number_of_ids {
  for index_of_box_id_to_compare in 0..number_of_ids {
    // match find_common_characters_if_there_is_only_one_that_is_different(
    //     &vector_of_box_ids[index_of_box_id],
    //     &vector_of_box_ids[index_of_box_id_to_compare],
    // ) {
    //     Some(common_characters) => println!("common characters are {}", common_characters),
    //     None => (),
    // }
    if let Some(common_characters) =
      find_common_characters_if_there_is_only_one_that_is_different(
          &vector_of_box_ids[index_of_box_id],
          &vector_of_box_ids[index_of_box_id_to_compare],
          ) {
        println!("common characters are {}", common_characters);
      }
  }
}

```

### 7. The `entry` / `and_modify` / `or_insert` pattern for HashMaps

If you want to make a [HashMap](https://doc.rust-lang.org/std/collections/struct.HashMap.html) of counts of things, there's some handy methods like `and_modify` and `or_insert`. When set up in a chain, it searches for a key. If it has the key already, it adds one (or whatever you tell it to do in the block. If the key isn't already present, it inserts it with the value you give to `or_insert`. 

Here's [a stand-alone example](https://play.rust-lang.org/?version=stable&mode=debug&edition=2015&gist=ae745b481662b712159fc2edfdc7fd13):

```rust
use std::collections::HashMap;

fn main() {
  let text = "aabcdeefghhhij";

  let mut counts_hashmap: HashMap<char, usize> = HashMap::new();
  for character in text.chars() {
    counts_hashmap
      .entry(character)
      .and_modify(|count| *count += 1)
      .or_insert(1);
  }
  println!("Character counts in {}\n{:?}",text,counts_hashmap);

  // Now let's sort by counts 
  // best way I know how is by making a new vector of tuples
  let mut count_vec: Vec<(&char, &usize)> = counts_hashmap.iter().collect();
  count_vec.sort_by(|a, b| b.1.cmp(a.1));
  for pair in &count_vec {
    println!("{:?}", pair);
  }
}
```

We could also use `sort_by_key` to sort the `count_vec`. We'll need to reverse it to get the highest counts at the top:

```rust
// Now let's sort by counts 
// best way I know how is by making a new vector of tuples
let mut count_vec: Vec<(char, usize)> = counts_hashmap.into_iter().collect();
count_vec.sort_by_key(|&(_c, num)| num);
count_vec.reverse();
for pair in &count_vec {
  println!("{:?}", pair);
}
```

## Lesson 8: A note on Cargo and the organization of my AoC repo

At first I had nested git projects, one for the overall project and one for each day (created by running `cargo new`). However this was messy and problematic as I had to manage tons of sets of branches, and more with each day. So I learned somethings about Cargo projects and did some reorganization, and now it's all within [one git project](https://github.com/sts10/advent-of-code-2018).

Now each day's challenge (1 through, hopefully, theoretically, 25) is a Rust executable in `src/bin`. Thus the code for, say, Day 2's executable is located in `src/bin/day02.rs`. To run the Day 2 executable, from the root directory run `cargo run --bin day02`. (`cargo run` runs `src/main.rs`, which doesn't have any AoC code in it.)

To run tests, if there are any, run `cargo test --bin day02`. The input for each challenge is located in `inputs` and named by the day (so for example, `inputs/day02.txt`).

And there's now only [one git project](https://github.com/sts10/advent-of-code-2018)-- the overall one.

## Bonus: `continue 'next_line`???

In reading others' solutions to Day 2, I found [something strange](https://github.com/anowell/advent-of-code/blob/master/src/day2.rs#L48):

```rust
fn part2(input: &str) -> Result<String, Error> {
  let lines: Vec<_> = input.trim().lines().collect();
  let line_count = lines.len();

  for i in 0..line_count {
    'next_line: for j in i..line_count {
      let mut offset = None;
      // Using bytes is about 25% faster than chars, but we :heart: UTF-8
      for (k, (a, b)) in lines[i].chars().zip(lines[j].chars()).enumerate() {
        if a != b {
          if offset.is_none() {
            offset = Some(k);
          } else {
            continue 'next_line;
          }
        }
      }

      // Only allocate new strings in the inner loop if we found the match
      // Previously, string allocating in the inner loop was ~90% of the execution time
      if let Some(offset) = offset {
        let a = lines[i].chars().take(offset);
        let b = lines[i].chars().skip(offset + 1);
        let ret: String = a.chain(b).collect();
        return Ok(ret);
      }
    }
  }

  Err("Did not find any strings with only a single character difference".into())
}
```

I'm assuming that `continue 'next_line;` makes the compiler jump up to the line that has `'next_line: for j in i..line_count {`. I'm wondering if that's a way to `continue` or `break` out of multiple loops if we wanted to. Something to checkout.
