## 1. 코틀린 설치

```kt
$ brew update
$ brew install kotlin
```

## 2. 코드추가

```kt
cat << EOS > main.kt
fun main(args:Array<String>){
    println("Hello World!")
}
EOS
```

## 3. 컴파일

```
$ kotlinc main.kt -include-runtime -d hello.jar
```

## 4. 실행

```
$ kotlin hello.jar #Hello World!
```



https://blog.nakamu.life/posts/mac-kotlin-build-environment