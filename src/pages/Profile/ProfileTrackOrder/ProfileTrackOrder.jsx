import { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaRegClock, FaCheck, FaBoxOpen, FaTruckMoving, FaHome, FaUndo, FaTimesCircle } from "react-icons/fa";
import { Button } from "@material-tailwind/react";
import { AiOutlineSearch } from "react-icons/ai";
import Swal from "sweetalert2";

const ProfileTrackOrder = () => {
    const [axiosSecure] = useAxiosSecure();
    const [orderId, setOrderId] = useState("");
    const [trackingData, setTrackingData] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleTrackOrder = async () => {
        if (!orderId) {
            Swal.fire({
                icon: 'warning',
                title: 'Missing Order ID',
                text: 'Please enter a valid Order ID.',
            });
            setTrackingData(null);
            return;
        }

        setLoading(true);
        try {
            const response = await axiosSecure(`/orders/order-id/${orderId}`);
            setTrackingData(response.data);

        } catch (err) {
            setTrackingData(null);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to fetch order details. Please try again.',
            });
        } finally {
            setLoading(false);
        }
    };

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
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800 text-center font-serif mb-6">
                Track Your Order
            </h2>

            <div className="w-full max-w-xl mx-auto mb-5">
                <div className="border border-gray-200 shadow rounded p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-center gap-4">

                    {/* Input Field */}
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Enter Order ID"
                            value={orderId}
                            onChange={(e) => setOrderId(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary placeholder-gray-400 text-sm sm:text-base transition"
                        />
                        <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                            <AiOutlineSearch className="w-5 h-5" />
                        </span>
                    </div>

                    {/* Track Button */}
                    <Button
                        onClick={handleTrackOrder}
                        disabled={loading}
                        className="w-full sm:w-auto px-6 py-3 text-white font-semibold bg-primary hover:bg-primary-dark rounded shadow transition font-serif"
                    >
                        {loading ? "Tracking..." : "Track Order"}
                    </Button>
                </div>
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

            {/* Summary and Progress */}
            {trackingData && !loading && (
                <div className="p-6 shadow-md rounded-lg border mt-8">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">Order Summary</h2>
                    <p><strong>Order ID:</strong>#{trackingData.orderId}</p>
                    <p><strong>Order Date:</strong> {new Date(trackingData.orderDate).toLocaleDateString()}</p>
                    <p className="capitalize"><strong>Payment Status:</strong> {trackingData.paymentStatus}</p>
                    <p><strong>Total Amount:</strong> ৳{trackingData.payableTotal}</p>

                    {/* Progress Bar with Icons on Top and Status Below */}
                    <div className="mt-8">
                        <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-6 sm:gap-0 relative">

                            {[1, 2, 3, 4, 5, 6, 7, 8].map((step, index) => (
                                <div
                                    key={step}
                                    className="flex flex-col items-center relative sm:flex-1"
                                >
                                    {/* Step Icon */}
                                    <div
                                        className={`h-10 w-10 flex items-center justify-center rounded-full z-10 
            ${step <= getDeliveryStep(trackingData.deliveryStatus)
                                                ? "bg-primary text-white"
                                                : "bg-gray-300 text-gray-500"
                                            }`}
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

                                    {/* Step Label */}
                                    <span
                                        className={`mt-2 text-xs font-medium text-center ${step <= getDeliveryStep(trackingData.deliveryStatus)
                                            ? "text-primary"
                                            : "text-gray-500"
                                            }`}
                                    >
                                        {step === 1 && "Pending"}
                                        {step === 2 && "Confirmed"}
                                        {step === 3 && "Packaging"}
                                        {step === 4 && "Out For Delivery"}
                                        {step === 5 && "Delivered"}
                                        {step === 6 && "Returned"}
                                        {step === 7 && "Failed"}
                                        {step === 8 && "Canceled"}
                                    </span>

                                    {/* Connector Line */}
                                    {index < 7 && (
                                        <>
                                            {/* Vertical Line for mobile */}
                                            <div
                                                className={`absolute top-full left-1/2 transform -translate-x-1/2 h-10 w-1 sm:hidden 
                ${step < getDeliveryStep(trackingData.deliveryStatus)
                                                        ? "bg-primary"
                                                        : "bg-gray-300"
                                                    }`}
                                            ></div>

                                            {/* Horizontal Line for desktop */}
                                            <div
                                                className={`hidden sm:block absolute top-5 left-full transform -translate-x-1/2 h-1 w-full 
                ${step < getDeliveryStep(trackingData.deliveryStatus)
                                                        ? "bg-primary"
                                                        : "bg-gray-300"
                                                    }`}
                                            ></div>
                                        </>
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