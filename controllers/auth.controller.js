const mongoose=require("mongoose")
const bcryptjs=require("bcryptjs")
const jsonwebtoken=require("jsonwebtoken")
const User=require("../models/user.model")
const authConfig=require("../configs/auth.configs")

exports.signUp=async(req,res)=>{
    const reqBody=req.body
    const newUser={
        email:reqBody.email,
        password:bcryptjs.hashSync(reqBody.password,8)
    }
    try{
        const user=await User.create(newUser)
        res.status(201).send({
            message:"User created"
        })
    }
    catch(err){
        console.log(err)
        console.log("Error in creating user")
        res.status(500).send({
            message:"Server Error in creating user"
        })
    }
}

exports.signIn=async(req,res)=>{
    const reqBody=req.body
    const userFound= await User.findOne({email:reqBody.email})
    if(userFound===null){
        res.status(404).send({
            message:"User not found"
        })
    }
    else{
        const passwordIsValid=bcryptjs.compareSync(reqBody.password,userFound.password)
        if(passwordIsValid){
            const token=jsonwebtoken.sign({id:userFound.email},authConfig.secret,{
                expiresIn:"1h"
            })
            res.status(200).send({
                message:"Signed In successfully",
                token:token,
                user:userFound.email
            })
        }
        else{
            res.status(401).send({
                message:"Invalid Email or Password"
            })
        }
    }
}

exports.signInCheck=async(req,res)=>{
    res.status(200).send({
        message:"User is signed in"
    })
}