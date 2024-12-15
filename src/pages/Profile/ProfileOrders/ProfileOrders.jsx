import { useState } from "react";
import MySpinner from "../../../components/Shared/MySpinner/MySpinner";
import useOrders from "../../../hooks/useOrders";
import { Tab, Tabs, TabsHeader } from "@material-tailwind/react";
import OrderProductCard from "../../../components/Card/OrderProductCard/OrderProductCard";

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

    const getEmptyMessage = () => {
        switch (activeTab) {
            case "pending":
                return "You have no pending orders.";
            case "confirmed":
                return "No confirmed orders yet.";
            case "packaging":
                return "No orders are currently being packaged.";
            case "delivered":
                return "No delivered orders yet.";
            default:
                return "You have no orders yet.";
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 shadow rounded border space-y-4">

            <h2 className="text-2xl font-semibold text-gray-800 text-center">
                My Orders
            </h2>

            <Tabs value={activeTab}>
                <TabsHeader
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

            {isLoading ? <MySpinner /> : orders.length === 0 ? (
                <p className="text-red-600 text-center">
                    {getEmptyMessage()}
                </p>
            ) : (
                <div className="space-y-4">
                    {orders.map((order) => <OrderProductCard key={order?._id} order={order} />)}
                </div>
            )}
        </div>
    );
};

export default ProfileOrders;