import Categories from "../Categories/Categories";
import Hero from "../Hero/Hero";
import HomePageAd from "../HomePageAd/HomePageAd";
import NowOffers from "../NowOffers/NowOffers";
import OurPromises from "../OurPromises/OurPromises";
import PopularProducts from "../PopularProducts/PopularProducts";
import AvatarImg from "../../../assets/avator.jpg";
import { FloatingWhatsApp } from 'react-floating-whatsapp';
import FeaturedProducts from "../FeaturedProducts/FeaturedProducts";

const Home = () => {
    return (
        <>
            <Hero />
            <NowOffers />
            <FeaturedProducts />
            <Categories />
            <PopularProducts />
            <OurPromises />
            <HomePageAd />

            <FloatingWhatsApp
                phoneNumber="+8801744991003"
                accountName="Havit Shop"
                avatar={AvatarImg}
                statusMessage="Active Now"
            />
        </>
    );
};

export default Home;