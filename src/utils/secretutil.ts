import { settings } from '../settings'
import dotenv from 'dotenv';

dotenv.config = settings.GetEnvironmentConfig();

class SecretUtil {

    //Define the node environment
    public PORT = process.env.NODE_PORT;
    public HOST = process.env.NODE_HOST;

    //Define MongoDB Server
    public MONGODB_SERVER = process.env.MONGODB_SERVER;
    public MONGODB_USERNAME = process.env.MONGODB_USERNAME;
    public MONGODB_PASSWORD = process.env.MONGODB_PASSWORD;
    public MONGODB_DBNAME = process.env.MONGODB_DBNAME;
    

}

export const secretUtil = new SecretUtil();