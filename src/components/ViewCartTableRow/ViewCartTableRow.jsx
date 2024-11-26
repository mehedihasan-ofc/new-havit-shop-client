import { IconButton } from "@material-tailwind/react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const ViewCartTableRow = ({ item, index, quantity, onQuantityChange, refetch }) => {
    const [axiosSecure] = useAxiosSecure();

    // Calculate the subtotal for the current product
    const subtotal = item.productDetails.price * quantity;

    // Handle item deletion from the cart
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
                        refetch(); // Refresh cart data
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
        <tr className="border-b">
            {/* Index */}
            <td className="px-4 py-2">{index + 1}</td>

            {/* Product Details */}
            <td className="px-4 py-2 flex items-center space-x-4">
                <img
                    src={item.productDetails.images[0]?.url}
                    alt={item.productDetails.name}
                    className="w-16 h-16 object-cover rounded-md border"
                />
                <span className="text-sm font-semibold">{item.productDetails.name}</span>
            </td>

            {/* Unit Price */}
            <td className="px-4 py-2 font-bold text-gray-600">
                ৳{item.productDetails.price.toFixed(2)}
            </td>

            {/* Quantity Controls */}
            <td className="px-4 py-2">
                <div className="flex items-center space-x-2">
                    <button
                        onClick={() => onQuantityChange(-1)} // Decrease quantity
                        className="px-2 py-1 bg-gray-300 rounded"
                        disabled={quantity <= 1} // Disable if quantity is 1
                    >
                        -
                    </button>
                    <input
                        type="number"
                        value={quantity}
                        className="w-16 text-center border rounded"
                        readOnly // Prevent direct edits
                    />
                    <button
                        onClick={() => onQuantityChange(1)} // Increase quantity
                        className="px-2 py-1 bg-gray-300 rounded"
                    >
                        +
                    </button>
                </div>
            </td>

            {/* Subtotal */}
            <td className="px-4 py-2 font-semibold text-primary">
                ৳{subtotal.toFixed(2)}
            </td>

            {/* Remove Button */}
            <td className="px-4 py-2">
                <IconButton
                    onClick={() => handleDelete(item._id, item.productDetails.name)}
                    color="red"
                    variant="text"
                    className="rounded-full"
                >
                    <IoIosCloseCircleOutline size={22} />
                </IconButton>
            </td>
        </tr>
    );
};

export default ViewCartTableRow;