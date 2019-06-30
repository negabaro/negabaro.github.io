https://github.com/roidrage/lograge/blob/master/lib/lograge.rb

```
def ignore_actions(actions)
    ignore(lambda do |event|
             params = event.payload
             Array(actions).include?("#{params[:controller]}##{params[:action]}")
           end)
  end
```

```
def ignore?(event)
  ignore_tests.any? { |ignore_test| ignore_test.call(event) }
end
```
