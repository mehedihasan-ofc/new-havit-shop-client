import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useAdminAuth = () => {
    const { user } = useContext(AuthContext);
    const [axiosSecure] = useAxiosSecure();

    const { data: adminData, isLoading } = useQuery({
        queryKey: ['adminData', user?.email],
        enabled: !!user?.email && !!localStorage.getItem('access-token'),
        queryFn: async () => {
            const res = await axiosSecure.get(`/admin/${user?.email}`)
            return res.data;
        }
    })

    return [user, adminData, isLoading];
};

export default useAdminAuth;