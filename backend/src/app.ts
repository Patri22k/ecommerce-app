import express from 'express';
import cors from 'cors';
import { authRouter } from './routers/authUser';

const app = express();

app.use(express.json());

app.use(cors({
  origin: "*", // Only for development!
  credentials: true,
}));

app.use('/api', authRouter);

export default app;