import {Router} from "express";
import {login} from "../middleware/login.middleware.js";

import { createReview,
    deleteReview
 } from "../controller/review.controller.js";

const router=Router();

router.route("/addReview/:id").post(login,createReview);
router.route("/deleteReview/:Rid/:Pid").delete(login,deleteReview)

export default router