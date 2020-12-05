---
layout: post
title: "My notes on understanding Lemire's nearly divisionless random"
date: 2020-10-10 14:46:00 -0400
comments: true
---

Last weekend, a mutual on Mastodon sent me [a really interesting blog post about something called Lemire's nearly divisionless random](https://veryseriousblog.com/posts/dissecting-lemire) written by [Colm MacCárthaigh](https://veryseriousblog.com/about). 

Apparently MacCárthaigh just wrapped up a contest "for the most readable implementations of Daniel Lemire's nearly divisionless algorithm for selecting a random number from an interval," and has awarded cash prizes to the top three.

MacCárthaigh also links to [Lemire's original blog post](https://lemire.me/blog/2019/06/06/nearly-divisionless-random-integer-generation-on-various-systems/) and his [paper](https://arxiv.org/pdf/1805.10941.pdf) from December 2018, which he defends, with caveats:

> Lemire’s accompanying paper is great and very readable, but it still takes effort and concentration to follow everything. I work on cryptography and write cryptographic code for a living and I’m not ashamed to tell you it took me about 3 readings to really get it.

Hence his contest.

> All of this makes Lemire’s algorithm a really good challenge for creating a more readable version. Ideally something that an average coder can read in one pass, understand, and agree that it’s correct. 

---

A couple things about this intrigued me. First, I had just been [working on a project](https://sts10.github.io/2020/09/30/making-a-word-list.html) that dealt with choosing random words from a long list (hence the post being sent my way). Second, anything shorthanded with a last name, followed by the word "algorithm" seems pretty cool, especially if it's relatively new (exciting!). 

And third, I loved the idea of rewarding _readable_ code and/or well-written comments. "Code readability is the most important pillar of code correctness and maintainability," MacCárthaigh writes. "When code is unreadable, it is harder to spot errors."

I like to learn new things, and I think I'm OK at explaining things once I understand them. So I tried to understand this thing. 

## Where's my code? 

This blog post is meant to go along with [this GitHub repo](https://github.com/sts10/lemire_nearly_divisionless_random), which contains all of the Rust code I wrote while trying to learn about this algorithm. The repo's README files contains an explanation of the repo's files (for example, it also contains [a copy of this post's Markdown text](https://github.com/sts10/lemire_nearly_divisionless_random/blob/main/notes.markdown)). As you read this post, you may want to have the repo open in another window.

## What we are up against

Alright so here's the C code from [Lemire's blog post](https://lemire.me/blog/2019/06/06/nearly-divisionless-random-integer-generation-on-various-systems/):

```c
uint64_t nearlydivisionless ( uint64_t s ) {
  uint64_t x = random64 () ;
  __uint128_t m = ( __uint128_t ) x * ( __uint128_t ) s;
  uint64_t l = ( uint64_t ) m;
  if (l < s) {
    uint64_t t = -s % s;
    while (l < t) {
      x = random64 () ;
      m = ( __uint128_t ) x * ( __uint128_t ) s;
      l = ( uint64_t ) m;
    }
  }
  return m >> 64;
}
```

On first blush, this made no sense to me. Like none, beyond maybe that this is a function called `nearlydivisionless` and it probably takes a 64-bit integer called `s` as an argument. Even if it was in a language I can write I think I'd have still been completely lost. Thankfully, MacCárthaigh reassures:

> The second reason I chose Lemire’s algorithm is that it is impenetrable upon first reading. There are lucky few people who are so practiced and conversant in number manipulation that they can see inside of algorithms like Neo in the matrix, but I don’t mean them. To the average reader, myself included, it’s not clear what’s going on and why.

Check!

## A pause to explain what we're trying to do here

Sometimes we need to generate random numbers. Computers can do this, but given how they work, they spit out random numbers on a range covering `2^x` numbers. For example, if you happen to want a random number from 0 to 255, computers can get one quickly because 2^8 = 256. But what if we want a random number from 1 to 100? Or 0 to 5?

One way to make this a bit more tangible is imagine if someone handed you a 6-sided die and tells you to generate a random number from 1 to 6. Easy! Roll the die and read it to them! But what if they ask you for a random number between 1 and 4? If you rolled a 5 or 6, you'd have to roll again (basically "rejecting" those results). Having to "reject" some rolls is inevitable, but once the numbers get a little bigger, there are some tricks to make the overall process go a bit faster on computers.

The problem Lemire's code address is taking one of these `2^x` random numbers and quickly adapting them to _any_ given range of numbers. 

## Our starting point, our foothold

As MacCárthaigh notes in his post, he used the contestants' answers to write his own explanation in [a wonderful and very long code comment](https://github.com/colmmacc/s2n/blob/7ad9240c8b9ade0cc3a403a732ba9f1289934abd/utils/s2n_random.c#L188). This, rather than anything written by Lemire, was my first path forward.

I read MacCárthaigh comment through at least three times, picking up the tiniest bit of new knowledge each go-through. I got frustrated when it was immediately clear to me what was happening. I walked away and did other things. But then I'd return, cursing my curiosity, my lack of bedrock computer science knowledge... The fact that I understood _just a little bit_ of it beckoned me back. With my attitude settled, I went slow and took each section of the comment in turn.

I also started throwing some Rust code in a playground, figuring I'd attempt an example of rolling a single 6-sided die as a way to learn.

## A note about Lemire and Rust

Pretty late into this little project of mine I learned that the main Rust library for generating random number, [Rand](https://github.com/rust-random/rand), apparently took at least some ideas from Lemire back in 2018 for version 0.5.0, [according to this post on the r/rust subreddit](https://www.reddit.com/r/rust/comments/8l95zk/rand_050_released/). However, the Reddit post is from May 2018 and links to [this Lemire post from 2016](https://lemire.me/blog/2016/06/27/a-fast-alternative-to-the-modulo-reduction/)), so it's unclear if the Rand crate has adapted the particular nearly divisionless random algorithm I'm trying to implement here, as opposed to an earlier idea about randomized from Lemire. 

Tellingly and embarrassingly, my ability to read Rust code isn't good enough to find where Lemire's work is used in the library, so it's difficult for me to verify this on my own. Any schooling welcome!

But sufficient to say: I'm very skeptical that I'm writing any novel or usable Rust code here. Just trying to learn something new.

## Unfair dice

In [the first section of the comment](https://github.com/colmmacc/s2n/blob/7ad9240c8b9ade0cc3a403a732ba9f1289934abd/utils/s2n_random.c#L196-L213), MacCárthaigh walks us through a basic example of what we'll ultimately doing. 

Basically this Lemire's algorithm is a fast way of using a randomly generated number to randomly pick another number from a range. 

In the comment's example, we've got a random number that's either 0, 1, 2, 3, 4, 5, 6, or 7. And what we want is "to use that to generate a number in the set 0, 1, 2."

The first thing we'll try is the modulus or remainder operator (`%`). MacCárthaigh observes: "A naive way to to this is to simply use x % 3. % is the modulus or remainder * operator and it returns the remainder left over from x/3." Why is it "naive"? We'll find out!

For my 6-sided die example, I would have used 0 through 7 for my large, initial random number (which I'm going to call a "seed" but MacCárthaigh refers to as `x`), but Rust doesn't easily support 3-bit numbers. 

The smallest bit number Rust easily supports is 8 bits (`u8`), which covers a range of 0 to 255 (2^8 = 256). So I used that.

(Going back to the tangible example, this is our computational "die" -- it has 256 sides labeled 0 to 255. Our goal is, using only this (massive) die, give a random number from 0 to 5. In Rust, I represented a roll of the 256-side die using the rand crate: `let seed_up_to_255 = rand::random::<u8>();`)

Again, we're trying to simulate the roll of a 6-sided die. For this 6-sided result, I decided to start at 0, so it's 0 through 5. 

```rust
extern crate rand;
use rand::prelude::*;

fn naive_modulus_dice_roll() {
    let seed_up_to_255 = rand::random::<u8>(); // get a random number from 0..=255
    let dice_roll = roll(seed_up_to_255);
    println!("Naive dice roll of {}", dice_roll);
}

fn roll(seed: u8) -> u8 {
    seed % 6
}
```

As MacCárthaigh [shows more clearly in his comment](https://github.com/colmmacc/s2n/blob/7ad9240c8b9ade0cc3a403a732ba9f1289934abd/utils/s2n_random.c#L205-L213), the problem comes at the end (or the higher end of our potential seed values), when our rotation of 0, 1, 2 abruptly ends at 1, rather than cleanly ending wtih a 2. 

I explored this problem in my Rust example using `assert_eq!` statements. Remember, our seed values can range from 0 to 255. Let's see what happens for seeds of 249 and up:

```rust
    // a seed of 249 yields a dice roll of 3
    assert_eq!(roll(249), 3);
    // a seed of 251 yields a dice roll of 4 ... all good so far
    assert_eq!(roll(250), 4);
    assert_eq!(roll(251), 5);
    assert_eq!(roll(252), 0);
    assert_eq!(roll(253), 1);
    assert_eq!(roll(254), 2);
    assert_eq!(roll(255), 3);
    // But the seed _can't_ be 256 or 257 (too high for u8),
    // so these last 4 seed values that yield dice rolls of 0, 1, 2, and 3 are _extra_
    // In other words the whole process favors rolls of 0 to 3 at the expense of results 4 and 5.
```

Basically, since 256 isn't a multiple of 6, we're going to roll 0, 1, 2, and 3 a little more often 4 and 5. And that's unfair. So how do we fix this?

## Rejection method 

Now we're on to what I'm called [the second section of MacCárthaigh's code comment, which is about rejection sampling](https://github.com/colmmacc/s2n/blob/7ad9240c8b9ade0cc3a403a732ba9f1289934abd/utils/s2n_random.c#L215-L234). 

Basically, one way to make this unfair die a fair die is to reject seeds of 252, 253, 254, and 255. That way, 0, 1, 2, 3, 4, and 5 all have an equal chance of being returned.

```rust
fn traditional_rejection_method() -> u8 {
    // One solution to this problem is to call a "do over" if the seed
    // is 252, 253, 254, or 255

    // We could hard-code something like
    // while seed < 252

    // but let's write a formula to find the 252 number, given the maximum
    // of the random number seed and the length of the range of random
    // number we actually want:
    let ceiling = 255 - (255 % 6); // is 252
    assert_eq!(ceiling, 252);

    // Now we can do ...
    loop {
        let seed = rand::random::<u8>(); // get a random number from 0..=255
        if seed < ceiling {
            // Got a good seed, so we'll make it a dice roll and return it
            return seed % 6;
        } else {
            // Got a bad seed (too high)!
            // Return to the top of this loop to get a new seed
            continue;
        }
    }
}
```

This solves our fairness problem! But it isn't very efficient. As MacCárthaigh notes: 

> This algorithm works correctly but is expensive. There's at least two % operations per call and maybe more, and those operations are among the slowest a CPU can be asked to perform.

So where's the magic sauce?!

## An important note in the code comment

This next section of the comment did NOT make sense to me at first and it's still a bit shakey (I might have gotten a pad and pen at this point), but it's definitely important from later. I'll paste it here so you stop and read it at least once or twice (remember, MacCárthaigh's `x` is what I've been calling "seed").

```text
With our code, we checked if x was between 0 and 5, because that's
easiest, but any contiguous window of 6 numbers would have done.
For example:

 x =         0  1  2  3  4  5  6  7
             +--+--+--+--+--+--+--+
                \_____/  \_____/
 x % 3 =        1  2  0  1  2  0

 x =         0  1  2  3  4  5  6  7
             +--+--+--+--+--+--+--+
                   \_____/  \_____/
 x % 3 =           2  0  1  2  0  1

There's a general principle at play here. Any contiguous range of
(n * s) numbers will contain exactly n values where x % s is 0, n values
where x % s is 1, and so on, up to n values where x % s is (s - 1).
This is important later, so really convince yourself of this.
```

In his example, x is what I'm calling the seed, s is 3 (for me it's 6 for sides of the die). So filling those in, we get: 

> Any contiguous range of (n * 3) numbers will contain exactly n values where [the seed] % 3 is 0, n values where [the seed] % 3 is 1, and so on, up to n values where [the seed] % 3 is (3 - 1).

In MacCárthaigh's ASCII drawing, the n value is 2. So in any range of 6 numbers (like 1 through 6 or 2 through 7), there will be exactly 2 values where `seed % 3` is 0, 2 values where `seed % 3`, and 2 values where `seed % 3` is 2. It goes up to and stops at 2 because that's (s -1) which is 3 - 1 in our case.

Sort of get it? 

## Using a floor rather than a ceiling

As a test of the above maxim, let's work out how we could use a "floor" rather than a "ceiling" if we wanted. (This will be helpful later!)
 
For our 6-sided-die example, that means that instead of rejecting seeds of 252, 253, 254, and 255; we could instead reject seeds of 0, 1, 2, and 3 to get a fair function.

To calculate that `3` to define floor, let's do `let floor = 255 % 6`. 

So all together it'd look like: 

```rust
fn traditional_rejection_method_using_floor() -> u8 {
    // Another solution to this problem is to call a "do over" if the seed is too low, in this case 0, 1, 2 or 3
    let floor = 255 % 6;
    assert_eq!(floor, 3);
    // Now we can do ...
    loop {
        let seed = rand::random::<u8>(); // get a random number from 0..=255
        // compare this seed to our floor
        if seed > floor {
            // Got a good seed, so we'll make it a dice roll and return it
            return seed % 6;
        } else {
            // Got a bad seed (too LOW)!
            // Return to the top of this loop to get a new seed
            continue;
        }
    }
}
```

You can test this function for equal distribution [with this rust Playground](https://play.rust-lang.org/?version=stable&mode=debug&edition=2018&gist=c2863ec2f3859fed16cb4a8e2855e17d).

(Note: I'm not completely sure if this is the correct way to calculate `floor` for all possible dice...)

## Our first attempt at Lemire's algorithm

Alright, at this point MacCárthaigh deems us ready for the new stuff. In [the next section](https://github.com/colmmacc/s2n/blob/7ad9240c8b9ade0cc3a403a732ba9f1289934abd/utils/s2n_random.c#L259-L311) he introduces Lemire's algorithm, but he starts us off with an **unfair** version of it. It's unfair in a way that's similar to our first dice implementation, but a little different. 

For one thing, this is the first time we meet the new variable `m`, which is set to `seed * s`. This is a crucial aspect of the algorithm, but I'm not sure how to explain it conceptually yet, so I urge you to read MacCárthaigh's comment. 

Anyway, here's the Rust I wrote at this point.

```rust
fn lemire_unfair() {
    let seed = rand::random::<u8>(); // get a random number from 0..=255

    // for sides of our die, we're going to use the variable s
    let s = 6;

    // Kind of blindly trusting the explanation of Lemire's algorithm,
    // we're going to calculate a variable named m like this:
    let m: usize = seed as usize * s; // m is a random multiple of 6 between 0 and 1,530

    // m is a random number, with values that are multiples of 6:
    // 0, 6, 12, 18, 24, 30, etc. up to 1,530

    // Note that we can easily get a dice roll (though not a fair one) from m by dividing it by 256
    let example_roll = m / 256;

    // But this method still unfair in a similar way that our initial roll function is
    // unfair.
    
    // For seeds from 0 to 42 (43 seed values), we get a dice roll of 0
    assert_eq!((42 * 6) / 256, 0);
    // For seeds from 43 to 85 (43 seed values), we get a dice roll of 1
    assert_eq!((43 * 6) / 256, 1); 
    // but only due to rounding. If we use floats we see the messier truth:
    assert_eq!((43.0 * 6.0) / 256.0, 1.0078125); 

    // We get a dice roll integer value of 1 for seeds up to and including
    // 85
    assert_eq!((85 * 6) / 256, 1);
    // though we're now very close to 2
    assert_eq!((85.0 * 6.0) / 256.0, 1.9921875);

    // For seeds from 86 to 127 (42 seed values), we get a dice roll of 2
    assert_eq!((86 * 6) / 256, 2);
    assert_eq!((127 * 6) / 256, 2);
    // For seeds from 128 to 170 (43), we get a dice roll of 3
    assert_eq!((128 * 6) / 256, 3);
    assert_eq!((170 * 6) / 256, 3);
    // For seeds from 171 to 213 (43), we get a dice roll of 4
    assert_eq!((171 * 6) / 256, 4);
    assert_eq!((213 * 6) / 256, 4);
    // For seeds from 214 to 255 (42), we get a dice roll of 5
    assert_eq!((214 * 6) / 256, 5);
    assert_eq!((255 * 6) / 256, 5);

        // It over-returns 0, 1, 3 and 4, and under-returns 2 and 5
}
```

I don't _quite_ understand why this code over-returns 0, 1, 3 and 4 and under-returns 2 and 5. I'm guessing it's due to how the fractions and rounding works out? 

But we're going to push on.

<!-- ### A trick to calculating m a bit faster -->

<!-- Remember: Lemire's nearly divisionless random is all about speed. So there's a few times where he uses some computer science tricks to speed things up. 
For example, apparently thanks to the nature of u8 integers, dividing a number by 256 can also be done be using a "bit shift" to the right by 8. -->

<!-- In Rust, [a right shift is represented with >>](https://doc.rust-lang.org/book/appendix-02-operators.html), so right-shifting `m` by 8 `m >> 8`. We can pretty easily check this ourselves for all possible `u16` values by running the following: -->

<!-- ```rust -->
<!-- for possible_m in 0..=u16::MAX { -->
<!--     let traditional_method = possible_m / 256; -->
<!--     let shortcut_method = possible_m >> 8; -->
<!--     assert_eq!(traditional_method, shortcut_method); -->
<!-- } -->
<!-- ``` -->

<!-- Going forward I'll try to use `m >> 8` in code samples. --> 

<!-- This little operation is conceptually important because it'll be the very last calculation for us, the one that actually produces the 0 to 5 number that represents our dice roll. (In MacCárthaigh's example, he's using 3-bit numbers, so he uses `m >> 3`.) -->

<!-- But no matter how you calculate `m`, our current method is still unfair. --> 

## A fair Lemire's

Alright now we're getting dangerous. In [the next section](https://github.com/colmmacc/s2n/blob/7ad9240c8b9ade0cc3a403a732ba9f1289934abd/utils/s2n_random.c#L294-L338), MacCárthaigh introduces "boats" and the `l` variable. I definitely was using pen and graph paper at this point. So for better or worse I'm going to stop narrating along with the comment and more fully encourage you to read it.

But my understanding is we are basically trying to do the same thing we did before: **make an unfair algorithm fair by figuring out which seed values to reject**. 

My understanding is that we're going to do this by rejecting values that are below a floor (rather than above a ceiling). But what's strange is that we're no longer comparing the seed, straight from the random number generator, to the floor -- instead we're going to compare the floor to a new variable called `l`. Clearly this is part of what is going to make this method nearly divisionless and thus faster than our `traditional_rejection_method`. But I don't _quite_ understand it enough to give you a paragraph explanation of what `l` is (or how I might rename it to something more helpful!).

For now, I'll paste some code I wrote as I made my way to a final implementation. 

For example, at around this point I wrote an initial attempt at a fair Lemire's, using two functions: an inner function and outer function. 

```rust
fn lemire_slow(seed: u8, s: usize) -> Option<usize> {
    let rand_range_length = 256; // range of seed
    let m: usize = seed as usize * s; // Note that the maximum value of m is 255 * 6 or 1,530
    let l = m % rand_range_length; // a new variable l!
    let floor = rand_range_length % s; // for us (with s set to 6), this is 4
    if l >= floor {
        // good seed, return the dice roll
        return Some(m / 256);
    } else {
        // bad seed
        return None;
    }
}

fn roll_using_lemire_slow(dice_size: usize) -> usize {
    loop {
        let seed = rand::random::<u8>(); // get a random number from 0..=255
        match lemire_slow(seed, dice_size) {
            // if we get a result, that means we got a good seed and thus we got a roll
            Some(r) => return r,
            // got a bad seed and thus no roll. 
            // try loop again
            None => continue,
        };
    }
}
```

I like this because `lemire_slow` offers a Rust-y visualization of when we reject a seed (return None). More on this later!

## A slightly faster version

Here's what was my next iteration, which puts it all in one function. I also take advantage of the fact that if `l >= s` then we know we definitely have a good `m`. This made sense to me later: It's because we know, thanks to how modulus works, that `floor` (256 % s) is definitely lower than `s`. We take advantage of that shortcut by adding that `if l < s as u16`.

Also, since we put everything in one function, we get to do `while l < floor`, which is basically saying: "While l is below the floor, keep getting new seeds until the `l` we calculate from the seed is at or above `floor`.

```rust
fn roll_using_lemire_medium(s: u8) -> u16 {
    let seed = rand::random::<u8>(); // get a random number from 0..=255
    let rand_range_length: u16 = 256; 

    let m: u16 = seed as u16 * s as u16; 
    let mut l = m % rand_range_length; 

    if l < s as u16 {
        let floor = rand_range_length % s as u16; // always 4 for us (assuming s is 6)
        // while l is below the floor...
        while l < floor {
            // keep making new seeds
            let seed = rand::random::<u8>(); // get a random number from 0..=255
            let m: u16 = seed as u16 * s as u16; 
            // and new `l`s until we get one that's at or above the floor
            l = m % rand_range_length;
        }
    }
    // if we made it here we know we have a "good" m
    // so convert m to a dice roll result between 0 and 6 and return it
    m >> 8
}
```

Nice! 

## And finally, creating a "fast" version, using more shortcuts

At this point I endeavored to translate more of the shortcuts Lemire and MacCárthaigh use from C to Rust. 

```rust
fn roll_using_lemire_fast(s: u8) -> u16 {
    let seed = rand::random::<u8>(); // get a random number from 0..=255
    let m: u16 = seed as u16 * s as u16; // maximum value of m is 255 * s (if s == 6, then max of m is 1,530)
    let mut l: u8 = m as u8; // this is a faster alternative to let l = m % 256 (see: https://doc.rust-lang.org/rust-by-example/types/cast.html)
    if l < s {
        let floor: u8 = (u8::MAX - s + 1) % s;
        while l < floor {
            let seed = rand::random::<u8>(); // get a random number from 0..=255
            let m: u16 = seed as u16 * s as u16; // Note that the maximum value of m is 255 * 6 or 1,530
            l = m as u8;
        }
    }
    m >> 8 // supposedly faster than m / 256
}
```

### Three new shortcuts

As the name of the function implies, `roll_using_lemire_fast` is where I did my best to implement all remaining speed shortcuts described by Lemire and MacCárthaigh.

#### Calculating l with a faster equivalent to `m % 256`

First, you'll notice I replaced the apparently slow `let l = m % 256;` with `let l: u8 = m as u8;`, which is apparently another one of those math/comp sci shortcut tricks. [MacCárthaigh explains it pretty well in the comment](https://github.com/colmmacc/s2n/blob/7ad9240c8b9ade0cc3a403a732ba9f1289934abd/utils/s2n_random.c#L336-L358), where the finished code is the even more cryptic `uint3_t l = (uint3_t) m;`.

Helpfully for my Rust implementation, this same trick is explained in a comment in [the Rust by Example page on casting](https://doc.rust-lang.org/rust-by-example/types/cast.html).

#### Calculating floor with a faster equivalent to `8 % s`

I also used `let floor: u8 = (u8::MAX - s + 1) % s;` where Lemire uses `uint64_t t = -s % s;`. MacCárthaigh [explains also this shortcut in his comment](https://github.com/colmmacc/s2n/blob/7ad9240c8b9ade0cc3a403a732ba9f1289934abd/utils/s2n_random.c#L393-L423). I got the Rust implementation with help from another Mastodon friend and a little luck.

And I proved it to myself this way:

```rust
fn main() {
    for s in 1..=7 as u8 { // doesn't work for 0 but think we're OK with that
        let slow_calc = 256 % s as u16;
        let fast_calc = (u8::MAX - s + 1) % s;

        assert_eq!(slow_calc as u8, fast_calc);
    }
}
```

#### Calculating the roll result from m with a faster equivalent to `m / 256`

Apparently thanks to the nature of u8 integers, dividing a number by 256 can also be done be using a "bit shift" to the right by 8.

In Rust, [a right shift is represented with >>](https://doc.rust-lang.org/book/appendix-02-operators.html), so right-shifting `m` by 8 `m >> 8`. We can pretty easily check this ourselves for all possible `u16` values by running the following:

```rust
for possible_m in 0..=u16::MAX {
    let traditional_method = possible_m / 256;
    let shortcut_method = possible_m >> 8;
    assert_eq!(traditional_method, shortcut_method);
}
```

### Do these shortcuts matter to the Rust compiler?

While all three of these changes to the C code may speed up runtime, in Rust a Mastodon friend contends that only the second one, the one we use to calculate `floor` faster, speeds things up. The other two shortcuts are optimizations that the Rust compiler knows to do for you. 

Of course, we're still getting the "speed up" that Lemire creatively uses -- it's just that we can leave the Rust code as the more readable versions -- `m / 256` rather than the more opaque `m >> 8`.

All that said, in the nature of good fun, I'm going to leave all three "shortcuts" in the function we'll call `roll_using_lemire_fast`. We'll soon be writing a new version that emphasizes readability.

## Benchmarking

Time for the true test: Seeing if my beautifully named `roll_using_lemire_fast` function is faster than the "traditional" rejection method. 

To test it, I figured I'd benchmark it against (a) that "traditional" rejection method we described above and, more for fun, (b) [Rust's Rand library](https://github.com/rust-random/rand). (Though, as noted above, it's unclear to me if the Rand crate already incorporates which of Lemire's ideas.)

### Writing the benchmarks

First, I had to learn a little about benchmarking Rust code, something I'd never _formally_ done before. After a few search queries, I decided to use a crate called [Criterion](https://github.com/bheisler/criterion.rs).

Not gonna lie, did a lot of copy and pasting from [its Getting Started page](https://bheisler.github.io/criterion.rs/book/getting_started.html). But here's what I ended up with in `./benches/nearly_divisionless_random_benches.rs`:

```rust
extern crate rand;
use criterion::{black_box, criterion_group, criterion_main, Criterion};
use lemire::roll_using_lemire_fast;
use lemire::roll_using_traditional_rejection_method;
use rand::distributions::{Distribution, Uniform};

pub fn criterion_benchmark(c: &mut Criterion) {
    let mut group = c.benchmark_group("Roll die");
    group.bench_function("'Lemire fast'", |b| {
        b.iter(|| roll_using_lemire_fast(black_box(6)))
    });

    group.bench_function("Rand crate", |b| {
        let between = Uniform::from(0..6);
        let mut rng = rand::thread_rng();
        b.iter(|| between.sample(&mut rng));
    });

    group.bench_function("Traditional rejection method", |b| {
        b.iter(|| roll_using_traditional_rejection_method(black_box(6)))
    });
}

criterion_group!(benches, criterion_benchmark);
criterion_main!(benches);
```

Thanks to the same Mastodon friend, I used [Rand's Uniform struct](https://docs.rs/rand/0.7.3/rand/distributions/uniform/struct.Uniform.html) for the benchmark comparison, which I'm decently confident is a fair implementation for competition.

### Benchmark results

Drum (dice?) roll (`cargo bench`)...

```text
Roll die/'Lemire fast'  
    time:   [5.8400 ns 5.9288 ns 6.0354 ns]
Roll die/Rand crate     
    time:   [5.5302 ns 5.5996 ns 5.6808 ns]
Roll die/Traditional rejection method
    time:   [6.3593 ns 6.4435 ns 6.5447 ns]
```

First of all, the big proof/win here is that 'Lemire fast' beats the traditional rejection method by roughly half a nanosecond (it fluctuates up to 1.5 ns).

In subsequent benchmarks I've run, 'Lemire fast' and the Rand crate are about the same, usually within roughly 0.2 ns. This lends more evidence to the theory that somewhere on the road to version 0.7.3, Rand incorporated this math.

### Benchmarking the various shortcuts against their more traditional versions

As I did more thinking about the three shortcuts I've written about here, I decided to try to benchmark them on their own, in a separate file. I've tried to do this in `benches/shortcut_benches.rs`. 

Unfortunately, each time I run `cargo bench` for these benchmarks it seems I get a slightly different results. Sometimes the short cut methods are faster, other times the more traditionally written Rust code wins. 

One thing that is for sure is that any difference is _at most_ 30 picoseconds (0.00000000003 seconds), so we're getting pretty in the weeds here.

## What about readability? 

MacCárthaigh original challenge was to make the algorithm more _readable_. And I wouldn't say my code above is any more readable than MacCárthaigh's -- it's almost exactly the same line-by-line, just adapted to Rust.

In thinking about how I might make a more _readable_ implementation, I returned to the structure I used for my first fair (but slow) implementation of Lemire above, which was broken into two functions.

### Splitting it up for increased readability

I like two things about splitting it into two functions, an outer and an inner. First, it shows what we might call the "seed rejection" logic clearly: The outer function (`roll_using_readable_lemire`) has the only loop, in which it passes a possible seed to an inner function (`lemire_from_seed`) for _judgment_.

Having this inner function return a Rust `Option` seems like a nice choice for readability here. In Rust, an [`Option`](https://doc.rust-lang.org/std/option/index.html) can be either `Some` result or `None`, which maps nicely to "you gave me a 'good' seed, so here's the resulting roll result" or "you gave me a bad seed, so I'm not returning a roll result" (None).

And the second thing I like about this split version is that it's pretty easy for me to test, since most of the logic lives in a function that doesn't have `rand:random::<u8>()` in it (the inner one).

So I tried to take the knowledge and tricks I learned working out `roll_using_lemire_fast` and put them back into split functions. Though I only carried over one of those three computer science tricks, since we think they can be written in the more readable way and the Rust compiler will make the optimizations for us. 

Here's what I ended up with (it's in it's own module in `src/readable.rs`):

```rust
// This is the 'outer', public function of this module.
#[inline]
pub fn roll_using_readable_lemire(s: u8) -> u16 {
    loop {
        let seed = rand::random::<u8>(); // get a random number from 0..=255
        match lemire_from_seed(seed, s) {
            // if we get a an m value back, that means we had a seed that produced a "good" m
            // meaning an m we can use to generate a roll result
            Some(m) => return convert_an_m_to_a_roll_result(m),
            // If we're here, we got a bad seed and thus a bad m. No roll result
            // returned by lemire_from_seed function.
            // So let's go back to the top of the `loop`.
            None => continue,
        };
    }
}

#[inline]
fn lemire_from_seed(seed: u8, s: u8) -> Option<u16> {
    let m: u16 = seed as u16 * s as u16;
    let l: u8 = (m % 256) as u8;

    // This is a crucial shortcut where, if l is greater than s, we know we
    // definitely have a good `m`
    if l >= s {
        return Some(m);
    }
    // calculate `floor` using a shortcut for 256 % s
    let floor: u8 = two_fifty_six_modulo(s);

    if l < floor {
        // if this seed we got generates an l that is below the floor,
        // return no m
        None
    } else {
        // but if l is at or above the floor
        // return this m so it can be used to produce a roll result
        Some(m)
    }
}

// Helper functions and comp sci shortcuts

// Faster equivalent to 256 % m
// https://github.com/colmmacc/s2n/blob/7ad9240c8b9ade0cc3a403a732ba9f1289934abd/utils/s2n_random.c#L393-L423
#[inline]
fn two_fifty_six_modulo(s: u8) -> u8 {
    (u8::MAX - s + 1) % s
}

// We could use a "shortcut" here where we use m >> 8 rather than m / 256
// (see: https://github.com/colmmacc/s2n/blob/7ad9240c8b9ade0cc3a403a732ba9f1289934abd/utils/s2n_random.c#L291-L311)
// But we think the Rust compiler is smart enough to make this optimization for us
// I still like this long-named helper function for readability though
#[inline]
fn convert_an_m_to_a_roll_result(m: u16) -> u16 {
    m / 256
}
```

As you can hopefully see, I decided to have the inner function, `lemire_from_seed`, return Some `m` or no `m`, using Rust's `Option`. This leaves the (simple) work of converting a "good" `m` to a roll result to the outer function, which I called `roll_using_readable_lemire`. And in the interest of using explicitly named helper functions where possible, I do it with a short function called `convert_an_m_to_a_roll_result(m)`.

### Easier testing

We also gain some ease when it comes to testing. Since `lemire_from_seed` uses whatever seed you give it, you can test it for all possible seeds and see if it produces an equal distribution of roll results (see the `is_distribution_perfectly_even` test in the same `src/readable.rs` file).

### Only using useful shortcuts, and making them their own helper functions

While, thanks to the Rust compiler, I'm still taking advantage of the three shortcuts we've gone over, in this more readable version I decided to only "code-out" the one that we think you need to code-out in Rust: `(u8::MAX - s + 1) % s` as a replacement for `256 % m`. 

I made another helper function called `convert_an_m_to_a_roll_result` purely to help readability. Again, isolating these two functions makes them easier to test.

I think it came out OK! 

Delightfully, in the handful of benchmarks I've run so far, `roll_using_readable_lemire` runs just as fast (if not faster?!) than `roll_using_lemire_fast` (roughly 5.8 ns for both). This shows that breaking the process into 4 functions doesn't slow Rust down (which makes sense), and it also shows that two of those shortcuts we forwent in the readable version aren't all that important for speed in Rust.

## So do I understand Lemire's nearly divisionless random now?

Honestly, I'd say no. I mean, a lot more than I did when I started. But as I write this I still don't feel like I could explain it to, say, a developer. But it's a process! (I think it would help to read Lemire's writing more.) But maybe some of this will help give others a small foothold on their path to understanding!

## Further work to do

First, I probably need to double-check everything. Adding more tests of all the functions in `src/lib.rs` would be nice. For example, I'd like to figure out how to write a test to confirm that `roll_using_lemire_fast` is fair (currently all the tests only check the readable version). Maybe a Chi-squared test?

Next, I need to better understand how the `l` variable works. I feel like I'm close but not quite there right now! Maybe I could rename it to something more "readable". 

And obviously my function(s) can only generate random numbers over a max range of 256. Lemire's original example code takes a 64-bit integer for its `s`, which makes the function much more practical and versatile. I can't tell if this move would be trivial or devastatingly difficult!

## Appendix: More sample code

Here is that first Lemire implementation that I split into two functions, as well as my original test to make sure it produces an even distributions of results:

```rust
fn roll_using_lemire_slow(dice_size: usize) -> usize {
    loop {
        let seed = rand::random::<u8>(); // get a random number from 0..=255
        match lemire_slow(seed, dice_size) {
            Some(r) => return r,
            None => continue,
        };
    }
}

fn lemire_slow(seed: u8, s: usize) -> Option<usize> {
    let rand_range_length = 256;
    let m: usize = seed as usize * s; // Note that the maximum value of m is 255 * 6 or 1,530
    let l = m % rand_range_length;
    if l >= (rand_range_length % s) {
        return Some(m >> 8);
    } else {
        None
    }
}
```

We can test this `lemire_slow` function for equal distribution with the following:

```rust
#[cfg(test)]
mod tests {
    use super::*;
    use std::collections::HashMap;

    fn make_distribution() -> HashMap<usize, usize> {
        let mut all_results: Vec<usize> = vec![];
        let lower = 0;
        let upper = 255;
        for this_seed in lower..=upper {
            match lemire_slow(this_seed) {
                Some(result) => all_results.push(result),
                None => continue,
            }
        }

        let mut counts_hashmap: HashMap<usize, usize> = HashMap::new();
        for result in all_results {
            counts_hashmap
                .entry(result)
                .and_modify(|count| *count += 1)
                .or_insert(1);
        }
        counts_hashmap
    }

    fn is_distribution_perfectly_even(counts_hashmap: HashMap<usize, usize>) -> bool {
        let count_vec: Vec<(&usize, &usize)> = counts_hashmap.iter().collect();
        let first_count = count_vec[0].1;
        for result in &count_vec {
            if result.1 != first_count {
                println!("Returning false\n{:?}", count_vec);
                return false;
            }
        }
        println!("Returning true\n{:?}", count_vec);
        true
    }

    #[test]
    fn even_distribution() {
        assert!(is_distribution_perfectly_even(make_distribution()));
    }
}
```
