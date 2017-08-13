+++
title= "SquawkBot Part 2: Extracting URLs"
date= "2014-04-24 13:52:39 -0400"
comments = "true"
+++

In my [first post](http://sts10.github.io/blog/2014/04/21/squawkbot-connecting-to-twitter/) about [SquawkBot](http://squawkbot.herokuapp.com/) ([public GitHub repo](https://github.com/sts10/squawk)), I went over how the app connects to the Twitter REST API. In this post, I'll be discussing the second main part of the app: extracting the URLs from the tweets. 

<!-- more -->

In [part one](http://sts10.github.io/blog/2014/04/21/squawkbot-connecting-to-twitter/) we left off in the Timeline model and we were just about to push our custom Tweet objects into an instance variable called `@tweets`. Again, we're not shoveling in the Tweet objects that Twitter gives us directly. We're pushing in oru own Tweet objects. Let's review this part for a second. 

At the end of the `make_tweets` instance method in the Timeline model, we have this `each` loop, where `timeline` is the array of all the Tweet objects we got from Twitter:

```ruby
timeline.each do |tweet_obj|
  @tweets << Tweet.new(tweet_obj)
end
```

However, these Tweet objects from Twitter didn't really suit our needs. So we decided to make our own Tweet objects. To make this process as easy as possible, we had our Tweet objects accept Twitter's Tweet object on intialization, as you can see in the above `each` loop.

### Making our Own Tweet Object

Here is our Tweet model in its entirety: 

```ruby
class Tweet 
  attr_reader :tweet_id
  attr_reader :text
  attr_reader :user_name
  attr_reader :user_handle
  attr_reader :tweet_url
  attr_reader :created_at

  def initialize(tweet_obj)
    @tweet_id = tweet_obj.id
    @text = tweet_obj.text
    @user_name = tweet_obj.user.name
    @user_handle = tweet_obj.user.handle
    @tweet_url = tweet_obj.url
    @created_at = tweet_obj.created_at
    @expanded_urls = tweet_obj.urls.map { |url| url.attrs[:expanded_url] }    
  end

  def expanded_urls 
    @expanded_urls
  end
  
end
```

Remember: The idea here is to take everything we're going to need from Twitter's Tweet object (and nothing more) and making that information as easy to access as possible. 

As we saw in the Tmieline model, our Tweet object accepts a Twitter Tweet object, `tweet_obj`, on initialization. So let's start by looking at the initialize method.

The first line declares an instance variable called `@tweet_id` and assigns it to `tweet_obj.id`. Twitter's Tweet object has an instance method called `id` that returns the id of that particular tweet. Since we're going to need that later, we save it as `@tweet_id`. We also declare an `attr_reader` for `tweet_id` so we can read from it later. 

We follow the same procedure for `@text`, `@user_name`, `@user_handle`, `@tweet_url` (the URL of the Tweet itself), and `@created_at`. These are the variables we'll need to display the Tweet in the view. 

The only one that is different is `@expanded_urls`. This is the most important move in this method. Digging into Twitter's Tweet object, we evenually found an array of all the URLs contained in the text of that Tweet (some tweets have more than one URL in it). Obviously this is very important to us given the URL-collecting nature of our app. 

We choose the expanded URL as opposed to the shortened or display URL because the same link can be shortened in a variety of ways, but it will usually have the same expanded URL. This makes it easily to compare tham later. 

Finally, since `@expanded_urls` is an array, I wrote out a reader for it below the intialize method. 

### Making URL Objects

Now that `@tweets` is an array loaded-up with our custom-made Tweet objects, we're ready to get the fun part-- making the URL objects. 

What's a URL object? A URL object is an object that represents one row of Tweets on the SquawkBot results page. We're going to comb through every tweet we got from the user's timeline and everytime we see a URL, we're either going to give it a "plus one" appearance, or, if we haven't seen that URL before, we're going to make a new URL object. Thus, one URL object may contain multiple tweets. 

So let's say this link to this article: http://www.theawl.com/2014/04/in-defense-of-explaining-things gets tweeted by 5 people who I follow. There will be URL object with an `address` of http://www.theawl.com/2014/04/in-defense-of-explaining-things and its `appearances` will be 5. The URL object will also have an array of Tweet objects that contain that URL. 

Here is the Url model: 

```ruby
class Url
  attr_accessor :address, :appearances

  def initialize 
    @tweet_objs = []
    @appearances = 1
  end 

  def tweet_objs 
    @tweet_objs
  end 

  def add_tweet_obj(tweet_obj)
    @tweet_objs << tweet_obj
  end 
end 
```

I call the Tweet objects `@tweet_objs` just so we know what they are. I also defined a method `add_tweet_obj` that adds a Tweet to a URL. The other thing you may notice is that on intialization I set `appearances` = 1, which makes sense. 

OK, now we're ready to return to the Timeline model and see the all-important `make_url_objs` method. 


```ruby
def make_url_objs
  self.make_tweets

  @tweets.each do |tweet|
    tweet.expanded_urls.each do |url|
      url_obj = @url_objs.detect {|url_obj| url_obj.address == url } 
    
      if url_obj
        url_obj.appearances = url_obj.appearances + 1
        url_obj.add_tweet_obj(tweet)
      else
        new_url_obj = Url.new
        new_url_obj.address = url
        new_url_obj.add_tweet_obj(tweet)
        @url_objs << new_url_obj
      end
    end
  end

  # more code here...

end
```

Since `make_url_objs` is the only method we call in the show action of the Timelines controller (besides `get_max_appearances`, which isn't super important), we need all the magic to happen here. Thus the first line of the method, which called the `make_tweets` method on `self`. As we've gone over, that method basically loads up the `@tweets` instance method with our custom Tweet objects.

Next we have nested each loops that go through each URL in each tweet (remember: some tweets have more than one URL in it). Now that we have a particular `url`, we want to check to see if we're ever seen it before. 

We assign the result of that little `detect` method to a new local variable called `url_obj`. If there was a match, `url_obj` will be the matching URL object. If there was no match, `url_obj` will equal nil. 

So if `url_obj` exists, we know there was a match. Thus we want to increase the `appearances` of that URL by one and we want to add the Tweet we found the URL in to the `tweet_objs` array of that `url_obj`. Basically we just found another tweet the mentions that article. 

If there's no match, we have found a new URL and we want to make a new Url object. We give it the address of the url we're currently on, add the tweet to its tweet_objs array, and add the Url object itself to `@url_objs`, so it will return a match next time we see it. 

Coming out of those two each loops we'll have an array of URL objects in `@url_objs`. 

Next we'll run a filtering method on this instance array. The method, called `filter_url_objs`, rejects any URLs with appearance > 1, and it also attempts to weed out multiple tweets by the same  user. The use case here is when CNN tweets a link to the same article 4 times in a short amount of time-- we decided that we didn't want this to constitute a legit 'squawk' on its own. 

We then sort the array by appearances (most appearances first) and we're ready to send `@url_objs` back to the Timeslines controller and on to the `show` view.


Phew! I know that ran a little long but I hope it was helpful to some of you. The rest of the app is all about making the Tweets display nicely, the methods for which are in the `tweets_helper` and from the [Twitter-Text](https://github.com/twitter/twitter-text-rb) Ruby gem (namely that `auto_link` method). @reply me on Twitter if you have any further questions about SquawkBot. 




