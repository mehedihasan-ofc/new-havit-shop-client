import Categories from "../Categories/Categories";
import Hero from "../Hero/Hero";
import NowOffers from "../NowOffers/NowOffers";
import OurPromises from "../OurPromises/OurPromises";
import PopularProducts from "../PopularProducts/PopularProducts";
import FeaturedProducts from "../FeaturedProducts/FeaturedProducts";
import SpecialOffers from "../SpecialOffers/SpecialOffers";
import CountDown from "../CountDown/CountDown";
import PremiumDelivery from "../PremiumDelivery/PremiumDelivery";
import ShowAd from "../../../components/Ads/ShowAd/ShowAd";

const Home = () => {
    return (
        <>
            <div className="my-5 space-y-8">
                <Hero />
                <NowOffers />
                <FeaturedProducts />
                <Categories />
                <SpecialOffers />
                <PopularProducts />
                <CountDown />
                <OurPromises />
                <PremiumDelivery />
                <ShowAd name="Home Page Ad" />
            </div>
        </>
    );
};

export default Home;