import { Button } from '@material-tailwind/react';
import { useRef, useState } from 'react';
import { uploadSingleImage } from '../../../../utils';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { toast } from 'react-toastify';
import TextEditor from '../../../../components/TextEditor/TextEditor';

const CreateBlog = () => {

    const [axiosSecure] = useAxiosSecure();

    const [formData, setFormData] = useState({
        headline: '',
        category: '',
        image: null,
        imagePreview: null,
        readTime: '',
        link: '',
    });
    const [description, setDescription] = useState("");

    const fileInputRef = useRef(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const imagePreview = URL.createObjectURL(file);
            setFormData({ ...formData, image: file, imagePreview });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.image) {
            setLoading(true);
            try {
                // Upload the image and get the download URL
                const imageLink = await uploadSingleImage(formData.image);

                // Prepare the data to be sent to the API
                const newBlog = {
                    headline: formData.headline,
                    category: formData.category,
                    image: imageLink,
                    readTime: formData.readTime,
                    link: formData.link,
                    description,
                    createdAt: new Date().toISOString(),
                };

                console.log(newBlog);

                const response = await axiosSecure.post('/blog', newBlog);

                if (response.data.insertedId) {
                    toast.success('🎉 Blog created successfully!', {
                        position: "top-right",
                        autoClose: 1600,
                        pauseOnHover: false,
                    });

                    setFormData({
                        headline: '',
                        category: '',
                        image: null,
                        imagePreview: null,
                        readTime: '',
                        link: '',
                    });
                    setDescription("")
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
        <div className="border p-5 shadow font-serif">
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700">Upload Image</label>
                    <input
                        type="file"
                        ref={fileInputRef}
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="mt-1 block w-full text-gray-700"
                        required
                    />
                    <p className="font-serif text-lg font-bold mt-1">Recommended size: 600 x 315 pixels</p>
                    <p className="text-sm text-gray-500">Please upload an image for your blog. Only image files are allowed.</p>
                    {formData.imagePreview && (
                        <img src={formData.imagePreview} alt="Preview" className="mt-3 h-[315px] w-[600px] object-contain rounded-md" />
                    )}
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Headline</label>
                    <input
                        type="text"
                        name="headline"
                        value={formData.headline}
                        onChange={handleChange}
                        placeholder="Enter your blog headline"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                        required
                    />
                </div>
                <div className='grid grid-cols-2 gap-5 mb-4'>
                    <div>
                        <label className="block text-gray-700">Category</label>
                        <input
                            type="text"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            placeholder="Enter the blog category"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Read Time</label>
                        <input
                            type="text"
                            name="readTime"
                            value={formData.readTime}
                            onChange={handleChange}
                            placeholder="Enter the estimated read time (e.g., 10 Min)"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                            required
                        />
                    </div>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">External Link</label>
                    <input
                        type="url"
                        name="link"
                        value={formData.link}
                        onChange={handleChange}
                        placeholder="Enter a related link (optional)"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                    />
                </div>

                <TextEditor value={description} onChange={setDescription} />

                <div className='flex justify-center items-center mt-4'>
                    <Button size='sm' type="submit" loading={loading} className='rounded-none bg-primary font-medium px-10'>PUBLISH</Button>
                </div>
            </form>
        </div>
    );
};

export default CreateBlog;