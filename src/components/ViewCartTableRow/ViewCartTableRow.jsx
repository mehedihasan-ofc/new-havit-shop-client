import { IconButton } from "@material-tailwind/react";
import { IoIosCloseCircleOutline } from "react-icons/io";

const ViewCartTableRow = ({item, index}) => {
    
    const subtotal = item?.productDetails?.price * item?.quantity;

    const handleDelete = (productId) => {
        console.log(productId);
    }

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
                <IconButton onClick={() => handleDelete(item?._id)} color="red" variant="text" className="rounded-full">
                    <IoIosCloseCircleOutline size={22} />
                </IconButton>
            </td>
        </tr>
    );
};

export default ViewCartTableRow;