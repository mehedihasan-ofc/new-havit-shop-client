import Categories from "../Categories/Categories";
import Hero from "../Hero/Hero";
import NowOffers from "../NowOffers/NowOffers";
import OurPromises from "../OurPromises/OurPromises";
import PopularProducts from "../PopularProducts/PopularProducts";

const Home = () => {
    return (
        <>
            <Hero />
            <NowOffers />
            <Categories />
            <PopularProducts />
            <OurPromises />
        </>
    );
};

export default Home;