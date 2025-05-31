import { Button } from "@material-tailwind/react";
import { HiOutlineUser, HiOutlinePhone, HiOutlineMail, HiOutlineMap } from "react-icons/hi";
import { MdLocationPin, MdInfoOutline } from "react-icons/md";
import useBillingDetails from "../../../hooks/useBillingDetails";
import { useNavigate } from "react-router-dom";
import MySpinner from "../../../components/Shared/MySpinner/MySpinner";

const ProfileAddress = () => {
    const [billingDetails, isLoading] = useBillingDetails();
    const navigate = useNavigate();

    if (isLoading) return <MySpinner />;

    if (!billingDetails) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] bg-gray-50 px-4 py-8 text-center">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">No Billing Details Found</h2>
                <p className="text-gray-600 mb-4 text-sm sm:text-base">
                    You haven't added your billing address yet. Click below to add it now.
                </p>
                <Button
                    className="bg-primary rounded-md px-6 py-3 text-white"
                    onClick={() => navigate("/profile/my-address")}
                >
                    Add Address
                </Button>
            </div>
        );
    }

    return (
        <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-10">
            <h1 className="text-xl md:text-2xl font-bold text-center text-gray-800 mb-8 font-serif">Your Billing Details</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Personal Info Card */}
                <div className="bg-white rounded-2xl shadow-md p-6 sm:p-8 hover:shadow-lg transition-shadow">
                    <h2 className="text-xl font-semibold text-primary mb-4 border-b pb-2">Personal Information</h2>
                    <div className="space-y-4 text-gray-700">
                        <p className="flex items-center gap-2">
                            <HiOutlineUser className="w-5 h-5 text-primary" />
                            <span><strong>Name:</strong> {billingDetails.name}</span>
                        </p>
                        <p className="flex items-center gap-2">
                            <HiOutlinePhone className="w-5 h-5 text-primary" />
                            <span><strong>Phone:</strong> {billingDetails.phoneNumber}</span>
                        </p>
                        {billingDetails.altPhoneNumber && (
                            <p className="flex items-center gap-2">
                                <HiOutlinePhone className="w-5 h-5 text-primary" />
                                <span><strong>Alt Phone:</strong> {billingDetails.altPhoneNumber}</span>
                            </p>
                        )}
                        <p className="flex items-center gap-2">
                            <HiOutlineMail className="w-5 h-5 text-primary" />
                            <span><strong>Email:</strong> {billingDetails.userEmail}</span>
                        </p>
                    </div>
                </div>

                {/* Address Info Card */}
                <div className="bg-white rounded-2xl shadow-md p-6 sm:p-8 hover:shadow-lg transition-shadow">
                    <h2 className="text-xl font-semibold text-primary mb-4 border-b pb-2">Address Information</h2>
                    <div className="space-y-4 text-gray-700">
                        <p className="flex items-center gap-2">
                            <HiOutlineMap className="w-5 h-5 text-primary" />
                            <span><strong>Address:</strong> {billingDetails.address}</span>
                        </p>
                        <p className="flex items-center gap-2">
                            <MdLocationPin className="w-5 h-5 text-primary" />
                            <span><strong>Area:</strong> {billingDetails.area}</span>
                        </p>
                        <p className="flex items-center gap-2">
                            <MdLocationPin className="w-5 h-5 text-primary" />
                            <span><strong>City:</strong> {billingDetails.city}</span>
                        </p>
                        {billingDetails.additionalInfo && (
                            <p className="flex items-center gap-2">
                                <MdInfoOutline className="w-5 h-5 text-primary" />
                                <span><strong>Additional Info:</strong> {billingDetails.additionalInfo}</span>
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* Edit Button */}
            <div className="text-center mt-8">
                <Button
                    variant="outlined"
                    className="rounded-md border-primary text-primary hover:bg-primary hover:text-white transition px-6 py-3"
                    onClick={() => navigate("/profile/my-address")}
                >
                    Edit Address
                </Button>
            </div>
        </div>
    );
};

export default ProfileAddress;
