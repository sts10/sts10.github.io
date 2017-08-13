+++
title= "Amazon Prime Days"
date= "2015-07-16 21:02:47 -0400"
comments = "true"
+++

Right, so yesterday, July 15th, 2015, was [Amazon's first "Prime Day"](http://www.theverge.com/2015/7/15/8968881/amazon-prime-day-best-deals). They offered a bunch of deals (which turned out to be [pretty](http://money.cnn.com/2015/07/15/news/amazon-walmart-prime-day-customers/) [crummy](http://www.wired.com/2015/07/shoppers-frustrated-prime-day/)) to their Prime customers. Whatever! 

But why did they choose July 15th, a ["Wednesday in the middle of the summer doldrums"](http://www.cnet.com/news/amazon-takes-a-victory-lap-for-prime-day/)? 

As [The Verge points out](http://www.theverge.com/2015/7/15/8968881/amazon-prime-day-best-deals), the company is celebrating 20 years of existence ("Bezos incorporated the company as 'Cadabra' on July 5th, 1994 and the site went online as Amazon.com in 1995," [Wikipedia informs](https://en.wikipedia.org/wiki/Amazon.com#History)). So they could have had this special day on the 5th, right? 

But here's another theory that came about when one of our editors at BuzzFeed asked this question: 

<!-- more -->

<blockquote class="twitter-tweet" lang="en"><p lang="en" dir="ltr">Amazon could&#39;ve at least had Prime Day on a date that was an actual prime number, I mean really</p>&mdash; Doree Shafrir (@doree) <a href="https://twitter.com/doree/status/621332582903361536">July 15, 2015</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

Shafrir then retweeted two of the responses:

<blockquote class="twitter-tweet" lang="en"><p lang="und" dir="ltr"><a href="https://twitter.com/doree">@doree</a> <a href="https://twitter.com/BuzzFeed">@BuzzFeed</a> 7+15+15=37?</p>&mdash; Michael Carlock (@cikemarlock) <a href="https://twitter.com/cikemarlock/status/621335213961027584">July 15, 2015</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet" lang="en"><p lang="en" dir="ltr"><a href="https://twitter.com/doree">@doree</a> <a href="https://twitter.com/blaiseastra">@blaiseastra</a> It is, going by computer dates! Today is 16631 (days since Jan 1, 1970), a prime number.</p>&mdash; The Rev Dr Kestrel (@revdrkestrel) <a href="https://twitter.com/revdrkestrel/status/621336885684760576">July 15, 2015</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

So we have a theory! Amazon selected July 15th, 2015 for their first Prime Day because the date satisfied both of these requirements. The two digit year + month + day must sum to a prime number, and the number of days since January 1st, 1970 (the start of Unix time) must be a prime number as well. 

Once I saw this I just had to know two things: (1) How many of these "prime days" had there been since January 1st, 1970, and (2) if Amazon was going to have another Prime Day next year, which dates (if any) would be open to them if they were to stick to both of these requirements? 

<blockquote class="twitter-tweet" lang="en"><p lang="en" dir="ltr">How often this happens is such a good programming question cc <a href="https://twitter.com/FlatironSchool">@FlatironSchool</a> <a href="https://t.co/rZigxphU2z">https://t.co/rZigxphU2z</a></p>&mdash; Sam Schlinkert (@sts10) <a href="https://twitter.com/sts10/status/621341756404178944">July 15, 2015</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

To Ruby! 

```ruby
# Makes array of dates where (day + month + last_two_digits_of_year) and number of days since Jan 1, 1970 have both been prime since Jan 1, 1970
require 'prime'
require 'date'
 
def date_to_sum(date)
    date.month + date.day + date.year.to_s[2..-1].to_i
end

date_to_go_up_to = Date.today

first_day = Date.parse('1970-01-01')
this_day = first_day
days_since_jan_1_70 = 0
days_it_happened = []
 
while this_day <= date_to_go_up_to
    if Prime.prime?(days_since_jan_1_70) && Prime.prime?(date_to_sum(this_day))
        puts "it happened on #{this_day.to_s} because #{days_since_jan_1_70} and #{date_to_sum(this_day)} are both prime numbers."
        days_it_happened << this_day 
    end
    this_day = this_day + 1
    days_since_jan_1_70 = days_since_jan_1_70 + 1
end
 
puts "Between #{first_day} and #{date_to_go_up_to}, there were #{days_it_happened.size} 'prime days'."
```


This little script (also [a gist](https://gist.github.com/sts10/a44b0d57e9fdf2f5dca4) that I [tweeted](https://twitter.com/sts10/status/621352450252009472)) goes through every day from Jan. 1, 1970 up to today (or whatever date you set `date_to_go_up_to` to) and prints out all the "prime days" between those two dates. It also tells you at the end how many "prime days" occurred between the two dates. (The key lines are 16 and 17-- the `while` loop and the `if` statement.)

Results: Between Jan 1, 1970 and July 15, 2015 there were 447 "prime days". More than I would have thought? 

Also, assuming that this new holiday would be successful for Amazon, I assumed they would want to do it again. But July 15th, 2016 definitely would not be a "prime day"... so when would they hold it? Thus I went about finding all the prime days between Jan 1, 2015 and Jan 1, 2017:

```
it happened on 2015-03-25 because 16519 and 43 are both prime numbers.
it happened on 2015-04-04 because 16529 and 23 are both prime numbers.
it happened on 2015-04-22 because 16547 and 41 are both prime numbers.
it happened on 2015-04-28 because 16553 and 47 are both prime numbers.
it happened on 2015-07-15 because 16631 and 37 are both prime numbers.
it happened on 2015-08-14 because 16661 and 37 are both prime numbers.
it happened on 2015-09-13 because 16691 and 37 are both prime numbers.
it happened on 2016-05-10 because 16931 and 31 are both prime numbers.
it happened on 2016-05-16 because 16937 and 37 are both prime numbers.
it happened on 2016-05-22 because 16943 and 43 are both prime numbers.
it happened on 2016-10-03 because 17077 and 29 are both prime numbers.
it happened on 2016-11-02 because 17107 and 29 are both prime numbers.
```


Today, Thursday the 16th, [Amazon says Prime Day orders beat last year's _Black Friday_, and on Thursday the company's shares hit a record high](http://www.reuters.com/article/2015/07/16/us-amazon-com-primeday-idUSKCN0PQ29J20150716?feedType=RSS&feedName=technologyNews). Thus it makes sense [that they're planning to do it again](http://www.cnet.com/news/amazon-takes-a-victory-lap-for-prime-day/):

>"Going into this, we weren't sure whether Prime Day would be a one-time thing or if it would become an annual event," Greg Greeley, vice president of Amazon Prime, said in a statement. "After yesterday's results, we'll definitely be doing this again."

But what day will they hold the event next year? And, more importantly, how can I buy $AMZN futures specifically for the weeks of the days in 2016 that I spell out above?
