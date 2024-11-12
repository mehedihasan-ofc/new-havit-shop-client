import { Button } from "@material-tailwind/react";
import { useState } from "react";

const BillingDetails = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [billingDetails, setBillingDetails] = useState({
        name: "",
        phoneNumber: "",
        altPhoneNumber: "",
        city: "",
        area: "",
        address: "",
        additionalInfo: ""
    });

    const handleBillingChange = (e) => {
        setBillingDetails({
            ...billingDetails,
            [e.target.name]: e.target.value
        });
    };

    const handleSaveBilling = (e) => {
        e.preventDefault();

        setIsLoading(true);

        console.log("Billing Details:", billingDetails);
    };

    return (
        <form onSubmit={handleSaveBilling} className="border p-6 rounded-lg shadow-md space-y-4">
            <h2 className="text-xl font-semibold">Billing Details</h2>
            <div className="grid grid-cols-2 gap-4">
                <input
                    type="text"
                    name="name"
                    placeholder="Name *"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary col-span-2"
                    value={billingDetails.name}
                    onChange={handleBillingChange}
                    required
                />
                <input
                    type="text"
                    name="phoneNumber"
                    placeholder="Phone Number *"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                    value={billingDetails.phoneNumber}
                    onChange={handleBillingChange}
                    required
                />
                <input
                    type="text"
                    name="altPhoneNumber"
                    placeholder="Alternative Phone Number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                    value={billingDetails.altPhoneNumber}
                    onChange={handleBillingChange}
                />
                <select
                    name="city"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                    value={billingDetails.city}
                    onChange={handleBillingChange}
                    required
                >
                    <option value="">Select City</option>
                    <option value="City1">City1</option>
                    <option value="City2">City2</option>
                </select>
                <select
                    name="area"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                    value={billingDetails.area}
                    onChange={handleBillingChange}
                    required
                >
                    <option value="">Select Area</option>
                    <option value="Area1">Area1</option>
                    <option value="Area2">Area2</option>
                </select>
                <input
                    type="text"
                    name="address"
                    placeholder="Address *"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary col-span-2"
                    value={billingDetails.address}
                    onChange={handleBillingChange}
                    required
                />
            </div>
            <textarea
                name="additionalInfo"
                placeholder="Additional Information"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary mt-4 h-24"
                value={billingDetails.additionalInfo}
                onChange={handleBillingChange}
            />
            {/* Save Button */}

            <Button loading={isLoading} type="submit" className='rounded-none bg-primary font-medium px-10'>
                {isLoading ? "Saving Billing Address" : "Save Billing Address"}
            </Button>
        </form>
    );
};

export default BillingDetails;