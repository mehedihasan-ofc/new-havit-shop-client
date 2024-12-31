import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import MySpinner from "../../../components/Shared/MySpinner/MySpinner";
import {
    BarChart,
    Bar,
    Tooltip,
    ResponsiveContainer,
    XAxis,
    YAxis,
    CartesianGrid,
    Legend,
} from "recharts";

import SVG1 from "../../../assets/svg/img-status-4.svg";
import SVG2 from "../../../assets/svg/img-status-5.svg";
import SVG3 from "../../../assets/svg/img-status-1.svg";
import SVG4 from "../../../assets/svg/img-status-7.svg";
import SVG5 from "../../../assets/svg/img-status-8.svg";
import SVG6 from "../../../assets/svg/img-status-9.svg";

const DashboardHome = () => {
    const [axiosSecure] = useAxiosSecure();

    const { data: dashboardStats = [], isLoading } = useQuery({
        queryKey: ['dashboardStats'],
        queryFn: async () => {
            const res = await axiosSecure('/dashboard-stats');
            return res.data;
        }
    });

    if (isLoading) return <MySpinner />;

    // SVGs array for random selection
    const svgs = [SVG1, SVG2, SVG3, SVG4, SVG5, SVG6];

    // Function to get a random SVG from the array
    const getRandomSVG = () => {
        return svgs[Math.floor(Math.random() * svgs.length)];
    };

    // Extract individual sections
    const customerStats = dashboardStats.find((stat) => stat.title === "Customer Overview")?.stats || {};
    const promoStats = dashboardStats.find((stat) => stat.title === "Promo Code Overview")?.stats || {};
    const productStats = dashboardStats.find((stat) => stat.title === "Product Overview")?.stats || {};
    const orderStats = dashboardStats.find((stat) => stat.title === "Order Overview")?.stats || {};
    const salesStats = dashboardStats.find((stat) => stat.title === "Sales Overview")?.stats || {};

    // BarChart data for customer stats
    const customerData = [
        { name: "Total Customers", value: customerStats.totalCustomers },
        { name: "Total Admin", value: customerStats.totalAdmin }
    ];

    // BarChart data for promo stats
    const promoData = [
        { name: "Total Promo Codes", value: promoStats.totalPromoCodes },
        { name: "Active Promo Codes", value: promoStats.activePromoCodes },
        { name: "Expired Promo Codes", value: promoStats.expiredPromoCodes }
    ];

    // BarChart data for product stats
    const productData = [
        { name: "Total Products", value: productStats.totalProducts },
        { name: "Low Stock Products", value: productStats.lowStockProducts },
        { name: "Out of Stock Products", value: productStats.outOfStockProducts }
    ];

    // BarChart data for order stats
    const orderData = [
        { name: "Total Orders", value: orderStats.totalOrders },
        { name: "Pending Orders", value: orderStats.pendingOrders },
        { name: "Confirmed Orders", value: orderStats.confirmedOrders },
        { name: "Packaging Orders", value: orderStats.packagingOrders },
        { name: "Out for Delivery", value: orderStats.outForDeliveryOrders },
        { name: "Delivered Orders", value: orderStats.deliveredOrders },
        { name: "Returned Orders", value: orderStats.returnedOrders },
        { name: "Failed to Deliver", value: orderStats.failedToDeliverOrders },
        { name: "Canceled Orders", value: orderStats.canceledOrders }
    ];

    // BarChart data for sales stats
    const salesData = [
        { name: "Total Sales With Shipping", value: salesStats.totalSalesWithShipping },
        { name: "Total Sales Without Shipping", value: salesStats.totalSalesWithoutShipping }
    ];

    return (
        <div className="space-y-5">
            <div className="rounded shadow border py-2">
                <h2 className="text-2xl font-extrabold text-center uppercase">
                    Dashboard Overview
                </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {dashboardStats.map((stat) => (
                    <div key={stat.title} className="rounded-lg shadow-md">
                        <div className="relative">
                            {/* Use random SVG for background */}
                            <img className="absolute top-0 right-0" src={getRandomSVG()} alt="background" />

                            <div className="space-y-3 p-5">
                                <h2 className="text-xl font-bold mb-4">{stat.title}</h2>
                                {Object.entries(stat.stats).map(([key, value]) => (
                                    <div key={key} className="flex justify-between items-center">
                                        <span className="capitalize">{key.replace(/([A-Z])/g, " $1")}</span>
                                        {/* Check if the key is 'sales' and add the ৳ symbol */}
                                        <span className="text-xl font-semibold">
                                            {stat.title.toLowerCase() === "sales overview" ? `৳${value}` : value}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Customer Overview */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Customer Overview</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={customerData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="value" fill="#3BB77E" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Promo Code Overview */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Promo Code Overview</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={promoData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="value" fill="#FF6361" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Product Overview */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Product Overview</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={productData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="value" fill="#FFA600" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Order Overview */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Order Overview</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={orderData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="value" fill="#665191" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* // In the Sales Overview section */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Sales Overview</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={salesData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis tickFormatter={(value) => `৳${value}`} />
                            <Tooltip formatter={(value) => `৳${value}`} />
                            <Legend />
                            <Bar dataKey="value" fill="#4B9B3E" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

            </div>
        </div>
    );
};

export default DashboardHome;
