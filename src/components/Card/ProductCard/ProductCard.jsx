// ProductCard.js

import { Button } from "@material-tailwind/react";
import { BsCartPlus } from "react-icons/bs";

const ProductCard = ({ product }) => {
    const hasDiscount = product.price < product.regularPrice;
    const discountPercentage = Math.round(((product.regularPrice - product.price) / product.regularPrice) * 100);

    return (
        <div className="relative border rounded-lg shadow hover:shadow-md transition-all duration-300 group font-sans">
            <div className="relative overflow-hidden rounded-lg h-44">

                <div className="pl-4 pt-4 pr-4 pb-2">
                    <img
                        src={product.images[0].url}
                        alt={product.images[0].description}
                        className="w-full h-36 object-contain transform transition-transform duration-300 ease-in-out group-hover:scale-110"
                    />
                </div>

                {hasDiscount && (
                    <span className="absolute top-0 left-0 bg-[#f74b81] text-white text-xs font-semibold px-2 py-1 rounded-br-lg">
                        {discountPercentage}% OFF
                    </span>
                )}
            </div>

            <div className="pl-4 pb-4 pr-4">
                <h5 className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">{product.brand}</h5>

                <h5 className="text-[14px] font-semibold mt-1 text-gray-800 group-hover:text-primary truncate transition-all duration-300">
                    {product.name}
                </h5>

                <div className="flex justify-between items-center">
                    <div className="flex items-baseline space-x-2 mt-2">
                        <span className="text-base font-bold text-primary">Tk {product.price.toFixed(2)}</span>

                        {hasDiscount && (
                            <span className="text-sm text-gray-400 line-through">Tk {product.regularPrice.toFixed(2)}</span>
                        )}
                    </div>

                    {/* <button className="text-sm font-medium py-2 rounded-lg mt-4 transition-all duration-300">
                        Add to Cart
                    </button> */}

                    <Button variant="filled" size="sm" className="flex items-center gap-2 rounded bg-primary py-1 px-2 capitalize font-medium text-xs">
                        <BsCartPlus size={14} />
                        Add
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
