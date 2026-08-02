import { Router } from 'express';
import { checkMe, login, logout, register } from './auth.controller.js';

const authRoute = Router();

authRoute.post('/register', register);

authRoute.post('/login', login);

authRoute.post('/logout', logout);

authRoute.get('/me', checkMe);

export default authRoute;
