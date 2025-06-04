import { Button } from '@material-tailwind/react';
import { useRef, useState } from 'react';
import { uploadImageToStorage } from '../../../../utils';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { toast } from 'react-toastify';

const CreateBlog = () => {

    const [axiosSecure] = useAxiosSecure();

    const [formData, setFormData] = useState({
        headline: '',
        description: '',
        category: '',
        image: null,
        imagePreview: null,
        readTime: '',
        link: '',
        content: [{ _id: 1, title: '', description: '' }]
    });

    const fileInputRef = useRef(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleContentChange = (index, e) => {
        const { name, value } = e.target;
        const newContent = [...formData.content];
        newContent[index][name] = value;
        setFormData({ ...formData, content: newContent });
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const imagePreview = URL.createObjectURL(file);
            setFormData({ ...formData, image: file, imagePreview });
        }
    };

    const addContentSection = () => {
        const newId = formData.content.length ? formData.content[formData.content.length - 1]._id + 1 : 1;
        setFormData({
            ...formData,
            content: [...formData.content, { _id: newId, title: '', description: '' }]
        });
    };

    const removeContentSection = (id) => {
        setFormData({
            ...formData,
            content: formData.content.filter((section) => section._id !== id),
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.image) {
            setLoading(true);
            try {
                // Upload the image and get the download URL
                const imageLink = await uploadImageToStorage(formData.image);

                // Prepare the data to be sent to the API
                const newBlog = {
                    headline: formData.headline,
                    description: formData.description,
                    category: formData.category,
                    image: imageLink,
                    readTime: formData.readTime,
                    link: formData.link,
                    createdAt: new Date().toISOString(),
                    content: formData.content
                };                

                // Make an API call to send the data to the database
                axiosSecure.post('/blog', newBlog)
                    .then(data => {
                        if (data.data.insertedId) {

                            toast.success('🎉 Blog created successfully!', {
                                position: "top-right",
                                autoClose: 1600,
                                pauseOnHover: false,
                            });

                            setFormData({
                                headline: '',
                                description: '',
                                category: '',
                                image: null,
                                imagePreview: null,
                                readTime: '',
                                link: '',
                                content: [{ _id: 1, title: '', description: '' }]
                            });
                            fileInputRef.current.value = null;
                        }
                    })


            } catch (error) {
                console.error('Error uploading image:', error);
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <div className="border p-5 shadow">
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
                    <p className="font-serif text-lg font-bold mt-1">Recommended size: 1200 x 800 pixels</p>
                    <p className="text-sm text-gray-500">Please upload an image for your blog. Only image files are allowed.</p>
                    {formData.imagePreview && (
                        <img src={formData.imagePreview} alt="Preview" className="mt-2 h-40 w-full object-cover rounded-md" />
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
                <div className="mb-4">
                    <label className="block text-gray-700">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Enter a brief description of your blog"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                        required
                    ></textarea>
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

                <div className='text-end'>
                    <Button size='sm' type='button' onClick={addContentSection} className='rounded-none bg-primary font-medium'>Add Content Section</Button>
                </div>

                {formData.content.map((section, index) => (
                    <div key={section._id} className="mb-4 relative border p-3 rounded-md mt-2">
                        {section._id !== 1 && (
                            <button
                                type="button"
                                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                                onClick={() => removeContentSection(section._id)}
                            >
                                ✕
                            </button>
                        )}
                        <label className="block text-gray-700">Content Section {index + 1}</label>
                        <input
                            type="text"
                            name="title"
                            value={section.title}
                            onChange={(e) => handleContentChange(index, e)}
                            placeholder="Enter section title"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                            required
                        />
                        <textarea
                            name="description"
                            value={section.description}
                            onChange={(e) => handleContentChange(index, e)}
                            placeholder="Enter section description"
                            className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                            required
                        ></textarea>
                    </div>
                ))}

                <div className='flex justify-center items-center'>
                    <Button size='sm' type="submit" loading={loading} className='rounded-none bg-primary font-medium px-10'>Submit</Button>
                </div>
            </form>
        </div>
    );
};

export default CreateBlog;