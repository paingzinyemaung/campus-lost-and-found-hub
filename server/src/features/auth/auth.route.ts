import { Router } from 'express';
import { checkMe, login, register } from './auth.controller.js';

const authRoute = Router();

authRoute.post('/register', register);
authRoute.post('/login', login);
authRoute.get('/me', checkMe);

export default authRoute;
