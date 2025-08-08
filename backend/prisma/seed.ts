import "dotenv/config";
import {PrismaClient} from "@prisma/client";
import bcrypt from "bcrypt";
import slugify from "slugify";

const prisma = new PrismaClient();

async function main() {
  const adminEmail = process.env.INITIAL_ADMIN_EMAIL;
  const adminPassword = process.env.INITIAL_ADMIN_PASSWORD;

  if (!adminEmail || !adminPassword) {
    throw new Error("INITIAL_ADMIN_EMAIL and INITIAL_ADMIN_PASSWORD must be set in the environment variables.");
  }

  const existingAdmin = await prisma.user.findFirst({
    where: { role: "ADMIN" },
  });

  if (existingAdmin) {
    console.log("An admin with credentials " + adminEmail + " already exists.");
  }

  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  const admin = await prisma.user.create({
    data: {
      name: "Jozko Mrkvicka",
      email: adminEmail,
      password: hashedPassword,
      role: "ADMIN",
    }
  });

  console.log(`Admin successfully created: ${admin.email}`);

  const products = [
    { // 1
      title: "Samsung Galaxy S23",
      description: "Samsung Galaxy S23 is a flagship smartphone with a stunning display, powerful performance," +
        " and advanced camera features.",
      categories: ["Smartphones", "Electronics"],
      image: "", // TODO: Add image URL
      price: 799.99,
    },
    { // 2
      title: "Samsung Galaxy S24",
      description: "Samsung Galaxy S24 is the latest flagship smartphone with cutting-edge technology, exceptional" +
        " performance, and a sleek design.",
      categories: ["Smartphones", "Electronics"],
      image: "", // TODO: Add image URL
      price: 899.99,
    },
    { // 3
      title: "Samsung Galaxy S25",
      description: "Samsung Galaxy S25 is the next-generation flagship smartphone with innovative features," +
        " a stunning display, and top-notch performance.",
      categories: ["Smartphones", "Electronics"],
      image: "", // TODO: Add image URL
      price: 999.99,
    },
    { // 4
      title: "Samsung Galaxy A54",
      description: "Samsung Galaxy A54 is a mid-range smartphone that offers a great balance of" +
        " performance and affordability, with a vibrant display and solid camera capabilities.",
      categories: ["Smartphones", "Electronics"],
      image: "", // TODO: Add image URL
      price: 349.99,
    },
    { // 5
      title: "Samsung Galaxy A44",
      description: "Samsung Galaxy A44 is a budget-friendly smartphone that provides essential features," +
        " a decent camera, and a reliable performance for everyday use.",
      categories: ["Smartphones", "Electronics"],
      image: "", // TODO: Add image URL
      price: 299.99,
    },
    { // 6
      title: "Samsung Galaxy A34",
      description: "Samsung Galaxy A34 is a budget-friendly smartphone that provides essential features," +
        " a decent camera, and a reliable performance for everyday use.",
      categories: ["Smartphones", "Electronics"],
      image: "", // TODO: Add image URL
      price: 299.99,
    },
    { // 7
      title: "Samsung Galaxy A24",
      description: "Samsung Galaxy A24 is an entry-level smartphone that offers basic functionality," +
        " a user-friendly interface, and a long-lasting battery.",
      categories: ["Smartphones", "Electronics"],
      image: "", // TODO: Add image URL
      price: 249.99,
    },
    { // 8
      title: "Samsung Galaxy A14",
      description: "Samsung Galaxy A14 is a budget smartphone that provides essential features," +
        " a decent camera, and a reliable performance for everyday use.",
      categories: ["Smartphones", "Electronics"],
      image: "", // TODO: Add image URL
      price: 199.99,
    },
    { // 9
      title: "Samsung Z Fold 5",
      description: "Samsung Z Fold 5 is a premium foldable smartphone that combines cutting-edge" +
        " technology with a versatile design, offering a large display and multitasking capabilities.",
      categories: ["Smartphones", "Electronics"],
      image: "", // TODO: Add image URL
      price: 1799.99,
    },
    { // 10
      title: "Samsung Z Flip 5",
      description: "Samsung Z Flip 5 is a stylish foldable smartphone that offers a compact design," +
        " a vibrant display, and innovative features for a unique user experience.",
      categories: ["Smartphones", "Electronics"],
      image: "", // TODO: Add image URL
      price: 999.99,
    }
  ];

  console.log("Creating product...");

  for (const product of products) {
    const slug = slugify(product.title, {
      lower: true,
      strict: true,
      trim: true
    });

    const createdProduct = await prisma.product.create({
      data: {
        title: product.title,
        description: product.description,
        imageUrl: product.image,
        slug,
        category: product.categories,
        price: product.price
      }
    });

    console.log(`Product created: ${createdProduct.title} (ID: ${createdProduct.id})`);
  }

  console.log("All product created successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });