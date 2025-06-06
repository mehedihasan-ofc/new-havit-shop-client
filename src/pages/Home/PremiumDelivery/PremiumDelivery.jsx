import { FaBoxOpen, FaShippingFast, FaUndo, FaHeadset } from "react-icons/fa";
import pdImg from "../../../assets/static/pd.jpg";

const PremiumDelivery = () => {
    return (
        <section className="md:border-b">
            <div className="my-container grid grid-cols-1 md:grid-cols-2 items-center gap-10">

                <div>
                    <h2 className="text-xl md:text-3xl font-serif font-extrabold text-gray-900 mb-6 leading-tight">
                        Premium Delivery
                    </h2>

                    <p className="text-lg text-gray-600 mb-6">
                        We prioritize your satisfaction with delivery that’s fast, safe, and stress-free. Here’s what you get with our premium service:
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5 text-gray-700 text-base">
                        <div className="flex items-start gap-3">
                            <FaShippingFast className="text-xl text-primary mt-1" />
                            <div>
                                <h4 className="font-semibold">Speedy Shipping</h4>
                                <p className="text-sm text-gray-600">Receive your orders faster with priority handling.</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <FaBoxOpen className="text-xl text-primary mt-1" />
                            <div>
                                <h4 className="font-semibold">Secure Packaging</h4>
                                <p className="text-sm text-gray-600">Every item is carefully packed for safe arrival.</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <FaUndo className="text-xl text-primary mt-1" />
                            <div>
                                <h4 className="font-semibold">Hassle-Free Returns</h4>
                                <p className="text-sm text-gray-600">Easy return process for a smooth shopping experience.</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <FaHeadset className="text-xl text-primary mt-1" />
                            <div>
                                <h4 className="font-semibold">24/7 Support</h4>
                                <p className="text-sm text-gray-600">Our team is always here to help with your concerns.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="hidden md:flex justify-center">
                    <img
                        src={pdImg}
                        alt="Premium Delivery"
                        className="w-full max-w-sm"
                    />
                </div>
            </div>
        </section>
    );
};

export default PremiumDelivery;