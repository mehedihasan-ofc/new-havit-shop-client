import { useState, useRef } from 'react';
import SVG from "../../../../assets/svg/img-status-7.svg";
import { Button } from '@material-tailwind/react';

const AddProduct = () => {

    // todo
    const [loading, setLoading] = useState(false);


    const [formData, setFormData] = useState({
        name: '',
        categoryId: '',
        subcategoryId: '',
        regularPrice: '',
        price: '',
        availableStock: '',
        rating: '',
        description: '',
        brand: '',
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

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    };

    return (
        <div className="border shadow max-w-3xl mx-auto">
            <div className="relative">
                {/* Background SVG/Image */}
                <img className="absolute top-0 right-0" src={SVG} alt="background" />

                <form onSubmit={handleSubmit} className="space-y-6 max-w-full p-8">
                    <h2 className="text-xl font-semibold text-center mb-4">Add Product</h2>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Upload Product Images</label>
                        <input
                            type="file"
                            ref={fileInputRef}
                            accept="image/*"
                            onChange={handleFileChange}
                            className="w-full text-gray-900 focus:outline-none"
                            multiple
                        />
                        <p className="mt-2 text-sm text-gray-500">
                            Upload multiple images to showcase the product.
                        </p>
                    </div>

                    {formData.imagePreviews.length > 0 && (
                        <div className="mt-4 grid grid-cols-3 gap-4">
                            {formData.imagePreviews.map((src, index) => (
                                <img
                                    key={index}
                                    src={src}
                                    alt="Product Preview"
                                    className="h-32 w-full object-cover rounded-md border border-gray-300"
                                />
                            ))}
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter product name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Category ID</label>
                            <input
                                type="text"
                                name="categoryId"
                                placeholder="Enter category ID"
                                value={formData.categoryId}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Subcategory ID</label>
                            <input
                                type="text"
                                name="subcategoryId"
                                placeholder="Enter subcategory ID"
                                value={formData.subcategoryId}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                            />
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
                                placeholder="Enter price"
                                value={formData.price}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
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
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                            <input
                                type="number"
                                name="rating"
                                placeholder="Enter rating"
                                value={formData.rating}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                            />
                        </div>
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

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                        <textarea
                            name="description"
                            placeholder="Enter description"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                        />
                    </div>

                    {/* <button
                        type="submit"
                        className="block w-full bg-primary text-white py-2 rounded-md font-medium hover:bg-primary-dark"
                    >
                        Add Product
                    </button> */}

                    <div>
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