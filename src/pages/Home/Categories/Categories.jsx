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

    const bgColors = [
        '#F5F7FA',
        '#DDEEFF',
        '#FFEEDD',
        '#E3FFE8',
        '#FFDDE3',
        '#E8E0FF',
    ];

    const enableLoopMode = categories.length > 1;

    return (
        <div className="my-container">
            <div className='flex justify-between items-center mb-6'>
                <h4 className='text-base md:text-xl font-serif font-bold'>Featured Categories</h4>
                <Button onClick={() => navigate("/categories/all")} variant="text" className="flex items-center gap-2 font-serif px-4 py-2 rounded">
                    See All
                    <FaArrowRightLong />
                </Button>
            </div>

            <Swiper
                slidesPerView={3}
                spaceBetween={10}
                pagination={{ clickable: true }}
                loop={enableLoopMode}
                breakpoints={{
                    640: { slidesPerView: 4, spaceBetween: 20 },
                    768: { slidesPerView: 5, spaceBetween: 30 },
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
                                        className="flex flex-col items-center justify-center rounded px-4 py-6 transition duration-300 hover:text-primary"
                                        style={{
                                            height: '160px',
                                            width: '120px',
                                            backgroundColor: bgColor,
                                            cursor: 'pointer',
                                        }}
                                    >
                                        <div className="w-14 h-14 mb-4">
                                            <img
                                                className="w-full h-full object-contain"
                                                src={category.image}
                                                alt={category.name}
                                            />
                                        </div>
                                        <p className="text-center text-sm font-semibold leading-snug">
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