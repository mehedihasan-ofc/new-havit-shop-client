import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../../provider/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Card, Typography, Button } from "@material-tailwind/react";
import MySpinner from "../../../components/Shared/MySpinner/MySpinner";
import { toast } from "react-toastify";
import { formattedDate } from "../../../utils";

const SingleCustomOrderDetails = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const token = localStorage.getItem("access-token");
    const [axiosSecure] = useAxiosSecure();

    const [deliveryStatus, setDeliveryStatus] = useState("pending");
    const [paymentStatus, setPaymentStatus] = useState("unpaid");
    const [isUpdating, setIsUpdating] = useState(false);

    const { data: singleCustomOrder = {}, isLoading, refetch } = useQuery({
        queryKey: ["singleCustomOrder", user?.email, id],
        enabled: !!user?.email && !!token && !!id,
        queryFn: async () => {
            const res = await axiosSecure(`/single-custom-orders/${id}`);
            const orderData = res.data;
            setDeliveryStatus(orderData.deliveryStatus);
            setPaymentStatus(orderData.paymentStatus);
            return orderData;
        },
    });

    const handleUpdate = async () => {
        setIsUpdating(true);
        try {
            const { data } = await axiosSecure.patch(`/single-custom-orders/${id}`, {
                deliveryStatus,
                paymentStatus,
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

    console.log(singleCustomOrder);

    return (
        <Card className="p-6 space-y-2">
            <Typography variant="h3" className="mb-4 text-center font-serif font-bold">
                Custom Order Details
            </Typography>

            <div className="grid md:grid-cols-2 gap-5">
                <div className="border rounded p-5">
                    <h2 className="text-xl font-semibold mb-4 text-gray-700">Customer Info</h2>
                    <hr className="my-2" />
                    <div className="text-gray-600 space-y-2">
                        <p><strong>Name:</strong> {singleCustomOrder?.customer?.name}</p>
                        <p><strong>Phone:</strong> {singleCustomOrder?.customer?.phone}</p>
                        <p><strong>City:</strong> {singleCustomOrder?.customer?.city}</p>
                        <p><strong>Area:</strong> {singleCustomOrder?.customer?.area}</p>
                        <p><strong>Address:</strong> {singleCustomOrder?.customer?.address}</p>
                        {singleCustomOrder?.customer?.additionalInfo && <p><strong>Note:</strong> {singleCustomOrder?.customer?.additionalInfo}</p>}
                    </div>
                </div>
                <div className="border rounded p-5">
                    <h2 className="text-xl font-semibold mb-4 text-gray-700">Order Information</h2>
                    <hr className="my-2" />

                    <div className="text-gray-600 space-y-1">
                        <p><strong>Order ID:</strong> #{singleCustomOrder?.orderId}</p>
                        <p className="capitalize"><strong>Payment Method:</strong> {singleCustomOrder?.paymentMethod}</p>
                        <p className="capitalize"><strong>Payment Status:</strong> {singleCustomOrder?.paymentStatus}</p>
                        <p className="capitalize"><strong>Delivery Status:</strong> {singleCustomOrder?.deliveryStatus}</p>
                        <p><strong>Order Date:</strong> {formattedDate(singleCustomOrder?.createdAt)}</p>
                        <hr className="my-2" />
                        <p><strong>Subtotal:</strong> ৳{singleCustomOrder?.subtotal}</p>
                        <p><strong>Discount:</strong> -৳{singleCustomOrder?.discount}</p>
                        <p><strong>Shipping:</strong> ৳{singleCustomOrder?.shipping}</p>
                        <p><strong>Total Amount:</strong> ৳{singleCustomOrder?.totalAmount}</p>
                        {singleCustomOrder?.paymentStatus === "due" && (
                            <p><strong className="text-primary">Already Paid:</strong> -৳{singleCustomOrder?.paidAmount}</p>
                        )}
                        <p><strong className="text-red-500">Due Amount:</strong> ৳{singleCustomOrder?.payableAmount}</p>
                    </div>
                </div>
            </div>

            <div className="border rounded p-5">
                <h2 className="text-xl font-semibold mb-4 text-gray-700">Products</h2>
                <hr className="my-2" />

                <div className="mt-4 space-y-4">
                    {singleCustomOrder?.products.map((product) => (
                        <div
                            key={product?._id}
                            className="flex justify-between items-center bg-gray-50 p-3 rounded-xl shadow-sm"
                        >
                            <div className="flex items-center gap-3">
                                <img src={product.images[0].url} alt={product.name} className="w-12 h-12 object-cover rounded-md border" />
                                <div>
                                    <p className="text-sm text-gray-600 font-medium">SKU: {product.skuCode}</p>
                                    <p className="font-medium line-clamp-2">{product.name}</p>
                                    <p className="text-sm text-gray-500">Flavor: {product.selectedflavour}</p>
                                </div>
                            </div>
                            <p className="font-semibold">x{product.quantity}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="border rounded p-5">
                <h2 className="text-xl font-semibold mb-4 text-gray-700">Manage Order</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">

                    <div>
                        <label className="block text-sm font-medium mb-1">Delivery Status</label>
                        <select
                            value={deliveryStatus}
                            onChange={(e) => setDeliveryStatus(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                        >
                            <option disabled value="">Select a status</option>
                            {["pending", "confirmed", "packaging", "out_for_delivery", "delivered", "returned", "failed_to_deliver", "canceled"].map(status => (
                                <option key={status} value={status}>
                                    {status.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Payment Status</label>
                        <select
                            value={paymentStatus}
                            onChange={(e) => setPaymentStatus(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                        >
                            <option value="pending">Pending</option>
                            <option value="due">Due</option>
                            <option value="paid">Paid</option>
                            <option value="unpaid">Unpaid</option>
                        </select>
                    </div>

                </div>

                <div className='flex items-center justify-center mt-5'>
                    <Button
                        onClick={handleUpdate}
                        className='rounded-none bg-primary font-medium px-10'
                        disabled={isUpdating}
                    >
                        {isUpdating ? "Updating..." : "Update Order"}
                    </Button>
                </div>
            </div>
        </Card>
    );
};

export default SingleCustomOrderDetails;