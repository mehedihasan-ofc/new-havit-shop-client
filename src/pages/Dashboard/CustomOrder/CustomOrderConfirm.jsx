import { useLocation, useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";
import { Button } from "@material-tailwind/react";
import { toast } from "react-toastify";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const CustomOrderConfirm = () => {
  const { state } = useLocation();
  const { name, phone, city, area, address, additionalInfo, products } = state || {};

  const [axiosSecure] = useAxiosSecure();
  const navigate = useNavigate();

  const [discount, setDiscount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("cash_on_delivery");
  const [paymentStatus, setPaymentStatus] = useState("pending");
  const [paidAmount, setPaidAmount] = useState(0);
  const [deliveryStatus, setDeliveryStatus] = useState("pending");
  const [loading, setLoading] = useState(false);

  const subtotal = useMemo(() => {
    return products.reduce((acc, p) => acc + p.price * p.quantity, 0);
  }, [products]);

  const shipping = city?.toLowerCase() === "dhaka" ? 100 : 150;
  const total = subtotal - discount + shipping;

  const payableTotal = useMemo(() => {
    const paid = paymentStatus === "due" ? paidAmount : 0;
    return Math.max(total - paid, 0);
  }, [total, paymentStatus, paidAmount]);

  const handleSubmit = async () => {
    setLoading(true);

    const customOrderPayload = {
      customer: { name, phone, city, area, address, additionalInfo },
      products: products.map(p => ({ productId: p.productId, quantity: p.quantity })),
      discount,
      paymentMethod,
      paymentStatus,
      paidAmount: paymentStatus === "due" ? paidAmount : paymentStatus === "paid" ? total : 0,
      deliveryStatus,
      subtotal,
      shipping,
      total,
      createdAt: new Date().toISOString()
    };

    try {
      const { data } = await axiosSecure.post("/custom-orders", customOrderPayload);

      if (data.insertedId) {
        toast.success("Order Confirmed!", {
          position: "top-right",
          autoClose: 1500,
          pauseOnHover: false,
        });
        navigate("/dashboard/custom-order");
      } else {
        console.error("Order creation failed, no insertedId.");
        toast.error("Order creation failed.");
      }

    } catch (err) {
      console.error("❌ Error while confirming order:", err);
      toast.error("Failed to confirm order.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-5 shadow-md rounded-md border space-y-4">
      <h2 className="text-3xl font-bold text-center font-serif">Custom Order Confirmation</h2>

      <div className="grid md:grid-cols-2 gap-5">
        {/* Customer Info */}
        <div className="border rounded p-5">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Customer Info</h2>
          <div className="text-gray-600 space-y-2">
            <p><strong>Name:</strong> {name}</p>
            <p><strong>Phone:</strong> {phone}</p>
            <p><strong>City:</strong> {city}</p>
            <p><strong>Area:</strong> {area}</p>
            <p><strong>Address:</strong> {address}</p>
            {additionalInfo && <p><strong>Note:</strong> {additionalInfo}</p>}
          </div>
        </div>

        {/* Products */}
        <div className="border rounded p-5">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Products</h2>
          <div className="space-y-3 h-80 overflow-scroll">
            {products.map((product) => (
              <div
                key={product?.skuCode}
                className="flex justify-between items-center bg-gray-50 p-3 rounded-xl shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded-md border" />
                  <div>
                    <p className="text-sm text-gray-600 font-medium">SKU: {product.skuCode}</p>
                    <p className="font-medium line-clamp-2">{product.name}</p>
                    <p className="text-sm text-gray-500">Flavor: {product.flavor || "N/A"}</p>
                  </div>
                </div>
                <p className="font-semibold">x{product.quantity}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Order Settings */}
      <div className="border rounded p-5">
        <h2 className="text-xl font-semibold mb-6 text-gray-700">Order Settings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1">Discount (৳)</label>
            <input
              type="number"
              value={discount}
              onChange={(e) => setDiscount(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Payment Method</label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
            >
              <option value="cash_on_delivery">Cash on delivery</option>
              <option value="bkash_payment">Bkash Payment</option>
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
          {paymentStatus === "due" && (
            <div>
              <label className="block text-sm font-medium mb-1">Already Paid (৳)</label>
              <input
                type="number"
                value={paidAmount}
                onChange={(e) => {
                  const value = Number(e.target.value);
                  setPaidAmount(value > total ? total : value);
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-1">Delivery Status</label>
            <select
              value={deliveryStatus}
              onChange={(e) => setDeliveryStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
            >
              <option value="">Select a status</option>
              {["pending", "confirmed", "packaging", "out_for_delivery", "delivered", "returned", "failed_to_deliver", "canceled"].map(status => (
                <option key={status} value={status}>
                  {status.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
                </option>
              ))}
            </select>
          </div>

        </div>
      </div>

      {/* Summary */}
      <div className="text-right border rounded p-5">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Summary</h2>
        <div className="text-gray-600 space-y-1">
          <p><strong>Subtotal:</strong> ৳{subtotal}</p>
          <p><strong>Discount:</strong> -৳{discount}</p>
          <p><strong>Shipping:</strong> ৳{shipping}</p>
          <hr className="my-2" />
          <p><strong>Total:</strong> ৳{total}</p>
          {paymentStatus === "due" && (
            <p><strong>Already Paid:</strong> ৳{paidAmount}</p>
          )}
          {paymentStatus === "due" && (
            <>
              <hr className="my-2" />
              <p className="text-2xl font-bold text-emerald-600">
                Payable Total: ৳{payableTotal}
              </p>
            </>
          )}
        </div>
      </div>

      {/* Submit Button */}
      <div className='flex items-center justify-center'>
        <Button
          onClick={handleSubmit}
          className='rounded-none bg-primary font-medium px-10'
          disabled={loading}
        >
          {loading ? "Processing..." : "Confirm Order"}
        </Button>
      </div>
    </div>
  );
};

export default CustomOrderConfirm;
