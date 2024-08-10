import { List, ListItem } from "@material-tailwind/react";
import NavListMenu from "./NavListMenu";
import { Link } from "react-router-dom";
import useCategories from "../../hooks/useCategories";

const NavList = () => {

    const [categories] = useCategories();

    return (
        <List className="mt-4 mb-6 p-0 lg:mt-0 lg:mb-0 lg:flex-row md:items-center md:gap-3 lg:p-1 font-medium text-sm">

            <Link to="/"><ListItem className="flex items-center gap-2 py-2 px-4 rounded-none hover:text-primary hover:bg-secondary focus:text-primary active:text-primary">Home</ListItem></Link>

            <NavListMenu navListMenuItems={categories} />

            <Link to="/our-blog"><ListItem className="flex items-center gap-2 py-2 px-4 rounded-none hover:text-primary hover:bg-secondary focus:text-primary active:text-primary">Blog</ListItem></Link>
            <Link to="/about"><ListItem className="flex items-center gap-2 py-2 px-4 rounded-none hover:text-primary hover:bg-secondary focus:text-primary active:text-primary">About Us</ListItem></Link>
            <Link to="/contact"><ListItem className="flex items-center gap-2 py-2 px-4 rounded-none hover:text-primary hover:bg-secondary focus:text-primary active:text-primary">Contact Us</ListItem></Link>
        
        </List>
    );
};

export default NavList;