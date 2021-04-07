
Using Nyan Cat
You can either specify the formatting when using the rspec command:

rspec --format NyanCatFormatter
Or add --format NyanCatFormatter to a .rspec file placed in your project's root directory, so that you won't have to specify the --format option everytime you run the command.

###Using with Bundler

To use Nyan Cat with a project that uses Bundler (Rails or Sinatra f.e.) you need to add Nyan Cat dependecy to your Gemfile:

group :test do
  gem "nyan-cat-formatter"
end

https://github.com/mattsears/nyan-cat-formatter


2. Play the song by default when you run your specs:

Make sure your .rspec file in your application's root directory contains the following:

--color
--format NyanCatMusicFormatter