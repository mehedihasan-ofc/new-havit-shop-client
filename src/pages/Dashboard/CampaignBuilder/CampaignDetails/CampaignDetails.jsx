import { Button } from "@material-tailwind/react";
import MySpinner from "../../../../components/Shared/MySpinner/MySpinner";
import useCampaign from "../../../../hooks/useCampaign";
import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useState } from "react";

const CampaignDetails = () => {

    const [axiosSecure] = useAxiosSecure();
    const [campaignData, loading, refetch] = useCampaign();

    const [deleting, setDeleting] = useState(false);
    const navigate = useNavigate();

    const handleDelete = async (productId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                setDeleting(true);
                try {
                    const { data } = await axiosSecure.delete(`/campaign/${productId}`);
                    
                    if (data.deletedCount > 0) {
                        refetch();
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                        });
                    }
                } catch (error) {
                    Swal.fire({
                        title: "Error!",
                        text: "Failed to delete the campaign.",
                        icon: "error"
                    });
                } finally {
                    setDeleting(false);
                }
            }
        });
    };

    if (loading) return <MySpinner />;

    if (campaignData?.message) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-center bg-gray-100 rounded-md shadow-sm border p-6">
                <h1 className="text-2xl font-semibold text-gray-700 mb-4">No Campaign Found</h1>
                <p className="text-gray-500 mb-6">It looks like there are no active campaigns at the moment. Start by creating a new campaign.</p>
                <Button
                    onClick={() => navigate("/dashboard/create-campaign")}
                    size="lg"
                    className="rounded bg-primary text-white px-6 py-2"
                >
                    Create Campaign
                </Button>
            </div>
        );
    }

    const { title, subtitle, discountType, createdAt, expiredDate, products } = campaignData;

    return (
        <div className="p-6 bg-white shadow-md rounded-lg">
            {/* Campaign Header */}
            <div className="mb-6 border-b pb-4">
                <div className="flex justify-between items-center gap-5">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-800">{title}</h1>
                        <p className="text-gray-600">{subtitle}</p>
                        <div className="mt-4 text-gray-600 space-y-1">
                            <p className="capitalize">
                                <span className="font-semibold text-teal-600">Discount Type: </span>{discountType}
                            </p>
                            <p>
                                <span className="font-semibold text-blue-600">Created At: </span>
                                {new Date(createdAt).toLocaleDateString()}
                            </p>
                            <p>
                                <span className="font-semibold text-red-600">Expires On: </span>
                                {new Date(expiredDate).toLocaleDateString()}
                            </p>
                        </div>
                    </div>

                    <div className="flex justify-between items-center gap-5">
                        <Button onClick={() => navigate(`/dashboard/campaign-edit/${campaignData._id}`)} size="sm" className="flex items-center gap-2 rounded-none bg-primary py-1 px-3">
                            <CiEdit size={20} />
                            Edit
                        </Button>

                        <Button disabled={deleting} onClick={() => handleDelete(campaignData._id)} size="sm" className="flex items-center gap-2 rounded-none bg-red-600 py-1 px-3">
                            <AiOutlineDelete size={20} />
                            {deleting ? "Removing..." : "Remove"}
                        </Button>
                    </div>
                </div>
            </div>

            {/* Products Section */}
            {
                products?.length > 0 && (
                    <div>
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Products</h2>
                        <div className="grid grid-cols-4 gap-5">
                            {products.map((product) => {
                                const hasDiscount = product.price < product.regularPrice;
                                const discountPercentage = Math.round(
                                    ((product.regularPrice - product.price) / product.regularPrice) * 100
                                );

                                return (
                                    <div
                                        key={product._id}
                                        className="relative border rounded-lg shadow font-sans bg-white"
                                    >
                                        {/* Product Image */}
                                        <div className="relative overflow-hidden rounded-lg h-44">
                                            <div className="pl-4 pt-4 pr-4 pb-2">
                                                <img
                                                    src={product.images[0]?.url}
                                                    alt={product.name}
                                                    className="w-full h-36 object-contain"
                                                />
                                            </div>
                                            {hasDiscount && (
                                                <span className="absolute top-0 left-0 bg-[#f74b81] text-white text-xs font-semibold px-2 py-1 rounded-br-lg">
                                                    {discountPercentage}% OFF
                                                </span>
                                            )}
                                        </div>

                                        {/* Product Details */}
                                        <div className="pl-4 pb-4 pr-4">
                                            {/* Brand */}
                                            <h5 className="text-[10px] font-semibold text-gray-500 uppercase">
                                                {product.brand}
                                            </h5>

                                            {/* Product Name */}
                                            <h5 className="text-[14px] font-semibold mt-1 text-gray-800">
                                                {product.name}
                                            </h5>

                                            {/* Ratings and Sold Count */}
                                            <div className="text-sm text-gray-400 font-body flex items-center gap-2 mt-1">
                                                <span>⭐ ({product?.rating})</span>
                                                <span>Sold: {product.soldCount}</span>
                                                <span>Stock: {product.availableStock}</span>
                                            </div>

                                            {/* Price */}
                                            <div className="flex justify-between items-center my-2">
                                                <div className="flex items-baseline space-x-2">
                                                    <span className="text-base font-bold text-primary">
                                                        ৳{product.price.toFixed(2)}
                                                    </span>
                                                    {hasDiscount && (
                                                        <span className="text-xs text-gray-500 line-through">
                                                            ৳{product.regularPrice.toFixed(2)}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )
            }


        </div>
    );
};

export default CampaignDetails;