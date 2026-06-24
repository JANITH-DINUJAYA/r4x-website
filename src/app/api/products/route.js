import connectDB from "../../../lib/mongodb";
import Product from "../../../models/Product";
import { seedDatabase } from "../../../lib/seed";

export async function GET() {
  try {
    await connectDB();
    await seedDatabase();

    const products = await Product.find();

    return Response.json({
      success: true,
      products,
    });
  } catch (error) {
    return Response.json({
      success: false,
      error: error.message,
    });
  }
}

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();

    const product = await Product.create(body);

    return Response.json({
      success: true,
      product,
    });
  } catch (error) {
    return Response.json({
      success: false,
      error: error.message,
    });
  }
}