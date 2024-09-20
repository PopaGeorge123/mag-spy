import mongoose from "mongoose";
import toJSON from "./plugins/toJSON";

// Product SCHEMA
const AlertSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    frequency: {
      type: String,
      trim: true,
    },
    typeof: {
      type: String,
    },
    priceValue: {
      type: Number,
    },
    enabled: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

// add plugin that converts mongoose to json
AlertSchema.plugin(toJSON);

export default mongoose.models.Alert || mongoose.model("Alert", AlertSchema);
