// import mongoose from "mongoose";

// const productSchema = new mongoose.Schema({
//     name:String,
//     price:String,
//     deatils:String,
//     category:String,
//     veg:Boolean,
//     offer:String,
// })
// export default mongoose.model("Product",productSchema);
import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    details: { type: String },
    category: { type: String },
    veg: { type: Boolean, default: true },
    offer: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
