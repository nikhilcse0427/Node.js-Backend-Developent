import mongoose from "mongoose";
import argon2 from 'argon2';

const userSchema = new mongoose.Schema({
  userName:{
    type: String,
    unique: [true, "userName must be unique"],
    minlength: [6, "userName length must be atleast six character long"],
    required: [true, "userName required"]
  },
  email:{
    type: String,
    unique: [true, "email must be unique"],
    required: [true, "email required"]
  },
  password:{
    type: String,
    minlength: [6, "password length must be atleast six character long"],
    select: false,
    required: [true, "password is required"],
  }
}, {timestamps: true})





userSchema.pre("save", async function (next){
  if(!this.isModified('password')) return next();
  const hashedPassword = await argon2.hash(this.password);
  this.password = hashedPassword;
  next;
})

userSchema.methods.comparePassword = async function(password){
  return argon2.verify(this.password, password);
}

const userModel = mongoose.model("User", userSchema);
export default userModel;

