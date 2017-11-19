---
layout: post
title: "Trying Go and Rust"
date: 2017-11-18 17:13:50 -0400
comments: true
---

This past week I got the feeling that I hadn't really given myself any programming challenges in a while. I had also been thinking about trying a statically typed, compiled language for a few weeks. I had C++ in mind, mostly because I actually wrote some in my high school AP Computer Science class, and KeePassXC, an application I use to store my passwords, is written in C++. 

However I was also aware that there were newer, ~ shinier ~ statically typed languages out there that, if I was starting basically from scratch anyway, I might as well explore. The two I decided to try were Go (or Golang) and Rust, in that order.

My basic process was to seek out each language's tutorial, play around with it, then, when I felt ready make a simple command line tic-tac-toe game.

Note that I really only learned enough of both languages to do what I wanted. Both Go and Rust have tons of features that I didn't even try to learn about. For example, I didn't even use structs in either version of tic-tac-toe, nor did I learn much about Go's [interfaces](https://tour.golang.org/methods/10) or any [goroutines](https://tour.golang.org/concurrency/1), or Rust's [enums](https://doc.rust-lang.org/book/second-edition/ch06-01-defining-an-enum.html) or [vectors](https://doc.rust-lang.org/book/second-edition/ch08-01-vectors.html) or whatever other cool stuff Rust has. So this post is far from any sort of "Go vs. Rust". It's just a casual Rubyist's initial impressions of both. (My day job is in social media.)

## Go 

From [Wikipedia](https://en.wikipedia.org/wiki/Go_(programming_language)):

> Go (often referred to as golang) is a programming language created at Google in 2009 by Robert Griesemer, Rob Pike, and Ken Thompson. It is a compiled, statically typed language in the tradition of Algol and C, with garbage collection, limited structural typing, memory safety features and CSP-style concurrent programming features added. The compiler and other language tools originally developed by Google are all free and open source.

Relative to Ruby, JavaScript, and-- as I later learned-- Rust, Go seems to be pretty close to C and C++, with a handful of useful new features like goroutines and an easy-to-use package manager (`go get <package>`).

You can [download Go for your system here](https://golang.org/dl/). Also, here's [a nice video explaining Go by Russ Cox](https://www.youtube.com/watch?v=ytEkHepK08c).

For Go, I think the first good-looking resource I found was ["A Tour of Go"](https://tour.golang.org/). It's a series of lessons and tasks, similar to what you might see with other languages. I got through the basics-- variables, flow control, methods (functions)-- with the tour, but once it got to pointers (a concept I wasn't familiar with and, to be honest, am still don't understand well) I started slowing down and feeling lost and asking myself "Why I am doing this?" 

But a day or two later I found [this great YouTube video by Derek Banas](https://www.youtube.com/watch?v=CF9S4QZuV30&feature=youtu.be). It's a bit fast-paced, so I would often pause it to copy code off the screen into little programs on my hard drive (though Go does have [an online REPL](https://play.golang.org/p/1VcPUlPk_3)).  

Once I got through the video I felt ready to at least start working on the tic-tac-toe game, which I obviously had to call "Tic Tac Go".

### Writing Tic Tac Go

Here's my [GitHub repo](https://github.com/sts10/tic-tac-go) of the game, but really all of the code is in [game.go](https://github.com/sts10/tic-tac-go/blob/master/game.go). I basically copied over ideas from my JavaScript implementation of tic-tac-toe. The command line interface goes back and forth between player 1 and player 2 (both humans as of this writing) asking for them to choose a square. Really the only interesting part of the program is the somewhat-ugly `checkForWin` function.

To check for a winner, I'm using a second array called `sums` that adds up each of the possible wins in the game of tic-tac-toe. (Fun fact: I used this idea (and drew the sketch below) back in 2013 as part of my admission test to The Flatiron School.)

![sums explained](/img/go-and-rust/map.png)

This `checkForWin` function could likely be heavily refactored. But here's what I got working:

```go
func checkForWin(b [9]int) int {
  // re-calculate sums Array
  sums := [8] int {0,0,0,0,0,0,0,0}
  for _, v := range b[0:2] { sums[7] += v }
  for _, v := range b[3:5] { sums[6] += v }
  for _, v := range b[6:8] { sums[5] += v }

  sums[0] = b[2]+b[4]+b[6]
    sums[1] = b[0]+b[3]+b[6]
    sums[2] = b[1]+b[4]+b[7]
    sums[3] = b[2]+b[5]+b[8]
    sums[4] = b[0]+b[4]+b[8]

    for _, v := range sums {
      if v == 3{
        return 1
      } else if v == 30{
        return 2
      }
    }
  return 0
}
```

Overall the process of writing my Go program went pretty smoothly! I never really was banging my head against a wall. But while writing the program I made some notes on sticking points I ran into. 

### Getting User Input

I had some trouble figuring out how to take an input from the console and then convert it to an integer. My assumption that the input would come in as a String, and that it would somehow have to be converted to a integer, was correct.

After a bunch of Googling and false starts, I found `fmt.Scan(&moveInt)` which somehow did both things I wanted-- prompt the user for input _while also_ maintaining type `int` for the variable `moveInt`. Awesome-- but, you know, weird how cryptic it is. Though to be fair I never fully understood Ruby's `scan` method either.

```go
func askForPlay() int{
  fmt.Println("Select a move")
    var moveInt int
    fmt.Scan(&moveInt)
    return moveInt
}
```

As I was working on this function, I included the line `fmt.Printf("moveInt is type: %T\n", moveInt)`, which was a helpful debug step, as it printed the type of the variable `moveInt`. Thankfully, in my final code I don't think `moveInt` is ever _not_ of type "int".

### Declaring and Re-Assigning vs. Just Re-Assigning the `player` Variable

Go has the symbol `:=`, which I think is syntactic sugar for both declaring and assigning a variable. An added benefit of using the `:=` shorthand is that you don't need to specify the variable's type (Go's compiler will infer it-- think the technical term is "type inference"). Nice!

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

Weird, right? Clearly I do define `player`, either on line 4 or line 7 depending on the conditional on line 3. The issue is that `player` is only within the scopes of those `if` statements, so when I try to pass to it the `executePlayerMove` function, it's undefined.

So I (sloppily) added `player := 0` above the if statement and ran it again. I then got this error:

```text
# command-line-arguments
./game.go:19:17: player declared and not used
./game.go:22:17: player declared and not used
```

Now the problem is that the lines in the conditionals that read `player := 1` and `player := 2` _declare_ the variable `player`, as well as re-assign it, even though it's already been declared. 

(As an aside, the Go compiler will throw an error and not run your program if you have unused variables. This is obviously much more strict than Ruby or Go. And as I later learned, even Rust will only throw a "warning" rather than a compiler error when it finds an unused variable.)

What I want to do is simply re-assign the variable inside the conditional, not declare a new variable called `player`. To do that, I changed the block to:

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

and the compiler and I were all good.

### String Interpolation Symbols Were A Little Confusing

Coming from Ruby, I'm used to pretty simple string interpolation. In Go it can be a bit more sophisticated. `fmt.Println` Go's more straight forward option-- you can use the `,` to switch from strings to variables. 

```go	
var myName string = "Sam"
var age int = 30
var pi float64 = 3.1415
var isOver40 bool = false

fmt.Println("My name is", myName, ", I'm ", age, "years old. Am I over 40?", isOver40)
fmt.Println("My name is",len(myName), "characters long")
fmt.Println("Pi is ", pi)
```

`fmt.Printf` allows more granularity-- it can read given variables in multiple ways. `%d` stands for digit, so it's appropriate for integers. `%f` is for `float64`s, and can accept a decimal point to round the `float64` to. `%T` gives the type of the variable, which proved pretty useful for debugging purposes for someone like me who is still learning types-- it's not as simple as it may seem!

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

Believe it or not it took me a bit to realize that these codes-- `%d`, `%s`, `%f`-- weren't just placeholders and actually meant something. Then I had to figure out what each of them meant. Not a huge thing, but good to know.

### Strict Typing 

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

At first I just wrote `func presentBoard(b []int) { ` figuring that'd be cool, but the Go compiler threw me an error: `cannot use board (type [9]int as type []int in argument...)`. It makes sense spelled out but it took me a bit. Risking a guess, I think `[]int` is actually a Slice rather than an Array. 

Plus this is more lax than Rust, as we'll see.

### Function signatures were a bit unintuitive 

When declaring a function, we have to specify quite a bit. First, the function's name, obviously. Next, in parenthesis is all of the inputs. Then finally, and strangely for a Rubyist, the outputs. Specifying the _types_ in not only the inputs, but the outputs, was different for me. A couple examples:

This function takes two integers (type `int`) and an array of 9 integers. It outputs one array of 9 integers.
```go
func executePlayerMove(moveInt int, player int, b [9]int) [9]int {
  // body of function goes here
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

Syntactically it also felt more like JavaScript than Ruby. For example, functions are not usually pegged to an object, so they are usually called with the pattern: `funcName(parameterVariable)` as opposed to `parameterVariable.funcName` (like Ruby or a heavily object-oriented language). However Go apparently does sometimes use this syntax like this: `day := time.Now().Weekday()`.

Things that were _unlike_ JavaScript or Ruby did throw me a bit. For example, the shortcut syntax for declaring and assigning variables, `:=`, was strange to me. In addition to the issue I discussed above, I kept accidentally typing `=:` or also defining the variables type when I didn't need to because of how the shortcut works.

That said, the workflow of actually running/compiling was not as cumbersome as I feared: I didn't have to create an executable and then run it with two or three separate commands. Instead, the workflow was very similar to Ruby and other dynamic languages: I simply ran `go run <filename>.go`. I don't remember any particularly cryptic error messages (and I got a lot of them)-- most of the time I could figure out what the compiler wanted.

In general writing tic-tac-go was a pretty smooth experience, especially compared to... RUST.

## Rust

Again, from [Wikipedia](https://en.wikipedia.org/wiki/Rust_(programming_language\)):

> Rust is a systems programming language[9] sponsored by Mozilla Research,[10] which describes it as a "safe, concurrent, practical language,"[11] supporting functional and imperative-procedural paradigms. Rust is syntactically similar to C++, but its designers intend it to provide better memory safety while maintaining performance.

> Rust is an open source programming language. Its designers have refined the language through the experiences of writing the Servo[12] web browser layout engine and the Rust compiler. A large portion of current commits to the project are from community members.[13]

Rust 1.0 [came out in May 2015](https://blog.rust-lang.org/2015/05/15/Rust-1.0.html), so this language is much newer than even Go and thus a bit more unpolished when it comes to things like documentation, number of Stack Overflow questions, third-party packages, etc.. As we'll see later on, I found a very small bug in Rust 1.21 -- though it appears to be fixed in the current nightly build.

Rust is a pretty intense language/system. As opposed to Go, which I was able to glide into pretty easily with my past programming know-how, Rust felt different. I found that just writing Rust code that compiles at all felt like an accomplishment. The upside is that when Rust code _does_ compile, you can be more confident that the code is memory safe and would work well in large systems. At least that's the idea. (I have very little understanding of concepts like "memory safety" and "garbage collection" and the threats involved in not handling those things well. Admittedly if I can't appreciate what Rust is guaranteeing me, I'm likely not an ideal Rust user. But let's press on.)

This ["Rust 101" talk by E. Dunham](https://www.youtube.com/watch?v=FMqydRampuo) is a _great_ video for learning about the language, its goals, and the community surrounding Rust. The community seems to be very creative and supportive, and I dig that they have a strong [code of conduct](https://www.rust-lang.org/en-US/conduct.html) that promotes "a friendly, safe and welcoming environment for all, regardless of level of experience, gender identity and expression, sexual orientation, disability, personal appearance, body size, race, ethnicity, age, religion, nationality, or other similar characteristic."

Rust's official documentation, referred to as ["the Book"](https://doc.rust-lang.org/stable/book/), seems well-written (the idea of a "book" reminded me a little of [\_why's poignant guide to Ruby](http://poignant.guide/book/), though it is [thankfully] not as irreverent). In hindsight, I really should have gone through it more slowly and thoroughly before attempting to make this tic-tac-toe game. In many ways my whining about how difficult Rust is at first blush (see below) isn't really fair to the authors of the Book, since I didn't read it close enough. I also thought it interesting how early Rust introduces testing-- not only is it the 11th chapter in the book, but as I understand it their `cargo` tool (which comes [installed with Rust](https://doc.rust-lang.org/book/second-edition/ch01-01-installation.html)) creates a test file by default. 

For completeness sake here is their [homepage](https://www.rust-lang.org/en-US/index.html) and [Official Rust blog](https://blog.rust-lang.org/). [Rust playground](https://play.rust-lang.org) is their REPL, allowing you to run Rust in a browser-- ironically, it worked better in Chrome (v. 62.0.32...) than Firefox 57 for me.

In addition to skimming the first few sections of the Book, I also did some exercises called [rustlings](https://github.com/carols10cents/rustlings), which were really helpful-- they felt more helpful than the Tour of Go, especially with their links to the relevant section in the Book and hints you could scroll down to. 

I also learned a bit about Rust's concept of ownership from this [Intro to Rust video](https://www.youtube.com/watch?v=agzf6ftEsLU).

Lastly I will here give a shout-out to the [#rust-beginners IRC channel](https://chat.mibbit.com/?server=irc.mozilla.org&channel=%23rust-beginners) -- At one point I was so stuck I made [a share-able playground link](https://play.rust-lang.org/?gist=40257dc021809a8c8a6750ab2f133a8a&version=stable) and hopped into the #rust-beginners IRC channel. Even though there were only a few people active on a Friday morning, I got insanely concise help I needed. 

![My IRC chat](/img/go-and-rust/irc-chat.png)

Big thanks to those users! I don't know how obvious or cryptic the sentence "arrays are indexed by usize so you just need to change the type of the function parameter from i32 to usize" is to you, but once I fixed it I now understand it as both helpful and not so far from the error message that the Rust compiler throws.


<!-- - [Rust by Example](https://rustbyexample.com/) -- Seems like some unofficial documentation, so I was a little reluctant. But to be frank there isn't much documentation out there, so I took what I could find. 
- [Subreddit](https://www.reddit.com/r/rust/)
- Derek Banas video: https://www.youtube.com/watch?v=U1EFgCNLDB8
-->



### More About Rust Before We Really Get to It Because, Wow, Rust seems Different

Rust is crazy. It's compiler is crazy strict and, I think by design, throws errors even when your code would work.

As [Dunham says](https://youtu.be/FMqydRampuo?t=4m35s), "Rust has a high priority on safety and performance, so if you've ever managed memory before, you'll know it's easy to make mistakes." 

She [also compares](https://www.youtube.com/watch?v=FMqydRampuo?t=5m38s) Rust to C and other languages in regard to garbage collection and safety: 

- C: "Just follow these rules perfectly, you're smart"
- Java, JS, Ruby, etc.: "Wait a minute, I'll take care of it"
- Rust: "I'll prove correctness at compile time."

Clearly, Rust is way "closer to the metal" than Ruby or JavaScript. But unlike C, its compiler is way more picky. It attempts to critique the _design_ of your program, not just flag the syntax errors. In my very little experience, I found Rust way pickier than Golang. 

I could almost _feel_ Rust's compiler trying to guide me to write my program the way that it wanted me to. It was almost as if my program had already been written by the compiler-- some platonic ideal of tic-tac-toe already existed up in Rust heaven-- and it was nudging me toward that ideal. Rust's compiler even gave me a "warning" (not an "error") when I used camelCased variables rather than snake_case. However the much more frustrating instances of fighting with the compiler were obviously when it threw errors and wouldn't compile-- basically it was telling me "This is bad enough that I won't even compile this for you."

[Later in Dunham's talk she said](https://www.youtube.com/watch?v=FMqydRampuo?t=23m50s) something that stuck with me as I kept running into error after error:

> The compiler wants to see your code do things right. Rust wants you to succeed. My mental image of it is that you're apprenticing under some really knowledgeable old hacker who worked on mainframes in the '70s. And they're going to tell you, "Hey, I know this works right now, but it's going to get you in trouble later."

Reader, I would come to resent this old hacker.

### Rusty Tac

In writing my Rust version of tic-tac-toe-- which I obviously had to call [Rusty Tac](https://github.com/sts10/rusty-tac)-- I ran into tons of errors. Here are some concrete examples of when the compiler forced me to change my code, likely for the better.

#### Types, References, and Borrowing

I hit a pretty big snag while writing my first Rust function-- one to draw the tic-tac-toe board. As with Go, Rust mandates that we specify the type of a function's inputs and outputs. In both Go and Rust I started with this `present_board` function, since it only has one input and no outputs. But with Rust I got tripped up. 

Here's how I declare the `board` variable in `main()`:

```rust
let mut board = [0,0,0, 0,0,0, 0,0,0];
```

This isn't so bad-- other than the `mut`, to make the values mutable, it looks a lot like Ruby or JavaScript. We're relying on the compiler to interpret not only that `board` is an array, but also that its elements are integers. It turns out that Rust has a number of different types of integers, and that in this case, it assumes integers like this are `i32`s ([a signed, 32-bit integer](https://doc.rust-lang.org/stable/book/second-edition/ch03-02-data-types.html#integer-types)). This will prove important very soon.

My problem was that I didn't know how to refer to this data type-- an array of integers (that I didn't know were specifically `i32`s)-- when writing a function that takes it as an input. 

Additionally, I needed to pass a "_reference_" to this array, since I only wanted this function to "_borrow_" the `board` array-- this explains the `&` in the signature (see: [Ownership](https://doc.rust-lang.org/stable/book/second-edition/ch04-01-what-is-ownership.html) and [References and Borrowing](https://doc.rust-lang.org/stable/book/second-edition/ch04-02-references-and-borrowing.html#references-and-borrowing)). I'm brushing over this concept of borrowing because I still don't feel like I have a good handle it, but it seems to be a foundational idea within Rust and how it helps ensure memory safety differently than, say, Go or C++.

So at first I thought the parameters would be `fn present_board(&b [int])`-- with the amperstand on the `b`, and a type of `int`. (It turns out I was wrong in two ways here.) I also wasn't sure how to refer to my `board` inside the function itself-- `b` or `&b`. 

Oddly, there doesn't seem to be a straight-forward way to check a variable's type. After some Googling, I ended up causing an intentional error by running `board[2].what_type_is_this`. This actually threw me off by giving this error: "error[E0610]: `{integer}` is a primitive type and therefore doesn't have fields". Since the error gave me `{integer}` like that, I figured that was the type (not `int` as I had tried), so I tried things like `fn present_board(&b [integer])` but no dice. If the error had said `i32 is a primitive type...`, or if I had found a more official way to check a variable's type and that had told me it was an array of `i32`s, I would have had a better chance.

I'd say this was by far my worst snag with either Go or Rust. Maybe if I had read the Rust Book online more thoroughly I would have caught it early on, but [the Array section](https://doc.rust-lang.org/book/second-edition/ch03-02-data-types.html#arrays) isn't very helpful. Eventually, after much trial and not-so-helpful error, I figured it out:

```rust
fn present_board(b: &[i32]){
    println!("---------");
    let mut i = 0;
    // inside the function, we refer to `b` not `&b`
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

(I also used Rust's [`match` statement](https://doc.rust-lang.org/1.5.0/book/match.html), which is like a `switch` statement in other languages, but more robust-- i.e. it can accept ranges, handle errors, [and more](https://mastodon.social/@seanlinsley/99028194647041640). Apparently the Rust devs like `match` over long `if`/`else if` chain.)

And here's how I called this function: `present_board(&board);`, passing a _reference_ to `board`, rather than ownership.

Interestingly, unlike Go, I did not have to tell the function how long the array was going to be.

#### The `player` variable

Here's an example of the compiler nudging me a bit more softly-- with warnings rather than errors. It's actually the same code block that I had a little bit of trouble with in Go that I mention above, so you can compare how both compilers handled my bad habits.

In my tic-tac-go game, there's a simple part where we alternate between player 1 and player 2, getting their play selection in turn. So here's what I initially wrote (which is similar to the pattern that worked in Go [see above]):

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

That line `let mut player = 0;` is problematic, the compiler told me. First, know that, by default, Rust variables are immutable(!), meaning their value can't be changed. You have to use the keyword `mut` if you want to change the value at some point later on. At first I thought this was crazy, but I can now glimpse how it's a really strong default for predictability-- that the programmer has to assert that a value will be changed means she'll likely keep non-mutable values as non-mutable, especially given that the Rust compiler will give her a warning.

The Rust compiler gives me a warning here: "warning: value assigned to `player` is never read". It's basically saying, "why did you assign `player` to 0 when you never use that value 0?". Pretty specific, right?

When I edited that line to `let mut player;`, a new warning appeared: "warning: variable does not need to be mutable". This was a little harder for me to understand, but it makes sense once I realized that, for each time `player` is declared in its scope, it's only ever assigned one value one time (either `1` or `2`, based on this conditional). Thus it never needs to _mutate_ from one value to another value, it's just not assigned when it's declared. Again, I can see how, when you're throwing variables between all sorts of functions, it's powerful to know a value will never change-- thus the warning that, hey, make it immutable if you can.

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

In any other language I would have never made `player` immutable-- likely referred to as a "constant" in other languages, usually only used for very constant values like pi. But Rust's default immutability, combined with its warnings about unnecessary immutability that I assumed I needed, helped me write a program where `player` is only set once. No function, called after this code block, can change whose turn it is, which I can see being a powerful thing to know with pretty strong certainty.

### A Bug in Stable Rust

Part of Rusty Tac (my writing of tic-tac-toe in Rust) involved a function where we have to check the board to see if it's full (meaning there had been a tie-- no one had won the game). The board is basically an array, so the task here is to sum up an array of integers (and check if that sum is 45).

My understanding is that there are a couple of approved ways to iterate through an array in Rust, including [an Iterator class](https://doc.rust-lang.org/std/iter/trait.Iterator.html) which is probably what I should have used from the get-go (see below). One is to iterate through a reference to the array (i.e. `&my_array`) with a `for` loop. The strange thing here is that the `value`s yielded to the inside of the loop are also references to the elements of the array. 

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

All good. But if you change it to the more concise: `sum += v;` you get an error: `expected usize, found &usize`. Apparently `sum = sum + v;` can add a usize to a reference to a usize, but `sum += v;` cannot. You would think that `sum = sum + v;` would be the equivalent to `sum += v;`, but that did not seem to the be the case here. 

The tl;dr here is that my guess is that this is a bug in Rust 1.21.0 (`rustc 1.21.0 (3b72af97e 2017-10-09)`). However, if you [run this code with the Nightly version](http://play.integer32.com/?gist=10851a4f3ac6f986686256a5fe29bab0&version=nightly), which the playground allows you to do, `sum += v;` does not throw that error. So my guess is that the issue has been fixed in the Nightly version.

For the record, in my confusion I did [file an issue with Clippy](https://github.com/rust-lang-nursery/rust-clippy/issues/2233), a tool that helps Rust users with hints. Clippy suggested I use `+=`.

Later, thanks to [a tip from Mastodon user seanlinsley](https://mastodon.social/@seanlinsley/99028194647041640), I learned that Rust's Iterator class [has a handy `sum` method](https://doc.rust-lang.org/std/iter/trait.Iterator.html#method.sum), which makes the overall `check_if_board_full` function much cleaner:

```rust
fn check_if_board_full(b: &[i32]) -> bool {
    let sum: i32 = b.iter().sum();
    match sum {
        45 => return true,
        _  => return false,
    }
}

```

Think that's what Rust is supposed to look like, if I may say so!

### First Impressions of Rust

Writing Rust was a really different-- and sometimes trying-- experience for me. I could see how the '70s mainframe hacker could make me a more efficient programmer. It was interesting trying to learn what it wanted, what patterns it was trying to instill in me. I swear I wrote one of the functions parameters-to-bracket without an error! which felt pretty awesome-- and hopeful. I kept wondering if, at some point relatively soon, I'd be able to write Rust without so many errors. But even Dunham, in the talk, warns that developers will hit errors, errors they won't quite understand, for years. 

More realistically, I can also see that Rust's enforced efficiency is overkill for anything I'd want to do. I don't think I'll be writing a browser from scratch any time soon. Put another way-- I can't see there being much I would want to write in Rust that I couldn't write in Go. 

I like the idea of Rust. It comes out of Mozilla, it's new, and the community seems smart and helpful with a respectful code of conduct. The compiler is strict, I see the advantage-- if I were to submit a pull request another Rust developer would know my code didn't have certain errors if it compiles. My understanding is that even a auditor of a cryptographic project could start with a leg up if it's all in safe rust. But for me, of the two, I think Go is a more... comfortable, realistic language to go forward with, if I go forward with either of them.

One thing I've avoided talking about here is what I'd want to do with either Go or Rust. I definitely understand that you can do more with Rust or Go than with Ruby or JavaScript, especially in creating desktop applications. I'd love to contribute to a desktop application like KeePassXC or something like that, more of which will hopefully be written in Go or Rust soon. And even if I don't make any contributions to Go or Rust projects, at the very least learning a little Go and Rust has expanded my mind a bit. But I can also see how throwing more time into improving my JavaScript is probably a more efficient use of my time, from a practical perspective.

## Appendix A: Hello World in Go

`touch hello.go` then...

```go
package main

import "fmt"

func main() {
    fmt.Printf("Hello, World!\n")
}
```

To run this file, you can either build an executable with `go build hello.go` and then run the executable with `./hello.go`. Or you can just "run" that program, more similar to dynamic languages, with `go run hello.go`.

## Appendix B: Hello World in Rust

### Running a Simple Rust Program with Cargo (which comes installed with Rust)

[Best to consult the Book on this](https://doc.rust-lang.org/book/second-edition/ch01-02-hello-world.html#hello-cargo), but here are the basics:

Creating a new Cargo project: `cargo new hello_cargo --bin`

Your `main` function is going to be written in `src/main.rs`.

Compiling your project and running an executable:
```
cd hello_cargo
cargo build
./target/debug/hello_cargo
```

"Build and execute src/main.rs":
```
cargo run
```



### Running a Simple Rust program with rustc rather than Cargo

If you don't want to use Cargo, here's a more bare bones approach to running Rust:

Create `hello_world/main.rs`:
```go
fn main() {
    println!("Hello, world!");
}
```

Save it, and then in the shell run:

```bash
rustc main.rs
./main
```

I used [rustup](https://rustup.rs/) to manage my versions (or channels) of Rust. 

For my fellow Rubyists, `rustc` is like `ruby`, while [rustup](https://rustup.rs/) (easy install using `curl`) is like `rvm` or `rbenv` (version manager). `cargo` doesn't really have a Ruby equivalent, but I would recommend using it over `rustc`. 

The versions-- called "channels"-- of Rust that you can manage with `rustup` are stable, beta, and nightly. I did all my work for this project with stable.

