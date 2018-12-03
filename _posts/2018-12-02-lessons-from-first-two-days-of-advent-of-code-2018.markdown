---
layout: post
title: "Lessons from First Days of Advent of Code 2018"
date: 2018-12-02 19:22:00 -0400
comments: true
---

I've got two days of [Advent of Code 2018](https://adventofcode.com/) under my belt and four stars to show for it! But I had plenty of help.

I thought I'd take a second to write out some the lessons I've _already_ learned. Note: Almost all of these lessons/tricks I snagged from either the code of others or fediverse friends, some of whom I credit and some of whom I don't. I don't think the uncredited will be upset, but if so please drop me a line on [Octodon](https://octodon.social/@schlink) or [elsewhere](https://gist.github.com/sts10/4a4e01021b3a5ad42e9b73e0abd7b7e3).

Here's [my 2018 repo](https://github.com/sts10/advent-of-code-2018).

## Lessons from Day 1

### `cycle`

Did you know [Rust has a `cycle` method](https://doc.rust-lang.org/std/iter/struct.Cycle.html) similar to Ruby's that you can use on Vectors? I didn't!

```rust
// The cycle method is key here-- it makes the for loop go
// "around the horn" of frequency_changes changes
for frequency_change in frequency_changes.iter().cycle() {
  // <loop content here>
}

```
### HashSets

In part 2 of day 1, I had a long vector that I had to perform a lot of look-ups with (actually a call to `contains`). In fact there were so many progressively more cumbersome `contains` calls that it took so long to run that I just assumed the compiler was in an infinite loop and I forced it to quit. In reality it was slowing down significantly and I wasn't just wasn't patient enough (it probably would have taken about 20 to 30 seconds I think).

On the advice of some of my livestream viewers, I replaced the Vector with a HashSet:

```rust
// To decrease look-up times, we're going to use a HashSet where I might have
// used a Vector
let mut recorded_frequencies = HashSet::new();
```

A [HashSet](https://doc.rust-lang.org/std/collections/struct.HashSet.html) is basically a HashMap without keys, only values. Sounds like a Vector, right? It sort of is, but my understanding is that, like [HashMaps](https://doc.rust-lang.org/std/collections/struct.HashMap.html), it's optimized for look-ups rather than iteration. In my case, the "look-up" was a [`contains`](https://doc.rust-lang.org/std/collections/struct.HashSet.html#method.contains) call.

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

### `insert` returns a bool of `false` if value you're trying to add is already present

As with a HashMap, you add to a HashSet with [`insert`](https://doc.rust-lang.org/std/collections/struct.HashSet.html#method.insert). Interestingly, again while perusing others' code, I learned that `insert` returns `false` if the set already has the value you're trying to add. [From the docs](https://doc.rust-lang.org/std/collections/struct.HashSet.html#method.insert):

> Adds a value to the set. If the set did not have this value present, true is returned. If the set did have this value present, false is returned.

Thus, I think I could have removed that `contains` call and just recorded the result of the `insert` call. But I ended up not even trying this... I think my answer would have become less readable.

## Lessons from Day 2

### Sometimes it's good to iterate through ranges (and indexes) rather than collections (with `for` loops in this case)

Day 2's 2nd part, at least [for me](https://github.com/sts10/advent-of-code-2018/blob/master/day02-rust/src/main.rs#L17), involves some tricky nested loops. Crucially, both loops need to iterate through the same data (a Vector of Vectors in the case below). 

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

I wrestled with it and started adding `&`s and `ref`s willy nilly, but it just wouldn't compile. Eventually I made two distinct copes of the Vector in question, and got the right answer. I left it at that for an hour or two and checked solutions from other people doing AoC in Rust. One of them (I can't find it now, but here's [one](https://git.gitano.org.uk/personal/dsilvers/aoc.git/tree/2018/src/bin/day2.rs#n33)) used two for loops that both looped through _ranges_ of `0..vector.len()`, which nicely avoids a lot borrowing issues.

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

And here's that helper function (more on it below):

```rust
fn do_two_strs_differ_by_one_character_in_the_same_position(a: &str, b: &str) -> bool {
  let mut a_vec: Vec<char> = [].to_vec();
  let mut b_vec: Vec<char> = [].to_vec();

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
    }
  }

  how_many_characters_are_different == 1
}

``` 

Obviously you can make the names of the index variables shorter if you like!

I'm going try to remember this ranges/index trick next time I'm messing around with nested loops in Rust (I could even use `while` loops and handle the iterators myself...). 

### A Good Use Case for Returning an `Option`

That code above only returned the pair of strings that were off by exactly one character (to solve the puzzle, I used my eyes to see the differing character, then removed it and submitted that as my answer). 

But the puzzle actually asks for common characters, so it'd be good to have Rust do that for us. Plus, I think the more Rust way is to have that helper function return an `Option`. So I replaced it with a new function called `find_common_characters_if_there_is_only_one_that_is_different` (especially when doing AoC, I'm into really descriptive function and variable names).

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

I still don't love all those lines in `find_common_characters_if_there_is_only_one_that_is_different` that are used to build the Vectors, but I don't know how to make it any smoother.

### `If let`

Next, Clippy informed me that I could use an `if let` rather than a `match` in `main()`. Honestly, I only recently got any sort of a handle of `if let`... it still seems very strange to me. But it is pretty concise.

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

### The `entry` / `and_modify` / `or_insert` pattern for HashMaps

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

### Concatenating (adding) multiple strings with `format!`

`format!` is the most dependable and flexible way to concatenate `&str`s.

```rust
fn main() {
  let str1 = "Merry";
  let str2 = "Christmas";
  let str3 = "Happy";
  let str4 = "New Year";
  
  let all_together = format!("{} {} and a {} {}!", str1, str2, str3, str4);
  
  println!("{}", all_together);
}
```

You can even concatenate `String`s with `&str`s:

```rust
fn main() {
  let str1 = "Merry";
  let str2 = "Christmas".to_string();
  let str3 = "Happy";
  let str4 = "New Year".to_string();
  
  let all_together = format!("{} {} and a {} {}!", str1, str2, str3, str4);
  
  println!("{}", all_together);
}
```

### Bonus `continue 'next_line`???

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

I'm assuming that `continue 'next_line;` makes the compiler jump up to the line that has `'next_line: for j in i..line_count {`. I'm wondering if that's a way for us to `continue` or `break` out of multiple loops if we wanted to. Something to checkout.
