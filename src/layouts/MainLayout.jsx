import { Outlet, useLocation } from "react-router-dom";
import Header from "../pages/Shared/Header/Header";
import Footer from "../pages/Shared/Footer/Footer";
import { useEffect, useState } from "react";

const MainLayout = () => {
    const { pathname } = useLocation();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true); // Start loading
        const timer = setTimeout(() => {
            setIsLoading(false); // End loading after 5 seconds
        }, 4000);

        window.scrollTo(0, 0); // Scroll to top
        return () => clearTimeout(timer); // Cleanup timer
    }, [pathname]);

    return (
        <>
            {isLoading ? (
                <div className="flex items-center justify-center h-screen">
                    <div className="text-center">
                        {/* Bouncing Dots Animation */}
                        <div className="flex justify-center space-x-2">
                            <div className="w-4 h-4 bg-primary rounded-full animate-bounce"></div>
                            <div className="w-4 h-4 bg-primary rounded-full animate-bounce delay-150"></div>
                            <div className="w-4 h-4 bg-primary rounded-full animate-bounce delay-300"></div>
                        </div>
                    </div>
                </div>
            ) : (
                <>
                    <Header />
                    <Outlet />
                    <Footer />
                </>
            )}
        </>
    );
};

export default MainLayout;
