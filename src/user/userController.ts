import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import userModel from "./userModel";
import bcrypt from "bcrypt"
import { sign } from "jsonwebtoken";
import { conf } from "../../config/config";
import { User } from "./userTypes";
const createUser=async (req:Request,res:Response,next:NextFunction)=>{
    const {name,email,password}=req.body
    //Validation
    if(!name ||!email ||!password){
        const error=createHttpError(400,"All fields are required")
        return next(error)
    }
    //Database Call
    try {
        const user=await userModel.findOne({email})
    if(user){
        const error=createHttpError(400,"User Already exist")
        return next(error)
    }
    } catch (error) {
        return next(createHttpError(500,'Error while creating user'))
    }
    
    
    // hashed password
    const hashedPassword=await bcrypt.hash(password,10);
    let newUser:User;
    try {
        newUser=await userModel.create({
            name:name,
            email:email,
            password:hashedPassword
        })
    } catch (error) {
        return next(createHttpError(500,'Error while creating a user'))
    }
    
    //Generate a JWT token on creation
    try {
        const token=sign({sub:newUser._id},conf.jwtSecret as string,{expiresIn:'7d'})
    res.json({acessToken:token});
    } catch (error) {
        return next(createHttpError(500,'Error while generating token'))
    }
}


export default createUser