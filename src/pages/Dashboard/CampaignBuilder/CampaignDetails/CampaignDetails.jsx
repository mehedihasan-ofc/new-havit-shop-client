import React from "react";
import MySpinner from "../../../../components/Shared/MySpinner/MySpinner";
import useCampaign from "../../../../hooks/useCampaign";

const CampaignDetails = () => {
    const [campaignData, loading] = useCampaign();

    if (loading) return <MySpinner />;

    if (!campaignData) {
        return <div className="text-center text-gray-500">No campaign data available</div>;
    }

    const { title, subtitle, discountType, expiredDate, products } = campaignData;

    return (
        <div className="p-6 bg-white shadow-md rounded-lg">
            {/* Campaign Header */}
            <div className="mb-6 border-b pb-4">
                <h1 className="text-2xl font-semibold text-gray-800">{title}</h1>
                <p className="text-gray-600">{subtitle}</p>
                <div className="flex items-center justify-between mt-4 text-gray-600">
                    <p>
                        <span className="font-semibold">Discount Type:</span> {discountType}
                    </p>
                    <p>
                        <span className="font-semibold">Expires On:</span>{" "}
                        {new Date(expiredDate).toLocaleDateString()}
                    </p>
                </div>
            </div>

            {/* Products Section */}
            <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Products</h2>
                {products?.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {products.map((product) => (
                            <div
                                key={product._id}
                                className="border rounded-lg shadow-sm p-4 flex flex-col"
                            >
                                <img
                                    src={product.images[0]?.url}
                                    alt={product.name}
                                    className="h-40 w-full object-cover rounded-md"
                                />
                                <h3 className="text-lg font-semibold mt-4 text-gray-800">
                                    {product.name}
                                </h3>
                                <p className="text-gray-600">{product.brand}</p>
                                <div className="mt-2 text-gray-600">
                                    <p>
                                        <span className="font-semibold">Price:</span> ${product.price}
                                    </p>
                                    <p>
                                        <span className="font-semibold">Stock:</span>{" "}
                                        {product.availableStock}
                                    </p>
                                    <p>
                                        <span className="font-semibold">Rating:</span>{" "}
                                        {product.rating} ⭐
                                    </p>
                                </div>
                                <a
                                    href={product.videoLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-auto text-blue-600 hover:underline"
                                >
                                    Watch Video
                                </a>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500">No products associated with this campaign.</p>
                )}
            </div>
        </div>
    );
};

export default CampaignDetails;