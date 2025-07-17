import {Router} from 'express';
import {PrismaClient} from '@prisma/client';
import {generateJwtToken, hashPassword} from "../utils/securityUtils";
import bcrypt from "bcrypt";
import prismaErrorHandler from "../errors/prismaErrorHandler";
import {loginUserValidator, registerUserValidator} from "../validators/userValidator";

const router = Router();
const prisma = new PrismaClient();

router.post('/register', async (req, res, next) => {
  try {
    const {name, email, password} = registerUserValidator.parse(req.body);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: await hashPassword(password)
      }
    });

    const token = generateJwtToken(user.id);

    return res.status(201).json({status: "success", token: token, message: "User created"});

  } catch (error) {
    prismaErrorHandler(error, next);
  }
})

router.post('/login', async (req, res, next) => {
  try {
    const {email, password} = loginUserValidator.parse(req.body);

    const user = await prisma.user.findUniqueOrThrow(
      {
        where: {email}
      });

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({status: "fail", message: "Invalid email or password"});
    }

    const token = generateJwtToken(user.id);

    return res.status(200).json({status: "success", token: token, message: "Login successful"})
  } catch (error) {
    prismaErrorHandler(error, next);
  }
})

export const authRouter = router;