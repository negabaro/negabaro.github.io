


func intToString(_ value: Int) -> String {
  return value.description
}
//intToString(1) //warning: result of call to 'intToString' is unused
_ = intToString(1)


func intToString2(value: Int) -> String {
  return value.description
}

//let keke = intToString2(1) //error: missing argument label 'value:' in call

let keke2 = intToString2(value: 1)