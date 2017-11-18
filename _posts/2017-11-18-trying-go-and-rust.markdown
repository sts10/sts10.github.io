---
layout: post
title: "Trying Go and Rust"
date: 2017-08-16 21:13:50 -0400
comments: true
---

This past week I got the feeling that I hadn't really given myself any programming challenges in a while. I had also been thinking about trying a statically typed, compiled language for a while. I had C++ in mind, mostly because I actually wrote some of it in my high school AP Computer Science class, and KeePassXC, an application I use to store my passwords, is written in C++. 

However I was also aware that there were newer, shinier statically typed languages out there that, if I was starting basically from scratch anyway, I might as well try as well. The two I decided to try were Go (or Golang) and Rust, that order.

My basic process was to seek out each language's tutorial, play around with it, then eventually make a command line tic-tac-toe game.

## Go 

From [Wikipedia](https://en.wikipedia.org/wiki/Go_(programming_language)):

> Go (often referred to as golang) is a programming language created at Google in 2009 by Robert Griesemer, Rob Pike, and Ken Thompson. It is a compiled, statically typed language in the tradition of Algol and C, with garbage collection, limited structural typing, memory safety features and CSP-style concurrent programming features added. The compiler and other language tools originally developed by Google are all free and open source.

Relative to Ruby, JavaScript, and-- as I later learned-- Rust, Go seems to be pretty close to C and C++, with a handful of useful new features like goroutines and an easy-to-use package manager (`go get <package>`).

You can [download Go for your system here](https://golang.org/dl/). Also, here's [a nice video explaining Go by Russ Cox](https://www.youtube.com/watch?v=ytEkHepK08c).

For Go, I think the first good-looking resource I found was ["A Tour of Go"](https://tour.golang.org/). It's a series of lessons and tasks, similar to what you might see with other languages. I got through the basics-- variables, flow control, methods (functions)-- with the tour, but once it got to pointers (a concept I wasn't familiar with and, to be honest, am still don't understand well) I started slowing down and feeling lost and asking myself "Why I am doing this?" 

But a day or two later I found [this great YouTube video by Derek Banas](https://www.youtube.com/watch?v=CF9S4QZuV30&feature=youtu.be). It's a bit fast-paced, so I would often pause it to copy code off the screen into little programs on my hard drive (though Go does have [an online REPL](https://play.golang.org/p/1VcPUlPk_3)).  

Once I got through the video I felt ready to at least start working on the tic-tac-toe game, which I obviously had to call "Tic Tac Go".

### Writing Tic Tac Go

Here's my [GitHub repo](https://github.com/sts10/tic-tac-go) of the game, but really all of the code is in [game.go](https://github.com/sts10/tic-tac-go/blob/master/game.go). In general I basically copied over ideas from my JavaScript implementation of tic-tac-toe. The command line interface goes back and forth between player 1 and player 2 (both humans as of this writing) asking for them to choose a square. Really the only interesting part of the program is somewhat-ugly `checkForWin` function.

To check for a winner, I'm using a second array called `sums` that adds up each of the possible wins in the game of tic-tac-toe. (Fun fact: I used this idea (and drew the sketch below) back in 2013 as part of my admission test to The Flatiron School.)

![sums explained](img/map.png)

While writing the program I made some notes on sticking points I ran into. In general the Go program went pretty smoothly!

### Issue #1: Getting User Input

I had some trouble taking an input from the console and then converting it to an integer. My assumption that the input would come in as a String, and that it would somehow have to converted to a integer, was correct.

After a bunch of Googling and false starts, I found `fmt.Scan(&moveInt)` which somehow did both things I wanted-- prompt the user for input _while also_ maintaining type `int` for the variable `moveInt`. Awesome-- but, you know, weird how cryptic it is. Though to be fair I never fully understood Ruby's `scan` method either.

```go
func askForPlay() int{
  fmt.Println("Select a move")
    var moveInt int
    fmt.Scan(&moveInt)
    return moveInt
}
```

As I was working on this function, I include the line `fmt.Printf("moveInt is type: %T\n", moveInt)`, which was a helpful debug step, as it printed the type of the variable `moveInt`. Thankfully, in my final code I don't think `moveInt` is ever _not_ of type "int".

### Issue #2: Declaring and Re-Assigning vs. Just Re-Assigning

Go has the symbol `:=`, which is syntactic sugar for both declaring and assigning a variable. Also, when using `:=` you don't need to specify its type (Go's compiler will infer it-- think the technical term is "type inference"). Nice!

However I got tripped up when I lazily forgot that using the colon not only assigns but declares, and thus should really only be used once per scope. Basically I was re-declaring a variable when I really meant to just re-assign it. Here's the code:

```go
for gameOver != true{
  // some other code here
  if turnNumber % 2 == 1{
    fmt.Println("Player 1's turn")
    player := 1
  } else {
    fmt.Println("Player 2's turn")
    player := 2
  }
  currentMove := askForPlay()
  board = executePlayerMove(currentMove, player, board)
  // more code here
}
```

The code above gave me the following error:

```text
# command-line-arguments
./game.go:22:44: undefined: player
```

Weird, right? Clearly I do define `player`, either on line 4 or line 7 depending on the conditional on line 3. The issue is that `player` is only within the scopes of those `if` statements, so when I tryto pass to it the `executePlayerMove` function, it's undefined.

So I (sloppily) added `player := 0` above the if statement and ran it again. I then got this error:

```text
# command-line-arguments
./game.go:19:17: player declared and not used
./game.go:22:17: player declared and not used
```

Now problem is that the lines in the conditionals that read `player := 1` and `player := 2` _declare_ the variable `player`, as well as re-assign it, even though it's already been declared. What I want to do is simply re-assign the variable. To do that, I changed the block to:

```go
for gameOver != true{
  // some code here
  player := 0
  if turnNumber % 2 == 1{
    fmt.Println("Player 1's turn")
    player = 1
  } else {
    fmt.Println("Player 2's turn")
    player = 2
  }

  currentMove := askForPlay()
  board = executePlayerMove(currentMove, player, board)
  // more code here
}
```

and the compiler and I all were all good.

### String Interpolation Symbols were Confusing

Coming from Ruby, I'm used to pretty simple string interpolation. In Go it can be a bit more sophisticated. `fmt.Println` is more straight forward-- you can use the `,` to switch from strings to variables. 

```go	
var myName string = "Sam"
var age int = 30
var pi float64 = 3.1415
var isOver40 bool = false

fmt.Println("My name is", myName, ", I'm ", age, "years old. Am I over 40?", isOver40)
fmt.Println("My name is",len(myName), "characters long")
fmt.Println("Pi is ", pi)
```

`fmt.Printf` is more sophisticated-- it can read given variables in multiple ways. `%d` stands for digit, so it's oppriate for integers. `%f` is for float64s, and can accept a number to round the float64 to. `%T` gives the type of the variable, which proves pretty useful for debugging purposes.

```go
fmt.Printf("Hello %s\n", myName)
fmt.Printf("I'm %d\n", age)
fmt.Printf("Pi is %f\n", pi)
fmt.Printf("Pi, rounded to 2 places, is %.2f\n", pi)
fmt.Printf("Am I over 40? %t\n", isOver40)

fmt.Printf("myName is type %T. ", myName)
fmt.Printf("Age is type %T. ", age)
fmt.Printf("Pi is type %T. ", pi)
fmt.Printf("isOver40 is type %T. ", isOver40)
```

[Playground of the above](https://play.golang.org/p/yf_CnG76Rw)


### Strict Typing (Though Much More Lax Than Rust)

When declaring the `presentBoard` function, I found that you need to not only specify the type of each input and any outputs, but, if one of the inputs or outputs is an array, you also need to tell the function how big the array will be. 

```go
func presentBoard(b [9]int) {
  for i, v := range b {
    if v == 0{
      fmt.Printf("%d", i)
      // more code here
    }
  }
}
```

At first I just wrote `func presentBoard(b []int) { ` figuring that'd be cool, but the Go compiler threw me an error: `cannot use board (type [9]int as type []int in argument...)`. My guess is that `[]int` is actually a Slice rather than an Array. It makes sense spelled out but it took me a bit.


### Function signatures were a bit unintuitive (compared to Rust's arrow)

When declaring a function, we have to specify quite a bit. First, the functions name, obviously. Next, in parenthesis is all of the inputs. Then finally, and strangely for a Rubyist, the outputs. Specifying the _types_ in not only the inputs, but the outputs, was different for me. A couple examples:

This function takes two integers (type `int`) and an array of 9 integers. It outputs an array of 9 integers.
```go
func executePlayerMove(moveInt int, player int, b [9]int) [9]int {

}
```

Go can also, rather uncommonly, return two variables.
```go
func greet(name string, age int) (int, int) {
    var ageInFive = age + 5
    var ageInTen = age + 10
    return ageInFive, ageInTen
}
```

### A Note on Looping in Go

I found it interesting that Go only has one type of loop: the `for` loop. I ended up using five such loops in my tic-tac-toe game, which I'll informally place into these three categories:

For example, when I wanted something like what is a `while` loop in other languages, I used `for gameOver != true{ /* code block */ }`

What my Ruby knowledge thinks of as as `each` loop is expressed in Go as `for _, value := range sums { /* code block */ }`. `range sums` tells Go we want to iterate over all of sums.

That underscore raised my eyebrow-- I always though it was a cryptic symbol when used in programming languages. It turns out the `_` is where your index would go. Since the Go compiler throws an error if you declare a variable but don't use it, we need to "kill" the index variable with `_`.

If you do want to use the index (like Ruby's `each_with_index`), you'd want `for index, value := range b { /* code block */ }` 

### First Impressions of Go

Given the languages I've played with, Go feels like JavaScript; though if I was more familiar with the C languages I assume I'd be saying Go feels most like them. 

Go does have structs, so you can get some Object-Oriented Programming in that way if you need, but I didn't use any in my game. Rather, my code is organized into different functions, as I would do if writing JavaScript.

Syntactically it also felt more like JavaScript than Ruby. For example, functions are called by `funcName(parameterVariable)` as opposed to `parameterVariable.funcName` (like Ruby or a heavily object-oriented language). However Go apparently does sometimes use this syntax like this: `day := time.Now().Weekday()`.

Things that were _unlike_ JavaScript or Ruby did throw me a bit. For example, the shortcut syntax for declaring and assigning variables, `:=`, was strange to me. In addition to the issue I discussed above, I kept accidentally typing `=:` or also defining the variables type when I didn't need to because of how the shortcut works.

That said, the workflow of actually running/compiling was not as cumbersome as I feared: I didn't have to create an executable and then run it with two or three separate commands. Instead, the workflow was very similar to Ruby and other dynamic languages: I simply ran: `go run <filename>.go`. And the errors I got-- which I got a lot of, of course-- were relative clear and easy to understand.

In general it was a pretty smooth experience, especially compared to... RUST.

## Rust

Again, from [Wikipedia](https://en.wikipedia.org/wiki/Rust_(programming_language\)):

> Rust is a systems programming language[9] sponsored by Mozilla Research,[10] which describes it as a "safe, concurrent, practical language,"[11] supporting functional and imperative-procedural paradigms. Rust is syntactically similar to C++, but its designers intend it to provide better memory safety while maintaining performance.

> Rust is an open source programming language. Its designers have refined the language through the experiences of writing the Servo[12] web browser layout engine and the Rust compiler. A large portion of current commits to the project are from community members.[13]

Rust 1.0 [came out in May 2015](https://blog.rust-lang.org/2015/05/15/Rust-1.0.html), so this language is much newer than even Go and thus a bit more unpolished when it comes to things like documentation, number of Stack Overflow questions, third-party packages, etc.. As we'll see later on, I found a very small bug in Rust 1.21 -- though it appears to be fixed in the current nightly build.

Rust is a pretty intense language/system. I found that just writing Rust code that compiles at all is pretty difficult. The upside is that when Rust code _does_ compile, you can be more confident that the code is memory safe and would work well in large systems. At least that's the idea.

This ["Rust 101" talk by E. Dunham](https://www.youtube.com/watch?v=FMqydRampuo) is a _great_ video for learning about the language, its goals, and the community surrounding Rust. The community seems to be very creative and supportive, and I dig that they have a strong [code of conduct](https://www.rust-lang.org/en-US/conduct.html) that promotes "a friendly, safe and welcoming environment for all, regardless of level of experience, gender identity and expression, sexual orientation, disability, personal appearance, body size, race, ethnicity, age, religion, nationality, or other similar characteristic."

Rust's official documentation, referred to as ["the book"](https://doc.rust-lang.org/stable/book/), is a little messy but also well-written. In hindsight, I really should have gone through it more slowly before attempting to make this tic-tac-toe game. For completeness sake here is their [homepage](https://www.rust-lang.org/en-US/index.html) and [Official Rust blog](https://blog.rust-lang.org/). [Rust playgorund](https://play.rust-lang.org) is their REPL, allowing you to run Rust in a browser-- ironically, it worked better in Chrome than Firefox 57 for me.

In addition to skimming the first few sections of the book, I also did some exercises called [rustlings](https://github.com/carols10cents/rustlings). Lastly I will here give a shout-out to the [#rust-beginners IRC channel](https://chat.mibbit.com/?server=irc.mozilla.org&channel=%23rust-beginners) -- At one point I was so stuck I made [a share-able playground link](https://play.rust-lang.org/?gist=40257dc021809a8c8a6750ab2f133a8a&version=stable) and hopped into the #rust-beginners IRC channel. Even though there were only a few people active on a Friday morning, I got insanely concise help I needed. 

![My IRC chat](img/irc-chat.png)

I also learned a bit about Rust's concept of ownership from this [Intro to Rust video](https://www.youtube.com/watch?v=agzf6ftEsLU).



<!-- - [Rust by Example](https://rustbyexample.com/) -- Seems like some unofficial documentation, so I was a little reluctant. But to be frank there isn't much documentation out there, so I took what I could find. 
- [Subreddit](https://www.reddit.com/r/rust/)
- Derek Banas video: https://www.youtube.com/watch?v=U1EFgCNLDB8
-->



### More About Rust Before We Really Get to It Because, Wow, Rust seems Different

Rust is crazy. It's compiler is crazy strict and, I'd argue, opinionated. 

As [Dunham says](https://youtu.be/FMqydRampuo?t=4m35s), "Rust has a high priority on safety and performance, so if you've ever managed memory before, you'll know it's easy to make mistakes." 

She [also compares](https://www.youtube.com/watch?v=FMqydRampuo?t=5m38s) Rust to C and other languages in regard to garbage collection and safety: 

- C: "Just follow these rules perfectly, you're smart"
- Java, JS, Ruby, etc.: "Wait a minute, I'll take care of it"
- Rust: "I'll prove correctness at compile time."

Clearly, Rust is way "closer to the metal" than Ruby or JavaScript. But unlike C, its compiler is way more picky. In my very little experience, I found Rust way pickier than Golang. 

I could almost _feel_ Rust's compiler trying to guide me to write my program the way that it wanted me to. It was almost as if my program had already been written by the compiler, and it was nudging me toward that ideal. Rust's compiler even gave me a "warning" (not an "error") when I used camelCased variables rather than snake_case. However the much more frustrating instances of this were obviously when it threw errors and wouldn't compile-- basically it was telling me "This is bad enough that I won't even compile this for you."

[Later in Dunham's talk she said](https://www.youtube.com/watch?v=FMqydRampuo?t=23m50s) something that stuck with me as I kept running into error after error:

> The compiler wants to see your code do things right. Rust wants you to succeed. My mental image of it is that you're apprenticing under some really knowledgeable old hacker who worked on mainframes in the '70s. And they're going to tell you, "Hey, I know this works right now, but it's going to get you in trouble later."

Reader, I would come to resent this old hacker.

### Rusty Tac

In writing my Rust version of tic-tac-toe-- which I called [Rusty Tac](https://github.com/sts10/rusty-tac)-- I ran into tons of errors. Here are some concrete examples of when the compiler forced me to change my code, likely for the better.

#### References and Types and Borrowing


```go
// Figuring out how pass this array was a BITCH. Errors, both intentional (board[2].what_the_fuck_type_is_this;) 
// and not, kept referring to "integer" or "Integer" rather than i32. Using "int" threw unhelpful
// error
fn present_board(b: &[i32]){
    println!("---------");
    let mut i = 0;
    while i < b.len() {
        match b[i] {
            // if empty, print the number that a user would enter to move
            // to this space
            0 => print!("{}",i),
            1 => print!("X"),
            2 => print!("O"),
            10 => print!("O"),
            _ => break,
        }
        // and now, some decorators
        if i > 0 && (i+1) % 3 == 0{
            print!("\n");
        } else{
            print!(" | ");
        }
        i = i + 1;
    }
    println!("---------");
}
```

#### The `player` variable

Here's a "soft" example of the compiler nudging me. In my tic-tac-go game, there's a simple part where we alternate between player 1 and player 2.

So here's what I initially wrote:

```rust
// for this example, let's arbitrarily set turn_number to 6
let turn_number = 6; 

let mut player = 0;
if turn_number % 2 == 1{
  player = 1;
} else {
  player = 2;
}

println!("Player {}'s turn", player);
```

That line `let mut player = 0;` is problematic, the compiler told me. First, know that, by default, Rust variables are immutable(!), meaning their value can't be changed. You have to use the keyword `mut` if you want to change the value at some point later on.

Rust compiler gives me a warning here: "warning: value assigned to `player` is never read". It's basically saying, "why did you assign `player` to 0 when you never use that value 0?".

When I edited that line to `let mut player;`, a new warning appeared: "warning: variable does not need to be mutable". This was a little harder for me to understand, but it makes sense once I realized that, for each time `player` is declared in its scope, it's only ever assigned one value one time (either `1` or `2`, based on this conditional). Thus it never needs to _mutate_ from one value to another value.

Here's what the Rust compiler and I ended up with (no errors, no warnings):

```rust
// for this example, let's arbitrarily set turn_number to 6
let turn_number = 6; 

let player;
if turn_number % 2 == 1{
  player = 1;
} else {
  player = 2;
}

println!("Player {}'s turn", player);
```


### A Bug in Stable Rust

So part of Rusty Tac (tic-tac-toe in Rust) involved a function where we have to check the board to see if it's full (meaning there had been a tie-- no one had win). The board is basically an array, so the task here is to sum up an array of integers (and check if that sum is 45).

My understanding is that there are a couple of approved ways to iterate through an array in Rust. One is to iterate through a reference to the array (i.e. `&my_array`). The strange thing here is that the `value` yielded to the inside of the loop are also references to the elements of the array. 


```rust
fn main() {
  let my_array: [usize; 8] = [2, 1, 3, 5, 3, 1, 3, 3];
  let mut sum: usize = 0;
  for v in &my_array {
    sum = sum + v;
  }
  println!("Sum is {}", sum);
}
```

All good. But if you change it to the more concise: `sum += v;` you get an error: `expected usize, found &usize`. You would think that `sum = sum + v;` would be the equivalent to `sum += v;`, but that did not seem to the be the case in this case. The tl;dr here is that this was likely a bug in Rust that has since been fixed in the latest Nightly version. If you [run this ocde with the Nightly version](http://play.integer32.com/?gist=10851a4f3ac6f986686256a5fe29bab0&version=nightly), `sum += v;` does not throw that error.

For the record, in my confusion I did [file an issue with Clippy](https://github.com/rust-lang-nursery/rust-clippy/issues/2233), a tool that helps Rust users with hints. Clippy suggested I use `+=`.

## Appendix (Rust)

### Running a Simple Rust program with rustc rather than Cargo

Create `hello_world/main.rs`:

```go
fn main() {
    println!("Hello, world!");
}
```

Save it, and then in the shell run:

```bash
rustc main.rs
./maio
```

Building and running an executable:
```
cargo build
./target/debug/hello_cargo
```

Build _OR_ run:
```
cargo run
```


[Reference](https://doc.rust-lang.org/book/second-edition/ch01-02-hello-world.html#building-and-running-a-cargo-project)

I used [rustup](https://rustup.rs/) to manage my versions (or channels) of Rust. 

For my fellow Rubyists, `rustc` is like `ruby`, while [rustup](https://rustup.rs/) (easy install using `curl`) is like `rvm` or `rbenv` (version manager). The versions-- called "channels"-- of Rust that you can manage with `rustup` are stable, beta, and nightly. I did all my work for this project with stable.

