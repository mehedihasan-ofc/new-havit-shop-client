import { Button, Dialog, DialogBody, DialogFooter, DialogHeader } from "@material-tailwind/react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useState } from "react";
import { uploadImageToStorage } from "../../../utils";
import { toast } from "react-toastify";

const CtreateNocModal = ({ open, handleOpen, refetch }) => {

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
                const imageLink = await uploadImageToStorage(selectedFile);

                // Prepare the data to be sent to the API
                const newNoc = {
                    image: imageLink,
                    createdAt: new Date().toISOString(),
                };

                // Make an API call to send the data to the database\
                const { data } = await axiosSecure.post("/noc", newNoc);

                if (data.insertedId) {
                    refetch();
                    setSelectedImage(null);
                    setSelectedFile(null);
                    toast.success('🎉 NOC created successfully!', {
                        position: "top-right",
                        autoClose: 1600,
                        pauseOnHover: false,
                    });
                }

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
                <DialogHeader className="pb-0">Create a New NOC</DialogHeader>
                <DialogBody>
                    <div className="space-y-2">
                        <p className="font-serif text-lg font-bold">Recommended size: 501px x 264px pixels</p>
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
                                <div className="mt-4 flex justify-center">
                                    <img
                                        src={selectedImage}
                                        alt="Selected"
                                        className="w-[501px] h-[264px] object-cover rounded-md shadow-md"
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </DialogBody>

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

export default CtreateNocModal;