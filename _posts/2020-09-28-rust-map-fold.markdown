---
layout: post
title: "Summing over a Rust struct with map and fold"
date: 2020-09-08 15:46:00 -0400
comments: true
---

I subscribe to [a wonderful newsletter](https://cassidoo.co/newsletter/) that, among other things, presents readers with a coding challenge every week. 

Here's [this week's question](https://buttondown.email/cassidoo/archive/0e4a7da8-323c-4005-9c3f-51e9097e3bf0):

> Given an array of people objects (where each person has a name and a number of pizza slices they’re hungry for) and a number for the number of slices that the pizza can be sliced into, return the number of pizzas you need to buy.

Example:
```javascript
arr = [{ name: Joe, num: 9 }, { name: Cami, num: 3 }, { name: Cassidy, num: 4 }]
gimmePizza(arr, 8)
2 // 16 slices needed, pizzas can be sliced into 8 pieces, so 2 pizzas should be ordered
```

Since Rust is basically the only language I write these days (even though I write it poorly), I naturally decided to use Rust. 

Here was [my first attempt](https://play.rust-lang.org/?version=stable&mode=debug&edition=2018&gist=d81f894b7a83ce641c7cd41c8446e0a5):

```rust
#![allow(dead_code)]
struct Person<'a> {
    name: &'a str,
    slices_requested: usize,
}
fn main() {
    let persons: Vec<Person> = vec![
        Person {
            name: "Joe",
            slices_requested: 9,
        },
        Person {
            name: "Cami",
            slices_requested: 3,
        },
        Person {
            name: "Cassidy",
            slices_requested: 4,
        },
    ];

    assert_eq!(gimme_pizza(&persons, 8), 2);
    println!("Need to order {} pizzas", gimme_pizza(&persons, 8));
}

fn gimme_pizza(persons: &[Person], slices_per_pizza: usize) -> usize {
    let mut slices_needed = 0;
    for person in persons {
        slices_needed += person.slices_requested;
    }
    if slices_needed % slices_per_pizza == 0 {
        slices_needed / slices_per_pizza
    } else {
        slices_needed / slices_per_pizza + 1
    }
}
```

It works fine, but those first 4 lines of the `gimme_pizza` function bugged me -- I shouldn't have to declare a mutable variable and set it to 0 like that. I knew there was a better way, probably using [`map`](https://doc.rust-lang.org/std/iter/trait.Iterator.html#method.map), to make that summation a bit tighter, but I couldn't figure out how to get it to work.

Thanks to some [help from the Fediverse](https://octodon.social/@CobaltVelvet/104943310038730879), I now know this is what I was reaching for: 

```rust
fn gimme_pizza_using_map(persons: &[Person], slices_per_pizza: usize) -> usize {
    let slices_needed: usize = persons.iter().map(|person| person.slices_requested).sum();
    if slices_needed % slices_per_pizza == 0 {
        slices_needed / slices_per_pizza
    } else {
        slices_needed / slices_per_pizza + 1
    }
}
```

Alternatively, I could have used [`fold`](https://doc.rust-lang.org/std/iter/trait.Iterator.html#method.fold), another [pair](https://fosstodon.org/@george_/104943308725289404) [of](https://mastodon.social/@jeancf/104943291748723775) Fediverse users pointed out. That would have looked like this:

```rust
fn gimme_pizza_using_fold(persons: &[Person], slices_per_pizza: usize) -> usize {
    let slices_needed: usize = persons.iter().fold(0, |running_sum, person| {
        running_sum + person.slices_requested
    });
    if slices_needed % slices_per_pizza == 0 {
        slices_needed / slices_per_pizza
    } else {
        slices_needed / slices_per_pizza + 1
    }
}
```

I'm not sure with I prefer... I'm guessing `fold` is more versatile for cases where you want to do more than summing. And I don't love that map returns its own object type that you can only do certain things with, whereas fold is more an all-in-one approach.

Separately, I'm curious if there's a more concise way to go from `slices_needed` to `pizzas_needed`, besides my big ole, 5-line if/else using modulo.
