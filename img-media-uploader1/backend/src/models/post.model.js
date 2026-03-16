import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  image:{
    type: String,
    required: [true, "Image is required"],
  },
  caption:{
    type: String
  }
})

const postModel = mongoose.model("Post", postSchema);
export {postModel};