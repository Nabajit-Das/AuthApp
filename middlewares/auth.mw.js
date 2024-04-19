const jsonwebtoken=require("jsonwebtoken")
const authConfig=require("../configs/auth.configs")
const User= require("../models/user.model")

exports.verifyToken=async(req,res,next)=>{
    const token = await req.headers.authorization.split(" ")[1]
    if(!token){
        return res.status(403).send({
            message:"Error in accessing token"
        })
    }
    else{
        jsonwebtoken.verify(token,authConfig.secret,(err,decoded)=>{
            if(err){
                return res.status(401).send({
                    message:"Unauthorized"
                })
            }
            req.userId=decoded.id
            next()
        })
    }
}
