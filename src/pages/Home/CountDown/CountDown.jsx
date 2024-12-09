import { useState, useEffect } from "react";

const CountDown = () => {
    
    const data = {
        title: "Mega Winter Sale",
        subtitle: "Up to 50% off on selected items!",
        expiredDate: "2024-12-10T00:00:00.000Z",
        products: [
            {
                productId: "63b0d1a7f2a8c7e0b6e12345",
                name: "Thermal Jacket",
                price: 49.99,
                discountedPrice: 39.99,
                stock: 120,
                category: "Winter Wear",
                image: "https://example.com/images/thermal-jacket.jpg",
            },
            {
                productId: "63b0d1a7f2a8c7e0b6e67890",
                name: "Woolen Scarf",
                price: 19.99,
                discountedPrice: 14.99,
                stock: 80,
                category: "Accessories",
                image: "https://example.com/images/woolen-scarf.jpg",
            },
        ],
    };

    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        const countdown = () => {
            const now = new Date();
            const expiry = new Date(data.expiredDate);
            const difference = expiry - now;

            if (difference > 0) {
                const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
                const minutes = Math.floor((difference / 1000 / 60) % 60);
                const seconds = Math.floor((difference / 1000) % 60);
                setTimeLeft({ days, hours, minutes, seconds });
            } else {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            }
        };

        const timer = setInterval(countdown, 1000);
        return () => clearInterval(timer);
    }, [data.expiredDate]);

    return (
        <div className="my-container">
            <div className="bg-secondary p-5 shadow rounded">
                {/* Title and Subtitle */}
                <div className="text-center mb-6">
                    <h2 className="text-xl font-bold text-primary">{data.title}</h2>
                    <p className="text-sm text-primary/80">{data.subtitle}</p>
                </div>

                {/* Countdown Timer */}
                <div className="flex justify-center items-center gap-4 mb-8">
                    {Object.entries(timeLeft).map(([unit, value], index) => (
                        <div
                            key={index}
                            className="text-center p-4 rounded-lg w-16 bg-secondary border-2 border-primary"
                        >
                            <h3 className="text-2xl font-bold text-primary">{value}</h3>
                            <span className="text-xs text-primary/80">
                                {unit.charAt(0).toUpperCase() + unit.slice(1)}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Progress Bar */}
                <div className="w-full h-2 rounded-lg overflow-hidden mb-8 bg-primary/20">
                    <div
                        className="h-full bg-primary"
                        style={{ width: `${(120 - timeLeft.days) / 120 * 100}%` }}
                    ></div>
                </div>

                {/* Product Section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {data.products.map((product) => (
                        <div
                            key={product.productId}
                            className="bg-white shadow-md rounded-lg p-4 relative hover:shadow-lg transition duration-300"
                        >
                            <span className="absolute top-2 left-2 text-white text-xs px-2 py-1 rounded bg-primary">
                                {Math.round(((product.price - product.discountedPrice) / product.price) * 100)}% Off
                            </span>
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-40 object-cover rounded-md mb-4"
                            />
                            <h4 className="text-sm font-bold truncate text-primary">{product.name}</h4>
                            <div className="flex items-center gap-2 mt-2">
                                <span className="text-lg font-bold text-primary">
                                    ${product.discountedPrice.toFixed(2)}
                                </span>
                                <span className="text-xs line-through text-gray-500">
                                    ${product.price.toFixed(2)}
                                </span>
                            </div>
                            <p className="text-xs mt-1 text-primary/80">Stock: {product.stock}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CountDown;