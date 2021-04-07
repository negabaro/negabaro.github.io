

https://qiita.com/kouh/items/dfc14d25ccb4e50afe89

要素の検索
//id指定
document.getElementById('id');

//class指定
document.getElementsByClassName('class');

//タグ指定
document.getElementsByTagName('div');

//cssセレクタで指定
document.querySelector('#main .posts h1'); //最初の一つを取得
document.querySelectorAll('a'); //すべて取得
親子兄弟要素へのアクセス
//親要素
element.parentNode;

//子要素
element.firstElementChild; //最初の子要素
element.lastElementChild;  //最後の子要素
element.children; //子要素リスト

//１つ前の要素
element.previousElementSibling;

//１つ後の要素
element.nextElementSibling;
要素の作成・追加
//要素の作成
var div = document.createElement('div');
div.textContent = 'hoge';

//最後の子要素として追加
element.appendChild(div);

//最初の子要素として追加
element.insertBefore(div, element.firstChild);

//要素の直前に追加
element.parentNode.insertBefore(div, element); 

//要素の直後に追加
element.parentNode.insertBefore(div, element.nextSibling); 
要素の削除
//特定の子要素削除
element.removeChild(child); 

//自分を削除
element.parentNode.removeChild(element);

//子要素を全て削除
while (element.firstChild) element.removeChild(element.firstChild);

//子要素を全て削除(part2)
element.textContent = null;
属性の操作
//属性の存在チェック
element.hasAttribute('href');

//属性の取得 (存在しない場合はnullもしくは空文字を返す)
element.getAttribute('href');

//属性を設定
element.setAttribute('href', 'http://localhost:3000');

//属性を削除
element.removeAttribute('href');
スタイル関連操作
//class追加
element.classList.add('active');

//class削除
element.classList.remove('active');

//classをトグル
element.classList.toggle('active');

//スタイルを直接指定
element.style.backgroundColor = '#ff0000';