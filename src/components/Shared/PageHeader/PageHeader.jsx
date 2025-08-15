import { GoHome } from "react-icons/go";
import HeaderBG from "../../../assets/static/header.png";
import { useNavigate } from "react-router-dom";

const PageHeader = ({ title }) => {
    const navigate = useNavigate();

    return (
        <div
            className="relative p-6 sm:p-8 lg:p-12 my-3 sm:my-5 rounded-2xl bg-cover bg-center"
            style={{ backgroundImage: `url(${HeaderBG})` }}
        >
            <div className="relative z-10 flex flex-col items-center text-center">
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold font-serif mb-2 sm:mb-4">
                    {title}
                </h1>

                {/* Breadcrumb navigation */}
                <div className="flex flex-wrap items-center justify-center space-x-2 sm:space-x-3 font-serif text-xs sm:text-sm">
                    <GoHome className="text-base sm:text-lg" />
                    <p onClick={() => navigate("/")} className="hover:underline cursor-pointer">
                        Home
                    </p>
                    <span>/</span>
                    <p className="font-medium">{title}</p>
                </div>
            </div>
        </div>
    );
};

export default PageHeader;