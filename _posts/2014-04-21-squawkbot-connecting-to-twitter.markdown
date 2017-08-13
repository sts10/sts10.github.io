+++
title= "SquawkBot Part 1: Connecting to Twitter"
date= "2014-04-21 22:35:28 -0400"
comments = "true"
+++

Today Brian and I launched [SquawkBot](http://squawkbot.herokuapp.com/), a Rails web app that reads users' Twitter timeline, searching for URLs that appear more than once. Here's the [public GitHub repo](https://github.com/sts10/squawk). 

You can find part 2 of this explainer [here](http://sts10.github.io/blog/2014/04/24/squawkbot-part-2-extracting-urls/).

### General Overview of SquawkBot

I really dig SquawkBot's code, as it's both simple and complex. It's simple in that it does not interact with a database (and thus has no schema or migrations) and only has one real controller. But it's complex in the work done in the 3 models is pretty interesting (at least I think so). 

There's a lot to the app, but in this post I'll just be talking about how we connect to Twitter's REST API and get the user's recent timeline tweets.

<!-- more -->

### Connecting to Twitter

The very first step is figuring out how we'll be connecting to Twitter. We quickly decided we'd use the simpler [REST API](https://dev.twitter.com/docs/api/1.1) rather than the more-complex [streaming API](https://dev.twitter.com/docs/api/streaming), as it better met the needs of our app.  

We headed on over to [apps.twitter.com](https://apps.twitter.com/) and registered a new Twitter app. The first one we made was specifically for the development stage of our project, so we set the app's "website" to http://flatironschool.com/ and the callback URL to http://127.0.0.1:3000/auth/twitter. The callback URL is what's actually important here. 

Once created, we went on over to the "API Keys" tab to get the API key and API secret for our new app. I also generated an access token and access token secret. These four keys are what you need to connect to Twitter. We'll be switching out the access token and access token secret in a minute, but for now generate them using your personal Twitter account and have them ready to be copy and pasted.

Note: Under settings, we also checked the box that reads "Allow this application to be used to Sign in with Twitter". 

We then added 3 gems: [sferik's Twitter gem](https://github.com/sferik/twitter), the ['omniauth-twitter' gem](https://github.com/arunagw/omniauth-twitter), and the [figaro gem](https://github.com/laserlemon/figaro).

We needed sferik's Twitter gem in order to setup Twitter client(s) to ping for tweets. We include the omniauth-twitter gem so our users can OAuth with Twitter, which we'll need them to do so the app can scrape their home timeline. Since we knew we wanted users to go to the `show` action in the timelines controller after OAuthing into Twitter, we then added a new route: `get '/auth/twitter/callback' => 'timelines#show'`. 

Finally, we bundled the [Figaro gem](https://github.com/laserlemon/figaro) by adding `gem 'figaro', github: 'laserlemon/figaro'` to our Gemfile (as of the writing of this post, the github pointer is necessary when using Rails 4.1, as it's the latest version of the gem) to safely hide our API keys from GitHub. Once we had bundled Figaro, we ran `rails generate figaro:install`, which, I believe, just generated a file called `application.yml` in the Rails config directory and (importantly!) added this file to gitignore.  

This `application.yml` file is where we're going to put all of our super-secret keys. Figaro will assign them to environmental variables that we can use in other files, namely secrets.yml, and safely push up to public GitHub repos. 

Here's what my application.yml file for SquawkBot looks like (obviously I'm not going to post our app or my secret keys here on the blog-- you put them right where I put the comments "your key goes here"):

```yaml
TWITTER_API_KEY: # your key goes here
TWITTER_API_SECRET: # your key goes here

TWITTER_ACCESS_TOKEN: # your key goes here
TWITTER_ACCESS_TOKEN_SECRET: # your key goes here
```

Later on, I removed the TWITTER_ACCESS_TOKEN and TWITTER_ACCESS_TOKEN_SECRET for reasons I will explain later. I also added a TWITTER_PRODUCTION_API_KEY and a TWITTER_PRODUCTION_API_SECRET because we later made a new Twitter app to be used in production, as opposed to development. 

OK cool. Now we're going to refer to these variables in secrets.yml, which is the file in Rails 4.1 where we're supposed to store keys (but is, by default, not git ignored). 

```yaml
development:
  twitter_api_key: <%= ENV["TWITTER_API_KEY"] %>
  twitter_api_secret: <%= ENV["TWITTER_API_SECRET"] %>
  twitter_access_token: <%= ENV["TWITTER_ACCESS_TOKEN"] %>
  twitter_access_token_secret: <%= ENV["TWITTER_ACCESS_TOKEN_SECRET"] %>
  secret_key_base: # secret key base

test:
  secret_key_base: # secret key base

production:
  twitter_api_key: <%= ENV["TWITTER_PRODUCTION_API_KEY"] %>
  twitter_api_secret: <%= ENV["TWITTER_PRODUCTION_API_SECRET"] %>
  twitter_access_token: <%= ENV["TWITTER_PRODUCTION_ACCESS_TOKEN"] %>
  twitter_access_token_secret: <%= ENV["TWITTER_PRODUCTION_ACCESS_TOKEN_SECRET"] %>
  secret_key_base: # secret key base

```

See all those lovely, opaque ENV variables? Totes safe to push up to GitHub. Now, finally, here is how we actually access these variables anywhere in our Rails 4.1 app. Here is how we set up our Twitter client, with all 4 values hard-coded: 

```ruby
Twitter::REST::Client.new do |config|
    config.consumer_key = Rails.application.secrets.twitter_api_key  # "YOUR_CONSUMER_KEY"
    config.consumer_secret = Rails.application.secrets.twitter_api_secret   # "YOUR_CONSUMER_SECRET"
    config.access_token = Rails.application.secrets.twitter_access_token # "YOUR_ACCESS_TOKEN"
    config.access_token_secret = Rails.application.secrets.twitter_access_token_secret   # "YOUR_ACCESS_SECRET"
end
```

If this `application.yml` > `secrets.yml` > configuration path seems a bit round-about to you, that's because in a way it is. It would seem to make more sense if Rails 4.1, by default, git ignored secrets.yml and allowed you to dump all your keys in that file, then allow you to refer to those variables with something like `Rails.application.secrets.twitter_api_secret`. This would make the `application.yml` file, and thus the Figaro gem, unnecessary. (We actually [@replied David Heinermeier Hanson on Twitter](https://twitter.com/loganhasson/status/454272877236617216) with this question during another project to little help.) But alas, that seems to be the best way to do this kind of thing at this point. 

### How to Not Hard-Code Your Access Token and Access Token Secret

This bit took us a day or two to figure out, so I'm granting the concept its own section in this post. Basically the access token and the access token secret are associated with your personal Twitter account, rather than your app. With these values hard-coded into your app, you're going to hit Twitter's API limit much faster, since all of your user's will be using your personal account's tokens. What you want is for each user who logs in to your app to use their own access token and access token secret. 

Remember the callback route we setup earlier: `get '/auth/twitter/callback' => 'timelines#show'`. Basically Twitter is going to send a bunch of information in the params back to us here. So in the `show` action of the timelines controller, we want to assign all the info we want to use later into instance variables: 

```ruby
def show 
    @twitter_username = request.env["omniauth.auth"]["info"]["nickname"]
    @user_name = request.env["omniauth.auth"]["info"]["name"]
    @twitter_avatar_url = request.env["omniauth.auth"]["info"]["image"]
    
    @oauth_token = request.env["omniauth.auth"]["extra"]["access_token"].params[:oauth_token]
    @oauth_token_secret = request.env["omniauth.auth"]["extra"]["access_token"].params[:oauth_token_secret]

    @timeline = Timeline.new(@oauth_token, @oauth_token_secret)

    @url_objs = @timeline.make_url_objs
    @max_appearances = @timeline.get_max_appearances(@url_objs)
end
```

First we grab 5 variables from Twitter's OAuth response: `@twitter_username`, `@user_name`, `@twitter_avatar_url`, `@oauth_token`, and `@oauth_token_secret`. Let's stay focused on the last two-- the access tokens. 

After assigning the instance variables we instantiate a new Timeline object simply called `@timeline`, passing in `@oauth_token` and the `@oauth_token_secret`. On initialization, Timeline calls a method called `make_twitter_client` using these access tokens. We'll look at this in the next section.  

The last important line of the show action is the call to the `make_url_objs` method, which is outside of the scope of this blog post. 

### Generating the Actual Twitter Client

Now let's go to the Timeline model. As I said, the model accepts the access token and access secret on intializtion. Let's look at that intialization method:

```ruby
def initialize(token, secret)
  @twitter_client = self.make_twitter_client(token, secret)
  @tweets = []
  @url_objs = []
end 
```

We immediately pass the token and secret parameters to a method called `make_twitter_client`, and save the result of the call to a new instance variable called `@twitter_client`. 

```ruby
def make_twitter_client(token, secret)
  Twitter::REST::Client.new do |config|
    config.consumer_key        = Rails.application.secrets.twitter_api_key
    config.consumer_secret     = Rails.application.secrets.twitter_api_secret 
    config.access_token        = token 
    config.access_token_secret = secret 
  end
end 
```

The `consumer_key` and `consumer_secret` refer to the keys of the Twitter app, which we (still) call from secrets.yml. But as you can see, we're now giving the user's access token and access token secret instead of the hard-coded values like we did earlier. 

We found that this technique-- the not-hard-coding-- significantly decreased the number of times we ran afoul of Twitter's API rate limits. The idea is that the rate limit for an application is far looser than it is for an individual user. 

### Actually Asking the Twitter Client for What We Want

Our main goal here is to get as many recent tweets from the user's home timeline as possible. We're going to do that by calling methods on the instance variable `@twitter_client` that we just defined. 

The methods that this 'client' object responds to are listed in [Twitter's REST API documentation](https://dev.twitter.com/docs/api/1.1). We're interested in a method called [home_timeline](https://dev.twitter.com/docs/api/1.1/get/statuses/home_timeline), which accepts a `count` option (among others) that we want to max-out at 199.

```ruby
def make_tweets
  timeline = []

  timeline = @twitter_client.home_timeline(:count => 199)
  last_id = timeline.last.id - 1 

  4.times do 
    sleep(1)
    timeline = timeline + @twitter_client.home_timeline(:count => 199, :max_id => last_id)
    last_id = timeline.last.id - 1
  end 

  timeline.each do |tweet_obj|
    @tweets << Tweet.new(tweet_obj)
  end
end

```

We then do that 4 more times, using the `id` of the last tweet we got as as the first tweet we pull, going back in time. We do this using the `max_id` option, which is defined in the [home_timeline method documentation](https://dev.twitter.com/docs/api/1.1/get/statuses/home_timeline). (We subtract one from the last_id so that we don't count that last tweet twice as both the last tweet and the first tweet of the next request. The `sleep` is an attempt to stay below Twitter's API rate limit, which we ran in to quite a few times in testing the app.)

But what exactly do we get from Twitter?

### What Exactly Do We Get From Twitter?

Twitter returns to us Tweet objects, which have a bunch of data and methods we can call on them. Each Tweet object represents one Tweet, in our case on Tweet from the user's home timeline. The best way we found to learn about this Tweet object was by using `binding.pry` and playing with them, hunting for the data we wanted. 

For now just know that we now have a local array variable, `timeline` (not to be confused with the controller instance variable `@timeline`), loaded with all the Tweet objects we managed to get from Twitter. 

The twist here is that we defined *our own Tweet object* to better suit our own needs, which explains the last step of the method-- the `each` loop in which we call `Tweet.new` and shovel the result into an instance variable called `@tweets`. We define our own Tweet object in the Tweet model, which I may cover in another post.

### Wrap-Up

Going back to the Timelines controller, you can probably guess that the `make_url_objs` calls `self.make_tweets` and then, using more instance methods, extracts the links contained in the tweets and creates Url objects, eventually letting us display the results users see on the `show` page.

[Read Part 2 of my SquawkBot explainer](http://sts10.github.io/blog/2014/04/24/squawkbot-part-2-extracting-urls/)
