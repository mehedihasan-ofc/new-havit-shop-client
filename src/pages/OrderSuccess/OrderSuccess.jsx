import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { GiCheckMark } from "react-icons/gi";
import { LuCopy } from "react-icons/lu";
import ReactPlayer from "react-player";
import useAboutUs from "../../hooks/useAboutUs";

const OrderSuccess = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [copied, setCopied] = useState(false);
    const orderId = location.state?.orderId;
    const [aboutUsData] = useAboutUs();

    useEffect(() => {
        if (!orderId) {
            navigate("/");
        }
    }, [orderId, navigate]);

    const handleCopyOrderId = () => {
        navigator.clipboard.writeText(orderId).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    return (
        <div className="my-5 px-4 sm:px-6">
            <div className="flex flex-col items-center justify-center space-y-6">

                <div className="bg-white shadow-md rounded-lg p-6 sm:p-8 w-full max-w-2xl text-center border">
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
                    <h2 className="text-xl sm:text-2xl font-bold font-serif mb-2">Order Placed Successfully!</h2>
                    <p className="text-sm sm:text-base mb-4">
                        Thank you for your order. Your order has been placed successfully.
                    </p>
                    <div className="bg-gray-100 p-3 rounded-md text-sm text-gray-700 mb-6 flex items-center justify-between gap-2">
                        <span className="text-center sm:text-left">
                            <span className="font-semibold text-sm md:text-base">Order ID:</span> #{orderId}
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
                        className="w-full bg-primary text-white py-2 rounded font-semibold shadow-md hover:bg-primary-dark transition duration-300"
                    >
                        Back to Home
                    </button>
                </div>

                {/* About Us Video Section */}
                {aboutUsData?.aboutUs && (
                    <div className="bg-white shadow-md rounded-lg w-full max-w-4xl border p-2">
                        <div className="w-full aspect-video">
                            <ReactPlayer
                                controls
                                width="100%"
                                height="100%"
                                url={aboutUsData.aboutUs}
                                className="rounded-lg"
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrderSuccess;