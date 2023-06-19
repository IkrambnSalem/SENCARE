
const mongoose = require("mongoose");
var uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  userType: String,
  firstName: String,
  lastName: String,
  email: {type:String,unique:true},
  password: String,
  phoneNumber:String,
  address: String,
  experience:String,
  price:String,
  gender: String,
  birthday: Date,
  avatar: String,
  pdf: String,
  role:String,
  assistantResponse:String,
  status:String,
  responseASS:String,

});
userSchema.plugin(uniqueValidator);
const user = mongoose.model("User", userSchema);

module.exports = user;
