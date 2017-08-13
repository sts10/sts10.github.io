+++
title= "Git Trick For When You're In Trouble"
date= "2014-10-15 21:03:17 -0400"
comments = "true"
+++

Do you ever find yourself a few commits into trouble on an important branch like `master`? I know I do (and just did). 

One way to turn back the clock is to run `git log`, find the commit code for where things were OK, and then run `git checkout -b recover bfc6c06`. You'll get a new branch called `recover` to collect yourself. Then you probably want to `git branch -D master` then, from the `recover` branch, run `git checkout -b master` to start a fresh `master` branch from the good `recover` branch. 
