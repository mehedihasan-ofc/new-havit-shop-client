import { useState } from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { toast } from "react-toastify";
import { uploadImageToStorage } from "../../../../utils";
import useWelcome from "../../../../hooks/useWelcome";
import { Button } from "@material-tailwind/react";

const Welcome = () => {
    const [welcomeData, , refetch] = useWelcome();
    const [axiosSecure] = useAxiosSecure();

    const [selectedImage, setSelectedImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            let imageLink = welcomeData?.image; // Default to existing image
            if (selectedImage) {
                // Upload new image if a file is selected
                imageLink = await uploadImageToStorage(selectedImage);
            }

            const welcomePayload = {
                image: imageLink,
            };

            if (welcomeData?._id) {
                // Update existing data
                const { data } = await axiosSecure.put(`/welcome/${welcomeData._id}`, welcomePayload);

                if (data.modifiedCount > 0) {
                    refetch();
                    toast.success("Welcome data updated successfully!", {
                        position: "top-right",
                        autoClose: 1000,
                        pauseOnHover: false,
                    });
                } else {
                    toast.info("No changes made!");
                }
            } else {
                // Create new data
                const { data } = await axiosSecure.post("/welcome", welcomePayload);

                if (data.insertedId) {
                    toast.success("Welcome image uploaded successfully!", {
                        position: "top-right",
                        autoClose: 1000,
                        pauseOnHover: false,
                    });
                }
            }
        } catch (error) {
            console.error("Error saving welcome data:", error);
            toast.error("Failed to save data. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-5xl mx-auto p-8 bg-gray-50 shadow rounded border">
            <h1 className="text-2xl font-bold text-center mb-2">Welcome</h1>
            <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-4">
                    <label htmlFor="imageInput" className="block text-lg text-center font-medium text-gray-700">
                        Upload Image (336 × 280 pixels)
                    </label>
                    <div className="relative group w-[501px] h-[264px] bg-gray-100 border border-gray-300 rounded-md overflow-hidden flex items-center justify-center mx-auto">
                        {!selectedImage && !welcomeData?.image ? (
                            <label
                                htmlFor="imageInput"
                                className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer text-gray-400 hover:text-blue-500"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-8 w-8"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M3 16v5a2 2 0 002 2h14a2 2 0 002-2v-5M16 10l-4-4m0 0l-4 4m4-4v12"
                                    />
                                </svg>
                                <span className="mt-2 text-sm">Click to upload</span>
                            </label>
                        ) : (
                            <img
                                src={
                                    selectedImage
                                        ? URL.createObjectURL(selectedImage)
                                        : welcomeData?.image
                                }
                                alt="Welcome"
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                        )}
                        <input
                            type="file"
                            id="imageInput"
                            accept="image/*"
                            className="absolute inset-0 opacity-0 cursor-pointer"
                            onChange={handleImageChange}
                            required
                        />
                    </div>

                </div>
                <div className="flex items-center justify-center">
                    <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-1/3 rounded-none bg-primary font-medium"
                    >
                        {isLoading ? "Saving..." : "Save"}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default Welcome;