import mongoose from 'mongoose'

const albumSchema = new mongoose.Schema({
  songs: [
    {
      type: String,
      required: true
    }
  ],
  artist:{
    type:String,
    required: true
  },
  title: {
    type: String,
    required: true
  }
})

const albumModel = mongoose.model("Album", albumSchema);
export {albumModel};