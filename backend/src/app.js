import express from "express";
import cookieParser from "cookie-parser"
import cors from "cors" 
const app=new express();
app.use(express.urlencoded({ extended: true, limit: "100kb" }));
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true,
    
}))
app.use(express.json({ limit: "16kb" }));

app.use(cookieParser())
app.use(express.static("public"))


import userRouter from "./routes/user.routes.js";
import hisabNamerouter from "./routes/hisabName.routes.js";
import hisabrouter from "./routes/hisab.router.js";

app.use("/api/v1/users",userRouter)

app.use("/api/v1/hisabname",hisabNamerouter)

app.use("/api/v1/hisab",hisabrouter)
export default app;