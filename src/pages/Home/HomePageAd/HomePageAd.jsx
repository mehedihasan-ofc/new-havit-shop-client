import { useEffect, useState } from "react";
import useAds from "../../../hooks/useAds";
import { Link } from "react-router-dom";

const HomePageAd = () => {
    const [adsData, loading] = useAds();
    const [homePageAd, setHomePageAd] = useState(null);

    useEffect(() => {
        if (adsData?.ads) {
            const homeAd = adsData.ads.find((ad) => ad.name === "Home Page Ad");
            setHomePageAd(homeAd);
        }
    }, [adsData]);

    if (loading) {
        return (
            <div className="my-container">
                <div className="w-full h-40 bg-gray-300 rounded animate-pulse"></div>
            </div>
        );
    }

    if (!adsData?.ads) return null;

    return (
        <div className="my-container">
            {homePageAd ? (
                homePageAd.adLink ? (
                    <Link to={homePageAd.adLink} target="_blank" rel="noopener noreferrer">
                        <div className="w-full h-full overflow-hidden">
                            <img
                                src={homePageAd.adUrl}
                                alt="Home Page Ad"
                                className="object-cover w-full h-full"
                            />
                        </div>
                    </Link>
                ) : (
                    <div className="w-full h-full overflow-hidden">
                        <img
                            src={homePageAd.adUrl}
                            alt="Home Page Ad"
                            className="object-cover w-full h-full"
                        />
                    </div>
                )
            ) : (
                <div className="text-center text-xl text-gray-600">
                    <p>No Home Page Ad available</p>
                </div>
            )}
        </div>
    );
};

export default HomePageAd;
