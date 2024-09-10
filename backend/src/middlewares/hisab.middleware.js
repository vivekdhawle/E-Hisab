import asyncHandler from "../utils/asyncHandler.js";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import { User } from "../models/user.models.js";
import { apiError } from "../utils/apiError.js";
import { HisabName } from "../models/hisabName.models.js";

const addHisabUnder=async (req,res,next)=>{
    try {
        console.log(req.query)
        const {_id}=req.body._id||req.query._id
        const hisabName=await HisabName.findOne(_id)
        req.hisabName=hisabName
        next()
    } catch (error) {
        console.log(error)
        throw new apiError(404,"not found5")
    }
}
export default addHisabUnder