import { useState } from "react";
import { Button } from "@material-tailwind/react";
import SVG from "../../../../assets/svg/img-status-7.svg";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { toast } from "react-toastify";

const BreakingText = () => {
    
    const [axiosSecure] = useAxiosSecure();
    
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {

            const newBreakingText = {
                breakingText: text,
                createdAt: new Date().toISOString()
            };

            // Make an API call to send the data to the database
            const { data } = await axiosSecure.post('/breaking-text', newBreakingText);

            if (data.insertedId) {
                toast.success('Breaking text created successfully!', {
                    position: "top-right",
                    autoClose: 1000,
                    pauseOnHover: false,
                });

                // Reset form state
                setText("");
            }

        } catch (error) {
            console.error('Error creating breaking text:', error);
            toast.error('Failed to create breaking text. Please try again.');
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
                            {loading ? "Submitting..." : "Submit"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BreakingText;
