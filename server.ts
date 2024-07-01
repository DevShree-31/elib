import mongoose from "mongoose";
import { conf } from "./config/config";
import app from "./src/app";

    mongoose.connect(conf.MongoDBUrl).then(()=>app.listen(conf.port,()=>{
        console.log(`Connection established on ${conf.port}`)
    })).catch((error)=>console.log(error.message))