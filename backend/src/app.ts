import express from 'express';
import cors from 'cors';
import { authRouter } from './routers/authUser';
import globalErrorHandler from "./errors/globalErrorHandler";

const app = express();

app.use(express.json());

app.use(cors({
  origin: "*", // Only for development!
  credentials: true,
}));

// Defined routes
app.use('/api', authRouter);

// Catch-all for all undefined routes
app.use((req, res, next) => {
  next({
    status: 404,
    message: "Route not found",
  })
})

// Global error handler
app.use(globalErrorHandler);

export default app;