import express, {Router} from 'express';
import cors from 'cors';
import patchExpressMethods from "./utils/expressErrorWrapper";
import forwardingErrorHandler from "./errors/handlers/forwardingErrorHandler";
import axiosErrorHandler from "./errors/handlers/axiosErrorHandler";
import zodErrorHandler from "./errors/handlers/zodErrorHandler";
import globalErrorHandler from "./errors/handlers/globalErrorHandler";
import prismaErrorHandler from "./errors/handlers/prismaErrorHandler";
import {authRouter} from './routers/authRouter';
import {productRouter} from "./routers/productRouter";
import {userRouter} from "./routers/userRouter";
import {cartRouter} from "./routers/cartRouter";
import {paymentRouter} from "./routers/paymentRouter";

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
app.use('/api/cart', cartRouter);
app.use('/api/services/payment', paymentRouter);

app.use(zodErrorHandler); // Zod error handler
app.use(prismaErrorHandler); // Prisma error handler
app.use(axiosErrorHandler); // Axios error handler

// Catch-all for all undefined routes
app.use((req, _, next) => {
  next({
    status: 404,
    message: `Cannot ${req.method} ${req.originalUrl}`,
  });
});

app.use(globalErrorHandler); // Global error handler

export default app;