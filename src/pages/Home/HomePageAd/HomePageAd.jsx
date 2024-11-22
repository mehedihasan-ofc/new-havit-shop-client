import { useEffect, useState } from "react";
import useAds from "../../../hooks/useAds";

const HomePageAd = () => {
    const [adsData] = useAds();
    const [homePageAd, setHomePageAd] = useState(null);

    useEffect(() => {
        if (adsData?.ads) {
            // Find the Home Page Ad from adsData
            const homeAd = adsData.ads.find(ad => ad.name === "Home Page Ad");
            setHomePageAd(homeAd);
        }
    }, [adsData]);

    return (
        <div className="my-container">
            {homePageAd ? (
                <div className="w-full h-full overflow-hidden">
                    <img
                        src={homePageAd.adUrl}
                        alt="Home Page Ad"
                        className="object-cover w-full h-full"
                    />
                </div>
            ) : (
                <div className="text-center text-xl text-gray-600">
                    <p>No Home Page Ad available</p>
                </div>
            )}
        </div>
    );
};

export default HomePageAd;