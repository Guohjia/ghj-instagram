const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const SALT_WORK_FACTOR = 10;

//Schema => 概要
const  UserSchema = new mongoose.Schema({
    userName: {
        unique: true,
        type: String
    },
    password: String,
    meta: {
        createAt: {
            type: Date,
            default: Date.now()
        },
        updateAt: {
            type: Date,
            default: Date.now()
        }
    }
})

UserSchema.pre('save', function(next){
    let user = this;
    if(this.isNew) {
        console.log('new...')
        this.meta.createAt = this.meta.updateAt = Date.now();
    }else{
        console.log('no new....') //这里什么时候进来
        this.meta.updateAt = Date.now();
    }

    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt){
        if(err) return next(err);
        bcrypt.hash(user.password, salt, function(err, hash){
            if(err) return next(err);
            user.password = hash;
            next();
        });
    });
})

UserSchema.methods = {
    comparePassword: function(_password,cb){
        return new Promise((resolve)=>{
            bcrypt.compare(_password,this.password,function(err,isMatch){
                if(err) return cb(err);
                cb(null,isMatch);
                resolve();
            })
        })
    }
}

UserSchema.statics = {
    fetch: function(cb) {
        return this
            .find({})
            .sort('meta.updataAt')
            .exec(cb)
    },
    findById: function(id, cb){
        return this
            .findOne({_id: id})
            .exec(cb)
    }
}

module.exports = UserSchema;
