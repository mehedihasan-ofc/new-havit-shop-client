import useAds from "../../../hooks/useAds";
import { Link } from "react-router-dom";

const ShowAd = ({ name }) => {
    const [adsData, loading] = useAds();
    const pageAd = adsData?.find((ad) => ad.name === name);

    if (loading) {
        return (
            <div className="my-container">
                <div className="w-full h-40 bg-gray-300 rounded animate-pulse"></div>
            </div>
        );
    }

    if (!pageAd) return null;

    return (
        <div className="my-container">
            
            {pageAd && (
                pageAd.link ? (
                    <Link to={pageAd.link} target="_blank" rel="noopener noreferrer">
                        <div className="w-full h-[90px] overflow-hidden">
                            <img
                                src={pageAd.url}
                                alt={pageAd.name || "Ad"}
                                className="object-cover w-full h-full"
                            />
                        </div>
                    </Link>
                ) : (
                    <div className="w-full h-[90px] overflow-hidden">
                        <img
                            src={pageAd.url}
                            alt={pageAd.name || "Ad"}
                            className="object-cover w-full h-full"
                        />
                    </div>
                )
            )}
        </div>
    );
};

export default ShowAd;