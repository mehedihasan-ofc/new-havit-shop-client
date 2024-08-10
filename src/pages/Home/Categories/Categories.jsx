import { Button } from "@material-tailwind/react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import useCategories from '../../../hooks/useCategories';
import { FaArrowRightLong } from "react-icons/fa6";

const Categories = () => {

    const [categories] = useCategories();

    // Define your color palette
    const colors = ['#F2FCE4', '#FFFCEB', '#ECFFEC', '#FEEFEA', '#FFF3EB', '#FFF3FF'];

    // Function to randomly select a color
    const getRandomColor = () => {
        return colors[Math.floor(Math.random() * colors.length)];
    };

    return (
        <div className="my-container">

            <div className='flex justify-between items-center'>
                <h4 className='text-2xl font-sans font-bold'>Featured Categories</h4>
                {/* <button className='font-serif'>See All</button> */}

                <Button variant="text" className="flex items-center gap-2 font-serif px-4 py-2 rounded">
                    See All
                    <FaArrowRightLong />
                </Button>
            </div>

            <div className='mt-5'>
                <>
                    <Swiper
                        slidesPerView={1}
                        spaceBetween={10}
                        pagination={{
                            clickable: true,
                        }}
                        breakpoints={{
                            640: {
                                slidesPerView: 2,
                                spaceBetween: 20,
                            },
                            768: {
                                slidesPerView: 4,
                                spaceBetween: 40,
                            },
                            1024: {
                                slidesPerView: 7,
                                spaceBetween: 30,
                            },
                        }}
                        className="mySwiper"
                    >
                        {
                            categories?.map(category => (
                                <SwiperSlide key={category?._id}>
                                    <div className='h-36 text-center cursor-pointer border border-[#F4F6FA] hover:border-primary rounded-lg px-2 py-4 transition duration-300'
                                        style={{ backgroundColor: getRandomColor() }}
                                    >
                                        <img className='w-16 mx-auto' src={category?.image} alt={category?.name} />
                                        <p className='text-sm font-semibold font-sans'>{category?.name}</p>
                                    </div>
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>
                </>
            </div>
        </div>
    );
};

export default Categories;