import {Router} from "express"
import { addProduct,
    showProduct,
    updateProduct,
    placeOrder,
    checkProduct,
    conformOrder,
    delteProduct
 } from "../controller/Product.controller.js";

import {login} from "../middleware/login.middleware.js";

import { storage } from "../utils/cloudinary.js";

import multer from "multer"
const upload = multer({ storage: storage });

const router=Router();

router.route("/").get(showProduct);
router.route("/show/:id").get(checkProduct)
router.route("/addProduct").post(upload.fields([{ name: 'productImage' }]),addProduct);
router.route("/updateProduct/:id").put(upload.fields([{ name: 'productImage' }]),updateProduct);
router.route("/placeOrder").get(login,placeOrder)
router.route("/conformOder/:id").put(login,conformOrder);
router.route("/deleteProduct/:id").delete(delteProduct)

export default router

