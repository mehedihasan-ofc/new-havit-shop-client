import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useOrdersByStatus = (status) => {

    const { user } = useContext(AuthContext);
    const token = localStorage.getItem('access-token');
    const [axiosSecure] = useAxiosSecure();

    const { data: orders = [], isLoading, refetch } = useQuery({
        queryKey: ['orders', user?.email, status],
        enabled: !!user?.email && !!token,
        queryFn: async () => {
            const res = await axiosSecure(`http://localhost:5000/orders/${status}`);
            return res.data;
        },
    });

    return [orders, isLoading, refetch];
};

export default useOrdersByStatus;