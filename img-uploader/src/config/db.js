import mongoose from 'mongoose';

const connectDb = async ()=>{
  try{
    const connectInstance = await mongoose.connect(process.env.MONGODB_URI);
    console.log("Mongodb connected successfully !! ", connectInstance.connection.host);
  }catch(error){
    console.log("Mongodb connect error: ", error.message);
    process.exit(1) // stops the server
  }
}

export default connectDb;