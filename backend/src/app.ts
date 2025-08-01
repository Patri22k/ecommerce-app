import express, {Router} from 'express';
import cors from 'cors';
import zodErrorHandler from "./errors/zodErrorHandler";
import globalErrorHandler from "./errors/globalErrorHandler";
import {authRouter} from './routers/authRouter';
import {productRouter} from "./routers/productRouter";
import {userRouter} from "./routers/userRouter";
import prismaErrorHandler from "./errors/prismaErrorHandler";
import {patchExpressMethods} from "./utils/expressErrorWrapper";
import {forwardingErrorHandler} from "./errors/forwardingErrorHandler";

const app = express();

// Replace express methods for decorated ones
patchExpressMethods(app);
patchExpressMethods(Router.prototype);

app.use(forwardingErrorHandler);
app.use(express.json());
app.use(cors({
  origin: "*", // Only for development!
  credentials: true,
}));

// Defined routes
app.use('/api/auth', authRouter);
app.use('/api/product', productRouter);
app.use('/api/me', userRouter);

app.use(zodErrorHandler); // Zod error handler
app.use(prismaErrorHandler); // Prisma error handler

// Catch-all for all undefined routes
app.use((req, _, next) => {
  next({
    status: 404,
    message: `Cannot ${req.method} ${req.originalUrl}`,
  })
});

app.use(globalErrorHandler); // Global error handler

export default app;