import { Button } from "@material-tailwind/react";
import { FaArrowRightLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import useDiscountedProducts from "../../../hooks/useDiscountedProducts";
import ProductCard from "../../../components/Card/ProductCard/ProductCard";

const SpecialOffers = () => {

    const [discountedProducts] = useDiscountedProducts();
    const navigate = useNavigate();

     // Early return if no categories exist
     if (!discountedProducts || discountedProducts.length === 0) return null;

    return (
        <div className="my-container mt-10">

            <div className='flex justify-between items-center'>
                <h4 className="text-base md:text-xl font-sans font-bold">Special Offers</h4>
                <Button onClick={() => navigate("/discounted-products")} variant="text" className="flex items-center gap-2 font-serif px-4 py-2 rounded">
                    See All
                    <FaArrowRightLong />
                </Button>
            </div>

            <div className="mt-5 grid grid-cols-2 md:grid-cols-4 gap-5">
                {discountedProducts.map(product => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>

        </div>
    );
};

export default SpecialOffers;