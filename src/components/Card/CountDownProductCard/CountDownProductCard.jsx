import { Button } from "@material-tailwind/react";
import { BsCartPlus } from "react-icons/bs";
import { Rating } from "@smastrom/react-rating";
import { Link } from "react-router-dom";

const CountDownProductCard = ({ product, discountType, discountValue }) => {
    // Calculate discount and prices
    const originalPrice = product.regularPrice || product.price;
    let discountedPrice = product.price;

    if (discountType === "percent") {
        discountedPrice = originalPrice - (originalPrice * discountValue) / 100;
    } else if (discountType === "tk") {
        discountedPrice = originalPrice - discountValue;
    }

    const discountPercentage = Math.round(((originalPrice - discountedPrice) / originalPrice) * 100);

    return (
        <div className="relative border rounded-lg shadow hover:shadow-md transition-all duration-300 group font-sans bg-white">
            {/* <Link to={`/products/product-details/${product._id}`}> */}
                <div className="relative overflow-hidden rounded-lg h-44">
                    <div className="pl-4 pt-4 pr-4 pb-2">
                        <img
                            src={product.images[0].url}
                            alt={product.name}
                            className="w-full h-36 object-contain transform transition-transform duration-300 ease-in-out group-hover:scale-105"
                        />
                    </div>
                    {discountPercentage > 0 && (
                        <span className="absolute top-0 left-0 bg-[#f74b81] text-white text-xs font-semibold px-2 py-1 rounded-br-lg">
                            {discountPercentage}% OFF
                        </span>
                    )}
                </div>
            {/* </Link> */}

            <div className="pl-4 pb-4 pr-4">
                <h5 className="text-[10px] font-semibold text-gray-500 uppercase">{product.brand}</h5>

                <h5 className="text-[14px] font-semibold mt-1 text-gray-800 group-hover:text-primary truncate transition-all duration-300">
                    {product.name}
                </h5>

                <div className="flex items-center gap-2 mt-1">
                    <Rating style={{ maxWidth: 70 }} value={product.rating} readOnly />
                    <div>
                        <span className="text-sm text-gray-400">({product.rating})</span>
                    </div>

                    <div>
                        <span className="text-xs text-gray-400 font-body">{product.soldCount} Sold</span>
                    </div>
                </div>

                <div className="flex justify-between items-center my-2">
                    <div className="flex items-baseline space-x-2">
                        <span className="text-base font-bold text-primary">৳{discountedPrice.toFixed(2)}</span>
                        {discountPercentage > 0 && (
                            <div className="bg-secondary text-primary px-2">
                                <span className="text-xs line-through">৳{originalPrice.toFixed(2)}</span>
                            </div>
                        )}
                    </div>
                </div>

                {product.availableStock > 0 ? (
                    <Button
                        variant="filled"
                        size="sm"
                        className="w-full flex items-center justify-center gap-2 rounded bg-primary py-2 px-3 capitalize font-medium text-xs"
                    >
                        <BsCartPlus size={16} />
                        Add to Cart
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

export default CountDownProductCard;