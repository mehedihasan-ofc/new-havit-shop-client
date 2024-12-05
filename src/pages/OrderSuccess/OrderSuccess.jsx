import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { GiCheckMark } from "react-icons/gi";
import { LuCopy } from "react-icons/lu";
import ReactPlayer from "react-player";
import useAboutUs from "../../hooks/useAboutUs";

const OrderSuccess = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [copied, setCopied] = useState(false); // State to track copy status
    const orderId = location.state?.orderId;
    const [aboutUsData] = useAboutUs(); // Fetch About Us data

    useEffect(() => {
        if (!orderId) {
            navigate("/");
        }
    }, [orderId, navigate]);

    const handleCopyOrderId = () => {
        navigator.clipboard.writeText(orderId).then(() => {
            setCopied(true); // Set copied to true
            setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
        });
    };

    return (
        <div className="my-5">
            <div className="flex flex-col items-center justify-center space-y-4 px-5 md:px-0">

                <div className="bg-white shadow-md rounded-lg p-8 max-w-4xl text-center border">
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
                    <div className="bg-gray-100 p-4 rounded-md text-sm text-gray-700 mb-6 flex items-center justify-between">
                        <span>
                            <span className="font-semibold">Order ID:</span> #{orderId}
                        </span>
                        <button
                            onClick={handleCopyOrderId}
                            className="flex items-center gap-1 text-primary font-semibold hover:underline focus:outline-none"
                        >
                            {copied ? (
                                <>
                                    <GiCheckMark />
                                    Copied!
                                </>
                            ) : (
                                <>
                                    <LuCopy />
                                    Copy
                                </>
                            )}
                        </button>
                    </div>
                    <button
                        onClick={() => navigate("/")}
                        className="w-full bg-primary text-white py-2 rounded-lg font-semibold shadow-md hover:bg-primary-dark transition duration-300"
                    >
                        Back to Home
                    </button>
                </div>

                {/* About Us Video Section */}
                {aboutUsData?.aboutUs && (
                    <div className="bg-white shadow-md rounded-lg max-w-4xl w-full">
                        <div className="rounded-lg shadow border p-2">
                            <div className="w-full h-96">
                                <ReactPlayer
                                    controls
                                    width="100%"
                                    height="100%"
                                    url={aboutUsData.aboutUs}
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrderSuccess;