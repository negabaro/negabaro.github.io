

.field-body.flex {
    display: flex;
    flex-basis: 0;
    flex-grow: 5;
    flex-shrink: 1;
}

헤맨 부분


```ruby
.field.is-horizontal
  .field-label.is-small
    label.label 体重
  .field-body.flex
    .field.is-narrow
      .control
        //= s.number_field :weight ,min:30,max:300,step: 60, class: 'input', placeholder:"60"
        = s.number_field :weight, class: 'input', placeholder:"60"
        = s.common_error_message_on :weight
    .field.is-narrow
      p(style="margin: revert;")
        | kg
```

field-body.flex가 있으면

![image](https://user-images.githubusercontent.com/4640346/94017807-cfe09d00-fdea-11ea-8d39-538630b3a634.png)


field-body.flex가 없으면

![image](https://user-images.githubusercontent.com/4640346/94017856-dec74f80-fdea-11ea-8b65-13df51bb797c.png)
