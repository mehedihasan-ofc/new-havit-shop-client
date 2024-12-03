import { Link } from "react-router-dom";
import PaymentImg from "../../../assets/payment/sslcommerz.png";
import FacebookIcon from "../../../assets/social/facebook.png";
import InstagramIcon from "../../../assets/social/instagram.png";
import YoutubeIcon from "../../../assets/social/youtube.png";
import SnapchatIcon from "../../../assets/social/snapchat.png";
import TiktokIcon from "../../../assets/social/tiktok.png";
import { SlEarphonesAlt, SlLocationPin } from "react-icons/sl";
import { GrSend } from "react-icons/gr";
import useLogo from "../../../hooks/useLogo";
import useContactInfoData from "../../../hooks/useContactInfoData";

const Footer = () => {

    const [logoData, loading] = useLogo();
    const [contactInfoData, isLoading] = useContactInfoData();
    const currentYear = new Date().getFullYear();

    if (loading || isLoading) return;

    console.log(contactInfoData);

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
                <div className="flex items-center gap-4">
                    <Link
                        target="_blank"
                        to="https://web.facebook.com/havitshopping"
                        className="hover:opacity-80 transition"
                    >
                        <img
                            src={FacebookIcon}
                            alt="Facebook"
                            className="w-6 h-6 object-contain"
                        />
                    </Link>
                    <Link
                        target="_blank"
                        to="https://www.instagram.com/havit_shop/profilecard"
                        className="hover:opacity-80 transition"
                    >
                        <img
                            src={InstagramIcon}
                            alt="Instagram"
                            className="w-6 h-6 object-contain"
                        />
                    </Link>
                    <Link
                        target="_blank"
                        to="https://www.youtube.com/@havitshop"
                        className="hover:opacity-80 transition"
                    >
                        <img
                            src={YoutubeIcon}
                            alt="YouTube"
                            className="w-6 h-6 object-contain"
                        />
                    </Link>
                    <Link
                        target="_blank"
                        to="https://www.snapchat.com/add/mahamudul_h535"
                        className="hover:opacity-80 transition"
                    >
                        <img
                            src={SnapchatIcon}
                            alt="Snapchat"
                            className="w-6 h-6 object-contain"
                        />
                    </Link>
                    <Link
                        target="_blank"
                        to="https://www.tiktok.com/@havit.shop"
                        className="hover:opacity-80 transition"
                    >
                        <img
                            src={TiktokIcon}
                            alt="TikTok"
                            className="w-6 h-6 object-contain"
                        />
                    </Link>
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
