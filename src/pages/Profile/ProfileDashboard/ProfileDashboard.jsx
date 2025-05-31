import { useContext, useState } from "react";
import { AuthContext } from "../../../provider/AuthProvider";
import { FaBox, FaAddressCard, FaLock, FaTruck, FaCoins } from "react-icons/fa";
import useOrders from "../../../hooks/useOrders";
import MySpinner from "../../../components/Shared/MySpinner/MySpinner";
import WelcomeModal from "../../../components/Modal/WelcomeModal/WelcomeModal";
import useWelcome from "../../../hooks/useWelcome";
import useMyData from "../../../hooks/useMyData";

const ProfileDashboard = () => {
    const { user } = useContext(AuthContext);

    const [myData] = useMyData();
    const [orders, isLoading] = useOrders("all");
    const [welcomeData] = useWelcome();

    const [open, setOpen] = useState(true);
    const handleOpen = () => setOpen(!open);

    if (isLoading) return <MySpinner />;

    const deliveredOrders = orders?.filter(order => order.deliveryStatus === "delivered") || [];
    const donationAmount = deliveredOrders.reduce((total, order) => total + (order.total * 0.03), 0);

    return (
        <>
            <div className="max-w-6xl mx-auto p-4 sm:p-6 shadow rounded border">
                <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-4 sm:mb-6">
                    Hello, <span className="text-blue-600">{user?.displayName || "Guest"}!</span>
                </h1>
                <p className="text-gray-600 mb-4 sm:mb-6">
                    Welcome to your dashboard! Here, you can easily manage your account and explore features:
                </p>

                {/* Coins & Donations */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mb-6">
                    <div className="p-4 bg-green-100 border border-green-300 rounded-lg shadow-sm flex flex-col gap-2">
                        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 flex items-center">
                            Coins Earned:
                            <span className="flex items-center text-green-700 ml-2">
                                <FaCoins size={18} className="mr-1" />
                                {myData?.coin}
                            </span>
                        </h2>
                        <p className="text-sm text-gray-700">
                            You earned these coins by completing delivered orders.
                        </p>
                        <p className="text-sm text-gray-700">
                            Earn more coins by placing orders—1 coin for every ৳100 spent on delivered orders!
                        </p>
                    </div>

                    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg shadow-sm">
                        <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
                            Donations: <span className="text-green-600">৳{donationAmount.toFixed(2)}</span>
                        </h2>
                        <p className="text-sm text-gray-600 mt-2">
                            You have contributed 3% of your delivered orders' total amount to help those in need.
                            Thank you for your generosity!
                        </p>
                    </div>
                </div>

                {/* Dashboard Features */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div className="flex items-start sm:items-center p-4 bg-blue-50 border border-blue-200 rounded-lg shadow-sm gap-4">
                        <FaBox className="text-blue-500 text-3xl" />
                        <div>
                            <h3 className="font-semibold text-gray-800">Recent Orders</h3>
                            <p className="text-sm text-gray-600">Check and view your recent purchases.</p>
                        </div>
                    </div>

                    <div className="flex items-start sm:items-center p-4 bg-green-50 border border-green-200 rounded-lg shadow-sm gap-4">
                        <FaAddressCard className="text-green-500 text-3xl" />
                        <div>
                            <h3 className="font-semibold text-gray-800">Manage Addresses</h3>
                            <p className="text-sm text-gray-600">Update your shipping and billing info.</p>
                        </div>
                    </div>

                    <div className="flex items-start sm:items-center p-4 bg-yellow-50 border border-yellow-200 rounded-lg shadow-sm gap-4">
                        <FaLock className="text-yellow-500 text-3xl" />
                        <div>
                            <h3 className="font-semibold text-gray-800">Account Security</h3>
                            <p className="text-sm text-gray-600">Change your password and secure your account.</p>
                        </div>
                    </div>

                    <div className="flex items-start sm:items-center p-4 bg-purple-50 border border-purple-200 rounded-lg shadow-sm gap-4">
                        <FaTruck className="text-purple-500 text-3xl" />
                        <div>
                            <h3 className="font-semibold text-gray-800">Order Tracking</h3>
                            <p className="text-sm text-gray-600">Track your orders in real-time.</p>
                        </div>
                    </div>
                </div>
            </div>

            <WelcomeModal open={open} handleOpen={handleOpen} welcomeData={welcomeData} />
        </>
    );
};

export default ProfileDashboard;