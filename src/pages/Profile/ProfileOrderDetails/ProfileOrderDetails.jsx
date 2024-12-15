import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import MySpinner from "../../../components/Shared/MySpinner/MySpinner";
import { Button } from "@material-tailwind/react";
import { TbShoppingCartCancel } from "react-icons/tb";

const ProfileOrderDetails = () => {
    const { id } = useParams();
    const [axiosSecure] = useAxiosSecure();
    const navigate = useNavigate();

    const { data: order, isLoading } = useQuery({
        queryKey: ["order", id],
        queryFn: async () => {
            const res = await axiosSecure(`/orders/single-order/${id}`);
            return res.data;
        },
    });

    const handleCancelOrder = async () => {
        // Uncomment and implement if needed
    };

    const handleRequestReturnRefund = async () => {
        // Uncomment and implement if needed
    };

    if (isLoading) return <MySpinner />;

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

    console.log(products);

    return (
        <div className="max-w-7xl mx-auto px-4 space-y-4 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Billing Details */}
                <div className="bg-white p-4 lg:p-6 shadow-md rounded border space-y-2">
                    <h2 className="text-lg lg:text-xl font-semibold text-gray-700">Billing Details</h2>
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
                <div className="bg-white p-4 lg:p-6 shadow-md rounded border space-y-2">
                    <h2 className="text-lg lg:text-xl font-semibold text-gray-700">Order Info</h2>
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

            <div className="bg-white p-6 shadow rounded border">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Products</h2>
                <div className="space-y-4">
                    {products.length > 0 ? (
                        products.map((product) => (
                            <div
                                key={product._id}
                                onClick={() => navigate(`/products/product-details/${product?._id}`)}
                                className="flex flex-col md:flex-row items-center justify-between border rounded shadow hover:shadow-md cursor-pointer transition-shadow p-4"
                            >
                                {/* Left Section: Image and Details */}
                                <div className="flex items-center gap-4 w-full md:w-auto">
                                    {/* Product Image */}
                                    <img
                                        src={product?.images[0]?.url || "https://via.placeholder.com/120"}
                                        alt={product?.name}
                                        className="w-24 h-24 object-cover rounded-lg"
                                    />

                                    {/* Product Details */}
                                    <div className="flex-1 md:flex-none">
                                        <h3 className="text-lg font-semibold text-gray-800 hover:text-green-600 transition-colors">
                                            {product.name}
                                        </h3>
                                        <p className="text-sm text-gray-600">
                                            <strong>Brand:</strong> {product.brand || "N/A"}
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            <strong>Flavour:</strong> {product.selectFlavour || "N/A"}
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            <strong>Quantity:</strong> {product.quantity || 0}
                                        </p>
                                    </div>
                                </div>

                                {/* Right Section: Pricing */}
                                <div className="mt-4 md:mt-0 text-right w-full md:w-auto">
                                    <p className="text-sm text-gray-600">
                                        <strong>Price:</strong> ৳{product.price || 0}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        <strong>Subtotal:</strong> ৳{product.price * product.quantity || 0}
                                    </p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500 py-4">No products found.</p>
                    )}
                </div>
            </div>

            <div className="bg-white p-4 lg:p-6 shadow-md rounded border">
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                    <div>
                        <h2 className="text-lg lg:text-xl font-semibold text-gray-700">Payment Summary</h2>
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
                    <div className="space-y-2">
                        {deliveryStatus === "pending" && (
                            // <button
                            //     onClick={handleCancelOrder}
                            //     className="bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-600 w-full lg:w-auto"
                            // >
                            //     Cancel Order
                            // </button>

                            <Button onClick={handleCancelOrder} className="flex items-center gap-3 rounded-none font-medium bg-red-600">
                                <TbShoppingCartCancel size={20} />
                                Cancel Order
                            </Button>
                        )}
                        {deliveryStatus === "delivered" && (
                            // <button
                            //     onClick={handleRequestReturnRefund}
                            //     className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 w-full lg:w-auto"
                            // >
                            //     Request Return/Refund
                            // </button>

                            <Button  onClick={handleRequestReturnRefund} className="flex items-center gap-3 rounded-none font-medium bg-blue-600">
                                <TbShoppingCartCancel size={20} />
                                Request Return/Refund
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileOrderDetails;