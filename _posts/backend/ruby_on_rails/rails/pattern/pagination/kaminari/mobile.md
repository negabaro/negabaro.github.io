
```ruby
  .border-list
    xx
  .is-hidden-desktop
    = paginate @items.association_list, :window => 1
  .is-hidden-touch
    = paginate @items.association_list, :window => 3
```

이런식으로 bulma에서 데스크톱용 touch용으로 나누면

![image](https://user-images.githubusercontent.com/4640346/84349446-4f5aaf80-abf2-11ea-8ecb-b58f0f330ee7.png)

이렇게 표시됨


그냥하면 이렇게..

![image](https://user-images.githubusercontent.com/4640346/84349554-84670200-abf2-11ea-8d1b-c48009e21bc9.png)
