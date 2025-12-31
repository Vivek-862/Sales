import axiosInstance from "../lib/axios";

export const getOrders=()=> axiosInstance.get("/orders/admin/all")