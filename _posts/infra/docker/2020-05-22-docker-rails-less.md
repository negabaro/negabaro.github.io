

rails consoleでとあるモデルをallで全件取得しようとしたところ以下のエラーに遭遇。


```ruby
[1] pry(main)> User.all
  Member Load (9.3ms)  SELECT "users".* FROM "users" ORDER BY "users"."created_at" ASC
less: unrecognized option: X
BusyBox v1.30.1 (2019-10-26 11:23:07 UTC) multi-call binary.

Usage: less [-EFIMmNSRh~] [FILE]...
  1 FROM ruby:2.6.5-alpine3.10

View FILE (or stdin) one screenful at a time

    -E  Quit once the end of a file is reached
    -F  Quit if entire file fits on first screen
    -I  Ignore case in all searches
    -M,-m   Display status line with line numbers
        and percentage through the file
    -N  Prefix line number to each line
    -S  Truncate long lines
    -R  Remove color escape codes in input
    -~  Suppress ~s displayed past EOF
```

結論からいえば、Alpine LinuxをベースとしてDocker上でRailsを動かしていたのですが、Alpine Linuxにはlessが標準装備されていないためこうなるらしい。
hirbとか使っているからpager機能がついているのかな...その時less使ってるのかな...
まぁとりあえず復旧だ。

Dockerfile
RUN apk add --update --no-cache less
docker-compose build
エラー出なくなった。

[reference]: https://qiita.com/at-946/items/a7dbac4a46802d7b5376
