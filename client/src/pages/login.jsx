// import { Link } from "@tanstack/react-router";

// export default function Login() {
//   return (
//     <div className="min-h-screen flex items-center justify-center">
//       <div className="border p-6 rounded w-80">
//         <h1 className="text-xl font-bold mb-4">Login</h1>

//         <input
//           placeholder="Email"
//           className="border p-2 w-full mb-3"
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           className="border p-2 w-full mb-3"
//         />

//         <button className="w-full bg-orange-500 text-white py-2 rounded">
//           Login
//         </button>

//         <p className="text-sm mt-3">
//           No account? <Link to="/register" className="text-blue-500">Register</Link>
//         </p>
//       </div>
//     </div>
//   );
// }
import { useState } from "react";
import axios from "axios";
import { useAuth } from "../providers/auth-provider";
// import { useNavigate } from "@tanstack/react-router";
import toast from 'react-hot-toast'

import { Link, useNavigate } from "@tanstack/react-router";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
   try{
     const res = await axios.post("http://localhost:5000/api/auth/login", {
      email,
      password,
    });

    login(res.data);
    toast.success("Login successful 🎉");
    navigate({ to: "/" });
   }catch(err){
        toast.error(err.response?.data?.message || "Login failed");
   }
  };

  return (
    <div className="p-6 max-w-sm mx-auto">
      <h1 className="text-xl font-bold mb-4">Login</h1>

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
        onClick={handleLogin}
        className="w-full bg-orange-500 text-white py-2"
      >
        Login
      </button>
       <p className="text-sm text-center mt-4">
          New user?{" "}
          <Link
            to="/register"
            className="text-blue-600 font-medium hover:underline"
          >
            Register
          </Link>
        </p>
    </div>
  );
}
