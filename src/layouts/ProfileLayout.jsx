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
            <div className="my-container my-5">
                <div className="grid grid-cols-4 gap-5">
                    <div>
                        <ProfileSidebar />
                    </div>
                    <div className="col-span-3">
                        <Outlet />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ProfileLayout;