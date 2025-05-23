import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../../../provider/AuthProvider";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import MySpinner from "../../../../components/Shared/MySpinner/MySpinner";
import { toast } from "react-toastify";
import { Button } from "@material-tailwind/react";
import useRefundOrdersByStatus from "../../../../hooks/useRefundOrdersByStatus";

const RefundOrderDetails = () => {

    const { id } = useParams();

    const { user } = useContext(AuthContext);
    const token = localStorage.getItem("access-token");
    const [axiosSecure] = useAxiosSecure();

    const [deliveryStatus, setDeliveryStatus] = useState("delivered");
    const [paymentStatus, setPaymentStatus] = useState("paid");
    const [refundStatus, setRefundStatus] = useState("pending");
    const [isUpdating, setIsUpdating] = useState(false);

    const [, , refetch] = useRefundOrdersByStatus("all");

    const { data: refundOrder = {}, isLoading } = useQuery({
        queryKey: ["refundOrder", user?.email, id],
        enabled: !!user?.email && !!token && !!id,
        queryFn: async () => {
            const res = await axiosSecure(`/order/refund/${id}`);
            const orderData = res.data;
            setDeliveryStatus(orderData.deliveryStatus);
            setPaymentStatus(orderData.paymentStatus);
            setRefundStatus(orderData.refundStatus);
            return orderData;
        },
    });

    const handleUpdate = async () => {
        setIsUpdating(true);
        try {
            const { data } = await axiosSecure.put(`/orders/update-refund-status/${id}`, {
                deliveryStatus,
                paymentStatus,
                refundStatus
            });

            if (data?.modifiedCount) {
                refetch();
                toast.success("Order updated successfully!", {
                    autoClose: 1600,
                });
            }
        } catch (error) {
            toast.error("Failed to update order.");
            console.error("Update Error:", error);
        } finally {
            setIsUpdating(false);
        }
    };

    if (isLoading) return <MySpinner />;

    const {
        _id,
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
        refundRequestedAt,
        refundReason
    } = refundOrder;

    return (
        <div className="container mx-auto p-6 space-y-5 border shadow">

            <div className="bg-red-500 text-white p-6 rounded shadow border space-y-1">
                <h3 className="text-xl font-semibold mb-4">Refund Details</h3>
                <p className="text-sm">
                    <strong>Requested At:</strong> {refundRequestedAt ? new Date(refundRequestedAt).toLocaleString() : "N/A"}
                </p>
                <p className="text-">
                    <strong>Reason:</strong> {refundReason || "No reason provided"}
                </p>
            </div>

            {/* Billing and Order Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Billing Details */}
                <div className="bg-white p-6 rounded shadow border space-y-1">
                    <h3 className="text-xl font-semibold text-gray-700 mb-4">Billing Details</h3>
                    <p className="text-sm text-gray-600">
                        <strong>Name:</strong> {billingDetails.name}
                    </p>
                    <p className="text-sm text-gray-600">
                        <strong>Address:</strong> {billingDetails.address}, {billingDetails.area}, {billingDetails.city}
                    </p>
                    <p className="text-sm text-gray-600">
                        <strong>Phone:</strong> {billingDetails.phoneNumber}
                    </p>
                    <p className="text-sm text-gray-600">
                        <strong>Email:</strong> {billingDetails.userEmail}
                    </p>
                </div>

                {/* Order Info */}
                <div className="bg-white p-6 rounded shadow border space-y-1">
                    <h3 className="text-xl font-semibold text-gray-700 mb-4">Order Info</h3>
                    <p className="text-sm text-gray-600 capitalize">
                        <strong>Order ID:</strong> {_id}
                    </p>
                    <p className="text-sm text-gray-600">
                        <strong>Order Date:</strong> {new Date(orderDate).toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-600 capitalize">
                        <strong>Delivery Status:</strong> {deliveryStatus}
                    </p>
                    <p className="text-sm text-gray-600 capitalize">
                        <strong>Payment Method:</strong> {paymentMethod}
                    </p>
                    <p className="text-sm text-gray-600 capitalize">
                        <strong>Payment Status:</strong> {paymentStatus}
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
            <div className="bg-white p-6 rounded shadow border">
                <h3 className="text-xl font-semibold text-gray-700 mb-4">Products</h3>
                <table className="w-full border-collapse border border-gray-200">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border border-gray-300 px-4 py-2">SKU</th>
                            <th className="border border-gray-300 px-4 py-2">Name</th>
                            <th className="border border-gray-300 px-4 py-2">Brand</th>
                            <th className="border border-gray-300 px-4 py-2">Flavour</th>
                            <th className="border border-gray-300 px-4 py-2">Price (BDT)</th>
                            <th className="border border-gray-300 px-4 py-2">Quantity</th>
                            <th className="border border-gray-300 px-4 py-2">Subtotal (BDT)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product._id} className="text-center">
                                <td className="border border-gray-200 px-4 py-2">{product?.skuCode}</td>
                                <td className="border border-gray-200 px-4 py-2">{product.name}</td>
                                <td className="border border-gray-200 px-4 py-2">{product.brand}</td>
                                <td className="border border-gray-200 px-4 py-2">{product.selectFlavour || "N/A"}</td>
                                <td className="border border-gray-200 px-4 py-2">৳{product.price}</td>
                                <td className="border border-gray-200 px-4 py-2">{product.quantity}</td>
                                <td className="border border-gray-200 px-4 py-2">
                                    ৳{product.price * product.quantity}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Status Update and Payment Summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                <div className="bg-white p-6 rounded shadow border space-y-1">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">Payment Summary</h3>
                    <p className="text-sm text-gray-600">
                        <strong>Subtotal:</strong> {total} BDT
                    </p>
                    <p className="text-sm text-gray-600">
                        <strong>Discount:</strong> {discount} BDT
                    </p>
                    <p className="text-sm text-gray-600">
                        <strong>Shipping:</strong> {shippingCharge} BDT
                    </p>
                    <p className="text-sm text-gray-600">
                        <strong>Payable Total:</strong> {payableTotal} BDT
                    </p>
                </div>

                <div className="bg-white p-6 rounded shadow border">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">Update Status</h3>
                    <div className="space-y-4">
                        <div>
                            <label
                                htmlFor="deliveryStatus"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Delivery Status
                            </label>
                            <select
                                id="deliveryStatus"
                                value={deliveryStatus}
                                onChange={(e) => setDeliveryStatus(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                            >
                                <option value="delivered">Delivered</option>
                                <option value="returned">Returned</option>
                            </select>
                        </div>
                        <div>
                            <label
                                htmlFor="paymentStatus"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Payment Status
                            </label>
                            <select
                                id="paymentStatus"
                                value={paymentStatus}
                                onChange={(e) => setPaymentStatus(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                            >
                                <option value="paid">Paid</option>
                                <option value="refund">Refund</option>
                            </select>
                        </div>

                        <div>
                            <label
                                htmlFor="refundStatus"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Refund Status
                            </label>
                            <select
                                id="refundStatus"
                                value={refundStatus}
                                onChange={(e) => setRefundStatus(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                            >
                                <option value="pending">Pending</option>
                                <option value="approved">Approved</option>
                                <option value="refunded">Refunded</option>
                                <option value="rejected">Rejected</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-center mt-6">
                <Button
                    size="md"
                    disabled={isUpdating}
                    onClick={handleUpdate}
                    className='rounded-none bg-primary font-medium px-10'
                >
                    {isUpdating ? "Updating..." : "Update Refund"}
                </Button>
            </div>
        </div>
    );
};

export default RefundOrderDetails;