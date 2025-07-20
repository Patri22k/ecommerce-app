import express from 'express';
import cors from 'cors';
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