import { useContext, useState } from "react";
import { AuthContext } from "../../../provider/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { formattedDate } from "../../../utils";
import { useNavigate } from "react-router-dom";
import { GiCheckMark } from "react-icons/gi";
import { LuCopy } from "react-icons/lu";

const ProfileOrders = () => {
    const { user } = useContext(AuthContext);
    const token = localStorage.getItem("access-token");
    const [axiosSecure] = useAxiosSecure();

    const [copiedOrderId, setCopiedOrderId] = useState(false);
    const navigate = useNavigate();

    const { data: orders = [], isLoading } = useQuery({
        queryKey: ["orders", user?.email],
        enabled: !!user?.email && !!token,
        queryFn: async () => {
            const res = await axiosSecure(`/orders/user/${user?.email}`);
            return res.data;
        },
    });

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case "pending":
                return "text-amber-600";
            case "processing":
                return "text-blue-600";
            case "shipped":
                return "text-indigo-600";
            case "delivered":
                return "text-green-600";
            case "cancelled":
                return "text-red-600";
            default:
                return "text-gray-600";
        }
    };

    const handleCopyOrderId = (orderId) => {
        navigator.clipboard.writeText(orderId);
        setCopiedOrderId(orderId);
        setTimeout(() => setCopiedOrderId(""), 2000);
    };

    if (isLoading) {
        return (
            <div className="text-center text-gray-500 py-6">
                Loading orders...
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto p-6">
            <h1 className="text-2xl font-semibold text-gray-800 mb-6">
                Your Orders
            </h1>
            {orders.length === 0 ? (
                <p className="text-gray-600 text-center">
                    You have no orders yet.
                </p>
            ) : (
                <div className="overflow-x-auto text-sm">
                    <table className="min-w-full border border-gray-200 rounded-lg">
                        <thead className="bg-primary text-white">
                            <tr>
                                <th className="px-6 py-3 text-left font-medium uppercase">
                                    Order
                                </th>
                                <th className="px-6 py-3 text-left font-medium uppercase">
                                    Date
                                </th>
                                <th className="px-6 py-3 text-left font-medium uppercase">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-left font-medium uppercase">
                                    Total
                                </th>
                                <th className="px-6 py-3 text-left font-medium uppercase">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr
                                    key={order._id}
                                    className="border-b"
                                >
                                    <td className="px-6 py-4 font-medium text-gray-800 flex items-center gap-2">
                                        #{order.orderId}
                                        <button
                                            onClick={() => handleCopyOrderId(order.orderId)} // Pass the order ID here
                                            className="flex items-center gap-1 text-primary font-semibold hover:underline focus:outline-none"
                                        >
                                            {copiedOrderId === order.orderId ? (
                                                <>
                                                    <GiCheckMark />
                                                </>
                                            ) : (
                                                <>
                                                    <LuCopy />
                                                </>
                                            )}
                                        </button>

                                    </td>
                                    <td className="px-6 py-4 text-gray-600">
                                        {formattedDate(order.orderDate)}
                                    </td>
                                    <td
                                        className={`px-6 py-4 capitalize font-semibold ${getStatusColor(
                                            order.deliveryStatus
                                        )}`}
                                    >
                                        {order.deliveryStatus}
                                    </td>
                                    <td className="px-6 py-4 text-gray-800">
                                        ৳{order.payableTotal} for{" "}
                                        {order.products.length} item
                                        {order.products.length > 1 ? "s" : ""}
                                    </td>
                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() => navigate(`order-details/${order._id}`)}
                                            className="text-green-600 font-medium hover:underline"
                                        >
                                            View
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ProfileOrders;