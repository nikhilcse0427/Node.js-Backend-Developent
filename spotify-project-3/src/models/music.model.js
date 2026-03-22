import { timeStamp } from "console";
import mongoose, { Mongoose } from "mongoose";

const musicSchema = new mongoose.Schema({
  artist:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  uri:{
    type:String,
    required: true
  },
  title:{
    type: String,
    required: true
  }

}, {timeStamp: true})

const musicModel = Mongoose.model("Music", musicSchema);
export {musicModel};