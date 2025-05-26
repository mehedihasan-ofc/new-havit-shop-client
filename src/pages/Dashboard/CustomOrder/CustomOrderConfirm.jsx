import { useLocation } from "react-router-dom";
import { useState, useMemo } from "react";

const CustomOrderConfirm = () => {
    const { state } = useLocation();
    const { name, phone, city, area, address, additionalInfo, products } = state || {};

    const [deliveryStatus, setDeliveryStatus] = useState("Pending");
    const [paymentMethod, setPaymentMethod] = useState("Cash on delivery");
    const [paymentStatus, setPaymentStatus] = useState("Pending");
    const [discount, setDiscount] = useState(0);

    const subtotal = useMemo(() => {
        return products.reduce((acc, p) => acc + p.price * p.quantity, 0);
    }, [products]);

    const shipping = city?.toLowerCase() === "dhaka" ? 100 : 150;

    const total = subtotal - discount + shipping;

    return (
        <div className="max-w-5xl mx-auto p-6 space-y-6">
            <h2 className="text-2xl font-semibold mb-4">Confirm Custom Order</h2>

            {/* Customer Info */}
            <div className="border p-4 rounded shadow-sm space-y-1">
                <h3 className="font-medium text-lg mb-2">Customer Info</h3>
                <p><strong>Name:</strong> {name}</p>
                <p><strong>Phone:</strong> {phone}</p>
                <p><strong>City:</strong> {city}</p>
                <p><strong>Area:</strong> {area}</p>
                <p><strong>Address:</strong> {address}</p>
                {additionalInfo && <p><strong>Note:</strong> {additionalInfo}</p>}
            </div>

            {/* Product List */}
            <div className="border p-4 rounded shadow-sm">
                <h3 className="font-medium text-lg mb-3">Products</h3>
                <div className="space-y-4">
                    {products.map((product, idx) => (
                        <div key={idx} className="flex items-center justify-between border-b pb-2">
                            <div className="flex gap-3 items-center">
                                <img src={product.image} alt={product.name} className="w-16 h-16 rounded object-cover" />
                                <div>
                                    <p className="font-semibold">{product.name}</p>
                                    <p className="text-sm text-gray-600">SKU: {product.productId}</p>
                                    <p className="text-sm text-gray-600">Flavor: {product.flavor || "N/A"}</p>
                                </div>
                            </div>
                            <p className="font-medium">Qty: {product.quantity}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Order Options */}
            <div className="border p-4 rounded shadow-sm grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block mb-1 font-medium">Delivery Status</label>
                    <select
                        className="w-full border px-3 py-2 rounded"
                        value={deliveryStatus}
                        onChange={(e) => setDeliveryStatus(e.target.value)}
                    >
                        {["Pending", "Confirmed", "Packaging", "Out For Delivery", "Delivered", "Returned", "Failed To Deliver", "Canceled"].map((status) => (
                            <option key={status} value={status}>{status}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block mb-1 font-medium">Payment Method</label>
                    <select
                        className="w-full border px-3 py-2 rounded"
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                    >
                        <option value="Cash on delivery">Cash on delivery</option>
                        <option value="Bkash">Bkash</option>
                    </select>
                </div>

                <div>
                    <label className="block mb-1 font-medium">Payment Status</label>
                    <select
                        className="w-full border px-3 py-2 rounded"
                        value={paymentStatus}
                        onChange={(e) => setPaymentStatus(e.target.value)}
                    >
                        <option value="Pending">Pending</option>
                        <option value="Paid">Paid</option>
                        <option value="Unpaid">Unpaid</option>
                    </select>
                </div>

                <div>
                    <label className="block mb-1 font-medium">Discount (Tk)</label>
                    <input
                        type="number"
                        value={discount}
                        min="0"
                        className="w-full border px-3 py-2 rounded"
                        onChange={(e) => setDiscount(Number(e.target.value))}
                    />
                </div>
            </div>

            {/* Summary */}
            <div className="border p-4 rounded shadow-sm text-right space-y-1">
                <p><strong>Subtotal:</strong> ৳{subtotal}</p>
                <p><strong>Discount:</strong> -৳{discount}</p>
                <p><strong>Shipping:</strong> ৳{shipping}</p>
                <hr />
                <p className="text-xl font-semibold"><strong>Total Payable:</strong> ৳{total}</p>
            </div>
        </div>
    );
};

export default CustomOrderConfirm;