const mongoose = require('mongoose');
const db = 'mongodb://localhost/instagam';


mongoose.Promise = global.Promise;

exports.connect = () =>  {
    return new Promise((resolve,reject)=>{
        if (process.env.NODE_ENV !=='production'){
            mongoose.set('debug',true);
        }
    
        mongoose.connect(db);
    
        mongoose.connection.on('disconnected', () => {
            // mongoose.connect(db); //重新连接
        })
    
        mongoose.connection.on('error', error => {
            reject(error);
        })
    
        mongoose.connection.once('open', () => {
            resolve();
        })
    
        
    }).then(()=>{
        console.log('MongoDB Connected Successfully')
    },(err)=>{
        console.log('数据库出错了')
        console.log(err)
    })
}