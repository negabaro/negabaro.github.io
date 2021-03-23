ここからRails（Active Support）の導入を前提とします。

tap
tapはブロック内でselfが使え、selfが返ります。ただ、breakするとその値が返ります。あんまりいい例が思いつかなかった…。

items = [{ id: 1, title: 'item1' }, { id: 2 }]
items.map{|item| "タイトルは" + item.tap{|i| break { title: 'no title' } unless i[:title]}[:title] }