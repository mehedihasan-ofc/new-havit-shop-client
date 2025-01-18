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
import useWelcome from '../../../hooks/useWelcome';

const Hero = () => {

    const [welcomeData, isLoading] = useWelcome();
    const [banners] = useBanners();

    const [open, setOpen] = useState(true);
    const handleOpen = () => setOpen(!open);

    const enableLoopMode = banners?.length > 1;

     // Early return if no categories exist
     if (!banners || banners.length === 0) return null;

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
                                <img className='w-full h-full object-cover rounded-2xl' src={banner?.image} alt="banner img" />
                            </SwiperSlide>
                        ))
                    }

                </Swiper>
            </div>

            {!isLoading && <WelcomeModal open={open} handleOpen={handleOpen} welcomeData={welcomeData} />}
        </>
    );
};

export default Hero;