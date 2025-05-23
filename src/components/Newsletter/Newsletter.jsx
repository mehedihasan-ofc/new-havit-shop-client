import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

const Newsletter = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        setLoading(true);

        try {
            const newSubscription = {
                email,
                createdAt: new Date().toISOString(),
            };

            const response = await axios.post(
                'https://new-havit-shop-server.vercel.app/subscription',
                newSubscription
            );

            if (response.data.message === 'Email already exists!') {
                toast.error('This email is already subscribed.', {
                    position: "top-right",
                    autoClose: 1600,
                    pauseOnHover: false,
                });
            } else if (response.status === 200) {
                toast.success('Subscribed successfully!', {
                    position: "top-right",
                    autoClose: 1600,
                    pauseOnHover: false,
                });
                setEmail('');
            }
        } catch (error) {
            toast.error('Failed to subscribe. Please try again.', {
                position: "top-right",
                autoClose: 1600,
                pauseOnHover: false,
            });
            console.error('Error subscribing:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (event) => {
        setEmail(event.target.value);
    };

    return (
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white py-10 sm:py-16 rounded-md">
            <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
                <h3 className="text-2xl sm:text-3xl font-semibold">
                    Stay Updated with Our Latest News and Offers!
                </h3>
                <p className="text-gray-200 text-sm sm:text-base leading-relaxed">
                    Be the first to know about our latest news, promotions, and exclusive offers by subscribing to our newsletter. <br /> Join now and stay connected with the latest updates from Havit Shop!
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row justify-center items-center gap-3">
                    <label htmlFor="email" className="sr-only">
                        Email:
                    </label>

                    <div className="flex flex-col sm:flex-row w-full sm:w-auto">
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email address"
                            value={email}
                            onChange={handleChange}
                            className="py-3 px-4 w-full sm:w-96 sm:rounded-l-md text-black outline-none"
                            required
                        />
                        <button
                            type="submit"
                            disabled={loading}
                            className="py-3 bg-primary text-white px-5 mt-3 sm:mt-0 sm:rounded-r-md rounded-md sm:rounded-l-none outline-none"
                        >
                            {loading ? 'Subscribing...' : 'Subscribe'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Newsletter;