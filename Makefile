bundle:
	bundle install --path vendor/bundle
s_back:
	bundle exec jekyll serve --watch --livereload -I
s:
	bundle exec jekyll serve --watch
build:
	docker run -it --rm -p 8888:8888 -v $$(pwd):/srv/jekyll -v $$(pwd)/vendor/bundle:/usr/local/bundle  jekyll/jekyll jekyll build
run:
	docker run -it --rm -p 8888:8888 -v $$(pwd):/srv/jekyll -v $$(pwd)/vendor/bundle:/usr/local/bundle  jekyll/jekyll jekyll serve --watch --force_polling
build-for-github-action:
	docker run --rm -p 8888:8888 -v $$(pwd):/srv/jekyll -v $$(pwd)/vendor/bundle:/usr/local/bundle  jekyll/jekyll jekyll build
