import { HisabName } from "../models/hisabName.models.js";
import { User } from "../models/user.models.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import cookieparser from "cookie-parser";

const genrateAccessAndRefreshToken=async (userId)=>{
    console.log("id",userId)
    try {
        const user=await User.findById(userId)
        
        if(!user){
            throw new apiError(404,"not found")
        }
        console.log("usei",user)
        const accessToken=await user.genrateAccessToken()
        const refreshToken=await user.genrateRefreshToken()
        console.log(" skfbslkbfweff444444444", accessToken,"        \n",refreshToken)
        user.refreshToken=refreshToken
        await user.save({validateBeforeSave:false})
        return {accessToken,refreshToken}
    } catch (error) {
        throw new apiError(500,"something went wrong")
    }
}

const registerUser= asyncHandler(async(req,res)=>{
        
        const {username,fullname,email,password}=req.body;
        
       if([username,fullname,email,password].some((fi)=>fi?.trim() ===" ")){
        throw new apiError(400,"required")
       }
            
        const existUser=await User.findOne({$or:[{username},{email}]})
        
        if(existUser){
            throw new apiError({statuscode:404,message:"already exist"})
        }

        const userCreated=await User.create({
           username,fullname,email,password
        })


        const user=await User.findById(userCreated._id).select(" -password -refreshToken")
        if(!user){
            throw new apiError(404,"something went wrong while registering")
        };
        return res.status(201).json(
            new apiResponse(201,{user:user},"Registration successfull!!")
        )
    
})

const loginUser=asyncHandler(async (req,res)=>{
     const {username,email,password}=req.body
     
     if(!(username||email)){
        throw new apiError(200,"required")
     }
    const user=await User.findOne({$or:[{username},{email}]})
    if(!user){
        throw new apiError(404,"not found")
    }
    
    const isCorrect=await user.isPasswordCorrect(password)
    console.log(isCorrect)
    if(!isCorrect){throw new apiError(202,"incoorect password")}
    await user.save();
    const loggedIn=await User.findById(user._id).select("-password -refreshToken")
    console.log("id",user._id)
    const {accessToken,refreshToken}=await genrateAccessAndRefreshToken(user._id)
    const options={
        httpOnly:true,
        secure:true
    }
    
    return res.status(200).cookie("accessToken",accessToken,options).cookie("refreshToken",refreshToken,options).json( new apiResponse(200,{user:loggedIn,accessToken,refreshToken},"user logged in"))

})

const logoutUser=asyncHandler(async(req,res)=>{
    await User.findByIdAndUpdate(req.user._id,{
        $set:{
            refreshToken:undefined
        }
    },{
        new:true
    })
    const options={
        httpOnly:true,
        secure:true
    }
    return res.status(200).clearCookie("accessToken",options).clearCookie("refreshToken",options).json( new apiResponse(200,{},"user logged OUT"))
})

const refreshAccessToken=asyncHandler(async (req,res)=>{
    try {
        const incomingToken=req.body.refreshToken||req.cookies.refreshToken
    
        if(!incomingToken)throw new apiError(200,"unauthorized access")
    
        const decodedToken=await jwt.verify(incomingToken,process.env.REFRESH_TOKEN_SECRET)
        if(!decodedToken)throw new apiError(200,"unauthorized access")
        const user=await User.findById(decodedToken._id)
    
        if(incomingToken!==user.refreshToken){
            throw new apiError(200,"expired")
    
        }
        const {accessToken,newrefreshToken}=await genrateAccessAndRefreshToken(user._id)
        const options={
            httpOnly:true,
            secure:true
        }
        return res.status(200).cookie("accessToken",accessToken,options).cookie("refreshToken",newrefreshToken,options).json( new apiResponse(200,{accessToken,refreshToken:newrefreshToken},"user logged in"))
    
    } catch (error) {
        throw new apiError(401,error?.message)
    }

})


const updatePassword=asyncHandler(async (req,res)=>{
    const {oldPassword,newPassword}=req.body
    if(!(oldPassword||newPassword)){throw new apiError(200,"required")}
    const user=await user.findById(req.user._id)


    const isPasswordCorrect=await user.isPasswordCorrect(oldPassword)
    if(!isPasswordCorrect){throw new apiError(200,"old password incorrect")}

    user.password=newPassword
    user.save({validateBeforeSave:false})

    return res.status(200).json(new apiResponse(200,"changed"))
})

const getUser=asyncHandler(async(req,res)=>{
    const user=await User.findById(req.user._id).select("-password -refreshToken -hisabNameList -_id -createdAt -updatedAt")
    return res.status(200).json(new apiResponse(200,{user:user}))
})


const shareHisab=asyncHandler(async (req,res)=>{
    console.log("id444",req.user._id)
    const user=await User.findById(req.user._id)
    if(!user){
        throw new apiError(200,"username is required")
    }
    console.log(req.body.hisabNameid)
    const hisabuser=await HisabName.findById(req.body.hisabNameid)
    console.log(hisabuser)
    const username=req.body.username
    const userFind=await User.findOne({username})
    if(!userFind){
        throw new apiError(404,"not found")
    }
    const pus=hisabuser.isShared.push(userFind._id)
    const push= user.isShared.push(userFind._id)
    const pushed= userFind.shared.push(req.body.hisabNameid)
    await hisabuser.save({validateBeforeSave:false})
    await userFind.save({validateBeforeSave:false})
    await user.save({validateBeforeSave:false})
    return res.status(201).json(new apiResponse(200," shared"))

})


const sharedto=asyncHandler(async (req,res)=>{
    console.log("sdfsfsefsfsedsfsfsgfs",req.query._id)
    const user=await HisabName.findById(req.query._id).populate("isShared").exec()
    console.log("vuvgvgigi",user.isShared)
    return res.status(200).json(new apiResponse(200,{isShared:user.isShared}))  
})

export {registerUser,loginUser,logoutUser,refreshAccessToken,updatePassword,getUser,shareHisab,sharedto}