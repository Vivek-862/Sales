import ProductCard from "../components/product/ProductCard";
import { useCart } from "../providers/cart-provider";
import { useProducts } from "../hooks/useProducts";

export default function Products() {
  const { cart, addToCart, removeFromCart } = useCart();
  const { data, isLoading, error } = useProducts();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching products</p>;

  return (
    <div className="p-6">
      <h1 className="mb-4 text-2xl font-bold">Menu</h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {data.map((p) => {
          const product = {
            ...p,
            id: p._id, // ✅ VERY IMPORTANT
          };

          return (
            <ProductCard
              key={product.id}
              product={product}
              cart={cart}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
            />
          );
        })}
      </div>
    </div>
  );
}
