import ProductCard from "../../components/Card/ProductCard/ProductCard";
import MySpinner from "../../components/Shared/MySpinner/MySpinner";
import PageHeader from "../../components/Shared/PageHeader/PageHeader";
import useProducts from "../../hooks/useProducts";

const AllProducts = () => {
    const [products, loading] = useProducts();

    if (loading) {
        return <MySpinner />;
    }

    return (
        <div className="my-container mb-5">
            <PageHeader title="All Products" />
            
            <p className="mb-6 text-center sm:text-left">
                We found <span className="text-primary">{products?.length}</span> items for you!
            </p>

            <div className="mt-5 grid grid-cols-1 md:grid-cols-4 gap-5">
                {products.map(product => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default AllProducts;