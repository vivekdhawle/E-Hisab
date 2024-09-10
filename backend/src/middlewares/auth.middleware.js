import asyncHandler from "../utils/asyncHandler.js";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import { User } from "../models/user.models.js";
import { apiError } from "../utils/apiError.js";

const verifyJwt=asyncHandler(async (req,res,next)=>{
    try {
        console.log("gd",req.cookies)
        const token=await req.cookies?.accessToken||req.header("Authorization")?.replace("bearer","");
        
        const decodedToken= jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
         console.log(decodedToken)
        const user=await User.findById(decodedToken._id).select("-password -refreshToken")
        if(!user){
            throw new apiError(404,"not found")
        }
        console.log("user:",user)
        req.user=user
        
        next()
        
    } catch (error) {
        console.log(error)
        throw new apiError(404,"not found5")
    }
})
export {verifyJwt}