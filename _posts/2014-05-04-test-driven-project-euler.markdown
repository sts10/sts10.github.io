+++
title= "Exploring Project Euler Problem #9"
date= "2014-05-04 12:34:22 -0400"
comments = "true"
+++

For practice with Ruby and Rspec, I've been working through some Project Euler problems. One of my favorites so far is [#9](http://projecteuler.net/problem=9), which asks us to find the one Pythagorean triplet for which `a + b + c == 1000`. Here is the [GitHub repo with my solution](https://github.com/sts10/project_euler_num_9) for you to look at while you read long, if you're into that. 

_Disclaimer: I'm no math wiz. This exercise is more about using tests well and writing good Ruby code rather than discovering an efficient algorithm to figure out which numbers to check. It's probably pretty inefficient to use nested loops from 2 to 1000 for this problem._

<!-- more -->

Having done 8 of these types of problems before, I've come to realize that you're going to be writing two general types of methods: "checkers" and "doers" (I just made this distinction up). 

"Checkers" are methods that check to see if some requirement has been fulfilled. In Ruby, much to my JavaScript friends' surprise, we can write method names that end in question marks, which is good practice for methods that return boolean values. I find that identifying and writing these "checker" methods first makes the whole problem easier. 

For Euler #9 an example of a reasonable "checker" would be this: 

```ruby
def makes_triplet?(a,b)
  c = (a**2 + b**2)**0.5
  c % 1 == 0 
end
```

Obviously we're going to need to know if a given triangle (defined by 2 of its sides), makes a Pythagorean triplet. This method calculates `c` and then checks to make sure it's a whole number using the modulus operator. 

### TTD Isn't So Bad

Does this method work? Old Sam would have put in a `binding.pry` and played around, but I wanted to be more methodical and test-driven. But I wanted to only use tests when it made sense (as per [DHH's recent blog posts on the subject](http://david.heinemeierhansson.com/2014/tdd-is-dead-long-live-testing.html)). Here was, I think, a great place where a test would make my life easier. 

So I wrote:

```ruby
describe 'can recognize triplets' do 
  it 'knows that 3 4 5 is a triplet' do 
    expect(makes_triplet?(3,4)).to be(true)
  end 

  it 'knows that 2 4 5 is not a triplet' do 
    expect(makes_triplet?(2,4)).to be(false)
  end
end
```

And both tests pass, so that's cool. 

Obviously the most important test is that we actually find the triplet. I kept that nice and simple: 

```ruby
describe "Find the triplet" do
  it 'can find the product of the three numbers that make up a pythagorean triplet and sum to 1000' do
    expect(find_the_triplet).to eq(31875000)
  end 
end 
```

### This Whole Object-Oriented Thing Is Pretty Handy

So, with my tests set up it was time to make them pass. Here is the first version of my solution: 

```ruby
def sum_one_thousand?(a,b,c)
  a + b + c == 1000
end 

def makes_triplet?(a,b)
  c = (a**2 + b**2)**0.5
  c % 1 == 0 
end

def qualifies?(a, b)
  c = (a**2 + b**2)**0.5
  makes_triplet?(a,b) && sum_one_thousand?(a, b, c)
end 

def find_the_triplet
  a = 2 
  while (a < 1000)
    b = 2
    while (b < 1000)
      if qualifies?(a,b)
        c = (a**2 + b**2)**0.5
        return (a*b*c)
      end
      b = b + 1
    end
    a = a + 1
  end 
end 
```

If we were to categorize these 4 methods into "checkers" and "doers", I'd say the first 3 are checkers and `find_the_triplet` is a doer. 

This works fine, but as you can see I need to re-calculate `c`, the third side of the triangle, three separate times. This is not DRY at all. 

Passing one variable to different methods? Sounds like I needed was a triangle object. Here's what I did for that: 

```ruby
class Triangle 
  attr_reader :product

  def initialize(a,b)
    @a = a
    @b = b
    @c = (a**2 + b**2)**0.5
    @product = @a * @b * @c
  end 

  def sum_one_thousand?
    @a + @b + @c == 1000
  end 

  def makes_triplet?
    @c % 1 == 0 
  end

  def qualifies?
    makes_triplet? && sum_one_thousand?
  end 
end
```

That's more like it. Now I can create instances of triangles, using just two of its sides, and use an instance variable to pass the value of `c` around. Furthermore, I can define semantic methods like `qualifies?` that clearly state the given qualifications required. 

My "doer" method remains outside of the Triangle class. Let's revisit it: 

```ruby
def find_the_triplet
  a = 2 
  while (a < 1000)
    b = 2
    while (b < 1000)
      @this_triangle = Triangle.new(a,b)
      if @this_triangle.qualifies?
        return @this_triangle.product
      end
      b = b + 1
    end
    a = a + 1
  end 
end 
```

Sweet. Look how semantic that is! "If this triangle qualifies, return this triangle's product" indeed!

But there's still plenty to be desired of this code. It's my natural instinct, thanks to my C++ background, to use nested `while` loops for these types of problems. How could we use something more Ruby-like?

What about `upto` instead of `while`?

```ruby
def find_the_triplet
  2.upto(1000) do |a|
    2.upto(1000) do |b|
      @this_triangle = Triangle.new(a,b)
      if @this_triangle.qualifies?
        return @this_triangle.product
      end
    end
  end 
end 
```

Better! We eliminated the `a` and `b` initializing lines and the `+ 1` lines. 

### Short Circuited

To make this even more Ruby-like we can't have the method short-circuit out with the `return @this_triangle.product` line. 

The argument against this practice is that having `return`s spread out within your methods makes it difficult to understand what they do, which I more or less buy in to at this point.

However this was an issue I ran into frequently when working on Euler problems. 

One solution would be to assign `product = @this_triangle.product` and then return `product` at the end of the method, but this isn't ideal because we'd have to go all the way through both nested loops even if we found what we were looking for early on. 

I would naturally go to the `break` keyword here, but since we're in nested loops, we'd need two breaks. 

```ruby
def find_the_triplet
  2.upto(1000) do |a|
    2.upto(1000) do |b|
      @this_triangle = Triangle.new(a,b)
      break if @this_triangle.qualifies?
    end
    break if @this_triangle.qualifies?
  end 
  @this_triangle.product
end 
```

We're no longer short-circuiting with `return` in the middle of the method, but the two `break`s are both inefficient and repetitive. Hm. Let's Google.

### Using Catch and Throw

Googling "ruby break nested loops" led me to [this Stack Overflow question](http://stackoverflow.com/questions/5286861/how-to-break-from-nested-loops-in-ruby), which suggested Ruby's catch and throw keywords. I'd never heard of `catch` or `throw` but the example was pretty close to exactly what I envisioning for a solution. 

```ruby
def find_the_triplet
  catch :found_it do
    2.upto(1000) do |a|
      2.upto(1000) do |b|
        @this_triangle = Triangle.new(a,b)
        throw :found_it if @this_triangle.qualifies?
      end
    end 
  end
  @this_triangle.product
end 
```

We have a `catch` up top and a `throw` within the nested loops. When the `throw` line is executed, Ruby breaks out of the `catch` block. It's pretty much just what we needed. 

`catch` can also return a variable that is "thrown" to it, which I learned from [this Ruby Monk post on the subject](http://rubymonk.com/learning/books/4-ruby-primer-ascent/chapters/41-exceptions/lessons/93-throw-and-catch). So our code can be a little more efficient:

```ruby
def find_the_triplet
  catch :found_it do
    2.upto(1000) do |a|
      2.upto(1000) do |b|
        @this_triangle = Triangle.new(a,b)
        throw :found_it, @this_triangle.product if @this_triangle.qualifies?
      end
    end 
  end
end 
```

Our tests pass and we're no longer short circuiting. I like this method enough that I pushed it up in a separate branch called [throw_catch](https://github.com/sts10/project_euler_num_9/tree/throw_catch), but it's still not quite right.  

(For more on catch and throw there's also [this great post from Ruby Learning](http://rubylearning.com/blog/2011/07/12/throw-catch-raise-rescue-im-so-confused/).)

### Nested Detect Loops

The `catch` and `throw` solution isn't much better semantically than short circuiting, as it's a little tricky to tell what's going to be returned. Plus, I have the feeling there must be a way to use Ruby's higher lever iterators here.  

In this case we're going to use is [detect](http://www.ruby-doc.org/core-2.1.1/Enumerable.html#method-i-detect) (aliased as `find`-- the choice is basically semantic). The trick is we'll need to nest them like so:  

```ruby
def find_the_triplet
  (2..1000).detect do |a|
    (2..1000).detect do |b|
      @this_triangle = Triangle.new(a,b)
      @this_triangle.qualifies?
    end
  end
  
  @this_triangle.product
end 
```

`detect` (and `find`) returns the first instance where the block inside of it is `true`. 

So let's start with the outer `detect`. It starts with `a = 2` and then runs through its block again and again until its block evalutes to `true` or it has reached the end of the range. Of course this outer `detect`'s block is another `detect` loop. 

No triangles with an `a` of 2 qualifies, so the inner `detect` returns `nil` 998 times. Thus, in the first iteration of the outer loop, its block is never evaluated to `true`. So it moves on to `a = 3` and so on. 

Finally, when we get to `a = 200`, then iterates through the inner `detect` until `b = 375`, the inner loop will return true, and thus the outer loop will evalute to true as well. At this point we will break out of the outer `detect` with `@this_triangle` set to the qualifying triangle. We then call `.product` on it to return `a*b*c`, as the problem requests. 




