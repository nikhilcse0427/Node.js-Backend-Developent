import express from 'express';
import { createMusic } from '../controllers/user.controller.js';
import { upload } from '../middlewares/multer.middleware.js';

const musicRoutes = express.Router();

musicRoutes.post('/upload-music', upload.single("music"), createMusic);

export { musicRoutes };