import {config} from 'dotenv'

config()
//_to show its private
const _conf={
    port:process.env.PORT || 3000,
    MongoDBUrl:'mongodb+srv://patelshreyansh376:Shreyansh$123@cluster0.uhze3sb.mongodb.net/',
    env:process.env.NODE_ENV,
    jwtSecret:process.env.JWT_SECRET,
    cloudName:process.env.CLOUD_NAME,
    apiKey:process.env.API_KEY,
    apiSecret:process.env.API_SECRET
}
export const conf=_conf