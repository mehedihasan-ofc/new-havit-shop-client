import svg1 from "../../../assets/promises/icon-1.svg";
import svg2 from "../../../assets/promises/icon-2.svg";
import svg3 from "../../../assets/promises/icon-3.svg";
import svg4 from "../../../assets/promises/icon-4.svg";
import svg5 from "../../../assets/promises/icon-5.svg";
import svg6 from "../../../assets/promises/icon-6.svg";

const promises = [
    {
        icon: svg1,
        title: "Best Prices & Offers",
        description: "Shop with confidence and enjoy the best deals.",
    },
    {
        icon: svg2,
        title: "Premium Delivery",
        description: "Exclusive 24/7 delivery service for premium customers.",
    },
    {
        icon: svg3,
        title: "Exclusive Daily Deals",
        description: "Unlock special deals by signing up today.",
    },
    {
        icon: svg4,
        title: "Wide Product Selection",
        description: "Explore a variety of products with unbeatable quality.",
    },
    {
        icon: svg5,
        title: "Hassle-Free Returns",
        description: "Enjoy an easy return process within 30 days.",
    },
    {
        icon: svg6,
        title: "Secure Delivery",
        description: "Your packages delivered safely and on time.",
    },
];

const OurPromises = () => {
    return (
        <section className="my-container">
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6">
                {promises.map((promise, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-lg transition-all duration-300 group"
                    >
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full border border-primary flex items-center justify-center shadow-md bg-white group-hover:scale-110 transform transition-transform duration-300">
                            <img src={promise.icon} alt={promise.title} className="w-8 h-8" />
                        </div>
                        <h4 className="text-base font-semibold text-gray-800 mb-2 group-hover:text-primary transition-colors">
                            {promise.title}
                        </h4>
                        <p className="text-sm text-gray-600 leading-relaxed">
                            {promise.description}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default OurPromises;
