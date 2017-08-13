+++
title= "Refactoring with POODR"
date= "2014-02-23 18:45:07 -0500"
comments = "true"
+++

Over the weekend I’ve been working a new side project in order to get more practice generating dynamic webpages using ERB. I’m calling it Recall and it’s supposed to take a Ruby method as a user input from the command line and then dynamically generate a new webpage that displays every time you’ve used that method, complete with the code line, the line number, and a link to the .rb file you used it in. 

I’ve also been reading [_Practical Object Oriented Design in Ruby_](http://www.amazon.com/Practical-Object-Oriented-Design-Ruby-Addison-Wesley/dp/0321721330/ref=sr_1_1?s=books&ie=UTF8&qid=1393199505&sr=1-1&keywords=practical+object-oriented+design+in+ruby), aka “POODR”. I’m loving it so far: it’s very well-written, and I think I’m in a good place in my Ruby education to understand it well enough. It turns out I’d be able to apply some of her refactoring recommendations sooner than I would have guessed… 

<!-- more -->

Here’s a bit of the recall code. This first snippet is a method called ```parse_results``` from a class called Results that lives in lib/models. ```parse_results``` performs a grep search with an instance variable called ```query``` (yes, I’ve hard-coded my flatiron directory in for now). 

``` ruby 

  def parse_results
    results = `grep -r -n --include=*.rb '#{@query}' /Users/samschlinkert/Documents/code/flatiron`
		results.split("\n")
   	array_of_arrays = results.map do |result|
     	line_array = []
      line_array = result.split(":")
    end 
  end

```

Grep returns a long string of search results, with each result separated by a line-break, or ```/n```. Now ```results``` is an array of strings, with each string being one result. Each one of these results contains the file path, the line of code where the query was found, and (thanks to the ```-n``` flag in the grep call) the line number where grep found the query. These 3 pieces of information are separated by colons, like this:

```
/Users/samschlinkert/Documents/code/flatiron/labs/week3/playlister-cli-ruby-004/lib/models/playlistercli.rb:42:    APPROVED_COMMANDS.include?(input.downcase.to_sym)
```

So we have to iterate over each of these results and perform another split, which will produce an array of arrays. To help myself remember what’s going on, I called the array of each line a ```line_array```. We know that ```line_array[0]``` is the file path, ```line_array[1]``` is the line number, and ```line_array[2]``` is the actual code snippet. 

Thus the corresponding ERB template looks like this: 

```
		<ul>
      <% @results.each do |line_array| %>
        <li>   
          <p>In file: <a href="file://<%= line_array[0] %>"><%= line_array[0] %></a></p>
          <p><code><%= line_array[1] %> : <%= line_array[2] %></code></p>
          
        </li>
      <% end %>
    </ul> 
```

This is ugly. Super ugly. Sandi is covering her face with horror and disappointment. “Sam,” she says, not without a touch of sternness. “Let’s… let’s start with your parse_results method.”  (Note: I obviously have never met or spoken to Sandi Metz. Just having some fun here.) 

### Single Responsibility Principle

In POODR, Metz’s first, basic point is that each “thing” in your code, be it an object, method, whatever, should only be responsible for one thing. This is called the [Single Responsibility Principle](http://en.wikipedia.org/wiki/Single_responsibility_principle) and it’s part of the awesome acronym [“SOLID”](http://en.wikipedia.org/wiki/SOLID_(object-oriented_design)). So when describing what, say, a method does, we should only use a single statement, probably without any “ands” in it. 

Looking at the above parse_results method, we’d say something like “This method runs a grep search and parses out the single results from the whole string and then iterates over the resulting array to return an array of arrays.” Phew! 

Let’s at least break the grep search out into a new, clearly-name method:

```ruby 
 def get_grep_results
    return `grep -r -n --include=*.rb '#{@query}' /Users/samschlinkert/Documents/code/flatiron`
 end

 def parse_results
   results = get_grep_results.split("\n")
   array_of_arrays = results.map do |result|
      line_array = []
      line_array = result.split(":")
 
   end 
 end

```

Cool. 

So I totally could have gone one further and created an intermediary ```split_results``` method to run the ```.split(“\n”)``` line, but I didn’t. I figure that is still part of “parsing” the results. 

### Reducing Dependencies 

Now let’s think about what the new parse_results method is returning. I’m using Ruby’s implicit return to return the variably ```array_of_arrays```, where each item in the big array of all results is a line_array for each result. This kind of sucks though because whenever we use this array (in this case, in an ERB template) we have to know that ```line_array[0]``` is the file path, ```line_array[1]``` is the line number, and ```line_array[2]``` is the actual code snippet. That doesn’t seem right… 

Now, I definitely could use a hash here. Something like: 

```ruby
result = { 
	:file_path => line_array[0],
	:line_number => line_array[1], 
	:code_snippet => line_array[2]
}
```

and then use ```result[:file_path]``` to call the file path (I think that’s right?). But on page 27 of POODR I found Sandi having the same problem with her gear and wheel example. Rather than use a hash, Sandi opts (at least temporarily, before telling us we should make a separate class) for creating a [Struct](http://www.ruby-doc.org/core-2.1.0/Struct.html). 

From the Ruby docs: “A Struct is a convenient way to bundle a number of attributes together, using accessor methods, without having to write an explicit class.” Sounds good. Let’s jump to my refactored code:


### Defining the Struct

```ruby
  def get_grep_results
    return `grep -r -n -i --include=*.rb '#{@query}' /Users/samschlinkert/Documents/code/flatiron`
  end

  Result = Struct.new(:file_path, :line_number, :code_snippet) 

  def parse_results
    results = get_grep_results.split("\n")
  
    results.map do |result|
      line_array = []
      line_array = result.split(":")
      Result.new(line_array[0], line_array[1], line_array[2])
    end 

  end

```

Now the parse_results method returns an array of Result structs, rather than an array of arrays. Each Result struct has three attr_accessors in it: ```:file_path, :line_number, :code_snippet```. Since we can all the readers methods of these variables, the corresponding ERB is much cleaner and more intuitive: 

```erb
    <ul>
      <% @results.each do |result| %>
        <li>   
          <p>In file: <a href="file://<%= result.file_path %>"><%= result.file_path %></a></p>
          <p><code><%= result.line_number %> : <%= result.code_snippet %></code></p>
        </li>
      <% end %>
    </ul> 
```

I’m still working on Recall, so no GitHub repo link just yet. 


