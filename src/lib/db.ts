import { connect } from "mongoose";

let mongodbUrl = process.env.MONGODB_URL ;

if (!mongodbUrl) {
    throw new Error("MONGODB_URL is not defined in environment variables");
}

// Avoid multiple connections in development so use a global variable to cache the connection
let cached=global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
    // Return the existing connection if it exists
    if (cached.conn) {
        console.log("Cached DB connected!");
        return cached.conn;
    }   

    // Create a new connection promise if it doesn't exist
    if (!cached.promise) {
        cached.promise = connect(mongodbUrl).then((c)=> c.connection);  
      }

    // Assign the resolved promise value to conn if promise is pending and conn is null.
    try {
        cached.conn = await cached.promise;
        console.log("DB connected!");
    } catch (error) {
        throw error;
    }

return cached.conn;

}

export default connectDB;