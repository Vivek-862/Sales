import { Link } from "@tanstack/react-router";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-4xl font-bold mb-4 text-orange-600">
        Welcome to FoodApp 🍔
      </h1>
      <p className="text-gray-600 mb-6">
        Order your favorite food anytime, anywhere
      </p>

      <Link
        to="/products"
        className="bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold"
      >
        Explore Menu
      </Link>
    </div>
  );
}
