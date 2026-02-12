import express from "express";
import { loginUser, registerUser ,getUser, getPublishImages} from "../controllers/userController.js";
import { protect } from "../middlewares/auth.js";

const UserRouter = express.Router();

UserRouter.post("/register", registerUser);
UserRouter.post("/login", loginUser);
UserRouter.get("/data", protect, getUser);
UserRouter.get("/published-images", getPublishImages);
export default UserRouter;
