// import axiosInstance from "../lib/axios";


// export const getProducts =()=> axiosInstance.get("products");
import axiosInstance from "../lib/axios";

export const getProducts = async () => {
  return await axiosInstance.get("/api/products");
};
