import { useContext, useEffect, useState } from "react";
import { MdOutlineSearch } from "react-icons/md";
import { PiShoppingCartSimpleLight } from "react-icons/pi";
import { HiOutlineUser } from "react-icons/hi2";
import { FaBars, FaXmark } from "react-icons/fa6";
import { Avatar, Badge, Collapse, Navbar } from "@material-tailwind/react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import BreakingMarquee from "../../../components/BreakingMarquee/BreakingMarquee";
import Logo from "../../../assets/logo.png";
import UserImg from "../../../assets/user.jpg";
import useCart from "../../../hooks/useCart";
import { AuthContext } from "../../../provider/AuthProvider";

const Header = () => {
    const { user } = useContext(AuthContext);
    const [cart] = useCart();
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const [openNav, setOpenNav] = useState(false);

    useEffect(() => {
        window.addEventListener("resize", () => window.innerWidth >= 960 && setOpenNav(false));
    }, []);

    return (
        <div className="border-b bg-white">
            {/* Breaking Marquee */}
            {["/", "/our-blog", "/about", "/contact"].includes(pathname) && <BreakingMarquee />}

            {/* Top Header */}
            <div className="border-b py-1">
                <div className="my-container flex items-center justify-between lg:justify-start gap-4">
                    {/* Logo */}
                    <Link to="/">
                        <img
                            className="w-20 md:w-36 h-auto object-cover"
                            src={Logo}
                            alt="Logo"
                        />
                    </Link>

                    {/* Search Bar (Hidden on Mobile) */}
                    <form
                        className="hidden md:flex items-center w-96"
                        onSubmit={(e) => {
                            e.preventDefault();
                            navigate(`/search?q=${encodeURIComponent(e.target[0].value)}`);
                        }}
                    >
                        <input
                            type="text"
                            placeholder="Search for items..."
                            className="w-full px-4 py-2 text-sm border rounded-l-md outline-none focus:ring focus:ring-primary"
                        />
                        <button
                            type="submit"
                            className="px-4 bg-primary text-white rounded-r-md hover:bg-green-700"
                        >
                            <MdOutlineSearch size={18} />
                        </button>
                    </form>

                    {/* Mobile Actions */}
                    <div className="flex items-center gap-4">
                        {/* Cart */}
                        <div
                            onClick={() => navigate("/view-cart")}
                            className="relative cursor-pointer flex items-center"
                        >
                            <Badge
                                className="bg-primary min-w-[20px] min-h-[20px]"
                                content={cart?.length || 0}
                                overlap="circular"
                            >
                                <PiShoppingCartSimpleLight size={28} />
                            </Badge>
                        </div>

                        {/* User Avatar */}
                        {user ? (
                            <Avatar src={user.photoURL || UserImg} alt="User" size="xs" />
                        ) : (
                            <Link to="/login" className="text-sm flex items-center">
                                <HiOutlineUser size={26} />
                            </Link>
                        )}

                        {/* Hamburger Menu */}
                        <button
                            onClick={() => setOpenNav(!openNav)}
                            className="lg:hidden focus:outline-none"
                        >
                            {openNav ? <FaXmark size={26} /> : <FaBars size={26} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Navigation for Mobile */}
            <Collapse open={openNav} className="bg-gray-100 lg:hidden">
                <Navbar>
                    <ul className="flex flex-col items-center gap-4 py-4">
                        <li>
                            <Link to="/" className="text-primary">Home</Link>
                        </li>
                        <li>
                            <Link to="/our-blog" className="text-primary">Blog</Link>
                        </li>
                        <li>
                            <Link to="/about" className="text-primary">About</Link>
                        </li>
                        <li>
                            <Link to="/contact" className="text-primary">Contact</Link>
                        </li>
                    </ul>
                </Navbar>
            </Collapse>

            {/* Navigation for Desktop */}
            <div className="hidden lg:flex my-container items-center justify-center py-2">
                <ul className="flex items-center gap-8">
                    <li>
                        <Link to="/" className="hover:text-primary">Home</Link>
                    </li>
                    <li>
                        <Link to="/our-blog" className="hover:text-primary">Blog</Link>
                    </li>
                    <li>
                        <Link to="/about" className="hover:text-primary">About</Link>
                    </li>
                    <li>
                        <Link to="/contact" className="hover:text-primary">Contact</Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Header;