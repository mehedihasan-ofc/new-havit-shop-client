import { useLocation } from "react-router-dom";
import { useState } from "react";

const Checkout = () => {
    const location = useLocation();
    const { total, products } = location.state?.checkoutData || { total: 0, products: [] };
    const [couponCode, setCouponCode] = useState("");
    const [billingDetails, setBillingDetails] = useState({
        name: "",
        phoneNumber: "",
        altPhoneNumber: "",
        city: "",
        area: "",
        address: "",
        additionalInfo: ""
    });

    const handleCouponChange = (e) => {
        setCouponCode(e.target.value);
    };

    const handleBillingChange = (e) => {
        setBillingDetails({
            ...billingDetails,
            [e.target.name]: e.target.value
        });
    };

    const handlePlaceOrder = () => {
        const orderData = {
            total,
            products,
            couponCode,
            billingDetails
        };
        console.log("Order Data:", orderData);
    };

    return (
        <div className="max-w-6xl mx-auto px-6 my-5">
            <div className="space-y-1">
                <h2 className="text-4xl font-extrabold tracking-wide font-sans">Checkout</h2>
                <p>There are <span className="text-primary">{products?.length}</span> products in your cart!</p>
            </div>

            <div className="grid grid-cols-3 gap-8 mt-8">
                {/* Billing Details */}
                <div className="col-span-2">
                    <div className="border p-6 rounded-lg shadow-md space-y-4">
                        <h2 className="text-xl font-semibold">Billing Details</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <input
                                type="text"
                                name="name"
                                placeholder="Name *"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary col-span-2"
                                onChange={handleBillingChange}
                            />
                            <input
                                type="text"
                                name="phoneNumber"
                                placeholder="Phone Number *"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                                onChange={handleBillingChange}
                            />
                            <input
                                type="text"
                                name="altPhoneNumber"
                                placeholder="Alternative Phone Number"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                                onChange={handleBillingChange}
                            />
                            <select
                                name="city"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                                onChange={handleBillingChange}
                            >
                                <option value="">Select City</option>
                                <option value="City1">City1</option>
                                <option value="City2">City2</option>
                                {/* Add more options as needed */}
                            </select>
                            <select
                                name="area"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                                onChange={handleBillingChange}
                            >
                                <option value="">Select Area</option>
                                <option value="Area1">Area1</option>
                                <option value="Area2">Area2</option>
                                {/* Add more options as needed */}
                            </select>
                            <input
                                type="text"
                                name="address"
                                placeholder="Address"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary col-span-2"
                                onChange={handleBillingChange}
                            />
                        </div>
                        <textarea
                            name="additionalInfo"
                            placeholder="Additional Information"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary mt-4 h-24"
                            onChange={handleBillingChange}
                        />
                    </div>

                    {/* Coupon Code Section */}
                    <div className="mt-4">
                        <input
                            type="text"
                            placeholder="Enter coupon code"
                            className="input-field w-full"
                            value={couponCode}
                            onChange={handleCouponChange}
                        />
                        <button className="bg-primary text-white py-2 px-4 mt-2 rounded-lg font-semibold">
                            Apply Coupon
                        </button>
                    </div>
                </div>

                {/* Order Summary */}
                <div className="col-span-1 border p-6 rounded-lg shadow-md space-y-4">
                    <h2 className="text-xl font-semibold">Your Order</h2>
                    <div className="space-y-4">
                        {products.map((product, index) => (
                            <div key={index} className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                    <img src={product.images[0].url} alt={product.name} className="w-16 h-16 object-cover rounded-md" />
                                    <div>
                                        <p className="font-semibold">{product.name}</p>
                                        <p className="text-sm text-gray-500">Quantity: {product.quantity}</p>
                                    </div>
                                </div>
                                <p className="text-lg font-semibold">৳{(product.price * product.quantity).toFixed(2)}</p>
                            </div>
                        ))}
                    </div>
                    <div className="flex items-center justify-between mt-4">
                        <p className="text-lg font-semibold">Total:</p>
                        <p className="text-lg font-bold text-primary">৳{total.toFixed(2)}</p>
                    </div>

                    {/* Payment Options */}
                    <div className="mt-6">
                        <h3 className="text-lg font-semibold">Payment</h3>
                        <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                                <input type="radio" id="credit-card" name="payment" />
                                <label htmlFor="credit-card">Credit/Debit Card</label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <input type="radio" id="cash-on-delivery" name="payment" />
                                <label htmlFor="cash-on-delivery">Cash on Delivery</label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <input type="radio" id="bank-transfer" name="payment" />
                                <label htmlFor="bank-transfer">Bank Transfer</label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <input type="radio" id="paypal" name="payment" />
                                <label htmlFor="paypal">PayPal</label>
                            </div>
                        </div>
                    </div>

                    {/* Place Order Button */}
                    <button
                        className="w-full bg-primary text-white py-2 mt-6 rounded-lg font-semibold"
                        onClick={handlePlaceOrder}
                    >
                        Place an Order
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Checkout;