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
        // Add your order submission logic here
    };

    return (
        <div className="max-w-6xl mx-auto px-6 my-5 space-y-8">
            {/* Header */}
            <div className="space-y-1">
                <h2 className="text-4xl font-extrabold tracking-wide">Checkout</h2>
                <p>There are <span className="text-primary">{products?.length}</span> products in your cart!</p>
            </div>

            <div className="grid grid-cols-3 gap-8">
                {/* Billing Details Section */}
                <div className="col-span-2 border p-6 rounded-lg shadow-md space-y-4">
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
                        </select>
                        <select
                            name="area"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                            onChange={handleBillingChange}
                        >
                            <option value="">Select Area</option>
                            <option value="Area1">Area1</option>
                            <option value="Area2">Area2</option>
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

                {/* Order Summary Section */}
                <div className="col-span-1 border p-6 rounded-lg shadow-md space-y-4">
                    <h2 className="text-xl font-semibold">Order Summary</h2>
                    <div className="space-y-2 border-b border-gray-300 pb-4">
                        <div className="flex justify-between">
                            <p className="text-gray-700">Subtotal</p>
                            <p className="text-gray-700 font-semibold">৳{total.toFixed(2)}</p>
                        </div>
                        <div className="flex justify-between items-center">
                            <p className="text-gray-700">Shipping <span className="text-sm text-blue-500 cursor-pointer">(Changeable)</span></p>
                            <p className="text-gray-700 font-semibold">৳107</p> {/* Dynamic value can be added */}
                        </div>
                        <div className="flex justify-between">
                            <p className="text-gray-700">Total</p>
                            <p className="text-gray-700 font-semibold">৳{(total + 107).toFixed(2)}</p>
                        </div>
                    </div>
                    <div className="flex justify-between items-center pt-4">
                        <p className="text-lg font-semibold">Payable Total</p>
                        <p className="text-lg font-bold text-primary">৳{(total + 107).toFixed(2)}</p>
                    </div>

                    {/* Voucher or Promo Code Section */}
                    <div className="mt-4">
                        <p className="text-gray-700">Apply Voucher or Promo Code</p>
                        <div className="flex mt-2">
                            <input
                                type="text"
                                placeholder="Enter your code here"
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-primary focus:border-primary"
                                value={couponCode}
                                onChange={handleCouponChange}
                            />
                            <button className="bg-primary text-white px-4 rounded-r-md font-semibold">
                                Apply
                            </button>
                        </div>
                    </div>

                    {/* Payment Options */}
                    <div className="mt-6">
                        <h3 className="text-lg font-semibold">Payment</h3>
                        <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                                <input type="radio" id="cash-on-delivery" name="payment" />
                                <label htmlFor="cash-on-delivery">Cash on Delivery</label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <input type="radio" id="bkash-payment" name="payment" />
                                <label htmlFor="bkash-payment">Bkash Online Payment</label>
                            </div>
                        </div>
                    </div>

                    {/* Place Order Button */}
                    <button
                        className="w-full bg-primary text-white py-2 rounded-lg font-semibold mt-4"
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