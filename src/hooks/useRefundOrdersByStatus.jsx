import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useRefundOrdersByStatus = (status) => {
    const { user } = useContext(AuthContext);
    const token = localStorage.getItem('access-token');
    const [axiosSecure] = useAxiosSecure();

    const { data: refundOrders = [], isLoading, refetch } = useQuery({
        queryKey: ['refundOrders', user?.email, status],
        enabled: !!user?.email && !!token,
        queryFn: async () => {
            const res = await axiosSecure(`/orders/refund/${status}`);
            return res.data;
        },
    });

    return [refundOrders, isLoading, refetch];
};

export default useRefundOrdersByStatus;