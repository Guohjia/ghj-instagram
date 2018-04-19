const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const  CommentSchema = new mongoose.Schema({
    post:{type:ObjectId,ref:'Post'},
    from:{type:ObjectId,ref:'User'},
    to:{type:ObjectId,ref:'User'},
    content: String,
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

CommentSchema.pre('save', function(next){
    if (this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now()
      }
      else {
        this.meta.updateAt = Date.now()
      }
    
      next()
})

// CommentSchema.methods = {
//     comparePassword: function(_password,cb){
//         return new Promise((resolve)=>{
//             bcrypt.compare(_password,this.password,function(err,isMatch){
//                 if(err) return cb(err);
//                 cb(null,isMatch);
//                 resolve();
//             })
//         })
//     }
// }

CommentSchema.statics = {
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

module.exports = CommentSchema;
