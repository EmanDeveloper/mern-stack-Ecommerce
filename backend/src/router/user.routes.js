import {Router} from "express";
import passport from "passport";
import { signUp,
    userLogin,
    userLogout,
    forgetLogin,
    resetLogin,
    firstLogin,
    sendBuydUser,
    checkLogin
 } from "../controller/user.controller.js";
import { login } from "../middleware/login.middleware.js";

const router=Router();

router.route("/").get(firstLogin)
router.route("/signup").post(signUp);
router.route("/login").post(passport.authenticate("local",{ failureMessage: true }),userLogin);
router.route("/logout").get(userLogout)
router.route("/forgetLogin").post(forgetLogin)
router.route("/resetLogin").put(resetLogin)
router.route("/buyUser").get(login,sendBuydUser);
router.route("/checklogin").get(checkLogin)

export default router;