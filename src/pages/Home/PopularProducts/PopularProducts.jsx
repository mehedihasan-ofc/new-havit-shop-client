import { Button } from "@material-tailwind/react";
import { FaArrowRightLong } from "react-icons/fa6";
import { products } from '../../../database/data';
import ProductCard from "../../../components/Card/ProductCard/ProductCard";

const PopularProducts = () => {

    console.log(products);

    return (
        <div className="my-container my-10">

            <div className='flex justify-between items-center'>
                <h4 className='text-xl font-sans font-bold'>Popular Products</h4>
                <Button variant="text" className="flex items-center gap-2 font-serif px-4 py-2 rounded">
                    See All
                    <FaArrowRightLong />
                </Button>
            </div>

            <div className="mt-5">Coming Soon...</div>

            <div className="mt-5 grid grid-cols-1 md:grid-cols-4 gap-4">
                {products.map(product => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>

        </div>
    );
};

export default PopularProducts;