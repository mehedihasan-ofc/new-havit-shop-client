import AdUploader from "../../../../components/Ads/AdUploader/AdUploader";
import useAds from "../../../../hooks/useAds";

const adConfigs = [
    { adName: "Home Page Ad", id: "homePageAd" },
    { adName: "Product Details Page Ad", id: "productDetailsPageAd" },
    { adName: "Blog Page Ad", id: "blogPageAd" },
    { adName: "Blog Details Page Ad", id: "blogDetailsPageAd" },
];

const AdsManagement = () => {
    const [adsData, loading, refetch] = useAds();

    if (loading) return null;

    return (
        <div className="max-w-5xl mx-auto space-y-5">

            {adConfigs.map((ad) => (
                <AdUploader
                    key={ad.id}
                    adName={ad.adName}
                    adItem={adsData?.find(a => a.name === ad.adName)}
                    refetch={refetch}
                />
            ))}

        </div>
    );
};

export default AdsManagement;