import connectDB from "../../../../lib/mongodb";
import Product from "../../../../models/Product";

export async function DELETE(req, { params }) {
  try {
    await connectDB();

    await Product.findByIdAndDelete(params.id);

    return Response.json({
      success: true,
      message: "Product Deleted",
    });
  } catch (error) {
    return Response.json({
      success: false,
      error: error.message,
    });
  }
}