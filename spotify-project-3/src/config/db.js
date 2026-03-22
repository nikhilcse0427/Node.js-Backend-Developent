import dotenv from 'dotenv'
dotenv.config({
  path: './.env'
})
import mongoose from 'mongoose';

const connectDB = async ()=>{
  try{
    const connectionInstance = await mongoose.connect(process.env.MONGODB_URI);
    console.log("Mongodb connected successfully ");
  }catch(error){
    console.log("Mongodb connection failed ", error.message);
    process.exit(1);
  }
}

export {connectDB};