---
layout: post
title: "Optimizing Rust: The Evolution of My Day 5 Advent of Code Solution"
date: 2018-12-07 18:15:00 -0400
comments: true
---

[Day 5 of this year's Advent of Code](https://adventofcode.com/2018/day/5) involves scanning "the chemical composition of [Santa's new suit] material. We "discover that it is formed by extremely long polymers (one of which is available as your puzzle input)." We have to take these "polymers" (strings of upper and lowercase characters) and work through their reaction. 

I'll just paste from the challenge for us:

For example:

- In `aA`, `a` and `A` react, leaving nothing behind.
- In `abBA`, `bB` destroys itself, leaving `aA`. As above, this then destroys itself, leaving nothing.
- In `abAB`, no two adjacent units are of the same type, and so nothing happens.
- In `aabAAB`, even though `aa` and `AA` are of the same type, their polarities match, and so nothing happens.

Now, consider a larger example, `dabAcCaCBAcCcaDA`:

- `dabAcCaCBAcCcaDA`  The first 'cC' is removed.
- `dabAaCBAcCcaDA`    This creates 'Aa', which is removed.
- `dabCBAcCcaDA`      Either 'cC' or 'Cc' are removed (the result is the same).
- `dabCBAcaDA`        No further actions can be taken.

After all possible reactions, the resulting polymer contains 10 units. How many units remain after fully reacting the polymer you scanned? 

In solving it, I wrote a `react` function that takes one of these polymer strings as a Vector of characters (`Vec<char>` is the Rust function signature). The first version of this `react` function contained two nested loops: the inner loop iterated through the polymer characters one character at a time, looking for characters that "cancel" or react. To test if any two given characters react, I wrote a separate function called `do_these_two_chars_cancel`. 

If we indeed find a canceling pair, we remove them from the vector and `break` out of the inner `for` loop to an outer loop, where we begin all over, starting at the first two characters.

You can find my current solution here, but I wanted to walk us through some of the refactoring and optimizations two of the key functions went through. 

Let's start by looking at my first, successful solution. Here are the originally versions of two functions:

```rust
fn react(mut p_vec: Vec<char>) -> Vec<char> {
    let mut p_vec_len = p_vec.len();
    loop {
        let mut previous_c: char = p_vec[0];
        let mut indexes_to_remove: Vec<usize> = vec![];
        for c in 1..p_vec_len {
            if do_these_two_chars_cancel(p_vec[c], previous_c) {
                // "found a pair: {} and {}", previous_c, p_vec[c]
                p_vec.remove(c);
                p_vec.remove(c - 1);
                break;
            } else {
                previous_c = p_vec[c];
            }
        }
        if p_vec.len() == p_vec_len {
            break;
        } else {
            p_vec_len = p_vec.len();
        }
    }
    // let s: String = p_vec.into_iter().collect();
    // println!("polymer is now {:?}", s);// }
    p_vec
}

fn do_these_two_chars_cancel(a: char, b: char) -> bool {
    if a.is_uppercase() && b.is_lowercase() && a.to_lowercase().to_string() == b.to_string() {
        true
    } else if a.is_lowercase() && b.is_uppercase() && a.to_uppercase().to_string() == b.to_string()
    {
        true
    } else {
        false
    }
}
```

Can you spot ways to make this code more efficient? Turns out there are quite a few. The first one I implemented was actually submitted as [a pull request](https://github.com/sts10/advent-of-code-2018/pull/1) by a Fediverse friend named Daniel.

## Don't break so often

He changed the inner loop from a `for` loop to a `while` loop. The key change here is that the inner loop does NOT break when it finds a canceling pair -- rather, it simply removes them, keeps its iterator `index` at its same value, so that on the next loop it'll look at the very next pair.

```rust
fn react(mut p_vec: Vec<char>) -> Vec<char> {
  let mut p_vec_len = p_vec.len();
  loop {
    let mut previous_c: char = p_vec[0];
    let mut indexes_to_remove: Vec<usize> = vec![];
    let mut index = 1;
    let mut made_a_change = false;
    while index < p_vec_len {
      previous_c = p_vec[index - 1];
      if do_these_two_chars_cancel(p_vec[index], previous_c) {
        p_vec.remove(index);
        p_vec.remove(index - 1);
        index -= 1;
        p_vec_len -= 2;
        made_a_change = true;
      }
      index += 1;
    }
    if !made_a_change {
      break;
    }
  }
  p_vec
}
```

This led to a huge boost in efficiency... on the order of 250x by Daniel's calculations. I didn't do a speed test myself, but it was way faster. 

## Don't make a String when sticking with `&str`s will do

Not wanting to be outdone, I took a look at optimizing the helper function `do_these_two_chars_cancel` further. The original version of the function has two calls to `.to_string()`, which I remembered are particularly costly, as Strings in Rust live on the heap. If I could use slices of strings (`&str`), I figured it'd lead to an increase in efficiency and thus a speed improvement. 

When I was first trying to solve the challenge, I had written the seemingly logical `if a.to_lowercase == b`, however this results in an error: 

```
error[E0369]: binary operation `==` cannot be applied to type `std::char::ToLowercase`  
= note: an implementation of `std::cmp::PartialEq` might be missing for `std::char::ToLowercase`
```

I dropped the `.to_string()` calls in there out of necessity: `if a.is_uppercase() && b.is_lowercase() && a.to_lowercase().to_string() == b.to_string()`

But with time to go back, I found a similar method that did work on `char`s: [`to_ascii_lowercase()`](https://doc.rust-lang.org/std/primitive.char.html#method.to_ascii_lowercase). I also took the time to clean up the conditional logic, so in the end I got:

```rust
fn do_these_two_chars_cancel(a: char, b: char) -> bool {
  a.to_ascii_lowercase() == b.to_ascii_lowercase() && a.is_uppercase() == b.is_lowercase()
}
```
As I wrote in a comment, while two `<char>.to_lowercase()` can't be compared for equality, two `<char>.to_ascii_lowercase()`s can be.  Informally, I found that this version of the function was about 9x faster than my original. I could be a little less verbose if I chose to use [`eq_ignore_ascii_case()`](https://doc.rust-lang.org/std/primitive.char.html#method.eq_ignore_ascii_case).

## One `drain` is faster than two `remove`s

Then, Daniel submitted [another pull request](https://github.com/sts10/advent-of-code-2018/pull/2), this time with an even simpler change: substituting the two [`remove()`](https://doc.rust-lang.org/std/vec/struct.Vec.html#method.remove) calls with a [`splice()`](https://doc.rust-lang.org/std/vec/struct.Vec.html#method.splice). (The reason I couldn't do it in one `remove()` call is that you can only remove one leemnt at a time with `remove`. 

I ended up using [`drain()`](https://doc.rust-lang.org/std/vec/struct.Vec.html#method.drain), at [the suggestion of another helper](https://github.com/sts10/advent-of-code-2018/pull/2#issuecomment-445203424), as it fits a bit better semantically.

```rust
fn react(mut p_vec: Vec<char>) -> Vec<char> {
  let mut p_vec_len = p_vec.len();
  loop {
    let mut previous_c: char = p_vec[0];
    let mut indexes_to_remove: Vec<usize> = vec![];
    let mut index = 1;
    let mut made_a_change = false;
    while index < p_vec_len {
      previous_c = p_vec[index - 1];
      if do_these_two_chars_cancel(p_vec[index], previous_c) {
        p_vec.drain((index-1)..=index);
        index -= 1;
        p_vec_len -= 2;
        made_a_change = true;
      }
      index += 1;
    }
    if !made_a_change {
      break;
    }
  }
  p_vec
}
```

## Removing the outer `loop`

Ever since I saw Daniel's first pull request showing that we didn't need to break out of the inner loop, I had a sneaking suspicion that we could do away with the outer loop all together. The trick would be managing the `index` such that no canceling pairs were missed, paying particular attention to those iterations where a pair was removed.

Below is how it worked out. I needed the clunky `index = if index > 1 { index - 1 } else { index };` line to avoid a negative index on the very first pair. Otherwise it's not terrible. 

So here is, finally, the current version of those two functions:

```rust
fn react(mut p_vec: Vec<char>) -> Vec<char> {
  let mut p_vec_len = p_vec.len();
  let mut previous_c: char;
  let mut index = 1;
  while index < p_vec_len {
    previous_c = p_vec[index - 1];
    if do_these_two_chars_cancel(p_vec[index], previous_c) {
      // Found a pair that react. Let's remove them!
      // Use drain rather than remove. Drain is also a little semantically preferable
      // to `splice`
      p_vec.drain((index - 1)..=index);
      p_vec_len -= 2;
      // and, if we can, shift c back one
      index = if index > 1 { index - 1 } else { index };
    } else {
      // these two weren't a pair. Move on to the next pair
      // by shifting the iterator forward one character
      index += 1;
    }
  }
  p_vec
}

fn do_these_two_chars_cancel(a: char, b: char) -> bool {
  // it's MUCH faster to not convert the chars into Strings before comparing them.
  // While two <char>.lowercase() can't be compared for eqaulity, two <char>.to_ascii_lowercase() 's
  // can be
  a.to_ascii_lowercase() == b.to_ascii_lowercase() && a.is_uppercase() == b.is_lowercase()
}
```
