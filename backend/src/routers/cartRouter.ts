import {PrismaClient} from "@prisma/client";
import {Router} from "express";
import {authUserToken} from "../middleware/authUserToken";
import {authorizeRole} from "../middleware/authorizeRole";

const router = Router();
const prisma = new PrismaClient();

router.use(authorizeRole("USER"));
router.use(authUserToken);

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