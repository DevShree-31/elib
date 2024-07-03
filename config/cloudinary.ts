import { v2 as cloudinary } from 'cloudinary';
import { conf } from './config';

    cloudinary.config({ 
        cloud_name: conf.cloudName, 
        api_key: conf.apiKey, 
        api_secret: conf.apiSecret // Click 'View Credentials' below to copy your API secret
    });

    export default cloudinary