import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
// import { getOrders } from "../services/order.service";
import axiosInstance from "../lib/axios";

export const useOrders=()=>{
    return useQuery({
            queryKey:["admin-orders"],
            queryFn:() => axiosInstance.get("/api/orders/admin/all"),
        })
}

export const useAcceptOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (orderId) =>
      axiosInstance.put(`/api/orders/${orderId}/accept`),

    onSuccess: () => {
      queryClient.invalidateQueries(["admin-orders"]);
    },
  });
};

export const useDeliverOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (orderId) =>
      axiosInstance.put(`/api/orders/${orderId}/deliver`),

    onSuccess: () => {
      queryClient.invalidateQueries(["admin-orders"]);
    },
  });
};

export const useDeleteOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (orderId) =>
      axiosInstance.delete(`/api/orders/${orderId}`),

    onSuccess: () => {
      queryClient.invalidateQueries(["admin-orders"]);
    },
  });
};