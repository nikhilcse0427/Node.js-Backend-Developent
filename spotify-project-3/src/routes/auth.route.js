import express from 'express'

const authRoutes = express.Router();

import { userRegisteraion } from '../controllers/auth.controller.js';

authRoutes.post('/user-register', userRegisteraion)




export {authRoutes};