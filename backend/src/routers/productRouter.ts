import slugify from "slugify";
import {Router} from "express";
import {PrismaClient} from "@prisma/client";
import {authorizeRole} from "../middleware/authorizeRole";
import {authUserToken} from "../middleware/authUserToken";

const router = Router();
const prisma = new PrismaClient();

router.use(authUserToken);
router.use(authorizeRole("ADMIN"));

router.get("/:id", async (req, res) => {
  const {id} = req.params;

  const product = await prisma.product.findUnique({
    where: {id}
  });

  if (!product) {
    return res.status(404).json({status: "fail", message: "Product not found"});
  }

  return res.status(200).json({status: "success", data: product});
});

router.get("/", async (req, res) => {
  const {count} = req.query;

  const products = await prisma.product.findMany({
    take: parseInt(count as string, 10) || 10,
  });

  return res.status(200).json({status: "success", data: products});
});

router.post('/', async (req, res) => {
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
});

router.put("/:id", async (req, res) => {
  const {id} = req.params;
  const {title, description, category, imageUrl, price} = req.body;

  const slug = slugify(title, {
    lower: true,
    strict: true
  });

  const updatedProduct = await prisma.product.update({
    where: {id},
    data: {
      title,
      slug,
      description,
      category,
      imageUrl,
      price: parseFloat(price)
    }
  });

  return res.status(200).json({status: "success", data: updatedProduct});
});

router.delete("/:id", async (req, res) => {
  const {id} = req.params;

  await prisma.product.delete({
    where: {id}
  });

  return res.status(204).json({status: "success", message: "Product deleted successfully"});
});

export const productRouter = router;