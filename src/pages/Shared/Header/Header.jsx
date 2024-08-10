import { useContext, useEffect, useState } from "react";
import { PiMapPinArea } from "react-icons/pi";
import { MdOutlineSearch } from "react-icons/md";
import Logo from "../../../assets/logo.png";
import { Avatar, Badge, Collapse, IconButton, Navbar } from "@material-tailwind/react";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import NavList from "../../../components/NavbarWithMegaMenu/NavList";
import { FaBars, FaXmark } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../provider/AuthProvider";
import { IoPersonCircleOutline } from "react-icons/io5";
import { RiMapPin2Line } from "react-icons/ri";
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

const Header = () => {

    const { user, logOut } = useContext(AuthContext);

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
        <>
            {/* Header Top */}
            <div className="border-b py-1">
                <div className="my-container">
                    <div className="flex justify-between items-center">

                        <div>
                            <Link to="/"><img className="w-[150px] h-[70px] object-contain" src={Logo} alt="Logo" /></Link>
                        </div>

                        <form className="w-96" onSubmit={handleSearchSubmit}>
                            <div className="flex items-center">
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="px-5 w-full outline-none text-base h-10 rounded-l-sm border"
                                    value={searchValue}
                                    onChange={handleSearchChange}
                                    required
                                />
                                <button
                                    type="submit"
                                    className="px-3 bg-primary outline-none text-base text-white h-10 rounded-r-sm"
                                >
                                    <MdOutlineSearch size={18} />
                                </button>
                            </div>
                        </form>

                        <div className="flex items-center gap-1">
                            <RiMapPin2Line size={18} />
                            <p>Bangladesh</p>
                        </div>

                        <div className="flex items-center gap-8">
                            <div className="flex items-end gap-1 font-serif">
                                <Badge className="bg-primary min-w-[20px] min-h-[20px]" content="0" overlap="circular">
                                    <PiShoppingCartSimpleLight size={28} />
                                </Badge>
                                <p className="text-xs">Cart</p>
                            </div>

                            {
                                user ? (
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

                                            <MenuItem onClick={handleLogOut} className="flex items-center gap-2 ">
                                                <HiLogout size={18} />
                                                <Typography variant="small" className="font-medium">
                                                    Sign Out
                                                </Typography>
                                            </MenuItem>

                                        </MenuList>
                                    </Menu>

                                ) : (

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

            {/* <BreakingMarquee /> */}
        </>
    );
};

export default Header;