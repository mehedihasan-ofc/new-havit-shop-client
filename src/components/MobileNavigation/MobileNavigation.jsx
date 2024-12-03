import { Collapse, Drawer, IconButton, List, ListItem, Menu, MenuHandler, MenuItem, MenuList, Typography } from "@material-tailwind/react";
import { IoCloseOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import useCategories from "../../hooks/useCategories";
import useLogo from "../../hooks/useLogo";

const MobileNavigation = ({ openNav, closeDrawer, handleLogOut, user, role }) => {

    const [logoData] = useLogo();
    const [categories] = useCategories();

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const renderItems = categories.map(
        ({ _id, name }) => (
            <Link to={`/products/categories/${_id}`} key={_id}>
                <MenuItem onClick={closeDrawer} className="flex items-center gap-3 rounded-none hover:text-primary hover:bg-secondary">
                    <div>
                        <Typography
                            variant="h6"
                            color="blue-gray"
                            className="flex items-center text-sm font-bold"
                        >
                            {name}
                        </Typography>
                        <Typography
                            variant="paragraph"
                            className="text-xs !font-medium text-blue-gray-500"
                        >
                            {`See All ${name} Products`}
                        </Typography>
                    </div>
                </MenuItem>
            </Link>
        ),
    );

    return (
        <Drawer open={openNav} onClose={closeDrawer} className="p-4 lg:hidden text-textColor overflow-y-scroll">
            <div className="flex items-center justify-between">
                <img className="w-28 md:w-36 h-auto object-cover" src={logoData?.logo} alt="Logo" />

                <IconButton size="sm" variant="text" className="rounded-full" onClick={closeDrawer}>
                    <IoCloseOutline size={20} />
                </IconButton>
            </div>

            <hr className="mb-2 border-blue-gray-50" />

            <List className="font-body">
                {/* Home */}
                <Link to="/">
                    <ListItem className="rounded-none hover:text-primary hover:bg-secondary p-2" onClick={closeDrawer}>
                        Home
                    </ListItem>
                </Link>

                <Menu
                    open={isMenuOpen}
                    handler={setIsMenuOpen}
                    offset={{ mainAxis: 20 }}
                    placement="bottom"
                    allowHover={true}
                >
                    <MenuHandler>
                        <Typography as="div" variant="small" className="font-body">
                            <ListItem
                                className="flex items-center justify-between py-2 pr-4 pl-2 font-normal text-base rounded-none hover:text-primary hover:bg-secondary"
                                selected={isMenuOpen || isMobileMenuOpen}
                                onClick={() => setIsMobileMenuOpen((cur) => !cur)}
                            >
                                Categories
                                <ChevronDownIcon
                                    strokeWidth={2.5}
                                    className={`hidden h-3 w-3 transition-transform lg:block ${isMenuOpen ? "rotate-180" : ""
                                        }`}
                                />
                                <ChevronDownIcon
                                    strokeWidth={2.5}
                                    className={`block h-3 w-3 transition-transform lg:hidden ${isMobileMenuOpen ? "rotate-180" : ""
                                        }`}
                                />
                            </ListItem>
                        </Typography>
                    </MenuHandler>
                    <MenuList className="hidden max-w-screen-xl rounded-xl lg:block">
                        <ul className="grid grid-cols-3 gap-y-2 outline-none outline-0">
                            {renderItems}
                        </ul>
                    </MenuList>
                </Menu>
                <div className="block lg:hidden">
                    <Collapse open={isMobileMenuOpen}>{renderItems}</Collapse>
                </div>

                <Link to="/products/all">
                    <ListItem className="rounded-none hover:text-primary hover:bg-secondary p-2" onClick={closeDrawer}>
                        All Products
                    </ListItem>
                </Link>

                <Link to="/discounted-products">
                    <ListItem className="rounded-none hover:text-primary hover:bg-secondary p-2" onClick={closeDrawer}>
                        Discounted Products
                    </ListItem>
                </Link>

                {/* Blog */}
                <Link to="/our-blog">
                    <ListItem className="rounded-none hover:text-primary hover:bg-secondary p-2" onClick={closeDrawer}>
                        Our Blog
                    </ListItem>
                </Link>

                {/* About Us */}
                <Link to="/about">
                    <ListItem className="rounded-none hover:text-primary hover:bg-secondary p-2" onClick={closeDrawer}>
                        About Us
                    </ListItem>
                </Link>

                {/* Contact Us */}
                <Link to="/contact">
                    <ListItem className="rounded-none hover:text-primary hover:bg-secondary p-2" onClick={closeDrawer}>
                        Contact Us
                    </ListItem>
                </Link>
            </List>

            <hr className="my-2 border-blue-gray-50" />

            {
                user ? (
                    role === "admin" ? (
                        <div className="text-center py-2 bg-primary text-white shadow-md">
                            <p className="font-bold">Welcome, Admin!</p>
                        </div>
                    ) : (
                        <>
                            <List className="font-body">
                                <Link to="/profile/dashboard">
                                    <ListItem
                                        className="rounded-none hover:text-primary hover:bg-secondary p-2"
                                        onClick={closeDrawer}
                                    >
                                        My Dashboard
                                    </ListItem>
                                </Link>

                                <Link to="/profile/orders">
                                    <ListItem
                                        className="rounded-none hover:text-primary hover:bg-secondary p-2"
                                        onClick={closeDrawer}
                                    >
                                        My Orders
                                    </ListItem>
                                </Link>

                                <Link to="/profile/track-order">
                                    <ListItem
                                        className="rounded-none hover:text-primary hover:bg-secondary p-2"
                                        onClick={closeDrawer}
                                    >
                                        Track Order
                                    </ListItem>
                                </Link>

                                <ListItem
                                    onClick={() => {
                                        closeDrawer();
                                        handleLogOut();
                                    }}
                                    className="rounded-none hover:text-primary hover:bg-secondary p-2"
                                >
                                    Sign Out
                                </ListItem>
                            </List>
                        </>
                    )
                ) : (
                    <>
                        <List className="font-body">
                            <Link to="/login">
                                <ListItem
                                    className="rounded-none hover:text-primary hover:bg-secondary p-2"
                                    onClick={closeDrawer}
                                >
                                    Sign In
                                </ListItem>
                            </Link>

                            <Link to="/register">
                                <ListItem
                                    className="rounded-none hover:text-primary hover:bg-secondary p-2"
                                    onClick={closeDrawer}
                                >
                                    Sign Up
                                </ListItem>
                            </Link>
                        </List>
                    </>
                )
            }
        </Drawer>
    );
};

export default MobileNavigation;