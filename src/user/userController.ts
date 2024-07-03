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
    res.status(201).json({acessToken:token});
    } catch (error) {
        return next(createHttpError(500,'Error while generating token'))
    }
}

const loginUser=async (req:Request,res:Response,next:NextFunction)=>{
        const {email,password}=req.body;
        if(!email||!password){
            return next(createHttpError(400,'All fields are required'))
        }

        //Email exist or not 
        let user;
        try {
            user=await userModel.findOne({email});
        if(!user){
            return next(createHttpError(404,'User not found '))
        }
        } catch (error) {
            return next(createHttpError(500,'User not logged in '))
        }
        
        //Checking the password
        try {
            const isMatch=await bcrypt.compare(password,user.password)
        if(!isMatch){
            return next(createHttpError(400,'Username or Password is incorrect'))
        }
        } catch (error) {
            return next(createHttpError(500,'Error while logging a user'))
        }
        
        //Token signature
        try {
            const token=sign({sub:user._id},conf.jwtSecret as string,{expiresIn:'7d'})

            res.status(201).json({acessToken:token});
        } catch (error) {
            return next(createHttpError(500,'Error while generating token'))
        }
}


export  {createUser,loginUser}