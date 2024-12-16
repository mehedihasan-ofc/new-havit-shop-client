import { Outlet, useLocation } from "react-router-dom";
import Header from "../pages/Shared/Header/Header";
import Footer from "../pages/Shared/Footer/Footer";
import { useEffect } from "react";
import ScrollToTop from "react-scroll-to-top";
import { FloatingWhatsApp } from "react-floating-whatsapp";
import AvatarImg from "../assets/avator.jpg";

const MainLayout = () => {

    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <>
            <Header />
            <Outlet />
            <Footer />

            <FloatingWhatsApp
                phoneNumber="+8801744991003"
                accountName="Havit Shop"
                avatar={AvatarImg}
                statusMessage="Active Now"
            />

            <ScrollToTop
                color="#3BB77E"
                smooth
                style={{
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                }}
                className="scroll-to-top-animate !bottom-[120px] !right-[35px] !w-[60px] !h-[60px]"
            />
        </>
    );
};

export default MainLayout;