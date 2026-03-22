import userModel from "../models/user.model.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

const userRegisteraion = async (req, res)=>{
  try{
    let {userName, email, password, role="user"} = req.body;
    if(!userName || !email || !password){
      return res.status(400).json({
        message: "All fields are required",
        success: false
      })
    }

    const isUserAlreadyExist = await userModel.findOne({$or: [
      {email},
      {userName}
    ]})

    if(isUserAlreadyExist){
      return res.status(409).json({
        message: "user with this email or userName already exist",
        success: false
      })
    }

    const user = await userModel.create({
      userName,
      email,
      password,
      role
    })

    const token = jwt.sign(
      {id: user.id, role:user.role},
      process.env.JWT_SECRET,
      {expiresIn: '15h'}
    )

    res.cookie("user", token);

    res.status(201).json({
      message: "user registered successfully",
      success: true,
      user: user,
      token: token
    })
  }catch(error){
    console.log("user registeration failed ", error.message);
    res.status(500).json({
      message: "user registeration failed",
      success: false
    })
  }
}

const userLogin = async (req, res)=>{
  try{
    let {userName, email, password} = req.body;
    if(!email || !password || !userName){
      return res.status(400).json({
        message: "email, password and userName all fields are required",
        success: false
      })
    }

    const user = await userModel.findOne({userName, email}).select("+password")

    if(!user){
      return res.status(401).json({
        message: "Invalid userName or email",
        success: false
      })
    }

    const isPasswordMatch = await user.comparePassword(password);
    if(!isPasswordMatch){
      return res.status(401).json({
        message: "Invalid password entered",
        success: false
      })
    }

    const token = jwt.sign(
      {id: user.id, role:user.role},
      process.env.JWT_SECRET,
      {expiresIn: '15h'}
    )

    res.cookie("user", token);

    user.password = undefined

    res.status(200).json({
      message: "user login successfully",
      success: true,
      user: user,
      token: token
    })
  }catch(error){
    console.log("user login failed ", error.message);
    res.status(500).json({
      message: "user login failed",
      success: false
    })
  }
}



export {userRegisteraion, userLogin};