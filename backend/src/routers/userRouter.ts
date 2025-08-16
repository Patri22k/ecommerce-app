import {Router} from 'express';
import {PrismaClient} from '@prisma/client';
import jwt from "jsonwebtoken";
import {authorizeRole} from "../middleware/authorizeRole";
import {authUserToken} from "../middleware/authUserToken";

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

router.delete("/:id", authUserToken, authorizeRole("ADMIN"), async (req, res) => {
  const {id} = req.params;

  await prisma.user.delete({
    where: {id}
  });

  return res.status(204).json({status: "success", message: "User deleted successfully"});
})

export const userRouter = router;