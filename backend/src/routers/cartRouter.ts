import {PrismaClient} from "@prisma/client";
import {Router} from "express";
import {authUserToken} from "../middleware/authUserToken";
import {authorizeRole} from "../middleware/authorizeRole";

const router = Router();
const prisma = new PrismaClient();

router.use(authUserToken);
router.use(authorizeRole("USER"));

router.post("/:cartId/item", async (req, res) => {
  const {cartId} = req.params;
  const {productId, quantity} = req.body;

  const cartItem = await prisma.cartItem.upsert({
    where: {
      cartId_productId: { cartId, productId },
    },
    update: {
      quantity: {
        increment: Number(quantity) || 1 // Number(undefined) is NaN, so it needs to be || and not ??
      },
    },
    create: {
      cartId,
      productId,
      quantity: Number(quantity) || 1
    },
  });

  return res.status(201).json({status: "success", data: cartItem});
})

router.delete("/:cartId/item/:productId", async (req, res) => {
  const { cartId, productId } = req.params;

  await prisma.cartItem.delete({
    where: {
      cartId_productId: { cartId, productId },
    },
  });

  return res.status(204).end();
})

router.patch("/:cartId/item/:productId", async (req, res) => {
  const { cartId, productId } = req.params;
  const { quantity } = req.body;

  const existingItem = await prisma.cartItem.findUnique({
    where: {
      cartId_productId: { cartId, productId },
    },
  });

  if (!existingItem) {
    return res.status(404).json({status: "fail", message: "Cart item not found. No deletion performed."});
  }

  const newQuantity = existingItem.quantity - Number(quantity);

  if (newQuantity <= 0) {
    await prisma.cartItem.delete({
      where: {
        cartId_productId: { cartId, productId },
      },
    });

    return res.status(204).end();
  }

  const updatedItem = await prisma.cartItem.update({
    where: {
      cartId_productId: { cartId, productId },
    },
    data: {
      quantity: newQuantity,
    },
  });

  return res.status(200).json({status: "success", data: updatedItem});
})

export const cartRouter = router;