import mongoose from 'mongoose';

const connectDB = async ()=>{
    try{
        const mongoURL = process.env.MONGO_URL;

    if(!mongoURL) {
            throw new Error("MongoDB URI is not defined");
        }
        await mongoose.connect(mongoURL);
        console.log("MongoDB connected successfully");

    }catch (error) {
        if(error instanceof Error) {
        console.error("MongoDB connection failed:", error.message);
        process.exit(1); 
     }
    }
}

export { connectDB }