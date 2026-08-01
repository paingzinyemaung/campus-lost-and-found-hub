// import express, { Request, Response } from 'express';
import express from 'express';
import type { Request, Response } from 'express';
import authRoute from './features/auth/auth.route.js';

import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import path from 'path';
import cors from 'cors';
import itemRoute from './features/item/item.route.js';

const app = express();

app.use(express.json());

app.use(cookieParser());

app.use(helmet());

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

// open upload folder as public
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.use('/uploads', express.static('uploads'));

const PORT = 3000;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.use('/api/auth', authRoute);
app.use('/api/item', itemRoute);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
