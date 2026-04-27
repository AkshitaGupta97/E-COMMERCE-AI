import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique:true},
    password: {type: String, required: true},
    dob: {type: String, required: true},
    image: {type: String, default:""},
    gender: {type: String, default: "Not Selected"},
    phone: {type: String, default: "00000000"},
    address: {type: String, default: ""},
    cartData: {type: Object, default: {}},
    wishList: {type: Object, default: {}}
}, {minimize: false, timestamps: true});

const userModel = mongoose.models.user || mongoose.model('user', userSchema);

export default userModel;
