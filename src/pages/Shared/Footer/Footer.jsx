import { Link } from "react-router-dom";
import PaymentImg from "../../../assets/payment/sslcommerz.png";
import FacebookIcon from "../../../assets/social/facebook.png";
import InstagramIcon from "../../../assets/social/instagram.png";
import YoutubeIcon from "../../../assets/social/youtube.png";
import LinkedinIcon from "../../../assets/social/linkedin.png";
import DiscordIcon from "../../../assets/social/discord.png";
import TelegramIcon from "../../../assets/social/telegram.png";
import TiktokIcon from "../../../assets/social/tiktok.png";
import { SlLocationPin } from "react-icons/sl";
import { TfiEmail } from "react-icons/tfi";
import { MdLocalPhone } from "react-icons/md";

const Footer = () => {

    // Get the current year
    const currentYear = new Date().getFullYear();

    return (
        <div>
            <div>
                
                <div className="my-container flex justify-between items-center gap-5 py-10">

                    <div className="space-y-2">
                        <h4 className="font-semibold text-lg">Havit Shop</h4>
                    </div>

                    <div>
                        <h4 className="font-sans font-semibold text-base">Company</h4>

                        <div className="space-y-2 font-serif text-sm mt-5">
                            <p className="hover:underline transition-all duration-300"><Link to="/terms-conditions">Terms & Conditions</Link></p>
                            <p className="hover:underline transition-all duration-300"><Link to="/privacy-policy">Privacy Policy</Link></p>
                            <p className="hover:underline transition-all duration-300"><Link to="/return-policy">Return Policy</Link></p>
                        </div>
                    </div>
                    <div>
                        <h4 className="font-sans font-semibold text-base">Get to Know Us</h4>

                        <div className="space-y-2 font-serif text-sm mt-5">
                            <p className="hover:underline transition-all duration-300"><Link to="/faq">FAQ</Link></p>
                            <p className="hover:underline transition-all duration-300"><Link to="/our-blog">Our Blog</Link></p>
                            <p className="hover:underline transition-all duration-300"><Link to="/about">About Us</Link></p>
                        </div>
                    </div>
                    <div>
                        <h4 className="font-sans font-semibold text-base">Contact Info</h4>

                        <div className="space-y-2 font-serif text-sm mt-5">
                            <div className="flex items-center gap-2">
                                <SlLocationPin />
                                <p>1086 Mukti Palli Road, Vatara Gulshan</p>
                            </div>

                            <div className="flex items-center gap-2">
                                <TfiEmail />
                                <p>havitshopp@gmail.com </p>
                            </div>

                            <div className="flex items-center gap-2">
                                <MdLocalPhone />
                                <p>+8801744991003 & +8801892138932</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            
            <hr />

            <div>
                <div className="my-container flex justify-between items-center gap-5 py-5">
                    <div>
                        <p>&copy; {currentYear} Havit Shop. All Rights Reserved.</p>
                    </div>

                    <div className="flex items-center gap-3">
                        <img className="w-6 h-6 object-contain" src={FacebookIcon} alt="" />
                        <img className="w-6 h-6 object-contain" src={InstagramIcon} alt="" />
                        <img className="w-6 h-6 object-contain" src={YoutubeIcon} alt="" />
                        <img className="w-6 h-6 object-contain" src={LinkedinIcon} alt="" />
                        <img className="w-6 h-6 object-contain" src={DiscordIcon} alt="" />
                        <img className="w-6 h-6 object-contain" src={TelegramIcon} alt="" />
                        <img className="w-6 h-6 object-contain" src={TiktokIcon} alt="" />
                    </div>

                    <div>
                        <img className="w-full h-14 object-contain" src={PaymentImg} alt="" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;