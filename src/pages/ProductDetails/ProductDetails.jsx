import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import MySpinner from "../../components/Shared/MySpinner/MySpinner";
import { Rating } from "@smastrom/react-rating";
import { BsCartPlus } from "react-icons/bs";
import { FaMinus, FaPlus } from "react-icons/fa6";
import ProductImageGallery from "../../components/ProductImageGallery/ProductImageGallery";
import RelatedProducts from "../../components/RelatedProducts/RelatedProducts";

const ProductDetails = () => {
    const { productId } = useParams();
    const [quantity, setQuantity] = useState(1);

    // Fetch product data
    const { data: product, isLoading } = useQuery({
        queryKey: ['product', productId],
        queryFn: async () => {
            const response = await axios.get(`https://new-havit-shop-server.vercel.app/products/${productId}`);
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

    const handleAddToCart = () => {
        console.log(`Added ${quantity} of ${product.name} to the cart.`);
    };

    return (
        <div className="my-container my-5">
            {/* Product Card */}
            <div className="grid gap-5 md:grid-cols-2 bg-white dark:bg-gray-900 rounded-lg shadow border overflow-hidden transition-all duration-300">
                
                {/* Product Image Gallery */}
                <ProductImageGallery images={product.images} />

                {/* Details Section */}
                <div className="p-6 lg:p-8 space-y-6">
                    <h2 className="text-2xl lg:text-3xl font-semibold text-gray-900 dark:text-gray-50">{product.name}</h2>

                    {/* Rating */}
                    <div className="flex items-center gap-3">
                        <Rating style={{ maxWidth: 100 }} value={product.rating} readOnly />
                        <span className="text-sm text-gray-500 dark:text-gray-400">({product.rating})</span>
                    </div>

                    {/* Price */}
                    <div className="flex items-center gap-3 text-xl font-bold text-primary dark:text-white">
                        <span>Tk {product.price.toFixed(2)}</span>
                        {hasDiscount && (
                            <>
                                <span className="text-gray-400 line-through text-base">Tk {product.regularPrice.toFixed(2)}</span>
                                <span className="text-sm text-red-500 font-medium">{discountPercentage}% OFF</span>
                            </>
                        )}
                    </div>

                    {/* Additional Details */}
                    <div className="text-gray-700 dark:text-gray-300 space-y-1">
                        <p>Brand: <span className="font-medium">{product.brand}</span></p>
                        <p>Stock: <span className="font-medium">{product.availableStock}</span></p>
                    </div>

                    {/* Quantity & Add to Cart */}
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center border border-gray-300 dark:border-gray-700 rounded-md overflow-hidden shadow-sm">
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

                        <button
                            onClick={handleAddToCart}
                            className="flex items-center gap-2 bg-primary text-white rounded-lg px-5 py-2 transition-transform duration-200 transform hover:scale-105 shadow-lg"
                        >
                            <BsCartPlus size={18} />
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>

            {/* Description */}
            <div className="mt-10 bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">Product Description</h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{product.description}</p>
            </div>

            {/* Related Products */}
            <RelatedProducts categoryId={product?.categoryId} />
        </div>
    );
};

export default ProductDetails;
