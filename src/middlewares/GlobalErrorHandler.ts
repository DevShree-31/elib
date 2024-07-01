import { NextFunction, Request, Response } from "express";
import { HttpError } from "http-errors";
import { conf } from "../../config/config";

const GlobalErrorHandler=(err:HttpError,req:Request,res:Response,next:NextFunction)=>{
    const statusCode=err.statusCode||500;
    return res.status(statusCode).json({
        message:err.message,
        errorStack:conf.env=='development'?err.stack:'', //stack trace will be shown only in development mode
    });
};

export default GlobalErrorHandler