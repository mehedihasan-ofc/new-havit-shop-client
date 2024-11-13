import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useBillingDetails = () => {
    const { user } = useContext(AuthContext);
    const token = localStorage.getItem('access-token');
    const [axiosSecure] = useAxiosSecure();

    const { data: billingDetails = null, isLoading, refetch } = useQuery({
        queryKey: ['billingDetails', user?.email],
        enabled: !!user?.email && !!token,
        queryFn: async () => {
            const res = await axiosSecure(`/billing-details?email=${user.email}`);
            return res.data;
        }
    });

    return [billingDetails, isLoading, refetch];
};

export default useBillingDetails;