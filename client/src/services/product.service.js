import axiosInstance from "../lib/axios";


export const getProducts =()=> axiosInstance.get("products");