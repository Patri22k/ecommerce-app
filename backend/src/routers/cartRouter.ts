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
      // @ts-ignore
      // This works logically – Prisma can find the item by the combination of cartId and productId
      // and the upsert executes correctly at runtime. However, WebStorm / TypeScript
      // will throw a type error because CartItemWhereUniqueInput does not contain this property.
      cart_product: { cartId, productId },
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

export const cartRouter = router;