import app from "./app.js";
import connectDb from "./db/index.js";
import dotenv from "dotenv";

dotenv.config({
    path:"/env"
})
connectDb().then(()=>{
    app.listen(process.env.PORT||8000,()=>{
        console.log("listening")
    })
}).catch(err=>{console.log(err)})
