import {Router} from "express";
import axios from "axios";

const router = Router();

const PAYMENT_SERVICE_URL = process.env.PAYMENT_SERVICE_URL || "http://payment-services:8080/api/services/payment";

router.post("/checkout", async (req, res) => {
  const { cartId, userId } = req.body;

  const response = await axios.post(`${PAYMENT_SERVICE_URL}/checkout`, {
    cartId,
    userId,
  });

  return res.json(response.data);
})

export const paymentRouter = router;