+++
title= "JavaScript Prototypes: The Basic Basics"
date= "2014-05-16 12:48:41 -0400"
comments = "true"
+++

I was always understood JavaScript as a functional programming language, but it turns out there are in fact ways to create basic objects and even "object factories" (what Rubyists know as Classes). 

To better understand how to use objects in JavaScript, I ordered two books: [_Speaking JavaScript_ by Dr. Axel Rauschmayer](http://www.amazon.com/Speaking-JavaScript-Axel-Rauschmayer/dp/1449365035/ref=sr_1_1?ie=UTF8&qid=1400259368&sr=8-1&keywords=speaking+javascript) and [_Pro JavaScript Design Patterns_ by Ross Harmes and Dustin Diaz](http://www.amazon.com/Pro-JavaScript-Design-Patterns-Object-Oriented/dp/159059908X/ref=sr_1_1?ie=UTF8&qid=1400259393&sr=8-1&keywords=pro+javascript+design+patterns). (I know the more canonical choice would have been _JavaScript: The Good Parts_, but a Flatiron T.A. pointed me to _Speaking_ as a more up-to-date alternative.)

<!-- more -->

I went in to this little adventure assuming JavaScript would be much less intuitive than Ruby, and that I'd mostly be learning an entirely different system than Ruby thanks to its many quirks. But now that I'm about halfway through _Speaking_ I'm realizing JavaScript isn't so messy! In fact, given how much it can do, it's not so bad. 

Here's Rauschmayer on the question of whether JavaScript is elegant:

>Yes and no. I've written fair amounts of code in several programming languages from different paradigms. Therefore, I'm well aware that JavaScript isn't the pinnacle of elegance. However, it is a very flexible language has a reasonably elegant core, and enables you to use a mixture of object-oriented programming and functional programming. 

In this blog post I'll explore the very basics of object-oriented JavaScript, since that aspect of the language is new to me. There may be some mistakes-- I'm new to this pattern (if you see anything incorrect or weird please [shoot me a note!](http://samschlinkert.com/#contact)). All 3 code examples are [up on GitHub](https://github.com/sts10/animal_prototype).

I'm going to lay out a basic Animal prototype (like a Ruby class) with variables and methods, then create two instances of it. This "prototype" (lowercase 'p') pattern seems to be just one way or _pattern_ of creating an "object factory" in JavaScript. Maybe there's a better or more Ruby-like alternative, but this way seems to work and makes sense to me so let's run with it at least for today. 

### Creating a Prototype in JavaScript

This sample code is broken into two parts: the prototype's definition and the instantiation of the prototype and manipulation of those instances.

```javascript
var Animal = function (name, type, sound) {  
  this.name = name;
  this.type = type;
  this.sound = sound;
};

Animal.prototype = {
  makeNoise: function () {
    return this.sound + " is the sound that " + this.name + " makes!";
  },
  getWeightAtAge: function(age) {
    if (this.type === "dog"){
      return 5 * age;
    } else if (this.type == "fish"){
      return 2 * age;
    } else {
      return age;
    }
  },
  toString: function () {
    return this.name + " is a " + this.type;
  }
  
}
```

OK, let's start at the top. I define a new `var` called `Animal` and set it equal to function that has no name and takes three parameters `(name, type, sound)`. 

### Aside About Creating JavaScript Functions in General

This is just one of three ways to create a function in JavaScript-- it's called a "function expression". (Notice the semi-colon after the closing curly-brace.)

Alternatively, we could create this Animal function via a function declaration, which would look like: 

```javascript
function Animal (name, type, sound) { 
  this.name = name;
  this.type = type;
  this.sound = sound;
}
```

There are advantages to both, but Rauschmayer lists two advantages of declarations: they are "hoisted" to the top of the scope (so you can call a function before declaring it if you're in the same scope) and they by definition are named. 

But we're going to go with the function expression for now. 

### Back to our Prototype Definition

This `Animal` function will serve a specific purpose for us. It's basically the initializing method of our prototype. New instances of `Animal` will take in 3 arguments, and then we set them equal to `this.name`, `this.type`, and `this.sound` so that we can use them later. 

Here is what, in my mind, would be the Ruby equivalent: 

```ruby
def initialize(name, type, sound)
  self.name = name
  self.type = type
  self.sound = sound
end 
```

The only big difference here, besides the use of `this` rather than `self`, is that in JavaScript this initializing function goes outside of the prototype definition, as opposed to Ruby where it goes within the Class definition. Kind of strange/counter-intuitive, but not so crazy. 

Next we open up the Animal prototype and define three methods (functions that belong to instances of the object). 

```javascript
Animal.prototype = {
  makeNoise: function () {
    return this.sound + " is the sound that " + this.name + " makes!";
  },
  getWeightAtAge: function(age) {
    if (this.type === "dog"){
      return 5 * age;
    } else if (this.type == "fish"){
      return 2 * age;
    } else {
      return age;
    }
  },
  toString: function () {
    return this.name + " is a " + this.type;
  }
  
}
```

The above pattern is very similar to the pattern of defining an "object literal". An object literal is a basic object-- it's not a factory for objects, it's just one, single object. 

### What is a JavaScript Object, Anyway?

Let's go back to the basics here. From Rauschmayer, chapter 17:

>Roughly, all objects in JavaScript are maps (dictionaries) from strings to values. A (key, value) entry in an object is called a _property_. The key of a property is always a text string. The value of a property can be any JavaScript value, including a function. _Methods_ are properties whose values are functions.

So basically they're kind of like Ruby hashes that can hold functions as values. Oh and JavaScript doesn't have the equivalent of Ruby symbols, so we roll with strings as keys. 

### Quick Example of an Object Literal in JavaScript

Again, an object literal seems to be the simplest type of JavaScript object, so let's take a look at one. Remember, it's not a factory for object, it's just one, single object.

```javascript
var sam = {
  name: "Sam",

  introduce: function(){
    return "Hi, my name is " + this.name;
  }
}
```

`introduce` is a method on the object `sam`. So when we call `print(sam.introduce());` we get `Hi, my name is Sam`. (Note: we can also call `sam.name` and even reset `sam.name` by running `sam.name = "Theodore"` outside of the `var sam` definition). This shows a key difference between JavaScript and Ruby-- we don't need to specify if a variable should be readable or writable via `attr_reader`, `attr_writer`, or `attr_accessor`. `sam.name` just works. 

Of course we can not instantiate new instances of `sam`-- it's just a single object. For that "factory" feature, let's return to the prototype. 

Now that we've (1) taken in three variables on initialization and (2) declared 3 methods (instance methods in Ruby-speak), we're ready to make some Animal instances and see what they can do. 

```javascript
var ziggy = new Animal("Ziggy", "dog", "Woof!");
var nemo = new Animal("Nemo", "fish", "bubble!");

print(ziggy.name + " is a " + ziggy.type + " and makes the sound " + ziggy.sound);

print(ziggy.makeNoise());
print(nemo.makeNoise());

print(nemo.toString());

print("When " + ziggy.name + " is 7 she'll be " + ziggy.getWeightAtAge(7) + " pounds!");

print("Setting Nemo's type to shark...");
nemo.type = "shark";
print("Now " + nemo.name + " is a " + nemo.type);
```

### A Quick Note on How to Actually Run This Code

As you can see I'm using the `print` function to display information to the screen. That's because I'm using the [V8 JavaScript engine](https://github.com/v8/v8) via my command line to run these JavaScript programs. to do that I just run `v8 app.js` from the Terminal. I wish I remembered how I installed it or if I even needed to install it on my Mac, but here is what looks like some [good installation instructions from Google](https://code.google.com/p/v8/wiki/UsingGit). 

### Back to the Animals

Instantiating a new `Animal` is pretty simple: `var ziggy = new Animal("Ziggy", "dog", "Woof!");` (Ziggy is the name of our first family dog). I go on to test methods like `ziggy.sound` and `nemo.toString()` and they work just as expected. 

Methods can take arguments if they accept parameters, as we can see by the call to `getWeightAtAge(7)`. And we can even write over variables with `nemo.type = "shark";`.

### All Together, With Its Ruby Equivalent 

Now let's look at the full code in JavaScript:

```javascript
var Animal = function (name, type, sound) {  // this could also be `function Animal (name, type, sound) { ` 
  this.name = name;
  this.type = type;
  this.sound = sound;
};

Animal.prototype = {
  makeNoise: function () {
    return this.sound + " is the sound that " + this.name + " makes!";
  },
  getWeightAtAge: function(age) {
    if (this.type === "dog"){
      return 5 * age;
    } else if (this.type == "fish"){
      return 2 * age;
    } else {
      return age;
    }
  },
  toString: function () {
    return this.name + " is a " + this.type;
  }
  
}


var ziggy = new Animal("Ziggy", "dog", "Woof!");
var nemo = new Animal("Nemo", "fish", "bubble!");

print(ziggy.name + " is a " + ziggy.type + " and makes the sound " + ziggy.sound);

print(ziggy.makeNoise());
print(nemo.makeNoise());

print(nemo.toString());

print("When " + ziggy.name + " is 7 she'll be " + ziggy.getWeightAtAge(7) + " pounds!");

print("Setting Nemo's type to shark...");
nemo.type = "shark";
print("Now " + nemo.name + " is a " + nemo.type);

```

And here's how I would do the same thing in Ruby:

```ruby
class Animal 
  attr_accessor :name, :type, :sound

  def initialize(name, type, sound)
    self.name = name
    self.type = type
    self.sound = sound
  end 

  def make_noise
    "#{self.sound} is the sound that #{self.name} makes."
  end

  def get_weight_at_age(age)
    if self.type == "dog"
      5 * age
    elsif self.type == "fish"
      2 * age
    else 
      age
    end
  end

  def to_s
    "#{self.name} is a #{self.type}"
  end 

end 

ziggy = Animal.new("Ziggy", "dog", "Woof!")
nemo = Animal.new("Nemo", "fish", "bubble!")

puts ziggy.name + " is a " + ziggy.type + " and makes the sound " + ziggy.sound
puts ziggy.make_noise
puts nemo.make_noise

puts nemo.to_s

puts "When " + ziggy.name + " is 7 she'll be " + ziggy.get_weight_at_age(7).to_s + " pounds!"

puts "Setting Nemo's type to shark..."
nemo.type = "shark";
puts "Now " + nemo.name + " is a " + nemo.type

```

### Differences of Note

I was surprised how similar the programs turned out to be. Small differences: (1) More necessary punctuation (mostly parenthesis and semi-colons) in the JavaScript, (2) explicit returns in JavaScript. 

Some larger things I ran into to: 

(1) In the JavaScript version, the result of `ziggy.getWeightAtAge(7)` was coerced into a string because I was calling it within a string with a `print`. In Ruby I had to use the `.to_s` method on the result of the `get_weight_at_age` method to avoid an error. 

(2) As I mentioned above, in JavaScript the "initializing" function goes outside of the prototype definition, whereas in Ruby there's the pretty-intuitive `def initialize`. As much as I struggle to spell "initialize" correctly almost every time I declare a new class, I'll give a point to Ruby here for semantics. 

(3) In Ruby we have control of which variables are accessible outside of the class definition and how accessible they are (`attr_reader` vs. `attr_writer` vs. `attr_accessor`). In JavaScript, at least by default, all initialized variables are available and over-writable outside of the prototype definition, as if they had been declared `attr_accessor`s in Ruby. 

(4) In JavaScript the method definitions are separated by commas, which kind of sucks if you're re-ordering them often. But again, nothing crazy. 

Again, here's all of the code [on GitHub](https://github.com/sts10/animal_prototype). 













