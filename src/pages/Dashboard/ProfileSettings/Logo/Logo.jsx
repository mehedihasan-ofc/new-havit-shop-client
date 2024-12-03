import { useState } from "react";
import SVG from "../../../../assets/svg/img-status-9.svg";
import { Button } from "@material-tailwind/react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { uploadImageToStorage } from "../../../../utils";
import { toast } from "react-toastify";
import useLogo from "../../../../hooks/useLogo";

const Logo = () => {
    const [logoData, , refetch] = useLogo();
    const [axiosSecure] = useAxiosSecure();
    const [logoFile, setLogoFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // Handle file selection
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) setLogoFile(file);
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // Upload logo if a new file is selected
            const logoLink = logoFile ? await uploadImageToStorage(logoFile) : logoData?.logo;

            const logoPayload = { logo: logoLink };

            if (logoData?._id) {
                // Update existing logo
                const { data } = await axiosSecure.put(`/logo/${logoData._id}`, logoPayload);
                if (data?.modifiedCount > 0) {
                    refetch();
                    toast.success("Logo updated successfully!", {
                        position: "top-right",
                        autoClose: 1000,
                        pauseOnHover: false,
                    });
                } else {
                    toast.info("No changes were made to the logo.", {
                        position: "top-right",
                        autoClose: 1000,
                        pauseOnHover: false,
                    });
                }
            } else {
                // Save new logo
                const { data } = await axiosSecure.post("/logo", logoPayload);
                if (data?.insertedId) {
                    toast.success("Logo saved successfully!", {
                        position: "top-right",
                        autoClose: 1000,
                        pauseOnHover: false,
                    });
                } else {
                    throw new Error("Failed to save the logo.");
                }
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to save the logo. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="border shadow max-w-xl mx-auto">
            <div className="relative">
                <img className="absolute top-0 right-0" src={SVG} alt="Decoration" />

                <form onSubmit={handleSubmit} className="space-y-6 max-w-md p-8">
                    {/* Logo Preview */}
                    <div className="flex flex-col items-center">
                        <div className="w-[250px] h-[150px] border border-gray-300 rounded-md bg-gray-100 flex items-center justify-center overflow-hidden">
                            {logoFile || logoData?.logo ? (
                                <img
                                    src={logoFile ? URL.createObjectURL(logoFile) : logoData?.logo}
                                    alt="Uploaded Logo"
                                    className="w-full h-full object-contain"
                                />
                            ) : (
                                <span className="text-gray-400">250 x 150 pixels</span>
                            )}
                        </div>

                        {/* File Input */}
                        <input
                            type="file"
                            accept="image/*"
                            className="mt-4"
                            onChange={handleFileChange}
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
                            {isLoading ? "Saving Logo..." : "Save Logo"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Logo;