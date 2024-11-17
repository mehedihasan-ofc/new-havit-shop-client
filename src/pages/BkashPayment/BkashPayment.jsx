import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";

const BkashPayment = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // Access the order details from state
    const orderDetails = location.state?.orderDetails;

    useEffect(() => {
        if (!orderDetails) {
            toast.error("No order details found! Redirecting to checkout...");
            navigate("/checkout");
        }
    }, [orderDetails, navigate]);

    const handleConfirmPayment = () => {
        // Simulate payment confirmation logic
        toast.success("Payment successful! Thank you for your order.");
        navigate("/order-success", { state: { orderId: "12345", ...orderDetails } });
    };

    const handleCancelPayment = () => {
        toast.warn("Payment cancelled. Returning to home...");
        // navigate("/checkout");
        navigate("/");
    };

    if (!orderDetails) return null;

    return (
        <div className="max-w-3xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4">Bkash Payment</h2>
            <div className="bg-gray-100 p-4 rounded-lg shadow-md space-y-3">
                <h3 className="text-lg font-semibold">Order Summary</h3>
                <p><span className="font-semibold">Name:</span> {orderDetails.billingDetails.name}</p>
                <p><span className="font-semibold">Total Payable:</span> ৳{orderDetails.payableTotal.toFixed(2)}</p>
                <p><span className="font-semibold">Payment Method:</span> Bkash Online Payment</p>
            </div>

            <div className="mt-6 space-y-3">
                <p className="text-gray-700">To complete your payment, please proceed with the following steps:</p>
                <ul className="list-decimal ml-6 text-gray-600 space-y-2">
                    <li>Open your Bkash app and go to *Send Money*.</li>
                    <li>Send ৳{orderDetails.payableTotal.toFixed(2)} to **017XXXXXXXX**.</li>
                    <li>Take a screenshot of your transaction receipt.</li>
                    <li>Click *Confirm Payment* below and upload your receipt.</li>
                </ul>
            </div>

            <div className="mt-6 flex space-x-4">
                <button
                    onClick={handleConfirmPayment}
                    className="bg-primary text-white px-4 py-2 rounded-lg font-semibold"
                >
                    Confirm Payment
                </button>
                <button
                    onClick={handleCancelPayment}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold"
                >
                    Cancel Payment
                </button>
            </div>
        </div>
    );
};

export default BkashPayment;