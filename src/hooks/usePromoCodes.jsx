import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const usePromoCodes = () => {
    const { user } = useContext(AuthContext);
    const token = localStorage.getItem('access-token');
    const [axiosSecure] = useAxiosSecure();

    const { data: promoCodes = [], isLoading, refetch } = useQuery({
        queryKey: ['promoCodes'],
        enabled: !!user?.email && !!token,
        queryFn: async () => {
            const res = await axiosSecure(`/promo-codes`)
            return res.data;
        }
    });

    return [promoCodes, isLoading, refetch];
};

export default usePromoCodes;