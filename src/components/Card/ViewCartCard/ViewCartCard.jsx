import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { IconButton } from "@material-tailwind/react";
import { IoClose } from "react-icons/io5";
import { FiMinus, FiPlus } from "react-icons/fi";

const ViewCartCard = ({ item, quantity, onFlavorChange, onQuantityChange, refetch }) => {
    const [axiosSecure] = useAxiosSecure();
    const subtotal = item?.productDetails?.price * quantity;
    const hasDiscount = item?.productDetails?.price < item?.productDetails?.regularPrice;

    const handleDelete = async (id, name) => {
        Swal.fire({
            title: "Are you sure?",
            text: `You won't be able to revert this!`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const { data } = await axiosSecure.delete(`/carts/${id}`);
                    if (data.deletedCount > 0) {
                        refetch();
                        Swal.fire({
                            title: "Deleted!",
                            text: `${name} has been removed from your cart.`,
                            icon: "success",
                        });
                    } else {
                        Swal.fire({
                            title: "No Items Found",
                            text: `${name} was already removed from your cart.`,
                            icon: "info",
                        });
                    }
                } catch (error) {
                    console.error("Error clearing cart:", error);
                    Swal.fire({
                        title: "Error!",
                        text: `Failed to remove ${name} from the cart. Please try again.`,
                        icon: "error",
                    });
                }
            }
        });
    };

    return (
        <div className="px-4 py-3 border border-gray-200 rounded shadow bg-white">
            <div className="flex justify-between items-center border-b mb-4">
                <div className="relative inline-block px-2 text-white text-sm font-medium bg-primary -skew-x-12">
                    <span className="skew-x-12">Made In: {item?.productDetails?.madeIn}</span>
                </div>

                <IconButton
                    size="sm"
                    onClick={() => handleDelete(item._id, item?.productDetails?.name)}
                    color="red"
                    variant="text"
                    className="rounded-none"
                >
                    <IoClose size={20} />
                </IconButton>
            </div>

            <div className="flex flex-col lg:flex-row items-center justify-between gap-5">
                <div>
                    <img
                        src={item.productDetails?.images[0]?.url}
                        alt={item.productDetails?.name}
                        className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-md border"
                    />
                </div>

                <div className="space-y-2 text-center lg:text-left">
                    <h4 className="text-sm font-semibold">{item?.productDetails?.name}</h4>
                    <div className="flex justify-center lg:justify-start items-center gap-2">
                        <span className="text-base font-bold text-primary">
                            ৳{item?.productDetails?.price.toFixed(2)}
                        </span>
                        {hasDiscount && (
                            <span className="text-sm text-gray-400 line-through">
                                ৳{item?.productDetails?.regularPrice.toFixed(2)}
                            </span>
                        )}
                    </div>
                </div>

                {item?.productDetails?.flavor?.length > 0 ? (
                    <div className="space-y-2">
                        <p className="text-sm text-center text-gray-500">Select Flavour</p>
                        <select
                            className="border px-2 py-1 rounded shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                            onChange={(e) => onFlavorChange(e.target.value)}
                        >
                            <option value="">Choose a flavour</option>
                            {item?.productDetails?.flavor.map((flavor) => (
                                <option key={flavor} value={flavor}>
                                    {flavor}
                                </option>
                            ))}
                        </select>
                    </div>
                ) : (
                    <p className="text-sm text-center text-gray-500 italic">
                        No flavours.
                    </p>
                )}

                <div className="space-y-2">
                    <p className="text-sm text-center text-gray-500">Quantity</p>
                    <div className="flex items-center justify-between w-24 h-8 bg-white rounded-full shadow-sm border mx-auto lg:mx-0">
                        <button
                            onClick={() => onQuantityChange(-1)}
                            disabled={quantity <= 1}
                            className={`flex items-center justify-center w-8 h-full rounded-full transition-all ${quantity > 1
                                ? 'text-primary hover:bg-primary hover:text-white'
                                : 'text-gray-300 cursor-not-allowed'
                                }`}
                        >
                            <FiMinus size={12} />
                        </button>

                        <span className="text-sm font-medium text-gray-800">{quantity}</span>

                        <button
                            onClick={() => onQuantityChange(1)}
                            className="flex items-center justify-center w-8 h-full rounded-full text-primary hover:bg-primary hover:text-white transition-all"
                        >
                            <FiPlus size={12} />
                        </button>
                    </div>
                </div>

                <div className="flex flex-col items-center lg:items-end">
                    <p className="text-sm text-gray-500">Subtotal</p>
                    <p className="text-lg font-semibold text-primary">
                        ৳{subtotal.toFixed(2)}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ViewCartCard;