import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
      userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

        items:[
            {
                productId:{
                    type:mongoose.Schema.Types.ObjectId,
                    ref:"Product",
                    required:true,
                },
                name:String,
                price:Number,
                quantity:Number,
            }
        ],
        totalAmount:{
            type:Number,
            required:true,
        },

        paymentMethod:{
            type:String,
            enum:["COD", "Online"],
            default:"COD",
        },
status: {
  type: String,
  enum: ["Pending", "Accepted", "Delivered", "Cancelled"],
  default: "Pending",
},

    },
    {timestamps: true}
)


export default mongoose.model("Order", orderSchema)