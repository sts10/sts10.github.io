+++
date = "2017-03-30T22:28:41-04:00"
title = "Moving to Hugo"
comments = "true"
tags = []
subtitle = ""

+++

A couple of weeks ago I was [proud of myself for switching from RVM to rbenv](https://twitter.com/sts10/status/839933857679949829). The reason I made the switch was that I wanted something light-weight and I didn't like the RVM installation process, in particular the need to use the GPG command line tool.

The problem was that after I installed a fresh copy of Ruby 2.4.0 with rbenv, I wasn't able to deploy this blog using my very old version of Octopress. I got an error that some specific version of a gem was not available. The gem that it couldn't find must have been a dependency of one of the other gems. Anyway, I wsa stuck, unable to update my blog. I had been meaning to move off of Octopress anyway, since it had been so long since I set it up I was worried that if I moved to a new computer I'd be stuck. This gem problem was as good an impetus as any. (Though note I believe there is [a newer version of Octopress](https://github.com/octopress/octopress) out there.)

After not doing any research (which is unlike me) and sending [a random call out tweet](https://twitter.com/sts10/status/846463935184355328), I decided on [Hugo](https://gohugo.io). The only way I had heard of it was because [the Ricochet IM site](https://ricochet.im/) uses it. I like those developers, so I figured they had chosen a good, new static site generator. Plus it's written in GoLang so it must be good, right? So earlier tonight I dove into [the docs](https://gohugo.io/overview/introduction/).

If you're thinking about making the transition from Octopress to Hugo, you may want to checkout [octohug](https://github.com/codebrane/octohug). I ended up doing it by hand / Vim macros.

For now I'm using the [Beautiful Hugo](http://themes.gohugo.io/beautifulhugo/) theme... think it looks pretty good! Unfortunately the URL structure is different than when I used Octopess, so any and all external and even internal links are going to be busted. I'll try to fix them as I find them. I also decided to wipe my tag data cuz I was lazy making the transition. The only thing left to do is to add Disqus comments.


For posterity, here are some notes I took when I made the move: 

## Setting Up the Hugo Blog

I went [here](https://gohugo.io/tutorials/github-pages-blog/) and followed the instructions under "Hosting Personal/Organization Pages". 

1. Delete sts10.github.io repo from Github
2. Create on Github "blog-hugo" repo. This is going to be the larger repo, aka the Hugo home directory. Add remote to current blog-hugo directory.
3. Preview it with `hugo server`. 
4. In my reading of the instructions linked to above, I thought I was supposed to run `rm -rf public` at this point, but that ended up derailing the `git submodule` step for me?
5. Create on Github "sts10.github.io" repo
6. `git submodule add -b master git@github.com:sts10/sts10.github.io.git public`
7. Set up the suggested `deploy.sh` script, adding the `-t` flag and your chosen theme.
8. `./deploy.sh "Your optional commit message"`

## Creating a New Post

`hugo new post/good-to-great.md`

Then go open the file and edit it in your preferred text editor.

## Preview Changes/ New Posts

`hugo server`

## Deploying new blog

`/.deploy.sh`

Then, optionally, commit and push the home (bigger) repo.



