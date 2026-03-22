import { timeStamp } from "console";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  userName:{
    type: String,
    minlen: [5, "userName must be aleast 5 character long."],
    unique: [true, "userName must be unique."],
    required: true
  },
  email:{
    type: String,
    unique: [true, "userName must be unique."],
    required: true
  },
  password:{
    type: String,
    minlen: [5, "password must be aleast 5 character long."],
    required: true,
    select: false
  }, 
  role:{
    type: String,
    enum: ["user", "artist"],
    default: "user",
  }
}, {timeStamp:true})


userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next;

  const hashedPassword = await bcrypt.hash(this.password, 10);
  this.password = hashedPassword;

  next;
});

userSchema.methods.comparePassword = async function(password){
  return await bcrypt.compare(password, this.password);
}

const userModel = mongoose.model("User", userSchema);
export default userModel;