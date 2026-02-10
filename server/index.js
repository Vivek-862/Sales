// import express from 'express'
// import mongoose from 'mongoose'
// import cors from 'cors'
// import dotenv from 'dotenv'


// import authRoutes from './routes/auth.routes.js'
// import productRoutes from "./routes/products.routes.js";

// dotenv.config();

// const app = express();
// app.use(cors());
// app.use(express.json());


// app.use("/api/auth", authRoutes)
// app.use("/api/products", productRoutes);

// mongoose
// .connect(process.env.MONGO_URI)
// .then(()=>console.log("MongoDB connected"))
// .catch(err=>console.log(err));


// app.listen(5000, ()=>{
//     console.log("Server is running on port 5000")
// })

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes.js";
import productRoutes from "./routes/products.routes.js";
import orderRoutes from "./routes/order.routes.js";
// import paytmRoutes from "./routes/paytm.js"
import paymentRoutes from "./routes/payment.route.js"

dotenv.config();

const app = express();

/* ✅ MIDDLEWARE (ORDER IS IMPORTANT) */
app.use(cors());
app.use(express.json());

/* ✅ ROUTES */
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
// app.use("/api/payment", paytmRoutes);
app.use("/api/payment", paymentRoutes);


const PORT = process.env.PORT || 5000;

/* ✅ CONNECT DB THEN START SERVER */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
