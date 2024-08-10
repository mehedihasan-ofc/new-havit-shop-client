import { Collapse, ListItem, Menu, MenuHandler, MenuItem, MenuList, Typography } from "@material-tailwind/react";
import { useState } from "react";
import { IoChevronDown } from "react-icons/io5";
import { Link } from "react-router-dom";

const NavListMenu = ({ navListMenuItems }) => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const renderItems = navListMenuItems.map(
        ({ _id, name, image }) => (
            <Link to={`/todo/${_id}`} key={_id}>
                <MenuItem className="flex items-center gap-5 rounded-lg">
                    
                    <div className="flex items-center justify-center rounded-lg">
                        <img className="w-10 h-10 object-contain" src={image} alt="" />
                    </div>
                    
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
        <>
            <Menu
                open={isMenuOpen}
                handler={setIsMenuOpen}
                offset={{ mainAxis: 20 }}
                placement="bottom"
                allowHover={true}
            >
                <MenuHandler>
                    <Typography as="div" variant="small" className="font-medium">
                        <ListItem
                            className="px-3 py-2 rounded-none hover:text-primary hover:bg-secondary focus:text-primary active:text-primary font-normal text-base flex items-center justify-between gap-1 font-medium text-sm"
                            selected={isMenuOpen || isMobileMenuOpen}
                            onClick={() => setIsMobileMenuOpen((cur) => !cur)}
                        >
                            Categories
                            <IoChevronDown
                                className={`hidden h-3 w-3 transition-transform lg:block ${isMenuOpen ? "rotate-180" : ""
                                    }`}
                            />
                            <IoChevronDown
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
        </>
    );
};

export default NavListMenu;