import slugify from "slugify";
import {Router} from "express";
import {PrismaClient} from "@prisma/client";
import {authorizeRole} from "../middleware/authorizeRole";
import {authUserToken} from "../middleware/authUserToken";

const router = Router();
const prisma = new PrismaClient();

router.use(authUserToken);

router.post('/',
  authorizeRole("ADMIN"),
  async (req, res) => {
    const {title, description, category, imageUrl, price} = req.body;

    const slug = slugify(title, { // e.g. "samsung-galaxy-s6"
      lower: true,
      strict: true
    });

    const product = await prisma.product.create({
      data: {
        title,
        slug,
        description,
        category,
        imageUrl,
        price: parseFloat(price)
      }
    });

    return res.status(201).json({status: "success", data: product});
  }
);

export const productRouter = router;