import { HisabName } from "../models/hisabName.models.js";
import { User } from "../models/user.models.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { Hisab } from "../models/hisab.models.js";

const createHisab=asyncHandler(async (req,res)=>{
    const {article,amount,quantity,totalValue}=req.body
    if([article,amount,quantity,totalValue].some((field)=>field?.trim() ==="")){{throw new apiError(200,"reqiured")}};

    const createdHisab=await Hisab.create({
        article,amount,quantity,totalValue
    })
    const hisab=await Hisab.findById(createdHisab._id)
    if(!hisab){
        throw new apiError(404,"something went wrong while creating hisab")
    };

    const hisabName=await HisabName.findById(req.hisabName._id)
    const pushed= hisabName.hisab.push(createdHisab._id)
    console.log(pushed)
    await hisabName.save({validateBeforeSave:false})
     return res.status(200).json(new apiResponse(200," created"))


})

const retriveHisab=asyncHandler(async(req,res)=>{
    console.log(req.hisabName._id)
    const hisabList=await HisabName.findById(req.hisabName._id).populate("hisab").exec()
    console.log(hisabList)
    return res.status(200).json(new apiResponse(200,hisabList))
})


export  {createHisab,retriveHisab}