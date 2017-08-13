+++
title= "URL Parameters as Semi-Permanent User Settings"
date= "2015-05-20 17:14:35 -0400"
comments = "true"
+++

In my eight months at BuzzFeed I've written a fair bit of code when the occasion calls for it. 

I wanted to share what I think is a particularly good bit of code I've pushed to the BuzzFeed servers. It's not flashy or "clever" or particularly efficient-- just a simple JavaScript block mostly dedicated to basic control flow and variable assignment. What I like about it is the problem it solves for the project it lives in (a screenshot-building tool). 

<!-- more -->

We'll get to the problem it fixes in a minute. First, here's the code block:

```javascript
if (location.search){
    var country = location.search.slice(-2).toLowerCase();
}
if (country && country == "fr"){
    var logoURL = "imgs/france.png";
} else {
    var logoURL = "imgs/news.png";
}
```

The only thing that might not be obvious is that [`location.search` property](http://www.w3schools.com/jsref/prop_loc_search.asp), which simply takes the current webpage's URL and gives you everything after and including a question mark. 

W3's example: Assume that the current URL is: 

http://www.w3schools.com/submit.htm?email=someone@example.com 

If you run `var x = location.search;` x will be: 

`"?email=someone@example.com"`, a string. 

`slice(-2)` takes the last 2 characters of a string, and `toLowerCase()` converts a string to, you guess it, lower case. 

OK, now, on to the problem I needed to solve. 

I built our screenshotting tool to give the user an option to add a @BuzzFeedNews logo, as seen below. 

<blockquote class="twitter-tweet" lang="en"><p lang="en" dir="ltr">After Sanctions, Cisco Altered Sales Records in Russia <a href="http://t.co/kaYBOQds6J">http://t.co/kaYBOQds6J</a> <a href="http://t.co/bpXE1wLTP0">pic.twitter.com/bpXE1wLTP0</a></p>&mdash; BuzzFeed News (@BuzzFeedNews) <a href="https://twitter.com/BuzzFeedNews/status/601102020200820737">May 20, 2015</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

We wanted it to be optional to add the logo, so I put in a check-box labeled "Add BuzzFeedNews Logo," added a slightly-complex jQuery listener, and that was that. All good. 

Then few weeks later, our BuzzFeed France team wanted to use the tool as well, but wanted to use a BuzzFeed France logo rather than the News image. 

<blockquote class="twitter-tweet" lang="en"><p lang="fr" dir="ltr">Pourquoi Ben Laden avait-il autant de livres sur la France dans sa bibliothèque? &#10;<a href="http://t.co/ve6zq7NZNz">http://t.co/ve6zq7NZNz</a> <a href="http://t.co/Nke1hWd9mM">pic.twitter.com/Nke1hWd9mM</a></p>&mdash; BuzzFeed France (@BuzzFeedFrance) <a href="https://twitter.com/BuzzFeedFrance/status/601045795169767424">May 20, 2015</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

I had two knee-jerk solutions to this problem: (a) Add a drop-down menu (using the HTML select tag) next to the check-box with "News" and "France" as two options, or (b) create a wholly new set of HTML/CSS/Javascript files for the France version, with the only difference being the France version uses a different image file when it adds the logo. 

Neither of these are optimal. The first option requires the user to set yet another setting each time (if I made News the default, France would have to change it every time, and visa versa if I did the opposite), and the 2nd option requires that I maintain two versions of the code, implementing new features and fixing bugs on not one but two versions of the tool (and obviously more departments might request this in the future, thus increasing the number of versions). 

But then I got to thinking. I considered that you can visit the BuzzFeed France site by simply putting a `country` parameter in the URL (i.e. [http://www.buzzfeed.com/?country=fr](http://www.buzzfeed.com/?country=fr)). Interesting... 

Then I noted (and you couldn't know this till right now) that the URL for this tool is pretty long and ugly. I don't have any analytics in place, but I can say relatively confidently that nobody types in the URL each time they visit the tool-- they simply have a browser bookmark pointing to it. It would be easy for me to send the France team a URL with a parameter specified in it and just tell them to bookmark that URL and visit it whenever they wanted to use the tool. 

So now I just needed a way to access these URL parameters in JavaScript. I quickly found [this Stack Overflow answer](http://stackoverflow.com/questions/979975/how-to-get-the-value-from-the-url-parameter) that provides a claims to be a pretty robust function for doing just that. But since I only needed to have one parameter (country), I didn't need to implement the full function described in the Stack Overflow answer, just the `location.search` part. 

At this point I decided I wanted the tool to use the News logo if no "country" parameter was specified. 

So with all that laid out, the code block should make more sense. Here it is again: 

```javascript
if (location.search){
    var country = location.search.slice(-2).toLowerCase();
}
if (country && country == "fr"){
    var logoURL = "imgs/france.png";
} else {
    var logoURL = "imgs/news.png";
}
```

Once we get to the end of the block, the variable `logoURL` is assigned based on the URL parameter, and the rest of the code can proceed as if there's only one version. Assuming all users (or really just the France ones) are visiting the tool via a bookmark, users never have to set with logo they want to use AND I only have to maintain one version. 

### Toward a Theory About User Settings and Change Frequency 

On a higher, UX level, this got me thinking about the nature of "settings" or "user settings." I'm no UX expert, and maybe this idea has been described more thoroughly by someone else somewhere else, but let's humor this for a minute. 

Note: A few months ago I wrote about [the benefits of settings being saved as text](https://medium.com/@sts10/why-i-want-text-file-preferences-for-every-application-i-use-72c368f9b6fd), which I still think is interesting, but this is a bit different. It's about how frequently settings need to be changed by the user. 

We might categorize settings by how frequently a given user needs to change them. Some settings (a) need to be changed by the user frequently, easily and quickly from one use to the next. Other settings (b) have a slightly longer life-- they're only changed in 10% of uses. And then lastly there are settings (c) that are rarely if ever changed by the user (maybe each user sets them early on and the product is expected to remember these settings. Your browser's homepage for example). Maybe we can call it the frequency spectrum. 

Now, my working theory is that the goal of the product maker (designer? manager?) is to try to match how frequently a setting needs to be adjusted with how easy it is to change it. If a setting doesn't need to be changed ever time, it should be set more permanently somehow, without the user having to think about it (or even be presented with the opportunity to change it outside of, say, a user settings menu). 

One way to handle these less-frequently changed settings (say, type B and C settings) is to set sensible defaults. For example, the quote text on the screenshot tool is set by default to align left, but there is a check-box option to justify the text if the user prefers that. Some users will never change this setting. It does cost a bit to all users in terms of what we might call visual confusion, but as a single check-box it's not very obtrusive. 

If different users are going to set type B and C settings differently, the obvious solution is to store these settings on a per user level somewhere and have users log-in. This has obvious benefits over the sensible default solution, but I wanted to avoid the weight of that for this tool. I wanted to keep this tool as a simple browser-running JavaScript-- no user database. 

### Back to the Screenshot Tool

Now for better or worse, most of the settings on the screenshot tool are type A: whether you want to add a background photo, what the text of that photo credit is, what color you want to make the text, etc. And thus they are set up to be changed easily (with defaults as sensible as I could set, such as black text color). 

The logo choice, by contrast, is a rare C option-- BuzzFeed France editors will almost never want to use the News division's logo and visa versa. Our sensible default trick (as we used in the case of text alignment) isn't much help here, since making either setting the default will not be sensible for one group of reporters and editors. So we have a problem. 

The problem is we need a way to store a type C setting without implementing a user database or, ideally, making a wholly new product. My solution, which I think is pretty creative, was to use the URL parameter scheme described above. 

### Hard-Coded vs. User-Set vs. Dynamic Settings?

Let's call all options that fall from A to C "user-set options," since they all can be set by the user. 

Now there are some "settings" that are unchangeable by the user (i.e. "hard-coded" by the developer). An example of that is that the screenshot tool offers no way to move the photo credit text-- it is always in the bottom left-hand corner of the image. These are past type C-- they can not be changed by the user. In some ways these are the cheapest on the user-- in other words if the developer wishes to maximize simplicity, she should strive to maximize the number of settings that are hard-coded. 

On the other side of the spectrum, there are some settings that are not set by the user but they do change from use to use. These are dynamic settings. In my screenshot tool, the font size of the quote text automatically adjusts so that your text always fits in a given box. The user does have the option to increase or decrease the font size "manually," but the tool by default sets this setting dynamically. Maybe that's a sort of "smart" sensible default? Maybe the dynamic solution to the country problem would be to have the tool know where the user is geographically and go for there (though of course the next department to request their own logo in the tool could be our Food or Style team, which may be spread out geographically...) 







