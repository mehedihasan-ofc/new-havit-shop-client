import { useContext } from "react";
import { AuthContext } from "../../../provider/AuthProvider";
import { FaBox, FaAddressCard, FaLock, FaTruck } from "react-icons/fa";

const ProfileDashboard = () => {
    const { user } = useContext(AuthContext);

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <h1 className="text-3xl font-semibold text-gray-800 mb-6">
                Hello, <span className="text-blue-600">{user?.displayName || "Guest"}!</span>
            </h1>
            <p className="text-gray-600 mb-6">
                Welcome to your dashboard! Here, you can easily manage your account and explore features:
            </p>
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
    );
};

export default ProfileDashboard;
