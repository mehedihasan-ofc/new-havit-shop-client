import { useState, useRef } from 'react';
import SVG from "../../../../assets/svg/img-status-7.svg";
import { Button } from '@material-tailwind/react';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { uploadMultipleImagesToStorage } from '../../../../utils';
import { toast } from 'react-toastify';

const AddNewCampaignProduct = () => {
    const [axiosSecure] = useAxiosSecure();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        skuCode: '',
        name: '',
        regularPrice: '',
        price: '',
        availableStock: '',
        rating: '',
        videoLink: '',
        description: '',
        brand: '',
        madeIn: '',
        flavor: [],
        images: [],
        imagePreviews: [],
    });

    const fileInputRef = useRef();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        const previews = files.map((file) => URL.createObjectURL(file));
        setFormData((prev) => ({ ...prev, images: files, imagePreviews: previews }));
    };

    const handleDeleteImage = (index) => {
        setFormData((prev) => {
            const newImages = prev.images.filter((_, i) => i !== index);
            const newPreviews = prev.imagePreviews.filter((_, i) => i !== index);
            return { ...prev, images: newImages, imagePreviews: newPreviews };
        });
    };

    const handleAddFlavor = (e) => {
        if (e.key === 'Enter' && e.target.value.trim()) {
            e.preventDefault();
            const newFlavor = e.target.value.trim();

            if (!formData.flavor.includes(newFlavor)) {
                setFormData((prev) => ({
                    ...prev,
                    flavor: [...prev.flavor, newFlavor],
                }));
            }
            e.target.value = ''; // Clear input
        }
    };

    const handleDeleteFlavor = (index) => {
        setFormData((prev) => {
            const newFlavors = prev.flavor.filter((_, i) => i !== index);
            return { ...prev, flavor: newFlavors };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Upload multiple images
            const downloadURLs = await uploadMultipleImagesToStorage(formData.images);

            const newCampaignProduct = {
                name: formData.name,
                regularPrice: parseFloat(formData.regularPrice),
                price: parseFloat(formData.price),
                availableStock: parseInt(formData.availableStock, 10),
                soldCount: 0,
                rating: parseFloat(formData.rating),
                videoLink: formData.videoLink,
                description: formData.description,
                brand: formData.brand,
                madeIn: formData.madeIn,
                skuCode: formData.skuCode,
                flavor: formData.flavor,
                createdAt: new Date().toISOString(),
                images: downloadURLs.map((url, index) => ({
                    _id: new Date().getTime() + index,
                    url: url
                }))
            };

            // Make an API call to send the data to the database
            const { data } = await axiosSecure.post('/campaign-product', newCampaignProduct);

            if (data.insertedId) {
                toast.success('New Campaign Product Added successfully!', {
                    position: "top-right",
                    autoClose: 1000,
                    pauseOnHover: false,
                });

                // Reset form data after successful upload
                setFormData({
                    skuCode: '',
                    name: '',
                    regularPrice: '',
                    price: '',
                    availableStock: '',
                    rating: '',
                    videoLink: '',
                    description: '',
                    madeIn: '',
                    brand: '',
                    flavor: [],
                    images: [],
                    imagePreviews: []
                });
                fileInputRef.current.value = null; // Clear file input
            }
            else {
                console.error("No insertedId in response");
            }

        } catch (error) {
            console.error("Error during API call:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="border shadow max-w-3xl mx-auto">
            <div className="relative">
                {/* Background SVG/Image */}
                <img className="absolute top-0 right-0" src={SVG} alt="background" />

                <form onSubmit={handleSubmit} className="space-y-6 max-w-full p-8">
                    <h2 className="text-xl font-semibold text-center mb-4">Add New Campaign Product</h2>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Upload Product Images</label>
                        <input
                            type="file"
                            ref={fileInputRef}
                            accept="image/*"
                            onChange={handleFileChange}
                            className="w-full text-gray-900 focus:outline-none"
                            multiple
                            required
                        />
                        <p className="mt-2 text-sm text-gray-500">
                            Upload multiple images to showcase the product.
                        </p>
                    </div>

                    {formData.imagePreviews.length > 0 && (
                        <div className="mt-4 grid grid-cols-3 gap-4">
                            {formData.imagePreviews.map((src, index) => (
                                <div key={index} className="relative">
                                    <img
                                        src={src}
                                        alt="Product Preview"
                                        className="h-32 w-full object-cover rounded-md border border-gray-300"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleDeleteImage(index)}
                                        className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 hover:bg-red-700"
                                        title="Delete image"
                                    >
                                        <AiOutlineCloseCircle />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Product SKU Code */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">SKU Code</label>
                        <input
                            type="text"
                            name="skuCode"
                            placeholder="Enter product SKU code"
                            value={formData.skuCode}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter product name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Regular Price</label>
                            <input
                                type="number"
                                name="regularPrice"
                                placeholder="Enter regular price"
                                value={formData.regularPrice}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
                            <input
                                type="number"
                                name="price"
                                placeholder="Enter price BDT"
                                value={formData.price}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Available Stock</label>
                            <input
                                type="number"
                                name="availableStock"
                                placeholder="Enter available stock"
                                value={formData.availableStock}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                            <input
                                type="number"
                                name="rating"
                                placeholder="Enter rating like 4.5"
                                value={formData.rating}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                                required
                            />
                        </div>
                    </div>

                    <div className='grid grid-cols-2 gap-4'>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Made In</label>
                            <input
                                type="text"
                                name="madeIn"
                                placeholder="Enter country of origin"
                                value={formData.madeIn}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Brand</label>
                            <input
                                type="text"
                                name="brand"
                                placeholder="Enter brand"
                                value={formData.brand}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Youtube Video Link</label>
                        <input
                            type="text"
                            name="videoLink"
                            placeholder="Enter youtube video link"
                            value={formData.videoLink}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Product Flavor
                        </label>
                        <input
                            type="text"
                            placeholder="Type a flavor and press Enter"
                            onKeyDown={handleAddFlavor}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                        />

                        {/* Display Selected Flavors */}
                        {formData.flavor.length > 0 && (
                            <div className="flex flex-wrap mt-2 gap-2">
                                {formData.flavor.map((flavor, index) => (
                                    <span
                                        key={index}
                                        className="flex items-center bg-primary text-white px-3 py-1 rounded-full"
                                    >
                                        {flavor}
                                        <button
                                            type="button"
                                            onClick={() => handleDeleteFlavor(index)}
                                            className="ml-2 text-white hover:text-gray-300"
                                            title="Remove flavor"
                                        >
                                            &times;
                                        </button>
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                        <textarea
                            name="description"
                            placeholder="Enter description"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                            required
                        />
                    </div>

                    <div className='flex items-center justify-center'>
                        <Button type="submit" loading={loading} className='rounded-none bg-primary font-medium px-10'>
                            {loading ? 'Adding Campaign Product...' : 'Add Campaign Product'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddNewCampaignProduct;