import { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaRegClock, FaTruck, FaHome, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const ProfileTrackOrder = () => {
    const [axiosSecure] = useAxiosSecure();
    const [orderId, setOrderId] = useState("");
    const [trackingData, setTrackingData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleTrackOrder = async () => {
        if (!orderId) {
            setError("Please enter a valid Order ID.");
            return;
        }

        setError("");
        setLoading(true);
        try {
            const response = await axiosSecure(`/orders/order-id/${orderId}`);
            setTrackingData(response.data);
        } catch (err) {
            setError("Failed to fetch order details. Please try again.");
            setTrackingData(null);
        } finally {
            setLoading(false);
        }
    };

    // Determine the current step based on delivery status
    const getDeliveryStep = (status) => {
        switch (status.toLowerCase()) {
            case "pending": return 1;
            case "processing": return 2;
            case "shipped": return 3;
            case "delivered": return 4;
            case "cancelled": return 5;
            default: return 0;
        }
    };

    // Function to get color for icon based on delivery status
    const getStatusColor = (step, currentStep) => {
        // If the step is less than or equal to the current step, color it
        return step <= currentStep ? "text-blue-500" : "text-gray-500";
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-200 p-8">
            <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-2xl p-6">
                <h1 className="text-3xl font-extrabold text-gray-800 text-center mb-6">
                    Track Your Order
                </h1>

                {/* Order ID Input */}
                <div className="flex items-center justify-center mb-8">
                    <input
                        type="text"
                        placeholder="Enter Order ID"
                        value={orderId}
                        onChange={(e) => setOrderId(e.target.value)}
                        className="w-2/3 md:w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        onClick={handleTrackOrder}
                        className="ml-4 px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-200"
                    >
                        Track
                    </button>
                </div>

                {/* Loading Spinner */}
                {loading && (
                    <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
                    </div>
                )}

                {/* Error Message */}
                {error && (
                    <div className="text-center text-red-500 font-medium">
                        {error}
                    </div>
                )}

                {/* Summary and Progress */}
                {trackingData && !loading && (
                    <div className="bg-gray-50 p-6 shadow-md rounded-lg mt-8">
                        <h2 className="text-xl font-semibold text-gray-700 mb-4">Order Summary</h2>
                        <p><strong>Order ID:</strong> {trackingData.orderId}</p>
                        <p><strong>Order Date:</strong> {new Date(trackingData.orderDate).toLocaleDateString()}</p>
                        <p><strong>Payment Status:</strong> {trackingData.paymentStatus}</p>
                        <p><strong>Total Amount:</strong> ৳{trackingData.payableTotal}</p>

                        {/* Progress Bar with Icons */}
                        <div className="mt-6">
                            <div className="relative pt-1">
                                <div className="flex mb-2 items-center justify-between">
                                    <span className={`text-sm font-semibold flex items-center ${getStatusColor(1, getDeliveryStep(trackingData.deliveryStatus))}`}><FaRegClock className="h-5 w-5 mr-2" />Pending</span>
                                    <span className={`text-sm font-semibold flex items-center ${getStatusColor(2, getDeliveryStep(trackingData.deliveryStatus))}`}><FaTruck className="h-5 w-5 mr-2" />Processing</span>
                                    <span className={`text-sm font-semibold flex items-center ${getStatusColor(3, getDeliveryStep(trackingData.deliveryStatus))}`}><FaHome className="h-5 w-5 mr-2" />Shipped</span>
                                    <span className={`text-sm font-semibold flex items-center ${getStatusColor(4, getDeliveryStep(trackingData.deliveryStatus))}`}><FaCheckCircle className="h-5 w-5 mr-2" />Delivered</span>
                                    <span className={`text-sm font-semibold flex items-center ${getStatusColor(5, getDeliveryStep(trackingData.deliveryStatus))}`}><FaTimesCircle className="h-5 w-5 mr-2" />Cancelled</span>
                                </div>
                                <div className="flex mb-2">
                                    {[1, 2, 3, 4, 5].map((step) => (
                                        <div
                                            key={step}
                                            className={`flex-1 h-1 rounded-full ${step <= getDeliveryStep(trackingData.deliveryStatus) ? "bg-blue-500" : "bg-gray-300"}`}
                                        ></div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProfileTrackOrder;
