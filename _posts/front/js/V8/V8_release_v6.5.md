---
layout: post
title: "xx"
author: negabaro kim
categories: xx
tags: xx
---

https://v8.dev/blog/v8-release-65

JavaScript엔진「V8 release v6.5」릴리즈。WebAssembly バイナリをダウンロードと並行してコンパイル、ダウンロード完了とほぼ同時にコンパイルも完了
2018 年 2 月 7 日

Google の Chrome ブラウザで使われている JavaScript エンジンの最新版「V8 release v6.5」のリリースが発表されました。

V8 release v6.5 の最大の特徴は、WebAssembly の「Streaming Compilation」（ストリーミングコンパイレーション）を実現したことです。

ダウンロードとコンパイルを並行して行う Streaming Compilation
WebAssembly は、Web ブラウザ上でネイティブコード並に高速実行が可能なバイナリフォーマット。Web ブラウザにダウンロードした後でネイティブコードにコンパイルされ、実行されるというものです。

通常のコンパイルは、コンパイルすべき WebAssembly バイナリのダウンロードが完了した後で、保存されたファイルがコンパイラに渡されてコンパイルされる、という手順を踏みます。

しかし今回実装された Streaming Compilation は、WebAssembly のバイナリコードのダウンロードが始まると、ダウンロードの完了を待つことなく受け取ったデータをどんどんコンパイラに渡して、ダウンロードと並行でコンパイルを行ってしまうというものです。

下記は、V8 release v6.5 の Streaming Compilation が有効になる Chrome 65 と、そのひとつ前のバージョンである Chrome 64 によるベンチマークの結果です。

青いマーカーがダウンロードにかかった時間、そして赤いマーカーが Chrome 65 でコンパイルにかかった時間。黄色いマーカーが Chrome 64 でコンパイルにかかった時間を示しています。

V8 release v6.5 の WebAssembly コンパイル速度を比較したグラフ
「V8 JavaScript Engine: V8 release v6.5」から
いちばん左の 2 つのマーカーは、ネットワークの帯域が 25Mbit/s のときのベンチマーク結果です。Chrome 65 も Chrome 64 も、青いマーカーが示すダウンロードにかかった時間（22 秒程度）は同じですが、Chrome 65 ではダウンロードが終わったあとで、赤いマーカーが少しだけ見え、すぐにコンパイルが終わったことが分かります。

一方、Chrome 64 では黄色いマーカーが示すように、青いマーカーが示すダウンロードが終わった後で、黄色いマーカーが示すように 10 秒程度コンパイルに時間がかかっています。

真ん中の 2 つのマーカーはネットワークの帯域が 50Mbit/s のベンチマークで、ここでも Chrome 65 はデータ転送が終わるやいなやコンパイルも終わっていますが、Chrome 64 はさきほどと同じように 10 秒程度のコンパイル時間がかかっています。

いちばん右の 2 つのマーカーは 100Mbit/s のネットワーク帯域のベンチマークで、さすがにこのスピードで WebAssembly のコードを受け取っても、Chrome 65 では並行して行われたコンパイルの速度が間に合わず、数秒程度のコンパイル時間がかかっています。

Firefox も Streaming Compilation を実装済み
こうしてみると Chrome 65 も Chrome 64 も、ベンチマークで使われた WebAssembly ファイルのコンパイルには 10 秒程度かかっているようです。

ただ、Chrome 64 はダウンロードが終わった時点でコンパイルが開始されて 10 秒かかっているのに対し、Chrome 65 ではダウンロードが始まった時点でコンパイルも開始されるために Chrome 64 よりも早めに終わっているわけです。

そしてこの、WebAssembly のバイナリをダウンロードしながらコンパイルを行う Streaming Compilation は、先月リリースされた Firefox 58 でも実装されています。

となると Chrome 65 や Firefox でいかに WebAssembly のコードを早く実行するかという点において、これまでの JavaScript と同じようにダウンロード時間を短縮するためにファイル容量を小さくする、というチューニングテクニックは引き続きとても重要なのだと言えそうです。

https://www.publickey1.jp/blog/18/javascriptv8_release_v65webassembly.html
