import { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaRegClock, FaCheck, FaBoxOpen, FaTruckMoving, FaHome, FaUndo, FaTimesCircle } from "react-icons/fa";
import { Button } from "@material-tailwind/react";

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
            case "confirmed": return 2;
            case "packaging": return 3;
            case "out-for-delivery": return 4;
            case "delivered": return 5;
            case "returned": return 6;
            case "failed-to-deliver": return 7;
            case "canceled": return 8;
            default: return 0;
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 shadow rounded border">
            <h1 className="text-2xl font-semibold text-gray-800 text-center mb-6">
                Track Your Order
            </h1>

            {/* Order ID Input */}
            <div className="flex items-center justify-center mb-8">
                <input
                    type="text"
                    placeholder="Enter Order ID"
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                    className="w-2/4 px-3 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                />
                <Button onClick={handleTrackOrder} disabled={loading} className='rounded-none bg-primary font-medium px-10 ml-4'>
                    {loading ? 'Tracking...' : 'Track'}
                </Button>
            </div>

            {/* Loading Spinner */}
            {loading && (
                <div className="flex items-center justify-center bg-secondary-light">
                    <div className="relative flex items-center justify-center h-20 w-20">
                        {/* Outer Gradient Circle */}
                        <div
                            className="absolute inset-0 animate-spin rounded-full border-4 border-transparent"
                            style={{
                                borderTopColor: '#30a444',
                                borderLeftColor: '#DEF9EC',
                                animationDuration: '1.5s',
                            }}
                        ></div>
                        {/* Inner Glow Effect */}
                        <div
                            className="absolute inset-1 rounded-full bg-gradient-to-br from-primary to-secondary opacity-20 blur-xl"
                        ></div>
                        {/* Center Icon */}
                        <div className="z-10 text-primary font-extrabold text-2xl tracking-wider">
                            H
                        </div>
                    </div>
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
                <div className="p-6 shadow-md rounded-lg border mt-8">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">Order Summary</h2>
                    <p><strong>Order ID:</strong>#{trackingData.orderId}</p>
                    <p><strong>Order Date:</strong> {new Date(trackingData.orderDate).toLocaleDateString()}</p>
                    <p className="capitalize"><strong>Payment Status:</strong> {trackingData.paymentStatus}</p>
                    <p><strong>Total Amount:</strong> ৳{trackingData.payableTotal}</p>

                    {/* Progress Bar with Icons on Top and Status Below */}
                    <div className="mt-6">
                        <div className="relative flex justify-between items-center">

                            {/* Step Container */}
                            {[1, 2, 3, 4, 5, 6, 7, 8].map((step, index) => (
                                <div key={step} className="flex-1 flex flex-col items-center text-center relative">

                                    {/* Top Icon */}
                                    <div
                                        className={`h-10 w-10 flex items-center justify-center rounded-full ${step <= getDeliveryStep(trackingData.deliveryStatus) ? "bg-primary text-white" : "bg-gray-300 text-gray-500"
                                            }`} style={{ zIndex: 1 }}
                                    >
                                        {step === 1 && <FaRegClock />}
                                        {step === 2 && <FaCheck />}
                                        {step === 3 && <FaBoxOpen />}
                                        {step === 4 && <FaTruckMoving />}
                                        {step === 5 && <FaHome />}
                                        {step === 6 && <FaUndo />}
                                        {step === 7 && <FaTimesCircle />}
                                        {step === 8 && <FaTimesCircle />}
                                    </div>

                                    {/* Bottom Status Text */}
                                    <span
                                        className={`mt-2 text-xs font-medium ${step <= getDeliveryStep(trackingData.deliveryStatus) ? "text-primary" : "text-gray-500"
                                            }`}
                                    >
                                        {step === 1 && "Pending"}
                                        {step === 2 && "Confirmed"}
                                        {step === 3 && "Packaging"}
                                        {step === 4 && "Out For Delivery"}
                                        {step === 5 && "Delivered"}
                                        {step === 6 && "Returned"}
                                        {step === 7 && "Failed To Deliver"}
                                        {step === 8 && "Canceled"}
                                    </span>

                                    {/* Horizontal Progress Line */}
                                    {index < 7 && (
                                        <div
                                            className={`absolute top-5 left-full transform -translate-x-1/2 h-1 w-full ${step < getDeliveryStep(trackingData.deliveryStatus) ? "bg-primary" : "bg-gray-300"
                                                }`} style={{ zIndex: 0 }}
                                        ></div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfileTrackOrder;