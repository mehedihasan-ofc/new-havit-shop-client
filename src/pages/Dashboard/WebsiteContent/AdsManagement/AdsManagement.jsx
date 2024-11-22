import { useState } from "react";
import { uploadAdsToStorage } from "../../../../utils";
import axios from "axios";
import { Button } from "@material-tailwind/react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";

const AdsManagement = () => {
    const [axiosSecure] = useAxiosSecure();
    
    const [adFiles, setAdFiles] = useState({
        homePageAd: null,
        productDetailsPageAd: null,
        blogPageAd: null,
        blogDetailsPageAd: null,
    });
    const [isLoading, setIsLoading] = useState(false);

    const { data: adsData = {}, isLoading: loading } = useQuery({
        queryKey: ['adsData'],
        queryFn: async () => {
            const res = await fetch('https://new-havit-shop-server.vercel.app/ads');
            return res.json();
        }
    });

    const handleFileChange = (e, adType) => {
        const file = e.target.files[0];
        if (file) {
            setAdFiles((prev) => ({
                ...prev,
                [adType]: file,
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
    
        try {
            // Upload ads to Firebase Storage
            const uploadedAds = await uploadAdsToStorage(adFiles);

            const ads = [
                {
                    name: "Home Page Ad",
                    adUrl: uploadedAds.homePageAd,
                },
                {
                    name: "Product Details Page Ad",
                    adUrl: uploadedAds.productDetailsPageAd,
                },
                {
                    name: "Blog Page Ad",
                    adUrl: uploadedAds.blogPageAd,
                },
                {
                    name: "Blog Details Page Ad",
                    adUrl: uploadedAds.blogDetailsPageAd,
                }
            ];
    
            // Send the ads data to the backend
            const { data } = await axiosSecure.post("/ads", { ads });

            if (data.insertedId) {
                toast.success('Ads successfully uploaded and saved!', {
                    position: "top-right",
                    autoClose: 1000,
                    pauseOnHover: false,
                });
            }
            else {
                console.error("No insertedId in response");
            }

        } catch (error) {
            console.error("Error uploading ads:", error);
            alert("Error uploading ads. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };    

    return (
        <div className="max-w-5xl mx-auto p-8 bg-gray-50 shadow rounded border">
            {isLoading && (
                <div className="flex justify-center items-center mb-6">
                    <svg
                        className="animate-spin h-8 w-8 text-blue-600"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        ></circle>
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                    </svg>
                    <span className="ml-4 text-lg text-gray-600">Uploading ads...</span>
                </div>
            )}

            <form className="space-y-8" onSubmit={handleSubmit}>
                {[
                    { label: "Home Page Ad", id: "homePageAd" },
                    { label: "Product Details Page Ad", id: "productDetailsPageAd" },
                    { label: "Blog Page Ad", id: "blogPageAd" },
                    { label: "Blog Details Page Ad", id: "blogDetailsPageAd" },
                ].map((ad) => (
                    <div key={ad.id} className="flex flex-col gap-4">
                        <label
                            htmlFor={ad.id}
                            className="block text-lg font-medium text-gray-700"
                        >
                            {ad.label} (728 x 90 pixels)
                        </label>
                        <div className="relative group w-full h-24 bg-gray-100 border border-gray-300 rounded-md overflow-hidden flex items-center justify-center">
                            {!adFiles[ad.id] ? (
                                <label
                                    htmlFor={ad.id}
                                    className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer text-gray-400 hover:text-blue-500"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-8 w-8"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M3 16v5a2 2 0 002 2h14a2 2 0 002-2v-5M16 10l-4-4m0 0l-4 4m4-4v12"
                                        />
                                    </svg>
                                    <span className="mt-2 text-sm">Click to upload</span>
                                </label>
                            ) : (
                                <img
                                    src={URL.createObjectURL(adFiles[ad.id])}
                                    alt={ad.label}
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                            )}
                            <input
                                type="file"
                                id={ad.id}
                                accept="image/*"
                                className="absolute inset-0 opacity-0 cursor-pointer"
                                onChange={(e) => handleFileChange(e, ad.id)}
                            />
                        </div>
                    </div>
                ))}

                <div className='flex items-center justify-center'>
                    <Button type="submit" loading={isLoading} className='w-1/3 rounded-none bg-primary font-medium'>
                    {isLoading ? "Saving Ads..." : "Save Ads"}
                    </Button>
                </div>

            </form>
        </div>
    );
};

export default AdsManagement;