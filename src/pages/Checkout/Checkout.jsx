import { useLocation } from "react-router-dom";
import { useState } from "react";

const Checkout = () => {
    const location = useLocation();
    const { total, products } = location.state?.checkoutData || { total: 0, products: [] };
    const [couponCode, setCouponCode] = useState("");
    const [billingDetails, setBillingDetails] = useState({
        firstName: "",
        lastName: "",
        address1: "",
        address2: "",
        city: "",
        postcode: "",
        phone: "",
        email: "",
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
                <h2 className="text-4xl font-extrabold tracking-wide font-sans">Your Cart</h2>
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
                                name="firstName"
                                placeholder="First name"
                                className="input-field"
                                onChange={handleBillingChange}
                            />
                            <input
                                type="text"
                                name="lastName"
                                placeholder="Last name"
                                className="input-field"
                                onChange={handleBillingChange}
                            />
                            <input
                                type="text"
                                name="address1"
                                placeholder="Address 1"
                                className="input-field col-span-2"
                                onChange={handleBillingChange}
                            />
                            <input
                                type="text"
                                name="address2"
                                placeholder="Address 2"
                                className="input-field col-span-2"
                                onChange={handleBillingChange}
                            />
                            <input
                                type="text"
                                name="city"
                                placeholder="City/Town"
                                className="input-field"
                                onChange={handleBillingChange}
                            />
                            <input
                                type="text"
                                name="postcode"
                                placeholder="Postcode/ZIP"
                                className="input-field"
                                onChange={handleBillingChange}
                            />
                            <input
                                type="text"
                                name="phone"
                                placeholder="Phone"
                                className="input-field"
                                onChange={handleBillingChange}
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email address"
                                className="input-field"
                                onChange={handleBillingChange}
                            />
                        </div>
                        <textarea
                            name="additionalInfo"
                            placeholder="Additional Information"
                            className="input-field mt-4 w-full h-24"
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