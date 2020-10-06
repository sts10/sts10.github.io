---
layout: post
title: "Peeking the Pivot"
date: 2020-10-05 22:46:00 -0400
comments: true
---

I subscribe to [a wonderful newsletter](https://cassidoo.co/newsletter/) that, among other things, presents readers with a coding challenge every week. 

I had some fun with [last week's](https://sts10.github.io/2020/09/28/rust-map-fold.html), so I thought I'd do this again, using Rust. So here's [this week's question](https://buttondown.email/cassidoo/archive/e203192d-4aa9-48c3-a715-78fb26fe503f):

> Given an array that was once sorted in ascending order is rotated at some pivot unknown to you beforehand (so [0,2,4,7,9] might become [7,9,0,2,4], for example). Find the minimum value in that array in O(n) or less.

The way my brain works, this is what jumped at me straight away:

```rust
fn find_value_of_drop(arr: &[usize]) -> usize {
    // start loop at 1 so we can always look back one space
    for i in 1..arr.len() {
        // compare this element to the one before, looking for a "drop" in value
        if arr[i] < arr[i - 1] {
            // if we found a drop, we know this element is the minimum value
            return arr[i];
        }
    }
    // If we made it here and still haven't found the drop, we know the array is 
    // such that the first element is the minimum value, so we'll return that
    arr[0]
}
```

(In fact, I first wrote is as a `while` loop that ended with a `i = i + 1` because even though I haven't written C++ for 20 years, it's how I learned loops.)

I'm pretty sure that works -- you can [test it yourself against a few tests I wrote](https://play.rust-lang.org/?version=stable&mode=debug&edition=2018&gist=8b718344d9c6379efe6c3d8dfa805443). 

## Trying to use an elegant Rust iterator 

But, as I managed to do [last week](https://sts10.github.io/2020/09/28/rust-map-fold.html), I wanted to see if there was a more elegant/Rust-y way to look at this problem. First, I tried `cycle` thinking it would help make the problems of (a) running out of the array and (b) checking the first element a bit easier. But I don't _think_ `cycle` really helps here. 

### Peeking

So I looked to [`peekable`](https://doc.rust-lang.org/std/iter/trait.Iterator.html#method.peekable) / [`peek`](https://doc.rust-lang.org/std/iter/struct.Peekable.html#method.peek), an iterator I think I had tried to use [before](https://sts10.github.io/2018/12/07/optimizing-rust-advent-of-code-day-5.html) without success.

I think the fundamental issue for me with these higher level iterators like peek is that the examples the documentation gives all use `next()` to move through the example array slice. 

```rust
let xs = [1, 2, 3];

let mut iter = xs.iter().peekable();

// peek() lets us see into the future
assert_eq!(iter.peek(), Some(&&1));
assert_eq!(iter.next(), Some(&1));

assert_eq!(iter.next(), Some(&2));
```

While what I almost always am in need of is a sturdy example that makes use of a loop like `for` or `while`. (An exception to this is the nice and concise examples for iterators that return a bool, like [`all`](https://doc.rust-lang.org/std/iter/trait.Iterator.html#method.all)  and `any`, and those that return something other than an iterator, like [`sum`](https://doc.rust-lang.org/std/iter/trait.Iterator.html#method.sum).) How often do I only want to `next` a couple of times? My only guess is that there's some general way to loop these specialized iterators.

My instincts (from Ruby most likely) is to want to write something like `for (this_element, next_element) in arr.iter().peekable() {` and then have access to `this_element` and an Option of `next_element` in the block (since if you're at the end of the array slice you won't have a next_element). (Though I _think_ you can use Rust's [enumerate method](https://doc.rust-lang.org/std/iter/trait.Iterator.html#method.enumerate) like this?) But, of course, this isn't Ruby. 

After some haphazard Googling, I got this beast to pass my tests:

```rust
fn find_value_of_drop_more_elegant(arr: &[usize]) -> usize {
    let mut peekable_arr = arr.iter().peekable();
    while let Some(l) = peekable_arr.next() {
        match peekable_arr.peek() {
            Some(next_element) => {
                if l > next_element {
                    return **next_element;
                }
            }
            None => return arr[0],
        };
    }
    arr[0]
}
```

But, phew, at first glance I did not like it.

First of all it's longer and denser than my first solution (I thought these where supposed to be _higher_ level iterators!). And to me it doesn't look very approachable or readable, especially at first look, particularly that second line, which uses both a `while let` and `next`, a pattern I wasn't familiar with.

And despite the borrow checker and I reaching some sort of tenuous truce about a year ago, that `**next_element` has me confused. I _think_ it's partially due to `peek` giving you a _reference_ to the next element (hence the `Some(&&1)` in the documentation example). The other `*` is needed because `iter()` gives references too, right? Or `next()`?  

### An attempt at generalizing?

In order to better understand this function that I basically copied from a forum answer I've since lost track of, let's start slow. Let's learn about that second line, the one with `while let` and the dreaded `next()`.

First let's open the documentation for [`next()`](https://doc.rust-lang.org/std/iter/trait.Iterator.html#tymethod.next) in a browser tab and let it simmer in our minds.

After thinking about next and while let for a bit, I wrote this in a Rust playground:

```rust
let a = [10, 22, 33, 44, 55, 66];
let mut my_iter = a.iter();

// A call to next() returns the next value as a reference wrapped in
// an Option...
// assert_eq!(Some(&10), my_iter.next());

// We should also not that we don't really care when .next() yields 
// None.

// And since we want to loop through all elements, `while let` fits
// our use-case pretty well.

while let Some(element) = my_iter.next() {
    println!("I'm on element {}", element);
}
```

For me, this shows that this "while-let-next" construction is pretty low-level, in that we can use it as a way to just iterate (no `peek` or anything fancy). Cool!

Next, I knew that `while let` was a sort of syntatic sugar for avoiding a formal `match` statement and its `None` branch -- just like `if let`. I figured "expanding" the while let might help me. Looking at [the "Rust by Example" explanation of `while let`](https://doc.rust-lang.org/rust-by-example/flow_control/while_let.html), I was able to expand my simplified example out:

```rust
let a = [10, 22, 33, 44, 55, 66];
let mut my_iter = a.iter();

loop {
    match my_iter.next() {
        // if there is indeed a next element... do something
        Some(element) => println!("I'm on element {}", element),
        // if there's not a next element... break
        _ => break, // think this can be None instead of _
    }
}
```

OK cool, cool. Next, the big task: using what I've learned with the simpler example and returning to the peekable code. This is where I learned the unfortunate coincidence of the name of the `next` method, mixed with this coding challenge and `peek`. 

Here's how I expanded that `while let`:

```rust
fn find_value_of_drop_using_peek_written_out(vec: &[usize]) -> usize {
    // let's set up a super neat peekable iterator
    let mut peekable_vec = vec.iter().peekable();
    // start an ole fashion loop!
    loop {
        // this is a crucial line below. We're asking if there are any elements 
        // left in our peekable array slice. `next()` is a bit of confusing term
        // here, because later we'll use peek to look at what you might think of 
        // as the NEXT element. 
        match peekable_vec.next() {
            // if there is a "next" element...
            // call it this_element and see if we can peek ahead to the NEXT element
            Some(this_element) => match peekable_vec.peek() {
                Some(next_element) => {
                    // Yes, there is a NEXT element, so we can do our comparison
                    if this_element > next_element {
                        return **next_element;
                    }
                }
                // No, no NEXT element, so just continue with the loop
                // though we could probably break or return vec[0] here...
                None => continue,
            },
            // This means we're really at the end of the vector
            // which means the first element is the minimum value
            // break so we get to the last line of the function and
            // return vec[0]
            _ => break,
        }
    }
    vec[0]
}
```

I think I'm starting to get a handle on it!? 

## Epilogue: A slightly tighter example using peek and if let

One of the great things about Mastodon is if you toot out some Rust code, [someone will refactor it further for you](https://social.libre.fi/objects/e3fb0226-8458-498d-857b-271bfe6611d6). In this case, my above solution can get significantly tighter (and arguably more readable) by replacing the `match` statement with an `if let`. Behold:

```rust
fn find_value_of_drop_more_elegant(arr: &[usize]) -> usize {
    let mut peekable_arr = arr.iter().peekable();
    while let Some(l) = peekable_arr.next() {
        if let Some(next_element) = peekable_arr.peek() {
            if l > next_element {
                return **next_element;
            }
        }
    }
    // If we made it here and still haven't found the drop, we know the array is 
    // such that the first element is the minimum value, so we'll return that
    arr[0]
}
```
