import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { getProducts } from "../services/product.service";
import axiosInstance from "../lib/axios";

export const useProducts =()=>{
    return useQuery({
        queryKey:["products"],
        queryFn:getProducts,
    })
}

/* ADD PRODUCT */
export const useAddProduct = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (data) => axiosInstance.post("/api/products", data),
    onSuccess: () => qc.invalidateQueries(["products"]),
  });
};

/* UPDATE PRODUCT */
export const useUpdateProduct = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) =>
      axiosInstance.put(`/api/products/${id}`, data),
    onSuccess: () => qc.invalidateQueries(["products"]),
  });
};

/* DELETE PRODUCT */
export const useDeleteProduct = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (id) => axiosInstance.delete(`/api/products/${id}`),
    onSuccess: () => qc.invalidateQueries(["products"]),
  });
};