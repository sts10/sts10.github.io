+++
title= "Introducing ink version 0.0.4"
date= "2014-02-12 21:51:25 -0500"
comments = "true"
+++

I’m happy to announce that I’ve made some decent improvements to [ink](https://github.com/sts10/ink), my shell script for making Octopress blogs a little easier. I’ve [just pushed version 0.0.4](https://github.com/sts10/ink), which introduces two new improvements. 

<!-- more -->

First, installation of 0.0.4 is easier for new users, as they no longer have to create a local Git branch called “drafts” to use ink’s draft functionality. Thanks to this little if statement:
	if [[ $(git branch | grep 'ink_drafts') == "" ]]
The script can now see whether the user has an “ink_drafts” branch created or not. If not, the script asks the user’s permission to create one. If for some reason the user says no, ink uses flow control to not offer that user any of the draft-related menu choices. 

And secondly, and more importantly, with v 0.0.4 users can simply enter ```$ink``` in to the command line and will get a more extensive menu of tasks that ink can perform without having to create and open a new blog post first. These new men choices include: open new post, publish your Octopress blog & push to GitHub, preview your blog, and help. Of course users can still shortcut this menu by calling ```$ ink “new blog post title``` from anywhere in the terminal. 

For more information be sure to read the updated [README](https://github.com/sts10/ink/blob/master/README.md). Again, here’s the link to [the repo on GitHub](https://github.com/sts10/ink). 
