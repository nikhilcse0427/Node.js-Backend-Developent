import express from 'express';
import { createMusic, playList } from '../controllers/user.controller.js';
import { upload } from '../middlewares/multer.middleware.js';

const musicRoutes = express.Router();

musicRoutes.post('/upload-music', upload.single("music"), createMusic);
musicRoutes.get('/playlist', playList);

export { musicRoutes };