import mongoose from "mongoose";
import certificateSchema from "./certificateSchema.js";
import userSchema from "./userSchema.js";

mongoose.set('strictQuery', true);
mongoose.connect("mongodb://0.0.0.0:27017/userDB",{useNewUrlParser : true});

const User = new mongoose.model("User", userSchema);

const Certificate = new mongoose.model("Certificate", certificateSchema);



export {User, Certificate};

