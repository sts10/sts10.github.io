+++
title= "Catalog of Radiation Updates"
date= "2014-10-16 22:10:40 -0400"
comments = "true"
+++

_On May 21st 2015, I migrated a handful of blog posts of mine from my [totallynuclear page](http://totallynuclear.club/~schlink/) back to [this GitHub blog](http://sts10.github.io/). (If the totallynuclear page is down, you might be able to find a back up of my posts in [this GitHub repo](https://github.com/sts10/radiation_posts).)_

_I blogged on that totallynuclear club page using a Ruby CMS I built myself called [Radiation](https://github.com/sts10/radiation). Since I built the CMS as I blogged, I often posted updates about bug fixes and new features to my totallynuclear page. For posterity I thought I'd dump a selection of those updates here in one blog post. So here they are, starting with the first post that mentions Radiation, dated [October 12th, 2014](https://github.com/sts10/radiation_posts/blob/master/2014-10-12T17%2B22%2B12-hello_world.html)!_

<!-- more -->

<h2>Hello World, From Radiation v 0.0.2!</h2>

<p>Hello world! This is Sam's totallynuclear blog!</p>

<p>I should probably write down how I logged in! First I think I entered `ssh schlink@totallynuclear.club` into my Terminal. Then I entered my password (which I've since changed to something super secret). That might have been it?</p>

<p>I spent the afternoon working on a very simple CMS for totallynuclear blogs. At some point I decided on the name Radiation, as it stays with the nuclear theme of totallynuclear. <a href="https://github.com/sts10/radiation">Here's the public GitHub Repo</a>. It seems to be working well so far (I'm using it right now!).
</p>
<p>
The README has decent installation instructions, but let me know if you have any trouble. I wrote it in Ruby and ERB, so if that's your jam please let me know if you have any suggestion (I'm <a href="http://www.twitter.com/sts10">@sts10</a> on Twitter). </p>

<h2>Radiation v 0.0.5</h2>
<p>
    Just pushed <a href="https://github.com/sts10/radiation">Radiation v 0.0.5</a> up to GitHub. Knocked 3 big things off my to do list tonight: (1) Drastically simplified the number and semantics of the Ruby models, (2) fixed a creation time bug, and (3) took the blog template ERB file out of the radiation directory, much as I did with the posts directory yesterday. Due to these changes I also changed the installation process a bit. I hope it is easier for both new and upgrading users.
</p>
<p>
    I think 0.0.5 is an OK product. No permalinks or drafts or anything fancy, and I'm definitely still not satisfied with the installation process, but it's on its way. Oh, a decent goal for tomorrow or Wednesday would be a nifty little menu for editing previously published posts. There's always  more to do.
    </p>
<p>
    I did take a minute to browse some other totallynuclear sites this afternoon (that's what this is about, right!) and I found the <a href="http://totallynuclear.club/~crm/">~crm</a> totally wrote his or her own (much simpler) CMS using Ruby and ERB. In fact, it's only one file! Kudos! I haven't pasted it into an editor and tried it yet, but it certainly looks like it gets the job done.
</p>
<p>
    OK well that's about it for now. Let's hope this post publishes as intended!
</p> 


<h2>Radiation 0.1.1: A Work in Progress</h2>
<p>Tonight I tried to make a considerably large leap forward with <A href="http://github.com/sts10/radiation">Radiation</a>. The big thing I was attempting was to try to simplify the installation process by using the bash `ln` command, rather than forcing users to paste a multi-line function into their .bash_profile. I gave it a pretty good shot, and at one point I was so confident I merged my branch with master and pushed it up (sorry if anyone pulled down the doomed version 0.1.1 that was up for a bit a few hours ago). But I ran into problems with relative vs. absolute paths. I thought if I made the assumption that everyone install the radiation directory in the `~` directory, I could just hard-code everything with that, but I just couldn't get it working right. </p>
<p>I may give it another shot tomorrow. But at this point v 0.0.7 is a pretty solid build, and I think people can really save time and do more using it than not. It's also a decent code base for expanding upon. I hope it's clear to developers approaching it for the first time. </p>
<p>If you do want to see what I  was going for in v 0.1.1, you can see <a href="https://github.com/sts10/radiation/tree/0_1_1">that branch up on the repo</a>. I need to take a day or two break from it for now though.</p>
<p>Today's big lesson was that when you're sharing a program with a community who may rely on it for daily use, you have to be really careful that the default braanch (in this case I've kept it as master) is a working build at all times. Or at least you feel shitty when that branch is broken even for a few minutes-- imagining that one or two new users could be eagerly cloning your repo and following your broken installation instructions right at that moment. Thankfully Git is awesome and I was moderately quick in reverting back to a good commit of v 0.0.7. Maybe I'll have better luck later this week.</p> 


<h2>Radiation v 0.2.0</h2>
<p>
So thanks to an <a href="https://github.com/sts10/radiation/issues/3">issue submitted by ~erik about time-zone support</a> I banged out and pushed a pretty solid update to Radiation this afternoon. <a href="https://github.com/sts10/radiation">v 0.2.0</a> has some basic time-zone support and features a new menu option called "edit user settings" which lets users easily edit 4 settings: timezone, blog location, text editor, and blog template location. This file is located at <code>/radiation/user_settings.rb</code>. </p>
<p>
So for a user to edit his or her time away from the default of 'America/New_York', the user would install v 0.2.0 of Radiation for time-zone support, then run the main menu. The user would then select 's - edit user settings' and change the first variable. I have been looking for a list of timezone options in this 'America/New_York' 'America/Los_Angeles' format, but all I've found so far that looks like this is this <a href="http://www.timezoneconverter.com/cgi-bin/zoneinfo">silly time-zone converter form</a>. If you find a more official-looking list please let me know. </p>
<p>
I'm glad I extracted a few of the basic user variables. Now, folks who aren't comfortable using vim can switch to nano pretty easily. Also if I get more bold in future versions I could remove the <code>user_settings.rb</code> file from the radiation directory, so that when users upgrade to a newer version of Radiation, their user settings would carry over seemlessly, just like their radiation_posts and radiation_templates do now. </p>


## Radiation, Now With Markdown Support

Super excited to show off [v 0.2.2](https://github.com/sts10/radiation), which allows users to compose posts in Markdown. 

To do this I used the [kramdown library](http://kramdown.gettalong.org/), which I learned about from [~crm's](http://totallynuclear.club/~crm/) simple CMS. Basically kramdown takes Markdown and converts it into HTML. I choose to use GitHub flavored markdown by default. I also had to add 4 `gsub`s on one line to handle smart quotes. But it seems to work now! 

Posts created in HTML will still be rendered in HTML and work just fine. And users who wish to contine to write posts in HTML may do so-- v 0.2.2 asks users when creating a new post whether they want to write in HTML or Markdown. So no worries!

Let me know if you see anything weird though! 


## Radiation v 0.3.0: Your User Settings Are Safe With Me, Baby

Some nice small things in this update. The biggest thing is yet another new way of handling user settings. 

As you can see in the [v 0.3.0 config/environment](https://github.com/sts10/radiation/blob/master/config/environment.rb) I load two settings files:

```ruby
require_relative '../default_settings.rb'
if File.exist?('../radiation_user_settings.rb')
  require_relative '../../radiation_user_settings.rb'
end 
require_relative '../lib/time'
require_relative '../lib/post'
require_relative '../lib/blog'
```

First we load `'../default_settings.rb'`, which is within the `~/radiation/` directory. Since it's in that directory it will get overwritten every time the user re-installs Radiation. But that also means Radaition developers can edit update it with every version update. So basically that's where we'll put our sensible defaults. 

Then, if the File exists, we `require_relative` `'../../radiation_user_settings.rb'`, a new file that lives outside of the `~/radiation` directory. Crucially, this file is loaded AFTER the default_settings file. Thus users can overwrite the global variables defined in default_settings and their changes will supercede the default_settings. HOWEVER, if the user fails to define a setting, Radiation will fall back to the default_settings. 

Nifty right? I got the concept from Sublime Text, which has a similar default/user setting file system. 

Other updates in v 0.3.0 include some sublte but very nice menu flow changes, most of which were suggested to me by [~bobbyllama](http://totallynuclear.club/~bobbyllama/). For example, when users create a new post or edit an existing post, they are asked explicitly whether or not they want to publish the blog at that point. I hope that makes it easier for new users to understand that when a post is created or edited, changes are pushed to the live site until Radiation publishes the blog. 

Phew! This beast is coming along. But as always, when I move fast like this there might be some big problems I didn't find in my hasty testing. So if you find weirdness, let me know! 


## Radiation v 0.3.3: BASH Functions for All! 

Two big improvements from v 0.3.0:
1. New menu option to delete posts 
2. At the suggestion of [~bobbyllama](http://totallynuclear.club/~bobbyllama/), I also gave users a menu option to add a BASH function to their profile to make calling Radiation easier. 

Previously I had just put this function in the README and gave some basic instructions for users to put it in their .bash_profile themselves. 

```
function radiation {
    cwd=$(pwd)
    cd ~/radiation
    ruby bin/runner.rb
    cd $cwd
}
```

But now, if their .bash_profile doesn't have the two words "function radiation" in it, they are presented with a new menu option `b - Add radiation function to your bash_profile`. If they already have those two words next to each other in their bash_profile, the menu item is hidden. 

I decided to go classy with this one and did it in one line of Ruby:

```ruby
puts "b - add radiation function to your bash_profile" if open('../.bash_profile').grep(/function radiation/) == []
```
When users do select / ask Radiation to add the functon to their bash_profile, Radiation obviously appends it to their profile, so as not to overwrite anything there already. I think that the 'a' option for append will create a .bash_profile if it doesn't exist already? Yeah, pretty sure I tested for the possibility. 

Speaking of concise code, [runner.rb](https://github.com/sts10/radiation/blob/master/bin/runner.rb) is anything but right now. I've been able to but some Ruby methods over in [the blog model](https://github.com/sts10/radiation/blob/master/lib/blog.rb), including most of the work for the delete post menu option. But I should try to figure either (a) how to get more of the work from runner to the blog model or (b) find a new object/model to create for some of it (User?). No rush on that right now, as I kind deep down like having one big ass functional file like `runner.rb`.

In general, though, as Radiation develops it becomes less techincally taxing on users, but more onerous for me or other new developers to come in and improve or alter it. For example, before this update users had to got to the `/radiation_posts/` directory and actually `rm` posts to delete them. And if they wanted a better usage experience they had to go edit their `~/.bash_profile` and enter some code-- things I would have been uncomfortable doing just 10 months ago. Of course they can still do both of these taks in this more manual way, but making it doable from the Radiation main menu made the codebase that much larger and thus more difficult to onboard and to maintain. 

Maybe the question is: who's the customer and what's the goal? If they're total newbies to the command line, it's now easier for them to get up and running. But maybe they'll be learning less for the installation process and using Radiation. And if they're moderately-experienced developers, the codebase hasn't grown _that_ much in complexity, and thus I'd say the onboarding process hasn't gotten _that_ much more complex since, say, the 0.1.X versions. So in that way I've been serving both customers with these recent updates. 

But is the end game to make the whole process, from installation to publishing, as automatic and easy as possible, with no coding necessary? So more like [Octopress](http://octopress.org/), a framework that has served as an inspiration to me already? That would mean a move toward interchangeables themes and the like, which could be fun. 

I don't know, we'll see! Thanks for reading along so far! 


## Radiation v 0.3.7: Draft Support from Gunnar

I finally got around to checking out [~gunnar](http://totallynuclear.club/~gunnar/)'s pull request(s) that added draft support to Radiation ([here's one of them](https://github.com/sts10/radiation/pull/8)). I merged it today, added one little check for blank posts, and pushed version 0.3.6! I then added the "update timestamp" menu item and bumped it up one more to v 0.3.7. 

As I explain in the new readme, to save a post as a draft, simply make the very first line of the document "draft". Posts marked as such will not be published. However you will be able to access them in the edit menu. To publish a draft, simply edit the draft, remove the word "draft" from the first line, and publish your blog. 

This system was all gunnar's doing! Very awesome, very simply and intuitive! (PS. [here's gunnar's Github page](https://github.com/gunnarhafdal)).

~gunnar has one other pull requests for me that I still need to look at. This third pull request, which deals with timezone management, confuses me a bit so I'll have to think about some more this week. 

This has been my first experience receiving, evaluating, and merging a pull request from someone who I've never met. It's amazing what Git and GitHub allow open-source developers to do! Like, I got the idea before, but now that I've had a personal side project profit from the system, it hits home even more. I'm so grateful! 



## Introducing Hazmat, a Reader for Radiation Blogs

So over past 3 nights I've been working on a new little script very related to Radiation. I'm calling it Hazmat, and I think it's going to make using Radiation a lot better. 

**The "Problem":** I am SO FLOORED that there are at least 7 Radiation blogs on totallynuclear.club currently (if you're not on [this list](https://github.com/sts10/hazmat/blob/master/following.rb) please let me know!). With 7 blogs it's not that big a deal to go visit each one in turn. But as a theorectical exercise, if there were, say, 50 Radiation blogs you wanted to follow, this would be kind of a pain.

**The Idea:** Given that the HTML "product" of all Radiation blogs follow a similar pattern, I thought I'd make a simple web scraper that could pull blog posts from a set of Radiation blogs and display them in reverse chronological order for the reader. Kind of like Google Reader (but I didn't want to use RSS).

And as for the name-- if Radiation spreads "nuclear waste", Hazmat makes it nice and organized and clean for the reader. 

**The Hope:** My hope is that, by adding Hazmat to the equation, the combination of Radiation as the writer and Hazmat as the reader makes something like a loose Tumblr or general social network. Hazmat attempts to solve the problem of discovery, of making checking on other tilde sites easier, etc. We could even work in something like mention notifications down the line! The idea is to keep people engaged, but without shoving a bunch of restrictions down their throats. 

So! I have a very early, fragile-but-working version of [Hazmat up on Github](https://github.com/sts10/hazmat). NOTE: Apparently some users are having trouble installing a Ruby gem called nokogiri that this version of Hazmat requires to function. I will try to figure out a workaround this week hopefully. 

There are some basic installation instructions in the ReadMe. So far I have only cloned and run it on my local mahine (as opposed to my totally nuclear box). It should work in both environments though. 

If you do test it out, please let me know if you find any issues or have any ideas. Or if you're not on the following list currently included in the repository (meaning that you're a Radiation user I don't yet know about!)! 



## Hazmat v 0.1.0, Working on Totally Nuclear Boxes

Phew. So, thanks to [~erik's help](https://twitter.com/erikprice/status/540702681976037377) and some other alterations, [Hazmat](https://github.com/sts10/hazmat) now just might work for users who do not have a nice Ruby environment already set up on their local machines. 

Originally I ran into the problem of there being no graphical browser installed on Totally Nuclear boxes. One option, as ~erik suggested, was to have Hazmat open the produced newspaper.html file in a console browser called Lynx. However when I tested this I didn't really find it satisfactory. Plus I had already written a bunch of [CSS](https://github.com/sts10/hazmat/blob/master/css/styles.css) and [JavaScript](https://github.com/sts10/hazmat/blob/master/js/app.js) for a modern browser to use for the newspaper. 

So my solution was to have Hazmat print its "newspaper" to the user's public_html directory. Then I just tell users which URL to visit to see their newspaper. Yes, this makes the produced newspaper public, but it's the best way I could come up with to have the result viewable in a modern browser rather than Lynx. I did however leave Lynx as a choice for users. 

I should probably make some sort of CLI menu that allows users to edit which Radiation blogs they follow, but that can wait for now. I'm just psyched at the possibility that other users can actually use Hazmat now. 

