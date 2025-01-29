import { useLocation, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { handelStoreContext } from "../context/StoreContext";

export default function EditProduct() {
  const location = useLocation();
  const adminProduct = location?.state?.product;

  const { id } = useParams();
  const navigate = useNavigate();

  const { url } = handelStoreContext();

  const [product, setProduct] = useState({
    _id: adminProduct?._id || id,
    productName: adminProduct?.productName || "",
    price: adminProduct?.price || "",
    category: adminProduct?.category || "",
    description: adminProduct?.description || "",
    stock: adminProduct?.stock || "",
    productImage: adminProduct?.productImage || "", // Add productImage to state
  });

  const [imagePreview, setImagePreview] = useState(null); // For previewing the selected image

  // Handle Input Change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
  };

  // Handle image change (file upload)
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProduct((prevProduct) => ({
        ...prevProduct,
        productImage: file,
      }));

      // Preview the selected image
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle Form Submission
  const handleEditProduct = async (e) => {
    e.preventDefault();

    const { productName, price, category, description, stock, productImage } = product;

    if (!productName || !price || !category || !description || !stock) {
      toast.error("All fields are required");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("productName", productName);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("description", description);
      formData.append("stock", stock);

      // Append the image if it exists
      if (productImage && productImage instanceof File) {
        formData.append("productImage", productImage);
      }

      const response = await axios.put(
        `${url}/product/updateProduct/${id}`,
        formData,
        { withCredentials: true }
      );
      toast.success("Product updated successfully");
      navigate(`/admin`);
      window.location.reload();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  // Fetch Product if not already provided
  useEffect(() => {
    if (!adminProduct) {
      async function showProduct() {
        try {
          const response = await axios.get(`${url}/product/show/${id}`, {
            withCredentials: true,
          });
          setProduct(response.data.data);
        } catch (error) {
          toast.error("Sorry, the requested item is not available");
        }
      }
      showProduct();
    }
  }, [id, adminProduct, url]);

  if (!product) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-gray-600 text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <Toaster />
      <div className="bg-white shadow-lg rounded-lg p-8 w-11/12 md:w-2/3 lg:w-1/2 mt-6 mb-6">
        <h2 className="text-center text-2xl font-bold text-blue-700 mb-8">
          Edit Product
        </h2>
        <form className="space-y-6 mt-6 mb-6" onSubmit={handleEditProduct}>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Product Category
            </label>
            <input
              type="text"
              name="category"
              className="input input-bordered w-full border-gray-300 rounded-md p-2"
              value={product.category}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Product Model
            </label>
            <input
              type="text"
              name="productName"
              className="input input-bordered w-full border-gray-300 rounded-md p-2"
              value={product.productName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Price
            </label>
            <input
              type="text"
              name="price"
              className="input input-bordered w-full border-gray-300 rounded-md p-2"
              value={product.price}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Stock
            </label>
            <input
              type="text"
              name="stock"
              className="input input-bordered w-full border-gray-300 rounded-md p-2"
              value={product.stock}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Description
            </label>
            <textarea
              name="description"
              className="textarea textarea-bordered w-full border-gray-300 rounded-md p-2 h-28"
              value={product.description}
              onChange={handleInputChange}
              required
            ></textarea>
          </div>

          {/* Image Upload Section */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Product Image
            </label>
            <input
              type="file"
              name="productImage"
              accept="image/*"
              onChange={handleImageChange}
              className="input input-bordered w-full border-gray-300 rounded-md p-2"
            />
            {product.productImage && !imagePreview && (
              <div className="mt-2">
                <img
                  src={product.productImage}
                  alt="Current Product Image"
                  className="w-full h-64 object-cover mt-2"
                />
              </div>
            )}
            {imagePreview && (
              <div className="mt-2">
                <img
                  src={imagePreview}
                  alt="New Product Image Preview"
                  className=" mt-2"
                />
              </div>
            )}
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="btn bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-300"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
