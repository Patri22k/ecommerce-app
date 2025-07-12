import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

router.post('/register', async (req, res) => {
  // TODO
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // TODO: Hash the password
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password
      }
    });

    res.status(201).json({ status: "success", message: "User registered successfully" });

  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ status: "fail", message: 'Internal server error' });
  }
})

router.post('/login', (req, res) => {
  // TODO
})

export const authRouter = router;