import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";

const useMyData = () => {
    const { user } = useContext(AuthContext);
    const token = localStorage.getItem('access-token');
    const [axiosSecure] = useAxiosSecure();

    const { data: myData = {}, isLoading, refetch } = useQuery({
        queryKey: ['myData', user?.email],
        enabled: !!user?.email && !!token,
        queryFn: async () => {
            const res = await axiosSecure(`/users/my-data/${user?.email}`)
            return res.data;
        }
    });

    return [myData, isLoading, refetch];
};

export default useMyData;