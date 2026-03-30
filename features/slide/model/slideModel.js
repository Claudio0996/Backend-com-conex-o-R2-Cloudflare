const { Schema, model } = require("mongoose");

const slideSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    mediaUrl: {
      type: String,
      required: true,
    },
    mediaType: {
      type: String,
      required: true,
      enum: ["image", "video", "gif"],
    },
    isEnabled: {
      type: Boolean,
      default: true,
    },
    startAt: {
      type: Date,
      required: true,
    },
    endAt: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true },
);

slideSchema.index({ startAt: 1, endAt: 1, isEnabled: 1 });

module.exports = model("Slide", slideSchema);
