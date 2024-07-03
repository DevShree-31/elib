import { NextFunction, Request, Response } from "express";
import cloudinary from "../../config/cloudinary";
import path from "node:path/win32";
import fs from "node:fs"
import createHttpError from "http-errors";
import bookModel from "./bookModel";
const createBook=async (req:Request,res:Response,next:NextFunction)=>{
    const {title,genre}=req.body

    const files=req.files as {[fieldname:string]:Express.Multer.File[]}
    const coverImageMimeType=files.coverImage[0].mimetype.split('/').at(-1)
    const fileName=files.coverImage[0].filename
    const filePath=path.resolve(__dirname,'../../public/data/uploads',fileName)
    try {
        const uploadResult=await cloudinary.uploader.upload(filePath,{
            filename_override:fileName,
            folder:'book-covers',
            format:coverImageMimeType
        })
    
        const bookFileName=files.file[0].filename
        const bookFilePath=path.resolve(__dirname,'../../public/data/uploads',bookFileName)
        
            const bookFileUploadResult=await cloudinary.uploader.upload(bookFilePath,{
                resource_type:'raw',
                filename_override:bookFileName,
                folder:'book-pdfs',
                
            })
            
        //Creating new book 
        const newBook=await bookModel.create({
            title,
            genre,
            author:'668389d95a8b16d5c57aafae',
            coverImage:uploadResult.secure_url,
            file:bookFileUploadResult.secure_url
        })
        await fs.promises.unlink(filePath)
        await fs.promises.unlink(bookFilePath)
        return res.status(201).json({id:newBook._id});
    } catch (error) {
        return next(createHttpError(500,'Error while uploading files'))
    }
}

export {createBook}