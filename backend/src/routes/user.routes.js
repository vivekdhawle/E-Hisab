import { Router } from "express";
import { loginUser, logoutUser, refreshAccessToken, registerUser, updatePassword ,getUser, shareHisab, sharedto} from "../controllers/user.controller.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
const router=new Router()

router.route("/register").post(upload.none(),registerUser)
router.route("/login").post(upload.none(),loginUser)
router.route("/logout").get(verifyJwt,logoutUser)
router.route("/refreshtoken").post(refreshAccessToken)
router.route("/updatepassword").post(updatePassword)
router.route("/getuser").get(verifyJwt,getUser)
router.route("/shareHisab").post(upload.none(),verifyJwt,shareHisab)
router.route("/sharedto").get(sharedto)
export default router