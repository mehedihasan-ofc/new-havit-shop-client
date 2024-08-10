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
                    className="mySwiper"
                >

                    {
                        banners?.map(banner => (
                            <SwiperSlide key={banner?._id}>
                                <img className='w-full h-[50vh] object-cover' src={banner?.image} alt="banner img" />
                            </SwiperSlide>
                        ))
                    }

                </Swiper>

                <div className='flex justify-between items-center gap-5 mt-5'>
                    <div>
                        <img src="https://cholo-bazar-e-commerce.web.app/assets/banner-10-52b8935d.png" alt="" />
                    </div>
                    <div>
                        <img src="https://ds.rokomari.store/rokomari110/banner/DESKTOPa4b7030c-6d82-44a5-8993-322a8e6621a5.png" alt="" />
                    </div>
                </div>
            </div>

            <WelcomeModal open={open} handleOpen={handleOpen} />
        </>
    );
};

export default Hero;