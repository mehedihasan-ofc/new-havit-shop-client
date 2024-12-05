import { useEffect, useState } from "react";
import useAds from "../../../hooks/useAds";
import { Link } from "react-router-dom";

const BlogDetailsAd = () => {
    const [adsData] = useAds();
    const [blogDetailsAd, setBlogDetailsAd] = useState(null);

    useEffect(() => {
        if (adsData?.ads) {
            // Find the Blog Details Page Ad from adsData
            const blogDetailsPageAd = adsData.ads.find((ad) => ad.name === "Blog Details Page Ad");
            setBlogDetailsAd(blogDetailsPageAd);
        }
    }, [adsData]);

    // Early return if adsData?.ads is not available
    if (!adsData?.ads) return null;

    return (
        <div>
            {blogDetailsAd ? (
                blogDetailsAd.adLink ? (
                    // Render the ad with a clickable link
                    <Link to={blogDetailsAd.adLink} target="_blank" rel="noopener noreferrer">
                        <div className="w-full h-full overflow-hidden">
                            <img
                                src={blogDetailsAd.adUrl}
                                alt="Blog Details Page Ad"
                                className="object-cover w-full h-full"
                            />
                        </div>
                    </Link>
                ) : (
                    // Render the ad without a link
                    <div className="w-full h-full overflow-hidden">
                        <img
                            src={blogDetailsAd.adUrl}
                            alt="Blog Details Page Ad"
                            className="object-cover w-full h-full"
                        />
                    </div>
                )
            ) : (
                // Render a message when no ad is available
                <div className="text-center text-xl text-gray-600">
                    <p>No Blog Details Page Ad available</p>
                </div>
            )}
        </div>
    );
};

export default BlogDetailsAd;