const mongoose = require("mongoose");
const requestSchema = mongoose.Schema({
    UserName: String,
    idUser: String,
    emailUser: String,
    telUser: Number,
    message: String,
    assistantResponse: String,
    assistantId: String,
    assistantName: String,
    assistantEmail: String,
    assistantphone:Number,
    createdDate: Date,
})

const Request = mongoose.model("Request", requestSchema);
module.exports = Request;

