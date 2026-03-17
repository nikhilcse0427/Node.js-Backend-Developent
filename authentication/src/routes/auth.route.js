import express from 'express';
import {userRegisteration, userLogin} from '../controllers/auth.controller.js';
const authRouter = express.Router();

authRouter.post('/user-register', userRegisteration);
authRouter.get('/user-login', userLogin);





export {authRouter}
