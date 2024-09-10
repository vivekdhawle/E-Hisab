import mongoose ,{Schema} from "mongoose";

const hisabNameSchema= new Schema({
    
    hisabName:{
        type:String,
        required:true,
        lowercase:true,
        trim:true,
        index:true,
    },
    phnNo:{
       
        type:Number,
        required:true,
        
    },
    fullname:{
        type:String,
        required:true,
        trim:true,
    },
   
    
    hisab:[{
        type:Schema.Types.ObjectId,
        ref:"hisab"
    }],
    totalValue:{
        type:Schema.Types.ObjectId,
        ref:"hisab"
    },
    isEditable:{
        type:Boolean,
        default:false
    },
    isShared:[{
        type:Schema.Types.ObjectId,
        ref:"user"
    }],
    
   
   
},{timestamps:true})

export const HisabName=mongoose.model("hisabName",hisabNameSchema)