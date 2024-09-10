import { Router } from "express";
import { createHisabUser, deleteHisab, deleteSHaredHisabUaser, retriveHisab, retriveSharedHisab, updateHisab } from "../controllers/hisabName.contoller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import addHisabUnder from "../middlewares/hisab.middleware.js";

const router=new Router()

router.route("/createhisabuser").post(upload.none(),verifyJwt,createHisabUser)
router.route("/retrivehisabuser").get(upload.none(),verifyJwt,retriveHisab)
router.route("/delete").delete(deleteHisab)
router.route("/updatehisab").patch(upload.none(),updateHisab)
router.route("/retrivesharedhisab").get(retriveSharedHisab)
router.route("/deletesharehisab").delete(deleteSHaredHisabUaser)
export default router