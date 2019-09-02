let array = [...Array(200)];
array.forEach((_,i,arr)=>{arr[i]=Math.floor((Math.random()*200)-100)});

let maxPos=[];
let tempPos=[];
let previ=array[0];
for(i of array){
  if((i>=0)&&(i>=previ)){
    previ=i;
    tempPos.push(i);
  }else{
    if(tempPos.length>=maxPos.length){
      maxPos=tempPos;
    }
    previ=i;
    tempPos=[];
  }
}
console.log(maxPos.length?maxPos:'No');
