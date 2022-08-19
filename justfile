build: 
  bundle exec jekyll build

publish:
  git add .
  git commit -m "update"
  git push origin master
