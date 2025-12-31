// import { useCart } from "../app/providers/cart-provider";

// export default function Checkout() {
//   const { cart } = useCart();

//   const total = cart.reduce((sum, i) => sum + i.price, 0);

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold">Checkout</h1>
//       <p>Total: ₹{total}</p>

//       <button className="mt-4 bg-green-600 text-white px-6 py-3 rounded">
//         Pay Now
//       </button>
//     </div>
//   );
// }
import { useCart } from "../providers/cart-provider";

export default function Checkout() {
  const { cart } = useCart();
  const total = cart.reduce((sum, i) => sum + i.price, 0);

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>

      <input
        placeholder="Delivery Address"
        className="border p-2 w-full mb-3"
      />

      <p className="font-semibold mb-3">Total Amount: ₹{total}</p>

      <button className="w-full bg-blue-600 text-white py-3 rounded">
        Pay Now
      </button>
    </div>
  );
}
