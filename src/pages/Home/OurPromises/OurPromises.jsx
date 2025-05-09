import svg1 from "../../../assets/promises/icon-1.svg";
import svg3 from "../../../assets/promises/icon-3.svg";
import svg4 from "../../../assets/promises/icon-4.svg";

const promises = [
    {
        icon: svg1,
        title: "Best Prices",
        description: "Always great deals.",
    },
    {
        icon: svg3,
        title: "Daily Offers",
        description: "New deals every day.",
    },
    {
        icon: svg4,
        title: "Wide Selection",
        description: "Plenty to choose from.",
    }
];

const OurPromises = () => {
    return (
        <section className="pt-5">
            <div className="my-container">

                {/* Section Heading */}
                <div className="text-center mb-5">
                    <h2 className="text-3xl font-bold font-serif">Our Promises</h2>
                    <p className="text-gray-600 text-xs md:text-sm mt-2">
                        We’re committed to giving you an exceptional shopping experience, every time.
                    </p>
                </div>

                {/* Promises Grid */}
                <div className="grid grid-cols-3 gap-5">
                    {promises.map((promise, index) => (
                        <div
                            key={index}
                            className="border border-gray-200 rounded py-5 md:p-5 text-center shadow"
                        >
                            <img src={promise.icon} alt={promise.title} className="w-8 h-8 md:w-10 md:h-10 mx-auto mb-1 md:mb-3" />
                            <h4 className="text-sm md:text-base font-medium text-gray-800 md:mb-1">
                                {promise.title}
                            </h4>
                            <p className="text-xs md:text-sm text-gray-600">
                                {promise.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default OurPromises;
