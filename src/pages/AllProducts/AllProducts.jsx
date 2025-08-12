import { useState } from "react";
import ProductCard from "../../components/Card/ProductCard/ProductCard";
import MySpinner from "../../components/Shared/MySpinner/MySpinner";
import PageHeader from "../../components/Shared/PageHeader/PageHeader";
import usePopularProducts from "../../hooks/usePopularProducts";
import { Button } from "@material-tailwind/react";

const AllProducts = () => {

    const [page, setPage] = useState(1);
    const limit = 12;

    const [data, isLoading] = usePopularProducts(page, limit);
    const { products = [], totalPages = 1, total = 0 } = data;

    if (isLoading) {
        return <MySpinner />;
    }

    return (
        <div className="my-container mb-5">
            <PageHeader title="All Products" />

            <p className="mb-6 text-center sm:text-left">
                We found <span className="text-primary">{total}</span> items for you!
            </p>

            <div className="mt-5 grid grid-cols-2 md:grid-cols-4 gap-5">
                {products.map(product => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>

            <div className="flex justify-center items-center gap-4 mt-10">

                <Button
                    className="font-serif text-sm px-8 py-2 bg-primary rounded"
                    onClick={() => setPage(prev => prev - 1)}
                    disabled={page === 1}
                >
                    Prev
                </Button>

                <span>Page {page} of {totalPages}</span>

                <Button
                    className="font-serif text-sm px-8 py-2 bg-primary rounded"
                    onClick={() => setPage(prev => prev + 1)}
                    disabled={page === totalPages}
                >
                    Next
                </Button>

            </div>
        </div>
    );
};

export default AllProducts;