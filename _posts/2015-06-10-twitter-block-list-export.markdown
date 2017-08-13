+++
title= "Why I Think Twitter's New Export Blocked User List Feature Is Super Important"
date= "2015-06-10 19:54:02 -0400"
comments = "true"
+++
Today Twitter [announced that users can export and import lists of blocked users](https://blog.twitter.com/2015/sharing-block-lists-to-help-make-twitter-safer). I don't have the feature on my personal account yet, but a co-worker did and I saw that when you do export, you download a CSV file (Comma Separated Values--basically a software-agnostic spreadsheet). I'm assuming the import side of the feature expects the same file format. 

![export screenshot](https://g.twimg.com/blog/blog/image/Export_Screenshot_1.png)

<!-- more -->

I think this is super, super important. I've written previously about [why I want all my application preferences to be stored as text](http://sts10.github.io/blog/2015/02/18/text-file-preferences/)-- the main reasons are (1) your settings become extremely portable, and (2) your settings become very easy to share. By allowing all users to export and import CSV lists of block users, Twitter is effectively making this one setting-- a user's blocked user list-- a text-file preference. 

(Note that the Twitter Rest API already offers developers [access to the authenticating user's block list](https://dev.twitter.com/rest/reference/get/blocks/list) and [ability to make new blocks](https://dev.twitter.com/rest/reference/post/blocks/create), so this _technically_ isn't a new functionality, but it is still a new text-file settings for users. I'm kicking myself for not figuring out the potential power of sharing blocked lists before today. But let's keep going here.)

What does "portability" and "shareability" look like for blocked lists? First, by portability I mean that if for some reason Twitter "lost" or deleted your blocked list, as long as you had downloaded a CSV recently, it's super easy to import that CSV and restore your list.

<blockquote class="twitter-tweet" lang="en"><p lang="en" dir="ltr">ugh Tweetdeck you got rid of all my mutes</p>&mdash; Shani ◉. Hilton (@shani_o) <a href="https://twitter.com/shani_o/status/598560037343240192">May 13, 2015</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

Also, let's say a Twitter competitor comes along. It could offer its users the opportunity to upload their Twitter blocked list and then do its best to block the same people on the new service. So that's portability. 

The far more interesting advantage Twitter has given its users here is in the shareability of these blocked lists. As [The Next Web writes](http://thenextweb.com/twitter/2015/06/10/twitter-now-lets-you-share-a-list-of-blocked-accounts-with-others/) 

> It’s a particularly useful feature for communities on Twitter who may suffer from frequent harassment by the same Twitter accounts, as such the women who were targeted during Gamergate, for example.

> This way, users can simply share a list of the misbehaving accounts with others who may be victimized by the same accounts. Of course, you could achieve the same effect manually, but this is much quicker, especially for people who have blocked dozens or even hundreds of accounts. 

TNW almost says it (hell, [Twitter press release has "share" in the headline](https://blog.twitter.com/2015/sharing-block-lists-to-help-make-twitter-safer)), but to me it seems plain: the next step is to establish a hub for these spreadsheets. Groups of users would be able to connect and pool their blocked lists together, privately. The hub would then merge all of the group's members lists together, and offer each user the ability to download and import the collective list. Hell, you could even call it Ban Men. 

I _think_ that is going to happen and work out and be super awesome in its own right, but if such a hub were made and well-used, it could also show more people the power of being able to freely and easily share (and compare/merge) settings and preferences, something that users are all but guaranteed when offered the option of exporting and importing a given setting to a neutral, text-based format like CSV. But this doesn't explain why such a hub hasn't emerged via the API endpoints I mention above... Did no one think of this idea?

**UPDATE!** OK so since publishing this post, [Anil Dash has tweeted](https://twitter.com/anildash/status/608795708624257024) about two projects that traffic in shared block lists. One is [Block Together](https://blocktogether.org/) which looks like what I'm describing above? The other is from [@freesbdsgirl](https://twitter.com/freebsdgirl) who has [a Perl script called ggautoblocker](https://github.com/freebsdgirl/ggautoblocker) that looks like it focuses on one shared list specifically around GamerGate. Glad this has been happening via the API! 

Another way to think of it: The more conventional way for a large, talent-and-cash-rich company like Twitter to offer this feature would have been something like "shared blocked lists". The company would introduce functionality for users to privately pool their blocked lists together in a private group, and then each member of the private group would be able to expand their personal blocked list to the collective blocked list of the entire group (or some portion), all within the company's site, without providing an opportunity for users to export or import to a neutral, text-based format. 

How does Twitter expect users to share these lists? Emailing the CSVs and importing without merging with your current lists. Maybe when you import another user's list it gives you the option to merge it with your current blocked list? That'd be pretty smart, but wouldn't replace the hub I mention above I don't think. 

Regardless, I am super excited about this development from Twitter. Fuck yeah! 
