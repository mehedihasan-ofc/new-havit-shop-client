import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../components/Dashboard/Sidebar/Sidebar";
import { Avatar, Button } from "@material-tailwind/react";
import { MdOutlineArrowForward } from "react-icons/md";
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
                        <p>Home</p>
                        <MdOutlineArrowForward />
                        <p className="capitalize">{formatPathname(pathname)}</p>
                    </div>

                    <div className="flex items-center gap-3">
                        <Avatar size="sm" src={user?.photoURL} alt={user?.displayName} />

                        <div>
                            <h4 className="text-sm">{user?.displayName}</h4>
                            <p className="text-xs text-gray-700">{adminData?.role?.roleName}</p>
                        </div>
                    </div>
                </div>

                <div className="p-5">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;