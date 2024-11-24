import { useEffect, useState } from "react";
import useAds from "../../../hooks/useAds";
import { Link } from "react-router-dom";

const BlogAd = () => {
    const [adsData] = useAds();
    const [blogAd, setBlogAd] = useState(null);

    useEffect(() => {
        if (adsData?.ads) {
            // Find the Blog Page Ad from adsData
            const blogPageAd = adsData.ads.find((ad) => ad.name === "Blog Page Ad");
            setBlogAd(blogPageAd);
        }
    }, [adsData]);

    return (
        <div>
            {blogAd ? (
                blogAd.adLink ? (
                    // Render the ad with a clickable link
                    <Link to={blogAd.adLink} target="_blank" rel="noopener noreferrer">
                        <div className="w-full h-full overflow-hidden">
                            <img
                                src={blogAd.adUrl}
                                alt="Blog Page Ad"
                                className="object-cover w-full h-full"
                            />
                        </div>
                    </Link>
                ) : (
                    // Render the ad without a link
                    <div className="w-full h-full overflow-hidden">
                        <img
                            src={blogAd.adUrl}
                            alt="Blog Page Ad"
                            className="object-cover w-full h-full"
                        />
                    </div>
                )
            ) : (
                // Render a message when no ad is available
                <div className="text-center text-xl text-gray-600">
                    <p>No Blog Page Ad available</p>
                </div>
            )}
        </div>
    );
};

export default BlogAd;