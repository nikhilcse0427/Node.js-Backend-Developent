import mongoose from "mongoose";

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

}, { timestamps: true });

const musicModel = mongoose.model("Music", musicSchema);

export { musicModel };
