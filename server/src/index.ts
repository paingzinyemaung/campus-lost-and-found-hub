// import express, { Request, Response } from 'express';
import express from 'express';
import type { Request, Response } from 'express';
import authRoute from './features/auth/auth.route.js';

import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import noteRoute from './features/item/item.route.js';
import path from 'path';
// import cors from 'cors';

const app = express();

app.use(express.json());

app.use(cookieParser());

app.use(helmet());

// open upload folder as public
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

const PORT = 3000;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.use('/api/auth', authRoute);
app.use('/api/item', noteRoute);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
