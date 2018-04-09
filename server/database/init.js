const mongoose = require('mongoose');
const db = 'mongodb://localhost/instagam';


mongoose.Promise = global.Promise;

exports.connect = () =>  {
    let maxConnectTimes = 0;
    return new Promise((resolve,reject)=>{
        if (process.env.NODE_ENV !=='production'){
            mongoose.set('debug',true);
        }
    
        mongoose.connect(db);
    
        mongoose.connection.on('disconnected', () => {
            if(maxConnectTimes < 5){
                mongoose.connect(db); //重新连接
            }else{
                throw new Error('数据库出错,disconnected')
            }
        })
    
        mongoose.connection.on('error', error => {
            maxConnectTimes++;
            if(maxConnectTimes < 5){
                mongoose.connect(db); //重新连接
            }else{
                throw new Error('数据库出错了')
            }
        })
    
        mongoose.connection.once('open', () => {
            resolve();
        }) 
    }).then(()=>{
        console.log('MongoDB Connected Successfully')
    })
}