import ProductCard from "../../components/Card/ProductCard/ProductCard";
import MySpinner from "../../components/Shared/MySpinner/MySpinner";
import PageHeader from "../../components/Shared/PageHeader/PageHeader";
import useDiscountedProducts from "../../hooks/useDiscountedProducts";

const DiscountedProducts = () => {

    const [discountedProducts, isLoading] = useDiscountedProducts();

    if (isLoading) {
        return <MySpinner />;
    }

    return (
        <div className="my-container mb-5">
            <PageHeader title="Discounted Products" />

            <p className="mb-6 text-center sm:text-left">We found <span className="text-primary">{discountedProducts?.length}</span> items for you!</p>

            <div className="mt-5 grid grid-cols-2 md:grid-cols-4 gap-5">
                {discountedProducts.map(product => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default DiscountedProducts;