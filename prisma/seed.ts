import { PrismaClient } from '@prisma/client';
import { FOOD_ITEMS } from '../src/data';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');
  
  // Clear existing items
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.menuItem.deleteMany();
  await prisma.user.deleteMany();

  // Create menu items
  for (const item of FOOD_ITEMS) {
    await prisma.menuItem.create({
      data: {
        id: item.id,
        name: item.name,
        price: item.price,
        category: item.category,
        image: item.image,
        description: item.description,
        rating: item.rating
      }
    });
  }

  console.log('Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
