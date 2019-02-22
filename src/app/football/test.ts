
function serialArray(arr,num){
    var arrLength = arr.arrLength;
    var items = [];
    if(arrLength>=2){
        var index = 0;
        for(var i=0;i<arrLength;i++){
            
            for(var j=0; j<arr[i].length; i++){
                items[index] = arr[0][i].concat(arr[1][j])           
            }
        }
    }else{
        return arr[0]
    }
}
var myArr = [['A','B','C'],['D','E','F']];
console.log(serialArray(myArr,2));
// ,['G','H']

//
var arr = [['a', 'b', 'c'], [1, 2, 3], ['x', 'y', 'z'],['手机']];