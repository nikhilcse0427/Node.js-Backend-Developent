import express from 'express';
import {userRegisteration} from '../controllers/auth.controller.js';
const authRouter = express.Router();

authRouter.post('/user-register', userRegisteration);










export {authRouter}
