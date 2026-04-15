
import userModel from "../models/userModels.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// api to register user

export const registerUser = async(req, res) => {
    try {
        const {name, email, password} = req.body;
        if(!name || !email || !password){
            return res.json({success:false, message: "All fields are required"});
        }

        // evaluation of email
        if(!validator.isEmail(email)){
            return res.json({ success: false, message: "Invalid email" });
        }
        // password length
        if(password.lingth < 8){
            return res.json({ success: false, message: "Password must be at least 8 characters" });
        }

        // encrypt the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        // add to database
        const userData = new userModel({name, email, password: hashedPassword});
        await userData.save();

        // for token
        const token = jwt.sign({id: userData._id}, process.env.JWT_SECRET);

        return res.json({success: true, message:"User registered successfully..", token});

    } catch (error) {
        console.error("error from user controller -> ", error);
        return res.json({ success: false, message: "Internal server error" });
    }
}


