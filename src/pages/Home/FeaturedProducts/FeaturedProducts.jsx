// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Autoplay } from 'swiper/modules';

import useProducts from '../../../hooks/useProducts';
import ProductCard from '../../../components/Card/ProductCard/ProductCard';

const FeaturedProducts = () => {

    const [products] = useProducts();

    const enableLoopMode = products?.length > 1;

    return (
        <div className="my-container mb-10">

            <div className="bg-secondary p-5 rounded-lg">
                <div className='flex justify-center items-center'>
                    <h4 className="text-base md:text-xl font-sans font-bold">Featured Products</h4>
                </div>

                <div className='mt-5'>
                    <Swiper
                        slidesPerView={3}
                        spaceBetween={30}
                        autoplay={{
                            delay: 3600,
                            disableOnInteraction: false,
                          }}
                        pagination={{
                            clickable: true,
                        }}
                        modules={[Autoplay]}
                        loop={enableLoopMode}
                    >
                        {products.map(product => (
                            <SwiperSlide key={product._id}>
                                <ProductCard product={product} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>

        </div>
    );
};

export default FeaturedProducts;