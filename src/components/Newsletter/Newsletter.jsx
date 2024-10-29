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
                createdAt: new Date().toISOString()
            }

            const response = await axios.post('https://new-havit-shop-server.vercel.app/subscription', newSubscription);
            if (response.data.message === 'Email already exists!') {
                toast.error('This email is already subscribed.', {
                    position: "top-right",
                    autoClose: 1600,
                    pauseOnHover: false,
                });
            } else if(response.status === 200) {
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
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white py-16 rounded-md">
            <div className="max-w-4xl mx-auto px-4 text-center">
                <h3 className="text-3xl font-semibold mb-4">Stay Updated with Our Latest News and Offers!</h3>
                <p className="text-gray-200 mb-6">Be the first to know about our latest news, promotions, and exclusive offers by subscribing to our newsletter. <br /> Join now and stay connected with the latest updates from Havit Shop!</p>

                <form onSubmit={handleSubmit} className="flex justify-center items-center">
                    <label htmlFor="email" className="sr-only">Email:</label>

                    <div className="flex items-center">
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email address"
                            value={email}
                            onChange={handleChange}
                            className="py-3 pl-4 w-96 rounded-l-md outline-none text-black"
                            required
                        />
                        <button
                            type="submit"
                            disabled={loading}
                            className="py-3 bg-primary text-white px-5 rounded-r-md outline-none"
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