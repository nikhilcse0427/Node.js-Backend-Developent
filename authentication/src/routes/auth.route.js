import express from 'express';
import {userRegisteration, userLogin, getMe, refreshToken, logout, logoutAll} from '../controllers/auth.controller.js';
const authRouter = express.Router();

authRouter.post('/user-register', userRegisteration);
authRouter.post('/user-login', userLogin);
authRouter.get('/get-me', getMe);
authRouter.get('/generate-accessToken', refreshToken);
authRouter.get('/logout', logout);
authRouter.get('/logout-all', logoutAll);


export {authRouter}
