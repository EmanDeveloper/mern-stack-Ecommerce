import HomeCarsol from "../Component/HomeCarsol";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { handelStoreContext } from "../context/StoreContext";
import { IoAddCircleSharp } from "react-icons/io5";

function Home() {
  const { addToCart, totalProduct } = handelStoreContext();
  const product = totalProduct;
  const navigate = useNavigate();

  function handelShow(item) {
    navigate(`/show/${item._id}`, { state: { product: item } });
  }

  useEffect(() => {
    const hasVisted = localStorage.getItem("hasVisted");
    if (!hasVisted) {
      toast.success("Welcome!");
      localStorage.setItem("hasVisted", "true");
    }
  }, []);

  return (
    <div className="bg-slate-200 min-h-screen">
      <div>
        <Toaster />
      </div>
      <HomeCarsol />
      <div className="flex flex-wrap justify-center gap-6 px-4 mt-32">
        {product.map((el, i) => (
          <div
            className="card bg-white shadow-sm w-72 mx-auto mb-4 cursor-pointer relative group"
            key={i}
            onClick={() => handelShow(el)}
          >
            <figure className="relative w-full h-44">
              <img
                src={el.productImage}
                alt="productImage"
                className="w-full h-full object-cover"
              />
            </figure>
            {/* Heart icon, visible on hover */}
            <IoAddCircleSharp 
              className="absolute top-2 right-2 text-2xl text-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              onClick={(e) => {
                e.stopPropagation(); // Prevent triggering card click
                addToCart(el);
              }}
            />
            <div className="card-body p-4">
              <h2 className="card-title">{el.productName}</h2>
              <p>Rs : {el.price.toLocaleString()}</p>
              <div className="card-actions justify-end"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
