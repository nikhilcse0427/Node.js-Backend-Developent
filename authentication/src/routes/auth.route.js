import express from 'express';
import {userRegisteration, userLogin, getMe, refreshToken} from '../controllers/auth.controller.js';
const authRouter = express.Router();

authRouter.post('/user-register', userRegisteration);
authRouter.post('/user-login', userLogin);
authRouter.get('/get-me', getMe);
authRouter.get('/generate-accessToken', refreshToken);






export {authRouter}
