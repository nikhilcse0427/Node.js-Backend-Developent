import userModel from "../models/user.model.js";
import jwt from 'jsonwebtoken'
import argon2 from "argon2";
import sessionModel from "../models/session.model.js";

const userRegisteration = async (req, res)=>{
  try{
    let {userName, email, password} = req.body;
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

    user.password = undefined;

    const accessToken = jwt.sign(
      {user:user._id},
      process.env.JWT_SECRET_KEY,
      {expiresIn: '1h'}
    );

    const refreshToken = jwt.sign(
      {user:user._id},
      process.env.JWT_SECRET_KEY,
      {expiresIn: '7d'}
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: true,
      maxAge: 7*24*60*60*1000 //days
    })

    res.status(201).json({
      message: "user successfully created",
      success: true,
      token: accessToken,
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

const userLogin = async (req, res) => {
  try {
    let { userName, email, password } = req.body;

    if ((!userName && !email) || !password) {
      return res.status(400).json({
        message: "Username/email and password are required",
        success: false
      });
    }

    let user = await userModel
      .findOne({ $or: [{ userName }, { email }] })
      .select("+password");

    if (!user) {
      return res.status(401).json({
        message: "Invalid credentials",
        success: false
      });
    }

    const isPasswordMatch = await user.comparePassword(password);
    console.log("Password match:", isPasswordMatch);
    
    if (!isPasswordMatch) {
      return res.status(401).json({
        message: "Invalid credentials",
        success: false
      });
    }

    const refreshToken = jwt.sign({id:user.id}, process.env.JWT_SECRET_KEY, {expiresIn: '1d'});

    const hashedRefreshToken = await argon2.hash(refreshToken);

    const session = await sessionModel.create({
      user: user._id,
      ip: req.ip,
      refreshToken: hashedRefreshToken,
      userAgent: req.headers[ "user-agent" ]
    })

    const accessToken = jwt.sign({id:user.id, sessionId: session._id}, process.env.JWT_SECRET_KEY, {expiresIn: '15m'});

    res.cookie("refreshToken",refreshToken,{
       httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    user.password = undefined;

    return res.status(200).json({
      message: "User successfully logged in",
      success: true,
      user: user,
      token: accessToken
    });

  } catch (error) {
    console.log("Login failed ", error.message);

    return res.status(500).json({
      message: "Internal server error",
      success: false
    });
  }
};

const getMe = async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        message: "Token not found",
        success: false,
      });
    }


    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const user = await userModel
      .findById(decodedToken.user) // ✅ FIXED
      .select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User does not exist",
        success: false,
      });
    }

    return res.status(200).json({
      message: "User found",
      success: true,
      user,
    });

  } catch (error) {
    console.log("get me unsuccessful", error.message);

    return res.status(401).json({
      message: error.message,
      success: false,
    });
  }
};

const refreshToken = async (req, res)=>{
  try{
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken){
      return res.status(400).json({
        message: "refresh token not found",
        success: false
      })
    }
    const decodedRefreshToken = jwt.verify(refreshToken, process.env.JWT_SECRET_KEY);

    const accessToken = jwt.sign({id: decodedRefreshToken.id}, process.env.JWT_SECRET_KEY, {expiresIn: '1h'});
    const generateNewRefreshToken = jwt.sign({id: decodedRefreshToken.id}, process.env.JWT_SECRET_KEY, {expiresIn: '15d'})

    res.cookie("refreshToken", generateNewRefreshToken, {
      httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });
    return res.status(200).json({
      message: "access token and refresh token successfully created",
      success: true,
      accessToken: accessToken
    })
  }catch(error){
    console.log("access token not created ", error.message);
    res.status(401).json({
      message: "access token not created",
      success: false
    })
  }
}

const logout = async (req, res)=>{
  try{
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken){
      return res.json(400).json({
        message: "refresh token not found",
        success: false
      })
    }
    const decodedRefreshToken = (refreshToken, process.env.JWT_SECRET_KEY);


  }catch(error){
    console.log("logout failed ", error.message);
    res.status(409).json({
      message: "Logout failed",
      success: false
    })
  }
}



export {userRegisteration, userLogin, getMe, refreshToken, logout};