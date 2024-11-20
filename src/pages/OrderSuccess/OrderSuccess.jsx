import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const OrderSuccess = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const orderId = location.state?.orderId;

    useEffect(() => {
        if (!orderId) {
            toast.error("No order details found!", { autoClose: 1000 });
            navigate("/");
        }
    }, [orderId, navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6 py-12">
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-md text-center">
                <div className="mb-6">
                    <svg
                        className="w-16 h-16 text-green-500 mx-auto"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Order Placed Successfully!</h2>
                <p className="text-gray-600 mb-4">
                    Thank you for your order. Your order has been placed successfully. 
                </p>
                <div className="bg-gray-100 p-4 rounded-md text-sm text-gray-700 mb-6">
                    <span className="font-semibold">Order ID:</span> {orderId}
                </div>
                <button
                    onClick={() => navigate("/")}
                    className="w-full bg-primary text-white py-2 rounded-lg font-semibold shadow-md hover:bg-primary-dark transition duration-300"
                >
                    Back to Home
                </button>
            </div>
        </div>
    );
};

export default OrderSuccess;