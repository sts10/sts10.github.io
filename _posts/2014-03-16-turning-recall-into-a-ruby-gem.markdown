+++
title= "Turning Recall into a Ruby Gem"
date= "2014-03-16 21:42:08 -0400"
comments = "true"
+++

Huzzah! I finally wrestled my Recall code into a legit Ruby Gem! 

Here's [the updated GitHub repo](https://github.com/sts10/recall) and here's the super-official [RubyGem page](https://rubygems.org/gems/recall). You can install it by simple running `gem install recall` from your command line!

Big thanks to Flatiron alum [Kevin Curtin](https://twitter.com/kcurtin) for his help organizing and connecting the various files. 

<!-- more -->

Here's a quick summary of the rather arduous process I went through to get the working script into a gem. This outline may not be exactly correct, as it took me a little over a week to finally whip my directory structure and `require_relative`s into proper order, but it is roughly how this went down. 

### 1. Bundler's Skeleton
I ended up using Bundler's [built-in gem skeleton generator](http://bundler.io/rubygems.html). I ran `bundle gem recall` in a fresh, empty directory and got a scaffolded-out directory for the gem. But I still had some big hurdles to get over.

### 2. Gemspec File
Next, an easy bit. I filled out the gemspec file that Bundler gave us with our personal information. 

### 3. The Transfer
I then transferred code (models, a runner, and a template) into the appropriate folders inside the skeleton of directories that Bundler created for me. This involved a lot of guess-and-gem-build. 

**Models and template**: I put both of my model files and the templates folder (containing the one template) into `lib/recall/`. 

**Runner**: My "runner" went into `bin/` and I renamed it `recall` with no extension.

**That weird recall.rb file**: Bundler created a module called `Recall` in `lib/recall.rb` for me. I guess I've come to think of this file as the bridge between my runner (`bin/recall`) and my `lib/recall/` directory, which has all my models and templates. 

**Why a module?** The reason for making it a module is to protect it from naming conflicts. For example, Recall has a model called Results. We wouldn't want anyone using my gem to have a conflict when they call their Results class. So now my Results model effectively becomes Recall::Results (the :: is [the scope operator](http://stackoverflow.com/questions/3009477/what-is-rubys-double-colon-all-about)).

**Connecting the "bridge" file to my models and templates:** The `lib/recall.rb` (again, the "bridge" file) has a `require_relative` pointing to each model-- Results and SiteGenerator-- _after_ the module definition. Here's the entire file in all its weirdness:
```
require "recall/version"
require 'erb'

module Recall
end

require_relative 'recall/results.rb'
require_relative 'recall/site_generator.rb'

```

The SiteGenerator model calls the template with the `expand_path` method, so we didn't need to `require_relative` it here. 

**Connecting the runner to the "bridge" file (scope operators all over)**: In `bin/recall`, the models Results and SiteGenerator are called as `Recall::Results` and `Recall::SiteGenerator`, respectively, to associate them with the `Recall` module declared in `lib/recall.rb`. Oddly, we also found that we had to change their declarations to include the Recall module and the scope operator. 

#### A Hiccup When Connecting One of the Models to the Template and the Output File

In addition to the problem of my `bin/recall` runner not being able to find my Recall module until we put scope operators all over the place, it was also difficult to connect my `SiteGenerator` model to the files it needed to access. `SiteGenerator` needs access to both the .rb.erb template, located in `lib/recall/templates`, to know how to render the search results, as well as the temporary file where it dumps the search results. Kevin recommended I try File's [expand_path method](http://ruby-doc.org/core-2.0/File.html#method-c-expand_path) for these connections and that did the trick. Here's how we connected to the template: 

```
template_file = File.expand_path("../templates/sublime.rb.erb", __FILE__)
```

And here's how we connected the SiteGenerator model to the output file it writes to:

```
output_file = File.expand_path("../_site/ruby_file.rb", __FILE__)
```
(I'm still not 100% why this was necessary.)

As a recap, here is the current directory structure:

![Directory Structure of Recall Gem v. 0.0.4](http://i.imgur.com/lYepXzH.png)

### 4. Building the Gem (over and over again)
Now that we've got the directory structure and file connections just right, it's time to build our gem locally and see if it works! (OK so in actuality I attempted and failed to build this gem correctly numerous times. Each time I made a change to the code, I'd have to re-build it and re-install it to see what affect the change had on how the gem performed.) 

To build the gem locally, you run the following command: 

`gem build recall.gemspec`

This creates a new .gem file (with the version number appended) in your gem's root directory. You then can run `gem install recall` to install the gem locally and then you can try it out. Whenever I needed to make another change, I'd gracefully `rm` the `.gem` file, re-build and re-install the gem locally, and try again. Thankfully, you are able to keep the same version number throughout this process so the number of times I had to do this will be forever unknown to others. 

### 5. Publishing the Gem to RubyGems.org

Once I successfully built the gem locally, and liked how it functioned, publishing the thing was surprisingly easy. As per the [RubyGems' publishing guide](http://guides.rubygems.org/publishing/), I simply created an account at [RubyGems.org](https://rubygems.org/) then and ran `gem push recall-0.0.2.gem` in my local directory. To test it, I first uninstalled my local copy of version 0.0.2, then ran `gem install recall` and lo and behold it seems to work!
 
Also! 

In preparation for its public debut, I added a good amount of flow control to the runner to allow users to set and change the search directory as they please. Their search directory choice is stored in a .txt file called search_map, which I put in `lib/recall`. If that file is empty or for some reason doesn't exist, users are prompted to enter the absolute path of their desired search directory when they first call the gem. After that it's set, although users can edit the search directory by "searching" for `change_dir`. 

I think that about covers it. Give it a try? You can always uninstall it! 

For more info be sure to visit [the GitHub repo](https://github.com/sts10/recall). As usual, there's plenty of improvements to be pull-requested and merged. 






