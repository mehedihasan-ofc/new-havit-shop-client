import { Link } from "react-router-dom";
import PaymentImg from "../../../assets/payment/sslcommerz.png";
import FacebookIcon from "../../../assets/social/facebook.png";
import InstagramIcon from "../../../assets/social/instagram.png";
import YoutubeIcon from "../../../assets/social/youtube.png";
import LinkedinIcon from "../../../assets/social/linkedin.png";
import DiscordIcon from "../../../assets/social/discord.png";
import TelegramIcon from "../../../assets/social/telegram.png";
import TiktokIcon from "../../../assets/social/tiktok.png";
import { SlEarphonesAlt, SlLocationPin } from "react-icons/sl";
import { GrSend } from "react-icons/gr";
import Logo from "../../../assets/logo.png";

const Footer = () => {

    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-white border-t border-gray-200">
            {/* Main Footer Section */}
            <div className="my-container py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="space-y-4">
                    {/* Brand Logo */}
                    <img src={Logo} alt="Havit Shop Logo" className="w-32 h-auto" />

                    {/* Brand Description */}
                    <p className="text-sm text-gray-600 leading-relaxed">
                        Discover the best deals and quality products curated just for you.
                    </p>
                </div>

                {/* Company Section */}
                <div>
                    <h4 className="font-semibold text-lg text-gray-800">Company</h4>
                    <ul className="space-y-3 mt-4 text-sm">
                        <li>
                            <Link
                                to="/terms-conditions"
                                className="text-gray-600 hover:text-primary transition"
                            >
                                Terms & Conditions
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/privacy-policy"
                                className="text-gray-600 hover:text-primary transition"
                            >
                                Privacy Policy
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/return-policy"
                                className="text-gray-600 hover:text-primary transition"
                            >
                                Return Policy
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Get to Know Us Section */}
                <div>
                    <h4 className="font-semibold text-lg text-gray-800">Get to Know Us</h4>
                    <ul className="space-y-3 mt-4 text-sm">
                        <li>
                            <Link
                                to="/faq"
                                className="text-gray-600 hover:text-primary transition"
                            >
                                FAQ
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/our-blog"
                                className="text-gray-600 hover:text-primary transition"
                            >
                                Our Blog
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/about"
                                className="text-gray-600 hover:text-primary transition"
                            >
                                About Us
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Contact Info Section */}
                <div>
                    <h4 className="font-semibold text-lg text-gray-800">Contact Info</h4>
                    <div className="space-y-4 mt-4 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                            <SlLocationPin className="text-primary" />
                            <p>1086 Mukti Palli Road, Vatara Gulshan</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <GrSend className="text-primary" />
                            <p>havitshopp@gmail.com</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <SlEarphonesAlt className="text-primary" />
                            <p>+8801744991003 & +8801892138932</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200"></div>

            {/* Bottom Footer Section */}
            <div className="my-container py-6 flex flex-col md:flex-row items-center justify-between gap-4">
                {/* Copyright */}
                <p className="text-sm text-gray-600">
                    &copy; {currentYear} Havit Shop. All Rights Reserved.
                </p>

                {/* Social Icons */}
                <div className="flex items-center gap-4">
                    <img
                        className="w-6 h-6 object-contain hover:opacity-80 transition"
                        src={FacebookIcon}
                        alt="Facebook"
                    />
                    <img
                        className="w-6 h-6 object-contain hover:opacity-80 transition"
                        src={InstagramIcon}
                        alt="Instagram"
                    />
                    <img
                        className="w-6 h-6 object-contain hover:opacity-80 transition"
                        src={YoutubeIcon}
                        alt="YouTube"
                    />
                    <img
                        className="w-6 h-6 object-contain hover:opacity-80 transition"
                        src={LinkedinIcon}
                        alt="LinkedIn"
                    />
                    <img
                        className="w-6 h-6 object-contain hover:opacity-80 transition"
                        src={DiscordIcon}
                        alt="Discord"
                    />
                    <img
                        className="w-6 h-6 object-contain hover:opacity-80 transition"
                        src={TelegramIcon}
                        alt="Telegram"
                    />
                    <img
                        className="w-6 h-6 object-contain hover:opacity-80 transition"
                        src={TiktokIcon}
                        alt="TikTok"
                    />
                </div>

                {/* Payment Methods */}
                <div>
                    <img
                        className="w-full max-w-sm h-auto object-contain"
                        src={PaymentImg}
                        alt="Payment Methods"
                    />
                </div>
            </div>
        </footer>
    );
};

export default Footer;