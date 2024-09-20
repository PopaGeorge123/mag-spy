import mongoose from "mongoose";
import toJSON from "./plugins/toJSON";


// Session Product Schema
const DemoProduct = mongoose.Schema(
  {
    imageUrl: {
      type: String,
    },
    dataIdRoute: {
      type: String,
    },
    productUrl: {
      type: String,
    },
    priceCurrency:{
      type : String
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
DemoProduct.plugin(toJSON);

export default mongoose.models.DemoProduct || mongoose.model("DemoProduct", DemoProduct);
