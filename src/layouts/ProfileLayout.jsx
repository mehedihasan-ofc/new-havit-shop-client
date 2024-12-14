import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../pages/Shared/Header/Header";
import Footer from "../pages/Shared/Footer/Footer";
import ProfileSidebar from "../components/Profile/ProfileSidebar/ProfileSidebar";

const ProfileLayout = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <>
            <Header />
            <div className="my-container my-5 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
                    {/* Sidebar - Full width on small devices, 1/4 width on large devices */}
                    <div className="lg:col-span-1">
                        <ProfileSidebar />
                    </div>
                    {/* Content Area - Full width on small devices, 3/4 width on large devices */}
                    <div className="lg:col-span-3">
                        <Outlet />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ProfileLayout;
