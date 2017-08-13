+++
title= "Making Octopress Easier with ink"
date= "2014-02-06 22:41:28 -0500"
comments = "true"
+++


### A Contextualizing Introduction 

Before I became a student at the Flatiron School I was a journalist of sorts, most recently as a social media editor at The Daily Beast. I’ve always been interested in what the media industry calls Content Management Systems (CMS)— the software that a publication uses to publish its product. The CMS dictates their workflow, and therefore effects everything from their response time to breaking news to how well they can present long-term, complex interactive projects. 

I believe many journalistic enterprises— young and old, online and in print— could function much smoother and produce higher quality journalism faster and more easily if they paid more mind to their CMS and workflow. 

<!-- more -->

That said, it’s not like there’s some perfect system out there. For example, I’ve used Tumblr for year nows. I don’t love the interface, but the community, aided by the Dashboard and the like and reblog functionality has kept me interested. But I’m always on the look out for something smoother.

This past week, inspired mainly by past Flatiron students, I’ve been exploring [Octopress](http://octopress.org/), a “blogging framework” tailored to developers. Intrigued, I cloned the [code directory](https://github.com/imathis/octopress) and tentatively flirted with the idea of leaving my beloved Tumblr.

<!-- more -->

### Octopress: Initial Impressions

As I grew more comfortable with both Git and the terminal over the course of my first week at Flatiron, I gradually began to understand to merits of a blogging system that could be operated, customized, and deployed using those programs. 

However, I quickly noticed how clunky the process of publishing a new post was. Here’s how I currently understand the steps: 

1. In terminal, cd your way into your user.github.io folder
2. rake new [“post title”]
3. cd your way two levels down to source/_posts
4. call “open” on the new file you created 
5. write your new post
6. save (command + s) your post in your editor. 
7. cd back up to your user.github.io folder
8. call rake generate, and then rake deploy (assuming you don’t want to preview the changes with rake preview)
9. git add, commit, and push the source branch of your GitHub. 

Ah! There must be something we can do to shorten this process! If Flatiron instructors are telling me to use my limited brain power to store Sublime Text keyboard shortcuts, shortening this process must be worth spending some time on. 

### What I Built

Over the course of a couple of late nights during my first week, I built [ink](https://github.com/sts10/ink), a shell script that tries to cut out as many of the above 9 steps in a logical way. Here is the basic workflow:

1. From anywhere in the terminal, type ink “blog post title”
2. Default markdown editor opens a new file, which is already saved in your source/_posts folder with your title. 
3. write your post
4. save (command + s) your post in your editor
5. Return to your terminal window. Here you’ll find ink is already presenting you with 4 choices. Selecting choice “p” (publish) commits and pushes your new post to your source branch on Git and runs Octopress’s ```rake generate``` and ```rake deploy``` commands to publish your blog to GitHub. 

And that’s it! 

Also of note, ink adds the ability to save drafts. However Octopress does have a “do not publish” option which has its merits over my solution. More on this below.

For more detailed instructions on installation and use, consult [the Git repo’s README](https://github.com/sts10/ink/blob/master/README.md). 

(I should mention that I’m calling this latest version of ink version 0.0.3. I’m leaving a version of ink’s simpler predecessor, octo_new [version 0.0.2](https://gist.github.com/sts10/8857426), up as a Gist if you want to check it out, though it lacks the “save as draft” functionality.) 

### My Process (How I Wrote It)

There are two general things to say about my process of writing this script, both of which will probably apply to most things I code going forward: (1) it started with a small idea and (2) every little subsequent addition was hacked on and tested over and over again until it did what I wanted it to do. 

For example, I still don’t really understand many basics of Bash, and if you were to point to a line or method in the code there’s a chance that I don’t really know how it works. But with a lot of Googling and Stack Overflowing I pieced it together. 

The small idea: At first I just wanted to write a function that would (1) navigate to my github.io folder, (2) call rake new_post[“post title”] and then (3) open the default markdown editor. 

For task (1), I realized that I could work off of this navigate-to-Desktop function that Avi put in the standard Bash profile he shared with us on day 2 or 3:

``` bash
function desktop {
  cd /Users/$USER/Desktop/$@
}
```

Obviously it makes sense that you can put normal terminal commands like ```cd directory``` into Bash and have then run as if a user typed them. 

### Getting the FILENAME

Task (2) presented what turned out to be the most difficult and important challenges: getting the correct file name of the file we just created for the user, maintaining the proper formatting of the post title, AND creating and setting a variable (FILENAME) equal to file name of the post we just created for the user. 

At first I explored using a regular expression to replace any spaces inputted by the user with hyphens in order to reproduce the actual file name produced. But eventually I found (on Stack Overflow) a piped expression 
	`ls -t | head -1`
that grabs the name of the most-recently created file in a directory (the -t flag makes the list command list the files in order of creation, then the ```head -1``` grabs the most recently created. As long as no new files are created in the /_posts/ directory between the time when I call rake new_post and the above expression, we’ll get the file name of our new post. 

Now that we have the new file’s name stored in a variable, task (3) just involves a call to open on that variable. After that it’s just some flow control and Git procedures. 

### My Draft Functionality

Again, Octopress does have the ability to save drafts. From their [“Blogging Basics” page](http://octopress.org/docs/blogging/): “If you are working on a draft, you can add published: false to prevent it from being posted when you generate your blog.” 

This system works well, and you can use it with ink. However, as both a challenge and an attempt to separate these drafts from a user’s published posts, I endeavored to create my own solution to this problem. I ended up using a separate Git branch called “drafts” to store the drafts. Essentially when a user chooses to save the file they are working on, the script moves the file from the “source” branch to the “drafts” branch with this command:
``` bash
git checkout source -- source/_posts/$FILENAME  # move the file I'm working on to drafts
git add .
git commit -m "add draft "$FILENAME" to drafts branch."
```
The script then removes the file from the source branch, so that subsequent deploys do not publish the draft posts. When users type ```ink “drafts”``` into the command line, the script switches to the “drafts” branch and runs a list command within a select command, allowing the user to enter the number of the draft he or she would like to load. 

### Wrap-Up/Going Forward

An obvious larger next step would be to build ink into a more generalized Octopress manager/CMS, allowing users to edit published posts or publish their blog without forcing them to create a new post first. But there are also plenty of smaller additions I’d love make, namely making installation quicker and easier. 

One installation step I thought it would be easy to eliminate would be the one that requires new users to decrease the “drafts” Git branch themselves. I’d obviously prefer for the script to do this for them, but at this point I can’t quite figure out how to do that (without deleting the drafts of users who already have them saved).

If you end up using this for your Octopress blog please [let me know](http://samschlinkert.com/#contact)!! 

