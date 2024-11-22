import Categories from "../Categories/Categories";
import Hero from "../Hero/Hero";
import HomePageAd from "../HomePageAd/HomePageAd";
import NowOffers from "../NowOffers/NowOffers";
import OurPromises from "../OurPromises/OurPromises";
import PopularProducts from "../PopularProducts/PopularProducts";

import { FloatingWhatsApp } from 'react-floating-whatsapp';

const Home = () => {
    return (
        <>
            <Hero />
            <NowOffers />
            <Categories />
            <PopularProducts />
            <HomePageAd />
            <OurPromises />

            <FloatingWhatsApp
                phoneNumber="01705159483"
                accountName="Mehedi Hasan"
            />
        </>
    );
};

export default Home;