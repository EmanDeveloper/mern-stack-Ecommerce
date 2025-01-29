import { createContext, useContext, useState,useEffect } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const StoreContex = createContext();

export const StoreContextProvide = ({ children }) => {
  const url = "http://localhost:3000";

  const initialCart = JSON.parse(localStorage.getItem("cart")) || [];
  const buyuser = JSON.parse(localStorage.getItem("buyUser"));

  const [isLogin, setIsLogin] = useState(false);
  const [cart, setCart] = useState(initialCart);

  const [totalProduct,setTotalProduct]=useState([]);

  const navigate = useNavigate();

  useEffect(()=>{
    async function checklogin() {
      let response=await axios.get(`${url}/user/checklogin`,{withCredentials:true})
      setIsLogin(response.data.data)
    }

    checklogin();
  },[])

  useEffect(() => {
    async function getProduct() {
      try {
        let response = await axios.get(`${url}/product`);
        setTotalProduct(response.data.data);
      } catch (error) {
        toast.error("Their is some issue please try again leater");
      }
    }

    getProduct();
  }, []);

  // Function to add an item to the cart
  const addToCart = (item) => {
    const isItemInCart = cart.some((el) => el._id === item._id);
    if (isItemInCart) {
      toast.error("Item is already in cart");
    } else {
      const updatedCart = [...cart, item];
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      toast.success("Item added to cart");
    }
  };

  function redirectLogin() {
    if (!isLogin) {
      toast.error("Please login first");
      if (!localStorage.getItem("redirectPath")) {
        localStorage.setItem("redirectPath", window.location.pathname);
      }
      navigate("/login");
      return false;
    }
    return true;
  }

  async function handelBuyProduct(buyItemPrice=null, item=null) {
    
    if (redirectLogin()) {
      try {
        let response = await axios.get(`${url}/user/buyUser`, {
          withCredentials: true,
        });
        localStorage.setItem("buyUser", JSON.stringify(response.data.data));

        if (buyItemPrice && item) {
          const isItemInCart = cart.some((el) => el._id === item?._id);
        if (!isItemInCart) {
          const updatedCart = [...cart, item];
          setCart(updatedCart);
          localStorage.setItem("cart", JSON.stringify(updatedCart));
        }
        else{
          toast.error("This item already in cart")
        }
      }
      } catch (error) {
        toast.error(error.response?.data.message);
      }
      navigate("/buyProduct");
    }
  }

  return (
    <StoreContex.Provider
      value={{
        isLogin,
        setIsLogin,
        cart,
        setCart,
        url,
        addToCart,
        redirectLogin,
        handelBuyProduct,
        buyuser,
        totalProduct,
        setTotalProduct
      }}
    >
      {children}
    </StoreContex.Provider>
  );
};

export function handelStoreContext() {
  return useContext(StoreContex);
}
