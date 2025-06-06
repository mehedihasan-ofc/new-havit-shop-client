import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext, useState } from "react";
import MySpinner from "../../components/Shared/MySpinner/MySpinner";
import { Rating } from "@smastrom/react-rating";
import { BsCartPlus } from "react-icons/bs";
import { FaMinus, FaPlus } from "react-icons/fa6";
import ProductImageGallery from "../../components/ProductImageGallery/ProductImageGallery";
import RelatedProducts from "../../components/RelatedProducts/RelatedProducts";
import { AuthContext } from "../../provider/AuthProvider";
import useCart from "../../hooks/useCart";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { Button } from "@material-tailwind/react";
import ProductDetailsAd from "../../components/Ads/ProductDetailsAd/ProductDetailsAd";
import ReactPlayer from 'react-player/lazy';
import useRole from "../../hooks/useRole";

const ProductDetails = () => {
    const [role] = useRole();
    const { user } = useContext(AuthContext);
    const [, , refetch] = useCart();

    const navigate = useNavigate();
    const location = useLocation();

    const { productId } = useParams();
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(false);

    const { data: product, isLoading } = useQuery({
        queryKey: ['product', productId],
        queryFn: async () => {
            const response = await axios.get(`https://server.havitshopbd.com/products/${productId}`);
            return response.data;
        },
        enabled: !!productId,
    });

    if (isLoading) return <MySpinner />;
    if (!product) return <div className="text-center mt-10 text-lg text-gray-500">Product not found</div>;

    const hasDiscount = product.price < product.regularPrice;
    const discountPercentage = hasDiscount
        ? Math.round(((product.regularPrice - product.price) / product.regularPrice) * 100)
        : 0;

    const handleAddToCart = async (productId) => {
        if (role === "admin") {
            toast.info("Admins cannot add products to the cart.", {
                autoClose: 1000,
            });
            return;
        }

        if (user && user.email) {
            const newCart = {
                productId,
                quantity,
                userEmail: user.email
            };

            setLoading(true);

            try {
                const response = await axios.post("https://server.havitshopbd.com/carts", newCart);

                if (response.status === 200) {
                    refetch();
                    toast.success(`${product?.name} added to cart!`, {
                        autoClose: 1000,
                    });
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
        <div className="my-container my-5">
            {/* Product Card */}
            <div className="grid gap-5 grid-cols-1 lg:grid-cols-2 bg-white dark:bg-gray-900 rounded-lg shadow border overflow-hidden transition-all duration-300">
                {/* Product Image Gallery */}
                <ProductImageGallery images={product.images} />

                {/* Details Section */}
                <div className="p-6 lg:p-8 space-y-4">
                    <div className="space-y-1">
                        <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-900 font-serif dark:text-gray-50">{product.name}</h2>
                        <p className="text-xs">SKU: <span className="font-medium">{product.skuCode}</span></p>
                    </div>

                    {product.flavor?.length > 0 && (
                        <div>
                            <p className="font-medium text-gray-900 dark:text-gray-100 mb-1">Available flavours:</p>
                            <div className="flex flex-wrap gap-2">
                                {product.flavor.map((flavor, index) => (
                                    <span
                                        key={index}
                                        className="px-3 py-1 bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary text-xs font-semibold rounded-full"
                                    >
                                        {flavor}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="flex items-center gap-3">
                        <Rating style={{ maxWidth: 100 }} value={product.rating} readOnly />
                        <span className="text-sm text-gray-500 dark:text-gray-400">({product.rating})</span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 text-lg sm:text-xl font-bold text-primary dark:text-white">
                        <span>৳{product.price.toFixed(2)}</span>
                        {hasDiscount && (
                            <>
                                <span className="text-gray-400 line-through text-base">৳{product.regularPrice.toFixed(2)}</span>
                                <span className="text-sm text-red-500 font-medium">{discountPercentage}% OFF</span>
                            </>
                        )}
                    </div>

                    <div className="text-gray-700 dark:text-gray-300 space-y-1 text-sm">
                        <p>Brand: <span className="font-medium">{product.brand}</span></p>
                        <p>Made In: <span className="font-medium">{product.madeIn}</span></p>
                        <p>Available Stock: <span className="font-medium">{product.availableStock}</span></p>
                    </div>

                    {product.availableStock > 0 ? (
                        <div className="flex flex-col sm:flex-row items-start sm:items-center sm:space-x-4 space-y-3 sm:space-y-0">
                            <div className="flex items-center border border-gray-300 dark:border-gray-700 rounded-none overflow-hidden shadow-sm">
                                <button
                                    onClick={() => setQuantity(prev => Math.max(prev - 1, 1))}
                                    className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                                >
                                    <FaMinus size={14} />
                                </button>
                                <input
                                    type="number"
                                    value={quantity}
                                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value)))}
                                    className="w-12 text-center text-gray-900 dark:text-white bg-transparent outline-none"
                                />
                                <button
                                    onClick={() => setQuantity(prev => prev + 1)}
                                    className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                                >
                                    <FaPlus size={14} />
                                </button>
                            </div>

                            <Button
                                onClick={() => handleAddToCart(product?._id)}
                                loading={loading}
                                variant="filled"
                                className="flex items-center gap-2 rounded-none bg-primary py-2 font-medium text-xs"
                            >
                                {loading ? (
                                    <span>Adding to Cart</span>
                                ) : (
                                    <>
                                        <BsCartPlus size={18} />
                                        Add to Cart
                                    </>
                                )}
                            </Button>
                        </div>
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

            {product?.videoLink && (
                <div className="rounded-lg shadow border p-2 mt-5">
                    <div className="w-full h-[250px] sm:h-[300px] md:h-[400px] lg:h-[500px]">
                        <ReactPlayer
                            controls={true}
                            width="100%"
                            height="100%"
                            url={product?.videoLink}
                        />
                    </div>
                </div>
            )}

            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow mt-5">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">Product Description</h3>
                {product?.content?.map((item) => (
                    <div key={item?._id} className="space-y-2">
                        <h4 className="font-bold">{item?.title}</h4>
                        <p>{item?.description}</p>
                    </div>
                ))}
            </div>

            <RelatedProducts categoryId={product?.categoryId} />

            <ProductDetailsAd />
        </div>
    );
};

export default ProductDetails;