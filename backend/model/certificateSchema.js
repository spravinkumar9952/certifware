import mongoose from "mongoose";

const certificateSchema = new mongoose.Schema({
    userName: String,
    certificateName: String,

    creadentialId: String,

    creadentialUrl: String,

    group:  String,

    img:{
        data: Buffer,
        contentType: String
    }
})

export default certificateSchema;