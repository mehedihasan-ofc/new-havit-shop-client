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

    console.log(adsData);

    if (loading) return null;

    return (
        <div className="max-w-5xl mx-auto p-8 bg-gray-50 shadow rounded border space-y-10">

            {adConfigs.map((ad) => (
                <AdUploader
                    key={ad.id}
                    adName={ad.adName}
                    adItem={adsData?.find(a => a.name === ad.adName)}
                    refetch={refetch}
                />
            ))}

            {/* <AdUploader
                title="Home Page Ad"
                name="Home Page Ad"
                adsData={adsData}
                refetch={refetch}
            /> */}

            {/* <AdUploader
                title="Sidebar Ad"
                name="Sidebar Ad"
                adsData={adsData}
                refetch={refetch}
            /> */}
        </div>
    );
};

export default AdsManagement;

// import { useState } from "react";
// import { deleteImage, uploadSingleImage } from "../../../../utils";
// import { Button } from "@material-tailwind/react";
// import useAxiosSecure from "../../../../hooks/useAxiosSecure";
// import { toast } from "react-toastify";
// import useAds from "../../../../hooks/useAds";

// const AdsManagement = () => {
//     const [adsData, loading, refetch] = useAds();
//     const [axiosSecure] = useAxiosSecure();

//     const [homePageAdFile, setHomePageAdFile] = useState(null);
//     const [homePageAdLink, setHomePageAdLink] = useState("");
//     const [isLoading, setIsLoading] = useState(false);

//     if (loading) return;

//     // Find homepage ad from array
//     const homePageAd = adsData?.find(ad => ad.name === "Home Page Ad");

//     const handleFileChange = (e) => {
//         const file = e.target.files[0];
//         if (file) setHomePageAdFile(file);
//     };

//     const handleLinkChange = (e) => {
//         setHomePageAdLink(e.target.value);
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setIsLoading(true);

//         try {
//             const homePageAdURL = homePageAdFile ? await uploadSingleImage(homePageAdFile) : homePageAd?.homePageAdURL;

//             const homePageAdPayload = {
//                 name: "Home Page Ad",
//                 homePageAdURL,
//                 homePageAdLink
//             };

//             if (homePageAd?._id) {

//                 await deleteImage(homePageAd.homePageAdURL);

//                 // Update existing logo
//                 const { data } = await axiosSecure.put(`/ads/${homePageAd?._id}`, homePageAdPayload);
//                 if (data?.modifiedCount > 0) {
//                     refetch();
//                     toast.success("Ad updated successfully!", {
//                         position: "top-right",
//                         autoClose: 1000,
//                         pauseOnHover: false,
//                     });
//                 } else {
//                     toast.info("No changes were made to the logo.", {
//                         position: "top-right",
//                         autoClose: 1000,
//                         pauseOnHover: false,
//                     });
//                 }
//             } else {
//                 const { res } = await axiosSecure.post("/ads", homePageAdPayload);

//                 if (res.insertedId) {
//                     toast.success("Ads created successfully!", {
//                         position: "top-right",
//                         autoClose: 1000,
//                         pauseOnHover: false,
//                     });
//                 } else {
//                     throw new Error("Failed to save the logo.");
//                 }
//             }

//         } catch (error) {
//             console.error("Error saving ads:", error);
//             toast.error("Failed to save ads. Please try again.");
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     return (
//         <div className="max-w-5xl mx-auto p-8 bg-gray-50 shadow rounded border">
//             <form className="space-y-8" onSubmit={handleSubmit}>
//                 <div className="flex flex-col gap-4">
//                     <label className="block text-lg font-medium text-gray-700">
//                         Home Page Ad (728 x 90 pixels)
//                     </label>

//                     {/* Image preview or placeholder */}
//                     <div className="w-full h-[90px] border border-dashed border-gray-300 rounded flex items-center justify-center overflow-hidden bg-white">

//                         {homePageAdFile || homePageAd?.homePageAdURL ? (
//                             <img
//                                 src={homePageAdFile ? URL.createObjectURL(homePageAdFile) : homePageAd?.homePageAdURL}
//                                 alt="Uploaded Logo"
//                                 className="w-full h-full object-cover"
//                             />
//                         ) : (
//                             <span className="text-gray-400 text-sm">
//                                 No image selected
//                             </span>
//                         )}
//                     </div>

//                     <input
//                         type="file"
//                         accept="image/*"
//                         onChange={handleFileChange}
//                         className="w-full px-3 py-1 border border-gray-300 rounded-md"
//                     />

//                     <input
//                         type="text"
//                         placeholder="If home page ad link is available, please enter"
//                         value={homePageAdLink}
//                         onChange={handleLinkChange}
//                         className="w-full px-3 py-1 border border-gray-300 rounded-md"
//                     />
//                 </div>

//                 <div className="flex items-center justify-center">
//                     <Button
//                         type="submit"
//                         loading={isLoading}
//                         className="w-1/3 rounded-none bg-primary font-medium"
//                     >
//                         {isLoading ? "Saving Ads..." : "Save Ads"}
//                     </Button>
//                 </div>
//             </form>
//         </div>
//     );
// };

// export default AdsManagement;

// import { useState } from "react";
// import { uploadAdsToStorage } from "../../../../utils";
// import { Button } from "@material-tailwind/react";
// import useAxiosSecure from "../../../../hooks/useAxiosSecure";
// import { toast } from "react-toastify";
// import useAds from "../../../../hooks/useAds";

// const AdsManagement = () => {
//     const [adsData, , refetch] = useAds();
//     const [axiosSecure] = useAxiosSecure();

//     const [adFiles, setAdFiles] = useState({
//         homePageAd: null,
//         productDetailsPageAd: null,
//         blogPageAd: null,
//         blogDetailsPageAd: null,
//     });
//     const [adLinks, setAdLinks] = useState({
//         homePageAd: "",
//         productDetailsPageAd: "",
//         blogPageAd: "",
//         blogDetailsPageAd: "",
//     });
//     const [isLoading, setIsLoading] = useState(false);

//     const handleFileChange = (e, adType) => {
//         const file = e.target.files[0];
//         if (file) {
//             setAdFiles((prev) => ({
//                 ...prev,
//                 [adType]: file,
//             }));
//         }
//     };

//     const handleLinkChange = (e, adType) => {
//         const link = e.target.value;
//         setAdLinks((prev) => ({
//             ...prev,
//             [adType]: link,
//         }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setIsLoading(true);

//         try {
//             const uploadedAds = await uploadAdsToStorage(adFiles);

//             const adsPayload = [
//                 {
//                     name: "Home Page Ad",
//                     adUrl: uploadedAds.homePageAd || adsData?.ads?.find((ad) => ad.name === "Home Page Ad")?.adUrl || "",
//                     adLink: adLinks.homePageAd || adsData?.ads?.find((ad) => ad.name === "Home Page Ad")?.adLink || "",
//                 },
//                 {
//                     name: "Product Details Page Ad",
//                     adUrl: uploadedAds.productDetailsPageAd || adsData?.ads?.find((ad) => ad.name === "Product Details Page Ad")?.adUrl || "",
//                     adLink: adLinks.productDetailsPageAd || adsData?.ads?.find((ad) => ad.name === "Product Details Page Ad")?.adLink || "",
//                 },
//                 {
//                     name: "Blog Page Ad",
//                     adUrl: uploadedAds.blogPageAd || adsData?.ads?.find((ad) => ad.name === "Blog Page Ad")?.adUrl || "",
//                     adLink: adLinks.blogPageAd || adsData?.ads?.find((ad) => ad.name === "Blog Page Ad")?.adLink || "",
//                 },
//                 {
//                     name: "Blog Details Page Ad",
//                     adUrl: uploadedAds.blogDetailsPageAd || adsData?.ads?.find((ad) => ad.name === "Blog Details Page Ad")?.adUrl || "",
//                     adLink: adLinks.blogDetailsPageAd || adsData?.ads?.find((ad) => ad.name === "Blog Details Page Ad")?.adLink || "",
//                 },
//             ];

//             if (adsData?._id) {

//                 const { data } = await axiosSecure.put(`/ads/${adsData._id}`, { ads: adsPayload });

//                 if (data.modifiedCount > 0) {
//                     refetch();
//                     toast.success("Ads updated successfully!", {
//                         position: "top-right",
//                         autoClose: 1000,
//                         pauseOnHover: false,
//                     });
//                 } else {
//                     toast.info("No changes were made to the ads.", {
//                         position: "top-right",
//                         autoClose: 1000,
//                         pauseOnHover: false,
//                     });
//                 }
//             } else {

//                 const { data } = await axiosSecure.post("/ads", { ads: adsPayload });

//                 if (data.insertedId) {
//                     toast.success("Ads created successfully!", {
//                         position: "top-right",
//                         autoClose: 1000,
//                         pauseOnHover: false,
//                     });
//                 }
//             }
//         } catch (error) {
//             console.error("Error saving ads:", error);
//             toast.error("Failed to save ads. Please try again.");
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     if (!adsData) {
//         return (
//             <div className="flex justify-center items-center h-64">
//                 <svg
//                     className="animate-spin h-8 w-8 text-blue-600"
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                 >
//                     <circle
//                         className="opacity-25"
//                         cx="12"
//                         cy="12"
//                         r="10"
//                         stroke="currentColor"
//                         strokeWidth="4"
//                     ></circle>
//                     <path
//                         className="opacity-75"
//                         fill="currentColor"
//                         d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                     ></path>
//                 </svg>
//                 <span className="ml-4 text-lg text-gray-600">Loading ads data...</span>
//             </div>
//         );
//     }

//     return (
//         <div className="max-w-5xl mx-auto p-8 bg-gray-50 shadow rounded border">
//             <form className="space-y-8" onSubmit={handleSubmit}>
//                 {[
//                     { label: "Home Page Ad", id: "homePageAd" },
//                     { label: "Product Details Page Ad", id: "productDetailsPageAd" },
//                     { label: "Blog Page Ad", id: "blogPageAd" },
//                     { label: "Blog Details Page Ad", id: "blogDetailsPageAd" },
//                 ].map((ad) => {
//                     const existingAd = adsData?.ads?.find((existing) => existing.name === ad.label)?.adUrl;
//                     return (
//                         <div key={ad.id} className="flex flex-col gap-4">
//                             <label htmlFor={ad.id} className="block text-lg font-medium text-gray-700">
//                                 {ad.label} (728 x 90 pixels)
//                             </label>
//                             <div className="relative group w-full h-24 bg-gray-100 border border-gray-300 rounded-md overflow-hidden flex items-center justify-center">
//                                 {!adFiles[ad.id] && !existingAd ? (
//                                     <label
//                                         htmlFor={ad.id}
//                                         className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer text-gray-400 hover:text-blue-500"
//                                     >
//                                         <svg
//                                             xmlns="http://www.w3.org/2000/svg"
//                                             className="h-8 w-8"
//                                             fill="none"
//                                             viewBox="0 0 24 24"
//                                             stroke="currentColor"
//                                         >
//                                             <path
//                                                 strokeLinecap="round"
//                                                 strokeLinejoin="round"
//                                                 strokeWidth={2}
//                                                 d="M3 16v5a2 2 0 002 2h14a2 2 0 002-2v-5M16 10l-4-4m0 0l-4 4m4-4v12"
//                                             />
//                                         </svg>
//                                         <span className="mt-2 text-sm">Click to upload</span>
//                                     </label>
//                                 ) : (
//                                     <img
//                                         src={
//                                             adFiles[ad.id]
//                                                 ? URL.createObjectURL(adFiles[ad.id])
//                                                 : existingAd
//                                         }
//                                         alt={ad.label}
//                                         className="absolute inset-0 w-full h-full object-cover"
//                                     />
//                                 )}
//                                 <input
//                                     type="file"
//                                     id={ad.id}
//                                     accept="image/*"
//                                     className="absolute inset-0 opacity-0 cursor-pointer"
//                                     onChange={(e) => handleFileChange(e, ad.id)}
//                                     required
//                                 />
//                             </div>
//                             <input
//                                 type="text"
//                                 placeholder={`If ${ad.label} link is available, please enter`}
//                                 value={adLinks[ad.id] || adsData?.ads?.find((existing) => existing.name === ad.label)?.adLink || ""}
//                                 onChange={(e) => handleLinkChange(e, ad.id)}
//                                 className="w-full px-3 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
//                             />

//                         </div>
//                     );
//                 })}

//                 <div className="flex items-center justify-center">
//                     <Button
//                         type="submit"
//                         loading={isLoading}
//                         className="w-1/3 rounded-none bg-primary font-medium"
//                     >
//                         {isLoading ? "Saving Ads..." : "Save Ads"}
//                     </Button>
//                 </div>
//             </form>
//         </div>
//     );
// };

// export default AdsManagement;