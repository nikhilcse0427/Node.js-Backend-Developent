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

// const userLogin = async (req, res)=>{
//   try{
//     const {userName, email, password} = req.body;
//     if((!userName && !email) || !password){
//       res.status(400).json({
//         message: "all fields are required",
//         success:false
//       })
//       return;
//     }
//     const user = await userModel.findOne({$or:[{userName}, {email}]}).select('+password');
//     if(!user){
//       res.status(401).json({
//         message: "Invalid credential for login",
//         success: false
//       })
//        return;
//     }
//     const isPasswordMatch = await user.comparePassword(password);

//     if(!isPasswordMatch){
//         res.status(401).json({
//           message: "password does not match enter correct password",
//           success: false
//         })
//         return;
//     }
//     // user.password=undefined;
//     res.status(200).json({
//       message: "user successfully loggedin",
//       success: false,
//       user: user
//     })
//   }catch(error){
//     console.log("Login failed ", error.message)
//     res.status(401).json({
//       message: "Invalid credential please enter correct credentials",
//       success: false
//     })
//   }
// }

const userLogin = async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    // 1. Validation
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



export {userRegisteration, userLogin};