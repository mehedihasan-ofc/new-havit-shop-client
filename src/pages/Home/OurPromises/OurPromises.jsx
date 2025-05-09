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
        <section className="">
            <div className="my-container">

                {/* Section Heading */}
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold font-serif">Our Promises</h2>
                    <p className="text-gray-600 text-sm mt-2">
                        We’re committed to giving you an exceptional shopping experience, every time.
                    </p>
                </div>

                {/* Promises Grid */}
                <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
                    {promises.map((promise, index) => (
                        <div
                            key={index}
                            className="border border-gray-200 rounded-xl p-5 text-center hover:shadow-sm transition duration-200"
                        >
                            <img src={promise.icon} alt={promise.title} className="w-10 h-10 mx-auto mb-3" />
                            <h4 className="text-base font-medium text-gray-800 mb-1">
                                {promise.title}
                            </h4>
                            <p className="text-sm text-gray-600">
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
