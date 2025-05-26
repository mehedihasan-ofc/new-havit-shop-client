import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import PageHeader from "../../components/Shared/PageHeader/PageHeader";
import MySpinner from "../../components/Shared/MySpinner/MySpinner";
import ProductCard from "../../components/Card/ProductCard/ProductCard";

const ProductsByCategory = () => {
    const { categoryId } = useParams();

    const { data, isLoading } = useQuery({
        queryKey: ['categoryAndProducts', categoryId],
        queryFn: async () => {
            const response = await axios.get(`https://server.havitshopbd.com/products/category/${categoryId}`);
            return response.data;
        },
        enabled: !!categoryId
    });

    if (isLoading) return <MySpinner />;

    const { category, products } = data || {};

    return (
        <div className="my-container mb-5">
            
            <PageHeader title={category?.name} />

            <p className="mb-6 text-center sm:text-left">
                We found <span className="text-primary">{products?.length}</span> items for you!
            </p>

            <div className="mt-5 grid grid-cols-2 md:grid-cols-4 gap-5">
                {products.map(product => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default ProductsByCategory;