import userModel from "../models/user.model.js";
import jwt from 'jsonwebtoken';

const createMusic = async (req, res)=>{
  try{
    const token = req.cookies.token;
    if(!token){
      return res.status(400).json({
        message: "token is required",
        success: false
      })
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    if(decodedToken.role !== "artist"){
      return res.status(403).json({
        message: "you are not authorized to create music",
        success: false
      })
    }

    


  }catch(error){
    console.log("music creation failed ", error.message);
    res.status(401).json({
      message: "music creation failed",
      success: false
    })
  }
}

export {createMusic};