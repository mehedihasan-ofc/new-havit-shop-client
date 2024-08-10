import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/Dashboard/Sidebar/Sidebar";
import { Avatar } from "@material-tailwind/react";
import { MdOutlineArrowForward } from "react-icons/md";

const DashboardLayout = () => {

    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

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
        <div className="flex bg-white">
            {/* <Sidebar menus={adminData?.data?.role?.RoleFeature} /> */}
            <Sidebar />

            <div className="flex-1 h-screen overflow-y-auto">
                <div className="flex justify-between items-center shadow  py-3 px-10">

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
        </div>
    );
};

export default DashboardLayout;