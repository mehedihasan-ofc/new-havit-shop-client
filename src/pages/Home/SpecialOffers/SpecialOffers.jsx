import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import useDiscountedProducts from "../../../hooks/useDiscountedProducts";
import ProductCard from "../../../components/Card/ProductCard/ProductCard";
import SkeletonCard from "../../../components/Card/SkeletonCard/SkeletonCard";

const SpecialOffers = () => {
    const [data, isLoading] = useDiscountedProducts(1, 12);
    const { products = [] } = data;
    const navigate = useNavigate();

    return (
        <div className="my-container">
            <h4 className="text-base md:text-xl font-serif font-bold">Special Offers</h4>

            <div className="my-5 grid grid-cols-2 md:grid-cols-4 gap-5">
                {isLoading
                    ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
                    : products.map(product => (
                        <ProductCard key={product._id} product={product} />
                    ))}
            </div>

            {!isLoading && products.length > 0 && (
                <div className='text-center'>
                    <Button
                        className="font-serif px-8 py-2 bg-primary rounded"
                        onClick={() => navigate("/discounted-products")}
                    >
                        See All
                    </Button>
                </div>
            )}
        </div>
    );
};

export default SpecialOffers;
