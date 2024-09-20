import mongoose from "mongoose";
import toJSON from "./plugins/toJSON";


const priceHistorySchema = mongoose.Schema(
  {
    price: {
      type: Number,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
  },
  {
    _id: false, // Disable _id for sub-documents if not needed
  }
);


// Product SCHEMA
const productSchema = mongoose.Schema(
  {
    owner: {
      type: String,
      trim: true,
    },
    name: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    imageUrl: {
      type: String,
    },
    dataIdRoute: {
      type: String,
    },
    productUrl: {
      type: String,
    },
    alerts: {
      type: Array,
    },
    priceHistory: [priceHistorySchema],
    priceCurrency:{
      type : String
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    lastTimeUpdate: {
      type: String
    },
    timezone: {
      type: String
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

// add plugin that converts mongoose to json
productSchema.plugin(toJSON);

export default mongoose.models.Products || mongoose.model("Products", productSchema);
