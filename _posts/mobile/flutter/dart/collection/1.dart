import 'package:collection/collection.dart';

void main(){
  Function eq = const ListEquality().equals;
  Function deepEq = const DeepCollectionEquality().equals;
  List list1 = [1, ['a',[]], 3];
  List list2 = [1, ['a',[]], 3];
  print(eq(list1, list2)); //false
  print(deepEq(list1, list2)); //true


  //There are other Equality classes that can be combined in many ways,
  //including equality for Maps.
  //You can even perform an unordered (deep) comparison of collections:
  Function unOrdDeepEq = const DeepCollectionEquality.unordered().equals;
  List list3 = [3, [[],'a'], 1];
  print(unOrdDeepEq(list2, list3));  //true
}