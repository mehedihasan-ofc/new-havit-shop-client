import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useOrders = (status) => {
    const { user } = useContext(AuthContext);
    const token = localStorage.getItem('access-token');
    const [axiosSecure] = useAxiosSecure();

    const { data: orders = [], isLoading } = useQuery({
        queryKey: ["orders", user?.email, status],
        enabled: !!user?.email && !!token,
        queryFn: async () => {
            const res = await axiosSecure(`/orders/user/${user?.email}?status=${status}`);
            return res.data;
        },
    });

    return [orders, isLoading];
};

export default useOrders;