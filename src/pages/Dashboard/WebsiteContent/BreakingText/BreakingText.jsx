import { useState, useEffect } from "react";
import { Button } from "@material-tailwind/react";
import SVG from "../../../../assets/svg/img-status-7.svg";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";

const BreakingText = () => {
    
    const [axiosSecure] = useAxiosSecure();
    
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(false);

    const { data: breakingTextData = {}, isLoading } = useQuery({
        queryKey: ['breakingTextData'],
        queryFn: async () => {
            const res = await fetch('https://new-havit-shop-server.vercel.app/breaking-text');
            return res.json();
        }
    });

    useEffect(() => {
        if (breakingTextData?.breakingText) {
            setText(breakingTextData.breakingText);
        }
    }, [breakingTextData]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const breakingTextPayload = {
                breakingText: text,
                createdAt: new Date().toISOString()
            };

            // If breaking text exists, update it, otherwise create new
            if (breakingTextData?._id) {
                // Update the existing breaking text
                const { data } = await axiosSecure.put(`/breaking-text/${breakingTextData._id}`, breakingTextPayload);
                
                if (data.modifiedCount > 0) {
                    toast.success('Breaking text updated successfully!', {
                        position: "top-right",
                        autoClose: 1000,
                        pauseOnHover: false,
                    });
                }
            } else {
                // Create new breaking text
                const { data } = await axiosSecure.post('/breaking-text', breakingTextPayload);

                if (data.insertedId) {
                    toast.success('Breaking text created successfully!', {
                        position: "top-right",
                        autoClose: 1000,
                        pauseOnHover: false,
                    });
                }
            }
        } catch (error) {
            console.error('Error saving breaking text:', error);
            toast.error('Failed to save breaking text. Please try again.');
        } finally {
            setLoading(false);  // Reset loading state
        }
    };

    return (
        <div className="border shadow max-w-xl mx-auto">
            <div className="relative">
                <img className="absolute top-0 right-0" src={SVG} alt="background" />

                <form onSubmit={handleSubmit} className="space-y-6 max-w-md p-8">
                    <div>
                        <label
                            htmlFor="breakingText"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Enter Breaking Text
                        </label>
                        <textarea
                            id="breakingText"
                            name="breakingText"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder="Type Breaking Text here"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                            rows="4"
                            required
                        ></textarea>
                    </div>

                    <div>
                        <Button type="submit" loading={loading} className="rounded-none bg-primary font-medium px-10">
                            {loading ? "Submitting..." : breakingTextData?._id ? "Update Breaking Text" : "Create Breaking Text"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BreakingText;