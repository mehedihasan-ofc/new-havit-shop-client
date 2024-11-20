import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import bkashPayment from "../../assets/payment/bkashPayment.jpg";
import { Button } from "@material-tailwind/react";

const BkashPayment = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [transactionId, setTransactionId] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    // Access the order details from state
    const orderDetails = location.state?.orderDetails;
    const billingDetails = location.state?.billingDetails;

    useEffect(() => {
        if (!orderDetails) {
            toast.error("No order details found! Redirecting to checkout...");
            navigate("/checkout");
        }
    }, [orderDetails, navigate]);

    // Validate phone number: must start with 01 and be 11 digits long
    const validatePhoneNumber = (number) => {
        return /^01\d{9}$/.test(number); // Matches 01XXXXXXXXX format
    };

    const handleConfirmPayment = () => {
        if (!validatePhoneNumber(phoneNumber)) {
            toast.error("Please enter a valid phone number (e.g., 01XXXXXXXXX).");
            return;
        }

        if (transactionId.length !== 10) {
            toast.error("Transaction ID must be 10 characters long.");
            return;
        }

        // Simulate payment confirmation logic
        toast.success("Payment confirmed! Thank you for your order.");
        navigate("/order-success", { state: { orderId: "12345", ...orderDetails, transactionId, phoneNumber } });
    };

    const handleCancelPayment = () => {
        toast.warn("Payment cancelled. Returning to home...");
        navigate("/");
    };

    if (!orderDetails) return null;

    return (
        <div className="max-w-3xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4">Bkash Payment</h2>
            <div className="bg-gray-100 p-4 rounded-lg shadow-md space-y-3">
                <h3 className="text-lg font-semibold">Order Summary</h3>
                <p><span className="font-semibold">Name:</span> {billingDetails?.name}</p>
                <p><span className="font-semibold">Total Payable:</span> ৳{orderDetails.payableTotal.toFixed(2)}</p>
                <p><span className="font-semibold">Payment Method:</span> Bkash Online Payment</p>
            </div>

            <div className="mt-6 space-y-3">
                <p className="text-gray-700">To complete your payment, please follow the steps below:</p>
                <ul className="list-decimal ml-6 text-gray-600 space-y-2">
                    <li>Open your Bkash app and go to *Payment*.</li>
                    <li>Scan the QR code provided below.</li>
                    <li>Send the amount of ৳{orderDetails.payableTotal.toFixed(2)}.</li>
                    <li>Enter your phone number and transaction ID below to confirm your payment.</li>
                </ul>
            </div>

            <div className="my-6 text-center">
                <img
                    src={bkashPayment}
                    alt="Bkash QR Code"
                    className="w-full h-full mx-auto"
                />
            </div>

            <div className="mt-6 space-y-4">
                <input
                    type="text"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="Enter Phone Number (e.g., 01XXXXXXXXX)"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                />
                <input
                    type="text"
                    value={transactionId}
                    onChange={(e) => setTransactionId(e.target.value)}
                    maxLength={10}
                    placeholder="Enter Transaction ID"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                />
                <div className="flex space-x-4">
                    <Button
                        onClick={handleConfirmPayment}
                        disabled={
                            transactionId.length !== 10 || !validatePhoneNumber(phoneNumber)
                        }
                        className='rounded-none bg-primary font-medium'
                    >
                        Confirm Payment
                    </Button>


                    <Button
                        onClick={handleCancelPayment}
                        className="bg-red-500 rounded-none font-medium"
                    >
                        Cancel Payment
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default BkashPayment;