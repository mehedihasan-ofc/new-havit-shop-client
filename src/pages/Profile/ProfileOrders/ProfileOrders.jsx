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
            case "confirmed":
                return "text-blue-600";
            case "packaging":
                return "text-purple-600";
            case "out-for-delivery":
                return "text-pink-600";
            case "delivered":
                return "text-teal-600";
            case "returned":
                return "text-red-600";
            case "failed-to-deliver":
                return "text-red-600";
            case "canceled":
                return "text-red-600";
            default:
                return "text-gray-500";
        }
    };

    const handleCopyOrderId = (orderId) => {
        navigator.clipboard.writeText(orderId);
        setCopiedOrderId(orderId);
        setTimeout(() => setCopiedOrderId(""), 2000);
    };

    if (isLoading) return <MySpinner />;

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">
                Your Orders
            </h2>
            {orders.length === 0 ? (
                <p className="text-gray-600 text-center">
                    You have no orders yet.
                </p>
            ) : (
                <div className="space-y-4">
                    {orders.map((order) => (
                        <div
                            key={order._id}
                            className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-gray-50 border border-gray-200 p-4 rounded-lg shadow-sm"
                        >
                            <div className="flex-1">
                                <p className="font-medium text-gray-800">
                                    Order ID: #{order.orderId}
                                    <button
                                        onClick={() => handleCopyOrderId(order.orderId)}
                                        className="ml-2 text-primary font-semibold hover:underline focus:outline-none"
                                    >
                                        {copiedOrderId === order.orderId ? (
                                            <GiCheckMark className="inline" />
                                        ) : (
                                            <LuCopy className="inline" />
                                        )}
                                    </button>
                                </p>
                                <p className="text-gray-600">
                                    Date: {formattedDate(order.orderDate)}
                                </p>
                                <p
                                    className={`capitalize font-semibold ${getStatusColor(
                                        order.deliveryStatus
                                    )}`}
                                >
                                    Status: {order.deliveryStatus}
                                </p>
                                <p className="text-gray-800">
                                    Total: ৳{order.payableTotal} for {order.products.length} item
                                    {order.products.length > 1 ? "s" : ""}
                                </p>
                            </div>
                            <button
                                onClick={() => navigate(`order-details/${order._id}`)}
                                className="mt-4 sm:mt-0 text-green-600 font-medium hover:underline"
                            >
                                View Details
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProfileOrders;