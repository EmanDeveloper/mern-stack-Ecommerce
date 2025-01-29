import axios from "axios";
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { handelStoreContext } from "../context/StoreContext";
import { useNavigate } from "react-router-dom";

export default function ForgetLogin() {
  const [email, setEmail] = useState("");
  const {url}=handelStoreContext();
  const navigate=useNavigate()

  async function handelSubmit(e) {
    e.preventDefault();

    if (!email) {
      toast.error("Email address required");
      return
    }
    try {
        await axios.post(`${url}/user/forgetLogin`,{email},{withCredentials:true})
        toast.success("Recovery Email sended!")
        navigate("/resetLogin")
    } catch (error) {
        toast.error(error.response?.data.message)
    }
   
  }

  return (
    <div className="flex w-full">
      <div>
        <Toaster />
      </div>
      <div className="signup-container shadow-md shadow-purple-300">
        <form className="w-96 ml-32 mt-32" onSubmit={handelSubmit}>
       
          <label className="input input-bordered flex items-center gap-2 mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input
              type="email"
              className="grow"
              placeholder="Email"
              name="email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
            />
          </label>

          <button className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded-lg  shadow-lg transition duration-300 ease-in-out mt-4">
            submit
          </button>
          <br />
        </form>
      </div>
    </div>
  );
}
