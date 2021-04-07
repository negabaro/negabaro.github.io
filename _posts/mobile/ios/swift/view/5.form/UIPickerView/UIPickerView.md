



### numberOfComponents

반드시 존재해야 한다(선언 안되어있으면 에러남)

표시할 picker의 갯수(열)를 리턴하는 데이터소스 메소드이다.



#### return 0일 경우

아무것도 표시 안된다.

#### return 1일 경우

하나가 표시됨

![image](https://user-images.githubusercontent.com/4640346/110941282-6c87fe80-837b-11eb-8cba-06f6671e486a.png)



#### return 2일 경우

두개의 picker가 화면에 나옴

```c
func numberOfComponents(in pickerView: UIPickerView) -> Int {
    return 2
}
```

![image](https://user-images.githubusercontent.com/4640346/110928821-a4d31100-836a-11eb-8654-54f7e546b3f7.png)

---


```js
//
//  ViewController.swift
//  SwiftTestUIPickerView
//
//  Created by sehwa kim on 2021/03/11.
//

import UIKit

class ViewController: UIViewController, UIPickerViewDataSource, UIPickerViewDelegate {
  
  /* pickerに表示する列数を返すデータソースメソッド. (実装必須)*/
  func numberOfComponents(in pickerView: UIPickerView) -> Int {
    return 1
  }
  
  /*
   
   pickerに表示する行数を返すデータソースメソッド.
   
   (実装必須)
   
   */
  func pickerView(_ pickerView: UIPickerView, numberOfRowsInComponent component: Int) -> Int {
    return myValues.count
  }
  
  /*
   
   pickerに表示する値を返すデリゲートメソッド.
   
   */
  
  
  func pickerView(_ pickerView: UIPickerView, titleForRow row: Int, forComponent component: Int) -> String? {
    return myValues[row] as? String
  }
  
  /*
   pickerが選択された際に呼ばれるデリゲートメソッド.
   */
  func pickerView(_ pickerView: UIPickerView, didSelectRow row: Int, inComponent component: Int) {
    print("row: \(row)")
    print("value: \(myValues[row])")
  }
  
  override func didReceiveMemoryWarning() {
    super.didReceiveMemoryWarning()
  }
  
  
  // UIPickerView.
  private var myUIPicker: UIPickerView!
  
  // 表示する値の配列.
  private let myValues: NSArray = ["사나","모모","다현","채영"]
  
  
  
  override func viewDidLoad() {
    super.viewDidLoad()
    // Do any additional setup after loading the view.
    
    myUIPicker = UIPickerView()
    // サイズを指定する.
    
    //myUIPicker.frame = CGRectMake(0,0,self.view.bounds.width, 180.0)
    myUIPicker.frame = CGRect(x: 0, y: 0, width: self.view.bounds.width, height: 180.0)
    
    // Delegateを設定する.
    myUIPicker.delegate = self
    
    // DataSourceを設定する.
    myUIPicker.dataSource = self
    
    // Viewに追加する.
    self.view.addSubview(myUIPicker)
  }
  
  
}

```

## 메모

### Type 'ViewController' does not conform to protocol 'UIPickerViewDataSource'

UIPickerViewDataSourceで定義されている以下の２つのメソッドを実装してください。

func numberOfComponentsInPickerView(_ pickerView: UIPickerView) -> Int
func pickerView(_ pickerView: UIPickerView, numberOfRowsInComponent component: Int) -> Int

---

## 참고

[UIPickerView Class]

[UIPickerView Class]: https://developer.apple.com/documentation/uikit/uipickerview
