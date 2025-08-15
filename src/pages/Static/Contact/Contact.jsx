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
import {
    FaFacebook, FaInstagram, FaYoutube, FaTwitter, FaLinkedin,
    FaPinterest, FaReddit, FaWhatsapp, FaSnapchat, FaTiktok
} from "react-icons/fa";

const Contact = () => {
    const [contactInfoData] = useContactInfoData();
    const [socialMediaData] = useSocialMedia();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const newMessage = {
                ...formData,
                createdAt: new Date().toISOString(),
            };

            const response = await axios.post("http://localhost:5000/message", newMessage);
            if (response.data.message === "Email already exists!") {
                toast.error("This email has already sent a message!", {
                    position: "top-right",
                    autoClose: 1600,
                    pauseOnHover: false,
                });
            } else {
                setFormData({ name: "", email: "", message: "" });
                toast.success("Message sent successfully!", {
                    position: "top-right",
                    autoClose: 1600,
                    pauseOnHover: false,
                });
            }
        } catch (error) {
            console.error("Error sending message:", error);
            toast.error("Failed to send message.", {
                position: "top-right",
                autoClose: 1600,
                pauseOnHover: false,
            });
        } finally {
            setLoading(false);
        }
    };

    const socialIcons = {
        Facebook: <FaFacebook />,
        Instagram: <FaInstagram />,
        YouTube: <FaYoutube />,
        Twitter: <FaTwitter />,
        LinkedIn: <FaLinkedin />,
        Pinterest: <FaPinterest />,
        Reddit: <FaReddit />,
        WhatsApp: <FaWhatsapp />,
        Snapchat: <FaSnapchat />,
        TikTok: <FaTiktok />,
    };

    return (
        <div className="my-container my-5">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                {/* Left Section */}
                <div className="bg-white shadow-md rounded-md p-8 space-y-8">
                    {/* Visit Us */}
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <HiOutlineBuildingOffice2 size={24} className="text-primary" />
                            <h2 className="text-base lg:text-lg font-semibold font-serif">Visit Us</h2>
                        </div>
                        <div className="space-y-2 text-gray-700">
                            <div className="flex items-center gap-2">
                                <FiMapPin className="text-primary" />
                                <p>{contactInfoData?.address || "Address not available"}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <HiOutlineMail className="text-primary" />
                                <p>{contactInfoData?.email || "Email not available"}</p>
                            </div>
                        </div>
                    </div>

                    {/* Support */}
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <BiSupport size={24} className="text-primary" />
                            <h2 className="text-base lg:text-lg font-semibold font-serif">We're Here to Help</h2>
                        </div>
                        <p className="text-gray-600 mb-2">Feel free to reach out to us at</p>
                        <div className="space-y-1">
                            {contactInfoData?.phone?.map((number, index) => (
                                <p key={index} className="text-primary font-medium">{number}</p>
                            )) || "Phone not available"}
                        </div>
                        <p className="text-sm text-gray-500 mt-2">Always Here for You: 24/7 Support</p>
                    </div>

                    {/* Social Media */}
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <AiOutlineLike size={24} className="text-primary" />
                            <h2 className="text-base lg:text-lg font-semibold font-serif">Follow Us</h2>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            {socialMediaData?.socialMedia?.slice(0, 10).map((social, index) => {
                                const Icon = socialIcons[social.platform];
                                return (
                                    <Link
                                        key={index}
                                        to={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2 rounded-full bg-gray-100 text-primary hover:bg-primary hover:text-white transition"
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
                <div className="bg-white shadow-md rounded-md p-8">
                    <h2 className="text-lg lg:text-xl font-semibold mb-6 text-primary font-serif border-b">
                        Contact Us For Any Questions
                    </h2>
                    <form className="space-y-5" onSubmit={handleSubmit}>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter Your Name"
                                required
                                className="w-full border rounded px-4 py-2 focus:outline-none focus:border-primary bg-gray-50"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter Your Valid Email"
                                required
                                className="w-full border rounded px-4 py-2 focus:outline-none focus:border-primary bg-gray-50"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="Enter Your Message"
                                required
                                className="w-full border rounded px-4 py-2 focus:outline-none focus:border-primary bg-gray-50 h-28"
                            ></textarea>
                        </div>
                        <button
                            disabled={loading}
                            type="submit"
                            className="w-full py-2 bg-primary text-white rounded hover:bg-primary/90 transition"
                        >
                            {loading ? "Submitting..." : "Submit"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;
