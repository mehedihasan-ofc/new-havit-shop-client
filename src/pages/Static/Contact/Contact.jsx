import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { useState } from "react";
import { HiOutlineMail } from "react-icons/hi";
import { FiMapPin } from "react-icons/fi";
import FacebookIcon from "../../../assets/social/facebook.png";
import InstagramIcon from "../../../assets/social/instagram.png";
import YoutubeIcon from "../../../assets/social/youtube.png";
import LinkedinIcon from "../../../assets/social/linkedin.png";
import DiscordIcon from "../../../assets/social/discord.png";
import TelegramIcon from "../../../assets/social/telegram.png";
import TiktokIcon from "../../../assets/social/tiktok.png";
import { BiSupport } from "react-icons/bi";
import { AiOutlineLike } from "react-icons/ai";
import axios from "axios";
import { toast } from "react-toastify";


const Contact = () => {

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
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);

        try {
            const newMessage = {
                ...formData,
                createdAt: new Date().toISOString()
            }

            const response = await axios.post('http://localhost:5000/message', newMessage);
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
    }

    return (
        <div className="my-container my-10">

            <div className="grid grid-cols-2 gap-5 shadow border p-10">

                <div className="space-y-6">
                    <div className="flex items-center gap-2">
                        <HiOutlineBuildingOffice2 size={24} />
                        <h2 className="text-2xl font-semibold">Visit Us</h2>
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center gap-1">
                            <FiMapPin size={18} />
                            <p>1086 Mukti Palli Road Vatara Gulshan</p>
                        </div>

                        <div className="flex items-center gap-1">
                            <HiOutlineMail size={18} />
                            <p>havitshopp@gmail.com</p>
                        </div>
                    </div>

                    <div className="space-y-1">
                        <div className="flex items-center gap-2">
                            <BiSupport size={24} />
                            <h2 className="text-2xl font-semibold">We're Here to Help</h2>
                        </div>
                        <p>Feel free to reach out to us at</p>
                        <p><span className="underline text-primary">+8801744991003</span> or <span className="underline text-primary">+8801892138932</span></p>
                        <p>Always Here for You: 24/7 Support</p>
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <AiOutlineLike size={24} />
                            <h2 className="text-2xl font-semibold">Follow Us on Social Media</h2>
                        </div>

                        <div className="flex items-center gap-3">
                            <img className="w-8 h-8 object-contain" src={FacebookIcon} alt="" />
                            <img className="w-8 h-8 object-contain" src={InstagramIcon} alt="" />
                            <img className="w-8 h-8 object-contain" src={YoutubeIcon} alt="" />
                            <img className="w-8 h-8 object-contain" src={LinkedinIcon} alt="" />
                            <img className="w-8 h-8 object-contain" src={DiscordIcon} alt="" />
                            <img className="w-8 h-8 object-contain" src={TelegramIcon} alt="" />
                            <img className="w-8 h-8 object-contain" src={TiktokIcon} alt="" />
                        </div>
                    </div>
                </div>

                <div>
                    <h2 className="text-2xl font-semibold mb-5">Contact Us For Any Questions</h2>
                    <form className="space-y-5" onSubmit={handleSubmit}>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                            <input className="block w-full bg-gray-100 rounded-none px-3 py-2 focus:outline-none focus:border-blue-500" type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter Your Name" required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input className="block w-full bg-gray-100 rounded-none px-3 py-2 focus:outline-none focus:border-blue-500" type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter Your Valid Email Address" required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                            <textarea className="block w-full bg-gray-100 rounded-none px-3 py-2 focus:outline-none focus:border-blue-500" name="message" value={formData.message} onChange={handleChange} placeholder="Enter Your Message" required></textarea>
                        </div>
                        <button disabled={loading} type="submit" className="border w-full py-2 hover:bg-primary hover:text-white transition duration-300 ease-in-out">
                            {loading ? 'Submitting...' : 'Submit'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;
