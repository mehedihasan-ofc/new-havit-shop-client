import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../../../provider/AuthProvider";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import MySpinner from "../../../../components/Shared/MySpinner/MySpinner";
import { Button } from "@material-tailwind/react";

const OrderDetails = () => {

    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const token = localStorage.getItem("access-token");
    const [axiosSecure] = useAxiosSecure();

    const [deliveryStatus, setDeliveryStatus] = useState("pending");
    const [paymentStatus, setPaymentStatus] = useState("pending");
    const [isUpdating, setIsUpdating] = useState(false);

    const { data: order = {}, isLoading, refetch } = useQuery({
        queryKey: ["order", user?.email, id],
        enabled: !!user?.email && !!token && !!id,
        queryFn: async () => {
            const res = await axiosSecure(`/orders/single-order/${id}`);
            const orderData = res.data;
            setDeliveryStatus(orderData.deliveryStatus);
            setPaymentStatus(orderData.paymentStatus);
            return orderData;
        },
    });

    const handleUpdate = async () => {
        setIsUpdating(true); // Start loading state
        try {
            const { data } = await axiosSecure.put(`/orders/update-status/${orderId}`, {
                deliveryStatus,
                paymentStatus,
            });
            console.log(data);

            if (data?.modifiedCount) {
                refetch();
                toast.success("Order updated successfully!", {
                    autoClose: 1600
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
    } = order;

    return (
        <div className="p-6 bg-white shadow-md rounded-lg">
            <h2 className="pb-1">Order Details</h2>
            
            <div className="py-0">
                <div className="space-y-2 text-sm">
                    <div className="grid grid-cols-2 gap-5">
                        {/* Billing Details */}
                        <div>
                            <h3 className="font-semibold">Billing Details</h3>
                            <p>
                                <strong>Name:</strong> {billingDetails.name}
                            </p>
                            <p>
                                <strong>Address:</strong> {billingDetails.address}, {billingDetails.area},{" "}
                                {billingDetails.city}
                            </p>
                            <p>
                                <strong>Phone:</strong> {billingDetails.phoneNumber}
                            </p>
                            <p>
                                <strong>Email:</strong> {billingDetails.userEmail}
                            </p>
                        </div>

                        {/* Order Info */}
                        <div>
                            <h3 className="text-sm font-semibold">Order Info</h3>
                            <p className="capitalize">
                                <strong>Order ID:</strong> {_id}
                            </p>
                            <p>
                                <strong>Order Date:</strong> {new Date(orderDate).toLocaleString()}
                            </p>
                            <p className="capitalize">
                                <strong>Delivery Status:</strong> {deliveryStatus}
                            </p>
                            <p className="capitalize">
                                <strong>Payment Method:</strong> {paymentMethod}
                            </p>
                            <p className="capitalize">
                                <strong>Payment Status:</strong> {paymentStatus}
                            </p>
                            <p>
                                <strong>Coupon Code:</strong> {couponCode || "N/A"}
                            </p>

                            {transactionId && (
                                <div>
                                    <p>
                                        <strong>Payment Number:</strong> {paymentNumber || "N/A"}
                                    </p>
                                    <p>
                                        <strong>Transaction ID:</strong> {transactionId}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Product Details */}
                    <div>
                        <h3 className="font-semibold">Products</h3>
                        <table className="w-full border-collapse border border-gray-300">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="border border-gray-300 px-4 py-2">SKU</th>
                                    <th className="border border-gray-300 px-4 py-2">Name</th>
                                    <th className="border border-gray-300 px-4 py-2">Brand</th>
                                    <th className="border border-gray-300 px-4 py-2">Price (BDT)</th>
                                    <th className="border border-gray-300 px-4 py-2">Quantity</th>
                                    <th className="border border-gray-300 px-4 py-2">Subtotal (BDT)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product) => (
                                    <tr key={product._id} className="text-center">
                                        <td className="border border-gray-300 px-4 py-2">{product?.skuCode}</td>
                                        <td className="border border-gray-300 px-4 py-2">{product.name}</td>
                                        <td className="border border-gray-300 px-4 py-2">{product.brand}</td>
                                        <td className="border border-gray-300 px-4 py-2">{product.price}</td>
                                        <td className="border border-gray-300 px-4 py-2">{product.quantity}</td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            {product.price * product.quantity}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="flex justify-around items-start gap-4">
                        {/* Update Delivery & Payment Status */}
                        <div className="space-y-4 w-full sm:w-1/2">
                            <div>
                                <label
                                    htmlFor="deliveryStatus"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Update Delivery Status
                                </label>
                                <select
                                    id="deliveryStatus"
                                    name="deliveryStatus"
                                    value={deliveryStatus}
                                    onChange={(e) => setDeliveryStatus(e.target.value)}
                                    className="w-full px-3 py-1 border border-gray-300 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 mt-1"
                                >
                                    <option value="pending">Pending</option>
                                    <option value="processing">Processing</option>
                                    <option value="shipped">Shipped</option>
                                    <option value="delivered">Delivered</option>
                                    <option value="canceled">Canceled</option>
                                </select>
                            </div>
                            <div>
                                <label
                                    htmlFor="paymentStatus"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Update Payment Status
                                </label>
                                <select
                                    id="paymentStatus"
                                    name="paymentStatus"
                                    value={paymentStatus}
                                    onChange={(e) => setPaymentStatus(e.target.value)}
                                    className="w-full px-3 py-1 border border-gray-300 shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 mt-1"
                                >
                                    <option value="pending">Pending</option>
                                    <option value="paid">Paid</option>
                                    <option value="unpaid">Unpaid</option>
                                </select>
                            </div>
                        </div>

                        {/* Payment Summary */}
                        <div>
                            <h3 className="font-semibold text-lg mb-2">Payment Summary</h3>
                            <p>
                                <strong>Subtotal:</strong> {total} BDT
                            </p>
                            <p>
                                <strong>Discount:</strong> {discount} BDT
                            </p>
                            <p>
                                <strong>Shipping:</strong> {shippingCharge} BDT
                            </p>
                            <p>
                                <strong>Payable Total:</strong> {payableTotal} BDT
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <Button
                    size="sm"
                    disabled={isUpdating}
                    onClick={handleUpdate}
                    className="rounded-none bg-primary font-medium mr-5"
                >
                    {isUpdating ? "Updating..." : "Update"}
                </Button>
            </div>
        </div>
    );
};

export default OrderDetails;