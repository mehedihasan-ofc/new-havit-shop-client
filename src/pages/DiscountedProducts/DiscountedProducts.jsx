import PageHeader from "../../components/Shared/PageHeader/PageHeader";

const DiscountedProducts = () => {

    const discountedProducts = [];

    return (
        <div className="my-container mb-5">
            <PageHeader title="Discounted Products" />

            <p className="mb-6 text-center sm:text-left">We found <span className="text-primary">{discountedProducts?.length}</span> items for you!</p>

            <h6 className="text-4xl font-bold text-center text-gray-800 shadow-md rounded-lg p-4 bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 animate-bounce">
                Under Development
            </h6>
        </div>
    );
};

export default DiscountedProducts;