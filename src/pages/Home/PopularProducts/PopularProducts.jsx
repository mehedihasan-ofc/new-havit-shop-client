import { Button } from "@material-tailwind/react";
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

            <h4 className="text-base md:text-xl font-serif font-bold">Popular Products</h4>

            <div className="my-5 grid grid-cols-2 md:grid-cols-4 gap-5">
                {products.slice(0, 20).map(product => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>

            <div className='text-center'>
                <Button onClick={() => navigate("/products/all")} className="font-serif px-8 py-2 bg-primary rounded">
                    See All
                </Button>
            </div>

        </div>
    );
};

export default PopularProducts;