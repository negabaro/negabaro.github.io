bundle:
	bundle install --path vendor/bundle
s:
	bundle exec jekyll serve --watch --force_polling
run:
	docker run -it --rm -p 4000:4000 -v $$(pwd):/srv/jekyll -v $$(pwd)/vendor/bundle:/usr/local/bundle  jekyll/jekyll jekyll serve --watch --force_polling