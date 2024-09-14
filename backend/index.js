import express, { urlencoded } from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js"
import postRoute from "./routes/post.route.js"
import storyRoute from "./routes/story.route.js"
import reelRoute from "./routes/reels.route.js"
import messageRoute from "./routes/message.route.js"
import { app, server } from "./socket/socket.js";
import path from "path";
dotenv.config({});

// const app = express();
const PORT = process.env.PORT || 8000;

const __dirname = path.resolve();
// console.log(__dirname)

// app.get("/",(req,res)=>{
//     return res.status(200).json({
//         message:"i am coming from backend",
//         success:true
//     })
// })
//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(urlencoded({extended:true}));
const corsOptions = {
    origin:'http://localhost:5173',
    credentials:true
}
app.use(cors(corsOptions));

//yha pr apni api ayengi
app.use("/api/v1/user", userRoute);
app.use("/api/v1/post", postRoute);
app.use("/api/v1/story", storyRoute);
app.use("/api/v1/reels", reelRoute);
app.use("/api/v1/message", messageRoute);

app.use(express.static(path.join(__dirname, "/frontend/dist")));
app.get("*", (req,res)=>{
    res.sendFile(path.resolve(__dirname, "frontend","dist","index.html"))
})



server.listen(PORT,()=>{
    connectDB()
    console.log(`Server listen at port ${PORT}`);
    
})