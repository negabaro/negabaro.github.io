
# 1-09 【統一】感嘆符!の後ろにはスペースを置かない
No space after !.

原文では他に記述がありませんが、この感嘆符はRubyの単独の否定演算子!を指しています。

```ruby
# bad
 ! something

# good
 !something
```

# 1-10 【統一】範囲演算子..や...の前後にはスペースを置かない
No space inside range literals.

範囲演算子の前後にスペースがあると、範囲演算子であることがわかりにくくなるためです。

# 不可
1 .. 3
'a' ... 'z'

# 良好
1..3
'a'...'z'


# 1-11 【統一】case文内部のwhenのインデントの深さはcaseと同じにする
Indent when as deep as case. This is the style established in both “The Ruby Programming Language” and “Programming Ruby”.

これは意見が割れそうなスタイルですが、『The Ruby Programming Language』と『Programming Ruby』の2冊の書籍を論拠にしています。繰り返しになりますが、重要なのは「どちらかに決める」ことです。

# 不可
case
  when song.name == 'Misty'
    puts 'Not again!'
  when song.duration > 120
    puts 'Too long!'
  when Time.now.hour > 21
    puts "It's too late"
  else
    song.play
end

# 良好
case
when song.name == 'Misty'
  puts 'Not again!'
when song.duration > 120
  puts 'Too long!'
when Time.now.hour > 21
  puts "It's too late"
else
  song.play
end

왜 ruby에서 case when에 indent를 넣지않는거지??

https://blog.jnito.com/entry/2013/02/28/084302

RubyのインデントスタイルはEiffelの「櫛型構造」の影響を受けています。簡単に言うとif～elsif～else～endに合わせるということですね。のでcaseとwhenを揃えるのが好みです。

なるほど、Eiffelの影響だったんですか！ちょっと意外でした。Eiffelにはあまり詳しくないですが、このあたり( http://www.geocities.co.jp/SiliconValley/8632/s4.html#s4.3 … )を見ると納得できますね。ご回答ありがとうございました！


Eiffelとは
Eiffel（アイフェル）は、1985年にフランス出身のコンピュータ科学者バートランド・メイヤー氏によって開発されたオブジェクト指向プログラミング言語です



https://techracho.bpsinc.jp/hachi8833/2016_12_16/31386