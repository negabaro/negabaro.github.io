vmin & vmax

vh와 vw이 늘 뷰포트의 너비값과 높이값에 상대적인 영향을 받는다면 vmin과 vmax는 너비값과 높이값에 따라 최대, 최소값을 지정할 수 있습니다. 

예를 들면 브라우저의 크기가 1100px 너비, 그리고 700px 높이일때 1vmin은 7px이 되고 1vmax는 11px이 됩니다. 

너비값이 다시 800px이 되고 높이값이 1080px이 되면 vmin은 8px이 되고 vmax는 10.8px이 됩니다.



어때요, 이 값들을 사용할 수 있나요? 

언제나 스크린에 보여지는 요소를 만든다고 가정해 봅니다. 

높이값과 너비값을 vmin을 사용해 100으로 지정합니다. 

예를 들어 터치화면 양 변에 가득차는 정사각형 요소를 만들때는 이렇게 정의하면 됩니다.



출처: https://webclub.tistory.com/356 [Web Club]


https://webdesign.tutsplus.com/ko/articles/7-css-units-you-might-not-know-about--cms-22573?fbclid=IwAR2sa3SgWN9cgVlbxXQsgmA_5E7B0dgNunMIRX88eyATcpRCgLlw25viiyo