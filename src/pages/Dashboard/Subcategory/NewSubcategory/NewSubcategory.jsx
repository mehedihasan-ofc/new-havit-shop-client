import { useState } from "react";
import { Button } from "@material-tailwind/react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { toast } from "react-toastify";
import useCategories from "../../../../hooks/useCategories";
import SVG from "../../../../assets/svg/img-status-7.svg";

const NewSubcategory = () => {
    const [categories] = useCategories();
    const [axiosSecure] = useAxiosSecure();

    const [formData, setFormData] = useState({
        selectedCategory: "",
        subcategoryName: "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Prepare the data to be sent to the API
            const newSubcategory = {
                categoryId: formData.selectedCategory,
                name: formData.subcategoryName,
                createdAt: new Date().toISOString(),
            };

            // Make an API call to send the data to the database
            const { data } = await axiosSecure.post('/subcategory', newSubcategory);

            if (data.insertedId) {
                toast.success('Subcategory created successfully!', {
                    position: "top-right",
                    autoClose: 1000,
                    pauseOnHover: false,
                });

                setFormData({
                    selectedCategory: "",
                    subcategoryName: "",
                });
            }
        } catch (error) {
            console.error('Error creating subcategory:', error);
            toast.error('Failed to create subcategory.', {
                position: "top-right",
                autoClose: 1600,
                pauseOnHover: false,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="border shadow max-w-xl mx-auto">
            <div className="relative">
                <img className="absolute top-0 right-0" src={SVG} alt="background" />
                <form onSubmit={handleSubmit} className="space-y-6 max-w-md p-8">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Select Category</label>
                        <select
                            name="selectedCategory"
                            value={formData.selectedCategory}
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
                        <label className="block text-sm font-medium text-gray-700 mb-2">Subcategory Name</label>
                        <input
                            type="text"
                            name="subcategoryName"
                            placeholder="Enter subcategory name"
                            value={formData.subcategoryName}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                            required
                        />
                    </div>

                    <div>
                        <Button type="submit" disabled={loading} className="rounded-none bg-primary font-medium px-10">
                            {loading ? 'Creating...' : 'Create Subcategory'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NewSubcategory;
