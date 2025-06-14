import { useLocation, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import useBillingDetails from "../../hooks/useBillingDetails";
import { Button } from "@material-tailwind/react";
import usePromoCodes from "../../hooks/usePromoCodes";
import { toast } from "react-toastify";
import { AuthContext } from "../../provider/AuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useMyData from "../../hooks/useMyData";

import CodImg from "../../assets/payment/cod.png";
import BkashImg from "../../assets/payment/bkash_payment.png";

const Checkout = () => {
    const { user } = useContext(AuthContext);
    const [myData] = useMyData();
    const [billingDetails] = useBillingDetails();
    const [promoCodes] = usePromoCodes();
    const [axiosSecure] = useAxiosSecure();

    const location = useLocation();
    const navigate = useNavigate();

    const { total, products } = location.state?.checkoutData || { total: 0, products: [] };
    const [couponCode, setCouponCode] = useState("");
    const [discount, setDiscount] = useState(0);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
    const [useCoins, setUseCoins] = useState(false);
    const [coinDiscount, setCoinDiscount] = useState(0);

    const [loading, setLoading] = useState(false);
    const [promoLoading, setPromoLoading] = useState(false);

    const shippingCharge = billingDetails?.city?.toLowerCase() === "dhaka" ? 100 : billingDetails ? 150 : 0;
    const payableTotal = total - discount - coinDiscount + shippingCharge;

    const handleCouponChange = (e) => {
        setCouponCode(e.target.value);
    };

    const handleApplyCoupon = async () => {
        setPromoLoading(true);
        try {
            const validPromo = promoCodes.find(promo => promo.promoCode === couponCode);

            if (validPromo) {
                const currentDate = new Date();
                const expiryDate = new Date(validPromo.expiryDate);

                if (expiryDate < currentDate) {
                    setCouponCode("");
                    setDiscount(0);
                    toast.error("This promo code has expired.");
                } else {
                    let discountAmount = 0;

                    if (validPromo.discountType === "percent") {
                        discountAmount = (total * parseFloat(validPromo.discount)) / 100;
                    } else if (validPromo.discountType === "amount") {
                        discountAmount = parseFloat(validPromo.discount);
                    }

                    setDiscount(discountAmount);
                    toast.success(`Promo code applied! You get a discount of ৳${discountAmount.toFixed(2)}`);
                }
            } else {
                setCouponCode("");
                setDiscount(0);
                toast.error("Invalid promo code.");
            }
        } catch (error) {
            toast.error("Failed to apply promo code. Please try again.");
        } finally {
            setPromoLoading(false);
        }
    };

    const handleCoinUsage = (e) => {
        setUseCoins(e.target.checked);
        if (e.target.checked) {
            const maxCoinDiscount = Math.min(myData?.coin || 0, total * 200); // 200 coins = 1 Tk
            setCoinDiscount(maxCoinDiscount / 200);
        } else {
            setCoinDiscount(0);
        }
    };

    const handlePaymentChange = (e) => {
        setSelectedPaymentMethod(e.target.value);
    };

    const handlePlaceOrder = async () => {
        if (!billingDetails) {
            toast.error("Please add a shipping address to proceed.");
            return;
        }

        if (!selectedPaymentMethod) {
            toast.error("Please select a payment method.");
            return;
        }

        setLoading(true);
        try {
            // Prepare the data
            const orderDetails = {
                userEmail: user.email,
                billingDetailsId: billingDetails._id,
                products: products.map(product => ({
                    productId: product._id,
                    quantity: product.quantity,
                    selectFlavour: product.selectFlavor
                })),
                total,
                discount,
                couponCode,
                coinDiscount,
                coinsUsed: useCoins ? coinDiscount * 200 : 0, // 200 coins = 1 Tk
                shippingCharge,
                payableTotal,
                paymentMethod: selectedPaymentMethod,
                deliveryStatus: "pending",
                paymentStatus: "pending",
                orderDate: new Date().toISOString(),
            };

            if (selectedPaymentMethod === "cash-on-delivery") {
                const { data } = await axiosSecure.post('/orders', orderDetails);

                if (data?.result?.insertedId) {
                    if (useCoins) {
                        // Update user coins
                        await axiosSecure.patch(`/users/update-coins/${user?.email}`, {
                            coins: myData.coin - coinDiscount * 200
                        });
                    }

                    toast.success("Order placed successfully!", {
                        autoClose: 1600,
                        pauseOnHover: false
                    });
                    navigate("/order-success", { state: { orderId: data?.orderId } });
                } else {
                    toast.error("Failed to place order.");
                }
            } else if (selectedPaymentMethod === "bkash-payment") {
                navigate("/bkash-payment", { state: { orderDetails, billingDetails } });
            }

        } catch (error) {
            console.error("Error placing order:", error);
            toast.error("An error occurred while placing the order. Please try again.", {
                autoClose: 1000,
                pauseOnHover: false
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-5xl mx-auto px-6 my-5">
            <div className="space-y-1 mb-4">
                <h2 className="text-xl md:text-3xl font-extrabold tracking-wide font-serif">Checkout</h2>
                <p className="text-xs md:text-base">There are <span className="text-primary">{products?.length}</span> products in your cart!</p>
            </div>

            <div className="border p-6 rounded-lg shadow-md space-y-4">
                {/* Shipping Address Section */}
                <h2 className="text-lg md:text-xl font-semibold">Shipping Address</h2>
                <div className="border-b border-gray-300 pb-4">
                    {billingDetails ? (
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                            <div className="text-sm sm:text-base space-y-1 text-gray-700">
                                <p><span className="font-semibold">Name:</span> {billingDetails.name}</p>
                                <p><span className="font-semibold">Phone:</span> {billingDetails.phoneNumber}</p>
                                <div>
                                    <p className="font-semibold">Address:</p>
                                    <p className="text-gray-600">
                                        {billingDetails.address}, {billingDetails.area}, {billingDetails.city}
                                    </p>
                                </div>
                            </div>
                            <div className="flex justify-start sm:justify-end">
                                <Button
                                    size="sm"
                                    onClick={() =>
                                        navigate("/profile/my-address", {
                                            state: { from: location, checkoutData: location.state?.checkoutData },
                                            replace: true,
                                        })
                                    }
                                    className="rounded-full py-2"
                                    variant="outlined"
                                >
                                    Edit Shipping Address
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                            <p className="text-red-500 text-sm sm:text-base">
                                No shipping address found!
                            </p>
                            <Button
                                onClick={() =>
                                    navigate("/profile/my-address", {
                                        state: { from: location, checkoutData: location.state?.checkoutData },
                                        replace: true,
                                    })
                                }
                                className="rounded-full py-2"
                                variant="outlined"
                            >
                                Add Shipping Address
                            </Button>
                        </div>
                    )}
                </div>

                {/* Order Summary Section */}
                <h2 className="text-lg md:text-xl font-semibold">Order Summary</h2>
                <div className="space-y-2 border-b border-gray-300 pb-4">
                    <div className="flex justify-between">
                        <p className="text-gray-700">Subtotal</p>
                        <p className="text-gray-700 font-semibold">৳{total.toFixed(2)}</p>
                    </div>
                    <div className="flex justify-between">
                        <p className="text-gray-700">Discount</p>
                        <p className={`text-gray-700 font-semibold ${discount > 0 ? "text-green-600" : ""}`}>
                            {discount > 0 ? `-৳${discount.toFixed(2)}` : "৳0.00"}
                        </p>
                    </div>
                    <div className="flex justify-between">
                        <p className="text-gray-700">Coin Discount</p>
                        <p className={`text-gray-700 font-semibold ${coinDiscount > 0 ? "text-green-600" : ""}`}>
                            {coinDiscount > 0 ? `-৳${coinDiscount.toFixed(2)}` : "৳0.00"}
                        </p>
                    </div>
                    <div className="flex justify-between items-center">
                        <p className="text-gray-700">Shipping</p>
                        <p className="text-gray-700 font-semibold">৳{shippingCharge}</p>
                    </div>
                    <div className="flex justify-between">
                        <p className="text-gray-700">Total</p>
                        <p className="text-gray-700 font-semibold">৳{payableTotal.toFixed(2)}</p>
                    </div>
                </div>
                <div className="flex justify-between items-center pt-4">
                    <p className="text-lg md:text-xl font-semibold">Payable Total</p>
                    <p className="text-lg font-bold text-primary">৳{payableTotal.toFixed(2)}</p>
                </div>

                {/* Voucher or Promo Code Section */}
                <div className="mt-4">
                    <p className="text-gray-700">Apply Voucher or Promo Code</p>
                    <div className="flex mt-2">
                        <input
                            type="text"
                            placeholder="Enter your code here"
                            className="flex-1 w-full px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-primary focus:border-primary"
                            value={couponCode}
                            onChange={handleCouponChange}
                        />
                        <button
                            onClick={handleApplyCoupon}
                            className={`bg-primary text-white px-4 rounded-r-md font-semibold ${promoLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                            disabled={promoLoading}
                        >
                            {promoLoading ? "Applying..." : "Apply"}
                        </button>
                    </div>
                </div>

                {/* Use Coins Section */}
                <div className="mt-4 flex items-center">
                    <input
                        type="checkbox"
                        id="use-coins"
                        checked={useCoins}
                        onChange={handleCoinUsage}
                        className="mr-2"
                    />
                    <label htmlFor="use-coins" className="text-gray-700 text-sm md:text-base">Use Coins ({myData?.coin || 0} available, 200 coins = ৳1)</label>
                </div>

                {/* Payment Options */}
                <div className="mt-6">
                    <h3 className="text-lg font-semibold">Payment</h3>
                    <div className="space-y-2 mt-1">
                        {/* Cash on Delivery Option */}
                        <div>
                            <label htmlFor="cash-on-delivery" className="inline-block cursor-pointer">
                                <input
                                    type="radio"
                                    id="cash-on-delivery"
                                    name="payment"
                                    value="cash-on-delivery"
                                    onChange={handlePaymentChange}
                                    checked={selectedPaymentMethod === "cash-on-delivery"}
                                    className="hidden"
                                />
                                <img
                                    src={CodImg}
                                    alt="Cash on Delivery"
                                    className={`w-60 h-16 object-contain border rounded-md p-1 ${selectedPaymentMethod === "cash-on-delivery" ? "border-primary" : "border-gray-300"}`}
                                />
                            </label>
                        </div>

                        {/* Bkash Payment Option */}
                        <div>
                            <label htmlFor="bkash-payment" className="inline-block cursor-pointer">
                                <input
                                    type="radio"
                                    id="bkash-payment"
                                    name="payment"
                                    value="bkash-payment"
                                    onChange={handlePaymentChange}
                                    checked={selectedPaymentMethod === "bkash-payment"}
                                    className="hidden"
                                />
                                <img
                                    src={BkashImg}
                                    alt="Bkash Payment"
                                    className={`w-60 h-16 object-contain border rounded-md p-1 ${selectedPaymentMethod === "bkash-payment" ? "border-primary" : "border-gray-300"}`}
                                />
                            </label>
                        </div>
                    </div>
                </div>

                {/* Place Order Button */}
                <div className='flex items-center justify-center'>
                    <Button
                        className="w-full rounded-none bg-primary font-medium py-2"
                        onClick={handlePlaceOrder}
                        disabled={!billingDetails || loading}
                    >
                        {loading ? "Placing Order..." : "Place an Order"}
                    </Button>
                </div>

            </div>
        </div>
    );
};

export default Checkout;