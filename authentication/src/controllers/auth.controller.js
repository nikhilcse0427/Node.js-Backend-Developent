import userModel from "../models/user.model.js";
import jwt from 'jsonwebtoken'

const userRegisteration = async (req, res)=>{
  try{
    const {userName, email, password} = req.body;
    if(!userName || !email || !password){
      res.status(400).json({ // status code 400 -user sent invalid or incomplete data
        message: "All fields are required for user registeration",
        success: false
      })
      return;
    }

    const isUserAlreadyRegistered = await userModel.findOne({
      $or:[{userName}, {email}]
    })

    if(isUserAlreadyRegistered){
      res.status(409).json({ //You are trying to create a resource (user), ➡️ But it already exists
        message: "user with this email or username already exist",
        success: false
      })
      return;
    }

    const user = await userModel.create({
      userName,
      email,
      password
    })

    const token = await jwt.sign(
      {user:user._id},
      process.env.JWT_SECRET_KEY,
      {expiresIn: '1d'}
    );

    res.status(201).json({
      message: "user successfully created",
      success: true,
      token: token,
      user: user
    })
    


  }catch(error){
    console.log("user registeration failed ", error.message);
    res.status(400).json({
      message: "user registeration failed",
      success: false
    })
  }
}

const loginUser = async (req, res)=>{
  try{
    const {userName, email, password} = req.body;
    if(!userName || !email || !password){
      res.status(409).json({
        message: "all fields are required",
        success: false
      })
    }
    return;
    const isUserRegistered = await userModel.findBy
  }catch(error){

  }
}




export {userRegisteration}