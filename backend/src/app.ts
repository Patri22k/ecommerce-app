import express from 'express';
import cors from 'cors';
import zodErrorHandler from "./errors/zodErrorHandler";
import globalErrorHandler from "./errors/globalErrorHandler";
import {authRouter} from './routers/authRouter';
import {productRouter} from "./routers/productRouter";
import prismaErrorHandler from "./errors/prismaErrorHandler";

const app = express();

app.use(express.json());

app.use(cors({
  origin: "*", // Only for development!
  credentials: true,
}));

// Defined routes
app.use('/api/auth', authRouter);
app.use('/api/product', productRouter);

app.use(zodErrorHandler); // Zod error handler
app.use(prismaErrorHandler); // Prisma error handler

// Catch-all for all undefined routes
app.use((req, res, next) => {
  next({
    status: 404,
    message: `Cannot ${req.method} ${req.originalUrl}`,
  })
});

app.use(globalErrorHandler); // Global error handler

export default app;