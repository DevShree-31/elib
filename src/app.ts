import express from 'express'
import GlobalErrorHandler from './middlewares/GlobalErrorHandler';
import userRouter from './user/userRouter';
import bookRouter from './book/bookRouter';

const app=express();
//Routes 
//Https methods will be used GET,POST,PATCH,DELETE,PUT
app.use(express.json())//It is used for json parsing
app.get('/',(req,res,next)=>{
    // const error=createHttpError(400,'Something Went Wrong')
    // throw error
    res.json({message:"Welcome to Elibrary"});
})

app.use('/api/users',userRouter)
app.use('/api/books',bookRouter)

//Global Error Handler 
    app.use(GlobalErrorHandler)
export default app

