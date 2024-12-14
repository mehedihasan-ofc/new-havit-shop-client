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
        <div className="my-container">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6 gap-5 cursor-zoom-in">
                {promises.map((promise, index) => (
                    <div
                        key={index}
                        className="flex flex-col items-center text-center rounded-xl p-6 border shadow transform transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-md"
                    >
                        {/* Icon container */}
                        <div className="w-16 h-16 rounded-full flex items-center justify-center shadow border border-primary mb-4">
                            <img src={promise.icon} alt={promise.title} className="w-10 h-10" />
                        </div>

                        {/* Title */}
                        <h4 className="text-sm md:text-lg font-semibold text-[#3BB77E] mb-3">{promise.title}</h4>

                        {/* Description */}
                        <p className="text-xs text-[#3BB77E] leading-snug">{promise.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OurPromises;