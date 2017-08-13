+++
title= "Google Doc Spreadsheet IF Statements"
date= "2015-08-11 21:01:50 -0400"
comments = "true"
+++

I was working in a shared Google Doc Spreadsheet this week and needed to figure out how to use `if` statements. It turns out it's pretty simple! 

[Here is a support.google.com post on if statements](https://support.google.com/docs/answer/3093364?hl=en). And here is [a more-advanced, view-only Google Doc](https://docs.google.com/document/d/1xSEyv2o5tkyWPdOZcPZQH_Wf0qwYjQS2ecj_aqEFDss/edit) I found that outlines some more advanced options like `=AND()` and `=SUMIF()`. But here's a quick example with the basic `IF`:

<!-- more -->

The general example is: 
```
=IF(logical_expression, value_if_true, value_if_false")
```
Let's say we're got column A full of both positive and negative numbers. Then in column B we want it to say "Yes" if that row has a positive number or a 0 in its A column, and "No" if column A is negative.

In B1 we'd write something like `=IF(A1>=0,"Yes","No")`, then we'd drag that formula down the B column.

![simple if statement example](http://i.imgur.com/rhgAbtz.png) 

The Ruby equivalent of this would be something like: 

```ruby
if (A1 >= 0)
  "Yes"
else 
  "No"
end
```

But what if we wanted it to say "Neutral" when the A column is 0? Effectively this: 

```ruby
if (A1 > 0)
  "Yes"
elsif (A1 == 0)
  "Neutral"
else 
  "No"
end
```

To accomplish this `elsif` structure with the Google Spreadsheet `IF`, you have to do something like this: 

```
=IF(A1>0,"Yes",IF(A1=0,"Neutral","No"))
```

As you can see, to utilize an `elsif` you need to _nest_ an `IF` into the `value_if_false` part of the master `IF` statement. It makes sense, but it can certainly get messy if you have a lot of them.  
