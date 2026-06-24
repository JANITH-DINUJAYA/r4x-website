import connectDB from "./mongodb.js";
import Product from "../models/Product.js";

const initialProducts = [
  {
    title: "R4X Sensi VIP Android Tool",
    description: "Premium Android sensitivity and touch response optimizer. Enhances headshot accuracy, reduces input lag, and calibrates touch controls for competitive shooter games.",
    price: "Rs 9.99",
    category: "Android",
    image: "/logo.jpg", // Default logo as fallback
    whatsappMessage: "Hi R4X Sensi, I would like to buy the R4X Sensi VIP Android Tool (Rs 9.99)."
  },
  {
    title: "R4X Sensi iOS Premium Engine",
    description: "Exclusive iOS gaming performance engine. Calibrates 3D touch/Haptic touch sensitivity, resolves screen delay, and optimizes frame rate stability for Apple devices.",
    price: "Rs 14.99",
    category: "iOS",
    image: "/logo.jpg",
    whatsappMessage: "Hi R4X Sensi, I would like to buy the R4X Sensi iOS Premium Engine (Rs 14.99)."
  },
  {
    title: "R4X PC Gaming Registry & FPS Optimizer",
    description: "Windows registry script and optimizer bundle. Optimizes TCP/IP parameters for low latency, applies custom GPU priority configs, and cleans background processes for maximum FPS.",
    price: "Rs 19.99",
    category: "PC",
    image: "/logo.jpg",
    whatsappMessage: "Hi R4X Sensi, I would like to buy the R4X PC Gaming Registry Optimizer (Rs 19.99)."
  },
  {
    title: "R4X Ultra Latency & Ping Reducer",
    description: "Multi-platform network utility that optimizes DNS routing, network packet size, and DNS settings to provide the lowest latency and stable ping in mobile and PC online games.",
    price: "Rs 7.99",
    category: "Android",
    image: "/logo.jpg",
    whatsappMessage: "Hi R4X Sensi, I would like to buy the R4X Ultra Latency Reducer (Rs 7.99)."
  }
];

export async function seedDatabase() {
  try {
    await connectDB();
    const count = await Product.countDocuments();
    if (count === 0) {
      console.log("No products found in DB. Seeding initial products...");
      await Product.insertMany(initialProducts);
      console.log("Successfully seeded database with initial products!");
    } else {
      console.log(`Database already has ${count} products. Checking for legacy currency formats...`);
      // Migrate any existing items containing "$" in their price or whatsappMessage
      const legacyProducts = await Product.find({
        $or: [
          { price: { $regex: "\\$" } },
          { whatsappMessage: { $regex: "\\$" } }
        ]
      });

      if (legacyProducts.length > 0) {
        console.log(`Found ${legacyProducts.length} legacy products with '$'. Migrating to 'Rs'...`);
        for (const prod of legacyProducts) {
          prod.price = prod.price.replace(/\$/g, "Rs ");
          prod.whatsappMessage = prod.whatsappMessage.replace(/\$/g, "Rs ");
          await prod.save();
        }
        console.log("Database legacy currency migration complete!");
      }
    }
  } catch (error) {
    console.error("Database seeding/migration failed:", error);
  }
}
