import mongoose ,{Schema} from "mongoose";

const hisabSchema=new Schema({
    date:{
        type: Date,
        default: Date.now,
        required:true,
    },

    article:{
        type:String,
        required:true,

    },
    amount:{
        type:Number,
        required:true,
        default:1,
    },
    quantity:{
        type:Number,
        required:true,
        default:1,
    },
   
    totalValue:{
        type:Number,
        default:0
    },
    hisabValue:{
        type:Number,    
        default:0,
    },
    amountPaid:{
        type:Number,    
        default:0,
    }


},{timestamps:true})

export const Hisab=mongoose.model("hisab",hisabSchema)