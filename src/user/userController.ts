import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import userModel from "./userModel";
import bcrypt from "bcrypt"
import { sign } from "jsonwebtoken";
import { conf } from "../../config/config";
const createUser=async (req:Request,res:Response,next:NextFunction)=>{
    const {name,email,password}=req.body
    //Validation
    if(!name ||!email ||!password){
        const error=createHttpError(400,"All fields are required")
        return next(error)
    }
    //Database Call
    const user=await userModel.findOne({email})
    if(user){
        const error=createHttpError(400,"User Already exist")
        return next(error)
    }
    const hashedPassword=await bcrypt.hash(password,10);
    const newUser=await userModel.create({
        name:name,
        email:email,
        password:hashedPassword
    })
    //Generate a JWT token on creation
    const token=sign({sub:newUser._id},conf.jwtSecret as string,{expiresIn:'7d'})
    res.json({acessToken:token});
}


export default createUser