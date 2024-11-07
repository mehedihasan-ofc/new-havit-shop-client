import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import MySpinner from "../../components/Shared/MySpinner/MySpinner";
import { Rating } from "@smastrom/react-rating";
import { Button } from "@material-tailwind/react";
import { BsCartPlus } from "react-icons/bs";
import { FaMinus, FaPlus } from "react-icons/fa6";

const ProductDetails = () => {
    const { productId } = useParams();
    const [quantity, setQuantity] = useState(1);

    const { data: product, isLoading } = useQuery({
        queryKey: ['product', productId],
        queryFn: async () => {
            const response = await axios.get(`https://new-havit-shop-server.vercel.app/products/${productId}`);
            return response.data;
        },
        enabled: !!productId,
    });

    if (isLoading) return <MySpinner />;
    if (!product) return <div>Product not found</div>;

    const hasDiscount = product.price < product.regularPrice;
    const discountPercentage = hasDiscount
        ? Math.round(((product.regularPrice - product.price) / product.regularPrice) * 100)
        : 0;

    const handleAddToCart = () => {
        // Implement your add-to-cart logic here
        console.log(`Added ${quantity} of ${product.name} to the cart.`);
    };

    return (
        <div className="my-container my-10">
            <div className="grid grid-cols-2 gap-5">
                <div>
                    {/* Display product images here */}
                    images
                </div>

                <div className="space-y-3">
                    <h2 className="font-bold text-4xl">{product.name}</h2>
                    <div className="flex items-center gap-2">
                        <Rating style={{ maxWidth: 100 }} value={product.rating} readOnly />
                        <span className="text-sm text-gray-400">({product.rating})</span>
                    </div>
                    <div className="flex items-baseline space-x-2">
                        <span className="text-2xl font-bold text-primary">Tk {product.price.toFixed(2)}</span>
                        {hasDiscount && (
                            <>
                                <span className="text-base text-gray-400 line-through">Tk {product.regularPrice.toFixed(2)}</span>
                                <span className="text-sm text-red-500 font-semibold">{discountPercentage}% OFF</span>
                            </>
                        )}
                    </div>
                    <div>
                        <p className="text-gray-700">{product.brand}</p>
                        <p className="text-gray-500">Available Stock: {product.availableStock}</p>
                    </div>

                    {/* Quantity and Add to Cart Button */}
                    <div className="flex items-center space-x-4 mt-5">
                        <div className="flex items-center border rounded">
                            <button
                                onClick={() => setQuantity(prev => Math.max(prev - 1, 1))}
                                className="p-4 text-gray-600 hover:text-primary transition"
                            >
                                <FaMinus size={12} />
                            </button>
                            <input
                                type="number"
                                value={quantity}
                                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value)))}
                                className="w-12 text-center outline-none"
                            />
                            <button
                                onClick={() => setQuantity(prev => prev + 1)}
                                className="p-4 text-gray-600 hover:text-primary transition"
                            >
                                <FaPlus size={12} />
                            </button>
                        </div>

                        <Button onClick={handleAddToCart} variant="filled" size="sm" className="flex items-center gap-2 rounded bg-primary capitalize font-medium py-3">
                            <BsCartPlus size={18} />
                            Add to Cart
                        </Button>
                    </div>
                </div>
            </div>

            <div className="border border-gray-200 bg-gray-50 p-6 mt-10 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Product Description</h3>
                <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </div>
        </div>
    );
};

export default ProductDetails;