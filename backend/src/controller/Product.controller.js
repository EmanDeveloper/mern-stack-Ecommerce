import { Product } from "../model/product.model.js";
import { apiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { AsyncWrap } from "../utils/AsyncWrap.js";

import { User } from "../model/user.model.js";

import { cloudinary } from "../utils/cloudinary.js";

const addProduct = AsyncWrap(async (req, res) => {
  const { productName, price, description, stock, category } = req.body;

  const { productImage } = req.files;

  if (
    !productName ||
    !productImage ||
    !price ||
    !description ||
    !stock ||
    !category
  ) {
    throw new apiError(400, "All field rquire!");
  }

  const product = await Product.findOne({ productName });

  if (product) {
    throw new apiError(400, "Produt of this name all ready exist");
  }

  const addProduct = await Product.create({
    productName,
    productImage: productImage[0]?.path,
    price,
    description,
    stock,
    category,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, "Product added successfully!", addProduct));
});

const showProduct = AsyncWrap(async (req, res) => {
  const product = await Product.find().populate("reviews");

  return res.status(200).json(new ApiResponse(200, product));
});

const checkProduct = AsyncWrap(async (req, res) => {
  console.log(req.session);
  const { id } = req.params;

  const product = await Product.findById(id).populate("reviews");

  if (!product) {
    throw new apiError(400, "Sorry requesting product is not available");
  }

  return res.status(200).json(new ApiResponse(200, product));
});

const updateProduct = AsyncWrap(async (req, res) => {
  const { id } = req.params;

  const { productName, price, description, stock, category } = req.body;
  const productImage = req.files?.productImage?.[0]?.path || null;

  if (!productName || !price || !description || !stock || !category) {
    throw new apiError(400, "Some field are missing");
  }

  const product = await Product.findById(id);

  let productImageUrl = product.productImage;
  if (productImage) {
    try {
      const productImageUpload = await cloudinary.uploader.upload(
        productImage,
        {
          folder: "Ecommerce_Project/images", // Changed the folder name for better organization
        }
      );

      // Deleting old image from Cloudinary
      const productImagePublicId = product.productImage.split('/').slice(7).join('/').split('.')[0];
  console.log(productImagePublicId)
    await cloudinary.uploader.destroy(productImagePublicId);

      productImageUrl = productImageUpload.secure_url;
    } catch (error) {
      console.error("Error uploading cover image to Cloudinary:", error);
      return res
        .status(500)
        .json(new ApiResponse(500, "Failed to upload cover image to Cloudinary"));
    }
  }

  // Update the product in the database
  const updatedProduct = await Product.findByIdAndUpdate(
    id,
    {
      productName,
      productImage: productImageUrl || product.productImage,
      price,
      description,
      stock,
      category,
    },
    { new: true }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, "Product updated successfully!", updatedProduct));
});


const delteProduct = AsyncWrap(async (req, res) => {
  const { id } = req.params;

  const product = await Product.findById(id);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  const productImage = product.productImage;

  const productImagePublicId =productImage.split('/').slice(7).join('/').split('.')[0];

    const result = await cloudinary.uploader.destroy(productImagePublicId);

    if (result.result !== 'ok') {
      return res.status(500).json({ message: "Failed to delete product image from Cloudinary" });
    }

    // Proceed with deleting the product from the database
    await Product.findByIdAndDelete(id);

    return res.status(200).json({ message: "Product was deleted successfully" });

});




const placeOrder = AsyncWrap(async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id);

  const { hash, salt, ...sendUserDetail } = await user.toObject();

  return res.status(200).json(new ApiResponse(200, sendUserDetail));
});

const conformOrder = AsyncWrap(async (req, res) => {
  console.log("Received payload:", req.body);

  const { updateBuyUser, itemIDs } = req.body;
  const { _id, username, email, phone, address, country } = updateBuyUser;

  await User.findByIdAndUpdate(_id, {
    username,
    email,
    phone,
    address,
    country,
  });

  for (const productId of itemIDs) {
    const product = await Product.findById(productId);
    if (product) {
      if (product.stock > 0) {
        product.stock -= 1;
        if (product.stock === 0) {
          const productImagePublicId = product.productImage
          .split('/').slice(7).join('/').split('.')[0];

          await cloudinary.uploader.destroy(productImagePublicId);
          await Product.findByIdAndDelete(productId);
        } else {
          await product.save();
        }
      } else {
        throw new apiError(400, `${product.productName} is out of stock`);
      }
    } else {
      throw new apiError(400, "404 not find product");
    }
  }

  return res.status(200).json(new ApiResponse(200, "Order confirmed!"));
});

export {
  addProduct,
  showProduct,
  updateProduct,
  delteProduct,
  placeOrder,
  checkProduct,
  conformOrder,
};
