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

const ProductCard = ({ product }) => {

    const { user } = useContext(AuthContext);
    const [, refetch] = useCart();

    const navigate = useNavigate();
    const location = useLocation();
    const [loading, setLoading] = useState(false);

    const hasDiscount = product.price < product.regularPrice;
    const discountPercentage = Math.round(((product.regularPrice - product.price) / product.regularPrice) * 100);

    const handleAddToCart = async (productId) => {
        if (user && user.email) {

            const newCart = {
                productId,
                quantity: 1,
                userEmail: user.email
            };

            setLoading(true);

            try {
                const response = await axios.post("https://new-havit-shop-server.vercel.app/carts", newCart);

                if (response.status === 200) {
                    refetch();
                    toast.success(`${product?.name} added to cart!`);
                }

            } catch (error) {
                console.error("Error adding product to cart:", error);
                Swal.fire({
                    icon: 'error',
                    title: 'Failed to add to cart',
                    text: 'Something went wrong. Please try again later.',
                });
            } finally {
                setLoading(false);
            }
        } else {
            Swal.fire({
                title: 'Please Login',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Login Now'
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login', { state: { from: location } });
                }
            });
        }
    };

    return (
        <div className="relative border rounded-lg shadow hover:shadow-md transition-all duration-300 group font-sans">
            <Link to={`/products/product-details/${product?._id}`}>
                <div className="relative overflow-hidden rounded-lg h-44">
                    <div className="pl-4 pt-4 pr-4 pb-2">
                        <img
                            src={product.images[0].url}
                            alt={product.images[0].name}
                            className="w-full h-36 object-contain transform transition-transform duration-300 ease-in-out group-hover:scale-105"
                        />
                    </div>
                    {hasDiscount && (
                        <span className="absolute top-0 left-0 bg-[#f74b81] text-white text-xs font-semibold px-2 py-1 rounded-br-lg">
                            {discountPercentage}% OFF
                        </span>
                    )}
                </div>
            </Link>

            <div className="pl-4 pb-4 pr-4">
                <h5 className="text-[10px] font-semibold text-gray-500 uppercase">{product.brand}</h5>

                <h5 className="text-[14px] font-semibold mt-1 text-gray-800 group-hover:text-primary truncate transition-all duration-300">
                    {product.name}
                </h5>

                <div className="flex items-center gap-2 mt-1 mb-2">
                    <Rating
                        style={{ maxWidth: 70 }}
                        value={product?.rating}
                        readOnly
                    />
                    <div>
                        <span className="text-sm text-gray-400">({product?.rating})</span>
                    </div>
                </div>

                <div className="flex justify-between items-center">
                    <div className="flex items-baseline space-x-2">
                        <span className="text-base font-bold text-primary">Tk {product.price.toFixed(2)}</span>
                        {hasDiscount && (
                            <span className="text-sm text-gray-400 line-through">Tk {product.regularPrice.toFixed(2)}</span>
                        )}
                    </div>

                    <Button 
                        onClick={() => handleAddToCart(product?._id)} 
                        loading={loading} 
                        variant="filled" 
                        size="sm" 
                        className="flex items-center gap-2 rounded bg-primary py-1 px-2 capitalize font-medium text-xs"
                    >
                        {loading ? (
                            <span>Wait</span>
                        ) : (
                            <>
                                <BsCartPlus size={14} />
                                Add
                            </>
                        )}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
