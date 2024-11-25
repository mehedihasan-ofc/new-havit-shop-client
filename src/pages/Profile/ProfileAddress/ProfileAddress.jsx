import { Button } from "@material-tailwind/react";
import useBillingDetails from "../../../hooks/useBillingDetails";
import { useNavigate } from "react-router-dom";
import MySpinner from "../../../components/Shared/MySpinner/MySpinner";

const ProfileAddress = () => {
    const [billingDetails, isLoading] = useBillingDetails();
    const navigate = useNavigate();

    if (isLoading) return <MySpinner />

    if (!billingDetails) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] bg-gradient-to-br from-gray-100 via-white to-gray-200 p-6">
                <div className="text-center mb-4">
                    <h2 className="text-xl font-semibold text-gray-800">
                        No Billing Details Found
                    </h2>
                    <p className="text-gray-600 mt-2">
                        You haven't added your billing address yet. Click the button below to add your address now!
                    </p>
                </div>
                <Button
                    className="rounded-none py-3 px-6 bg-primary"
                    onClick={() => navigate("/profile/my-address")}
                >
                    Add Address
                </Button>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <h1 className="text-2xl font-semibold text-gray-800 text-center mb-4">
                Billing Details
            </h1>

            <table className="table-auto border-collapse border border-gray-300 w-full">
                <thead>
                    <tr>
                        <th className="border border-gray-300 px-4 py-2 bg-gray-100 text-left">Personal Info</th>
                        <th className="border border-gray-300 px-4 py-2 bg-gray-100 text-left">Address Info</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="border border-gray-300 px-4 py-2 space-y-1">
                            <p><strong>Name:</strong> {billingDetails.name}</p>
                            <p><strong>Phone Number:</strong> {billingDetails.phoneNumber}</p>
                            {billingDetails.altPhoneNumber && (
                                <p><strong>Alt Phone:</strong> {billingDetails.altPhoneNumber}</p>
                            )}
                            <p><strong>Email:</strong> {billingDetails.userEmail}</p>
                        </td>
                        <td className="border border-gray-300 px-4 py-2 space-y-1">
                            <p><strong>Address:</strong> {billingDetails.address}</p>
                            <p><strong>Area:</strong> {billingDetails.area}</p>
                            <p><strong>City:</strong> {billingDetails.city}</p>
                            {billingDetails.additionalInfo && (
                                <p><strong>Additional Info:</strong> {billingDetails.additionalInfo}</p>
                            )}
                        </td>
                    </tr>
                </tbody>
            </table>

            {/* <div className="mt-6 text-center">
                <Button variant="outlined" className="rounded-none py-3 px-6">
                    Edit Address
                </Button>
            </div> */}
        </div>
    );
};

export default ProfileAddress;