import { useEffect, useState } from "react";
import useAds from "../../../hooks/useAds";
import { Link } from "react-router-dom";

const ProductDetailsAd = () => {
    const [adsData] = useAds();
    const [productDetailsAd, setProductDetailsAd] = useState(null);

    useEffect(() => {
        if (adsData?.ads) {
            // Find the Product Details Page Ad from adsData
            const productAd = adsData.ads.find((ad) => ad.name === "Product Details Page Ad");
            setProductDetailsAd(productAd);
        }
    }, [adsData]);

    // Early return if adsData?.ads is not available
    if (!adsData?.ads) return null;

    return (
        <div className="mt-5">
            {productDetailsAd ? (
                productDetailsAd.adLink ? (
                    // Render the ad with a clickable link
                    <Link to={productDetailsAd.adLink} target="_blank" rel="noopener noreferrer">
                        <div className="w-full h-full overflow-hidden">
                            <img
                                src={productDetailsAd.adUrl}
                                alt="Product Details Ad"
                                className="object-cover w-full h-full"
                            />
                        </div>
                    </Link>
                ) : (
                    // Render the ad without a link
                    <div className="w-full h-full overflow-hidden">
                        <img
                            src={productDetailsAd.adUrl}
                            alt="Product Details Ad"
                            className="object-cover w-full h-full"
                        />
                    </div>
                )
            ) : (
                // Render a message when no ad is available
                <div className="text-center text-xl text-gray-600">
                    <p>No Product Details Page Ad available</p>
                </div>
            )}
        </div>
    );
};

export default ProductDetailsAd;