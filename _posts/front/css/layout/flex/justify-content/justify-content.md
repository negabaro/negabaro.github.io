## 수평정렬(justify-content)

### flex-start

자식 요소인 Flex 아이템을 가로로 배치하는 경우에는 "왼쪽 맞춤", 세로 배치의 경우에는 "위쪽 맞춤"으로 개시점에서 간격없이 배치됩니다.

### flex-end

flex-start 값의 반대입니다. Flex 아이템을 가로 배치의 경우 끝점에서 간격없이 "오른쪽 맞춤", 세로 배치의 경우 "아래쪽 맞춤" 으로 됩니다.
### center

Flex 항목은 상하 중앙에 맞춰 정렬합니다.

### space-between	

Flex 아이템은 균등하게 간격을 두고 배치됩니다. 좌우 양끝의 Flex 아이템의 시작과 끝에는 빈 공간이 들어가지 못합니다.

"Flex 아이템"의 폭의 합계가 부모 요소인 Flex 컨테이너의 폭보다 긴 경우, 이 값은 "flex-start"의 값과 동일하게 됩니다.

### space-around	

flex 아이템은 모든 아이템은 일정한 간격으로 배치됩니다. space-between과 같이 균등한 간격으로 배치되지만, 좌우 양끝의 Flex 아이템은 외부에 간격의 절반 정도의 빈 공간이 생깁니다.

"Flex 아이템"의 폭의 합계가 "Flex 컨테이너"의 폭보다 긴 경우, 이 값은 "center"의 값과 동일하게 됩니다.

https://www.tabmode.com/homepage/flex-direction.html