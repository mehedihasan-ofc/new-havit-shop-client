import {
    Card,
    List,
    ListItem,
    ListItemPrefix,
    Avatar,
} from "@material-tailwind/react";
import { LuLayoutDashboard } from "react-icons/lu";
import { BsInfoCircle } from "react-icons/bs";
import { FaOpencart } from "react-icons/fa6";
import { PiAddressBookTabsLight } from "react-icons/pi";
import { RiLogoutCircleLine } from "react-icons/ri";
import { Link } from "react-router-dom";

const ProfileSidebar = () => {
    return (
        <Card className="border rounded-md shadow p-2 overflow-y-auto">

            <div className="flex items-center p-4">
                <Avatar className="mx-auto" src="https://docs.material-tailwind.com/img/face-2.jpg" alt="avatar" size="xxl" />
            </div>

            <hr className="border-blue-gray-50" />

            <List>

                <Link to="dashboard">
                    <ListItem>
                        <ListItemPrefix>
                            <LuLayoutDashboard size={20} />
                        </ListItemPrefix>

                        Dashboard
                    </ListItem>
                </Link>

                <Link to="personal-info">
                    <ListItem>
                        <ListItemPrefix>
                            <BsInfoCircle size={20} />
                        </ListItemPrefix>
                        Personal Info
                    </ListItem>
                </Link>

                <Link to="orders">
                    <ListItem>
                        <ListItemPrefix>
                            <FaOpencart size={20} />
                        </ListItemPrefix>
                        Orders
                    </ListItem>
                </Link>

                <Link to="address">
                    <ListItem>
                        <ListItemPrefix>
                            <PiAddressBookTabsLight size={20} />
                        </ListItemPrefix>
                        Address
                    </ListItem>
                </Link>

                <hr className="my-2 border-blue-gray-50" />

                <ListItem>
                    <ListItemPrefix>
                        <RiLogoutCircleLine size={20} />
                    </ListItemPrefix>
                    Log Out
                </ListItem>
            </List>
        </Card>
    );
};

export default ProfileSidebar;