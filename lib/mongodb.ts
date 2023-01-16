// /lib/dbConnect.js
import mongoose, { Mongoose } from "mongoose";

/** 
Source : 
https://github.com/vercel/next.js/blob/canary/examples/with-mongodb-mongoose/utils/dbConnect.js 
**/

const MONGODB_URI: any = process.env.MONGODB_URI;
const MONGODB_DATABASE: any = process.env.MONGODB_DATABASE;

if (!MONGODB_URI) {
     throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached: any = global.mongoose;

if (!cached) {
     cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
     if (cached.conn) {
          return cached.conn;
     }

     if (!cached.promise) {
          const opts = {
               useNewUrlParser: true,
               useUnifiedTopology: true,
               bufferCommands: false,
               dbName: MONGODB_DATABASE,
          };

          cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
               return mongoose;
          });
     }
     cached.conn = await cached.promise;
     return cached.conn;
}

export default dbConnect;
