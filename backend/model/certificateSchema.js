import mongoose from "mongoose";

const certificateSchema = new mongoose.Schema({
    userName:{
        data : String
    },
    certificateName:{
        data : String
    },
    creadentialId:{
        data : String
    },
    creadentialUrl: {
        data : String
    },
    group: {
        data : String
    },
    img:{
        data: Buffer,
        contentType: String
    }
})

export default certificateSchema;