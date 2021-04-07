trait hoho
 hoge: 1

trait uni
 hoge: 2


FacotryBot.create(:hoho, :uni2)

이렇게 하면 hoge 2

FacotryBot.create(:uni2, :hoho)

이렇게하면 hoge 1

즉 trait을 뒤에 지정한값으로 최종 수정된다..