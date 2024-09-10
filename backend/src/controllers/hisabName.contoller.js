import { HisabName } from "../models/hisabName.models.js";
import { User } from "../models/user.models.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import mongoose from "mongoose";
import jwt from"jsonwebtoken";
const createHisabUser=asyncHandler(async (req,res)=>{
    console.log(req.body)
    const {hisabName,phnNo,fullname}=req.body
    
    if([hisabName,phnNo,fullname].some((field)=>field?.trim() ==="")){{throw new apiError(200,"reqiured")}};

     const hisabcreated=await HisabName.create({
        hisabName,phnNo,fullname
     }) 
     
     const hisab=await HisabName.findById(hisabcreated._id)
     if(!hisab){
         throw new apiError(404,"something went wrong while creating hisab")
     };
     
     console.log("jfj",req.user._id)
     const user=await User.findById(req.user._id)
     
     if(!user){throw new apiError(200,"plz login")}
     const pushed= user.hisabNameList.push(hisabcreated._id)
     
     await user.save({validateBeforeSave:false})
    return res.status(201).json(new apiResponse(200," created"))

})

const retriveHisab=asyncHandler(async(req,res)=>{
   
    const hisabList=await User.findById(req.user._id).populate("hisabNameList").exec()
    console.log("hisabk",hisabList.hisabNameList)
    return res.status(200).json(new apiResponse(200,{hisabList:hisabList.hisabNameList}))
})

const deleteHisab=asyncHandler(async(req,res)=>{
    console.log("dsfsf",req.query._id)
    const hisab=await HisabName.findByIdAndDelete(req.query._id)
    if(!hisab){
        throw new apiError(400,"not deleted")

    }
    return res.status(200).json(new apiResponse(200,"deleted"))
})

const updateHisab=asyncHandler(async (req,res)=>{
    console.log(req.body)
    const user=await HisabName.findByIdAndUpdate(req.body._id,{
        $set:{
            hisabName:req.body.hisabName,
            phnNo:req.body.phnNo,
            fullname:req.body.fullname
            
        }
    },{ new:true })
    console.log(user)
    return res.status(200).json(new apiResponse(200,{user:user}))
})

const retriveSharedHisab=asyncHandler(async(req,res)=>{
    const hisabList=await User.findById(req.user._id).populate("isShared").exec()
    console.log("hisabk",hisabList.isShared)
    return res.status(200).json(new apiResponse(200,{hisabList:hisabList.isShared}))
})

const deleteSHaredHisabUaser=asyncHandler(async (req,res)=>{
   const id=req.query.objectid
   if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid object ID' });
  }
    const hisab=await HisabName.updateOne({_id:req.query._id},{$pull:{ isShared:new mongoose.Types.ObjectId(id) } })
    if (hisab.modifiedCount === 0) {
        return res.status(404).json({ message: 'Item not found or already removed' });
      }
    
    res.status(200).json({ message: 'Item removed successfully' });

})

export {createHisabUser,retriveHisab,deleteHisab,updateHisab,retriveSharedHisab,deleteSHaredHisabUaser}