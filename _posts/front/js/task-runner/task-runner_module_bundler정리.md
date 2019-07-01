task-runner_module_bundler정리

task-runner란

- 파일 변경감시가 가능

module-bundler

파일종류별로 태스크를 나누는것이 가능
태스크의것들을 여러가지 가능
파일의 변경감시가 가능

task runner,module bundler관련 용어를 정리하고 있는데 제가 이해한게 맞나요?

1. task runner = 프론트단의 여러 작업들을 나눠줌/ 해당 작업을 자동으로 실행시켜줌, 파일의 변경감시해서 hot reload 가능
2. grunt,gulp = task runner
3. grunt,gulp = module bundler기능이 없으므로 번들러기능을 사용하려면 webpack이나browserify도 사용해야함
4. parcel,webpack = module bundler
5. module bundler = 여러가지 모듈을 하나의 파일로 묶어줌
6. webpack = module bundler기능이 주요업무인데 task runner역할도 가능(webpack-dev-server등을 이용해서)
7. parcel = webpack과 같이 복잡한 설치가 필요없이 간단히 사용할 수 있는 module bundler 이고 task runner기능도 가지고 있음
8. npm-scripts = task runner의 [특정 태스크를 실행할 수 있는]역할을 가짐.
