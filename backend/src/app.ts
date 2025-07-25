import express from 'express';
import cors from 'cors';
import zodErrorHandler from "./errors/zodErrorHandler";
import globalErrorHandler from "./errors/globalErrorHandler";
import {authRouter} from './routers/authRouter';
import {productRouter} from "./routers/productRouter";

const app = express();

app.use(express.json());

app.use(cors({
  origin: "*", // Only for development!
  credentials: true,
}));

// Defined routes
app.use('/api/auth', authRouter);
app.use('/api/product', productRouter);

// Zod error handler
app.use(zodErrorHandler);

// Catch-all for all undefined routes
app.use((req, res, next) => {
  next({
    status: 404,
    message: `Cannot ${req.method} ${req.originalUrl}`,
  })
})

// Global error handler
app.use(globalErrorHandler);

export default app;