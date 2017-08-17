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

At this point I searched Google and Twitter for other folks having this error and found one Twitter user Colin Fay had what seemed like [the same problem](https://twitter.com/_ColinFay/status/895919932663365632). I [asked Fay for help](https://twitter.com/sts10/status/896588082878844928) and he generously wrote [not 1 but 10 tweets](https://twitter.com/_ColinFay/status/896643268779421697) in an effort to help me out. 

It might well be the case that my problem was the same as Fay's, namely that "Github just updated to Jekyll pages 3.5.1, based on Liquid 4.0.0, which includes major updates, and seems to be stricter with YAML," as Fay writes. 

Thus, these problems seemed to do with publishing to GitHub. Of course, I was also using Hugo, which hadn't come up with my exchange with Fay.

## Jekyll to the Rescue

I remembered that Octopress is based on a static site generator called [Jekyll](https://jekyllrb.com/). Here are the [docs](https://jekyllrb.com/docs/home/) and [the quick-start guide](https://jekyllrb.com/docs/quickstart/), which I followed.

## Switching to Jekyll

1. Move the markdown files of all your posts to some new back up directory you create.
2. Completely delete your existing blog directory, both locally and any and all related GitHub repos. 
3. Assuming you have Ruby 2.1.0 or higher, install Jekyll with `gem install jekyll` (or, if you already have it installed update it with `gem update jekyll`). You'll also need bundler: `gem install bundler`
4. Create your Jekyll site by running `jekyll new sts10.github.io`
5. At this point let's preview the Jekyll site by running `bundle exec jekyll serve`
6. If it's all good, let's push this `sts10.github.io` to GitHub: `git --init`, `git add .`, `git commit -m "initial commit"`. Then go on Github, create a new repo called `sts10.github.io`. Then add the remote to your local directory and push it up.
7. In the GitHub repo, go to "Settings" and scroll down to the "GitHub Pages" section and click whatever button it wants you to to publish it. Your site should now be live.
8. Assuming that all worked smoothly, move your Markdown files into the `_posts` directory. Note that you may need to edit the YAML "front matter" in your Markdown posts (Jekyll's docs has [a page on this](https://jekyllrb.com/docs/frontmatter/)).

### Proper Jekyll Front Matter

Here's the YAML front matter for this post:

```text
---
layout: post
title : "Switching to Jekyll"
date: 2017-08-16 21:13:50 -0400
comments: true
---
```

You can also have `tags` but I forget that exact syntax right now. I think it'd be like this: `tags: [Jekyll, blogging]`

Note that when I transitioned from Hugo to Jekyll I had to change the front matter of all of my existing posts. This wasn't _terrible_ thanks to Vim macros.

### How to Preview Your Jekyll Site

`bundle exec jekyll serve`

### How to Create a New Post for Your Jekyll Site

At this point I'm just creating a new Markdown file in the `_posts` and copying the correct front matter over from my most recent post. Note that it's crucial that you name the file like so: 

```
YYY-MM-DD-my-blog-post-title.markdown
```

I think the `.md` filename gave Jekyll trouble, or maybe it was `.mdown`.


### How to Publish Changes to Your Jekyll Site

First, be sure you're in your Jekyll site's directory (for me `sts10.github.io/`). And then run:

```bash
jekyll build
git add .
git commit -m "update"
git push origin master
```

In a minute or two your site should be updated.

### Adding Disqus Comments to Your Jekyll Site

If you're using Jekyll's default theme, [Minima](https://github.com/jekyll/minima), adding Disqus comments to your Jekyll site is [pretty simple](https://github.com/jekyll/minima#enabling-comments-via-disqus). In `_config.yml`, add the following two lines:

```yaml
disqus: 
  shortname: <your-disqus-shortname>
```

From the [Minima README](https://github.com/jekyll/minima#enabling-comments-via-disqus): "You can find out more about Disqus' shortnames [here](https://help.disqus.com/customer/portal/articles/466208)." (I didn't know what mine was off the top of my head.) Also: "If you don't want to display comments for a particular post you can disable them by adding comments: false to that post's YAML Front Matter."

## Downsides to the Switch

The only downsides for me so far have been:

1. I stuck with the default theme because I don't really care about that sort of thing these days, but it doesn't seem like there are a ton of theme options (which surprises me). Also, the themes are installed as Ruby gems, so the layout files are not contained in your Jekyll directory but elsewhere, wherever your Ruby gems get installed.
2. All my blog post permaURLs changed, such that all the old ones I made with Hugo over the last few months are dead.
3. The workflow to create a new post is a little lo-fi for me, but I could definitely write a bash script to do it for me.
