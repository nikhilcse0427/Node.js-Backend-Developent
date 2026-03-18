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
    const token = req.header.authorization.split(' ')[1];
    const { userName, email, password } = req.body;

    if ((!userName && !email) || !password) {
      return res.status(400).json({
        message: "Username/email and password are required",
        success: false
      });
    }

    const user = await userModel
      .findOne({ $or: [{ userName }, { email }] })
      .select("+password");

    if (!user) {
      return res.status(401).json({
        message: "Invalid credentials",
        success: false
      });
    }

    const isPasswordMatch = await user.comparePassword(password);

    if (!isPasswordMatch) {
      return res.status(401).json({
        message: "Invalid credentials",
        success: false
      });
    }

    user.password = undefined;

    return res.status(200).json({
      message: "User successfully logged in",
      success: true,
      user: user
    });

  } catch (error) {
    console.log("Login failed ", error.message);

    return res.status(500).json({
      message: "Internal server error",
      success: false
    });
  }
};

// const getMe = async (req, res)=>{
//   try{
//     const token = req.headers.authorization.split(' ')[2];
//     if(!token){
//       return res(409).json({
//         message: "token not found",
//         sucess: false,
//       })
//     }
//     const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
//     const user = await userModel.findById(decodedToken.id).select('-password');
//     if(!user){
//       return res.json({
//         message: "user does not exist",
//         success: false
//       })
//     }
//     res.status(200).json({
//       message: "user found",
//       success: false,
//       user: user
//     })
//   }catch(error){
//     console.log("get me unsuccessfull", error.message);
//     res.status(401).json({
//       message: "get me unsuccessfull",
//       success: false
//     })
//   }
// }

// const getMe = async (req, res)=>{
//   try{
//     const token = req.headers.authorization.split(' ')[1];
//     if(!token){
//       return res(409).json({
//         message: "token not found",
//         sucess: false,
//       })
//     }
//     const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
//     const user = await userModel.findById(decodedToken.id).select('-password');
//     if(!user){
//       return res.json({
//         message: "user does not exist",
//         success: false
//       })
//     }
//     res.status(200).json({
//       message: "user found",
//       success: false,
//       user: user
//     })
//   }catch(error){
//     console.log("get me unsuccessfull", error.message);
//     res.status(401).json({
//       message: "get me unsuccessfull",
//       success: false
//     })
//   }
// }

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



export {userRegisteration, userLogin, getMe};