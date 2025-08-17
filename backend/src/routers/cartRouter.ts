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

  console.log("Quantity:", quantity);

  const cartItem = await prisma.cartItem.upsert({
    where: {
      cartId_productId: {
        cartId,
        productId
      }
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
    }
  });

  return res.status(201).json({status: "success", data: cartItem});
})

export const cartRouter = router;