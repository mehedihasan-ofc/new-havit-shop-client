// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';

// import required modules
import { Autoplay, Navigation } from 'swiper/modules';

import ProductCard from '../../../components/Card/ProductCard/ProductCard';
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from 'react-icons/io';
import { useQuery } from '@tanstack/react-query';

const FeaturedProducts = () => {

    const { data: newArrivalsProducts = [] } = useQuery({
        queryKey: ['newArrivalsProducts'],
        queryFn: async () => {
            const res = await fetch('https://server.havitshopbd.com/products/new-arrivals');
            return res.json();
        }
    });
    const enableLoopMode = newArrivalsProducts?.length > 1;

    // Early return if no categories exist
    if (!newArrivalsProducts || newArrivalsProducts.length === 0) return null;

    return (
        <div className="my-container">

            <div className="p-5 shadow-lg border rounded">
                <div className='flex justify-center items-center'>
                    <h4 className="text-base md:text-2xl font-sans font-bold">Featured Products</h4>
                </div>

                <div className='relative mt-6'>

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
                            {newArrivalsProducts.map(product => (
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

export default FeaturedProducts;