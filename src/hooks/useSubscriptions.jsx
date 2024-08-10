import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useSubscriptions = () => {

    const [axiosSecure] = useAxiosSecure();
    
    const { data: subscriptions = [], isLoading: loading , refetch } = useQuery({
        queryKey: ['subscriptions'],
        queryFn: async () => {
            const res = await axiosSecure('/subscriptions')
            return res.data;
        }
    });

    return [subscriptions, loading, refetch];
};

export default useSubscriptions;