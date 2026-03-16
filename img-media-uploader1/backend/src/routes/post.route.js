import express from "express";
import { upload } from '../middlewares/upload.js'
import { uploadFile } from "../services/fileUpload.service.js";
import { postModel } from "../models/post.model.js";

const router = express.Router()


router.post('/create-post', upload.single("image"), async (req, res) => {
  try {
    if (!req.file?.buffer) {
      return res.status(400).json({
        message: "image file is required",
        hint: "Send multipart/form-data with field name 'image' (type: File).",
      });
    }

    const response = await uploadFile(req.file.buffer);

    const post = await postModel.create({
      image: response.url,
      caption: req.body.caption,
    });

    return res.status(201).json({
      message: "post saved successfully at mongodb",
      post,
    });
  } catch (error) {
    return res.status(500).json({
      message: "failed to create post",
      error: error.message,
    });
  }

})


export { router }