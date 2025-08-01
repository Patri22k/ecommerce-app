import {Router} from 'express';
import {PrismaClient} from '@prisma/client';
import jwt from "jsonwebtoken";

const router = Router();
const prisma = new PrismaClient();

const JWT_SECRET = process.env.JWT_TOKEN!;

router.get('/', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      status: "fail",
      message: "You must be logged in to access this resource."
    })
  }

  const decodedToken = jwt.verify(token, JWT_SECRET) as { id: string };

  if (!decodedToken) {
    return res.status(401).json({
      status: "fail",
      message: "Invalid token."
    });
  }

  const user = await prisma.user.findUnique({
    where: {
      id: decodedToken.id
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true
    }
  });

  return res.status(200).json({
    status: "success",
    data: user,
  });
})

export const userRouter = router;