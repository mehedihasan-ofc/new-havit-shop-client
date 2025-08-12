// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Autoplay, Pagination } from 'swiper/modules';
import { useState } from "react";
import WelcomeModal from "../../../components/Modal/WelcomeModal/WelcomeModal";
import useBanners from '../../../hooks/useBanners';
import useWelcome from '../../../hooks/useWelcome';

const Hero = () => {
    const [welcomeData, isLoadingWelcome] = useWelcome();
    const [banners, isLoadingBanners] = useBanners();

    const [open, setOpen] = useState(true);
    const handleOpen = () => setOpen(!open);

    const enableLoopMode = banners?.length > 1;

    // Skeleton loader while banners are loading
    const BannerSkeleton = () => (
        <div className="my-container">
            <div className="w-full h-56 sm:h-72 md:h-96 bg-gray-300 rounded-2xl animate-pulse"></div>
        </div>
    );

    if (isLoadingBanners) return <BannerSkeleton />;

    // Early return if no banners
    if (!banners || banners.length === 0) return null;

    return (
        <>
            <div className='my-container'>
                <Swiper
                    spaceBetween={20}
                    loop={enableLoopMode}
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 5000, disableOnInteraction: false }}
                    modules={[Autoplay, Pagination]}
                >
                    {banners.map(banner => (
                        <SwiperSlide key={banner?._id}>
                            <img
                                className='w-full h-full object-cover rounded-2xl'
                                src={banner?.image}
                                alt="banner img"
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {!isLoadingWelcome && (
                <WelcomeModal open={open} handleOpen={handleOpen} welcomeData={welcomeData} />
            )}
        </>
    );
};

export default Hero;
