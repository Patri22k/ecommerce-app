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

  if (!existingAdmin) {
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
  }

  const products = [
    { // 1
      title: "Samsung Galaxy S23 128 GB",
      description: "Flagship 2023: 6.1″ AMOLED, Snapdragon 8 Gen 2, triple-camera, premium build.",
      categories: ["Smartphones", "Electronics", "Flagship"],
      image: "",
      price: 727
    },
    { // 2
      title: "Samsung Galaxy S23 256 GB",
      description: "Same specs as above with extra storage for media and apps.",
      categories: ["Smartphones", "Electronics", "Flagship"],
      image: "",
      price: 782
    },
    { // 3
      title: "Samsung Galaxy S24 Ultra 256 GB",
      description: "2024 flagship: 6.8″ AMOLED, Snapdragon 8 Gen 3, 200 MP camera, built-in S Pen.",
      categories: ["Smartphones", "Electronics", "Flagship"],
      image: "",
      price: 1286
    },
    { // 4
      title: "Samsung Galaxy S24 Ultra 512 GB",
      description: "All features of S24 Ultra with double storage for power users.",
      categories: ["Smartphones", "Electronics", "Flagship"],
      image: "",
      price: 1405
    },
    { // 5
      title: "Samsung Galaxy S24 Ultra 1 TB",
      description: "Top-tier storage option for the S24 Ultra: 1 TB of space.",
      categories: ["Smartphones", "Electronics", "Flagship"],
      image: "",
      price: 1642
    },
    { // 6
      title: "Samsung Galaxy A54 5G 128 GB",
      description: "Mid-range workhorse: 6.4″ AMOLED 120 Hz, Exynos 1380, IP67, 50 MP camera.",
      categories: ["Smartphones", "Electronics", "Mid-range"],
      image: "",
      price: 346
    },
    { // 7
      title: "Samsung Galaxy A34 5G 128 GB",
      description: "Affordable 5G device: 6.6″ AMOLED 120 Hz, Dimensity 1080, great battery.",
      categories: ["Smartphones", "Electronics", "Mid-range"],
      image: "",
      price: 244
    },
    { // 8
      title: "Samsung Galaxy F42 5G 128 GB",
      description: "Balanced 5G model: Dimensity 700, 5000 mAh battery, solid everyday performance.",
      categories: ["Smartphones", "Electronics", "Budget"],
      image: "",
      price: 329
    },
    { // 9
      title: "Samsung Galaxy M23 128 GB",
      description: "Value-focused: Snapdragon 750G 5G, large screen, long battery life.",
      categories: ["Smartphones", "Electronics", "Budget"],
      image: "",
      price: 344
    },
    { // 10
      title: "Samsung Galaxy Z Flip 5 256 GB",
      description: "Stylish foldable: Snapdragon 8 Gen 2, 6.7″ AMOLED foldable screen.",
      categories: ["Smartphones", "Electronics", "Foldable"],
      image: "",
      price: 989
    },
    { // 11
      title: "Samsung Galaxy Z Flip 5 512 GB",
      description: "Same as above with ample storage for media and apps.",
      categories: ["Smartphones", "Electronics", "Foldable"],
      image: "",
      price: 1319
    },
    { // 12
      title: "Samsung Galaxy Z Flip 6 256 GB",
      description: "2024 foldable upgrade: Snapdragon 8 Gen 3, 50 MP camera, 12 GB RAM.",
      categories: ["Smartphones", "Electronics", "Foldable"],
      image: "",
      price: 1199
    },
    { // 13
      title: "Samsung Galaxy Z Fold 5 256 GB",
      description: "Premium foldable with large inner screen and multitasking focus.",
      categories: ["Smartphones", "Electronics", "Foldable"],
      image: "",
      price: 1799
    },
    { // 14
      title: "Samsung Galaxy Z Fold 4 256 GB",
      description: "Previous-gen foldable offering powerful specs and large display at reduced price.",
      categories: ["Smartphones", "Electronics", "Foldable"],
      image: "",
      price: 1249
    },
    { // 15
      title: "Samsung Galaxy S24 Plus 256 GB",
      description: "Balanced flagship: 6.7″ AMOLED, Snapdragon 8 Gen 3, great battery and camera.",
      categories: ["Smartphones", "Electronics", "Flagship"],
      image: "",
      price: 900
    },
    { // 16
      title: "Samsung Galaxy S24 FE 256 GB",
      description: "Fan Edition with Galaxy AI, 6.7″ AMOLED 120 Hz, solid specs for value buyers.",
      categories: ["Smartphones", "Electronics", "Flagship Lite"],
      image: "",
      price: 589
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