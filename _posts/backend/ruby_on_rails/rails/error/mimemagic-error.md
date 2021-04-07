https://github.com/rails/rails/issues/41750
https://github.com/jellybob/mimemagic/pull/3

https://github.com/mimemagicrb/mimemagic/issues/98

## mimemagic 문제

We (the Rails core team and friends) are currently investigating the possibility of using the 2-clause BSD–licensed libmagic, the basis of the standard file tool, or Ruby translation of its magic DBs.




```
brew install shared-mime-info  # we use macs for development
bundle update nokogiri marcel mimemagic
```

```
Your bundle is locked to mimemagic (0.3.6), but that version could not be found
in any of the sources listed in your Gemfile. If you haven't changed sources,
that means the author of mimemagic (0.3.6) has removed it. You'll need to update
your bundle to a version other than mimemagic (0.3.6) that hasn't been removed
in order to install.
The command '/bin/sh -c bundle install --jobs `expr $(cat /proc/cpuinfo | grep -c "cpu cores") - 1` --retry 3 --path=/shared/vendor/bundle' returned a non-zero code: 7
make: *** [build] Error 7
```



bundle config set --global build.mimemagic --with-freedesktop-mime-types-path=/usr/local/Cellar/shared-mime-info/2.1/share/shared-mime-info/packages/freedesktop.org.xml


I wondered why my builds were failing on prod yesterday, kumbe this happened.
It worked when I downgraded to from bundler 2.2.15 to 2 2.12 though


Step 9/21 : RUN bundle --version
 ---> Running in 5810486be4fe
Bundler version 1.17.2


---


```
Your bundle is locked to mimemagic (0.3.5), but that version could not be found
in any of the sources listed in your Gemfile. If you haven't changed sources,
that means the author of mimemagic (0.3.5) has removed it. You'll need to update
your bundle to a version other than mimemagic (0.3.5) that hasn't been removed
in order to install.
```


```
uilding native extensions. This could take a while...
ERROR:  Error installing rails:
    ERROR: Failed to build gem native extension.

    current directory: /usr/local/bundle/gems/mimemagic-0.3.7/ext/mimemagic
/usr/local/bin/ruby -rrubygems /usr/local/lib/ruby/gems/2.6.0/gems/rake-12.3.2/exe/rake RUBYARCHDIR\=/usr/local/bundle/extensions/x86_64-linux/2.6.0/mimemagic-0.3.7 RUBYLIBDIR\=/usr/local/bundle/extensions/x86_64-linux/2.6.0/mimemagic-0.3.7
rake aborted!
Could not find MIME type database in the following locations: ["/usr/local/share/mime/packages/freedesktop.org.xml", "/opt/homebrew/share/mime/packages/freedesktop.org.xml", "/usr/share/mime/packages/freedesktop.org.xml"]

Ensure you have either installed the shared-mime-types package for your distribution, or 
obtain a version of freedesktop.org.xml and set FREEDESKTOP_MIME_TYPES_PATH to the location 
of that file.
/usr/local/bundle/gems/mimemagic-0.3.7/ext/mimemagic/Rakefile:14:in `locate_mime_database'
/usr/local/bundle/gems/mimemagic-0.3.7/ext/mimemagic/Rakefile:25:in `block in <top (required)>'
Tasks: TOP => default
(See full trace by running task with --trace)

rake failed, exit code 1

Gem files will remain installed in /usr/local/bundle/gems/mimemagic-0.3.7 for inspection.
Results logged to /usr/local/bundle/extensions/x86_64-linux/2.6.0/mimemagic-0.3.7/gem_make.out
The command '/bin/sh -c gem install rails' returned a non-zero code: 1

[Container] 2021/03/25 15:29:25 Command did not exit successfully docker build -t $UNIVAS_URI:latest  . exit status 1
[Container] 2021/03/25 15:29:25 Phase complete: BUILD State: FAILED
[Container] 2021/03/25 15:29:25 Phase context status code: COMMAND_EXECUTION_ERROR Message: Error while executing command: docker build -t $UNIVAS_URI:latest  .. Reason: exit status 1
[Container] 2021/03/25 15:29:25 Entering phase POST_BUILD
[Container] 2021/03/25 15:29:25 Running command echo Build completed on `date`
Build completed on Thu Mar 25 15:29:25 UTC 2021

[Container] 2021/03/25 15:29:25 Running command echo Pushing the Docker image...
Pushing the Docker image...

[Container] 2021/03/25 15:29:25 Running command docker push $UNIVAS_URI:latest
The push refers to repository [352306967152.dkr.ecr.ap-northeast-1.amazonaws.com/univas-rails-dev]
An image does not exist locally with the tag: 352306967152.dkr.ecr.ap-northeast-1.amazonaws.com/univas-rails-dev

[Container] 2021/03/25 15:29:25 Command did not exit successfully docker push $UNIVAS_URI:latest exit status 1
[Container] 2021/03/25 15:29:25 Phase complete: POST_BUILD State: FAILED
[Container] 2021/03/25 15:29:25 Phase context status code: COMMAND_EXECUTION_ERROR Message: Error while executing command: docker push $UNIVAS_URI:latest. Reason: exit status 1
[Container] 2021/03/25 15:29:26 Expanding base directory path: .
[Container] 2021/03/25 15:29:26 Assembling file list
[Container] 2021/03/25 15:29:26 Expanding .
[Container] 2021/03/25 15:29:26 Expanding file paths for base directory .
[Container] 2021/03/25 15:29:26 Assembling file list
[Container] 2021/03/25 15:29:26 Expanding imagedefinitions.json
[Container] 2021/03/25 15:29:26 Skipping invalid file path imagedefinitions.json
[Container] 2021/03/25 15:29:26 Phase complete: UPLOAD_ARTIFACTS State: FAILED
[Container] 2021/03/25 15:29:26 Phase context status code: CLIENT_ERROR Message: no matching artifact paths found
```


There isn't anyone that can do that. Individual contributors hold their own copyright. I'm just but one of a number of contributors to the module where the freedesktop.org.xml originates from.

1. Support for pulling down the freedesktop.org definitions at application startup. This will be the default behaviour.

2. Support for setting the environment variable `FREEDESKTOP_MIME_TYPES_PATH`, which will disable downloading at runtime, and instead load the data from a different location.
Both look good options to me, as long as the files are used as data files, and not use to create code from. Otherwise you should use the update-mime-database file to process the XML, to create cache files (those caches are part of the shared mime info specification).


https://github.com/jellybob/mimemagic/issues/1#issuecomment-805949834

https://gitlab.freedesktop.org/xdg/shared-mime-info/-/blob/2.1/data/freedesktop.org.xml.in

여기 있는거 copy해서 붙여넣어보자

["/usr/local/share/mime/packages/freedesktop.org.xml", "/opt/homebrew/share/mime/packages/freedesktop.org.xml", "/usr/share/mime/packages/freedesktop.org.xml"]



---


한국 커뮤니티에서 관련정보

https://www.facebook.com/groups/rubyonrailskorea/permalink/3886980874704314


https://www.facebook.com/jeonghoon.byun/posts/10158346012873472

https://dev.to/cseeman/what-s-up-with-mimemagic-breaking-everything-he1?fbclid=IwAR0Ky_nkbVVwka3a_ePFrCDDFoS2s0MmTbeNzg7ZKxgR5YmW_i1Pn2RJy9Q

