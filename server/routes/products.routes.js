import express from "express";
import Product from "../models/Products.js";
import { verifyToken } from "../middleware/auth.js";
import { authorizeRoles } from "../middleware/authorize.js";

const router = express.Router();

/* =======================
   CUSTOMER + OWNER
======================= */

/* GET all products */
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch {
    res.status(500).json({ message: "Failed to fetch products" });
  }
});

/* GET product by ID */
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ message: "Product not found" });

    res.json(product);
  } catch {
    res.status(500).json({ message: "Error fetching product" });
  }
});

/* =======================
   OWNER ONLY
======================= */

/* ADD product */
router.post(
  "/",
  verifyToken,
  authorizeRoles("owner"),
  async (req, res) => {
    try {
      const product = await Product.create(req.body);
      res.status(201).json(product);
    } catch {
      res.status(400).json({ message: "Failed to add product" });
    }
  }
);

/* UPDATE product */
router.put(
  "/:id",
  verifyToken,
  authorizeRoles("owner"),
  async (req, res) => {
    try {
      const updated = await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

      if (!updated)
        return res.status(404).json({ message: "Product not found" });

      res.json(updated);
    } catch {
      res.status(400).json({ message: "Failed to update product" });
    }
  }
);

/* DELETE product */
router.delete(
  "/:id",
  verifyToken,
  authorizeRoles("owner"),
  async (req, res) => {
    try {
      const deleted = await Product.findByIdAndDelete(req.params.id);

      if (!deleted)
        return res.status(404).json({ message: "Product not found" });

      res.json({ message: "Product deleted successfully" });
    } catch {
      res.status(500).json({ message: "Failed to delete product" });
    }
  }
);

export default router;
