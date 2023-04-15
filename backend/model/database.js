import mongoose from "mongoose";
import certificateSchema from "./certificateSchema.js";
import userSchema from "./userSchema.js";

mongoose.set('strictQuery', true);
mongoose.connect("mongodb+srv://certifware:JLyokTLP0PGEWVJ9@certifware.b1mzy01.mongodb.net/certifware?retryWrites=true&w=majority",{useNewUrlParser : true});

const User = new mongoose.model("User", userSchema);

const Certificate = new mongoose.model("Certificate", certificateSchema);

export {User, Certificate};

