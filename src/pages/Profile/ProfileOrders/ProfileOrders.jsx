import { useState } from "react";
import { formattedDate } from "../../../utils";
import { useNavigate } from "react-router-dom";
import { GiCheckMark } from "react-icons/gi";
import { LuCopy } from "react-icons/lu";
import MySpinner from "../../../components/Shared/MySpinner/MySpinner";
import useOrders from "../../../hooks/useOrders";

const ProfileOrders = () => {
    
    const [orders, isLoading] = useOrders();
    
    const [copiedOrderId, setCopiedOrderId] = useState(false);
    const navigate = useNavigate();

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

    if (isLoading) return <MySpinner />

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <h1 className="text-2xl font-semibold text-gray-800 text-center mb-4">
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