import { useState } from "react";

/* ORDER HOOKS */
import {
  useOrders,
  useAcceptOrder,
  useDeliverOrder,
  useDeleteOrder,
} from "../hooks/useOrders";

/* PRODUCT HOOKS */
import {
  useProducts,
  useAddProduct,
  useUpdateProduct,
  useDeleteProduct,
} from "../hooks/useProducts";

/* COMPONENTS */
import ProductForm from "../components/ProductForm.jsx";

export default function AdminPanel() {
  /* =====================
     ORDERS
  ===================== */
  const {
    data: orderData,
    isLoading: ordersLoading,
    error: ordersError,
  } = useOrders();

  const acceptOrder = useAcceptOrder();
  const deliverOrder = useDeliverOrder();
  const deleteOrder = useDeleteOrder();

  const orders = orderData?.orders || [];

  /* =====================
     PRODUCTS
  ===================== */
  const { data: products = [] } = useProducts();
  const addProduct = useAddProduct();
  const updateProduct = useUpdateProduct();
  const deleteProduct = useDeleteProduct();

  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  if (ordersLoading) return <p className="p-6">Loading...</p>;
  if (ordersError) return <p className="p-6">Error loading admin data</p>;

  return (
    <div className="p-6 space-y-10">
      <h1 className="text-3xl font-bold">Admin Panel</h1>

      {/* =====================
          PRODUCTS SECTION
      ===================== */}
      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">🍽 Products</h2>
          <button
            onClick={() => {
              setEditingProduct(null);
              setShowForm(true);
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            ➕ Add Product
          </button>
        </div>

        {products.length === 0 ? (
          <p>No products found</p>
        ) : (
          products.map((product) => (
            <div
              key={product._id}
              className="border p-4 rounded flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">{product.name}</p>
                <p className="text-sm text-gray-600">
                  ₹{product.price} • {product.category}
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setEditingProduct(product);
                    setShowForm(true);
                  }}
                  className="px-3 py-1 bg-yellow-500 text-white rounded"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteProduct.mutate(product._id)}
                  className="px-3 py-1 bg-red-600 text-white rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </section>

      {/* =====================
          ORDERS SECTION
      ===================== */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">📦 Orders</h2>

        {orders.length === 0 ? (
          <p>No orders found</p>
        ) : (
          orders.map((order) => (
            <div
              key={order._id}
              className="border p-4 rounded space-y-2"
            >
              <p>
                <b>User:</b> {order.userId?.email}
              </p>
              <p>
                <b>Total:</b> ₹{order.totalAmount}
              </p>
              <p>
                <b>Status:</b>{" "}
                <span
                  className={`font-semibold ${
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

              {/* ORDER ACTIONS */}
              <div className="flex gap-3">
                {order.status === "Pending" && (
                  <button
                    onClick={() => acceptOrder.mutate(order._id)}
                    className="px-3 py-1 bg-blue-500 text-white rounded"
                  >
                    Accept
                  </button>
                )}

                {order.status === "Accepted" && (
                  <button
                    onClick={() => deliverOrder.mutate(order._id)}
                    className="px-3 py-1 bg-green-600 text-white rounded"
                  >
                    Deliver
                  </button>
                )}

                <button
                  onClick={() => deleteOrder.mutate(order._id)}
                  className="px-3 py-1 bg-red-600 text-white rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </section>

      {/* =====================
          PRODUCT FORM MODAL
      ===================== */}
      {showForm && (
        <ProductForm
          initialData={editingProduct}
          onClose={() => setShowForm(false)}
          onSubmit={(data) => {
            if (editingProduct) {
              updateProduct.mutate({
                id: editingProduct._id,
                data,
              });
            } else {
              addProduct.mutate(data);
            }
            setShowForm(false);
          }}
        />
      )}
    </div>
  );
}
