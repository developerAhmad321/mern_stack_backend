import { my_db } from "../constants.js";
import mongoose from "mongoose"


const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/{my_db}`)
            console.log(`\n MongoDB connected successfully !! DB Host ${connectionInstance.connection.host}`);
            
    } catch (error) {
        console.log("MONGODB connection failed",error);
        process.exit(1)
    }
}

export default connectDB 