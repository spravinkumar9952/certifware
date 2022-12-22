import mongoose from "mongoose";
import userSchema from "./userSchema.js";

mongoose.set('strictQuery', true);
mongoose.connect("mongodb://0.0.0.0:27017/userDB",{useNewUrlParser : true});

const User = new mongoose.model("User", userSchema);


export {User};

