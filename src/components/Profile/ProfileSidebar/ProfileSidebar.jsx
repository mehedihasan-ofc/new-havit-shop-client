import {
    Card,
    List,
    ListItem,
    ListItemPrefix,
    Avatar,
} from "@material-tailwind/react";
import { VscSettings } from "react-icons/vsc";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { RiFocus3Line } from "react-icons/ri";
import { GrLocation } from "react-icons/gr";
import { AiOutlineLogout } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../provider/AuthProvider";
import Swal from "sweetalert2";
import { GiReturnArrow } from "react-icons/gi";
import { TbTruckReturn } from "react-icons/tb";

const ProfileSidebar = () => {
    const { user, logOut } = useContext(AuthContext);

    const handleLogOut = () => {
        Swal.fire({
            title: "Are you sure want to sign out?",
            text: "You will need to log in again to access your account.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, sign out!",
        }).then((result) => {
            if (result.isConfirmed) {
                logOut()
                    .then(() => {
                        Swal.fire({
                            title: "Signed Out",
                            text: "You have successfully signed out.",
                            icon: "success",
                        });
                    })
                    .catch(() => {
                        Swal.fire({
                            title: "Error",
                            text: "An error occurred while signing out. Please try again.",
                            icon: "error",
                        });
                    });
            }
        });
    };

    return (
        <Card className="h-auto w-full max-w-full lg:max-w-[20rem] p-4 shadow rounded border hidden lg:block">
            {/* Profile Picture */}
            <div className="flex justify-center p-4">
                <Avatar
                    size="xl"
                    src={user?.photoURL}
                    alt={user?.displayName}
                    className="w-24 h-24 lg:w-32 lg:h-32"
                />
            </div>

            <hr className="border-blue-gray-50" />

            {/* Sidebar Links */}
            <List className="space-y-2">
                <Link to="dashboard">
                    <ListItem className="hover:bg-blue-100 rounded">
                        <ListItemPrefix>
                            <VscSettings size={18} />
                        </ListItemPrefix>
                        Dashboard
                    </ListItem>
                </Link>

                <Link to="orders">
                    <ListItem className="hover:bg-blue-100 rounded">
                        <ListItemPrefix>
                            <HiOutlineShoppingBag size={18} />
                        </ListItemPrefix>
                        My Orders
                    </ListItem>
                </Link>

                <Link to="track-order">
                    <ListItem className="hover:bg-blue-100 rounded">
                        <ListItemPrefix>
                            <RiFocus3Line size={20} />
                        </ListItemPrefix>
                        Track Order
                    </ListItem>
                </Link>

                <Link to="my-returns">
                    <ListItem className="hover:bg-blue-100 rounded">
                        <ListItemPrefix>
                            <GiReturnArrow size={20} />
                        </ListItemPrefix>
                        My Returns
                    </ListItem>
                </Link>

                <Link to="my-cancellations">
                    <ListItem className="hover:bg-blue-100 rounded">
                        <ListItemPrefix>
                            <TbTruckReturn size={20} />
                        </ListItemPrefix>
                        Cancellations
                    </ListItem>
                </Link>

                <Link to="billing-details">
                    <ListItem className="hover:bg-blue-100 rounded">
                        <ListItemPrefix>
                            <GrLocation size={18} />
                        </ListItemPrefix>
                        Billing Details
                    </ListItem>
                </Link>

                <ListItem
                    onClick={handleLogOut}
                    className="hover:bg-red-100 text-red-500 rounded"
                >
                    <ListItemPrefix>
                        <AiOutlineLogout size={18} />
                    </ListItemPrefix>
                    Log Out
                </ListItem>
            </List>
        </Card>
    );
};

export default ProfileSidebar;