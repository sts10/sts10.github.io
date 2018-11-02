---
layout: post
title: "eyeoh: My first Rust library"
date: 2018-11-02 18:18:50 -0400
comments: true
---

For the past year I've been fumbling around with Rust (here's [my first post on Rust](https://sts10.github.io/2017/11/18/trying-go-and-rust.html)). In those 12 months I've certainly had some lulls where I wasn't learning or writing much Rust, but I did buy two books on the relatively new language and did [some](https://sts10.github.io/2018/05/05/compound-passphrase-list-safety-checker.html) [cool](https://sts10.github.io/2018/05/31/1password-cracking-challenge.html) [projects](https://github.com/sts10/family_gift_list_maker) in Rust, including one for work.

While writing those programs, I realized I kept copy and pasting (or re-writing) functions to take user input or read simple files into Rust variables. Coming from Ruby, I was used to these operations be simple calls of one or maybe two methods/lines. But with Rust I was always surprised how tricky it was to get an integer from a CLI user, or read a file into a Vector. 

To that end, I've been working on a Rust library that attempts to make these tasks easier. I like to think that my library is in the same vein as ones like [easy_strings](https://github.com/Storyyeller/easy_strings), which helps users not have to deal with the pesky difference between `str`s and `Strings` (something I definitely still struggle with!). 

I decided to call my library [eyeoh](https://github.com/sts10/eyeoh) and it's up on GitHub with an MIT license. Lots more info and examples in the README-- go check it out!


## A more concise version of the `ensure` function

With a lot of help from Sergey Bugaev, who answered a lot of questions for me, I ended up with a function called `ensure` that I'm pretty proud of. From the README:

> `ensure` attempts to parse the user's input into the type that you're calling to (in the example below, that `f64`). If the user's input can't be parsed into the assigned type, the function will loop and ask the user to try again, displaying the string (`str`) that is passed to ensure.

Neat, right?

Here's the function itself:

```rust
fn ensure<T: FromStr>(try_again: &str) -> io::Result<T> {
    loop {
        let line = match gets() {
            Ok(l) => l,
            Err(e) => return Err(e),
        };
        match line.parse() {
            Ok(res) => return Ok(res),
            // otherwise, display inputted "try again" message
            // and continue the loop
            Err(_e) => {
                eprintln!("{}", try_again);
                continue;
            }
        };
    }
```

And here's a short example of how you'd use it:

```rust
println!("Enter a number");
// declare a new variable and specify a type of f64
let num: f64 = ensure("Please try again. Enter a number (a float)").unwrap();

// we're now out of the `ensure` loop, so we can be 
// reasonably sure that `num` was parsed into a float Type
println!(
    "Great, you entered {}, which I'm reasonably sure is a number",
    num
);
```



This `ensure` function could have been less verbose if I used the `?` operator and the `if let` construction, as opposed to the more verbose pair of `match` statements I ended up going with. 

```rust
pub fn ensure<T: FromStr>(try_again: &str) -> io::Result<T> {
    loop {
        let line = gets()?;
        if let Ok(res) = line.parse() { return res; }
        // otherwise, display inputted "try again" message
        eprintln!("{}", try_again);
        // and then let the loop cycle
    }
}

```

But I ended up preferring the more verbose version pasted above (with its two `match` statements), as I find it that more intuitive than wither the `?` operator or the `if let` construction (which I can't seem to get my head around).

## The ? operator

[This Stack Overflow answer](https://stackoverflow.com/a/42921174) helped me better understand that little `?`. 

Basically the `let line = gets()?` is shorthand for:

```rust
let line = match gets() {
  Ok(l) => l,
  Err(e) => return Err(e),
};
```

The trick is you can only use the `?` within functions that return a `Result`, since baked into the `?` is a return statement that returns an error, in our case: `return Err(e)`.

I'm honestly not ready to write anything about the `if let`, but you can read more about it [here](https://doc.rust-lang.org/rust-by-example/flow_control/if_let.html).
