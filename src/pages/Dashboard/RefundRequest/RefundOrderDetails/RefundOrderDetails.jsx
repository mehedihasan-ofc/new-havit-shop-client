import { useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../../../provider/AuthProvider";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import MySpinner from "../../../../components/Shared/MySpinner/MySpinner";

const RefundOrderDetails = () => {

    const { id } = useParams();

    const { user } = useContext(AuthContext);
    const token = localStorage.getItem("access-token");
    const [axiosSecure] = useAxiosSecure();

    const { data: refundOrder = {}, isLoading } = useQuery({
        queryKey: ["refundOrder", user?.email, id],
        enabled: !!user?.email && !!token && !!id,
        queryFn: async () => {
            const res = await axiosSecure(`/order/refund/${id}`);
            const orderData = res.data;
            // setDeliveryStatus(orderData.deliveryStatus);
            // setPaymentStatus(orderData.paymentStatus);
            return orderData;
        },
    });

    if (isLoading) return <MySpinner />;

    console.log(refundOrder);

    return (
        <div>

        </div>
    );
};

export default RefundOrderDetails;