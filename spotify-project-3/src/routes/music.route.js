import express from 'express';
import { createMusic, playList, album } from '../controllers/user.controller.js';
import { upload } from '../middlewares/multer.middleware.js';

const musicRoutes = express.Router();

musicRoutes.post('/upload-music', upload.single("music"), createMusic);
musicRoutes.get('/playlist', playList);
musicRoutes.post('/album-creation', album)

export { musicRoutes };