import jwt from "jsonwebtoken";
import { uploadMusicFile } from "../services/fileUpload.service.js";
import { musicModel } from "../models/music.model.js";

const createMusic = async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(400).json({
        message: "token is required",
        success: false
      })
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    if (decodedToken.role !== 'artist') {
      return res.status(401).json({
        message: "unauthorized user",
        success: false
      })
    }

    const { title, artist } = req.body;
    const buffer = req.file?.buffer;

    if (!title || !artist || !buffer) {
      return res.status(400).json({
        message: "all fields are required",
        success: false
      })
    }

    const url = await uploadMusicFile(req.file.buffer);
    

    const music = await musicModel.create({
      uri: url,
      artist: decodedToken.id,
      title
    })
    // In your controller



    res.status(200).json({
      message: "music created successfully",
      success: true,
      music: music
    })
  } catch (error) {
    console.log("music creation failed ", error?.message || error);
    res.status(500).json({
      message: "music creation failed",
      success: false
    })
  }
}

export { createMusic };