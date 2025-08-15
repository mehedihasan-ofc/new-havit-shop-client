import { useLocation, useNavigate } from "react-router-dom";
import { BsDatabaseFillX } from "react-icons/bs";
import { useState } from "react";
import { AiOutlineReload } from "react-icons/ai";
import { Button } from "@material-tailwind/react";

const NoDataFound = () => {

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const handleRefresh = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            navigate(location.pathname, { replace: true });
        }, 1000);
    };

    return (
        <div className="flex flex-col items-center justify-center py-10 px-4 text-center bg-gray-50 rounded-lg shadow-sm">
            <div className="bg-[#DEF9EC] p-5 rounded-full mb-4">
                <BsDatabaseFillX className="h-16 w-16 text-[#3BB77E]" />
            </div>

            <h2 className="text-xl font-semibold font-serif">Oops! No Data Found</h2>
            <p className="text-gray-500 mt-2 mb-5">
                It looks like there's nothing here. Try refreshing the page or check back later.
            </p>

            {/* Button */}
            <Button
                onClick={handleRefresh}
                disabled={loading}
                className="flex items-center gap-2 bg-primary py-2 px-6 rounded-none font-medium"
            >
                {loading ? (
                    <>
                        <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        Loading...
                    </>
                ) : (
                    <>
                        <AiOutlineReload className="text-lg" />
                        Refresh
                    </>
                )}
            </Button>
        </div>
    );
};

export default NoDataFound;