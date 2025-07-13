import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import {generateJwtToken, hashPassword} from "../utils/securityUtils";
import bcrypt from "bcrypt";

const router = Router();
const prisma = new PrismaClient();

router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: await hashPassword(password)
      }
    });

    const token = generateJwtToken(user.id);

    return res.status(201).json({ status: "success", token: token, message: "User created." });

  } catch (error) {
    return res.status(500).json({ status: "fail", message: error });
  }
})

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await prisma.user.findUniqueOrThrow({
      where: {
        email
      }
    });

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ status: "fail", message: "Invalid email or password" });
    }

    const token = generateJwtToken(user.id);

    return res.status(200).json({ status: "success", token: token, message: "Login successful"})
  } catch (error) {
    return res.status(500).json({ status: "fail", message: error });
  }
})

export const authRouter = router;