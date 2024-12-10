import Categories from "../Categories/Categories";
import Hero from "../Hero/Hero";
import HomePageAd from "../HomePageAd/HomePageAd";
import NowOffers from "../NowOffers/NowOffers";
import OurPromises from "../OurPromises/OurPromises";
import PopularProducts from "../PopularProducts/PopularProducts";
import AvatarImg from "../../../assets/avator.jpg";
import { FloatingWhatsApp } from 'react-floating-whatsapp';
import FeaturedProducts from "../FeaturedProducts/FeaturedProducts";
import SpecialOffers from "../SpecialOffers/SpecialOffers";
import CountDown from "../CountDown/CountDown";

const Home = () => {
    return (
        <>
            <div className="my-5 space-y-8">
                <Hero />
                <NowOffers />
                <CountDown />
                <Categories />
                <SpecialOffers />
                <PopularProducts />
                <FeaturedProducts />
                <OurPromises />
                <HomePageAd />
            </div>


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