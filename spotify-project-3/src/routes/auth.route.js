import express from 'express'
import { validateRules, validateResult } from "../middlewares/validation.middleware.js";


const authRoutes = express.Router();

import { userLogin, userRegisteraion } from '../controllers/auth.controller.js';

authRoutes.post('/user-register',validateRules, validateResult, userRegisteraion);
authRoutes.post('/user-login',validateRules, validateResult, userLogin);




export {authRoutes};