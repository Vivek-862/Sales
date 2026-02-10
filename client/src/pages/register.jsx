// export default function Register() {
//   return (
//     <div className="min-h-screen flex items-center justify-center">
//       <div className="border p-6 rounded w-80">
//         <h1 className="text-xl font-bold mb-4">Register</h1>

//         <input placeholder="Name" className="border p-2 w-full mb-3" />
//         <input placeholder="Email" className="border p-2 w-full mb-3" />
//         <input
//           type="password"
//           placeholder="Password"
//           className="border p-2 w-full mb-3"
//         />

//         <button className="w-full bg-green-600 text-white py-2 rounded">
//           Create Account
//         </button>
//       </div>
//     </div>
//   );
// }
import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "@tanstack/react-router";
import axiosInstance from "../lib/axios";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await axiosInstance.post("api/auth/register", {
        name,
        email,
        password,
      });

      navigate({ to: "/login" }); // after signup → login
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="border p-6 rounded w-80">
        <h1 className="text-xl font-bold mb-4">Register</h1>

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <input
          placeholder="Name"
          className="border p-2 w-full mb-3"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Email"
          className="border p-2 w-full mb-3"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full mb-3"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleRegister}
          className="w-full bg-green-600 text-white py-2 rounded"
        >
          Sign Up
        </button>
        <p className="text-sm text-center mt-4">
                  Already have account ?{" "}
                  <Link
                    to="/login"
                    className="text-blue-600 font-medium hover:underline"
                  >
                    Login
                  </Link>
      </p>
      </div>
    </div>
  );
}
