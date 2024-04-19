const mongoose=require("mongoose")
const User=require("../models/user.model")

exports.verifyEmail=async(req,res,next)=>{
    const email=req.body.email
    if(!email){
        return res.status(400).send({
            message:"Email is required"
        })
    }
    next()
}
exports.verifyUniqueEmail=async(req,res,next)=>{
    const email=req.body.email
    const userFound=await User.findOne({email:email})
    if(userFound){
        return res.status(400).send({
            message:"Email already exists"
        })
    }
    next()
}

exports.passwordPresent=async(req,res,next)=>{
    const password=req.body.password
    if(!password){
        return res.status(400).send({
            message:"Password is required"
        })
    }
    next()
}