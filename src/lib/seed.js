import connectDB from "./mongodb.js";
import Product from "../models/Product.js";

const initialProducts = [
  {
    title: "R4X Sensi VIP Android Tool",
    description: "Premium Android sensitivity and touch response optimizer. Enhances headshot accuracy, reduces input lag, and calibrates touch controls for competitive shooter games.",
    price: "$9.99",
    category: "Android",
    image: "/logo.jpg", // Default logo as fallback
    whatsappMessage: "Hi R4X Sensi, I would like to buy the R4X Sensi VIP Android Tool ($9.99)."
  },
  {
    title: "R4X Sensi iOS Premium Engine",
    description: "Exclusive iOS gaming performance engine. Calibrates 3D touch/Haptic touch sensitivity, resolves screen delay, and optimizes frame rate stability for Apple devices.",
    price: "$14.99",
    category: "iOS",
    image: "/logo.jpg",
    whatsappMessage: "Hi R4X Sensi, I would like to buy the R4X Sensi iOS Premium Engine ($14.99)."
  },
  {
    title: "R4X PC Gaming Registry & FPS Optimizer",
    description: "Windows registry script and optimizer bundle. Optimizes TCP/IP parameters for low latency, applies custom GPU priority configs, and cleans background processes for maximum FPS.",
    price: "$19.99",
    category: "PC",
    image: "/logo.jpg",
    whatsappMessage: "Hi R4X Sensi, I would like to buy the R4X PC Gaming Registry Optimizer ($19.99)."
  },
  {
    title: "R4X Ultra Latency & Ping Reducer",
    description: "Multi-platform network utility that optimizes DNS routing, network packet size, and DNS settings to provide the lowest latency and stable ping in mobile and PC online games.",
    price: "$7.99",
    category: "Android",
    image: "/logo.jpg",
    whatsappMessage: "Hi R4X Sensi, I would like to buy the R4X Ultra Latency Reducer ($7.99)."
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
      console.log(`Database already has ${count} products. Skipping seeding.`);
    }
  } catch (error) {
    console.error("Database seeding failed:", error);
  }
}
