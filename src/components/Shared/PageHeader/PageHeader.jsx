import { GoHome } from "react-icons/go";
import HeaderBG from "../../../assets/static/header.png";
import { useNavigate } from "react-router-dom";

const PageHeader = ({ title }) => {

    const navigate = useNavigate();

    return (
        <div
            className="relative p-12 my-5 rounded-2xl bg-cover bg-center"
            style={{ backgroundImage: `url(${HeaderBG})` }}
        >
            <div className="relative z-10 flex flex-col items-center">
                <h1 className="text-4xl font-extrabold tracking-wide font-sans mb-4">{title}</h1>

                {/* Breadcrumb navigation */}
                <div className="flex items-center space-x-3 font-serif text-sm">
                    <GoHome className="text-lg" />
                    <p onClick={() => navigate("/")} className="hover:underline cursor-pointer">Home</p>
                    <span>/</span>
                    <p className="font-medium">{title}</p>
                </div>
            </div>
        </div>
    );
};

export default PageHeader;
