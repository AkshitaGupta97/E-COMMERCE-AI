import express from "express";
import { getUserProfile, loginUser, registerUser, updateUserProfile } from "../controllers/userController.js";
import {authUser} from "../middleware/authUser.js";
import upload from "../middleware/multer.js";

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/get-profile', authUser ,getUserProfile);
userRouter.post('/update-profile', authUser, upload.single('image'), updateUserProfile);

export default userRouter;
