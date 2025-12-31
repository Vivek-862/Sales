const ProductCard = ({ product, cart, addToCart, removeFromCart }) => {
  const cartItem = cart.find(
    (item) => item.id === product.id
  );

  const quantity = cartItem ? cartItem.quantity : 0;

  return (
    <div className="rounded-xl border bg-white p-4 shadow">
      <h2 className="font-semibold">{product.name}</h2>
      <p className="font-bold">₹{product.price}</p>

      {quantity === 0 ? (
        <button
          onClick={() => addToCart(product)}
          className="mt-3 w-full rounded bg-orange-500 py-2 text-white"
        >
          Add to Cart
        </button>
      ) : (
        <div className="mt-3 flex items-center justify-between rounded border px-3 py-2">
          <button
            onClick={() => removeFromCart(product.id)}
            className="text-xl font-bold text-orange-600"
          >
            −
          </button>

          <span className="font-semibold">{quantity}</span>

          <button
            onClick={() => addToCart(product)}
            className="text-xl font-bold text-orange-600"
          >
            +
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
