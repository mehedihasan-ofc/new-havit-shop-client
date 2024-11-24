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
import { BsPerson } from "react-icons/bs";
import { AiOutlineLogout } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../provider/AuthProvider";
import Swal from "sweetalert2";

const ProfileSidebar = () => {

    const { user, logOut } = useContext(AuthContext);

    console.log(user);

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
    };

    return (
        // <Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow rounded border">
        <Card className="h-full w-full max-w-[20rem] p-4 shadow rounded border">

            <div className="flex justify-center p-4">
                <Avatar size="xl" src={user?.photoURL} alt={user?.displayName} />
            </div>

            <hr className="border-blue-gray-50" />

            <List>

                <Link to="dashboard">
                    <ListItem>
                        <ListItemPrefix>
                            <VscSettings size={18} />
                        </ListItemPrefix>
                        Dashboard
                    </ListItem>
                </Link>

                <Link to="orders">
                    <ListItem>
                        <ListItemPrefix>
                            <HiOutlineShoppingBag size={18} />
                        </ListItemPrefix>
                        Orders
                    </ListItem>
                </Link>

                <Link to="track-order">
                    <ListItem>
                        <ListItemPrefix>
                            <RiFocus3Line size={20} />
                        </ListItemPrefix>
                        Track Order
                    </ListItem>
                </Link>

                <Link to="my-address">
                    <ListItem>
                        <ListItemPrefix>
                            <GrLocation size={18} />
                        </ListItemPrefix>
                        My Address
                    </ListItem>
                </Link>

                <Link to="account-details">
                    <ListItem>
                        <ListItemPrefix>
                            <BsPerson size={18} />
                        </ListItemPrefix>
                        Account details
                    </ListItem>
                </Link>

                <ListItem onClick={handleLogOut}>
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