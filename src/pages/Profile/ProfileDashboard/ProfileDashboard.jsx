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

    if (isLoading) return <MySpinner />

    // Calculate donation amount for delivered orders
    const deliveredOrders = orders?.filter(order => order.deliveryStatus === "delivered") || [];
    const donationAmount = deliveredOrders.reduce((total, order) => total + (order.total * 0.03), 0);

    console.log(myData);

    return (
        <>
            <div className="max-w-4xl mx-auto p-6 shadow rounded border">
                <h1 className="text-3xl font-semibold text-gray-800 mb-6">
                    Hello, <span className="text-blue-600">{user?.displayName || "Guest"}!</span>
                </h1>
                <p className="text-gray-600 mb-6">
                    Welcome to your dashboard! Here, you can easily manage your account and explore features:
                </p>

                <div className="grid grid-cols-2 gap-5">
                    <div className="p-4 bg-green-100 border border-green-300 rounded-lg shadow-sm mb-6 flex items-center">
                        <div>
                            <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                                Coins Earned:
                                <span className="flex items-center text-green-700 ml-2">
                                    <FaCoins size={18} className="mr-2" />
                                    {myData?.coin}
                                </span>
                            </h2>
                            <p className="text-sm text-gray-700 mt-2">
                                You earned these coins by completing delivered orders.
                            </p>
                            <p className="text-sm text-gray-700">
                                Earn more coins by placing orders—1 coin for every ৳100 spent on delivered orders!
                            </p>
                        </div>
                    </div>

                    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg shadow-sm mb-6">
                        <h2 className="text-xl font-semibold text-gray-800">
                            Donations: <span className="text-green-600">৳{donationAmount.toFixed(2)}</span>
                        </h2>
                        <p className="text-sm text-gray-600 mt-2">
                            You have contributed 3% of your delivered orders' total amount to help those in need. Thank you for your generosity!
                        </p>
                    </div>
                </div>

                {/* Dashboard Features */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-center p-4 bg-blue-50 border border-blue-200 rounded-lg shadow-sm">
                        <FaBox className="text-blue-500 text-3xl mr-4" />
                        <div>
                            <h3 className="font-semibold text-gray-800">Recent Orders</h3>
                            <p className="text-sm text-gray-600">Check and view your recent purchases.</p>
                        </div>
                    </div>
                    <div className="flex items-center p-4 bg-green-50 border border-green-200 rounded-lg shadow-sm">
                        <FaAddressCard className="text-green-500 text-3xl mr-4" />
                        <div>
                            <h3 className="font-semibold text-gray-800">Manage Addresses</h3>
                            <p className="text-sm text-gray-600">Update your shipping and billing info.</p>
                        </div>
                    </div>
                    <div className="flex items-center p-4 bg-yellow-50 border border-yellow-200 rounded-lg shadow-sm">
                        <FaLock className="text-yellow-500 text-3xl mr-4" />
                        <div>
                            <h3 className="font-semibold text-gray-800">Account Security</h3>
                            <p className="text-sm text-gray-600">Change your password and secure your account.</p>
                        </div>
                    </div>
                    <div className="flex items-center p-4 bg-purple-50 border border-purple-200 rounded-lg shadow-sm">
                        <FaTruck className="text-purple-500 text-3xl mr-4" />
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