import bcrypt from "bcrypt";
import {Router} from 'express';
import {PrismaClient} from '@prisma/client';
import {generateJwtToken, hashPassword} from "../utils/securityUtils";
import {loginUserValidator, registerUserValidator} from "../validators/userValidator";

const router = Router();
const prisma = new PrismaClient();

router.post('/register', async (req, res) => {
  const {name, email, password} = registerUserValidator.parse(req.body);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: await hashPassword(password),
      Cart: {
        create: {},
      },
    },
    include: { Cart: true }
  });

  const token = generateJwtToken(user.id);

  return res.status(201).json({
    status: "success",
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      cart: user.Cart,
    },
    message: "Login successful"
  });
})

router.post('/login', async (req, res) => {
  const {email, password} = loginUserValidator.parse(req.body);

  const user = await prisma.user.findUnique({
    where: {email}
  });

  if (!user) {
    return res.status(401).json({status: "fail", message: "Invalid email or password"});
  }

  // Compare the provided password with the stored hashed password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({status: "fail", message: "Invalid email or password"});
  }

  const token = generateJwtToken(user.id);

  return res.status(200).json({
    status: "success",
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    },
    message: "Login successful"
  });
})

export const authRouter = router;