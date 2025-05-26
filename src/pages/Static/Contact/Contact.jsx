import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { useState } from "react";
import { HiOutlineMail } from "react-icons/hi";
import { FiMapPin } from "react-icons/fi";
import { BiSupport } from "react-icons/bi";
import { AiOutlineLike } from "react-icons/ai";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import useContactInfoData from "../../../hooks/useContactInfoData";
import useSocialMedia from "../../../hooks/useSocialMedia";
import { FaFacebook, FaInstagram, FaYoutube, FaTwitter, FaLinkedin, FaPinterest, FaReddit, FaWhatsapp, FaSnapchat, FaTiktok } from "react-icons/fa";

const Contact = () => {

    const [contactInfoData, isLoading] = useContactInfoData();
    const [socialMediaData] = useSocialMedia();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const newMessage = {
                ...formData,
                createdAt: new Date().toISOString()
            };

            const response = await axios.post('https://server.havitshopbd.com/message', newMessage);
            if (response.data.message === 'Email already exists!') {
                toast.error('This email has already sent a message!', {
                    position: "top-right",
                    autoClose: 1600,
                    pauseOnHover: false,
                });
            } else {
                setFormData({
                    name: '',
                    email: '',
                    message: ''
                });
                toast.success('Message sent successfully!', {
                    position: "top-right",
                    autoClose: 1600,
                    pauseOnHover: false,
                });
            }
        } catch (error) {
            console.error('Error sending message:', error);
            toast.error('Failed to send message.', {
                position: "top-right",
                autoClose: 1600,
                pauseOnHover: false,
            });
        } finally {
            setLoading(false);
        }
    };

    if (isLoading) return;

    const socialIcons = {
        Facebook: <FaFacebook size={20} />,
        Instagram: <FaInstagram size={20} />,
        YouTube: <FaYoutube size={20} />,
        Twitter: <FaTwitter size={20} />,
        LinkedIn: <FaLinkedin size={20} />,
        Pinterest: <FaPinterest size={20} />,
        Reddit: <FaReddit size={20} />,
        WhatsApp: <FaWhatsapp size={20} />,
        Snapchat: <FaSnapchat size={20} />,
        TikTok: <FaTiktok size={20} />,
    };

    return (
        <div className="my-container my-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 shadow border p-6 lg:p-10">
                {/* Left Section */}
                <div className="space-y-6">
                    {/* Visit Us */}
                    <div className="flex items-center gap-2">
                        <HiOutlineBuildingOffice2 size={24} />
                        <h2 className="text-lg lg:text-xl font-semibold">Visit Us</h2>
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center gap-1">
                            <FiMapPin size={18} />
                            <p className="text-sm lg:text-base">
                                {contactInfoData?.address || "Address not available"}
                            </p>
                        </div>
                        <div className="flex items-center gap-1">
                            <HiOutlineMail size={18} />
                            <p className="text-sm lg:text-base">
                                {contactInfoData?.email || "Email not available"}
                            </p>
                        </div>
                    </div>

                    {/* Support Section */}
                    <div className="space-y-1">
                        <div className="flex items-center gap-2">
                            <BiSupport size={24} />
                            <h2 className="text-lg lg:text-xl font-semibold">We're Here to Help</h2>
                        </div>
                        <p className="text-sm lg:text-base">Feel free to reach out to us at</p>
                        <div className="text-sm lg:text-base space-y-1">
                            {contactInfoData?.phone?.map((number, index) => (
                                <p key={index} className="underline text-primary">
                                    {number}
                                </p>
                            )) || "Phone not available"}
                        </div>
                        <p className="text-sm lg:text-base">Always Here for You: 24/7 Support</p>
                    </div>

                    {/* Social Media Section */}
                    <div className="space-y-3">
                        
                        <div className="flex items-center gap-2">
                            <AiOutlineLike size={24} />
                            <h2 className="text-lg lg:text-xl font-semibold">Follow Us on Social Media</h2>
                        </div>

                        <div className="flex items-center gap-3">
                            {socialMediaData?.socialMedia?.slice(0, 10).map((social, index) => {
                                const Icon = socialIcons[social.platform];
                                return (
                                    <Link
                                        key={index}
                                        to={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-primary hover:text-green-600 transition"
                                        aria-label={social.platform}
                                    >
                                        {Icon}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Right Section */}
                <div>
                    <h2 className="text-xl lg:text-2xl font-semibold mb-5">Contact Us For Any Questions</h2>
                    <form className="space-y-5" onSubmit={handleSubmit}>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                            <input
                                className="block w-full bg-gray-100 rounded-none px-3 py-2 focus:outline-none focus:border-blue-500"
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter Your Name"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input
                                className="block w-full bg-gray-100 rounded-none px-3 py-2 focus:outline-none focus:border-blue-500"
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter Your Valid Email Address"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                            <textarea
                                className="block w-full bg-gray-100 rounded-none px-3 py-2 focus:outline-none focus:border-blue-500"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="Enter Your Message"
                                required
                            ></textarea>
                        </div>
                        <button
                            disabled={loading}
                            type="submit"
                            className="border w-full py-2 hover:bg-primary hover:text-white transition duration-300 ease-in-out"
                        >
                            {loading ? 'Submitting...' : 'Submit'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;
