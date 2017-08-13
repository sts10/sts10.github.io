+++
title= "Website Scraped"
date= "2016-05-07 21:45:31 -0400"
comments = "true"
+++

Earlier this week Alex Balk, a co-founder of [The Awl](http://www.theawl.com/), tweeted: 

<blockquote class="twitter-tweet" data-cards="hidden" data-lang="en"><p lang="en" dir="ltr">Of all the alt-texts that are about to disappear this may be my favorite: <a href="https://t.co/8HqTCyuXsC">https://t.co/8HqTCyuXsC</a></p>&mdash; Alex Balk (@AlexBalk) <a href="https://twitter.com/AlexBalk/status/727898415082909696">May 4, 2016</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

For those who don't know, The Awl is ["the last weblog"](http://www.theawl.com/about) on the internet. It was started in 2009 by Balk and Choire Sicha. I started reading it in college-- I remember specifically [this review of the movie _2012_, titled "Flicked Off: '2012' is Awesome and Haters Can Suck It"](http://www.theawl.com/2009/11/flicked-off-2012-is-awesome-and-haters-can-suck-it) gave me a refreshing example of how much fun you could have writing. 

One of the little fun secret things about The Awl is that the writers would often hide text in the alt text of images or links. It didn't take long for [this "secret" to be appreciated](http://katiebakes.tumblr.com/post/420123402/maybe-this-is-the-internet-equivalent-of-listening), and when I remember to, I place my mouse on images on the site and patiently wait the required number of seconds before the alt text pops up. 

<!-- more -->

## What is alt text?

On images, this text is stored in the `alt` attribute of the HTML `<img>` tag. Here's [how w3schools defines the attribute](http://www.w3schools.com/tags/att_img_alt.asp): 

> The required alt attribute specifies an alternate text for an image, if the image cannot be displayed.

> The alt attribute provides alternative information for an image if a user for some reason cannot view it (because of slow connection, an error in the src attribute, or if the user uses a screen reader).

A Penn State website on accessibly [adds that](http://accessibility.psu.edu/images/imageshtml/) "The term "ALT tag" is a common shorthand term used to refer to the ALT attribute within in the IMG tag." Alt text is important enough that [Markdown allows for it](https://daringfireball.net/projects/markdown/syntax#img). 

The w3schools site adds that "To create a tooltip for an image, use the [title attribute](http://www.w3schools.com/tags/att_global_title.asp)!" which "specifies extra information about an element."

I was vaguely aware of the distinction between the `<img>` tags' `alt` attribute and the more global `title` attribute, but given that both [Balk's mournful tweet](https://twitter.com/AlexBalk/status/727898415082909696) and [Bakes' 2010 Tumblr post](http://katiebakes.tumblr.com/post/420123402/maybe-this-is-the-internet-equivalent-of-listening) refer to text stored in the `alt` attribute, I proceeded with the assumption that, at least as far as images go, the fun stuff on The Awl was stored there.

## What I tried

When I saw Balk's tweet I assumed that, due to some change on the backend of the site, the alt text for images would be somehow removed or deleted. As of this writing the `alt` attributes are still there, and I don't know if they'll be deleted or just if a new CMS won't let the authors add them going forward (which seems strange given the progressive nature of the attribute...). Either way, my assignment was clear: scrape all of the `alt` text and store it in some useful way. 

So that night I started looking into ways pull down the data before it was too late(!) At first I tried parsing the RSS/XML feed that the [AwlTags Twitter bot](https://twitter.com/AwlTags) [uses](https://github.com/negatendo/AwlTags/blob/master/bots.rb#L13) ([full Github repo](https://github.com/negatendo/AwlTags)). 

I'm apparently not great at accessing or parsing XML with Ruby, and I couldn't figure out how to go back more than about 70 posts, but I had some fun:

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">&quot;your organic masculinity&quot; <a href="https://t.co/DfuHe4BHqR">pic.twitter.com/DfuHe4BHqR</a></p>&mdash; Sam Schlinkert (@sts10) <a href="https://twitter.com/sts10/status/728012398792151040">May 5, 2016</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

Then I figured I'd pull down every tweet from [The Awl's Twitter account](https://twitter.com/awl) and extract the post URLs that way, but turns out you can only go back roughly 3,600 Tweets in a given user's account. Cue the big, red "Denied" message on the hacker montage that was my Wednesday night. 

## What I ended up doing

So finally I confronted the most-straight forward, but also dirtier solution of scraping the site directly using [Nokogiri](https://github.com/sparklemotion/nokogiri). This ended up working great-- [here's my Github repo](https://github.com/sts10/awl_alt_scraper). The Awl's pagination is nice and simple (perhaps a Wordpress standard?): the URL for 3 pages back is simply `http://theawl.com/page/3`. With some guessing and checking I found that the blog, as of when I ran the scraper, went back to [page 2707](http://www.theawl.com/page/2707).

Basically the code visits each page, pulls the desired code for each of posts it finds on that page, and pushes the `post_url`, `image_src`, and `image_alt` to an array.

```ruby
base_url = "http://www.theawl.com/page/"

all_posts = []

# 2707 is last page as of today
total_number_of_pages_to_scrape = 2705
time_to_sleep_between_page_scrapes = 4

total_number_of_pages_to_scrape.times do |i|
  i = i + 1
  this_page_url = base_url + i.to_s
  
  this_page = Page.new(this_page_url)
  all_posts = all_posts + this_page.posts

  puts "Have scraped #{i} pages so far."
  sleep time_to_sleep_between_page_scrapes
end
```

The Post object: 

```ruby
class Post
  attr_reader :image_src, :image_alt, :post_url
  def initialize(post)
    post_image = post.css("div.post__body div p:first img:first")
    @image_src = post_image.attr("src")&.value
    @image_alt = post_image.attr("alt")&.value
    @post_url = post.css('h2 a').attr('href')&.value
  end
end
```

Note that the scraper ignores posts that do not have images in the first `p` tag OR if there's no `a` tag in the `h2`. 

```ruby
 def make_posts
   @doc.search("div.reverse-chron__post").each do |post|
     if !post.css("div.post__body div p:first img:first").empty? && !post.css('h2 a').empty?
       this_post = Post.new(post)
       @posts << this_post
     end
   end
 end
```

The above snippets are slight simplifications of code from the [runner.rb file](https://github.com/sts10/awl_alt_scraper/blob/master/runner.rb) if you want to read more. 

## Storing the scraped text and URLs

I wanted to store the scraped data in a nice, easy, and universal format, so I chose a comma separated value file (aka CSV), which is basically a minimalistic spreadsheet (you can open them with Excel). To be more thorough, I made the scraper make two CSV files: [one with every post with an image](https://raw.githubusercontent.com/sts10/awl_alt_scraper/master/csv/archive1.csv), and [one only with images with alt text](https://raw.githubusercontent.com/sts10/awl_alt_scraper/master/csv/just_with_alt.csv). 

That's [where I was](https://twitter.com/sts10/status/728077020865777664) Wednesday night. I set the `time_to_sleep_between_page_scrapes` to 2 seconds, started it, dimmed the monitor, and went to sleep a little after midnight. 

When I woke up there was an error and my internet was out. In my groggy state I spent a second worried I had been penalized some how for accessing too many pages too quickly, but now I think what happened was I forgot to change the setting to tell my MacBook never to go to sleep. 

![Energy Saver yeah OK sure](http://i.imgur.com/Cb3M0FM.png)

And when it did go to sleep maybe the open internet request freaked the router out some how? 

Anyway I unplugged and plugged in my router and after a shower it was working again-- phew. I set "Computer sleep" to never and started up the scraper again, then left for work. When I got home Thursday evening I had two nice CSVs waiting for me. I gleefully [tweeted a link to the data](https://twitter.com/sts10/status/728367840374444032), but nobody seemed to care. That was fine, because next came the fun part.

## Front end (ugh)

On the subway ride home from work Thursday night, assuming the scraping had gone well, I started to imagine ways that I would use this data stored in the CSV files. [Here's what I came up with](http://samschlinkert.com/awl-alt-tags) ([Github](https://github.com/sts10/awl_alt_scraper/tree/master/site)) after an hour or two. 

_Update: Unfortunately, since I create this site, The Awl has taken down or moved its hosted images, and thus breaking this particular front end implementation. Bummer!_ 

The site pulls in the CSV data from Github. Each row of the CSV contains an image URL, the image's alt text, and the URL of the Awl post that the image came from. The JavaScript in the site then chooses a random CSV row. Then it displays the alt text as a large, caption in the bottom-left corner of the image on a yellow background, kind of like a comic book. 

I was tired enough to tweet something mildly sincere.  

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">I made something silly because I really love The <a href="https://twitter.com/Awl">@Awl</a> <a href="https://t.co/sH08wfLFEJ">https://t.co/sH08wfLFEJ</a> <a href="https://t.co/gU3vXrdqaN">pic.twitter.com/gU3vXrdqaN</a></p>&mdash; Sam Schlinkert (@sts10) <a href="https://twitter.com/sts10/status/728397846647603200">May 6, 2016</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

I mentioned @Awl hoping to catch Balk monitoring the account and just before I fell asleep got this reply: 

<blockquote class="twitter-tweet" data-conversation="none" data-lang="en"><p lang="en" dir="ltr"><a href="https://twitter.com/sts10">@sts10</a> You poor thing.</p>&mdash; The Awl (@Awl) <a href="https://twitter.com/Awl/status/728412638145851392">May 6, 2016</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

"Fuck him," I thought. [Silvia Killingsworth](https://twitter.com/silviakillings), their new editor from The New Yorker, will like it. 

Sure enough, the next morning Siliva tweeted this high praise 

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Just...wow. <a href="https://twitter.com/sts10">@sts10</a> made an alt-tag site <a href="https://t.co/akDqt2VGM1">https://t.co/akDqt2VGM1</a></p>&mdash; Silvia Killingsworth (@silviakillings) <a href="https://twitter.com/silviakillings/status/728570354554294273">May 6, 2016</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

along with a [series](https://twitter.com/silviakillings/status/728570624017346560) [of](https://twitter.com/silviakillings/status/728571236192751616) [screenshots](https://twitter.com/silviakillings/status/728571557283532800) from the site. Woohoo! 

## Fun with URL Parameters

Today I added some more JavaScript to the site so that there's effectively a URL parameter with the URL of the Awl post of the image. So as you're clicking through the images, the URL on my site actually changes. That way if you find [one you like](http://samschlinkert.com/awl-alt-tags/?http://www.theawl.com/2010/05/the-awl-in-your-internet-mailbox), you can share the URL (something like `http://samschlinkert.com/awl-alt-tags/?http://www.theawl.com/2010/05/the-awl-in-your-internet-mailbox`) on social media or email or whatever, and others going to that URL will get the image and alt text that you intended to send them (rather than a random one).

Code-wise there's two parts to this: (1) give the site the ability to read a URL from the URL's parameters and display it, and (2) change the site's URL whenever a new image is served. 

From [index.html](https://github.com/sts10/awl_alt_scraper/blob/master/site/index.html), here's the start of part 1:

```javascript
var baseURL = window.location.toString();
if (baseURL.split("?")[1] !== undefined && baseURL.split("?")[1] !== ""){
  var givenURL = baseURL.split("?")[1];
} 
```

And the end of part 2:

```javascript 
// 4. write the post_url into the address bar
var baseURL = window.location.toString().split("?")[0];
history.replaceState({}, document.title, baseURL + "?" + post_url); 
```

This is a technique I first used on [my GIF rank](http://samschlinkert.com/gif_rank/) project, and I think it's pretty sweet. I've also [written about the idea of storing non-sensitive, user-specific data in URL parameters before](http://sts10.github.io/blog/2015/05/20/url-parameters-as-user-settings/).

## Epilogue: Headlines with Node.js

Separately I'd been playing around with a JavaScript framework (I think that's what it is) called [Node.js](https://nodejs.org/en/) this week. So on Friday, for a challenge (yolo), I figured I'd build a new scraper with Node to grab all the headlines from The Awl that contained exactly two words. 

Why exactly two words? Because, similar to the alt text thing, The Awl sometimes uses a humorous device of writing headlines that follow a noun + adjective or noun + verb construction (ugh it feels like explaining a joke but OK). Also similar to the alt text thing, others had noticed and [chronicled it a bit](https://docs.google.com/document/d/1VygBa92XKMouxHXmb5nHiMiiBMI2qmdZ98krP3p_gsE/edit). A sampling: ["Earth Pretty"](http://www.theawl.com/2011/12/earth-pretty), ["Man Sweaty"](http://www.theawl.com/2011/09/man-sweaty), ["Accomplishments Transitory"](http://www.theawl.com/2011/10/accomplishments-transitory), ["Goat Vexed"](http://www.theawl.com/2013/08/goat-vexed), [etc](https://github.com/sts10/awl_two_word_headline_scraper/blob/master/two_word_awl_headlines.csv). 

Since I already knew the best way to scrape the data and what HTML to target, this task was more about the coding and learning how to use Node (I'm very new to it). Just getting Node installed was a bit of a trick for me, since I had haphazardly installed [io.js](https://iojs.org/en/) on my machine a few months ago and struggled to un-install it.

For future reference, or anyone else facing this problem, I first consulted [this Stack Overflow answer](http://stackoverflow.com/a/11178106/3160994) and ran all of the code therein to get rid of my previous io.js installation. Then I [installed NVM (Node Version Manager)](https://github.com/creationix/nvm#install-script) (which seems to work very much like [RVM](https://rvm.io/)) and ran `nvm install node`. Now `node -v` gives me `v6.0.0`. 

To scrape the HTML I used the Node's http endpoint (is it called an endpoint?) and [its get method](https://nodejs.org/api/http.html#http_http_get_options_callback). To parse the HTML I used a package called [Cheerio](https://github.com/cheeriojs/cheerio). To write to a CSV file, I used a package called [ya-csv](https://github.com/koles/ya-csv), thanks to [this helpful blog post](http://blog-richter.rhcloud.com/writing-a-simple-csv-with-node-js/), which notes, "While there seemed to be good Node packages available [for writing to CSVs] they lacked very good documentation."

I'm more comfortable in Ruby than in JavaScript at this point, so some simple things took me a while. The stickiest part was how to make the scraper wait a second or two between calls to avoid a timeout. I had run into problems with asynchronous code before-- the asynchronous capabilities of Node are both a reason I'm interested by it and apparently a conceptual headache for me. Anyway, after a good amount of trial and error I got it working with `setInterval`. Here's that bit from [app.js](https://github.com/sts10/awl_two_word_headline_scraper/blob/master/app.js):

```javascript
var i = 1;
var totalPagesToScrape = 2705;

var interval = setInterval(function(pageToScrape){
  getPage(i);
  console.log("ran the interval for the " + i + " time.");
  i = i + 1;
  if (i == totalPagesToScrape){
    clearInterval(interval);
  }
}, 1000, i);
```

I still don't know why I never needed to refer to `pageToScrape` in the anonymous function... maybe because I made `i` global and just used that? In fact there's a good amount of that code block I'd live to go over with someone who knows their stuff, but it worked! 

I also don't love how much code I have in the `response.on('end', function(){` function. But that's the only place where I know I've got a new page scraped and ready so I guess that's how it goes with asynchronous. 

[The front end for the two-word headlines project](http://samschlinkert.com/awl-two-headlines/) ([Github](https://github.com/sts10/awl_two_word_headline_scraper/tree/master/site)) is similar to the alt text one-- if anything it's simpler. I decided to allow the user to randomly swap out either the first word or the second word of the headline (or both).

```javascript
$('#both-button').on("click", function(){
    newHeadline(data);
  });
$('#first-button').on("click", function(){
    newWord(data, 1);
  });
$('#second-button').on("click", function(){
    newWord(data, 2);
  });
```

## Just the Links

Alt text scraper:

- [Front end demo](http://samschlinkert.com/awl-alt-tags/)
- [GitHub](https://github.com/sts10/awl_alt_scraper)
- [Raw CSV data](https://raw.githubusercontent.com/sts10/awl_alt_scraper/master/csv/just_with_alt.csv)

Two-word headline scraper:

- [Front end demo](http://samschlinkert.com/awl-two-headlines/)
- [Github](https://github.com/sts10/awl_two_word_headline_scraper)
- [Raw CSV data](https://raw.githubusercontent.com/sts10/awl_two_word_headline_scraper/master/two_word_awl_headlines.csv)
