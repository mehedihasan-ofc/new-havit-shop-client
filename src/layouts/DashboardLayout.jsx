import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../components/Dashboard/Sidebar/Sidebar";
import { Avatar } from "@material-tailwind/react";
import { MdOutlineArrowForward } from "react-icons/md";

const DashboardLayout = () => {

    const { pathname } = useLocation();
    const navigate = useNavigate();

    const [showMessages, setShowMessages] = useState(false);

    // useEffect(() => {
    //     window.scrollTo(0, 0);

    //     if(pathname === "/dashboard" || pathname === "/dashboard/") {
    //         navigate("dashboard-home")
    //     }

    // }, [pathname, navigate]);

    useEffect(() => {
        window.scrollTo(0, 0);

        if (pathname === "/dashboard" || pathname === "/dashboard/") {
            setShowMessages(true);
            setTimeout(() => {
                setShowMessages(false);
                navigate("dashboard-home");
            }, 3000); // 4 seconds
        }
    }, [pathname, navigate]);

    const formatPathname = (pathname) => {
        const formattedPathname = pathname
            .split("/")
            .slice(2)
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
        const finalPathname = formattedPathname.split("-").join(" ");
        return finalPathname;
    };

    return (
        <>
            {showMessages ?

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

                : <div className="flex bg-white">
                    <Sidebar />

                    <div className="flex-1 h-screen overflow-y-auto">
                        <div className="flex justify-between items-center shadow  py-4 px-10">

                            <div className="flex items-center gap-2">
                                <p>Home</p>
                                <MdOutlineArrowForward />
                                <p className="capitalize">{formatPathname(pathname)}</p>
                            </div>

                            <div className="flex items-center gap-3">
                                <Avatar size="sm" src="https://docs.material-tailwind.com/img/face-2.jpg" alt="avatar" />

                                <div>
                                    <h4 className="text-sm">Mehedi Hasan</h4>
                                    <p className="text-xs text-gray-700">System Admin</p>
                                </div>
                            </div>
                        </div>

                        <div className="p-5">
                            <Outlet />
                        </div>
                    </div>
                </div>}
        </>
    );
};

export default DashboardLayout;