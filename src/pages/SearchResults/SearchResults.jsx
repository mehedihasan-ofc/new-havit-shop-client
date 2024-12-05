import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import MySpinner from "../../components/Shared/MySpinner/MySpinner";
import ProductCard from "../../components/Card/ProductCard/ProductCard";

const SearchResults = () => {
    const { search } = useLocation();
    const query = new URLSearchParams(search).get("q");

    const { data: searchProducts = [], isLoading, isError, error } = useQuery({
        queryKey: ['searchProducts', query], // Include query in the key for dynamic fetching
        queryFn: async () => {
            const res = await fetch(`https://havit-shop.onrender.com/api/products/search?query=${query}`);
            if (!res.ok) {
                throw new Error("Failed to fetch search results.");
            }
            return res.json();
        },
        enabled: !!query, // Only fetch if the query is not null or empty
    });

    if (isLoading) return <MySpinner />;

    if (isError) {
        return (
            <div className="text-center my-10">
                <p className="text-red-600 font-semibold">
                    Error: {error.message || "Something went wrong. Please try again later."}
                </p>
            </div>
        );
    }

    if (searchProducts.length === 0) {
        return (
            <div className="text-center my-10">
                <p className="text-gray-700 text-lg">
                    No products found for <span className="font-semibold text-primary">"{query}"</span>.
                </p>
            </div>
        );
    }

    return (
        <div className="my-container my-10">
            <p className="mb-6 text-center sm:text-left">
                We found <span className="text-primary">{searchProducts?.length}</span> items for you!
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {searchProducts.map((product) => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default SearchResults;
