import "babel-polyfill";

let a=new Promise();
let b=()=>{console.log('arrow function')}
a.then(function(resolve,reject){
    resolve();
}).then(()=>{console.log('哈哈哈')})