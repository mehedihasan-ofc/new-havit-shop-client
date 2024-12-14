import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ProfileOrderDetails = () => {
    const { id } = useParams(); // Get order ID from the URL
    const [axiosSecure] = useAxiosSecure();

    const { data: order, isLoading, error } = useQuery({
        queryKey: ["order", id],
        queryFn: async () => {
            const res = await axiosSecure(`/orders/single-order/${id}`);
            return res.data;
        },
    });

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center text-red-500 py-6">
                Failed to load order details. Please try again later.
            </div>
        );
    }

    const {
        orderId,
        billingDetails = {},
        couponCode,
        discount,
        orderDate,
        payableTotal,
        paymentMethod,
        products = [],
        shippingCharge,
        paymentNumber,
        transactionId,
        total,
        deliveryStatus,
        paymentStatus,
    } = order;

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Billing Details */}
                <div className="bg-white p-6 shadow-md rounded border space-y-1">
                    <h2 className="text-xl font-semibold text-gray-700 mb-2">Billing Details</h2>
                    <p className="text-sm text-gray-600">
                        <strong>Name:</strong> {billingDetails.name || "N/A"}
                    </p>
                    <p className="text-sm text-gray-600">
                        <strong>Address:</strong> {billingDetails.address || "N/A"}, {billingDetails.area || "N/A"},{" "}
                        {billingDetails.city || "N/A"}
                    </p>
                    <p className="text-sm text-gray-600">
                        <strong>Phone:</strong> {billingDetails.phoneNumber || "N/A"}
                    </p>
                    <p className="text-sm text-gray-600">
                        <strong>Email:</strong> {billingDetails.userEmail || "N/A"}
                    </p>
                </div>

                {/* Order Info */}
                <div className="bg-white p-6 shadow-md rounded border space-y-1">
                    <h2 className="text-xl font-semibold text-gray-700 mb-2">Order Info</h2>
                    <p className="text-sm text-gray-600">
                        <strong>Order ID:</strong> #{orderId}
                    </p>
                    <p className="text-sm text-gray-600">
                        <strong>Order Date:</strong> {new Date(orderDate).toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-600 capitalize">
                        <strong>Delivery Status:</strong> {deliveryStatus}
                    </p>
                    <p className="text-sm text-gray-600 capitalize">
                        <strong>Payment Method:</strong> {paymentMethod || "N/A"}
                    </p>
                    <p className="text-sm text-gray-600 capitalize">
                        <strong>Payment Status:</strong> {paymentStatus || "N/A"}
                    </p>
                    <p className="text-sm text-gray-600">
                        <strong>Coupon Code:</strong> {couponCode || "N/A"}
                    </p>
                    {transactionId && (
                        <>
                            <p className="text-sm text-gray-600">
                                <strong>Payment Number:</strong> {paymentNumber || "N/A"}
                            </p>
                            <p className="text-sm text-gray-600">
                                <strong>Transaction ID:</strong> {transactionId}
                            </p>
                        </>
                    )}
                </div>
            </div>

            {/* Product Details */}
            <div className="bg-white mt-8 p-6 shadow-md rounded border">
                <h2 className="text-xl font-semibold text-gray-700 mb-2">Products</h2>
                <table className="w-full border-collapse border border-gray-300 text-sm">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border border-gray-300 px-4 py-2">#</th>
                            <th className="border border-gray-300 px-4 py-2">Name</th>
                            <th className="border border-gray-300 px-4 py-2">Brand</th>
                            <th className="border border-gray-300 px-4 py-2">Flavour</th>
                            <th className="border border-gray-300 px-4 py-2">Price (BDT)</th>
                            <th className="border border-gray-300 px-4 py-2">Quantity</th>
                            <th className="border border-gray-300 px-4 py-2">Subtotal (BDT)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.length > 0 ? (
                            products.map((product, _idx) => (
                                <tr key={product._id} className="text-center">
                                    <td className="border border-gray-300 px-4 py-2">{_idx + 1 || "N/A"}</td>
                                    <td className="border border-gray-300 px-4 py-2">{product.name}</td>
                                    <td className="border border-gray-300 px-4 py-2">{product.brand || "N/A"}</td>
                                    <td className="border border-gray-300 px-4 py-2">{product.selectFlavour || "N/A"}</td>
                                    <td className="border border-gray-300 px-4 py-2">৳{product.price || 0}</td>
                                    <td className="border border-gray-300 px-4 py-2">{product.quantity || 0}</td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        ৳{product.price * product.quantity || 0}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center text-gray-500 py-4">
                                    No products found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Payment Summary */}
            <div className="bg-white mt-8 p-6 shadow-md rounded border">
                <div>
                    <h2 className="text-xl font-semibold text-gray-700 mb-2">Payment Summary</h2>
                    <p className="text-sm text-gray-600">
                        <strong>Subtotal:</strong> {total || 0} BDT
                    </p>
                    <p className="text-sm text-gray-600">
                        <strong>Discount:</strong> {discount || 0} BDT
                    </p>
                    <p className="text-sm text-gray-600">
                        <strong>Shipping Charge:</strong> {shippingCharge || 0} BDT
                    </p>
                    <p className="text-lg font-semibold text-gray-800">
                        <strong>Payable Total:</strong> {payableTotal || 0} BDT
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ProfileOrderDetails;