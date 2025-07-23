import { PrismaClient } from "@prisma/client";
import {Router} from "express";
import prismaErrorHandler from "../errors/prismaErrorHandler";
import {authorizeRole} from "../middleware/authorizeRole";
import {authUserToken} from "../middleware/authUserToken";
import slugify from "slugify";

const router = Router();
const prisma = new PrismaClient();

router.use(authUserToken);

router.post('',
  authorizeRole("ADMIN"),
  async(req, res, next) => {
  const { id, title, description, category, imageUrl, price  } = req.body;

  const slug = slugify(title, { // e.g. "samsung-galaxy-s6"
    lower: true,
    strict: true
  });

  try {
    const product = await prisma.product.create({
      data: {
        id,
        title,
        slug,
        description,
        category,
        imageUrl,
        price: parseFloat(price)
      }
    })

    return res.status(201).json({ status: "success", data: product });
  } catch (error) {
    prismaErrorHandler(error, next);
  }
})

export const productRouter = router;