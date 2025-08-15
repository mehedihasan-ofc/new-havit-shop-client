import SectionTitle from "../../../components/Shared/SectionTitle/SectionTitle";
import ReturnImg from "../../../assets/static/return.png";
import { Link } from "react-router-dom";

const ReturnPolicy = () => {
    return (
        <div className="my-container my-10">
            {/* Header Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-10">
                <div className="space-y-4">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold font-serif">Return Policy</h2>
                    <p className="text-sm sm:text-base font-medium">
                        At Havit Shop, we want you to be completely satisfied with your purchases. If for any reason you are not satisfied with an item, you may be eligible for a return or exchange, subject to the terms and conditions outlined in this Return Policy.
                    </p>
                </div>
                <div>
                    <img src={ReturnImg} alt="Return Policy Illustration" className="w-full max-w-md mx-auto" />
                </div>
            </div>

            <hr className="my-8" />

            {/* Policy Details Section */}
            <div className="space-y-8 mt-10">
                {/* Eligibility */}
                <div className="space-y-2">
                    <SectionTitle title="Eligibility" />
                    <p>To be eligible for a return or exchange, the item must meet the following criteria:</p>
                    <ul className="list-decimal space-y-2 pl-5">
                        <li>The item must be in its original condition, unused, and in its original packaging.</li>
                        <li>The return request must be initiated within [insert number] days of the delivery date.</li>
                        <li>The item must be accompanied by proof of purchase, such as a receipt or order confirmation.</li>
                    </ul>
                    <p>
                        Please note that certain items may not be eligible for return or exchange due to hygiene reasons, health regulations, or other restrictions. These items will be clearly marked as non-returnable on the product page.
                    </p>
                </div>

                {/* Return Process */}
                <div className="space-y-2">
                    <SectionTitle title="Return Process" />
                    <p>To initiate a return or exchange, please follow these steps:</p>
                    <ul className="list-decimal space-y-2 pl-5">
                        <li>
                            Contact our customer service team at [insert contact email or form link] to request a return authorization (RA) number. Please provide your order number, the reason for the return, and any relevant details about the item.
                        </li>
                        <li>
                            Once your return request is approved, you will receive an RA number and instructions on how to return the item.
                        </li>
                        <li>Package the item securely in its original packaging, including all accessories and documentation.</li>
                        <li>Clearly mark the RA number on the outside of the package.</li>
                        <li>
                            Ship the item back to us using a trackable shipping method. You are responsible for the cost of return shipping unless the return is due to our error or a defective item.
                        </li>
                    </ul>
                </div>

                {/* Refunds and Exchanges */}
                <div className="space-y-2">
                    <SectionTitle title="Refunds and Exchanges" />
                    <p>Upon receiving and inspecting the returned item, we will process your refund or exchange according to the following guidelines:</p>
                    <ul className="list-disc space-y-2 pl-5">
                        <li>
                            <strong>Refunds:</strong> If eligible, refunds will be issued to the original payment method used for the purchase. Please allow [insert number] business days for the refund to appear in your account.
                        </li>
                        <li>
                            <strong>Exchanges:</strong> If you requested an exchange, we will ship the replacement item to you once the returned item is received and inspected. Additional shipping fees may apply.
                        </li>
                    </ul>
                    <p>
                        Please note that we reserve the right to refuse a return or exchange if the item does not meet the eligibility criteria or if the return request is not initiated within the specified timeframe.
                    </p>
                </div>

                {/* Damaged or Defective Items */}
                <div className="space-y-2">
                    <SectionTitle title="Damaged or Defective Items" />
                    <p>
                        If you receive a damaged or defective item, please contact us immediately to report the issue. We will work with you to resolve the problem and provide a replacement or refund as needed.
                    </p>
                </div>

                {/* Contact Section */}
                <div className="space-y-2">
                    <SectionTitle title="Contact Us" />
                    <p>
                        If you have any questions, concerns, or feedback regarding our Return Policy, please contact us at{" "}
                        <Link className="text-blue-500" to="/contact">
                            click now
                        </Link>
                        .
                    </p>
                </div>

                {/* Closing Note */}
                <div className="space-y-1">
                    <p>Thank you for shopping at Havit Shop. We appreciate your business!</p>
                    <p className="text-primary font-medium">The Havit Shop Team</p>
                </div>
            </div>
        </div>
    );
};

export default ReturnPolicy;
