---
layout: post
title: "Rust's find_map method"
date: 2020-10-10 14:46:00 -0400
comments: true
---

In a program I wrote for work in Rust, I had a function that needed to try running another function 3 times, each time with a different argument, and only returning a value when the sub-function returned a `Some` rather than a `None`. To do this in Rust, I had been using a series of `if let` and `else if let`s. 

I've written up a contrived example for us: 

```rust 
// Contrived example!
fn main() {
    println!("Result is {:?}", get_result3(0));
}

fn get_result(initial: usize) -> Option<usize> {
    // This is the bit I'm looking to refactor. Is there some way to use
    // a `match` statement here?
    // Basically, I need to try 3 different arguments in a function, returning
    // the first that returns a Some. If none of the 3 work, return a None.
    if let Some(result) = sub_five_from(initial + 2) {
        Some(result)
    } else if let Some(result) = sub_five_from(initial + 4) {
        Some(result)
    } else if let Some(result) = sub_five_from(initial + 12) {
        Some(result)
    } else {
        None
    }
}

fn sub_five_from(y: usize) -> Option<usize> {
    y.checked_sub(5)
}
```

In the contrived example above, we try sending `initial + 2` to `sub_five_from`, then try `initial + 4`, then `initial + 12`. We have `get_result` only return something if `sub_five_from` returns a `Some`. So if `sub_five_from(initial + 2)` returns `None`, we move on to `sub_five_from(initial + 4)` and see if that returns a `Some`.

Now, this `get_result` function as written above works, but I couldn't [help but wonder](https://www.vulture.com/2013/03/carrie-sex-city-couldnt-help-but-wonder.html) if there was a more Rust-y way to do what I needed to do; for example, maybe using a `match` statement. The problem I was confronting seemed to me to be a pretty common one. And if it wasn't, maybe that's because Rust, in it's wisdom, was trying to push me toward setting up these two functions differently.

## Toward more concise solutions

Thanks for [a Fediverse friend](https://linuxrocks.online/@friend), I saw that using `map` and `find` offers a more concise solution: 

```rust
fn get_result2(initial: usize) -> Option<usize> {
    let values = vec![initial + 2, initial + 4, initial + 12];
    values
        .iter()
        .map(|value| sub_five_from(*value))
        .find(|value| value.is_some())
        .flatten()
}
```

That use of `flatten()` was interesting to me. As Fedi friend explained, this use of `flatten` is [the method that acts on an Option](https://doc.rust-lang.org/std/option/enum.Option.html#method.flatten), which "Converts from `Option<Option<T>>` to `Option<T>`". Another thing I learned!

But we can do even better. 

## find_map

As my Fediverse friend observed, `iter`'s [`find_map` method](https://doc.rust-lang.org/std/iter/trait.Iterator.html#method.find_map) seems tailor-made for my use-case.

```rust
fn get_result3(initial: usize) -> Option<usize> {
    let values = vec![initial + 2, initial + 4, initial + 12];
    values.iter().find_map(|value| sub_five_from(*value))
}
```

That is... pretty darn concise! Almost reminds me of Ruby!

I did wonder about that use of `iter()`, though, so I poked around and reminded myself of the three forms of iteration.

## The three forms of iteration

From [the `iter` documentation](https://doc.rust-lang.org/std/iter/index.html#the-three-forms-of-iteration):

> There are three common methods which can create iterators from a collection:

> - `iter()`, which iterates over `&T`.
> - `iter_mut(),` which iterates over `&mut T`.
> - `into_iter(),` which iterates over `T`.

I _think_ that since we're OK to consume the values in the Vector, it'd be more idiomatic to use [`into_iter`](https://doc.rust-lang.org/std/iter/trait.IntoIterator.html#tymethod.into_iter) here, thus avoiding the `*` syntax:

```rust
fn get_result4(initial: usize) -> Option<usize> {
    let values = vec![initial + 2, initial + 4, initial + 12];
    values.into_iter().find_map(|value| sub_five_from(value))
}
```

Here's [a playground with the example code](https://play.rust-lang.org/?version=stable&mode=debug&edition=2018&gist=0f46d9161e3df7c3099d41f632783f4b) if you want to tinker.
