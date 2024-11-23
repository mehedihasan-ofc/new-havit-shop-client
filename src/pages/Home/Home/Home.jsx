import Categories from "../Categories/Categories";
import Hero from "../Hero/Hero";
import HomePageAd from "../HomePageAd/HomePageAd";
import NowOffers from "../NowOffers/NowOffers";
import OurPromises from "../OurPromises/OurPromises";
import PopularProducts from "../PopularProducts/PopularProducts";
import AvatarImg from "../../../assets/avator.jpg";
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
                phoneNumber="01744991003"
                accountName="Havit Shop"
                avatar={AvatarImg}
                statusMessage="Active Now"
            />
        </>
    );
};

export default Home;