const { Schema, model } = require("mongoose");

const RefreshTokenModel = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  replacedBy: {
    type: String,
    default: null,
  },
  revokedAt: {
    type: Date,
    default: null,
  },
});

module.exports = model("RefreshToken", RefreshTokenModel);
