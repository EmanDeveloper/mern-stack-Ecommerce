import axios from "axios";
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { handelStoreContext } from "../context/StoreContext";
import { Link } from "react-router-dom";

function Login() {
  const [login, setLogin] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();
  const { setIsLogin,url } = handelStoreContext();

  function userLogin(e) {
    setLogin({ ...login, [e.target.name]: e.target.value });
  }

  async function handelLogin(e) {
    e.preventDefault();

    if (!login.username || !login.password) {
      toast.error("Username or password is missing 😊");
      return;
    }

    try {
      await axios.post(`${url}/user/login`, login, {
        withCredentials: true,
      });

      toast.success("User logged in successfully 🎉");

      setIsLogin(true);

      let redirectPath = localStorage.getItem("redirectPath") || "/";
      localStorage.removeItem("redirectPath");

      navigate(redirectPath);
    } catch (error) {
      toast.error(error.response?.data.message);
      setIsLogin(false);
    }
  }

  return (
    <div className="flex w-full mb-10">
      <div>
        <Toaster />
      </div>
      <div className="signup-container shadow-md shadow-purple-300">
        <form className="w-96 ml-32 mt-32" onSubmit={handelLogin}>
          {/* Username */}
          <label className="input input-bordered flex items-center gap-2 mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
            </svg>
            <input
              type="text"
              className="grow"
              placeholder="Username"
              name="username"
              value={login.username}
              onChange={userLogin}
            />
          </label>

          {/* Password */}
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type="password"
              className="grow"
              placeholder="*****"
              name="password"
              value={login.password}
              onChange={userLogin}
            />
          </label>

          <button className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded-lg  shadow-lg transition duration-300 ease-in-out mt-4">
            Login
          </button>
          <br />
          <p className="text-xl mt-4"> Forget Password ?  <Link to="/forgetLogin" className="text-blue-600">Click me </Link></p>
         
        </form>
      </div>
    </div>
  );
}
export default Login;
