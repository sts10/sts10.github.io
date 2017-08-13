+++
title= "Connecting Twitter Bots"
date= "2015-08-25 19:40:59 -0400"
comments = "true"
+++

Over the past few weeks I've been chipping away at a little side-project I dreamt-up around 3am one morning. I wanted to make two Twitter bots who would play Connect Four against each other over and over again. I got the idea after I, human Sam, played an emoji-based game of Connect Four with the Twitter account for the Las Vegas Review Journal after the account tweeted this:

<blockquote class="twitter-tweet" lang="en"><p lang="en" dir="ltr">|⚪️⚪️⚪️⚪️⚪️⚪️⚪️|&#10;|⚪️⚪️⚪️⚪️⚪️⚪️⚪️|&#10;|⚪️⚪️⚪️⚪️⚪️⚪️⚪️|&#10;|⚪️⚪️⚪️⚪️⚪️⚪️⚪️|&#10;|⚪️⚪️⚪️⚪️⚪️⚪️⚪️|&#10;|⚪️⚪️⚪️🔵⚪️⚪️⚪️|&#10;&#10;Your turn.</p>&mdash; Las Vegas RJ (@reviewjournal) <a href="https://twitter.com/reviewjournal/status/622095012931596288">July 17, 2015</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

<!-- more -->

(Not to brag, but I eventually won against who I later learned is the Audience Development Director at the Las Vegas Review Journal, [Stephanie Grimes](https://twitter.com/stephgrimes).)

<blockquote class="twitter-tweet" lang="en"><p lang="en" dir="ltr"><a href="https://twitter.com/reviewjournal">@reviewjournal</a> was fun! see you in the adAge/poynter story &#10;&#10;|⚪️⚪️⚪️🔴🔵⚪️⚪️|&#10;|⚪️⚪️⚪️🔵🔴⚪️⚪️|&#10;|⚪️⚪️🔴🔴🔵⚪️⚪️|&#10;|⚪️⚪️🔵🔴🔵⚪️⚪️|&#10;|⚪️🔴🔴🔵🔴🔵⚪️|&#10;|🔴🔵🔵🔵🔴🔴🔵|</p>&mdash; Sam Schlinkert (@sts10) <a href="https://twitter.com/sts10/status/622116122767265792">July 17, 2015</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

A week or two later I was remembering [a Medium post by Anil Dash](https://medium.com/message/the-internet-of-tweets-581cb63ece80) on what Twitter could have been, specifically this section on smart devices communicating with each other via Twitter accounts: 

>Twitter enables connections between accounts. What exists today as a social network between people who follow and reply to each other could tomorrow expand to be an information network between devices that could follow and reply to each other. Telling your smart smoke detector not to set off the alarm when the smart toaster has said it's about to burn the toast is currently a task for only the most stalwart geeks. There's no reason that kind of connection couldn't be a new use for the "follow" button.

And I thought, what if I could make two Twitter bots that played Connect Four over Twitter, using an emoji board as Stephanie and I did? Just to see what challenges presenting themselves.

The first task was to create a command line "bot" that could play Connect Four against a human (me). This took longer than I expected, even in my beloved Ruby! I ended up using an object I called a ["surface"](https://github.com/sts10/connect_four/blob/master/lib/surface.rb), which is meant to represent any given point on the board. (Note: I pushed this CLI human-vs-bot version to a git branch called [no-twitter](https://github.com/sts10/connect_four/tree/no_twitter).) 

Then (in the [master branch](https://github.com/sts10/connect_four)), I incorporated some basic Twitter publishing and threading (replying) functionality. And voila! [A game of Connect Four](https://twitter.com/schlinkbot/status/636348135695122432) between two automated Twitter bots! 

<blockquote class="twitter-tweet" lang="en"><p lang="und" dir="ltr"><a href="https://twitter.com/kitty_1878">@kitty_1878</a>&#10;&#10;|⚪🔵⚪⚪⚪⚪⚪|&#10;|⚪🔴⚪⚪⚪⚪⚪|&#10;|⚪🔵⚪⚪🔵⚪⚪|&#10;|⚪🔵⚪🔴🔴⚪⚪|&#10;|⚪🔵🔵🔴🔴🔵🔴|&#10;|🔴🔴🔴🔵🔴🔵🔵|</p>&mdash; Schlink Bot (@schlinkbot) <a href="https://twitter.com/schlinkbot/status/636348135695122432">August 26, 2015</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

### Wait, Where Is This? How Do I See It? 

Just to spell it out, the two bots are currently [@Schlinkbot](https://twitter.com/schlinkbot/with_replies) and [@kitty_1878](https://twitter.com/kitty_1878/with_replies). Note that since they only reply to each other, if you want to see the game being played in your timeline, you have to follow both of them. 

And here's the [GitHub repo](https://github.com/sts10/connect_four). 

### Big Caveat

So, the big caveat with this version is that the two bots aren't *actually* communicating back forth over Twitter. In other words the two bots aren't (yet) operating independently. Moves are traded from one bot to the other through the `game` object, rather than solely through tweets. However I designed the models with this ultimate goal in mind, and with a few more hours of development I think I can pretty easily get to this ultimate goal. For now I just wanted to share because it seems like, for now, that I got it to work. 

### Handling Emojis in Ruby

Going into the project I knew one of the bigger challenges was going to be handling emojis. In what I hope will be a later version of the project, the two bots will only be in contact via Twitter (see "caveat" section above). In that version, the bots would need the ability to both "read" and "write" these three circle emojis-- the same ones that Stephanie chose for our initial human game. 

Naturally there are a few Ruby gems designed to make handling emojis easier. After trying a few I found that [Rumoji](https://github.com/mwunsch/rumoji) ([Rubygems.org page](https://rubygems.org/gems/rumoji/versions/0.4.1)) fit my needs the best. 

Since the current bots only write emojis, so far I've only used Rumoji's `decode` method, which converts the :colon: syntax into the actual emojis: 

```ruby 
def tweet_board(game, id_to_reply_to)
  text_to_tweet = "@#{@opponent}\n\n"
  i = 5
  6.times do 
    text_to_tweet = text_to_tweet + "|"
    @board[i].each do |space|
      if space == 0
        text_to_tweet = text_to_tweet + Rumoji.decode(":white_circle:")
      elsif space == 1
        text_to_tweet = text_to_tweet + Rumoji.decode(":red_circle:")
      else
        text_to_tweet = text_to_tweet + Rumoji.decode(":large_blue_circle:")
      end
    end
    text_to_tweet = text_to_tweet + "|\n"
    i = i - 1
  end
  self.tweet(text_to_tweet, id_to_reply_to)
end
```

When I get around to making the bots _read_ emojis, I hope to use Rumoji's `encode` method, which takes a string containing actual emojis and converts them back to the :colon: syntax. 

Here's the example the gem's creator uses in [the GitHub repo](https://github.com/mwunsch/rumoji):

```ruby
puts Rumoji.encode("Lack of cross-device emoji support makes me 😭")

#=> Lack of cross-device emoji support makes me :sob:
```


