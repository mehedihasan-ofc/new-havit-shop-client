import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import bkashPayment from "../../assets/payment/bkashPayment.jpg";
import { Button } from "@material-tailwind/react";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const BkashPayment = () => {
    const [axiosSecure] = useAxiosSecure();

    const location = useLocation();
    const navigate = useNavigate();

    const [transactionId, setTransactionId] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [loading, setLoading] = useState(false);

    const orderDetails = location.state?.orderDetails;
    const billingDetails = location.state?.billingDetails;

    useEffect(() => {
        if (!orderDetails) {
            toast.error("No order details found!");
            navigate("/");
        }
    }, [orderDetails, navigate]);

    const validatePhoneNumber = (number) => {
        return /^01\d{9}$/.test(number);
    };

    const handleConfirmPayment = async () => {
        if (!validatePhoneNumber(phoneNumber)) {
            toast.error("Please enter a valid phone number (e.g., 01XXXXXXXXX).");
            return;
        }

        if (transactionId.length !== 10) {
            toast.error("Transaction ID must be 10 characters long.");
            return;
        }

        setLoading(true);

        try {
            const orderData = {
                ...orderDetails,
                paymentNumber: phoneNumber,
                transactionId,
            };

            const { data } = await axiosSecure.post("/orders", orderData);

            if (data?.result?.insertedId) {
                toast.success("Order placed successfully!");
                navigate("/order-success", { state: { orderId: data?.orderId } });
            } else {
                throw new Error("Failed to place order.");
            }
        } catch (error) {
            toast.error(error.message || "Something went wrong!");
        } finally {
            setLoading(false);
        }
    };

    const handleCancelPayment = () => {
        toast.warn("Payment cancelled. Returning to home...");
        navigate("/");
    };

    const redirectToBkashPayment = () => {
        window.open("https://shop.bkash.com/havit-shop01744991003/paymentlink", "_blank");
    };

    if (!orderDetails) return;

    return (
        <div className="max-w-3xl mx-auto p-6">
            <h2 className="text-3xl font-bold mb-6 text-center text-primary">Bkash Payment</h2>
            <div className="bg-gray-100 p-6 rounded-lg shadow-lg space-y-4">
                <h3 className="text-lg font-semibold">Order Summary</h3>
                <p><span className="font-semibold">Name:</span> {billingDetails?.name}</p>
                <p><span className="font-semibold">Total Payable:</span> ৳{orderDetails.payableTotal.toFixed(2)}</p>
                <p><span className="font-semibold">Payment Method:</span> Bkash Online Payment</p>
            </div>

            <div className="mt-6 space-y-4">
                <p className="text-gray-700">To complete your payment, please follow the steps below:</p>
                <ul className="list-decimal ml-6 text-gray-600 space-y-2">
                    <li>Open your Bkash app and go to <strong>Payment</strong>.</li>
                    <li>Scan the QR code provided below.</li>
                    <li>Send the amount of ৳{orderDetails.payableTotal.toFixed(2)}.</li>
                    <li>Enter your phone number and transaction ID below to confirm your payment.</li>
                </ul>
            </div>

            <div className="my-6 text-center">
                <img
                    src={bkashPayment}
                    alt="Bkash QR Code"
                    className="w-full h-auto mx-auto rounded-md shadow-md border"
                />
            </div>

            <div className="mt-6 text-center space-y-2">
                <p className="text-gray-600">
                    If you prefer to make a direct payment through Bkash, click the button below. <br /> You will be redirected to the official Bkash payment link.
                </p>
                <Button
                    onClick={redirectToBkashPayment}
                    className="w-full py-3 px-6 bg-[#E2136E] text-white font-bold rounded shadow-md hover:bg-[#D12053]"
                >
                    Pay Now with Bkash
                </Button>
            </div>


            <div className="mt-6 space-y-4">
                <input
                    type="text"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="Enter Phone Number (e.g., 01XXXXXXXXX)"
                    className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                    disabled={loading}
                />
                <input
                    type="text"
                    value={transactionId}
                    onChange={(e) => setTransactionId(e.target.value)}
                    maxLength={10}
                    placeholder="Enter Transaction ID"
                    className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                    disabled={loading}
                />
                <div className="flex flex-col md:flex-row gap-4">
                    <Button
                        onClick={handleConfirmPayment}
                        disabled={
                            loading ||
                            transactionId.length !== 10 ||
                            !validatePhoneNumber(phoneNumber)
                        }
                        className={`w-full md:w-auto py-3 px-6 font-medium text-white rounded-lg shadow-md ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-primary"}`}
                    >
                        {loading ? "Processing..." : "Confirm Payment"}
                    </Button>
                    <Button
                        onClick={handleCancelPayment}
                        className="w-full md:w-auto py-3 px-6 bg-red-500 text-white font-medium rounded-lg shadow-md hover:bg-red-600"
                        disabled={loading}
                    >
                        Cancel Payment
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default BkashPayment;