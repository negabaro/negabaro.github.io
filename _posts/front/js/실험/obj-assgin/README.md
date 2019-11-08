https://jsfiddle.net/yoiyoy/z475khc9/
https://yoiyoy.wordpress.com/2016/11/22/mutationobserver/

## MutationObserverInit
childList : 타겟 노드의 자식 엘레멘트(텍스트 노드를 포함)들의 추가 혹은 제거를 관찰해야할 때 true
attributes : 타겟 노드의 속성들의 변형들을 관찰해야할 때 true

characterData : 타겟 노드의 데이터를 관찰해야할 때 true

subtree : 타겟 노드부터 자손 노드들의 변형들까지 관찰해야할 때 true

attributeOldValue : attributes이 true면서 타겟 노드의 변경된 속성들 이전 값을 기록해야할 때 true

characterDataOldValue : characterData true면서 타겟 노드의 변경된 데이터 이전 값을 기록해야할 때 true

attributeFilter : 모든 속성들을 관찰하고 싶지않을 때 관찰할 속성명의 Array