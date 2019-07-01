setState 呼び出し、すぐに state が変更されるのではなく、非同期で動作するという点です。 状態が変更された直後に必要な作業がある場合は setState(nextState, callback)の callback を使用する必要があります。

したがって、以下では保証されません 。

setState 呼び出し直後に state がすぐに更新される。
一コンテキスト内での setState 呼び出し数とコンポーネントの更新数は同じである。
しかし、ここでは、 保証されます。

setState 実行順序
setState callback の実行順序
state の変化がクリックなどの event を実行する前に、コンポーネントに反映される。

# setState はなぜ非同期で動作でしょうか？

次に、 setState はなぜ非同期で動作でしょうか？ これは、シームレスなスムーズな UI / UX を提供するために一定数の render を必ず実行させるためです。 setState が同期で動作すると仮定してみましょう。 state の変更が多ければ多いほど render は、すべての変更が適用されるまで遅くなりますので、実際の画面では、 信じられないほど不自然に動作することになるでしょう。 非同期で動作するようにすると、 render 時点とは別に動作するので、自然な更新が可能になります。

https://translate.googleusercontent.com/translate_c?depth=1&hl=ja&prev=search&rurl=translate.google.com&sl=ko&sp=nmt4&u=https://medium.com/little-big-programming/react%25EC%259D%2598-%25EA%25B8%25B0%25EB%25B3%25B8-%25EC%25BB%25B4%25ED%258F%25AC%25EB%2584%258C%25ED%258A%25B8%25EB%25A5%25BC-%25EC%2595%258C%25EC%2595%2584%25EB%25B3%25B4%25EC%259E%2590-92c923011818&xid=25657,15700022,15700186,15700191,15700248,15700253&usg=ALkJrhhrSsO_Mcsg7Z7DwqsMpmML3Ytxnw
