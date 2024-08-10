import { Link } from "react-router-dom";
import PrivacyImg from "../../../assets/static/privacy.png";
import SectionTitle from "../../../components/Shared/SectionTitle/SectionTitle";

const PrivacyPolicy = () => {
    return (
        <>
            <div className="my-container my-10">

                <div className="grid grid-cols-2 items-center gap-10">
                    <div className="space-y-4">
                        <h2 className="text-4xl font-semibold">Privacy Policy</h2>
                        <p className="font-medium">At Havit Shop, we take your privacy and the security of your personal information seriously. This Privacy Policy outlines how we collect, use, and protect the information you provide to us when you use our website or interact with our services.</p>
                    </div>
                    <div>
                        <img src={PrivacyImg} alt="" />
                    </div>
                </div>

                <hr />

                <div className="space-y-8 mt-10">

                    <div className="space-y-2">
                        <SectionTitle title="Information We Collect" />
                        <p>When you visit Havit Shop or use our services, we may collect various types of information, including:</p>

                        <ul className="list-disc space-y-2 pl-5">
                            <li>Personal Information: Such as your name, email address, phone number, shipping address, and payment details, which you provide to us when creating an account, making a purchase, or contacting customer support.</li>

                            <li>Device Information: Including your IP address, browser type, operating system, and other technical data collected automatically when you visit our website.</li>

                            <li>Usage Information: Such as your browsing activity, interactions with our website, and preferences, which help us improve our services and user experience.</li>
                        </ul>
                    </div>

                    <div className="space-y-2">
                        <SectionTitle title="How We Use Your Information" />
                        <p>We use the information we collect for the following purposes:</p>

                        <ul className="list-disc space-y-2 pl-5">
                            <li>To process and fulfill your orders, including payment processing, shipping, and delivery.</li>

                            <li>To communicate with you regarding your orders, account information, promotions, and updates.</li>

                            <li>To personalize your shopping experience and provide you with relevant product recommendations and offers.</li>

                            <li>To improve our website, products, and services based on your feedback and usage patterns.</li>

                            <li>To prevent fraud, detect security threats, and ensure the security of our website and users.</li>

                            <li>To comply with legal obligations and regulations.</li>
                        </ul>
                    </div>

                    <div className="space-y-2">
                        <SectionTitle title="Data Security" />
                        <p>We implement robust security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. We use industry-standard encryption protocols to secure data transmission and storage and regularly update our security practices to mitigate risks.</p>
                    </div>

                    <div className="space-y-2">
                        <SectionTitle title="Data Sharing and Disclosure" />
                        <p>We may share your personal information with third-party service providers, such as payment processors, shipping carriers, and IT service providers, to facilitate our operations and provide you with seamless service. However, we do not sell, trade, or rent your personal information to third parties for marketing purposes.</p>
                    </div>

                    <div className="space-y-2">
                        <SectionTitle title="Cookies and Tracking Technologies" />
                        <p>Havit Shop uses cookies and similar tracking technologies to enhance your browsing experience, analyze website traffic, and personalize content and advertisements. You can manage your cookie preferences through your browser settings or opt-out of targeted advertising by adjusting your ad preferences.</p>
                    </div>

                    <div className="space-y-2">
                        <SectionTitle title="Your Rights and Choices" />
                        <p>You have the right to access, update, or delete your personal information, as well as to object to or restrict its processing, subject to applicable laws and regulations. You can manage your account settings and preferences or contact us directly for assistance with your privacy-related requests.</p>
                    </div>

                    <div className="space-y-2">
                        <SectionTitle title="Changes to This Policy" />
                        <p>We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We encourage you to review this page periodically for any updates or amendments. Your continued use of our website after any changes indicates your acceptance of the revised Privacy Policy.</p>
                    </div>

                    <div className="space-y-2">
                        <SectionTitle title="Contact Us" />
                        <p>If you have any questions, concerns, or feedback regarding this Privacy Policy or our privacy practices, please contact us at <Link className="text-blue-500" to="/contact">click now</Link>.</p>
                    </div>

                    <div className="space-y-2">
                        <p>Thank you for trusting Havit Shop with your personal information. We're committed to protecting your privacy and providing you with a safe and enjoyable shopping experience.</p>

                        <p className="text-primary font-medium">The Havit Shop Team</p>
                    </div>


                </div>

            </div>
        </>
    );
};

export default PrivacyPolicy;