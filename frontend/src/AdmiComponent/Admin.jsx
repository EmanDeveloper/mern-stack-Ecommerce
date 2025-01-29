import {Toaster,toast} from "react-hot-toast";
import { handelStoreContext } from "../context/StoreContext";
import { useNavigate,Link } from "react-router-dom";
import axios from "axios";


function Admin() {
  const { totalProduct,url } = handelStoreContext();

  const navigate=useNavigate();

  function handelAdminShow(item) {
    navigate(`/edit/${item._id}`, { state: { product: item } });
  }

  async function handelDelete(item){
    try {
      axios.delete(`${url}/product/deleteProduct/${item._id}`,{withCredentials:true});
      window.location.reload();
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

  return (
    <div className="bg-slate-200 min-h-screen p-6">
      <Toaster/>
      {/* Total Products Display */}
      <Link to="/addProduct" className="btn btn-primary text-white font-bold text-xl float-right">Add Product</Link>
      <div className="bg-white shadow-lg w-80 m-auto mt-10 mb-10 p-6 rounded-lg text-center">
        <h2 className="text-lg font-semibold text-gray-700">Total Products</h2>
        <p className="text-2xl font-bold text-purple-600">{totalProduct.length}</p>
      </div>

      {/* Product List */}
      {totalProduct.map((el, i) => (
        <div
          key={i}
          className="flex items-center justify-between bg-white shadow-md mb-4 w-4/5 p-6 m-auto rounded-lg"
        >
          {/* Product Info */}
          <div>
            <p className="text-gray-700 font-medium">
              <span className="font-semibold text-purple-600">Category:</span> {el.category}
            </p>
            <p className="text-gray-700 font-medium">
              <span className="font-semibold text-purple-600">Model:</span> {el.productName}
            </p>
            <p className="text-gray-700 font-medium">
              <span className="font-semibold text-purple-600">Price:</span> Rs {el.price.toLocaleString()}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            <button className="btn btn-sm bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md transition duration-300" onClick={()=>handelAdminShow(el)}>
              Edit
            </button>
            <button className="btn btn-sm bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-md transition duration-300" onClick={()=>handelDelete(el)}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Admin;
