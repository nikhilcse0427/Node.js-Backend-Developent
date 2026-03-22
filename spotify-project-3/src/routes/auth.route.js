import express from 'express'

const authRoutes = express.Router();

import { userLogin, userRegisteraion } from '../controllers/auth.controller.js';

authRoutes.post('/user-register', userRegisteraion);
authRoutes.post('/user-login', userLogin);




export {authRoutes};