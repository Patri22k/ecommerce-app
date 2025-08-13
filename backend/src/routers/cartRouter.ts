import {PrismaClient} from "@prisma/client";
import {Router} from "express";

const router = Router();
const prisma = new PrismaClient();

router.post("/:cartId/item", (req, res) => {
  const {cartId} = req.params;
  const {productId, quantity} = req.body;

  const cartItem = prisma.cartItem.create({
    data: {
      cartId,
      productId,
      quantity: quantity ?? 1
    }
  });

  return res.status(201).json({status: "success", data: cartItem});
})

export const cartRouter = router;