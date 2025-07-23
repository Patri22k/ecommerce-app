import "dotenv/config";
import {PrismaClient} from "@prisma/client";
import bcrypt from "bcrypt";

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
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });