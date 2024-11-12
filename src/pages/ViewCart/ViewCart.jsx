import { useState } from "react";
import { Button } from "@material-tailwind/react";
import { RiDeleteBin6Line } from "react-icons/ri";
import useCart from "../../hooks/useCart";
import MySpinner from "../../components/Shared/MySpinner/MySpinner";
import { FaArrowLeftLong } from "react-icons/fa6";
import { TbLogout } from "react-icons/tb";
import ViewCartTableRow from "../../components/ViewCartTableRow/ViewCartTableRow";
import { useNavigate } from "react-router-dom";

const ViewCart = () => {
    const [cart, isLoading] = useCart();
    const [quantities, setQuantities] = useState(cart?.map(item => item.quantity));
    const navigate = useNavigate();

    if (isLoading) return <MySpinner />;

    const handleQuantityChange = (index, change) => {
        setQuantities(prevQuantities => {
            const updatedQuantities = [...prevQuantities];
            updatedQuantities[index] = Math.max(1, updatedQuantities[index] + change);
            return updatedQuantities;
        });
    };

    const calculateTotalAmount = () =>
        cart?.reduce((total, item, index) => total + item.productDetails.price * quantities[index], 0);

    const handleProceedToCheckout = () => {

        const checkoutData = {
            total: calculateTotalAmount(),
            products: cart.map((item, index) => ({
                ...item.productDetails,
                productId: item.productId,
                quantity: quantities[index],
            }))
        };
        navigate("/checkout", { state: { checkoutData } });
    };


    return (
        <div className="max-w-5xl w-full mx-auto px-6 my-5">
            {/* Header */}
            <div className="flex justify-between items-end mb-4">
                <div className="space-y-1">
                    <h2 className="text-4xl font-extrabold tracking-wide font-sans">Your Cart</h2>
                    <p>There are <span className="text-primary">{cart?.length}</span> products in your cart!</p>
                </div>
                <Button variant="text" className="flex items-center rounded-none p-2 gap-2 text-red-600">
                    <RiDeleteBin6Line size={16} />
                    Clear Cart
                </Button>
            </div>

            {/* Cart Table */}
            <div className="shadow border">
                <div className="overflow-x-auto">
                    <table className="min-w-full table-auto border-collapse text-left font-sans">
                        <thead>
                            <tr className="bg-gray-100 text-sm">
                                <th className="px-4 py-2 border-b">#</th>
                                <th className="px-4 py-2 border-b">Product</th>
                                <th className="px-4 py-2 border-b">Unit Price</th>
                                <th className="px-4 py-2 border-b">Quantity</th>
                                <th className="px-4 py-2 border-b">Subtotal</th>
                                <th className="px-4 py-2 border-b">Remove</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart?.map((item, index) => (
                                <ViewCartTableRow
                                    key={item._id}
                                    item={item}
                                    index={index}
                                    quantity={quantities[index]}
                                    onQuantityChange={(change) => handleQuantityChange(index, change)}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="flex justify-end mr-44 py-5">
                    <div className="text-xl font-semibold">
                        Total: <span className="text-primary">৳{calculateTotalAmount().toFixed(2)}</span>
                    </div>
                </div>
            </div>

            <div className="flex justify-between items-center mt-5">
                <Button onClick={() => navigate("/")} className="rounded-none bg-primary flex items-center gap-2">
                    <FaArrowLeftLong size={16} />
                    Continue Shopping
                </Button>

                <Button onClick={handleProceedToCheckout} className="rounded-none bg-primary flex items-center gap-2">
                    Proceed To Checkout
                    <TbLogout size={18} />
                </Button>
            </div>
        </div>
    );
};

export default ViewCart;