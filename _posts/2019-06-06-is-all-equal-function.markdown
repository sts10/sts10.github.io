---
layout: post
title: "Determining if a Rust Vector has all equal elements"
date: 2019-06-06 18:11:00 -0400
comments: true
---

Earlier today, I [tooted out a Rust question](https://octodon.social/@schlink/102226540877408178): How would you write a function to determine if a Vector of integers are all the same, or not. 

```rust
fn main() {
    let all_eq = vec![2,2,2,2];
    let not_eq = vec![1,6,5,1,6];
    
    assert_eq!(is_all_same(all_eq), true);
    assert_eq!(is_all_same(not_eq), false);
}

fn is_all_same(vec: Vec<usize>) -> bool {
    // ???
}
```

Now, I should note that right off the bat I screwed up a bit in how I laid out the sample code. I should have had the `is_all_same` function accept a slice, rather than a Vector. That way, we could pass a slice of the Vector to multiple functions.

So the challenge should have looked like this:

```rust
fn main() {
    let all_eq = vec![2,2,2,2];
    let not_eq = vec![1,6,5,1,6];
    
    assert_eq!(is_all_same(&all_eq), true);
    assert_eq!(is_all_same(&not_eq), false);
}

fn is_all_same(arr: &[usize]) -> bool {
    // ???
}
```

Anyway, the Fediverse is wonderful and full of helpful Rust friends -- I ended up getting about a dozen solutions (none exactly the same I don't think?)

If you want to run them with appropriate tests, I also put them all in [a fresh Rust Playground, with tests](https://play.rust-lang.org/?version=nightly&mode=debug&edition=2018&gist=013aea5507471f07120c3bbefea038c5).

## Answers

```rust
// https://mastodon.technology/@bugaevc/102226605331136063
fn is_all_same1(arr: &[usize]) -> bool {
    if arr.is_empty() {
        return true;
    }
    let first = arr[0];
    arr.iter().all(|&item| item == first)
}

// https://mastodon.technology/@bugaevc/102226605331136063
fn is_all_same2(arr: &[usize]) -> bool {
    arr.iter().min() == arr.iter().max()
}
```

```rust
// https://mastodon.technology/@bugaevc/102226666945763586
fn is_all_same3(arr: &[usize]) -> bool {
    arr.windows(2).all(|w| w[0] == w[1])
}
```

```rust
// https://cybre.space/@popefucker/102226716362389708
fn is_all_same4(vec: &[usize]) -> bool {
    for c in vec.windows(2) {
        if c[0] != c[1] {
            return false;
        }
    }
    true
}
```

This one requires Rust Nightly! 

```rust
// https://weirder.earth/@Eden/102226720432099086
// requires nightly (run with: `cargo +nightly run`)
fn is_all_same5(vec: Vec<usize>) -> bool {
    match vec.as_slice() {
        [] => true,
        [_elem] => true,
        [head, second] if (head != second) => false,
        [_, rest..] => is_all_same5(rest.to_vec()),
    }
}
```

```rust
// https://asonix.dog/@asonix/102226712612355882
fn is_all_same6(vec: &Vec<usize>) -> bool {
    let mut iter = vec.iter();

    let first = iter.next();

    iter.fold(first, |acc, item| {
        acc.and_then(|stored| if stored == item { Some(stored) } else { None })
    })
    .is_some()
}
```

7 is the same as 6, but works for multiple types:

```rust
// https://asonix.dog/@asonix/102226729246023587
fn is_all_same7<T>(vec: &[T]) -> bool
where
    T: PartialEq,
{
    let mut iter = vec.iter();

    let first = iter.next();

    iter.fold(first, |acc, item| {
        acc.and_then(|stored| if stored == item { Some(stored) } else { None })
    })
    .is_some()
}
```

```rust
// https://cmpwn.com/@pounce/102226770364267196
fn is_all_same8<T: Eq>(arr: &[T]) -> bool {
    match arr.split_first() {
        Some((first, remaining)) => remaining.iter().all(|item| *item == *first),
        None => true,
    }
}
```

```rust
// https://functional.cafe/@juliobiason/1022268706680954231
fn is_all_same9(vec: Vec<usize>) -> bool {
    vec.iter()
        .fold((true, None), {
            |acc, elem| {
                if acc.1.is_some() {
                    (acc.0 && (acc.1.unwrap() == elem), Some(elem))
                } else {
                    (true, Some(elem))
                }
            }
        })
        .0
}
```

10 here improves on 9 [by removing an `unwrap()` and instead using `if let`](https://mastodon.social/@pingveno/102227440756639165):

```rust
// https://mastodon.social/@pingveno/102227440756639165
fn is_all_same10(vec: Vec<usize>) -> bool {
    vec.iter()
        .fold((true, None), {
            |acc, elem| {
                if let Some(prev) = acc.1 {
                    (acc.0 && (prev == elem), Some(elem))
                } else {
                    (true, Some(elem))
                }
            }
        })
        .0
}
```

Maybe the most concise option, which uses [windows](https://doc.rust-lang.org/std/slice/struct.Windows.html):

```rust
// https://mastodon.technology/@bugaevc/102226891784062955
fn is_all_same11<T: PartialEq>(arr: &[T]) -> bool {
    arr.windows(2).all(|w| w[0] == w[1])
}
```

```rust
// https://mastodon.social/@pingveno/102227428277791031
fn is_all_same12<T: Eq>(slice: &[T]) -> bool {
    slice
        .get(0)
        .map(|first| slice.iter().all(|x| x == first))
        .unwrap_or(true)
}
```

Again, if you want to run these answers with appropriate tests, I also put them all in [a fresh Rust Playground](https://play.rust-lang.org/?version=nightly&mode=debug&edition=2018&gist=013aea5507471f07120c3bbefea038c5).
