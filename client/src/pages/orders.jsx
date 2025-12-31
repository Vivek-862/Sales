import { useEffect, useState } from "react";
import { useAuth } from "../providers/auth-provider";
import axiosInstance from "../lib/axios";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await axiosInstance.get("orders/my-orders"
        );
        console.log("API RESPONSE 👉", data);
        setOrders(data.orders || []);
      } catch (error) {
        console.error("Failed to fetch orders", error);
      }
    };

    fetchOrders();
  }, []);

  console.log(orders)

 return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Orders</h1>

      {orders.length === 0 && (
        <p className="text-gray-500">No orders found</p>
      )}

      {orders.map((order) => (
        // <div
        //   key={order._id}
        //   className="mt-4 rounded-lg border bg-white p-4 shadow"
        // >
        //   <p className="text-sm text-gray-500">
        //     Order ID: <span className="font-medium">{order._id}</span>
        //   </p>

        //   <p className="mt-1">
        //     <span className="font-semibold">Total:</span> ₹
        //     {order.totalAmount}
        //   </p>

        //   <p className="mt-1">
        //     <span className="font-semibold">Status:</span>{" "}
        //     <span
        //       className={`font-medium ${
        //         order.status === "Confirmed"
        //           ? "text-green-600"
        //           : order.status === "Cancelled"
        //           ? "text-red-600"
        //           : "text-orange-500"
        //       }`}
        //     >
        //       {order.status}
        //     </span>
        //   </p>

        //   <p className="mt-1 text-sm text-gray-500">
        //     Placed on: {new Date(order.createdAt).toLocaleDateString()}
        //   </p>
        // </div>
        <div
  key={order._id}
  className="mt-4 rounded-lg border bg-white p-4 shadow"
>
  <p className="text-sm text-gray-500">
    Order ID: <span className="font-medium">{order._id}</span>
  </p>

  <div className="mt-2">
            <p className="font-semibold">Items:</p>
            <ul className="list-disc ml-5 text-sm">
              {order.items.map((item) => (
                <li key={item._id}>
                  {item.name} - ₹{item.price} × {item.quantity}
                </li>
              ))}
            </ul>
          </div>

  <p className="mt-1">
    <span className="font-semibold">Total:</span> ₹{order.totalAmount}
  </p>

  <p className="mt-1">
    <span className="font-semibold">Status:</span>{" "}
    <span
      className={`font-medium ${
        order.status === "Pending"
          ? "text-orange-500"
          : order.status === "Accepted"
          ? "text-blue-600"
          : order.status === "Delivered"
          ? "text-green-600"
          : "text-red-600"
      }`}
    >
      {order.status}
    </span>
  </p>

  <p className="mt-1 text-sm text-gray-500">
    {order.status === "Pending" && "⏳ Waiting for confirmation"}
    {order.status === "Accepted" && "👨‍🍳 Order is being prepared"}
    {order.status === "Delivered" && "✅ Order delivered"}
    {order.status === "Cancelled" && "❌ Order cancelled"}
  </p>

  <p className="mt-1 text-sm text-gray-400">
    Placed on: {new Date(order.createdAt).toLocaleDateString()}
  </p>
</div>

      ))}
    </div>
  );
}


// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useAuth } from "../providers/auth-provider";

// export default function Orders() {
//   const [orders, setOrders] = useState([]);
//   const { user } = useAuth();

//   useEffect(() => {
//     axios.get("http://localhost:5000/api/orders/my-orders", {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("token")}`,
//       },
//     }).then(res => setOrders(res.data));
//   }, []);

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold">My Orders</h1>

//       {orders.length === 0 && (
//         <p className="text-gray-500 mt-4">No orders found</p>
//       )}

//       {orders.map(order => (
//         <div key={order._id} className="border p-4 rounded mt-3">
//           <p>Order ID: {order._id}</p>
//           <p>Total: ₹{order.total}</p>
//           <p>Status: {order.status}</p>
//         </div>
//       ))}
//     </div>
//   );
// }
