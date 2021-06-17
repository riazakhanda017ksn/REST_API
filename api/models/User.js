const mongoose=require('mongoose')
const Schema = mongoose.Schema
const valid=require('validator')
const UserSchema=new Schema({
    email :{
        type: String,
        trim: true,
        validate:{
               validator: (v)=>{
                   return valid.isEmail(v)
               },
               message: `{VALUE} is not define`
        }
},
password:String
})

const User=mongoose.model('User',UserSchema)

module.exports =User