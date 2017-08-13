+++
title= "Basic Guide to Creating a Markov Chain-Driven Twitter Bot"
date= "2014-12-23 15:21:41 -0400"
comments = "true"
+++

<blockquote class="twitter-tweet" lang="en"><p>Suspect fires on bounty hunters, twirling in their <a href="https://twitter.com/hashtag/Burberry?src=hash">#Burberry</a></p>&mdash; Schlink Bot (@schlinkbot) <a href="https://twitter.com/schlinkbot/status/546412459830288384">December 20, 2014</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

Over the past few weeks I've been playing around with different ways of making Twitter bots (automated Twitter accounts). I don't have much to show for it yet-- most of my experimentation has been with [@schlinkbot](http://twitter.com/schlinkbot), which probably doesn't look too impressive at this point. But I've learned some foundational stuff. 

<!-- more -->

Anyway, in this post I'm going to be going over how to use a Ruby gem called [Twitter Ebooks](https://github.com/mispy/twitter_ebooks) by GitHub user mispy to make a Twitter bot. There are of course other ways of doing this, but Twitter Ebooks has some nice features. **Note:** I'm still new to this gem/framework, so excuse any problems. But I did get the bot up and tweeting and replying. 

You can read more about Twitter Ebooks at [the project's wiki](http://www.rubydoc.info/github/mispy/twitter_ebooks).

### Wait, What is This? 

Right, so Twitter Ebooks is basically a framework written in Ruby that allows users to create their own Twitter bots. You can think of it like a Twitter bot factory. We want to use it to make one Twitter bot. 

Our bot, using Twitter Ebooks, will connect to Twitter using the [Twitter API](https://dev.twitter.com/overview/documentation). This will allow us to send tweets and listen for mentions of our bot. Actually running the bot involves us: (1) creating a twitter account for the bot, (2) registering a Twitter app for the bot, (3) creating a bot with Twitter Ebooks, then (4) running the Ruby code that runs the bot. 

Twitter Ebooks, and the bots created with it, are written in a programming language called Ruby. It's what's called a Ruby gem, which we'll need to download in a special way in order to use.  

### Where Will My Bot Get Its Content From? 

Twitter Ebooks uses a pseudo-Markov generator to generate text for the bot to tweet. Basically it's going to mash-up text from a "real" Twitter account (like your personal account perhaps), and spit it back out all mashed up. Hopefully that sounds cool to you. It can be pretty poetic! 

### What You'll Need to Set Up a Twitter Bot This Way

You'll need a basic Ruby coding environment. I think the bare minimum would be a fresh install of XCode or Command Line Tools, which you can [download from Apple](https://developer.apple.com/downloads/index.action), and [RVM](https://rvm.io/rvm/install). You'll also need a code editor like [Sublime Text 2](http://www.sublimetext.com/2) or 3. If you can install Ruby gems you're ready to roll. 

### Setup Step 1: Configuration

First step is to install the Twitter Ebooks Ruby gem. To do this open your Terminal and enter `gem install twitter_ebooks`. Hopefully it installs successfully. If it doesn't you probably don't have XCode or Command Line Tools set up correctly, or you don't have RVM (or an equivalent Ruby version manager) installed correctly (see above).  

Now you'll want to use the Unix commands `cd` and `mkdir` to make a folder for your bot project. When you're in the proper directory, run `ebooks new my_test_bot` (or whatever you want to call your bot). Now open the `bots.rb` file in your code editor. This is where you tell your bot how to act and thus will be where we'll do most of our coding. 

This would be a good time to go create the Twitter account that will be your bot. For example, I went and made @schlinkbot. Write down the password somewhere. 

Now we need to create a "Twitter app." While logged in as your bot account, head over to [https://apps.twitter.com/](https://apps.twitter.com/). Hit the create new app button in the top right and fill out the form. It doesn't really matter what you put here, just be sure to leave Callback URL blank and agree to terms. If it asks, choose the highest level of permissions (read, write, direct messages). (Note: Since writing this blog post, I think Twitter has changed their API rules such that for an account to create a new account, it needs to have a phone number attached to it. If, like me, your one real phone number is attached to your real, non-bot account, [Google Voice](https://www.google.com/voice?pli=1) may be useful here.)

Let's head over to the "Permissions" tab and make sure our app asks for "Read, Write and Access direct messages". With the checked, hit "Update Settings." Now go to the "Keys and Access Tokens" tab. Scroll down and click the "Generate My Access Token and Token Secret" button. 

Cool. We now have 4 long token/secrets on this page. These 4 codes will allow our app to read and post to the bot's Twitter account. The 4 codes are: consumer key (API key), consumer secret (API secret), access token, and access token secret. 

Now, while keeping your browser open to that page, open `bots.rb` in your text editor. 

By default you're given a bare-bones example, but I'd suggest replacing that with my slightly more built-up example below, which I based off of the bot example in [this repo](https://github.com/mispy/ebooks_example): 

```ruby
require 'twitter_ebooks'

# This is an example bot definition with event handlers commented out
# You can define and instantiate as many bots as you like

class MyBot < Ebooks::Bot
  # Configuration here applies to all MyBots
  attr_accessor :original, :model, :model_path

  def configure
    # Consumer details come from registering an app at https://dev.twitter.com/
    # Once you have consumer details, use "ebooks auth" for new access tokens
    self.consumer_key = '' # Your app consumer key
    self.consumer_secret = '' # Your app consumer secret

    # Users to block instead of interacting with
    self.blacklist = ['tnietzschequote']

    # Range in seconds to randomize delay when bot.delay is called
    self.delay_range = 1..6
  end

  def on_startup
    load_model! 

    scheduler.every '24h' do
      # Tweet something every 24 hours
      # See https://github.com/jmettraux/rufus-scheduler
      # tweet("hi")
      # pictweet("hi", "cuteselfie.jpg")
    end

    scheduler.every '57m' do 
      statement = model.make_statement(140)
      tweet(statement)
    end
  end

  def on_message(dm)
    # Reply to a DM
    # reply(dm, "secret secrets")
  end

  def on_follow(user)
    # Follow a user back
    # follow(user.screen_name)
  end

  def on_mention(tweet)
    # Reply to a mention
    # reply(tweet, "oh hullo")
  end

  def on_timeline(tweet)
    # Reply to a tweet in the bot's timeline
    # reply(tweet, "nice tweet")
  end

  private
  def load_model!
    return if @model

    @model_path ||= "model/#{original}.model"

    log "Loading model #{model_path}"
    @model = Ebooks::Model.load(model_path)
  end
end

# Make a MyBot and attach it to an account
MyBot.new("schlinkbot") do |bot|
  bot.access_token = "" # Token connecting the app to this account
  bot.access_token_secret = "" # Secret connecting the app to this account

  bot.original = "sts10"
end

```

NOTE: Here is a [gist](http://gist.github.com/sts10/9f253ea19bbf49b622ed) of the above code if that's easier for you to read/copy-and-paste. 

First off, let's fill in those 4 codes. The first two go up top where it says `self.consumer_key` and `self.consumer_secret`. The second two go down at the bottom at `bot.access_token` and `bot.access_token_secret`. In all 4 cases, put the codes between the quotation marks. 

Next, change out `"schlinkbot"` to the handle of your Twitterbot. And change `"sts10"` to whatever "real" Twitter account you want your bot to imitate. This "real" account with populate something that Twitter Ebooks calls the "model". 

OK, let's save that `bots.rb` file and go back to the command line. Now run the following lines from within your bots directory: 

``` 
bundle install
ebooks archive sts10 corpus/sts10.json
ebooks consume corpus/sts10.json
``` 

This went and grabbed your real Twitter account's tweets so that your bot can mimic it. If you have trouble, this is [the repo containing an example bot](https://github.com/mispy/ebooks_example) where I found this series of commands. 

Now, to actually run the bot, enter `ebooks start`. Since we only entered the bare minimum into the `bots.rb` file, your bot literally does nothing at this point, but if you saw something like: 

```
@schlinkbot: Loading model model/sts10.model
@schlinkbot: starting tweet stream
@schlinkbot: Online!
``` 

We're in good shape. To stop your bot, hit Control + c in the terminal. 

### Step 2: Give Your Bot Instructions on How to Act 

In my example above, I give you two important lines of code:

```ruby
scheduler.every '57m' do 
    statement = model.make_statement(140)
    tweet(statement)
end
```

Using a [scheduler](https://github.com/jmettraux/rufus-scheduler), this code tweets a Markov-generated "statement" that is 140 characters long every 57 minutes. Obviously you can make it tweet more or less often by changing that `57m`.

Now knowing how the model generates Markov text, let's look at how we'd instruct the bot to reply to users with a Markov statement in addition to sending statements out every 57 minutes. 

```ruby
def on_mention(tweet)
    # Reply to a mention
    statement = model.make_statment(120)
    reply(tweet, statement)
end
```

So now instead of just tweeting out the 140 characters, we are replying to whatever tweet mentioned our bot. 

<blockquote class="twitter-tweet" lang="en"><p><a href="https://twitter.com/ryanvailbrown">@ryanvailbrown</a> The last-ditch missile plan failed, sig up their Nobel Peace Prizes.</p>&mdash; Schlink Bot (@schlinkbot) <a href="https://twitter.com/schlinkbot/status/546446144445116417">December 20, 2014</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

### Restarting Your Bot

As I said above, to stop your bot hit Control + c in Terminal. To start it again, navigate to the correct directory and run `ebooks start`. 

### Running Your Bot NOT On Your Local Machine (i.e. Semi-Permanently) 

As you've probably surmised, following this guide means you'll only be able to run your bot on your local machine. As in, your bot will only tweet/reply to tweets while you're running the Ruby program. To have your bot run forever, you'll need to push your finished code to a cloud hosting service like [Heroku](https://www.heroku.com/), as the [Twitter Ebooks README](https://github.com/mispy/twitter_ebooks/blob/master/README.md) suggests. I haven't done this yet, mostly because I forget how Heroku works and I'm still frequently playing with my `bots.rb` settings. 

### Going Forward 

There are plenty more "event handlers" in the `bots.rb` file to play with-- `on_message`, `on_follow`, `on_timeline` for example. For more ideas, check out [the bots.rb file of the example bot](https://github.com/mispy/ebooks_example/blob/master/bots.rb). 
