const mongoose = require("mongoose");
const UserSchema = mongoose.Schema(
    {
      username: {
        type: String,
        required:[true,"Please add your username."],
      },
      email:{
        type: String,
        required:[true,"Please add your emailId."],
        unique:[true,"Email address already taken"],
      },
      password:{
        type: String,
        required:[true,"Please add your password"],
      },
        preferences: {
            type: String
        },
        age: {
          type: Number,
            required: [true, "Please add age"]
        },
        location: {
          type: String,
            required: [true, "Please add location"]
        },
        gender: {
          type: String,
            required: [true, "Please add gender"]
        },
    },
    {
        collection: "users",
        timestamps: true
    }
  );
  const Users=mongoose.model("Users", UserSchema);
  module.exports = Users;