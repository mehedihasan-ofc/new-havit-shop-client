import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import MySpinner from "../Shared/MySpinner/MySpinner";
import ProductCard from "../Card/ProductCard/ProductCard";

const RelatedProducts = ({ categoryId }) => {
    // Fetch related products based on the current productId
    const { data: relatedProducts, isLoading } = useQuery({
        queryKey: ['relatedProducts', categoryId],
        queryFn: async () => {
            const response = await axios.get(`https://server.havitshopbd.com/products/related/${categoryId}`);
            return response.data;
        },
        enabled: !!categoryId,
    });

    if (isLoading) return <MySpinner />;

    return (
        <div className="mt-5">
            <h3 className="text-xl font-semibold mb-4">Related Products</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {relatedProducts?.products?.map((product) => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default RelatedProducts;