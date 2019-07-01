```js
    webpack(config, options) {
      config.module.rules.push({
        test: /ip-address\.json$/,
        loader: path.resolve(__dirname, "./ip_address_loader.js")
      });
      return config;
    }
```

javascript에는 test라는 메소드가 있음
어떤 문자를 가져와서 비교해서 비교대상에 존재하는 문자면 true를 반환해줌

여기서 test도 그와 같고

loader에서 test안에 적혀있는 파일안에 내용을

갖고 뭔가를 한후 결과를 return해주게됨

실행타이밍은 test에 정의되어있는 ip-address.json파일이 import된 시점에 loader가 실행됨

//ある文字列が入って、別の文字列で返すだけ
//test -> loader

# loader안에 있는파일안에서 test에 존재하는 json파일의 내용을 읽기위해서는

async메소드의 첫번째 인자로부터 문자를 가져올수있음

위 예제는 그냥test가 동작하는 조건만 기술되어 있으므로

파일의 내용을 분석해서 뭐 변환한다든지 그런 로직은 아님

그러나 babel같은 경우 새로운 코드를 예전 코드형식으로 바꾸는데 이때도 똑같은 메커니즘으로 움직임

//loader に書いたファイルの中で async の一つのパラメターに[test にある文字列が取れる]
