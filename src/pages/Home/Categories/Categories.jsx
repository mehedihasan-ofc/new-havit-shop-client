import { Button } from "@material-tailwind/react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import useCategories from '../../../hooks/useCategories';
import { FaArrowRightLong } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";

const Categories = () => {
    const [categories] = useCategories();
    const navigate = useNavigate();

    if (!categories || categories.length === 0) return null;

    const enableLoopMode = categories.length > 1;

    // 6 pastel background colors from the image
    const bgColors = ['#E6F8F2', '#F3ECE8', '#D9F2FF', '#FCE8EF', '#E8F2E4', '#FDF1D8'];

    return (
        <div className="my-container">
            <div className='flex justify-between items-center mb-6'>
                <h4 className='text-base md:text-xl font-sans font-bold'>Featured Categories</h4>
                <Button onClick={() => navigate("/categories/all")} variant="text" className="flex items-center gap-2 font-serif px-4 py-2 rounded">
                    See All
                    <FaArrowRightLong />
                </Button>
            </div>

            <Swiper
                slidesPerView={2}
                spaceBetween={10}
                pagination={{ clickable: true }}
                loop={enableLoopMode}
                breakpoints={{
                    640: { slidesPerView: 3, spaceBetween: 10 },
                    768: { slidesPerView: 4, spaceBetween: 30 },
                    1024: { slidesPerView: 6, spaceBetween: 20 },
                }}
            >
                {
                    categories.map((category, index) => {
                        const bgColor = bgColors[index % 6];

                        return (
                            <SwiperSlide key={category._id}>
                                <Link to={`/products/categories/${category._id}`}>
                                    <div
                                        className={`flex flex-col items-center justify-center px-3 py-6 transition-all duration-300 hover:text-primary shadow-sm`}
                                        style={{
                                            backgroundColor: bgColor,
                                            borderRadius: '50% / 30%',
                                            height: '220px',
                                            width: '140px',
                                            margin: '0 auto',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-3 shadow">
                                            <img className='w-14 h-14 object-contain' src={category.image} alt={category.name} />
                                        </div>
                                        <p className='text-center text-sm font-bold font-sans leading-tight transition-colors'>
                                            {category.name}
                                        </p>
                                    </div>
                                </Link>
                            </SwiperSlide>
                        );
                    })
                }
            </Swiper>
        </div>
    );
};

export default Categories;