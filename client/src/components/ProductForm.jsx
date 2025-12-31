import { useState, useEffect } from "react";

export default function ProductForm({ onSubmit, initialData, onClose }) {
  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    details: "",
    veg: true,
    offer: "",
  });

  useEffect(() => {
    if (initialData) setForm(initialData);
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const submit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <form
        onSubmit={submit}
        className="bg-white p-6 rounded w-full max-w-md space-y-3"
      >
        <h2 className="font-bold text-lg">
          {initialData ? "Update Product" : "Add Product"}
        </h2>

        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="input" />
        <input name="price" value={form.price} onChange={handleChange} placeholder="Price" type="number" className="input" />
        <input name="category" value={form.category} onChange={handleChange} placeholder="Category" className="input" />
        <input name="offer" value={form.offer} onChange={handleChange} placeholder="Offer" className="input" />
        <textarea name="details" value={form.details} onChange={handleChange} placeholder="Details" className="input" />

        <label className="flex gap-2 items-center">
          <input type="checkbox" name="veg" checked={form.veg} onChange={handleChange} />
          Veg
        </label>

        <div className="flex gap-3">
          <button className="bg-green-600 text-white px-4 py-2 rounded">
            Save
          </button>
          <button type="button" onClick={onClose} className="px-4 py-2 border rounded">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
