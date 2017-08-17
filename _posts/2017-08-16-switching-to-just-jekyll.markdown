---
layout: post
title : "Switching to Jekyll"
date: 2017-08-16 21:13:50 -0400
comments: true
---

A few months ago I hit a Ruby gem-based error when trying to publish my blog via [Octopress](https://github.com/octopress/octopress) and decided [to switch to a static site generator called Hugo](https://sts10.github.io/2017/03/30/moving-to-hugo.html).

What do you know, but over the weekend I ran into another, different difficult error when trying to update my blog using Hugo. Basically I ran the Hugo suggested `deploy` script and shortly there after got an email from Github, the body of which read:

```text
The page build failed for the `master` branch with the following error:

Page build failed. For more information, see https://help.github.com/articles/troubleshooting-github-pages-builds/.

For information on troubleshooting Jekyll see:

 https://help.github.com/articles/troubleshooting-jekyll-builds

If you have any questions you can contact us by replying to this email.
```
 
I of course just tried to run the build script again, but I got another, identical email. 

## Switching to Jekyll

1. Completely delete your existing blog directory, both locally and any and all related GitHub repos. 
2. Assuming you have Ruby 2.1.0 or higher, install Jekyll with `gem install jekyll` (or, if you already have it installed update it with `gem update jekyll`). You'll also need bundler: `gem install bundler`
3. Create your Jekyll site by running `jekyll new sts10.github.io`
4. At this point let's preview the Jekyll site by running `bundle exec jekyll serve`
5. If it's all good, let's push this `sts10.github.io` to GitHub: `git --init`, `git add .`, `git commit -m "initial commit"`. Then go on Github, create a new repo called `sts10.github.io`. Then add the remote to your local directory and push it up.
6. In the GitHub repo, go to "Settings" and scroll down to the "GitHub Pages" section and click whatever button it wants you to to publish it. Your site should now be live.

### How to Preview Your Jekyll Site

`bundle exec jekyll serve`

### How to Publish Changes to Your Jekyll Site

`jekyll build`
`git add .`
`git commit -m "update"`
`git push origin master`
