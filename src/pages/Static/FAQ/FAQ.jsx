import { Link, useNavigate } from "react-router-dom";
import SectionTitle from "../../../components/Shared/SectionTitle/SectionTitle";
import { useState } from "react";
import { RiArrowDropDownLine, RiArrowDropUpLine } from 'react-icons/ri';
import ContactImg from "../../../assets/static/contact.png";

const faqs = [
    {
        _id: 1,
        question: 'How do I place an order?',
        answer: 'To place an order, simply browse our website, add the desired items to your shopping cart, and proceed to checkout. Follow the prompts to provide your shipping and payment details, review your order summary, and confirm the purchase.'
    },
    {
        _id: 2,
        question: 'What payment methods do you accept?',
        answer: 'We accept various payment methods, including credit/debit cards, mobile banking, and cash on delivery (COD), depending on your location and preferences. You can view the available payment options during checkout.'
    },
    {
        _id: 3,
        question: 'Can I track my order?',
        answer: 'Yes, you can track the status of your order by logging into your Havit Shop account and accessing the "Order History" section. Once your order has been shipped, you will receive a tracking number via email or SMS to monitor its delivery status.'
    },
    {
        _id: 4,
        question: 'How can I contact customer support?',
        answer: 'For assistance, questions, or feedback, our customer support team is here to help. You can contact us via email, phone, or through our website\'s contact form. Our representatives are available during business hours to assist you promptly.'
    }
];

const FAQ = () => {

    const [openIndex, setOpenIndex] = useState(null);
    const [contentHeight, setContentHeight] = useState(0);
    const navigate = useNavigate();

    const toggleAccordion = (index) => {
        if (openIndex === index) {
            setOpenIndex(null);
            setContentHeight(0);
        } else {
            setOpenIndex(index);
            setContentHeight(document.getElementById(`faq-${index}`).scrollHeight);
        }
    };

    return (
        <div className="my-container my-10 space-y-10">

            <div className="shadow border p-5 md:p-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10">

                    {/* Left Column */}
                    <div className="space-y-5">
                        <SectionTitle title="Hi, how can we help you?" />

                        <div className="space-y-3">
                            <Link to="/terms-conditions">
                                <div className="space-y-2 border hover:border-primary cursor-pointer shadow transition duration-300 ease-in-out p-5">
                                    <h4 className="text-primary text-lg md:text-xl font-medium">I Want to Know More About Terms & Conditions</h4>
                                    <p className="text-sm md:text-base">Understand the rules, guidelines, and terms for using our services.</p>
                                </div>
                            </Link>

                            <Link to="/privacy-policy">
                                <div className="space-y-2 border hover:border-primary cursor-pointer shadow transition duration-300 ease-in-out p-5">
                                    <h4 className="text-primary text-lg md:text-xl font-medium">I'm Eager to Explore the Privacy Policy</h4>
                                    <p className="text-sm md:text-base">Discover how we protect your personal information.</p>
                                </div>
                            </Link>

                            <Link to="/return-policy">
                                <div className="space-y-2 border hover:border-primary cursor-pointer shadow transition duration-300 ease-in-out p-5">
                                    <h4 className="text-primary text-lg md:text-xl font-medium">I'm Curious About the Return Policy</h4>
                                    <p className="text-sm md:text-base">Learn about our hassle-free process for returns, exchanges, and refunds.</p>
                                </div>
                            </Link>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-5">
                        <SectionTitle title="Frequently Asked Questions" />

                        <div className="space-y-3">
                            {faqs.map((faq, index) => (
                                <div key={index} className="border shadow">
                                    <button
                                        className="flex items-center justify-between w-full p-5 text-base md:text-lg font-medium text-gray-800 focus:outline-none focus:text-primary"
                                        onClick={() => toggleAccordion(index)}
                                    >
                                        <span>{faq.question}</span>
                                        {openIndex === index ? (
                                            <RiArrowDropUpLine className="text-xl" />
                                        ) : (
                                            <RiArrowDropDownLine className="text-xl" />
                                        )}
                                    </button>

                                    <div
                                        id={`faq-${index}`}
                                        className="overflow-hidden transition-height duration-300"
                                        style={{ height: openIndex === index ? contentHeight + 'px' : '0px' }}
                                    >
                                        <div className="px-5 pb-5">
                                            <p className="text-gray-600">{faq.answer}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>

            {/* Contact Us Section */}
            <div className="shadow border p-5 md:p-10">
                <SectionTitle title="Contact us" />

                <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-5 md:gap-10">
                    <div className="space-y-5">
                        <h5 className="text-lg md:text-xl font-medium">Can't find the answer you are looking for?</h5>
                        <p className="text-sm md:text-base">
                            You can send a message or give us a call. <br /> Our 24/7 support team is here to assist you.
                        </p>
                        <button onClick={() => navigate("/contact")} className="bg-primary px-10 py-2 text-white hover:bg-[#37a09d] transition duration-300 ease-in-out">
                            Contact Us
                        </button>
                    </div>
                    <div>
                        <img src={ContactImg} alt="Contact" className="w-full h-auto" />
                    </div>
                </div>
            </div>

        </div>
    );
};

export default FAQ;