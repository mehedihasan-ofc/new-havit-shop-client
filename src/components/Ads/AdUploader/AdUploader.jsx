import { useState } from "react";
import { Button } from "@material-tailwind/react";
import { toast } from "react-toastify";
import { deleteImage, uploadSingleImage } from "../../../utils";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AdUploader = ({ adName, adItem, refetch }) => {
    const [axiosSecure] = useAxiosSecure();
    const [adFile, setAdFile] = useState(null);
    const [adLink, setAdLink] = useState(adItem?.link || "");
    const [isLoading, setIsLoading] = useState(false);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) setAdFile(file);
    };

    const handleLinkChange = (e) => {
        setAdLink(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const adURL = adFile
                ? await uploadSingleImage(adFile)
                : adItem?.url;

            const adPayload = {
                name: adName,
                url: adURL,
                link: adLink,
            };

            if (adItem?._id) {
                if (adFile) {
                    await deleteImage(adItem.url);
                }

                const { data } = await axiosSecure.put(`/ads/${adItem._id}`, adPayload);
                if (data?.modifiedCount > 0) {
                    refetch();
                    toast.success(`${adName} updated successfully!`);
                } else {
                    toast.info(`No changes made to ${adName}.`);
                }
            } else {
                const { data } = await axiosSecure.post("/ads", adPayload);
                if (data?.insertedId) {
                    refetch();
                    toast.success(`${adName} created successfully!`);
                } else {
                    throw new Error("Failed to create ad");
                }
            }
        } catch (error) {
            console.error(`Error saving ${adName}:`, error);
            toast.error(`Failed to save ${adName}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
            <form className="space-y-4" onSubmit={handleSubmit}>
                <h3 className="text-lg font-medium text-gray-800">{adName}</h3>

                {/* Image preview / placeholder */}
                <div className="w-full h-[90px] border border-dashed border-gray-300 rounded flex items-center justify-center overflow-hidden bg-gray-50">
                    {adFile || adItem?.url ? (
                        <img
                            src={adFile ? URL.createObjectURL(adFile) : adItem.url}
                            alt={adName}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <span className="text-gray-400 text-sm">
                            📷 Click below to upload {adName}
                        </span>
                    )}
                </div>

                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full px-3 py-1 border border-gray-300 rounded-md"
                />

                <input
                    type="text"
                    placeholder={`Enter link for ${adName} (optional)`}
                    value={adLink}
                    onChange={handleLinkChange}
                    className="w-full px-3 py-1 border border-gray-300 rounded-md"
                />

                <Button
                    type="submit"
                    loading={isLoading}
                    className="w-full bg-primary rounded-none"
                >
                    {isLoading ? `Saving ${adName}...` : `Save ${adName}`}
                </Button>
            </form>
        </div>
    );
};

export default AdUploader;