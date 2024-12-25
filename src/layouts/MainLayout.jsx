import { Outlet, useLocation } from "react-router-dom";
import Header from "../pages/Shared/Header/Header";
import Footer from "../pages/Shared/Footer/Footer";
import { useEffect } from "react";
import ScrollToTop from "react-scroll-to-top";
import { FloatingWhatsApp } from "react-floating-whatsapp";
import AvatarImg from "../assets/avator.jpg";
import useBanners from "../hooks/useBanners";
import MySpinner from "../components/Shared/MySpinner/MySpinner";

const MainLayout = () => {

    const [, loading] = useBanners();

    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    if(loading) return <MySpinner />

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
                buttonStyle={{
                    width: "50px",
                    height: "50px"
                }}
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
                className="scroll-to-top-animate !bottom-28 !right-8 !w-[50px] !h-[50px]"
            />
        </>
    );
};

export default MainLayout;