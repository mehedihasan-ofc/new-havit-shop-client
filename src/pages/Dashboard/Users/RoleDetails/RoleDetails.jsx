import { useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../../../provider/AuthProvider";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import MySpinner from "../../../../components/Shared/MySpinner/MySpinner";

const RoleDetails = () => {

    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const token = localStorage.getItem("access-token");
    const [axiosSecure] = useAxiosSecure();

    const { data: roleData = {}, isLoading } = useQuery({
        queryKey: ["roleData", user?.email, id],
        enabled: !!user?.email && !!token && !!id,
        queryFn: async () => {
            const res = await axiosSecure(`/roles/${id}`);
            const roleData = res.data;
            return roleData;
        }
    });

    console.log(roleData);

    if(isLoading) return <MySpinner />

    return (
        <div>
            {id}
        </div>
    );
};

export default RoleDetails;