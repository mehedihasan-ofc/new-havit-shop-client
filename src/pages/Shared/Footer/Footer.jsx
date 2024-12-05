import { Link } from "react-router-dom";
import PaymentImg from "../../../assets/payment/sslcommerz.png";
import { SlEarphonesAlt, SlLocationPin } from "react-icons/sl";
import { GrSend } from "react-icons/gr";
import useLogo from "../../../hooks/useLogo";
import useContactInfoData from "../../../hooks/useContactInfoData";
import useSocialMedia from "../../../hooks/useSocialMedia";
import { FaFacebook, FaInstagram, FaYoutube, FaTwitter, FaLinkedin, FaPinterest, FaReddit, FaWhatsapp, FaSnapchat, FaTiktok } from "react-icons/fa";


const Footer = () => {

    const [logoData] = useLogo();
    const [socialMediaData] = useSocialMedia();

    const [contactInfoData] = useContactInfoData();
    const currentYear = new Date().getFullYear();

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
        <footer className="bg-secondary border-t border-gray-200 text-gray-800">
            {/* Main Footer Section */}
            <div className="my-container py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {/* Brand Section */}
                <div className="space-y-4">
                    <img
                        src={logoData?.logo}
                        alt="Havit Shop Logo"
                        className="w-[150px] h-[70px] object-cover mx-auto lg:mx-0"
                    />
                    <p className="text-sm leading-relaxed text-center lg:text-left">
                        Discover the best deals and quality products curated just for you.
                    </p>
                </div>

                {/* Company Links */}
                <div>
                    <h4 className="text-lg font-semibold mb-4">Company</h4>
                    <ul className="space-y-3">
                        <li>
                            <Link
                                to="/terms-conditions"
                                className="text-sm text-gray-700 hover:text-[#3BB77E] transition"
                            >
                                Terms & Conditions
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/privacy-policy"
                                className="text-sm text-gray-700 hover:text-[#3BB77E] transition"
                            >
                                Privacy Policy
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/return-policy"
                                className="text-sm text-gray-700 hover:text-[#3BB77E] transition"
                            >
                                Return Policy
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Get to Know Us */}
                <div>
                    <h4 className="text-lg font-semibold mb-4">Get to Know Us</h4>
                    <ul className="space-y-3">
                        <li>
                            <Link
                                to="/faq"
                                className="text-sm text-gray-700 hover:text-[#3BB77E] transition"
                            >
                                FAQ
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/our-blog"
                                className="text-sm text-gray-700 hover:text-[#3BB77E] transition"
                            >
                                Our Blog
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/about"
                                className="text-sm text-gray-700 hover:text-[#3BB77E] transition"
                            >
                                About Us
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Contact Info */}
                <div>
                    <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
                    <ul className="space-y-4">
                        <li className="flex items-center gap-2">
                            <SlLocationPin className="text-[#3BB77E]" />
                            <span className="text-sm">{contactInfoData?.address || "Address not available"}</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <GrSend className="text-[#3BB77E]" />
                            <span className="text-sm">{contactInfoData?.email || "Email not available"}</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <SlEarphonesAlt className="text-[#3BB77E]" />
                            <div className="space-y-1">
                                {contactInfoData?.phone?.map((number, index) => (
                                    <span key={index} className="text-sm block">{number}</span>
                                )) || "Phone not available"}
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-300"></div>

            {/* Bottom Footer */}
            <div className="my-container py-6 flex flex-col lg:flex-row items-center justify-between gap-6">
                {/* Copyright */}
                <p className="text-sm text-center lg:text-left">
                    &copy; {currentYear} Havit Shop. All Rights Reserved.
                </p>

                {/* Social Links */}
                <div className="flex gap-4 justify-center">
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

                {/* Payment Methods */}
                <div>
                    <img
                        src={PaymentImg}
                        alt="Payment Methods"
                        className="w-36 h-auto object-contain"
                    />
                </div>
            </div>
        </footer>
    );
};

export default Footer;
