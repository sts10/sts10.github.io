build: 
  bundle exec jekyll build

serve:
  bundle exec jekyll serve

publish:
  git add .
  git commit -m "update"
  git push origin master

