import express from "express"
import Order from "../models/Order.js"
import { verifyToken } from"../middleware/auth.js"
import { authorizeRoles } from "../middleware/authorize.js";

console.log("✅ order routes loaded");

const router = express.Router();


router.post("/", verifyToken,async (req , res)=>{
    try{
        const {items, totalAmount , paymentMethod} = req.body;

         if (!items || items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const order = await Order.create({
        userId: req.user.id,
        items,
        totalAmount,
        paymentMethod,
        status: "Pending",
    })

    res.status(201).json({
        message:"Order placed successfully",
        order,
    })
    }catch(error){
        res.status(500).json({message:"Order creation failed", error})
    }
})

router.get("/my-orders", verifyToken, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id })
      .sort({ createdAt: -1 });

    res.json({ orders });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch orders" });
  }
});

router.get("/admin/all", verifyToken, authorizeRoles("owner"), async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("userId", "name email")
      .populate("items.productId", "name price")
      .sort({ createdAt: -1 });

    res.json({ orders });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch all orders" });
  }
});

router.put(
  "/:id/accept",
  verifyToken,
  authorizeRoles("owner"),
  async (req, res) => {
    try {
      const order = await Order.findById(req.params.id);

      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }

      if (order.status !== "Pending") {
        return res
          .status(400)
          .json({ message: "Order already processed" });
      }

      order.status = "Accepted";
      await order.save();

      res.json({
        message: "Order accepted successfully",
        order,
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to accept order" , error: error.message,});
    }
  }
);

router.delete(
  "/:id",
  verifyToken,
  authorizeRoles("admin", "owner"),
  async (req, res) => {
    try {
      await Order.findByIdAndDelete(req.params.id);
      res.json({ message: "Order deleted successfully" });
    } catch {
      res.status(500).json({ message: "Failed to delete order" });
    }
  }
);


router.put(
  "/:id/deliver",
  verifyToken,
  authorizeRoles("owner"),
  async (req, res) => {
    try {
      const order = await Order.findById(req.params.id);

      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }

      if (order.status !== "Accepted") {
        return res
          .status(400)
          .json({ message: "Order must be accepted first" });
      }

      order.status = "Delivered";
      await order.save();

      res.json({
        message: "Order delivered successfully",
        order,
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to deliver order" });
    }
  }
);





export default router