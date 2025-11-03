import { MongoClient } from "mongodb";
        
const uri = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}`;
const client = new MongoClient(uri)
      
export const mongodb = client.db(process.env.MONGO_DB, { ignoreUndefined: true });