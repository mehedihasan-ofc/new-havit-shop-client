import useBillingDetails from "../../../hooks/useBillingDetails";

const ProfileAddress = () => {
    const [billingDetails, isLoading] = useBillingDetails();

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-48">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
            </div>
        );
    }

    if (!billingDetails) {
        return (
            <div className="text-center text-gray-600 font-semibold mt-8">
                No billing details found.
            </div>
        );
    }

    return (
        <div className="bg-gradient-to-br from-gray-100 via-white to-gray-200 p-8 min-h-screen">
            <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-lg p-6">
                <h1 className="text-2xl font-extrabold text-gray-800 text-center mb-6">
                    Billing Details
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gray-50 p-4 rounded-lg shadow-md">
                        <h2 className="text-lg font-bold text-gray-700">Personal Info</h2>
                        <p className="mt-2 text-gray-600"><strong>Name:</strong> {billingDetails.name}</p>
                        <p className="mt-2 text-gray-600"><strong>Phone Number:</strong> {billingDetails.phoneNumber}</p>
                        {billingDetails.altPhoneNumber && (
                            <p className="mt-2 text-gray-600"><strong>Alt Phone:</strong> {billingDetails.altPhoneNumber}</p>
                        )}
                        <p className="mt-2 text-gray-600"><strong>Email:</strong> {billingDetails.userEmail}</p>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg shadow-md">
                        <h2 className="text-lg font-bold text-gray-700">Address Info</h2>
                        <p className="mt-2 text-gray-600"><strong>Address:</strong> {billingDetails.address}</p>
                        <p className="mt-2 text-gray-600"><strong>Area:</strong> {billingDetails.area}</p>
                        <p className="mt-2 text-gray-600"><strong>City:</strong> {billingDetails.city}</p>
                        {billingDetails.additionalInfo && (
                            <p className="mt-2 text-gray-600"><strong>Additional Info:</strong> {billingDetails.additionalInfo}</p>
                        )}
                    </div>
                </div>

                <div className="mt-6 text-center">
                    <button className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-200">
                        Edit Address
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProfileAddress;