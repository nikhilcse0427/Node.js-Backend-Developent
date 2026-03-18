import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"users",
    required: [true, "user is required"],
  },
  ip:{
    type: String,
    required: [true, "IP is required"]
  },
  userAgent: {
    type: String,
    required: [ true, "User agent is required" ]
  },
  hashedRefreshToken:{
    type: String,
    required: [true, "refresh token is required"]
  },
  isRevoked: Boolean,
  default: false
}, {timestamps: true})


const sessionModel = mongoose.model("Session", sessionSchema);
export default sessionModel;