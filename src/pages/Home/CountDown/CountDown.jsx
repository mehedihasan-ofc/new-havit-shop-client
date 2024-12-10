import { useState, useEffect } from "react";
import useCampaign from "../../../hooks/useCampaign";
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';

// import required modules
import { Autoplay, Navigation } from 'swiper/modules';
import ProductCard from "../../../components/Card/ProductCard/ProductCard";

const CountDown = () => {

    const [campaignData] = useCampaign();
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    const enableLoopMode = campaignData?.length > 1;

    useEffect(() => {
        const countdown = () => {
            const now = new Date();
            const expiry = new Date(campaignData.expiredDate);
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
    }, [campaignData.expiredDate]);

    return (
        <div className="my-container">
            <div className="bg-secondary p-5 shadow rounded">
                {/* Title and Subtitle */}
                <div className="text-center mb-6">
                    <h2 className="text-xl font-bold text-primary">{campaignData.title}</h2>
                    <p className="text-sm text-primary/80">{campaignData.subtitle}</p>
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
                <div className='relative mt-5'>

                    <div className="absolute top-1/2 -left-4 transform -translate-y-1/2 z-20">
                        <button
                            className="swiper-button-prev bg-white shadow-lg rounded-full p-1 hover:bg-gray-100 transition"
                            aria-label="Previous"
                        >
                            <IoIosArrowRoundBack size={20} />
                        </button>
                    </div>
                    <div className="absolute top-1/2 -right-4 transform -translate-y-1/2 z-20">
                        <button
                            className="swiper-button-next bg-white shadow-lg rounded-full p-1 hover:bg-gray-100 transition"
                            aria-label="Next"
                        >
                            <IoIosArrowRoundForward size={20} />
                        </button>
                    </div>


                    <div className='px-5'>
                        <Swiper
                            slidesPerView={1}
                            spaceBetween={20}
                            autoplay={{
                                delay: 3600,
                                disableOnInteraction: false,
                            }}
                            pagination={{
                                clickable: true,
                            }}
                            navigation={{
                                nextEl: '.swiper-button-next',
                                prevEl: '.swiper-button-prev',
                            }}
                            modules={[Autoplay, Navigation]}
                            loop={enableLoopMode}
                            breakpoints={{
                                640: {
                                    slidesPerView: 3,
                                    spaceBetween: 30,
                                },
                            }}
                        >
                            {campaignData?.products.map(product => (
                                <SwiperSlide key={product._id}>
                                    <ProductCard product={product} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CountDown;