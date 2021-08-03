void main(){
  var constructor = Map();
  constructor['first'] = '1';
  constructor['second'] = '2';
  constructor['third'] = '3';
  print(constructor.runtimeType); //_InternalLinkedHashMap<dynamic, dynamic>
  print(constructor); //{first: 1, second: 2, third: 3}

}