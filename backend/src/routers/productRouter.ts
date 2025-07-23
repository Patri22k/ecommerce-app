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

  // TODO: add category

  const slug = slugify(title, { // e.g. /product/samsung-galaxy-s6-plus-d12979378
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
        imageUrl,
        price: parseFloat(price)
      }
    })

    return res.status(201).json({ status: "success", data: product });
  } catch (error) {
    prismaErrorHandler(error, next);
  }
})


router.get('/:slugAndId', async (req, res, next) => {
  const slugAndId = req.params.slugAndId;
  const idMatch = slugAndId.match(/(-d(\d+))$/);

  if (!idMatch) {
    return res.status(400).json({ status: "fail", message: "Invalid product URL" });
  }

  const id = parseInt(idMatch[2], 10);

  try {
    const product = await prisma.product.findUnique({
      where: {id}
    })

    if (!product) {
      return res.status(404).json({ status: "fail", message: "Product not found" });
    }

    return res.status(200).json({ status: "success", data: product });
  } catch (error) {
    prismaErrorHandler(error, next);
  }
})

export const productRouter = router;