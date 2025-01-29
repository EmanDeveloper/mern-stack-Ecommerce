import { Link } from "react-router-dom";
import { handelStoreContext } from "../context/StoreContext";
import axios from "axios";

function Navbar() {
  const { isLogin, cart, setIsLogin, url } = handelStoreContext();
  const cardPrice = cart?.reduce((a, b) => a + b.price, 0);

  async function handelLogout() {
    let response = await axios.get(`${url}/user/logout`, {
      withCredentials: true,
    });
    setIsLogin(response.data.data);
  }

  return (
    <div className="navbar  shadow-md shadow-purple-300">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          ThetaStore
        </Link>
      </div>
      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className="badge badge-sm indicator-item bg-purple-950 text-white">
                {cart.length}
              </span>
            </div>
          </div>
          <div
            tabIndex={0}
            className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow"
          >
            <div className="card-body">
              <span className="text-lg font-bold">
                Total item added : {cart.length}
              </span>
              <span className="text-info">
                Subtotal: {cardPrice.toLocaleString()}
              </span>
              <div className="card-actions">
                <Link to="/visitCart" className="btn btn-primary btn-block">
                  View cart
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div>
          <ul className="flex">
            {isLogin ? (
              <li className="pr-2 btn btn-sm bg-red-700 text-white mr-2 ml-2 hover:text-black">
                <button onClick={handelLogout}>Logout</button>
              </li>
            ) : (
              <>
                <li className="pr-2 btn bg-primary btn-sm text-white mr-2 ml-2 hover:text-black">
                  <Link to="/signup">Signup</Link>
                </li>
                <li className="pr-2 btn border-purple-500 btn-sm bg-red-700 text-white mr-2 hover:text-black">
                  <Link to="/login">Login</Link>
                </li>
              </>
            )}
          </ul>
        </div>
        {isLogin && (
          <Link
            to="/admin"
            className="btn btn-primary btn-sm mr-4 ml-2 text-white"
          >
            Admin
          </Link>
        )}
      </div>
    </div>
  );
}

export default Navbar;
