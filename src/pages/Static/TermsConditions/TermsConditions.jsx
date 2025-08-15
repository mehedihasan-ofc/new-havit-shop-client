import SectionTitle from "../../../components/Shared/SectionTitle/SectionTitle";
import TermsImg from "../../../assets/static/terms.png";
import { Link } from "react-router-dom";

const TermsConditions = () => {
    return (
        <>
            <div className="my-container my-10">
                <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-6 md:gap-10">
                    <div className="space-y-4">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold font-serif">Terms & Conditions</h2>
                        <p className="text-sm sm:text-base font-medium">
                            Welcome to Havit Shop! These Terms & Conditions govern your use of our website and services, so please read them carefully before proceeding. By accessing or using Havit Shop, you agree to abide by these terms and conditions.
                        </p>
                    </div>
                    <div>
                        <img className="w-full h-auto" src={TermsImg} alt="Terms and Conditions" />
                    </div>
                </div>

                <hr className="my-8" />

                <div className="space-y-8 mt-10">
                    <div className="space-y-2">
                        <SectionTitle title="1. Acceptance of Terms" />
                        <p className="text-sm sm:text-base">
                            By accessing or using Havit Shop, you acknowledge that you have read, understood, and agree to be bound by these Terms & Conditions, as well as our Privacy Policy. If you do not agree with any part of these terms, please refrain from using our website or services.
                        </p>
                    </div>

                    <div className="space-y-2">
                        <SectionTitle title="2. Use of Services" />
                        <p className="text-sm sm:text-base">
                            You must be at least 18 years old or the legal age of majority in your jurisdiction to use Havit Shop. By using our website, you represent and warrant that you meet these age requirements and have the legal capacity to enter into this agreement.
                        </p>
                        <p className="text-sm sm:text-base">
                            You agree to use Havit Shop only for lawful purposes and in compliance with all applicable laws, regulations, and guidelines. You may not use our website for any illegal or unauthorized purpose, including but not limited to fraud, infringement of intellectual property rights, or distribution of harmful content.
                        </p>
                    </div>

                    <div className="space-y-2">
                        <SectionTitle title="3. Account Registration" />
                        <p className="text-sm sm:text-base">
                            Some features of Havit Shop may require you to create an account. You are responsible for maintaining the confidentiality of your account credentials and for any activities that occur under your account. You agree to notify us immediately of any unauthorized access or use of your account.
                        </p>
                    </div>

                    <div className="space-y-2">
                        <SectionTitle title="4. Product Listings and Pricing" />
                        <p className="text-sm sm:text-base">
                            We make every effort to ensure the accuracy of product information, including descriptions, images, and prices. However, we cannot guarantee that all information is completely accurate, up-to-date, or error-free. We reserve the right to correct any errors, inaccuracies, or omissions and to update product information at any time without prior notice.
                        </p>
                    </div>

                    <div className="space-y-2">
                        <SectionTitle title="5. Orders and Payments" />
                        <p className="text-sm sm:text-base">
                            By placing an order through Havit Shop, you agree to provide accurate and complete information for the order, including billing and shipping details. You authorize us to charge the designated payment method for the total amount of the order, including taxes, shipping fees, and any applicable charges.
                        </p>
                    </div>

                    <div className="space-y-2">
                        <SectionTitle title="6. Shipping and Delivery" />
                        <p className="text-sm sm:text-base">
                            We will make every effort to fulfill and deliver your orders in a timely manner, but we cannot guarantee delivery dates or times. Shipping and delivery times may vary depending on factors beyond our control, such as shipping carriers, customs processes, and unforeseen circumstances.
                        </p>
                    </div>

                    <div className="space-y-2">
                        <SectionTitle title="7. Returns and Refunds" />
                        <p className="text-sm sm:text-base">
                            We want you to be satisfied with your purchases from Havit Shop. If you are not completely satisfied with an item, you may be eligible for a return or exchange in accordance with our Return Policy. Please review our Return Policy for more information on eligibility, procedures, and timelines.
                        </p>
                    </div>

                    <div className="space-y-2">
                        <SectionTitle title="8. Intellectual Property" />
                        <p className="text-sm sm:text-base">
                            All content and materials available on Havit Shop, including but not limited to text, images, logos, trademarks, and software, are the property of Havit Shop or its licensors and are protected by copyright, trademark, and other intellectual property laws. You may not use, reproduce, distribute, or modify any content without prior written permission from Havit Shop.
                        </p>
                    </div>

                    <div className="space-y-2">
                        <SectionTitle title="9. Limitation of Liability" />
                        <p className="text-sm sm:text-base">
                            In no event shall Havit Shop or its affiliates, officers, directors, employees, agents, or suppliers be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or in connection with your use of our website or services, even if advised of the possibility of such damages.
                        </p>
                    </div>

                    <div className="space-y-2">
                        <SectionTitle title="10. Governing Law and Jurisdiction" />
                        <p className="text-sm sm:text-base">
                            These Terms & Conditions shall be governed by and construed in accordance with the laws of Bangladesh. Any dispute arising out of or relating to these terms shall be subject to the exclusive jurisdiction of the courts of Bangladesh.
                        </p>
                    </div>

                    <div className="space-y-2">
                        <SectionTitle title="11. Changes to Terms" />
                        <p className="text-sm sm:text-base">
                            We reserve the right to update, modify, or replace these Terms & Conditions at any time without prior notice. Any changes will be effective immediately upon posting on this page. Your continued use of Havit Shop after any such changes constitutes acceptance of the modified terms.
                        </p>
                    </div>

                    <div className="space-y-2">
                        <SectionTitle title="Contact Us" />
                        <p className="text-sm sm:text-base">
                            If you have any questions, concerns, or feedback regarding these Terms & Conditions, please contact us at{" "}
                            <Link className="text-blue-500" to="/contact">
                                click now
                            </Link>
                            .
                        </p>
                    </div>

                    <div className="space-y-1">
                        <p className="text-sm sm:text-base">Thank you for choosing Havit Shop. We hope you enjoy your shopping experience!</p>
                        <p className="text-primary font-medium text-sm sm:text-base">The Havit Shop Team</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TermsConditions;
