import { useState } from "react";
import { formattedDate } from "../../../utils";
import { useNavigate } from "react-router-dom";
import { GiCheckMark } from "react-icons/gi";
import { LuCopy } from "react-icons/lu";
import MySpinner from "../../../components/Shared/MySpinner/MySpinner";
import useOrders from "../../../hooks/useOrders";
import { Button, Tab, Tabs, TabsHeader } from "@material-tailwind/react";

const TABS = [
    {
        label: "All",
        value: "all",
    },
    {
        label: "Pending",
        value: "pending",
    },
    {
        label: "Confirmed",
        value: "confirmed",
    },
    {
        label: "Packaging",
        value: "packaging",
    },
    {
        label: "Delivered",
        value: "delivered",
    }
];

const ProfileOrders = () => {

    const [activeTab, setActiveTab] = useState("all");

    const [orders, isLoading] = useOrders(activeTab);
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
        <div className="max-w-4xl mx-auto p-6 shadow rounded border">
            <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">
                My Orders
            </h2>

            {orders.length === 0 ? (
                <p className="text-gray-600 text-center">
                    You have no orders yet.
                </p>
            ) : (
                <div className="space-y-4">

                    <Tabs value={activeTab}>
                        <TabsHeader
                            // className="rounded-none bg-secondary"
                            className="rounded-none bg-secondary"
                            indicatorProps={{
                                className:
                                    "shadow rounded-none",
                            }}
                        >
                            {TABS.map(({ label, value }) => (
                                <Tab
                                    key={value}
                                    value={value}
                                    onClick={() => setActiveTab(value)}
                                    // className="text-sm"
                                    className={`text-xs md:text-base font-medium ${activeTab === value && "text-primary"}`}
                                >
                                    {label}
                                </Tab>
                            ))}
                        </TabsHeader>
                    </Tabs>

                    {orders.map((order) => (
                        <div
                            key={order._id}
                            className="flex items-center justify-between border p-4 rounded shadow"
                        >
                            <div className="flex-1">
                                <p className="font-medium text-primary text-sm md:text-base">
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
                                <p className="text-gray-600 text-sm md:text-base">
                                    Order: {formattedDate(order.orderDate)}
                                </p>
                                <p className="text-gray-800 text-sm md:text-base">
                                    Total: ৳{order.payableTotal} for {order.products.length} item
                                    {order.products.length > 1 ? "s" : ""}
                                </p>
                            </div>

                            <div className="space-y-3">
                                <p
                                    className={`capitalize text-center italic text-sm font-semibold ${getStatusColor(
                                        order.deliveryStatus
                                    )}`}
                                >
                                    {order.deliveryStatus}
                                </p>

                                <Button size="sm" onClick={() => navigate(`order-details/${order._id}`)} className='rounded-none font-normal bg-primary py-1 px-2'>
                                    View Details
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProfileOrders;