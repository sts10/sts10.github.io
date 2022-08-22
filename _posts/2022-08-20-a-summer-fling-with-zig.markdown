---
layout: post
title: "A summer fling with Zig"
date: 2022-08-20 17:00:00 -0400
comments: true
---

I decided to spend a few days trying out a relatively new programming language called [Zig](https://ziglang.org), "a general-purpose programming language and toolchain for maintaining robust, optimal, and reusable software."

## Why Zig?

I've loved writing [Rust](https://www.rust-lang.org/) for the past five years(!). I've been happy with what I've achieved with it, and when I need to write code it's currently the language I reach for first -- [I've done Advent of Code in Rust for the past five years](https://github.com/sts10?tab=repositories&q=advent+of+code&type=&language=rust&sort=).

But even in all that time, there are areas of Rust that are still foreign to me. I don't use traits, and my understanding of error-handling is minimal and confused. There are probably more examples, but as a litmus test, it's still very hard for me to _read_ Rust code written by other developers, especially function signatures. Of course, this is a bit on me -- I seem to have just found a plateau on the Rust learning mountain where I'm dangerous enough to write functional command-line tools, but too content to push on. Or Rust asks too much, even after years of (slow and often interrupted) learning.

This has all been enough for me to wonder if I would be better served by a "smaller" language, with fewer keywords and syntax, but still typed, general-purpose, and fast. One whose function signatures help me understand what function does, rather than me having to read the function body to figure out what the signature means.

## An aside: What about Go?

To be honest, Go probably checks most if not all of these boxes. I tried Go the same week I first tried Rust -- I wrote [a blog post about it](https://sts10.github.io/2017/11/18/trying-go-and-rust.html). Toward the end of the post I wrote, "[F]or me, of the two, I think Go is a more… comfortable, realistic language to go forward with, if I go forward with either of them." But then a funny thing happened: I started writing [more and more Rust](https://github.com/sts10?tab=repositories&q=&type=&language=rust&sort=). Shrug!

## Zig

Maybe Zig and I would hit it off. There was only one way to find out. [As I did when trying out Rust and Go](https://sts10.github.io/2017/11/18/trying-go-and-rust.html), [I implemented a basic command-line tic-tac-toe game](https://github.com/sts10/zig-zac-zoe). 

I did my work with Zig v0.9.1, which I think makes it the first pre-1.0 language I've ever used. I didn't find major issues writing or running my simple program that felt like an issue with the language/compiler.

### Zig Resources 

* [The Zig docs for v 0.9.1](https://ziglang.org/documentation/0.9.1/)
* [ziglearn.org](https://ziglearn.org/)
* [Zig by example](https://zig-by-example.com/)
* [Ziglings](https://github.com/ratfactor/ziglings) (think this requires an edge version of Zig?)

I also enjoyed [the "Zen" section of Zig's documentation](https://ziglang.org/documentation/0.6.0/#Zen), stating some over-arching mottoes like "Communicate intent precisely", "Favor reading code over writing code" and "Only one obvious way to do things."

### Installing Zig

On my Linux machine, I went with the snap install (`snap install zig --classic --beta`) as listed in [Zig's GitHub wiki](https://github.com/ziglang/zig/wiki/Install-Zig-from-a-Package-Manager). Running v0.9.1 for now.

### What I wrote

You can see [my working command-line tic-tac-toe game](https://github.com/sts10/zig-zac-zoe). Instructions for how to run it are available in the readme.

### Things I liked about zig

- **Straight-forward error handling**: [They're just enums!](https://ziglearn.org/chapter-1/#errors) And it's built-in. I was able to "bubble up" all my errors to the `main` function pretty easily -- not something I can say about Rust!
- **[Pass by value](https://ziglang.org/documentation/0.6.0/#Pass-by-value-Parameters)**: Which I think saves us from Rust's mutable borrowing shenanigans?
- **["Zig has no concept of strings"](https://ziglang.org/documentation/0.6.0/#Slices)**! I'm sure this leads to some awkwardness somewhere, but it may at least avoid another of Rust's big learning-curve headaches.
- **[Optionals](https://ziglearn.org/chapter-1/#optionals)** offer at least some of the functionality of Rust's powerful Option type.
- **Opinionated code formatter**: I love that there's [an official package for Vim](https://github.com/ziglang/zig.vim), and that it includes a code-formatting-on-save feature. Yes, other languages have this -- and Rust's formatter feels "official" -- but this seems like a nice touch for a pre-1.0 language. As [the Zen](https://ziglang.org/documentation/0.6.0/#Zen) says, "Minimize energy spent on coding style."

### Sticking points coming from Rust

Overall it was pretty smooth sailing for me! Though I guess coming from a few years of Rust that shouldn't be a huge surprise. The compiler errors were usually good in that I could figure out the problem relatively quickly, though something like a missing parenthesis in an `if` statement usually tripped something else. (Rust compiler errors remain that best I've seen.)

Oddly, the most frustrating part of the experience was implementing a basic random number generator. I some how missed [the dedicated section of "Zig Learn" on the topic](https://ziglearn.org/chapter-2/#random-numbers). Luckily, a fediverse friend helped me out with [a pull request](https://github.com/sts10/zig-zac-zoe/pull/1). Here's where we landed:

```zig
// Return a random number from 0 to given `max`
fn pickRandomNumber(max: usize) usize {
    var prng = std.rand.DefaultPrng.init(blk: {
        var seed: u64 = undefined;
        // Ignoring possible error for code simplicity
        std.os.getrandom(std.mem.asBytes(&seed)) catch {};
        break :blk seed;
    });
    const rand = prng.random();

    const number = rand.intRangeAtMost(usize, 0, max);
    std.debug.print("Picking {}\n", .{number});
    return number;
}
```

I think this is a good demonstration of just how low level Zig is. While it's neat that I didn't have to import a library into my Zig program to pick a random number, and that I have some literal input as to what seed I want to use, it's quite a bit simpler to pick a random number from 0 to 8 in Go: `rand.Intn(8)` and Rust: `rand::thread_rng().gen_range(0, 8)` (once the appropriate "rand" libraries are imported). But in Zig, it's easy to change how your pseudo-random number generator is seeded. Interesting!

## Handling an Optional type

```zig
// checkForWinningPlayer returns an "optional", which I take to be kind of like an Option
// in Rust. https://ziglearn.org/chapter-1/#optionals
var winner = checkForWinningPlayer(board);
// Now we "open" the winner optional to see what's inside,
// kind of like Rust `match` statement
if (winner) |value| {
    if (value == 1) {
        std.debug.print("Player 1 wins!\n", .{});
        game_over = true;
    } else if (value == 2) {
        std.debug.print("Player 2 wins!\n", .{});
        game_over = true;
    }
} 
```

In this case, if winner is null, we don't want to do anything, so I didn't write an `else` statement, but I'm pretty sure I could have if I wanted to do something if `winner == null`, like return an error or assign it to a default value. 

I like this! Readable!

## Error-handling

```zig
// First, we declare an error type, which is just like an enum, in Zig or in other languages I'm familiar with
const MoveError = error{
    NoOpenOfThree,
    OutOfBounds,
    AlreadyOccupied,
    Unreadable,
};
// I think this is the right way to write a function that changes an array
// https://ziglang.org/documentation/0.6.0/#Pass-by-value-Parameters
// I kind of like it, especially compared to the myriad of choices you face writing Rust!
// We stick an ! before the return type to indicate that we might also return an error. I _love_ that we don't need to specify the type of error here.
fn execute_player_move(this_move_position: usize, player_number: u8, board: [9]u8) ![9]u8 {
    var new_board = board;
    if (new_board[this_move_position] == 0) {
        if (player_number == 1) {
            new_board[this_move_position] = 1;
        } else if (player_number == 2) {
            new_board[this_move_position] = 10;
        }
    } else {
        // Build and return the error we want to return
        const err: MoveError = MoveError.AlreadyOccupied;
        return err;
    }
    return new_board;
}
```

We can also use `catch` to catch errors, a setup I've always liked. I _think_ I did this right...

```zig
var alfred_move = switch (line_we_like) {
    0 => findAnOpenOfThree(2, 4, 6, board), // any of these findAnOpenOfThree calls could return an error
    1 => findAnOpenOfThree(0, 3, 6, board),
    2 => findAnOpenOfThree(1, 4, 7, board),
    3 => findAnOpenOfThree(2, 5, 8, board),
    4 => findAnOpenOfThree(0, 4, 8, board),
    5 => findAnOpenOfThree(6, 7, 8, board),
    6 => findAnOpenOfThree(3, 4, 5, board),
    7 => findAnOpenOfThree(0, 1, 2, board),
    else => findRandomOpenMove(board), // Never returns an error
} catch {
    // alfred_move could be an error (though this will actually never happen because of how alfredFindLine works)
    // so we catch it here, returning (or "bubbling up") the error to be handled higher up.
    const err: MoveError = MoveError.NoOpenOfThree;
    return err;
};
```

There's a slightly higher level pattern you can use with `try`, but I didn't get to write a good example of that. I think it's like the `?` in Rust, which I'm a little wary of still.

## A humbling experience

Overall, Zig seems like a great little language. Probably less of a learning curve than Rust, but it seems to have taken some lessons from its successes. And it seems like it's easier to learn how to read, as there is less syntax/"vocabulary" than, say, Rust.

I'm not going to pretend to have enough knowledge of programming languages to make any conclusions beyond this. I will say that, personally, I'm a bit hesitant to write non-trivial code in a language the relies on developers having a good understanding of memory allocation and pointers _without_ the Rust compiler there as a set of training wheels. So in reality, I probably shouldn't be writing Zig, even for side projects. (Maybe Go is the right balance for me... Or just settle down with Python already, sheesh.)

<!-- However, while working on this project (and, simultaneously, a Rust project), I've come to wonder if I should be focusing my time elsewhere; And that if I want to practice writing good code, I should be using that time to get more familiar with a more "in-demand" language, like Python or even Go. I think this feeling is part of why I've wanted to move away from Rust -- no matter how many little projects I write on my own, do to my struggles to _read_ Rust, I can't quite imagine myself being hired as a Rust developer. Admittedly I've never been a good reader of others' code, even in Ruby, but I --> 

