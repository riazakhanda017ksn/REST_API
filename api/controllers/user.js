const User= require('../models/User')
const bcrypt=require('bcrypt')
const jwt =require('jsonwebtoken')
const registeredController=(req,res,next)=>{
   bcrypt.hash(req.body.password,10,(err, hash)=>{
      if(err){
          res.json({
              error:err
          })
      }
     let user=new User({
         email:req.body.email,
         password:hash
     })
     user.save()
     .then(result=>{
         res.status(201).json({
             message:'User created successfully',
             user: result
         })
     })
     .catch(error=>{
         res.json({
             error
         })
     })
   })
}

const getAllUser=(req,res,next)=>{
    User.find()
    .then(users=>{
        res.json({
            users
        })
    })
    .catch(error=>{
        res.json({
            error
        })
    })
}
const logInController = (req,res,next)=>{
    let email= req.body.email
    let password= req.body.password
    User.findOne({email})
    .then(user=>{
        if(user){
            bcrypt.compare(password, user.password,(err, result)=>{
                if(err){
                    res.json({
                        message:'Error Occured'
                    })
                }
                if(result){
                    let token =jwt.sign({email:user.email, _id:user.id},'SECRETE',{expiresIn:'2h'})
                    res.json({
                        message:'Login Successfully',
                        token
                    })
                }
                else{
                    res.json({
                        message:'Password doesn\'t match please try again '
                    })
                }
            })
        }else{
            res.json({
                message:' result 404, user not found '
            })
        }
    })
    
}
module.exports={
    registeredController,
    getAllUser,
    logInController
}