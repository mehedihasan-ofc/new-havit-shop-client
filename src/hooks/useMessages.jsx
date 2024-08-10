import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useMessages = () => {
    
    const [axiosSecure] = useAxiosSecure();

    const { data: messages = [], isLoading: loading , refetch } = useQuery({
        queryKey: ['messages'],
        queryFn: async () => {
            const res = await axiosSecure('/messages')
            return res.data;
        }
    });

    return [messages, loading, refetch];
    
};

export default useMessages;