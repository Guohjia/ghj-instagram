const cp = require('child_process');
const { resolve } =  require('path');

(async () => {
    const script = resolve(__dirname,'../crawler/datalist.js');
    const child = cp.fork(script,[]);
    let invoked = false;

    child.on('error', err => {
        if (invoked) return;
        invoked = true;
        console.log('error')
    });

    child.on('exit',code => {
        if(invoked) return;
        invoked = false;
        let err = code === 0?null: new Error('exit code' + code);

        console.log(err)
    })

    child.on('message',data=>{
        let result = data.result;
        console.log(result)
    })
})()