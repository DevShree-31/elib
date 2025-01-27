import express from "express";
import { createBook, deleteBook, getSingleBook, listBooks, updateBook } from "./bookController";
import multer from "multer";
import path from "node:path/win32";
import authenticate from "../middlewares/authenticate";

const bookRouter=express.Router();
// middleware for file upload
const upload=multer({
    dest:path.resolve(__dirname,'../../public/data/uploads'),
    limits:{fileSize:10*1024*1024} // 30 mb 
})
bookRouter.post('/',authenticate,upload.fields([
    {name:'coverImage',maxCount:1},
    {name:'file',maxCount:1}
]),createBook);
bookRouter.patch('/:bookId',authenticate,upload.fields([
    {name:'coverImage',maxCount:1},
    {name:'file',maxCount:1}
]),updateBook);
//get all books route
bookRouter.get('/',listBooks)
// get single book
bookRouter.get('/:bookId',getSingleBook)
bookRouter.delete('/:bookId',authenticate,deleteBook)

export default bookRouter