# 「〜ではないこと」だけ検証して終わらない
「〜ではないこと」だけを検証すると、仕様を満たしていないのにテストがパスする可能性があります。
以下はユーザーを削除して「そのユーザーが表示されないこと」だけをテストしている例です。

# NG!!
example 'ユーザーの削除' do
  # ...

  # ユーザーAliceを削除
  click_link 'Destroy'

  # Aliceが表示されていないからOK、ではない！！
  expect(page).to_not have_content 'Alice'
end
仕様を満たしていないのにテストがパスする場合というのは、たとえば「権限がないため、ホーム画面にリダイレクトされる」という結果になったときです。

Screen Shot 2020-01-29 at 9.40.21.png

ですので、次のように必ず「〜であること」という肯定的な条件もテストしましょう。

# OK
example 'ユーザーの削除' do
  # ...

  click_link 'Destroy'

  expect(page).to_not have_content 'Alice'
  # 「削除完了」のメッセージが表示されていることも一緒に検証する
  expect(page).to have_content 'User was successfully destroyed.'
end
この内容については以下の記事で詳しく説明しています。


https://qiita.com/jnchito/items/133d9953e1e7214e5357
https://qiita.com/jnchito/items/d5ba193af9b794dff77e