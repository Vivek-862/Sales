// import { useState } from "react";
// import axiosInstance from "../lib/axios";
// import { useCart } from "../providers/cart-provider";

// export default function Cart() {
//   const { cart, clearCart } = useCart();
//   const [paymentMethod, setPaymentMethod] = useState("COD"); // ⬅ default COD

//      const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

//     const payUsingPaytm = async () => {
//     const orderId = "ORDER_" + Date.now();

//     const res = await axiosInstance.post("/payment/paytm/initiate", {
//       amount: totalAmount,
//       orderId,
//       userId: "USER_ID_HERE" // Replace from auth context or localStorage
//     });

//     window.location.href =
//       `https://securegw.paytm.in/order/process?${new URLSearchParams(res.data).toString()}`;
//   };

//   // const placeOrder = async () => {
//   //   if (cart.length === 0) {
//   //     alert("Cart is empty");
//   //     return;
//   //   }

//   //   const payload = {
//   //     items: cart.map((item) => ({
//   //       productId: item._id,
//   //       name: item.name,
//   //       price: item.price,
//   //       quantity: item.quantity,
//   //     })),
//   //     totalAmount: cart.reduce(
//   //       (sum, item) => sum + item.price * item.quantity,
//   //       0
//   //     ),
//   //     paymentMethod, // ⬅ dynamic method
//   //   };

//   //   try {
//   //     // If user selects UPI or Online
//   //     if (paymentMethod !== "COD") {
//   //       alert(`Redirect to ${paymentMethod} payment gateway (to be integrated)`);
//   //       // Here you will later add Razorpay/UPI integration
//   //     }

//   //     await axiosInstance.post("/orders", payload, {
//   //       headers: {
//   //         Authorization: `Bearer ${localStorage.getItem("token")}`,
//   //       },
//   //     });

//   //     alert("Order placed successfully ✅");
//   //     clearCart();
//   //   } catch (error) {
//   //     console.error("Order failed", error.response?.data || error);
//   //     alert("Failed to place order");
//   //   }
//   // };

//     const placeOrder = async () => {
//     if (cart.length === 0) return alert("Cart is empty");

//     const payload = {
//       items: cart.map((item) => ({
//         productId: item._id,
//         name: item.name,
//         price: item.price,
//         quantity: item.quantity,
//       })),
//       totalAmount,
//       paymentMethod,
//     };

//     try {
//       // 🟢 If UPI selected → redirect to Paytm payment instead of placing order directly
//       if (paymentMethod === "UPI") {
//         await payUsingPaytm();
//         return;
//       }

//       // COD or Online Normal Order API
//       await axiosInstance.post("/orders", payload, {
//         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//       });

//       alert("Order placed successfully ✅");
//       clearCart();
//     } catch (error) {
//       console.error(error);
//       alert("Failed to place order ❌");
//     }
//   };
 
//   return (
//     <div className="p-6 max-w-3xl mx-auto">
//       <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

//       {cart.length === 0 && <p className="text-gray-500">Your cart is empty</p>}

//       {cart.map((item) => (
//         <div
//           key={item._id}
//           className="flex justify-between items-center border-b py-3"
//         >
//           <div>
//             <p className="font-semibold">{item.name}</p>
//             <p className="text-sm text-gray-500">
//               ₹{item.price} × {item.quantity}
//             </p>
//           </div>

//           <p className="font-bold">₹{item.price * item.quantity}</p>
//         </div>
//       ))}

//       {/* 🔥 Payment Method Selection */}
//       {cart.length > 0 && (
//         <div className="mt-6 space-y-2">
//           <h2 className="text-lg font-semibold">Select Payment Method</h2>

//           <label className="flex items-center gap-2 cursor-pointer">
//             <input
//               type="radio"
//               value="COD"
//               checked={paymentMethod === "COD"}
//               onChange={() => setPaymentMethod("COD")}
//             />
//             Cash on Delivery (COD)
//           </label>

//           <label className="flex items-center gap-2 cursor-pointer">
//             <input
//               type="radio"
//               value="UPI"
//               checked={paymentMethod === "UPI"}
//               onChange={() => setPaymentMethod("UPI")}
//             />
//             UPI Payment (GPay / PhonePe / Paytm)
//           </label>

//           <label className="flex items-center gap-2 cursor-pointer">
//             <input
//               type="radio"
//               value="ONLINE"
//               checked={paymentMethod === "ONLINE"}
//               onChange={() => setPaymentMethod("ONLINE")}
//             />
//             Online Payment (Card/Wallet/NetBanking)
//           </label>

//           <button
//             onClick={placeOrder}
//             className="mt-4 w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
//           >
//             Place Order
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }
import { useState } from "react";
import axiosInstance from "../lib/axios";
import { useCart } from "../providers/cart-provider";

export default function Cart() {
  const { cart, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [paymentStatus, setPaymentStatus] = useState(null);

  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // ---------------- LOAD RAZORPAY SCRIPT ----------------
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // ---------------- PAYTM PAYMENT ----------------
  const payUsingPaytm = async () => {
    const orderId = "ORDER_" + Date.now();

    const res = await axiosInstance.post("/payment/paytm/initiate", {
      amount: totalAmount,
      orderId,
      userId: "USER_ID_HERE", // Replace from auth context or localStorage
    });

    window.location.href = `https://securegw.paytm.in/order/process?${new URLSearchParams(
      res.data
    ).toString()}`;
  };

  // ---------------- RAZORPAY PAYMENT ----------------
  const payUsingRazorpay = async () => {
    const res = await loadRazorpayScript();
    if (!res) return alert("Razorpay SDK failed to load ❌");

    // Create order from backend
    const order = await axiosInstance.post("/payment/razorpay/create-order", {
      amount: totalAmount, // Razorpay works in paise
    });

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY, // Razorpay Key ID from .env
      amount: order.data.amount,
      currency: "INR",
      name: "Your Store Name",
      description: "Order Payment",
      order_id: order.data.id, // from backend response
      handler: async function (response) {
        try {
          // verify payment
          await axiosInstance.post("/payment/razorpay/verify", response);

          setPaymentStatus("success");
          clearCart();
          alert("Payment Successful 🎉");
        } catch (err) {
          setPaymentStatus("failed");
          alert("Payment verification failed ❌");
        }
      },
      prefill: {
        name: "Customer Name",
        email: "customer@example.com",
        contact: "9999999999",
      },
      theme: { color: "#0f9d58" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  // ---------------- PLACE ORDER ----------------
  const placeOrder = async () => {
    if (cart.length === 0) return alert("Cart is empty");

    if (paymentMethod === "UPI") return payUsingPaytm();
    if (paymentMethod === "ONLINE") return payUsingRazorpay();

    // COD
    const payload = {
      items: cart.map((item) => ({
        productId: item._id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
      totalAmount,
      paymentMethod,
    };

    await axiosInstance.post("/orders", payload, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });

    setPaymentStatus("success");
    clearCart();
    alert("Order placed successfully (COD) ✔");
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

      {cart.length === 0 && <p>Your cart is empty</p>}

      {cart.map((item) => (
        <div key={item._id} className="flex justify-between py-3 border-b">
          <p>
            {item.name} (₹{item.price} × {item.quantity})
          </p>
          <p className="font-bold">₹{item.price * item.quantity}</p>
        </div>
      ))}

      {cart.length > 0 && (
        <div className="mt-5">
          <h3 className="mb-2 font-semibold">Select Payment Method:</h3>

          <label>
            <input
              type="radio"
              value="COD"
              checked={paymentMethod === "COD"}
              onChange={() => setPaymentMethod("COD")}
            />{" "}
            Cash on Delivery (COD)
          </label>
          <br />
          <label>
            <input
              type="radio"
              value="UPI"
              checked={paymentMethod === "UPI"}
              onChange={() => setPaymentMethod("UPI")}
            />{" "}
            UPI (Paytm/GPay/PhonePe)
          </label>
          <br />
          <label>
            <input
              type="radio"
              value="ONLINE"
              checked={paymentMethod === "ONLINE"}
              onChange={() => setPaymentMethod("ONLINE")}
            />{" "}
            Online (Razorpay)
          </label>
          <br />

          <button
            onClick={placeOrder}
            className="mt-4 w-full bg-green-600 text-white p-3 rounded"
          >
            Pay ₹{totalAmount}
          </button>

          {/* Payment status */}
          {paymentStatus === "success" && (
            <p className="text-green-600 font-bold mt-3">
              Payment Successful ✔ Your order has been placed.
            </p>
          )}
          {paymentStatus === "failed" && (
            <p className="text-red-600 font-bold mt-3">
              Payment Failed ❌ Try again.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
