import { Outlet } from "@tanstack/react-router";
import Navbar from "./components/layout/Navbar";

export default function App() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
