import Razorpay from "razorpay";
import crypto from "crypto";
import express from "express";

const router = express.Router();

// create razorpay order
router.post("/razorpay/create-order", async (req, res) => {
  try {
    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const options = {
      amount: req.body.amount * 100,     // convert to paise
      currency: "INR",
      receipt: "order_" + Date.now(),
    };

    const order = await instance.orders.create(options);
    res.json(order);
  } catch (err) {
    console.log("Razorpay Error:", err);
    res.status(500).json({ error: "Failed to create order" });
  }
});

// verify payment after success
router.post("/razorpay/verify", async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const sign = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(razorpay_order_id + "|" + razorpay_payment_id)
    .digest("hex");

  if (sign === razorpay_signature) {
    return res.json({ success: true, message: "Payment verified" });
  }
  res.json({ success: false, message: "Invalid signature" });
});

export default router;
