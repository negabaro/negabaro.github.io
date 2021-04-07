func show_b1(value: Result<Any>) {
    switch value {
        case .result1:
          break
        case .result2:
          break
    }
}

//func show_b2(value: Result<Any>) {
//    switch value {
//        case .result1(): //tuple pattern cannot match values of the non-tuple type 'Any'
//          break
//        case .result2(): //tuple pattern cannot match values of the non-tuple type 'Any'
//          break
//    }
//}

func show(value: Result<Any>) {
    switch value {
        case .result1(_):
          break
        case .result2(_):
          break
    }
}

public enum Result<T> {
    case result1(T)
    case result2(T)
}