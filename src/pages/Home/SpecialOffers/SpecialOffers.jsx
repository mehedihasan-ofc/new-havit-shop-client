import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import useDiscountedProducts from "../../../hooks/useDiscountedProducts";
import ProductCard from "../../../components/Card/ProductCard/ProductCard";

const SpecialOffers = () => {

    const [discountedProducts] = useDiscountedProducts();
    const navigate = useNavigate();

    // Early return if no categories exist
    if (!discountedProducts || discountedProducts.length === 0) return null;

    return (
        <div className="my-container">

            <h4 className="text-base md:text-xl font-serif font-bold">Special Offers</h4>

            <div className="my-5 grid grid-cols-2 md:grid-cols-4 gap-5">
                {discountedProducts.slice(0, 20).map(product => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>

            <div className='text-center'>
                <Button className="font-serif px-8 py-2 bg-primary rounded" onClick={() => navigate("/discounted-products")}>See All</Button>
            </div>

        </div>
    );
};

export default SpecialOffers;