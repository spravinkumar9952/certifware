import mongoose from "mongoose";

const certificateSchema = new mongoose.Schema({
    img:{
        data: Buffer,
        contentType: String
    }
})

export default certificateSchema;