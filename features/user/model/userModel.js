const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  userName: {
    type: String,
    minLength: 2,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    unique: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
});

module.exports = model("User", userSchema);
