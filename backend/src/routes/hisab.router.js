import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import addHisabUnder from "../middlewares/hisab.middleware.js";
import  { createHisab,retriveHisab } from "../controllers/hisab.controller.js";

const router=new Router()
router.route("/createhisab").post(upload.none(),addHisabUnder,createHisab)
router.route("/retrivehisab").get(upload.none(),addHisabUnder,retriveHisab)
export default router