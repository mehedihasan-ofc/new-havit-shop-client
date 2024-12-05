import { Button } from "@material-tailwind/react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import useCategories from '../../../hooks/useCategories';
import { FaArrowRightLong } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";

const Categories = () => {

    const [categories] = useCategories();
    const navigate = useNavigate();

     // Early return if no categories exist
     if (!categories || categories.length === 0) return null;

    const enableLoopMode = categories?.length > 1;

    // Define your color palette
    const colors = ['#F2FCE4', '#FFFCEB', '#ECFFEC', '#FEEFEA', '#FFF3EB', '#FFF3FF'];

    // Function to randomly select a color
    const getRandomColor = () => {
        return colors[Math.floor(Math.random() * colors.length)];
    };

    return (
        <div className="my-container">

            <div className='flex justify-between items-center'>
                <h4 className='text-base md:text-xl font-sans font-bold'>Featured Categories</h4>
                <Button onClick={() => navigate("/categories/all")} variant="text" className="flex items-center gap-2 font-serif px-4 py-2 rounded">
                    See All
                    <FaArrowRightLong />
                </Button>
            </div>

            <div className='mt-5'>
                <Swiper
                    slidesPerView={2}
                    spaceBetween={10}
                    pagination={{
                        clickable: true,
                    }}
                    loop={enableLoopMode}
                    breakpoints={{
                        640: {
                            slidesPerView: 3,
                            spaceBetween: 20,
                        },
                        768: {
                            slidesPerView: 4,
                            spaceBetween: 40,
                        },
                        1024: {
                            slidesPerView: 5,
                            spaceBetween: 50,
                        },
                    }}
                >
                    {
                        categories?.map(category => (
                            <SwiperSlide key={category?._id}>
                                <Link to={`/products/categories/${category?._id}`}>
                                    <div className='h-28 text-center cursor-pointer border border-[#F4F6FA] hover:border-primary rounded-lg px-2 py-4 transition duration-300'
                                        style={{ backgroundColor: getRandomColor() }}
                                    >
                                        <img className='w-14 mx-auto' src={category?.image} alt={category?.name} />
                                        <p className='text-xs font-semibold font-sans mt-1'>{category?.name}</p>
                                    </div>
                                </Link>
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </div>
        </div>
    );
};

export default Categories;