import { Button, IconButton } from "@material-tailwind/react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaTrash } from "react-icons/fa";
import { useState } from "react";
import useCart from "../../hooks/useCart";
import MySpinner from "../../components/Shared/MySpinner/MySpinner";
import { FaArrowLeftLong } from "react-icons/fa6";
import { IoIosCloseCircleOutline, IoIosLogOut } from "react-icons/io";
import { TbLogout } from "react-icons/tb";

const ViewCart = () => {
    const [cart, isLoading] = useCart();

    // Function to handle quantity change
    const handleQuantityChange = (productId, change) => {
        // Your logic to update the quantity in the cart
    };

    if (isLoading) return <MySpinner />;

    // Calculate total amount
    const totalAmount = cart?.reduce((total, item) => total + item.productDetails.price * item.quantity, 0);

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

            <div className="shadow border">

                {/* Cart Table */}
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
                            {cart?.map((item, index) => {
                                const subtotal = item.productDetails.price * item.quantity;

                                return (
                                    <tr key={item._id} className="border-b">
                                        <td className="px-4 py-2">{index + 1}</td>

                                        {/* Product Details */}
                                        <td className="px-4 py-2 flex items-center space-x-4">
                                            <img
                                                src={item.productDetails.images[0].url}
                                                alt={item.productDetails.name}
                                                className="w-16 h-16 object-cover rounded-md border"
                                            />
                                            <span className="text-sm font-semibold">{item.productDetails.name}</span>
                                        </td>

                                        {/* Unit Price */}
                                        <td className="px-4 py-2 font-bold text-[#7E7E7E]">৳{item.productDetails.price.toFixed(2)}</td>

                                        {/* Quantity */}
                                        <td className="px-4 py-2">
                                            <div className="flex items-center space-x-2">
                                                <button
                                                    onClick={() => handleQuantityChange(item.productId, -1)}
                                                    className="px-2 py-1 bg-gray-300 rounded"
                                                    disabled={item.quantity <= 1}
                                                >
                                                    -
                                                </button>
                                                <input
                                                    type="number"
                                                    value={item.quantity}
                                                    className="w-16 text-center border rounded"
                                                    readOnly
                                                />
                                                <button
                                                    onClick={() => handleQuantityChange(item.productId, 1)}
                                                    className="px-2 py-1 bg-gray-300 rounded"
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </td>

                                        {/* Subtotal */}
                                        <td className="px-4 py-2 font-semibold text-primary">৳{subtotal.toFixed(2)}</td>

                                        {/* Remove Button */}
                                        <td className="px-4 py-2">
                                            <IconButton color="red" variant="text" className="rounded-full">
                                                <IoIosCloseCircleOutline size={22} />
                                            </IconButton>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                <div className="flex justify-end mr-44 py-5">
                    <div className="text-xl font-semibold">
                        Total: <span className="text-primary">৳{totalAmount.toFixed(2)}</span>
                    </div>
                </div>
            </div>

            <div className="flex justify-between items-center mt-5">
                <Button className="rounded-none bg-primary flex items-center gap-2">
                    <FaArrowLeftLong size={16} />
                    Continue Shopping
                </Button>

                <Button className="rounded-none bg-primary flex items-center gap-2">
                    Proceed To Checkout
                    <TbLogout size={18} />
                </Button>
            </div>
        </div>
    );
};

export default ViewCart;