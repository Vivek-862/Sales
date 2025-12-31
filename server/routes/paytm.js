// import express from "express";
// import PaytmChecksum from "paytmchecksum";
// import dotenv from "dotenv";
// dotenv.config();

// const router = express.Router();
// const MID = process.env.PAYTM_MID;
// const KEY = process.env.PAYTM_KEY;

// router.post("/paytm/initiate", async (req, res) => {
//   const { amount, orderId, userId } = req.body;

//   const paytmParams = {
//     MID,
//     ORDER_ID: orderId,
//     CUST_ID: userId,
//     TXN_AMOUNT: amount.toString(),
//     CHANNEL_ID: "WEB",
//     WEBSITE: "DEFAULT",
//     INDUSTRY_TYPE_ID: "Retail",
//     CALLBACK_URL: "https://your-domain.com/paytm/callback",
//   };

//   const checksum = await PaytmChecksum.generateSignature(paytmParams, KEY);

//   res.send({ ...paytmParams, CHECKSUMHASH: checksum });
// });

// export default router;
// server/routes/payment.js (example)
import express from "express";
import PaytmChecksum from "paytmchecksum";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

router.post("/paytm/initiate", async (req, res) => {
  try {
    const { amount, orderId, userId } = req.body;

    const paytmParams = {
      MID: process.env.PAYTM_MID,
      ORDER_ID: orderId,
      CUST_ID: userId,
      TXN_AMOUNT: amount.toString(),
      CHANNEL_ID: "WEB",
      WEBSITE: process.env.PAYTM_WEBSITE,
      INDUSTRY_TYPE_ID: process.env.PAYTM_INDUSTRY,
      CALLBACK_URL: "http://localhost:5000/api/payment/paytm/callback",
    };

    const checksum = await PaytmChecksum.generateSignature(
      paytmParams,
      process.env.PAYTM_KEY
    );

    paytmParams.CHECKSUMHASH = checksum;
    return res.json(paytmParams);
  } catch (err) {
    console.error("Paytm Initiate Error:", err);
    res.status(500).json({ message: "Payment initiation failed", error: err });
  }
});

export default router;
