+++
title= "Basic Begin-Rescue-Pry Pattern"
date= "2015-08-24 20:17:41 -0400"
comments = "true"
+++

Sometimes I get an error on a seemingly-random iteration of a loop that occurs many times. Normally I would drop in in a `binding.pry` from the [Pry Ruby gem](https://github.com/pry/pry), but this is not always a sufficient solution, since I'd have to `exit` through all the successful iterations until I found the error.

<!-- more -->

The smarter way to do this is to use `begin`/`rescue` blocks to ensure `binding.pry` is only called when (any) error is thrown. Here's a generic example:

```ruby
begin 
  # troublesome code where the error is occurring 
rescue
  binding.pry
end
```

With this code in place, the `binding.pry` will only be called when the trouble code line or block generates an error of any kind, thus taking you straight to the first problematic iteration. 
