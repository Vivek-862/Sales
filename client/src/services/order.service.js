import axiosInstance from "../lib/axios";

export const getOrders=()=> axiosInstance.get("/api/orders/admin/all")