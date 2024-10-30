import Categories from "../Categories/Categories";
import Hero from "../Hero/Hero";
import NowOffers from "../NowOffers/NowOffers";
import OurPromises from "../OurPromises/OurPromises";

const Home = () => {
    return (
        <>
            <Hero />
            <OurPromises />
            <NowOffers />
            <Categories />
        </>
    );
};

export default Home;