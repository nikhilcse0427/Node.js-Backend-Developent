import dotenv from "dotenv";
dotenv.config();
import ImageKit from "imagekit";
// Install: npm install @imagekit/nodejs



const client = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT, // add this in your .env
});


const uploadFile = async (buffer)=>{
  try{  
    const response = await client.upload({
      file: buffer.toString("base64"),
      fileName: "image.jpg",
    });
    return response;
  }catch(error){
    console.log("image not uploaded ", error.message)
    throw error;
  }
}

export {uploadFile}