import { useContext, useEffect, useState } from "react";
import { MdOutlineSearch } from "react-icons/md";
import Logo from "../../../assets/logo.png";
import { Avatar, Badge, Collapse, IconButton, Navbar } from "@material-tailwind/react";
import NavList from "../../../components/NavbarWithMegaMenu/NavList";
import { FaBars, FaXmark } from "react-icons/fa6";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../provider/AuthProvider";
import { PiShoppingCartSimpleLight } from "react-icons/pi";
import { HiOutlineUser } from "react-icons/hi2";

import {
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Typography,
} from "@material-tailwind/react";

import { LuLayoutDashboard } from "react-icons/lu";
import { FiShoppingCart } from "react-icons/fi";
import { HiLogout } from "react-icons/hi";
import Swal from "sweetalert2";
import UserImg from "../../../assets/user.jpg";
import BreakingMarquee from "../../../components/BreakingMarquee/BreakingMarquee";
import useCart from "../../../hooks/useCart";
import useRole from "../../../hooks/useRole";

const Header = () => {
    const { user, logOut } = useContext(AuthContext);
    const [cart] = useCart();
    const [role] = useRole();

    const { pathname } = useLocation();
    const navigate = useNavigate();
    const [searchValue, setSearchValue] = useState("");
    const [openNav, setOpenNav] = useState(false);

    const handleSearchChange = (event) => {
        setSearchValue(event.target.value);
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        console.log("Search Value:", searchValue);
    };

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
                    .catch(err => console.log(err.message));
            }
        });
    }

    return (
        <div className="border-b">
            {["/", "/our-blog", "/about", "/contact"].includes(pathname) && <BreakingMarquee />}
            {/* Header Top */}
            <div className="border-b py-1">
                <div className="my-container">
                    <div className="flex justify-between items-center">

                        <div>
                            <Link to="/"><img className="w-[150px] h-[70px] object-cover" src={Logo} alt="Logo" /></Link>
                        </div>

                        <form className="w-96" onSubmit={handleSearchSubmit}>
                            <div
                                className="flex items-center border border-secondary hover:border-primary focus-within:border-primary transition-all duration-300 ease-in-out rounded overflow-hidden shadow-sm focus-within:shadow-md"
                            >
                                <input
                                    type="text"
                                    placeholder="Search for items..."
                                    className="px-5 w-full outline-none text-sm h-10 border-none focus:ring-0 transition-all duration-300 ease-in-out"
                                    value={searchValue}
                                    onChange={handleSearchChange}
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


                        <div className="flex items-center gap-8">

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
                                        <p className="text-xs">Cart</p>
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
                                                        <p className="font-serif text-xs">My Account</p>
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
                                                <p className="font-serif text-xs">Sign In</p>
                                            </div>
                                        </div>
                                    </Link>
                                )
                            }
                        </div>

                    </div>
                </div>
            </div>

            {/* Header Bottom */}
            <Navbar className="px-0 py-1 shadow-none">
                <div className="flex items-center justify-center">

                    <div className="hidden lg:block">
                        <NavList />
                    </div>

                    <IconButton
                        variant="text"
                        color="blue-gray"
                        className="lg:hidden"
                        onClick={() => setOpenNav(!openNav)}
                    >
                        {openNav ? (
                            <FaXmark className="h-6 w-6" />
                        ) : (
                            <FaBars className="h-6 w-6" />
                        )}
                    </IconButton>
                </div>
                <Collapse open={openNav}>
                    <NavList />
                </Collapse>
            </Navbar>
        </div>
    );
};

export default Header;