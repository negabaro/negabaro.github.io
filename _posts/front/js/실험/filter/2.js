
const k_code = [1,3,4]
const items = [{ code: 1, label: "リンゴ" }, { code: 2, label: "バナナ" } , 
{ code: 3 , label: "メロン" }, { code: 4, label: "バナナ" } ];


const result = items.filter(function( item){
    return k_code.includes(item.code)
    //1  

})
console.log( result );


const y_target = 1;
const result2 = k_code.filter(function(k){
    return y_target !== k
    //1  

})

console.log( result2 );
