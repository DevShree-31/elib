import express from 'express'

const app=express();

//Routes 
//Https methods will be used GET,POST,PATCH,DELETE,PUT

app.get('/',(req,res,next)=>{
    res.json({message:"Welcome to Elibrary"});
})
export default app

