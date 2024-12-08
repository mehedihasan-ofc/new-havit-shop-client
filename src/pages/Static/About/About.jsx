import AboutImg from "../../../assets/static/about.png";
import SectionTitle from "../../../components/Shared/SectionTitle/SectionTitle";

const About = () => {
    return (
        <div className="my-container my-10">
            <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-6 md:gap-10">
                <div className="space-y-4">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold">About Us</h2>
                    <p className="text-sm sm:text-base font-medium">
                        Welcome to Havit Shop, your premier online shopping destination in Bangladesh! Founded with a vision to redefine the online shopping experience, Havit Shop is more than just an e-commerce platform; it's a hub of innovation, quality, and customer-centricity.
                    </p>
                </div>
                <div className="flex justify-center">
                    <img src={AboutImg} alt="About Havit Shop" className="w-full h-auto md:w-3/4 object-contain" />
                </div>
            </div>

            <hr className="my-8" />

            <div className="space-y-8 mt-10">
                <div className="space-y-2">
                    <SectionTitle title="Our Story" />
                    <p className="text-sm sm:text-base">
                        Our journey began with a simple yet profound idea: to make shopping not just a transaction, but an experience that adds value to your life. With the rapid growth of e-commerce in Bangladesh, we saw an opportunity to create something unique - a platform where convenience meets quality, and where customers are not just shoppers, but valued members of a vibrant community.
                    </p>
                </div>

                <div className="space-y-2">
                    <SectionTitle title="Our Mission" />
                    <p className="text-sm sm:text-base">
                        Our mission is clear: to provide our customers with an unparalleled shopping experience that is convenient, enjoyable, and affordable. We strive to offer a diverse range of high-quality products, meticulously curated to cater to the diverse needs and preferences of our customers across Bangladesh.
                    </p>
                </div>

                <div className="space-y-2">
                    <SectionTitle title="Quality Assurance" />
                    <p className="text-sm sm:text-base">
                        At Havit Shop, quality is non-negotiable. We go above and beyond to ensure that every product in our catalog meets the highest standards of quality and reliability. From electronics and gadgets to fashion, home essentials, and beyond, each item is carefully vetted to guarantee customer satisfaction.
                    </p>
                </div>

                <div className="space-y-2">
                    <SectionTitle title="Customer-Centric Approach" />
                    <p className="text-sm sm:text-base">
                        We believe that our customers are at the heart of everything we do. That's why we're committed to providing exceptional customer service, with a dedicated team on hand to assist you every step of the way. Whether you have a question about a product, need help with your order, or simply want to share feedback, we're here to help.
                    </p>
                </div>

                <div className="space-y-2">
                    <SectionTitle title="Innovation and Adaptation" />
                    <p className="text-sm sm:text-base">
                        Innovation is in our DNA. We're passionate about staying ahead of the curve and bringing you the latest trends and innovations from around the world. Our catalog is constantly evolving and expanding to meet the ever-changing needs and preferences of our customers.
                    </p>
                </div>

                <div className="space-y-2">
                    <SectionTitle title="Community Engagement" />
                    <p className="text-sm sm:text-base">
                        At Havit Shop, we're more than just a marketplace - we're a community. We believe in the power of giving back and making a positive impact on the lives of our customers and the community at large. Through various initiatives and partnerships, we're dedicated to making a difference wherever we can.
                    </p>
                </div>

                <div className="space-y-2">
                    <SectionTitle title="Thank You" />
                    <p className="text-sm sm:text-base">
                        Thank you for choosing Havit Shop as your preferred online shopping destination. We're honored to be a part of your journey, and we look forward to serving you for many years to come.
                    </p>
                    <p className="text-sm sm:text-base">
                        Join us as we continue to redefine the online shopping experience in Bangladesh and beyond.
                    </p>
                </div>

                <div className="space-y-1">
                    <p className="text-sm sm:text-base">Happy shopping!</p>
                    <p className="text-primary font-medium text-sm sm:text-base">The Havit Shop Team</p>
                </div>
            </div>
        </div>
    );
};

export default About;