// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import { router } from "./routes/router";
import { CartProvider } from "../src/providers/cart-provider";
import { AuthProvider } from "./providers/auth-provider";
import "./index.css";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
     <QueryClientProvider client={queryClient}>
     <AuthProvider>
      <CartProvider>
      <RouterProvider router={router} />
       <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
          }}
        />
    </CartProvider>
    </AuthProvider>
    </QueryClientProvider>
    
  </React.StrictMode>
);
