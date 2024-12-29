import { Outlet, useLocation } from "react-router-dom";
import Header from "../pages/Shared/Header/Header";
import Footer from "../pages/Shared/Footer/Footer";
import { useEffect } from "react";
import ScrollToTop from "react-scroll-to-top";
import { FloatingWhatsApp } from "react-floating-whatsapp";
import AvatarImg from "../assets/avator.jpg";
import useBanners from "../hooks/useBanners";

const MainLayout = () => {
    const [, loading] = useBanners();
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen bg-secondary-light">
                <div className="relative flex items-center justify-center h-20 w-20">
                    {/* Outer Gradient Circle */}
                    <div
                        className="absolute inset-0 animate-spin rounded-full border-4 border-transparent"
                        style={{
                            borderTopColor: '#30a444',
                            borderLeftColor: '#DEF9EC',
                            animationDuration: '1.5s',
                        }}
                    ></div>
                    {/* Inner Glow Effect */}
                    <div
                        className="absolute inset-1 rounded-full bg-gradient-to-br from-primary to-secondary opacity-20 blur-xl"
                    ></div>
                    {/* Center Icon */}
                    <div className="z-10 text-primary font-extrabold text-2xl tracking-wider">
                        H
                    </div>
                </div>
            </div>
        );
    }

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
                    height: "50px",
                }}
            />

            <ScrollToTop
                color="#3BB77E"
                smooth
                style={{
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
                className="scroll-to-top-animate !bottom-28 !right-8 !w-[50px] !h-[50px]"
            />
        </>
    );
};

export default MainLayout;