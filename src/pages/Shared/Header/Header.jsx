import { useContext, useEffect, useState } from "react";
import { MdOutlineSearch } from "react-icons/md";
import { PiShoppingCartSimpleLight } from "react-icons/pi";
import { HiOutlineUser } from "react-icons/hi2";
import { FaBars, FaXmark } from "react-icons/fa6";
import { Avatar, Badge, Menu, MenuHandler, MenuItem, MenuList, Navbar, Typography } from "@material-tailwind/react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import BreakingMarquee from "../../../components/BreakingMarquee/BreakingMarquee";
import UserImg from "../../../assets/user.jpg";
import useCart from "../../../hooks/useCart";
import { AuthContext } from "../../../provider/AuthProvider";
import NavList from "../../../components/NavbarWithMegaMenu/NavList";
import useRole from "../../../hooks/useRole";
import Swal from "sweetalert2";
import { LuLayoutDashboard } from "react-icons/lu";
import { FiShoppingCart } from "react-icons/fi";
import { HiLogout } from "react-icons/hi";
import MobileNavigation from "../../../components/MobileNavigation/MobileNavigation";
import useLogo from "../../../hooks/useLogo";

const Header = () => {

    const [logoData] = useLogo();
    const { user, logOut } = useContext(AuthContext);

    const [role] = useRole();
    const [cart] = useCart();

    const { pathname } = useLocation();
    const navigate = useNavigate();
    const [openNav, setOpenNav] = useState(false);
    const closeDrawer = () => setOpenNav(false);

    useEffect(() => {
        window.addEventListener(
            "resize",
            () => window.innerWidth >= 960 && setOpenNav(false),
        );
    }, []);

    const handleLogOut = () => {
        Swal.fire({
            title: "Are you sure want to sign out?",
            text: "You will need to log in again to access your account.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, sign out!"
        }).then((result) => {
            if (result.isConfirmed) {
                logOut()
                    .then(() => {
                        Swal.fire({
                            title: "Signed Out",
                            text: "You have successfully signed out.",
                            icon: "success"
                        });
                    })
                    .catch(err => {
                        Swal.fire({
                            title: "Error",
                            text: "Something went wrong while signing out.",
                            icon: "error"
                        });
                    })
            }
        });
    }

    return (
        <div className="border-b bg-white">
            {/* Breaking Marquee */}
            {["/", "/view-cart", "/login", "/register", "/discounted-products", "/our-blog", "/about", "/contact"].includes(pathname) && <BreakingMarquee />}

            {/* Top Header */}
            <div className="border-b py-1">
                <div className="my-container">

                    <div className="flex justify-between items-center">

                        <Link to="/"><img className="w-[150px] h-[70px] object-cover" src={logoData?.logo} alt="Logo" /></Link>

                        <form className="hidden md:block w-96"
                            onSubmit={(e) => {
                                e.preventDefault();
                                navigate(`/search?q=${encodeURIComponent(e.target[0].value)}`);
                            }}
                        >
                            <div
                                className="flex items-center border hover:border-primary focus-within:border-primary transition-all duration-300 ease-in-out rounded overflow-hidden shadow-sm focus-within:shadow-md"
                            >
                                <input
                                    type="text"
                                    placeholder="Search for items..."
                                    className="px-5 w-full outline-none text-sm h-10 border-none focus:ring-0 transition-all duration-300 ease-in-out"
                                    required
                                />
                                <button
                                    type="submit"
                                    className="px-3 bg-white text-gray-500 outline-none h-10 flex items-center justify-center hover:text-primary transition-all duration-300 ease-in-out"
                                >
                                    <MdOutlineSearch size={18} />
                                </button>
                            </div>
                        </form>


                        <div className="flex items-center justify-center gap-5 md:gap-8">

                            <div className="flex items-end gap-1 font-serif cursor-pointer">
                                {role === "admin" ? (
                                    // Show beautiful text for admin users
                                    <p className="text-sm font-bold text-primary">Welcome, Admin!</p>
                                ) : (
                                    // Show the cart for non-admin users
                                    <div onClick={() => navigate("/view-cart")} className="flex items-end gap-1 cursor-pointer">
                                        <Badge className="bg-primary min-w-[20px] min-h-[20px]" content={cart?.length} overlap="circular">
                                            <PiShoppingCartSimpleLight size={28} />
                                        </Badge>
                                        <p className="text-xs hidden md:block">Cart</p>
                                    </div>
                                )}
                            </div>

                            {
                                user ? (
                                    role === "admin" ? (
                                        // Show only avatar for admin
                                        <div className="cursor-pointer">
                                            <Avatar src={user?.photoURL || UserImg} alt={user?.displayName} size="xs" />
                                        </div>
                                    ) : (
                                        // Show menu for other roles
                                        <Menu allowHover={true}>
                                            <MenuHandler>
                                                <div className="cursor-pointer">
                                                    <div className="flex items-end gap-1">
                                                        <Avatar src={user?.photoURL || UserImg} alt={user?.displayName} size="xs" />
                                                        <p className="text-xs hidden md:block">My Account</p>
                                                    </div>
                                                </div>
                                            </MenuHandler>

                                            <MenuList>
                                                <Link className="outline-none" to="/profile/dashboard">
                                                    <MenuItem className="flex items-center gap-2">
                                                        <LuLayoutDashboard size={18} />
                                                        <Typography variant="small" className="font-medium">
                                                            My Dashboard
                                                        </Typography>
                                                    </MenuItem>
                                                </Link>

                                                <Link className="outline-none" to="/profile/orders">
                                                    <MenuItem className="flex items-center gap-2">
                                                        <FiShoppingCart size={18} />
                                                        <Typography variant="small" className="font-medium">
                                                            My Orders
                                                        </Typography>
                                                    </MenuItem>
                                                </Link>

                                                <hr className="my-2 border-blue-gray-50" />

                                                <MenuItem onClick={handleLogOut} className="flex items-center gap-2">
                                                    <HiLogout size={18} />
                                                    <Typography variant="small" className="font-medium">
                                                        Sign Out
                                                    </Typography>
                                                </MenuItem>
                                            </MenuList>
                                        </Menu>
                                    )
                                ) : (
                                    // Show login link for unauthenticated users
                                    <Link to="/login">
                                        <div>
                                            <div className="flex items-end gap-1">
                                                <HiOutlineUser size={26} />
                                                <p className="text-xs hidden md:block">Sign In</p>
                                            </div>
                                        </div>
                                    </Link>
                                )
                            }

                            {/* Hamburger Menu */}
                            <button
                                onClick={() => setOpenNav(!openNav)}
                                className="lg:hidden focus:outline-none"
                            >
                                {openNav ? <FaXmark size={22} /> : <FaBars size={22} />}
                            </button>
                        </div>

                    </div>
                </div>
            </div>

            {/* Navigation for Mobile */}
            <MobileNavigation
                openNav={openNav}
                closeDrawer={closeDrawer}
                handleLogOut={handleLogOut}
                user={user}
                role={role}
            />



            {/* Navigation for Desktop */}
            <div className="hidden lg:flex my-container items-center justify-center">
                <Navbar className="px-0 py-1 shadow-none bg-transparent w-full">
                    <div className="flex items-center justify-center">
                        <div className="hidden lg:flex">
                            <NavList />
                        </div>
                    </div>
                </Navbar>
            </div>
        </div>
    );
};

export default Header;