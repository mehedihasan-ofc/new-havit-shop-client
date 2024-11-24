import { Button } from "@material-tailwind/react";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../provider/AuthProvider";
import { toast } from "react-toastify";

const BillingDetails = () => {
    const { user } = useContext(AuthContext);
    const [axiosSecure] = useAxiosSecure();

    const [isLoading, setIsLoading] = useState(false);
    const [cities, setCities] = useState([]);
    const [areas, setAreas] = useState([]);
    const [billingDetails, setBillingDetails] = useState({
        name: "",
        phoneNumber: "",
        altPhoneNumber: "",
        city: "",
        area: "",
        address: "",
        additionalInfo: "",
        userEmail: user?.email,
        createdAt: new Date().toISOString(),
    });

    useEffect(() => {
        // Fetch cities data on component mount
        const fetchCities = async () => {
            try {
                const response = await axios.get("https://bdapis.com/api/v1.2/districts");
                setCities(response.data.data);
            } catch (error) {
                console.error("Error fetching cities:", error);
            }
        };
        fetchCities();
    }, []);

    useEffect(() => {
        // Fetch areas based on the selected city
        const fetchAreas = async () => {
            if (billingDetails.city) {
                try {
                    const response = await axios.get(`https://bdapis.com/api/v1.2/district/${billingDetails.city}`);
                    setAreas(response.data.data[0].upazillas);
                } catch (error) {
                    console.error("Error fetching areas:", error);
                }
            }
        };
        fetchAreas();
    }, [billingDetails.city]);

    const handleBillingChange = (e) => {
        setBillingDetails({
            ...billingDetails,
            [e.target.name]: e.target.value
        });
    };

    const handleSaveBilling = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await axiosSecure.post("/billing-details", billingDetails);

            if (response.status === 200) {
                toast.success(response?.data?.message, {
                    position: "top-right",
                    autoClose: 1000,
                });
            }
        } catch (error) {
            console.error("Error saving billing details:", error);
        } finally {
            setIsLoading(false);
        }
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
                    {cities.map((city) => (
                        <option key={city.district} value={city.district}>
                            {city.district}
                        </option>
                    ))}
                </select>
                <select
                    name="area"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                    value={billingDetails.area}
                    onChange={handleBillingChange}
                    required
                >
                    <option value="">Select Area</option>
                    {areas.map((area) => (
                        <option key={area} value={area}>
                            {area}
                        </option>
                    ))}
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
            <Button loading={isLoading} type="submit" className="rounded-none bg-primary font-medium px-10">
                {isLoading ? "Saving Billing Address" : "Save Billing Address"}
            </Button>
        </form>
    );
};

export default BillingDetails;