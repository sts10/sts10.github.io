+++
title= "Ruby Golf: Finding the Perfect Method"
date= "2014-05-28 14:06:12 -0400"
comments = "true"
+++

Last night I met up with some Rubyists in Chinatown for a round of Ruby Golf. What is Ruby Golf, you ask? From [the event's](http://www.meetup.com/Ruby-Fight-Club/events/183123092/) description: 

>In sixty minutes, we'll challenge you and your team to complete 9 programming challenges. The team with the most correct answers in the fewest number of characters will be declared the winner. The team wearing the most argyle will receive an honorable mention.

Our awesome team of 4 didn't end up solving the 9 problems in the fewest characters, but I had a great time and learned a few new methods and tricks. 

<!-- more -->

Our strategy was to pair up, with one pair taking the evens and the other, my pair, taking the odds. We breezed through 1 and 3 and were feeling pretty good about ourselves, but then hit a snag at hole #5. Below is the RSpec we had to make pass:

### Hole #5

```ruby
describe ".hole5" do
  it "should return all sub-lists of the input, sorted by length then numerically" do
    expect(Golf.hole5([1,2,3,4])).to eq(
      [[1], [2], [3], [4], [1, 2], [2, 3], [3, 4], [1, 2, 3], [2, 3, 4], [1, 2, 3, 4]]
    )

    expect(Golf.hole5([4,10,15,23])).to eq(
      [[4], [10], [15], [23], [4, 10], [10, 15], [15, 23], [4, 10, 15], [10, 15, 23], [4, 10, 15, 23]]
    )
  end
end
```

At first glance, I didn't see any methods that would do the core of the work. So I went slow. 

I saw the expected returns as a series of arrays that belonged in 4 groups. The first group-- the first 4 arrays-- were just each element of the given array in their own arrays. Easy enough: 

```ruby
array.each_with_index do |num, i|
  result << [array[i]]
end
```

Note: This could have been shortened using `array.size.times do |i|` but again, I wanted to leave shortening till the end, once it passed. 

Next it wanted arrays of length 2, so I just duplicated the above loop but instead asked for a range of `[i..i+1]`:

```ruby
array.each_with_index do |num, i|
  result << array[i..i+1]
end  
```

You get the idea. So here was my first attempt that passed:

```ruby
def self.hole5(array)
  result = []

  array.each_with_index do |num, i|
    result << [array[i]]
  end

  array.each_with_index do |num, i|
    result << array[i..i+1]
  end  

  array.each_with_index do |num, i|
    result << array[i..i+2]
  end

  result << array # last it wanted the given array as is, so...

  result.uniq
end
```

Obviously this was way too long, but more embarrassingly, it only worked for arrays with a length of 4. To solve this problem I needed to wrap those `each_with_object`s up in another loop and add a new iterator where the `1` and `2` were. So, with some help from my partner Chris, we came up with: 

```ruby
def self.hole5(array)
  result = []

  array.length.times do |n|
    array.each_with_index do |num, i|
      result += [array[i..i+(n)]]
    end  
  end

  result.uniq
end
```

This was tolerable for golf, especially once we converted the `do`s and `end`s to brackets (we probably changed `.length` to `.size` to save 2 characters). But I had a feeling there must be a better way. 

Thankfully, once Daniel from the other pair took a look at it a lightbulb go off. 

### each_cons to the Rescue

Ruby, in its seemingly infinite granularity, has a method called [each_cons](http://www.ruby-doc.org/core-2.1.1/Enumerable.html#method-i-each_cons) that will definitely be useful to us in this case. Here's what it does: 

```ruby
(1..10).each_cons(3) { |subarray| p subarray }

# outputs below
[1, 2, 3]
[2, 3, 4]
[3, 4, 5]
[4, 5, 6]
[5, 6, 7]
[6, 7, 8]
[7, 8, 9]
[8, 9, 10]
```

In English, it iterates through an array, yielding a sub-array of whatever length you pass in as an argument, moving through the given array one element at a time. 

So, scrapping all of my hard work, Danny whipped this up: 

```ruby
def self.hole5(a)
  (1..a.size).map{|n| a.each_cons(n).to_a}.flatten(1)
end
```

In English: `n` is first `1`, so the `each_cons` gives us our desired `[1], [2], [3], [4]`. Then `n` is `2`, and we get `[1, 2], [2, 3], [3, 4]`. After that it was just matter of flattening the resulting array correctly. 

Thankfully I remembered that [flatten](http://ruby-doc.org/core-2.0/Array.html#method-i-flatten) can be used to only flatten "one level" via an argument of 1. Sweet. 

### Iterating Over an Array with an Iterator

We've now seen a few different ways to iterate through an array with an iterator. 

```ruby
array.each_with_index do |element, i|
  # yields both the element and the iterator
end  
```

```ruby
array.size.times do |i|
  # a bit shorter, but only yields the iterator
end
```

```ruby
(1..array.size).each do |i|
  # a little longer, and only yields the iterator, but... 
end
```

```ruby
(1..array.size).map do |i|
  # ... this pattern allows us to switch out `each` with any
  # of Ruby's other higher-level iterators.
end
```

I also saw [another technique](http://stackoverflow.com/questions/4697557/how-to-map-with-index-in-ruby) to do what's effectively a `map_with_index`:

```ruby
array.each_with_index.map do |element, i| 
  # acts like a map but we get both the element and an iterator
end
```

As of Ruby 1.9.3 you can use the [with_index](http://ruby-doc.org/core-1.9.3/Enumerator.html#method-i-with_index) method to make the above a little more semantic:

```ruby
array.map.with_index do |element, i| 
  # map with index! 
end
```

Here's a [blog post](http://alwayscoding.ca/momentos/2013/06/07/map-with-index/) on this `map.with_index` pattern. 

### One Last Trick

After the competition was over the winning team showed their answers-- it was great to see how another team approached each of the problems. One new method I learned about that would have saved us a few characters on #5 is [flat_map](http://www.ruby-doc.org/core-2.1.0/Enumerable.html#method-i-flat_map), which flattens the result of your `map` for you. 

```ruby
def self.hole5(a)
  (1..a.size).flat_map{|n| a.each_cons(n).to_a}
end
```

(OK, one last golf trick I picked up from the winning team: You can also remove the parenthesis around the parameter in the definition of the method, so `def self.hole5 a`)
