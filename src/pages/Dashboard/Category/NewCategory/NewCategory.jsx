import { useRef, useState } from "react";
import { Button } from "@material-tailwind/react";
import { uploadImageToStorage } from "../../../../utils";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { toast } from "react-toastify";
import SVG from "../../../../assets/svg/img-status-7.svg";

const NewCategory = () => {

    const [axiosSecure] = useAxiosSecure();

    const [formData, setFormData] = useState({
        categoryName: "",
        categoryImage: null,
        categoryImagePreview: null,
    });

    const fileInputRef = useRef(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith("image/")) {
            const imagePreviewUrl = URL.createObjectURL(file);
            setFormData((prevData) => ({
                ...prevData,
                categoryImage: file,
                categoryImagePreview: imagePreviewUrl,
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.categoryImage) {
            setLoading(true);
            try {
                // Upload the image and get the download URL
                const imageLink = await uploadImageToStorage(formData.categoryImage);

                // Prepare the data to be sent to the API
                const newCategory = {
                    name: formData.categoryName,
                    image: imageLink,
                    createdAt: new Date().toISOString(),
                };

                // Make an API call to send the data to the database
                const { data } = await axiosSecure.post('/category', newCategory)

                if (data.insertedId) {

                    toast.success('Category created successfully!', {
                        position: "top-right",
                        autoClose: 1600,
                        pauseOnHover: false,
                    });

                    setFormData({
                        categoryName: "",
                        categoryImage: null,
                        categoryImagePreview: null,
                    });
                    fileInputRef.current.value = null;
                }


            } catch (error) {
                console.error('Error uploading image:', error);
            } finally {
                setLoading(false);
            }
        }

    };

    return (
        <div className="border shadow max-w-xl mx-auto">
            <div className="relative">

                <img className="absolute top-0 right-0" src={SVG} alt="background" />

                <form onSubmit={handleSubmit} className="space-y-6 max-w-md p-8">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Upload Category Image</label>
                        <input
                            type="file"
                            ref={fileInputRef}
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="block w-full text-gray-900 focus:outline-none"
                            required
                        />

                        <p className="mt-2 text-sm text-gray-500">
                            Please upload a square image with a maximum size of 160x160 pixels to ensure the best display quality.
                        </p>
                    </div>
                    {formData.categoryImagePreview && (
                        <div className="mt-4 flex justify-center">
                            <img
                                src={formData.categoryImagePreview}
                                alt="Category Preview"
                                className="h-40 w-40 object-cover rounded-md border border-gray-300"
                            />
                        </div>

                    )}

                    <div>
                        <input
                            type="text"
                            name="categoryName"
                            placeholder="Enter category name"
                            value={formData.categoryName}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                            required
                        />
                    </div>

                    <div>
                        <Button type="submit" loading={loading} className='rounded-none bg-primary font-medium px-10'>
                            {loading ? 'Creating...' : 'Create Category'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NewCategory;