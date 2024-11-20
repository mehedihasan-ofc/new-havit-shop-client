import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useContext, useState } from "react";
import { AuthContext } from "../../../provider/AuthProvider";
import { toast } from "react-toastify";

const ViewOrderModal = ({ open, handleOpen, orderId, onRefetch }) => {
    const { user } = useContext(AuthContext);
    const token = localStorage.getItem("access-token");
    const [axiosSecure] = useAxiosSecure();

    // State for form inputs
    const [deliveryStatus, setDeliveryStatus] = useState("pending");
    const [paymentStatus, setPaymentStatus] = useState("pending");
    const [isUpdating, setIsUpdating] = useState(false); // State for loading during update

    // Fetch order details
    const { data: order = {}, isLoading, isError, refetch } = useQuery({
        queryKey: ["order", user?.email, orderId],
        enabled: !!user?.email && !!token && !!orderId,
        queryFn: async () => {
            const res = await axiosSecure(`/orders/single-order/${orderId}`);
            const orderData = res.data;
            setDeliveryStatus(orderData.deliveryStatus);
            setPaymentStatus(orderData.paymentStatus);
            return orderData;
        },
    });

    // Function to handle update
    const handleUpdate = async () => {
        setIsUpdating(true); // Start loading state
        try {
            const { data } = await axiosSecure.put(`/orders/update-status/${orderId}`, {
                deliveryStatus,
                paymentStatus,
            });
            console.log(data);

            if(data?.modifiedCount) {
                onRefetch();
                refetch();
                handleOpen();
                toast.success("Order updated successfully!", {
                    autoClose: 1600
                });
            }
        } catch (error) {
            toast.error("Failed to update order.");
            console.error("Update Error:", error);
        } finally {
            setIsUpdating(false); // End loading state
        }
    };

    // Loading or error handling for the dialog content
    if (isLoading) {
        return (
            <Dialog open={open} handler={handleOpen}>
                <DialogHeader>Loading Order Details...</DialogHeader>
                <DialogBody>Loading...</DialogBody>
            </Dialog>
        );
    }

    if (isError) {
        return (
            <Dialog open={open} handler={handleOpen}>
                <DialogHeader>Error</DialogHeader>
                <DialogBody>Failed to load order details. Please try again.</DialogBody>
            </Dialog>
        );
    }

    // Destructure order details for easier rendering
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
        <Dialog open={open} handler={handleOpen} size="lg">
            <DialogHeader className="pb-1">Order Details</DialogHeader>
            <DialogBody className="py-0">
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
            </DialogBody>
            {/* <DialogFooter>
                <Button
                    disabled={isUpdating} // Disable button during update
                    onClick={handleUpdate}
                    className="bg-blue-500 hover:bg-blue-600 text-white"
                >
                    {isUpdating ? "Updating..." : "Update"}
                </Button>
                <Button variant="outlined" color="gray" onClick={handleOpen}>
                    Close
                </Button>
            </DialogFooter> */}

            <DialogFooter>
                <Button
                    size="sm"
                    disabled={isUpdating} // Disable button during update
                    onClick={handleUpdate}
                    className="rounded-none bg-primary font-medium mr-5"
                >
                    {isUpdating ? "Updating..." : "Update"}
                </Button>
                <Button
                    size="sm"
                    onClick={handleOpen}
                    className="rounded-none bg-red-500 font-medium"
                >
                    Cancel
                </Button>
            </DialogFooter>
        </Dialog>
    );
};

export default ViewOrderModal;