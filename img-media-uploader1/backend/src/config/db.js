import mongoose from "mongoose";

const connectDB = async () => {
  try{
    const connectInstance = await mongoose.connect(process.env.MONGODB_URI)
    console.log("Connected to MongoDB: ",connectInstance.connection.host);
  }catch(error){
    console.log("Error connecting to MongoDB: ",error);
    process.exit(1); // stops the server from running
  }
}

export {connectDB};