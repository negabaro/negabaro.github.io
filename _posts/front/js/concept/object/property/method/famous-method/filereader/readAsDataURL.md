readAsDataURL メソッドは、指定された Blob ないし File オブジェクトを読み込むために使用します。読込処理が終了すると readyState は DONE に変わり、 loadend イベントが生じます。それと同時に result プロパティにはファイルのデータを表す、base64 エンコーディングされた data: URL の文字列が格納されます。

https://developer.mozilla.org/ja/docs/Web/API/FileReader/readAsDataURL

readAsDataURL()は、FileReader のメソッドです。ファイルを、Data URI として読み込むメソッドです。例えば画像ファイルをこのメソッドで読み込んで、読み込んだデータを img 要素の src 属性に指定すればブラウザに表示できます。

https://lab.syncer.jp/Web/API_Interface/Reference/IDL/FileReader/readAsDataURL/

https://programmingsummaries.tistory.com/367

readAsDataURL 메서드는 파일을 data URL 형식으로 만들어 준다. 이는 파일을 서버에 업로드하지 않고도 조작할 수 있음을 의미한다. 포멧을 변환하거나, 데이터를 분석하여 변조하는 일이 가능해 진다. 예를 들면, 이미지의 특정한 영역을 클라이언트-사이드에서 크롭한 후 서버에 업로드하는 것이 가능하다. 보다 자세한 내용은 '4.3.5 File API'에서 다루도록 한다.

http://html5.firejune.com/doc.html
