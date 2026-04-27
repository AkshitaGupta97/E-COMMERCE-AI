
import userModel from "../models/userModels.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// api to register user

export const registerUser = async(req, res) => {
    try {
        const {name, email, password, address = ""} = req.body;
        if(!name || !email || !password){
            return res.json({success:false, message: "All fields are required"});
        }

        // evaluation of email
        if(!validator.isEmail(email)){
            return res.json({ success: false, message: "Invalid email" });
        }
        // password length
        if(password.length < 8){
            return res.json({ success: false, message: "Password must be at least 8 characters" });
        }

        // encrypt the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        // add to database
        const userData = new userModel({name, email, password: hashedPassword, address});
        await userData.save();

        // for token
        const token = jwt.sign({id: userData._id}, process.env.JWT_SECRET);

        return res.json({success: true, message:"User registered successfully..", token});

    } catch (error) {
        console.error("error from user controller -> ", error);
        return res.json({ success: false, message: "Internal server error" });
    }
}

// api for user login

export const loginUser = async(req, res) => {
    try {
        const {email, password} = req.body;

        const user = await userModel.findOne({email});

        if(!user){
            return res.json({success: false, message:"Invalid user"});
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.json({success: false, message:"Incorrect password"});
        }

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);

        res.json({success: true, message: "Login Successful", token});

    } catch (error) {
        console.error("error from user controller -> ", error);
        return res.json({ success: false, message: "Internal server error" });
    }
}

// api to get user profile
export const getUserProfile = async (req, res) => {
    try {
        const userId = req.userId;
        const user = await userModel.findById(userId).select("-password");

        if(!user) {
            return res.json({
                success: false, 
                message: "User not found"
            });
        }

        res.json({success: true,  user});

    } catch (error) {
        console.log("getProfile error:", error);
        res.json({
            success: false,
            message: "Internal server error"
        });
    }
}

export const updateUserProfile = async (req, res) => {
    try {
        const {name, email, phone, dob, gender, address = ""} = req.body || {};
        const userId = req.userId;
        const imageFile = req.file;

        if(!name.trim() || !phone.trim()){
            return res.json({success: false, message: "Name and phone number is required.."});
        }

        const updatedData = {
            name,
            email,
            phone,
            dob,
            gender,
            address
        };

        if (imageFile) {
            updatedData.image = imageFile.path;
        }

        const updatedUser = await userModel.findByIdAndUpdate(userId, updatedData, { new: true }).select("-password");

        if(!updatedUser) {
            return res.json({ success: false, message: "User not found" });
        }

        res.json({ success: true, message: "Profile updated successfully", user: updatedUser });

    } catch (error) {
        console.error("updateProfile error:", error);
        return res.json({ success: false, message: "Internal server error" });
    }
}



