redux와 mobx는 선호의 문제로 인식되기도 하지만 본질적으로 앱이 대규모로 커지면 redux만이 선택지로 남게 됩니다.
redux는 불변성을 지향하고 mobx는 state 관리가 가변적이기 때문에 코드가 많아지면 verbose 하더라도 redux로 관리하는 코드가 훨씬 더 가독성이 좋습니다. 그래서 대규모 앱들은 대부분 redux를 사용합니다. Netflix도, Airbnb도, Spotify도 그렇습니다
