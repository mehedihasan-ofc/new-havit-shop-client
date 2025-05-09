import { Button } from "@material-tailwind/react";
import { FaArrowRightLong } from "react-icons/fa6";
import ProductCard from "../../../components/Card/ProductCard/ProductCard";
import useProducts from "../../../hooks/useProducts";
import { useNavigate } from "react-router-dom";

const PopularProducts = () => {

    const [products] = useProducts();
    const navigate = useNavigate();

     // Early return if no categories exist
     if (!products || products.length === 0) return null;

    return (
        <div className="my-container">

            <div className='flex justify-between items-center'>
                <h4 className="text-base md:text-xl font-serif font-bold">Popular Products</h4>
                <Button onClick={() => navigate("/products/all")} variant="text" className="flex items-center gap-2 font-serif px-4 py-2 rounded">
                    See All
                    <FaArrowRightLong />
                </Button>
            </div>

            <div className="mt-5 grid grid-cols-2 md:grid-cols-4 gap-5">
                {products.map(product => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>

        </div>
    );
};

export default PopularProducts;