import { Button } from "@material-tailwind/react";
import { BsCartPlus } from "react-icons/bs";
import { Rating } from '@smastrom/react-rating';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../../provider/AuthProvider";
import Swal from "sweetalert2";
import axios from "axios";
import { toast } from "react-toastify";
import useCart from "../../../hooks/useCart";
import useRole from "../../../hooks/useRole";

const ProductCard = ({ product }) => {
    const [role] = useRole();
    const { user } = useContext(AuthContext);
    const [, , refetch] = useCart();
    const navigate = useNavigate();
    const location = useLocation();
    const [loading, setLoading] = useState(false);

    const hasDiscount = product.price < product.regularPrice;
    const discountPercentage = Math.round(((product.regularPrice - product.price) / product.regularPrice) * 100);

    const handleAddToCart = async (productId) => {
        if (role === "admin") {
            toast.info("Admins cannot add products to the cart.", { autoClose: 1000 });
            return;
        }

        if (user && user.email) {
            const newCart = {
                productId,
                quantity: 1,
                userEmail: user.email,
            };

            setLoading(true);

            try {
                const response = await axios.post("https://server.havitshopbd.com/carts", newCart);
                if (response.status === 200) {
                    refetch();
                    toast.success(`${product?.name} added to cart!`, { autoClose: 1000 });
                }
            } catch (error) {
                console.error("Error adding product to cart:", error);
                Swal.fire({
                    icon: "error",
                    title: "Failed to add to cart",
                    text: "Something went wrong. Please try again later.",
                });
            } finally {
                setLoading(false);
            }
        } else {
            Swal.fire({
                title: "Please Login",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Login Now",
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate("/login", { state: { from: location } });
                }
            });
        }
    };

    return (
        <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-full border rounded-lg shadow hover:shadow-md transition-all duration-300 group font-sans bg-white flex flex-col mx-auto">
            <Link to={`/products/product-details/${product?._id}`}>
                <div className="relative overflow-hidden rounded-t-lg h-44 sm:h-52 md:h-56 lg:h-60">
                    <div className="p-3 sm:p-4">
                        <img
                            src={product.images[0].url}
                            alt={product.images[0].name}
                            className="w-full h-36 sm:h-40 md:h-44 object-contain transform transition-transform duration-300 ease-in-out group-hover:scale-105"
                        />
                    </div>
                    {hasDiscount && (
                        <span className="absolute top-0 left-0 bg-[#f74b81] text-white text-xs font-semibold px-2 py-1 rounded-br-lg z-10">
                            {discountPercentage}% OFF
                        </span>
                    )}
                </div>
            </Link>

            <div className="flex flex-col px-3 sm:px-4 pb-4 flex-grow">
                <h5 className="text-[10px] font-semibold text-gray-500 uppercase">{product.brand}</h5>

                <h5 className="text-[14px] sm:text-sm font-semibold mt-1 text-gray-800 group-hover:text-primary line-clamp-1 transition-all duration-300">
                    {product.name}
                </h5>

                <div className="flex items-center gap-2 mt-1 flex-wrap">
                    <Rating style={{ maxWidth: 70 }} value={product?.rating} readOnly />
                    <span className="text-xs text-gray-400">({product?.rating})</span>
                    <span className="text-xs text-gray-400">{product.soldCount} Sold</span>
                </div>

                <div className="flex justify-between items-center my-2 flex-wrap">
                    <div className="flex items-baseline space-x-2">
                        <span className="text-sm font-bold text-primary">৳{product.price.toFixed(2)}</span>
                        {hasDiscount && (
                            <span className="bg-secondary text-primary px-2 rounded text-xs line-through">
                                ৳{product.regularPrice.toFixed(2)}
                            </span>
                        )}
                    </div>
                </div>

                {product.availableStock > 0 ? (
                    <Button
                        onClick={() => handleAddToCart(product?._id)}
                        loading={loading}
                        variant="filled"
                        size="sm"
                        className="w-full flex items-center justify-center gap-2 rounded bg-primary py-2 px-3 capitalize font-medium text-xs"
                    >
                        {loading ? <span>Wait</span> : (<><BsCartPlus size={16} /> Add</>)}
                    </Button>
                ) : (
                    <Button
                        disabled
                        variant="outlined"
                        size="sm"
                        className="w-full flex items-center justify-center gap-2 rounded border-red-600 text-red-600 py-2 px-3 capitalize font-bold text-xs"
                    >
                        Out of Stock
                    </Button>
                )}
            </div>
        </div>
    );
};

export default ProductCard;
