// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Autoplay } from 'swiper/modules';
import { useState } from "react";
import WelcomeModal from "../../../components/Modal/WelcomeModal/WelcomeModal";
import useBanners from '../../../hooks/useBanners';

const Hero = () => {

    const [banners] = useBanners();

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open);

    const enableLoopMode = banners?.length > 1;

    return (
        <>
            <div className='my-container'>
                <Swiper
                    spaceBetween={20}
                    loop={enableLoopMode}
                    pagination={{
                        dynamicBullets: true,
                    }}
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                    }}
                    modules={[Autoplay]}
                >

                    {
                        banners?.map(banner => (
                            <SwiperSlide key={banner?._id}>
                                <img className='w-full h-[400px] object-cover rounded-2xl' src={banner?.image} alt="banner img" />
                            </SwiperSlide>
                        ))
                    }

                </Swiper>
            </div>

            <WelcomeModal open={open} handleOpen={handleOpen} />
        </>
    );
};

export default Hero;