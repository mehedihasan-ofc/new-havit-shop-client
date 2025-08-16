import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../components/Dashboard/Sidebar/Sidebar";
import { Avatar, Button, IconButton } from "@material-tailwind/react";
import { MdOutlineArrowForward, MdOutlineShoppingCartCheckout } from "react-icons/md";
import useAdminAuth from "../hooks/useAdminAuth";

const DashboardLayout = () => {

    const [user, adminData, isLoading] = useAdminAuth();
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const formatPathname = (pathname) => {
        const formattedPathname = pathname
            .split("/")
            .slice(2)
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
        const finalPathname = formattedPathname.split("-").join(" ");
        return finalPathname;
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="p-8 bg-white rounded-lg shadow-lg w-full max-w-md text-center border">
                    <div className="text-2xl font-bold text-blue-800 mb-4 animate-pulse">
                        Please wait a few seconds
                    </div>
                    <div className="text-lg font-semibold text-blue-700 mb-2">
                        Verify Admin
                    </div>
                    <div className="text-lg font-semibold text-blue-700">
                        Accessing Admin Dashboard
                    </div>
                    <div className="mt-6">
                        <div className="w-10 h-10 border-4 border-blue-600 border-dashed rounded-full animate-spin mx-auto"></div>
                    </div>
                </div>
            </div>
        )
    }

    if (adminData?.message) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="p-8 rounded shadow w-full max-w-2xl text-center border">
                    <h4 className="text-3xl font-semibold text-red-600 mb-4">
                        Oops, Something Went Wrong!
                    </h4>
                    <p className="text-lg text-gray-700 mb-6">
                        <span className="font-bold text-gray-900">{adminData?.user?.fullName}</span>, we couldn't find a valid role for your account.
                    </p>
                    <div className="mt-6">
                        <p className="text-sm text-gray-500 mb-4">
                            {adminData?.message}
                        </p>
                        <div className="flex justify-center gap-4">

                            <Button
                                size="sm"
                                onClick={() => window.location.reload()}
                                className="rounded-none bg-red-600"
                            >Retry</Button>

                            <Button
                                size="sm"
                                onClick={() => navigate("/")}
                                className="rounded-none bg-primary"
                            >Go to Homepage</Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }


    return (
        <div className="flex bg-white">
            <Sidebar />

            <div className="flex-1 h-screen overflow-y-auto">
                <div className="flex justify-between items-center shadow  py-4 px-10">

                    <div className="flex items-center gap-2">
                        {pathname !== "/dashboard" && pathname !== "/dashboard/" && (
                            <>
                                <p>Home</p>
                                <MdOutlineArrowForward />
                                <p className="capitalize">{formatPathname(pathname)}</p>
                            </>
                        )}
                    </div>

                    <IconButton onClick={() => navigate("create-invoice")} className="bg-[#DEF9EC] text-[#3BB77E] rounded-full shadow-none hover:shadow-none">
                        <MdOutlineShoppingCartCheckout size={20} />
                    </IconButton>

                    <div className="flex items-center gap-3">
                        <Avatar size="sm" src={user?.photoURL} alt={user?.displayName} />

                        <div>
                            <h4 className="text-sm">{user?.displayName}</h4>
                            <p className="text-xs text-gray-700">{adminData?.role?.roleName}</p>
                        </div>
                    </div>
                </div>

                <div className="p-5">
                    {pathname === "/dashboard" || pathname === "/dashboard/" ? (
                        <div className="flex flex-col items-center justify-center h-full space-y-6 p-8 rounded shadow border">
                            <h2 className="text-4xl font-extrabold text-gray-900 text-center">
                                Hello, <span className="text-green-500">{user?.displayName}</span>! ❤️
                            </h2>
                            <p className="text-lg text-gray-700 text-center">
                                As a <span className="font-semibold text-blue-600">{adminData?.role?.roleName}</span>, you have access to a wealth of powerful tools and features.
                            </p>
                            <div className="flex flex-col items-center space-y-4 mt-6">
                                <p className="text-xl text-gray-800 text-center">
                                    Start managing your tasks, monitoring insights, and enhancing the user experience with ease.
                                </p>

                                <p className="text-2xl font-semibold text-gray-800 text-center mt-4">
                                    <span className="inline-block bg-gradient-to-r from-teal-400 to-teal-600 text-transparent bg-clip-text">
                                        Explore Your Dashboard
                                    </span>
                                </p>
                            </div>
                        </div>
                    ) : (
                        <Outlet />
                    )}
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;