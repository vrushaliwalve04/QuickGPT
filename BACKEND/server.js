import cors from "cors";
import "dotenv/config";
import express from "express";
import connectDB from "./configs/db.js";
import chatRouter from "./routes/chatRoutes.js";
import UserRouter from "./routes/userRoutes.js";
import messageRouter from "./routes/messageRoutes.js";

const app = express();

//DATABASE CONNECTION
connectDB();
//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // <-- ADD THIS

//rotes

app.get("/", (req, res) => {
  res.send("SERVER IS WORKING");
});
app.use("/api/user", UserRouter);
app.use("/api/chat", chatRouter);
app.use("/api/message",messageRouter)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("SERVER RUNING AT P0RT 3000");
});
