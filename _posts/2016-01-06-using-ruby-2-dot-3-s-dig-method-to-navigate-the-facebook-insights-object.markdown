+++
title= "Using Ruby 2.3's dig method and safe navigation operator to navigate nested objects like the Facebook Insights object"
date= "2016-01-06 22:37:24 -0500"
comments = "true"
+++

Ruby 2.3.0 was [released on Christmas](https://www.ruby-lang.org/en/news/2015/12/25/ruby-2-3-0-released/). Woohoo! 

Actually, truth be told, since I started learning Ruby, beginning with 2.0.0-p353, I haven't found many useful new methods or tricks. But! Here is 2.3.0 with at least one new operator and one new method that I'll most likely be taking advantage of. 

Let's get to it. 

<!-- more -->

## The Dig Method

The [#dig method](http://ruby-doc.org/core-2.3.0/Hash.html#method-i-dig), which I [just learned about today](http://blog.andrebarbosa.co/di/), allows us to safely access nested data in `Hash`, `Array`, or `Struct` objects. The ruby-doc explanation is "Extracts the nested value specified by the sequence of idx objects by calling dig at each step, returning nil if any intermediate step is nil." 

[André Barbosa's post](http://blog.andrebarbosa.co/di/) has a simple example illustrating how the method works. Basically if you're looking to get a value out of nested hashes, in Ruby 2.2 and older you'd have something like:

```ruby 
name = post[:user][:name]  
```

But if you were iterating through a number of posts, and one of them did not have a `:user` defined, you'd hit an error and, without a rescue, your program would halt. 

One way to prevent against this in Ruby 2.2 and older, as Barbosa notes, is to do some conditional work:

```ruby
name = post[:user][:name] if post[:user]
# or
name = post[:user] && post[:name][:user]  
```

This is fine and good for this example, but as your hashes or arrays get more nested, this can get pretty messy. For example, when working with [the Facebook Insights API](https://developers.facebook.com/docs/graph-api/reference/v2.5/insights), I've got Ruby 2.2 code that looks like this: 

```ruby
if insights[46] && insights[46]["values"][0] && insights[46]["values"][0]["value"]
  @link_clicks = insights[46]["values"][0]["value"]["link clicks"]
end
```

As you may have guessed, when you ask Facebook for the Insights for a given page post, it returns a large array called `insights` that has an element for roughly each metric about that post (and there are many). `insights[46]`, for example, contains information about clicks on the post (when it exists!). 

Here's a look at just the first 3 elements of the Insights array for a recent CNN Facebook post (all numbers changed):

```ruby

insights = [
 {"id"=>"5550296508_10154357616641509/insights/post_story_adds_unique/lifetime",
  "name"=>"post_story_adds_unique",
  "period"=>"lifetime",
  "values"=>[{"value"=>9000}],
  "title"=>"Lifetime Talking About This (Post)",
  "description"=>"Lifetime: The number of unique people who created a story by interacting with your Page post. (Unique Users)"},
 {"id"=>"5550296508_10154357616641509/insights/post_story_adds/lifetime",
  "name"=>"post_story_adds",
  "period"=>"lifetime",
  "values"=>[{"value"=>8000}],
  "title"=>"Lifetime Post Stories",
  "description"=>"Lifetime: The number of stories generated about your Page post. (Total Count)"},
 {"id"=>"5550296508_10154357616641509/insights/post_story_adds_by_action_type_unique/lifetime",
  "name"=>"post_story_adds_by_action_type_unique",
  "period"=>"lifetime",
  "values"=>[{"value"=>{"like"=>4000, "share"=>900, "comment"=>700}}],
  "title"=>"Lifetime Talking About This (Post) by action type",
  "description"=>"Lifetime: The number of unique people who created a story about your Page post by interacting with it. (Unique Users)"}
 # many more array elements here...
]
```

As you can see, if we wanted the number of shares on this post (which I've changed to `900`), we've got some digging to do. Here's how I have it using Ruby 2.2 and older:

```ruby
shares_old_way = insights[2]["values"][0]["value"]["share"]
```

The big problem here is if, for whatever reason, _any_ of the posts I'm looking at don't have a hash inside `insights[2]["values"][0]` I'll be calling `["value"]` on `nil` and I'll get a `NoMethodError: undefined method` error and my program will be halted. A similar fate will meet my little script if `insights` doesn't have something at `[46]` or if any of the other links in the chain return a `nil`. Hence the conditional checks I outlined above. 

However with the `dig` method, I can use this: 

```ruby
shares_using_dig = insights.dig(2, "values", 0, "value", "share")
```

Using `dig`, if any of links in the chain return `nil`, the dig call returns nil rather than erroring out. In this case, it's pretty good to get `shares` set to `nil` if a given post doesn't have shares for whatever reason. I could run something like `shares = 0 if !shares` afterward to set `shares` to 0 if none were detected, but that's probably not necessary.  

## The Safe Navigation Operator

As with the #dig method, I learned about the safe navigation operator (a.k.a. the lonely operator) from [a blog post](http://aaronlasseigne.com/2016/01/04/rubys-new-safe-navigation-not-equal-operator/) that was posted to [the Ruby subreddit](https://www.reddit.com/r/ruby). (Matz also mentions it in [an interview on the Heroku blog](https://blog.heroku.com/archives/2015/12/25/ruby-2-3-0-on-heroku-with-matz).)

Similarly to the #dig method, the safe navigation operator `.&` makes it safer to string multiple methods together. Here's the example [Lasseigne gives](http://aaronlasseigne.com/2016/01/04/rubys-new-safe-navigation-not-equal-operator/):

Say you have this array:
```ruby
some_array = [2,3,4]
```
We could check that the first element is positive by running: 
```ruby
some_array.first.positive?
# => true
```

(Lasseigne notes that the `positive?` method is also new in Ruby 2.3.0)

But similarly to our hash navigation problem earlier, if the array we're checking is empty we'll get a `NoMethodError`: 

```ruby
[].first.positive?
# => NoMethodError: undefined method `positive?' for nil:NilClass
```

Again, there's a conditional fix here: `[].first.positive? if [].first`, but now we have the handy safe navigation operator! 

```ruby
some_array.first&.positive?
```

As Lasseigne writes, "If `first` returns `nil` then the entire expression returns `nil`. If not then we'll continue down the method chain and call `positive?`."

Lasseigne concludes his post by discussing whether this new safe navigation operator is more or less DRY than the previous alternative(s). I think it's a worthwhile question, and I'm honestly not sure it will be in all cases. 

Anyway, navigate on with confidence! 

![Captain Ron would use #dig](http://stream1.gifsoup.com/view2/3214548/captain-ron-o.gif)
