import { useState, useRef } from 'react';
import SVG from "../../../../assets/svg/img-status-7.svg";
import { Button } from '@material-tailwind/react';
import useCategories from '../../../../hooks/useCategories';
import useSubcategories from '../../../../hooks/useSubcategories';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { uploadMultipleImagesToStorage } from '../../../../utils';
import { toast } from 'react-toastify';

const AddProduct = () => {
    const [categories] = useCategories();
    const [subcategories] = useSubcategories();
    const [axiosSecure] = useAxiosSecure();

    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        skuCode: '',
        name: '',
        categoryId: '',
        subcategoryId: '',
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

        // Clear subcategory selection if category changes
        if (name === 'categoryId') {
            setFormData((prev) => ({ ...prev, subcategoryId: '' }));
        }
    };

    // Filter subcategories based on selected category ID
    const filteredSubcategories = subcategories.filter(
        (sub) => sub.categoryId === formData.categoryId
    );

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const preview = URL.createObjectURL(file);
        setFormData((prev) => ({
            ...prev,
            images: [...prev.images, file],
            imagePreviews: [...prev.imagePreviews, preview],
        }));

        // Clear the input value so the same file can be selected again if needed
        fileInputRef.current.value = null;
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

    // Handle deleting flavors
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

            const newProduct = {
                name: formData.name,
                categoryId: formData.categoryId,
                subcategoryId: formData.subcategoryId,
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
            const { data } = await axiosSecure.post('/product', newProduct);

            if (data.insertedId) {
                toast.success('New Product Added successfully!', {
                    position: "top-right",
                    autoClose: 1000,
                    pauseOnHover: false,
                });

                // Reset form data after successful upload
                setFormData({
                    skuCode: '',
                    name: '',
                    categoryId: '',
                    subcategoryId: '',
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
                fileInputRef.current.value = null;
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
                    <h2 className="text-xl font-semibold text-center mb-4">Add New Product</h2>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Upload Product Images</label>
                        <input
                            type="file"
                            ref={fileInputRef}
                            accept="image/*"
                            onChange={handleFileChange}
                            className="w-full text-gray-900 focus:outline-none"
                        />


                        {formData.images.length > 0 ? (
                            <p className="mt-2 text-sm text-gray-500">
                                {formData.images.length} Image(s) selected
                            </p>
                        ) : <p className="mt-2 text-sm text-gray-500">
                            Upload multiple images to showcase the product.
                        </p>}
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
                            <label className="block text-sm font-medium text-gray-700 mb-2">Select Category</label>
                            <select
                                name="categoryId"
                                value={formData.categoryId}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                                required
                            >
                                <option value="" disabled>Select a category</option>
                                {categories.map(category => (
                                    <option key={category._id} value={category._id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Select Subcategory</label>
                            <select
                                name="subcategoryId"
                                value={formData.subcategoryId}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                                disabled={!formData.categoryId}
                                required
                            >
                                <option value="" disabled>Select a subcategory</option>
                                {filteredSubcategories.map(subcategory => (
                                    <option key={subcategory._id} value={subcategory._id}>
                                        {subcategory.name}
                                    </option>
                                ))}
                            </select>
                        </div>

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
                            {loading ? 'Adding Product...' : 'Add Product'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;