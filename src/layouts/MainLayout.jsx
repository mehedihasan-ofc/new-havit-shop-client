import { Outlet, useLocation } from "react-router-dom";
import Header from "../pages/Shared/Header/Header";
import Footer from "../pages/Shared/Footer/Footer";
import { useEffect } from "react";
import ScrollToTop from "react-scroll-to-top";

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

            <ScrollToTop
                color="#3BB77E"
                smooth
                style={{
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                }}
            />
        </>
    );
};

export default MainLayout;