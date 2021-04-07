"성능상으로는 computed가 좋음 

methods의 하위호환이 computed"
"어쩔수 없이 methods를 써야할 경우가 있다.



1. 파라메터를 받아서 호출해야할 때 - data를 사용하지 않는다는 정책을 취한다면 computed로는 아예 불가능하다.

2. 함수 안에서 다른 값을 바꿔줘야할 때 - computed에서는 다른 값을 바꾸는건 정책위반이다. (불가능한건 아니다.) 이 경우 methods를 사용한다."
"  computed: {
      closeModal2: () => {
          console.log('closeModal2');
      }
  },
  methods: {
      closeModal: () => {
          console.log('closeModal');
      }

  }

일단 둘의 차이는 
computed는 함수로 부르면 안됨
closeModal2 로 불러야함 closeModal2() 에러남 

methods쪽은 함수로 불러야함 
closeModal() 해야 불려진 closeModal하면 에러"

computed는 리턴값이 필요함 클릭해도 안불려짐

  computed: {
      closeModal2: () => {
          console.log('closeModal2');
      }
  },
  button.delete(@click="closeModal2")


https://mae.chab.in/archives/60167

"「computed」は get / setアクセサ になる
computedは、いわゆるgetter / setterとして使用するものです。JavaScriptで書く場合は、computedフィールドのオブジェクトの中に、getter / setter となる関数を定義しました。TypeScriptによるクラス構文で書く場合は、get / setアクセサを使って定義します。"


https://kamang-it.tistory.com/entry/Vue23computed-%EA%B7%B8%EB%A6%AC%EA%B3%A0-methods%EC%99%80%EC%9D%98-%EC%B0%A8%EC%9D%B4featwatch