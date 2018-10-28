
## Installing and setting up Jekyll on Ubuntu 17.10
   1. Be sure rbenv is set up and a modern version of Ruby is set to global.
   2. `gem install jekyll bundler`
   3. `git clone git@github.com:sts10/sts10.github.io.git`
   4. cd into the repo
   5. `bundle exec install`

To preview the Jekyll site: run `bundle exec jekyll serve`

To publish changes: git add and git commit changes, then run `bundle exec jekyll build`, then `git push origin master`
