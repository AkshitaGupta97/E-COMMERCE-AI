import jwt from "jsonwebtoken";

export const adminLogin = async(req, res) => {
    try {
        const {email, password} = req.body;
        if(!email || !password){
            return res.json({success: false, message: "All details are required"});
        }
        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
            const token = jwt.sign({email}, process.env.JWT_SECRET, {expiresIn: "1d"});
            return res.json({success: true, message: "Login successful", token});
        }
        else {
            return res.json({success: false, message: "Invalid credentials"});
        }
    } catch (error) {
        console.log("error from admin -> adminLogin =", error);
        return res.json({ success: false, message: "Internal server error" });
    }
}
