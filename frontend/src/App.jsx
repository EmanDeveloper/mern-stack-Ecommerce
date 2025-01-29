import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Ecomerce/home";
import Show from "./Ecomerce/Show";
import Footer from "./Component/footer";
import Navbar from "./Component/Navbar";
import SignUp from "./Ecomerce/Signup";
import Login from "./Ecomerce/Login";
import ViewCart from "./Ecomerce/viewCart";
import ForgetLogin from "./Component/forgetLogin";
import ResetLogin from "./Component/ResetLogin";
import BuyProduct from "./Ecomerce/buyProduct";
import { StoreContextProvide } from "./context/StoreContext";

import Admin from "./AdmiComponent/Admin";
import EditProduct from "./AdmiComponent/EditProduct";
import AddProduct from "./AdmiComponent/AddProduct";

function App() {
  return (
    <Router>
      <StoreContextProvide>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/show/:id" element={<Show />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/visitCart" element={<ViewCart />} />
          <Route path="/forgetLogin" element={<ForgetLogin />} />
          <Route path="/resetLogin" element={<ResetLogin />} />
          <Route path="/buyProduct" element={<BuyProduct />} />
          <Route path="/edit/:id" element={<EditProduct />} />
          <Route path="/addProduct" element={<AddProduct />} />
        </Routes>
        <Footer />
      </StoreContextProvide>
    </Router>
  );
}

export default App;
