import { PrismaClient } from "@prisma/client";
import {Router} from "express";
import prismaErrorHandler from "../errors/prismaErrorHandler";

const router = Router();
const prisma = new PrismaClient();

// TODO: Create a product with a slug
// e.g. /product/samsung-galaxy-s6-plus-d12979378
router.post('', async(req, res) => {
  const { name, description, price, imageUrl } = req.body;
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