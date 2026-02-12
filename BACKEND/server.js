import cors from "cors";
import "dotenv/config";
import express from "express";
import connectDB from "./configs/db.js";
import chatRouter from "./routes/chatRoutes.js";
import UserRouter from "./routes/userRoutes.js";
import messageRouter from "./routes/messageRoutes.js";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//DATABASE CONNECTION
connectDB();
//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // <-- ADD THIS

//rotes

//app.get("/", (req, res) => {
  //res.send("SERVER IS WORKING");
//});
app.use("/api/user", UserRouter);
app.use("/api/chat", chatRouter);
app.use("/api/message",messageRouter)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("SERVER RUNING AT P0RT 3000");
});

// Serve frontend
app.use(express.static(path.join(__dirname, "../client/dist")));

// React fallback
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});
