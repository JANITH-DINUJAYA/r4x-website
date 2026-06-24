import connectDB from "../../../../lib/mongodb";
import Product from "../../../../models/Product";
import { resolveProductImage } from "../../../../lib/image-resolver";

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

export async function PUT(req, { params }) {
  try {
    await connectDB();

    const body = await req.json();

    // Resolve any legacy/viewer ImgBB links to direct image URLs
    if (body.image) {
      body.image = await resolveProductImage(body.image);
    }

    const updated = await Product.findByIdAndUpdate(
      params.id,
      { $set: body },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return Response.json({
        success: false,
        error: "Product not found",
      }, { status: 404 });
    }

    return Response.json({
      success: true,
      product: updated,
    });
  } catch (error) {
    return Response.json({
      success: false,
      error: error.message,
    });
  }
}