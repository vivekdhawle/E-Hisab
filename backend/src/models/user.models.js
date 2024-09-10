import mongoose ,{Schema} from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const userSchema= new Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        index:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    fullname:{
        type:String,
        required:true,
       
        trim:true,
    },
    password:{
        type:String,
        required:true,
        trim:true,
    },
    hisabNameList:[{
        type:Schema.Types.ObjectId,
        ref:"hisabName"
    }],

    refreshToken:{
        type:String
    },
    isShared:[{
        type:Schema.Types.ObjectId,
        ref:"user"
    }],
    shared:[{
        type:Schema.Types.ObjectId,
        ref:"hisabName"
    }]

},{timestamps:true})


userSchema.pre("save",async function(next){
    if(!this.isModified("password")) return null
    this.password=await bcrypt.hash(this.password,10)
    next()
})

userSchema.methods.isPasswordCorrect=async function(password){
    
    return await bcrypt.compare(password,this.password)
}

userSchema.methods.genrateAccessToken= function(){
    
     return jwt.sign({
        _id:this._id.toString(),
        username:this.username,
        fullname:this.fullname,
        email:this.email,
    },process.env.ACCESS_TOKEN_SECRET,{
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    })
}
userSchema.methods.genrateRefreshToken= function(){
    return jwt.sign({
       _id:this._id.toString()
       
   },process.env.REFRESH_TOKEN_SECRET,{
       expiresIn:process.env.REFRESH_TOKEN_EXPIRY
   })
}
export const User=mongoose.model("user",userSchema)