import express from 'express';
import {userRegisteration, userLogin, getMe} from '../controllers/auth.controller.js';
const authRouter = express.Router();

authRouter.post('/user-register', userRegisteration);
authRouter.get('/user-login', userLogin);
authRouter.get('/get-me', getMe);






export {authRouter}
