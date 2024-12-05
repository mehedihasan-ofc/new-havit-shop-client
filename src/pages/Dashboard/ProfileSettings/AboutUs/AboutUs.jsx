import { useEffect, useState } from "react";
import SVG from "../../../../assets/svg/img-status-8.svg";
import { Button } from "@material-tailwind/react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { toast } from "react-toastify";
import useAboutUs from "../../../../hooks/useAboutUs";
import ReactPlayer from "react-player";

const AboutUs = () => {
    const [axiosSecure] = useAxiosSecure();
    const [aboutUsData, , refetch] = useAboutUs();

    const [videoLink, setVideoLink] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (aboutUsData && aboutUsData._id) {
            // Initialize videoLink with the existing "aboutUs" data
            setVideoLink(aboutUsData.aboutUs || "");
        }
    }, [aboutUsData]);

    // Updated Regex for YouTube video links
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)[a-zA-Z0-9_-]{11}(\?.*)?$/;

    const handleInputChange = (e) => {
        const value = e.target.value;

        // Validate the input
        if (youtubeRegex.test(value)) {
            setVideoLink(value);
        } else {
            setVideoLink("");
            toast.error("Invalid YouTube video link. Please check again!", {
                position: "top-right",
                autoClose: 1500,
                pauseOnHover: false,
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevents page reload

        if (!videoLink) {
            toast.error("Please provide a valid YouTube video link before submitting.", {
                position: "top-right",
                autoClose: 1500,
                pauseOnHover: false,
            });
            return;
        }

        setLoading(true); // Start loading
        try {
            if (aboutUsData?._id) {
                // Update existing video link
                const { data } = await axiosSecure.put(`/about-us/${aboutUsData._id}`, {
                    aboutUs: videoLink,
                });

                if (data.modifiedCount > 0) {
                    refetch();
                    toast.success("About Us Video Link updated successfully!", {
                        position: "top-right",
                        autoClose: 1000,
                        pauseOnHover: false,
                    });
                } else {
                    toast.info("No changes were made to the video link.", {
                        position: "top-right",
                        autoClose: 1000,
                        pauseOnHover: false,
                    });
                }
            } else {
                // Create a new video link
                const { data } = await axiosSecure.post("/about-us", { aboutUs: videoLink });

                if (data.insertedId) {
                    toast.success("About Us Video Link created successfully!", {
                        position: "top-right",
                        autoClose: 1000,
                        pauseOnHover: false,
                    });
                }
            }
        } catch (error) {
            toast.error("An error occurred while saving the video link. Please try again.", {
                position: "top-right",
                autoClose: 1500,
                pauseOnHover: false,
            });
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return (
        <div>
            <div className="border shadow max-w-xl mx-auto">

                <div className="relative">
                    <img className="absolute top-0 right-0" src={SVG} alt="background" />

                    <form className="space-y-6 max-w-md p-8" onSubmit={handleSubmit}>
                        {/* Video Link Input */}
                        <div>
                            <label
                                htmlFor="aboutUsVideo"
                                className="block text-sm font-medium text-gray-700"
                            >
                                About Us - YouTube Video Link
                            </label>
                            <input
                                type="url"
                                id="aboutUsVideo"
                                name="aboutUsVideo"
                                value={videoLink}
                                onChange={handleInputChange}
                                required
                                placeholder="Enter a valid YouTube video link"
                                className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                            />
                        </div>

                        {/* Submit Button */}
                        <div className="text-center">
                            <Button
                                type="submit"
                                className={`rounded-none bg-primary font-medium px-10 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                                disabled={loading}
                            >
                                {loading ? "Saving..." : "Save Video"}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>

            {
                aboutUsData?.aboutUs && (
                    <div className="rounded-lg shadow border p-2 my-5">
                        <div className="w-full h-96">
                            <ReactPlayer
                                controls={true}
                                width='100%'
                                height='100%'
                                url={aboutUsData?.aboutUs}
                            />
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default AboutUs;