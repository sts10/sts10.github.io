+++
title= "Day 3: Into the Ruby Mines"
date= "2014-02-05 20:56:13 -0500"
comments = "true"
+++


The pace is starting to pick up! Today marked our first tepid steps into Ruby, introducing not only a new topic, but a new way of thinking required by the course: programming logic. 

This morning we got a quick intro to RSPEC, which is basically a way to test pieces of Ruby code. For the course, it works as an auto-grader of our work that we can run as many times as we like before turning in our code (we now submit our work via GitHub forking and pull-requesting). 

<!-- more -->

After watching Avi go through the tedious process of merging and rebasing all of our student profiles from day 1 using Git, we broke for lunch. 

Then! Avi gave an awesome lecture called “Why Programming is Awesome” and later jumped into the basics of Ruby. 

I don’t really know how to describe Avi’s philosophical lens yet. Not that he’s unclear about his passions, just that I want to understand them better first. He’s just a really solid and enthusiastic fan of programming in general, and the Ruby language specifically. Like today in the lecture’s section on what coding is, he dropped this excerpt from Plato:

>First perceiving and **bringing together** under **one idea** the **scattered particulars** so that one **makes clear** the particular thing which he **wishes to do**. Second, the **separation** of ideas into **classes**, by dividing it where the **natural joints** are, and not trying to break any part, after the manner of a bad carver…

>… I love these processes of **division** and **bringing together**… and if I think any other man is able to see things that can **naturally be collected into one** and **divided into many**, him I will follow as if he were a god.

> — Plato, _Phaedrus (Dialogue)_ (Avi’s bolding)

I majored in philosophy in college and have done some programming here and there before this course, but I never made or even considered there being such a connection between the two pursuits. In this light, both are processes of: an envisioning of something big, a breaking it down to understandable parts, and then a weaving into something new and more usable.  
 
Avi continued to explain that, to him, programming is “weird form of art where you don’t necessarily need to be starving.” It can be a weapon like Stuxnet, a method of curing disease through genetics and DNA coding, a valuable political asset for any politician, and a way of making millions of dollars through start-ups (if that’s what you want). But he said it in a way more inspiring way. 

>If you want to build a ship, don’t drum up the men to gather wood, divide the work, and give orders. Instead, teach them to yearn for the vast and endless sea.

> — Antoine de Saint-Exupery, French poet and aviator

After his talk about the vast sea (and a bit about [the origins of Ruby](http://en.wikipedia.org/wiki/Yukihiro_Matsumoto)), Avi pivoted to the basics of Ruby, the primary language we’re here to learn. 

Later we jumped into more exercises in which we wrote Ruby code and tested it against RSPEC testing written by Avi and the TAs. The most interesting was FizzBuzz, [a common programming challenge](http://c2.com/cgi/wiki?FizzBuzzTest). The solution I turned in (embedded below) isn’t anything fancy, but it meets the specs we were given by the RSPEC code, and may give you a better idea of the task. 

	def fizzbuzz(num)
		if num % 15 == 0 
			return "FizzBuzz"
		elsif num % 3 == 0 
			return "Fizz"
		elsif num % 5 == 0
			return "Buzz"
		else 
			return nil 
		end
	end


However, our small group later found a one-line function that also worked, with a few assists from the TAs:
	
	def fizzbuzz(num)
		"#{'Fizz' if (num % 3).zero?}#{'Buzz' if (num % 5).zero?}".scan(/\w+/)[0]
	end

Quick explanation: the two bits between the curly brackets { } gets evaluated as Ruby code. That first bit, 
	'Fizz' if (num % 3).zero? 
basically prints the word “Fizz” if num (the result of the number we’re testing) [modulus](http://en.wikipedia.org/wiki/Modulo_operation) 3 = 0. Likewise it prints “Buzz” right after that if it’s divisible by 5. If the number is divisible by 3 and 5, both “Fizz” and “Buzz” get printed right next to each other (no space). (The scan method at the end is a wacky thing a TA showed us to ensure the function returns nil when the number is not divisible by 3 or 5. 

_Programming Note_: This is the Octopress blog I mentioned in an earlier post on [my Tumblr](http://schlinkblog.tumblr.com/). I’ve decided to give it a try, mostly because it handles markdown well and I wrote [a custom bash function](https://gist.github.com/sts10/8837128) to launch a new post in my default [Markdown](http://daringfireball.net/projects/markdown/) editor ([Writer Pro](http://writer.pro/)) from anywhere in the terminal. We’ll see where we are in a week or two. 
