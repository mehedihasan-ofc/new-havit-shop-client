import { useEffect, useState } from "react";
import { Button } from "@material-tailwind/react";
import { toast } from "react-toastify";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import SVG from "../../../../assets/svg/img-status-9.svg";
import useSocialMedia from "../../../../hooks/useSocialMedia";

const platforms = [
    "Facebook",
    "Instagram",
    "YouTube",
    "Snapchat",
    "TikTok",
    "Twitter (X)",
    "LinkedIn",
    "Pinterest",
    "Reddit",
    "WhatsApp",
];

const SocialMedia = () => {
    const [axiosSecure] = useAxiosSecure();
    const [socialMediaData, , refetch] = useSocialMedia();

    const [socialMediaLinks, setSocialMediaLinks] = useState([]);
    const [loading, setLoading] = useState(false); // Loading state

    useEffect(() => {
        if (socialMediaData && socialMediaData._id) {
            // Convert fetched data to the form structure
            const formattedData = socialMediaData.socialMedia.map(item => ({
                platform: item.platform || "",
                url: item.url || ""
            }));

            setSocialMediaLinks(formattedData);
        }
    }, [socialMediaData]);

    // Handle input change
    const handleInputChange = (index, field, value) => {
        const updatedLinks = [...socialMediaLinks];
        updatedLinks[index][field] = value;
        setSocialMediaLinks(updatedLinks);
    };

    // Add new input field
    const handleAddField = () => {
        setSocialMediaLinks([...socialMediaLinks, { platform: "", url: "" }]);
    };

    // Handle platform selection
    const handlePlatformChange = (index, value) => {
        const updatedLinks = [...socialMediaLinks];
        updatedLinks[index].platform = value;
        setSocialMediaLinks(updatedLinks);
    };

    // Handle form submission with error handling and loading state
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Set loading state to true

        try {

            if (socialMediaData?._id) {

                // Update existing contact info
                const { data } = await axiosSecure.put(`/social-media/${socialMediaData._id}`, { socialMedia: socialMediaLinks });

                if (data.modifiedCount > 0) {
                    refetch();
                    toast.success("Contact info updated successfully!", {
                        position: "top-right",
                        autoClose: 1000,
                        pauseOnHover: false,
                    });
                } else {
                    toast.info("No changes were made to the links.", {
                        position: "top-right",
                        autoClose: 1000,
                        pauseOnHover: false,
                    });
                }

            } else {

                const { data } = await axiosSecure.post("/social-media", { socialMedia: socialMediaLinks });
                if (data.insertedId) {
                    toast.success("Contact info created successfully!", {
                        position: "top-right",
                        autoClose: 1000,
                        pauseOnHover: false,
                    });
                }

            }

        } catch (error) {
            console.error("Error submitting contact info:", error);
            toast.error("Failed to create contact info. Please try again later.", {
                position: "top-right",
                autoClose: 2000,
                pauseOnHover: false,
            });
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    // Remove a social media link
    const handleRemoveField = (index) => {
        setSocialMediaLinks(socialMediaLinks.filter((_, idx) => idx !== index));
    };

    return (
        <div className="border shadow max-w-3xl mx-auto">
            <div className="relative">
                <img className="absolute top-0 right-0" src={SVG} alt="background" />

                <div className="max-w-xl p-8">
                    <h2 className="text-xl font-semibold text-gray-800">Social Links</h2>
                    <p className="text-gray-600 text-sm mb-4 mt-1">
                        Add your social links.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {socialMediaLinks.map((link, index) => (
                            <div key={index} className="flex items-center gap-3">
                                <select
                                    value={link.platform}
                                    onChange={(e) => handlePlatformChange(index, e.target.value)}
                                    className="w-1/3 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                                    required
                                >
                                    <option value="" disabled>
                                        Select Platform
                                    </option>
                                    {platforms.map((platform, idx) => (
                                        <option key={idx} value={platform}>
                                            {platform}
                                        </option>
                                    ))}
                                </select>

                                <input
                                    type="text"
                                    value={link.url}
                                    onChange={(e) => handleInputChange(index, "url", e.target.value)}
                                    placeholder={`Enter ${link.platform || "platform"} link`}
                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                                    required
                                />

                                <button
                                    type="button"
                                    onClick={() => handleRemoveField(index)}
                                    className="text-red-500 hover:text-red-600"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-5 h-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            </div>
                        ))}

                        {socialMediaLinks.length === 0 ? (
                            <button
                                type="button"
                                onClick={handleAddField}
                                className="w-full p-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 transition"
                            >
                                Add Social Link
                            </button>
                        ) : (
                            socialMediaLinks.length < 10 && (
                                <button
                                    type="button"
                                    onClick={handleAddField}
                                    className="w-full p-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 transition"
                                >
                                    Add Another Link
                                </button>
                            )
                        )}

                        {socialMediaLinks.length > 0 && (
                            <div className="text-center">
                                <Button
                                    type="submit"
                                    className="rounded-none bg-primary font-medium px-10"
                                    disabled={loading} // Disable button while loading
                                >
                                    {loading ? "Saving..." : "Save Links"}
                                </Button>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SocialMedia;