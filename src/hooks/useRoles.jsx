import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useRoles = () => {
    const [axiosSecure] = useAxiosSecure();

    const { data: rolesData = [], isLoading , refetch } = useQuery({
        queryKey: ['rolesData'],
        queryFn: async () => {
            const res = await axiosSecure('/roles')
            return res.data;
        }
    });

    return [rolesData, isLoading, refetch];
};

export default useRoles;