import { useLocation, useParams } from "react-router-dom";
import Review from "./Review";
import { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";
import { handelStoreContext } from "../context/StoreContext";

function Show() {
  const location = useLocation();
  const [product, setProduct] = useState(location.state?.product || null);
  const {isLogin,url,addToCart,redirectLogin,handelBuyProduct}=handelStoreContext();

  const { id } = useParams();
  useEffect(() => {
    if (!product) {
      async function showProduct() {
        try {
          let response = await axios.get(
            `${url}/product/show/${id}`,
            { withCredentials: true }
          );
          console.log(response);
          setProduct(response.data.data);
        } catch (error) {
          toast.error("Sorry the requesting item is not available");
        }
      }
      showProduct();
    }
  }, [id, product]);


  if (!product) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-gray-600 text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div>
      <div>
        <Toaster />
      </div>
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col lg:flex-row w-full max-w-6xl m-auto mt-10 rounded-md shadow-md overflow-hidden  shadow-purple-300">
          <img
            src={product.productImage}
            alt="product"
            className="w-full lg:w-96 h-auto lg:h-96 object-cover rounded-md m-5"
          />

          <div className="m-5 flex flex-col justify-between">
            <p className="font-bold text-xl">{product.productName}</p>
            <p className="pt-2 text-lg">
              <span className="font-bold">Rs : </span>
              {product.price.toLocaleString()}
            </p>
            <h2 className="pt-2 font-bold">Description</h2>
            <p className="text-xl break-words">{product.description}</p>

            <p className="pt-2 font-bold">
              {product.stock>0 ? <p>Available</p>:<p>not Available</p>}
            </p>

            <div className="mt-7 flex flex-col sm:flex-row space-x-0 sm:space-x-4">
              <button className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded-lg  shadow-lg transition duration-300 ease-in-out mt-4 sm:w-auto mb-4 sm:mb-0" onClick={()=>addToCart(product)}>
                Add to cart
              </button>
              <button
                className="btn  bg-fuchsia-300 font-semibold text-xl py-2 px-4 rounded-lg  shadow-lg transition duration-300 ease-in-out mt-4  mb-4 sm:mb-0 sm:w-auto"
                onClick={()=>(handelBuyProduct(product.price,product))}
              >
                Buy now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Review  */}
      <Review
        productId={product._id}
        allReview={product.reviews}
        redirectLogin={redirectLogin}
        isLogin={isLogin}
      />
    </div>
  );
}

export default Show;
