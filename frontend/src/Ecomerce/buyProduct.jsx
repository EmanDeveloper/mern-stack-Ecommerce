import { handelStoreContext } from "../context/StoreContext";
import { MdContactPhone } from "react-icons/md";
import { FaRegAddressCard } from "react-icons/fa6";
import { useState } from "react";
import {Toaster,toast} from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function BuyProduct(){

    const {buyuser,cart,url,setCart}=handelStoreContext();
    const total=cart.reduce((a,b)=>a+b.price,0)
    const [updateBuyUser,setUpdateBuyUser]=useState({
        _id:buyuser._id,
        username:buyuser.username,
        email:buyuser.email,
        phone:buyuser.phone,
        address:buyuser.address,
        country:buyuser.country
    })
    const navigate=useNavigate();

    function handelUser(e){
        setUpdateBuyUser({...updateBuyUser,[e.target.name]: e.target.value})
    }

    async function submitConfirmOrder(e){
        e.preventDefault();
        const {username,email,phone,address,country}=updateBuyUser;
        if(!username || !email || !phone || !address || !country){
            toast.error("Some field value is missing");
            return;
        }
        const itemIDs = cart.map(item => item._id);

       try {
        await axios.put(`${url}/product/conformOder`,{updateBuyUser,itemIDs},{withCredentials:true});
        localStorage.removeItem("cart");
        setCart([]);
        toast.success("Order conformed");
        navigate("/")
       } catch (error) {
        toast.error(error.response?.data.message || "An error occurred while confirming the order.");

       }
    }

    return (
    <div className="bg-purple-50 p-10">
        <Toaster/>
        <div className="w-72 m-auto bg-white flex flex-wrap justify-around rounded-md shadow-lg">
           <p className="text-xl pt-10 pb-10"> Items : <span className="font-medium">{cart.length}</span></p>
           <p className="text-xl pt-10 pb-10"> price : <span className="font-medium">{(total).toLocaleString()}</span></p>
        </div>

       <div className="w-4/6 shadow-lg bg-white m-auto mt-10 p-10 rounded-lg ">
       <h2 className="text-center text-2xl font-bold text-blue-700 pb-10">Uaer Details</h2>
       <form onSubmit={submitConfirmOrder}>
          {/* Username */}
          <p className="text-xl pb-2">Username</p>
          <label className="input input-bordered flex items-center gap-2 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
            </svg>
            <input type="text" className="grow" placeholder="Username" name="username" value={updateBuyUser.username} onChange={handelUser} />
          </label>

          {/* Email */}
          <p className="text-xl pb-2">Email</p>
          <label className="input input-bordered flex items-center gap-2 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input type="email" className="grow" placeholder="Email" name="email" value={updateBuyUser.email} onChange={handelUser} />
          </label>

          {/* Phone */}
          <p className="text-xl pb-2">Phone</p>
          <label className="input input-bordered flex items-center gap-2 mb-4">
            <MdContactPhone />
            <input type="number" className="grow" placeholder="Phone number" name="phone" value={updateBuyUser.phone} onChange={handelUser} />
          </label>

          {/* Address */}
          <p className="text-xl pb-2">Address</p>
          <label className="input input-bordered flex items-center gap-2 mb-4">
            <FaRegAddressCard />
            <input type="text" className="grow" placeholder="Address" name="address" value={updateBuyUser.address} onChange={handelUser} />
          </label>

          {/* Country */}
          <p className="text-xl pb-2">Country</p>
          <label className="input input-bordered flex items-center gap-2 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 opacity-70">
              <path d="M7 2v6l-2-2-2 2V2H0v12h7v-6l2 2 2-2V2h7V0H7z" />
            </svg>
            <input type="text" className="grow" placeholder="Country" name="country" value={updateBuyUser.country} onChange={handelUser} />
          </label>

          <button className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded-lg shadow-lg transition duration-300 ease-in-out mt-4">
            Conform
          </button>
        </form>
       </div>
        
    </div>
    )
}