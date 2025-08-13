import { useState } from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";
import { uploadSingleImage } from "../../../utils";
import { toast } from "react-toastify";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const CreateBannerModal = ({ open, handleOpen, refetch }) => {

    const [axiosSecure] = useAxiosSecure();

    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result);
            };
            reader.readAsDataURL(file);
            setSelectedFile(file);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (selectedFile) {
            setLoading(true);
            try {
                // Upload the image and get the download URL
                const imageLink = await uploadSingleImage(selectedFile);

                // Prepare the data to be sent to the API
                const newBanner = {
                    image: imageLink,
                    createdAt: new Date().toISOString(),
                };

                // Make an API call to send the data to the database
                axiosSecure.post('/banner', newBanner)
                    .then(data => {
                        if (data.data.insertedId) {
                            refetch();
                            setSelectedImage(null);
                            setSelectedFile(null);
                            toast.success('🎉 Banner created successfully!', {
                                position: "top-right",
                                autoClose: 1600,
                                pauseOnHover: false,
                            });
                        }
                    })

            } catch (error) {
                console.error('Error uploading image:', error);
            } finally {
                setLoading(false);
                handleOpen();
            }
        }
    };

    return (
        <Dialog className="rounded-none" size="lg" open={open} handler={handleOpen}>
            <form onSubmit={handleSubmit}>
                <DialogHeader className="pb-0">Create a New Banner</DialogHeader>
                <DialogBody>
                    <div className="space-y-4">
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-700">Upload Image</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="block w-full text-sm text-gray-500
                                    file:mr-4 file:py-2 file:px-4
                                    file:rounded-full file:border-0
                                    file:text-sm file:font-semibold
                                    file:bg-blue-50 file:text-blue-700
                                    hover:file:bg-blue-100"
                                required
                            />
                            {selectedImage && (
                                <div className="mt-4">
                                    <img
                                        src={selectedImage}
                                        alt="Selected"
                                        className="w-full h-auto max-h-60 object-cover rounded-md shadow-md"
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </DialogBody>

                {/* TODO -> BUTTON MODIFY */}
                <DialogFooter>
                    <Button
                        size="sm"
                        disabled={loading}
                        onClick={handleOpen}
                        className="rounded-none bg-red-500 font-medium mr-5"
                    >
                        <span>Cancel</span>
                    </Button>

                    <Button size="sm" loading={loading} className='rounded-none bg-primary font-medium px-5' type="submit">
                        {loading ? 'Saving...' : 'Save'}
                    </Button>
                </DialogFooter>
            </form>
        </Dialog>
    );
};

export default CreateBannerModal;