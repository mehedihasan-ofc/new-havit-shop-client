import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import useBillingDetails from "../../hooks/useBillingDetails";
import { Button } from "@material-tailwind/react";

const Checkout = () => {
    const [billingDetails] = useBillingDetails();
    const location = useLocation();
    const navigate = useNavigate();

    const { total, products } = location.state?.checkoutData || { total: 0, products: [] };
    const [couponCode, setCouponCode] = useState("");
    const [loading, setLoading] = useState(false);

    console.log(billingDetails);

    const handleCouponChange = (e) => {
        setCouponCode(e.target.value);
    };

    const handlePlaceOrder = () => {
        setLoading(true);
        const orderData = {
            total,
            products,
            couponCode,
            billingDetails,
        };
        console.log("Order Data:", orderData);

        // Simulate order submission delay
        setTimeout(() => {
            setLoading(false);
            console.log("Order placed successfully!");
            // Navigate or show success message here if needed
        }, 2000); // Adjust the delay as needed
    };

    return (
        <div className="max-w-5xl mx-auto px-6 my-5">
            <div className="space-y-1 mb-4">
                <h2 className="text-4xl font-extrabold tracking-wide">Checkout</h2>
                <p>There are <span className="text-primary">{products?.length}</span> products in your cart!</p>
            </div>

            <div className="border p-6 rounded-lg shadow-md space-y-4">
                {/* Shipping Address Section */}
                <h2 className="text-xl font-semibold">Shipping Address</h2>
                <div className="space-y-2 border-b border-gray-300 pb-4">
                    {billingDetails ? (
                        <div className="flex justify-between items-center">
                            <div className="space-y-1">
                                <p className="text-gray-700"><span className="font-semibold">Name:</span> {billingDetails.name}</p>
                                <p className="text-gray-700"><span className="font-semibold">Phone:</span> {billingDetails.phoneNumber}</p>

                                <div className="text-gray-700 space-y-1">
                                    <p className="font-semibold">Address:</p>
                                    <p>{billingDetails.address}</p>
                                    <p>{billingDetails.area}, {billingDetails.city}</p>
                                </div>
                            </div>

                            <Button onClick={() => navigate("/add-address")} className="rounded-full" variant="outlined">Edit Shipping Address</Button>
                        </div>
                    ) : (
                        <div className="flex justify-between items-center">
                            <p className="text-red-500">No shipping address found!</p>
                            <Button onClick={() => navigate("/add-address")} className="rounded-full" variant="outlined">Add Shipping Address</Button>
                        </div>
                    )}
                </div>

                {/* Order Summary Section */}
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
                <Button
                    type="button"
                    className="w-full rounded-none bg-primary font-medium py-2"
                    onClick={handlePlaceOrder}
                    disabled={loading}
                >
                    {loading ? "Placing Order..." : "Place an Order"}
                </Button>
            </div>
        </div>
    );
};

export default Checkout;