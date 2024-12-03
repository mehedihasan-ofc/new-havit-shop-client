import { useEffect, useState } from "react";
import SVG from "../../../../assets/svg/img-status-2.svg";
import { Button, IconButton } from "@material-tailwind/react";
import { IoCloseOutline } from "react-icons/io5";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { toast } from "react-toastify";
import useContactInfoData from "../../../../hooks/useContactInfoData";

const ContactInfo = () => {
    const [axiosSecure] = useAxiosSecure();
    const [contactInfoData, , refetch] = useContactInfoData();
    
    const [formData, setFormData] = useState({
        address: "",
        phone: [""],
        email: "",
    });
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (contactInfoData && contactInfoData._id) {
            // Initialize formData with fetched data
            setFormData({
                address: contactInfoData.address || "",
                phone: contactInfoData.phone || [""],
                email: contactInfoData.email || "",
            });
        }
    }, [contactInfoData]);

    // Handle input changes for address and email
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle phone number input changes
    const handlePhoneChange = (index, value) => {
        const updatedPhones = [...formData.phone];
        updatedPhones[index] = value;
        setFormData({ ...formData, phone: updatedPhones });
    };

    // Add a new phone input
    const addPhoneField = () => {
        setFormData({ ...formData, phone: [...formData.phone, ""] });
    };

    // Remove a phone input
    const removePhoneField = (index) => {
        const updatedPhones = formData.phone.filter((_, i) => i !== index);
        setFormData({ ...formData, phone: updatedPhones });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const contactInfoPayload = {
                ...formData,
                createdAt: contactInfoData?.createdAt || new Date().toISOString(),
            };

            if (contactInfoData?._id) {
                // Update existing contact info
                const { data } = await axiosSecure.put(`/contact-info/${contactInfoData._id}`, contactInfoPayload);

                if (data.modifiedCount > 0) {
                    refetch();
                    toast.success("Contact info updated successfully!", {
                        position: "top-right",
                        autoClose: 1000,
                        pauseOnHover: false,
                    });
                }
            } else {
                // Create new contact info
                const { data } = await axiosSecure.post("/contact-info", contactInfoPayload);

                if (data.insertedId) {
                    toast.success("Contact info created successfully!", {
                        position: "top-right",
                        autoClose: 1000,
                        pauseOnHover: false,
                    });
                }
            }
        } catch (error) {
            console.error("Failed to save contact info:", error);
            toast.error("Failed to save contact information. Please try again.", {
                position: "top-right",
                autoClose: 1500,
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="border shadow max-w-xl mx-auto">
            <div className="relative">
                <img className="absolute top-0 right-0" src={SVG} alt="Decoration" />

                <form onSubmit={handleSubmit} className="space-y-6 max-w-md p-8">
                    {/* Address Input */}
                    <div>
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                            Address
                        </label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-primary focus:border-primary px-3 py-2"
                            placeholder="Enter your address"
                            required
                        />
                    </div>

                    {/* Phone Inputs */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Phone</label>
                        {formData.phone.map((phone, index) => (
                            <div key={index} className="flex items-center space-x-2 mt-2">
                                <input
                                    type="tel"
                                    value={phone}
                                    onChange={(e) => handlePhoneChange(index, e.target.value)}
                                    className="mt-1 block w-full border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-primary focus:border-primary px-3 py-2"
                                    placeholder={`Enter phone number ${index + 1}`}
                                    required
                                />
                                {index > 0 && (
                                    <IconButton onClick={() => removePhoneField(index)} size="sm" color="red" className="rounded">
                                        <IoCloseOutline size={18} />
                                    </IconButton>
                                )}
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={addPhoneField}
                            className="mt-3 text-sm text-primary font-medium hover:underline"
                        >
                            + Add another phone
                        </button>
                    </div>

                    {/* Email Input */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-primary focus:border-primary px-3 py-2"
                            placeholder="Enter your email address"
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="flex items-center justify-center">
                        <Button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full rounded-none bg-primary font-medium ${isLoading ? "cursor-not-allowed opacity-75" : ""
                                }`}
                        >
                            {isLoading ? "Saving..." : "Save"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ContactInfo;