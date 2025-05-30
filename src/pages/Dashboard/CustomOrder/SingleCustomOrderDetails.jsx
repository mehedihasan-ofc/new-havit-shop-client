import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../../provider/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Card, Typography, Select, Option, Button } from "@material-tailwind/react";
import MySpinner from "../../../components/Shared/MySpinner/MySpinner";

const SingleCustomOrderDetails = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const token = localStorage.getItem("access-token");
    const [axiosSecure] = useAxiosSecure();

    const [deliveryStatus, setDeliveryStatus] = useState("pending");
    const [paymentStatus, setPaymentStatus] = useState("unpaid");

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

    console.log(singleCustomOrder);

    const handleStatusUpdate = async () => {
        // try {
        //     await axiosSecure.patch(`/single-custom-orders/${id}`, {
        //         deliveryStatus,
        //         paymentStatus,
        //     });
        //     refetch();
        // } catch (err) {
        //     console.error(err);
        // }
    };

    if (isLoading) return <MySpinner />;

    const {
        _id,
        orderDate,
        totalAmount,
        paymentMethod,
        products = [],
        customerName,
        customerPhone,
        customerAddress,
    } = singleCustomOrder;

    return (
        <div className="max-w-5xl mx-auto p-6 space-y-6">
            <Card className="p-6">
                <Typography variant="h5">Order Information</Typography>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div><strong>Order ID:</strong> {_id}</div>
                    <div><strong>Order Date:</strong> {new Date(orderDate).toLocaleString()}</div>
                    <div><strong>Total:</strong> ${totalAmount}</div>
                    <div><strong>Payment Method:</strong> {paymentMethod}</div>
                </div>
            </Card>

            <Card className="p-6">
                <Typography variant="h5">Customer Information</Typography>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div><strong>Name:</strong> {customerName}</div>
                    <div><strong>Phone:</strong> {customerPhone}</div>
                    <div className="md:col-span-2"><strong>Address:</strong> {customerAddress}</div>
                </div>
            </Card>

            <Card className="p-6">
                <Typography variant="h5">Products</Typography>
                <div className="mt-4 space-y-4">
                    {products.map((product, index) => (
                        <div key={product._id || index} className="flex justify-between border p-4 rounded-md">
                            <div>
                                <div className="font-semibold">{product.name}</div>
                                <div>Price: ${product.price}</div>
                                <div>Quantity: {product.quantity}</div>
                            </div>
                            <img src={product.images?.[0]} alt={product.name} className="w-24 h-24 object-cover rounded" />
                        </div>
                    ))}
                </div>
            </Card>

            <Card className="p-6">
                <Typography variant="h5">Manage Order</Typography>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                        <label className="block mb-2 text-sm font-medium">Delivery Status</label>
                        <Select value={deliveryStatus} onChange={setDeliveryStatus}>
                            {["pending", "confirmed", "packaging", "out_for_delivery", "delivered", "returned", "failed_to_deliver", "canceled"]
                                .map(status => <Option key={status} value={status}>{status.replace(/_/g, " ")}</Option>)}
                        </Select>
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium">Payment Status</label>
                        <Select value={paymentStatus} onChange={setPaymentStatus}>
                            <Option value="unpaid">Unpaid</Option>
                            <Option value="paid">Paid</Option>
                        </Select>
                    </div>
                </div>
                <Button onClick={handleStatusUpdate} color="green" className="mt-6 w-full md:w-max">Update Status</Button>
            </Card>
        </div>
    );
};

export default SingleCustomOrderDetails;