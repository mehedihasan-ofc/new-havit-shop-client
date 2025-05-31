import { Button } from "@material-tailwind/react";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../provider/AuthProvider";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import useBillingDetails from "../../../hooks/useBillingDetails";
import MySpinner from "../../../components/Shared/MySpinner/MySpinner";

const BillingDetails = () => {

    const [billingDetails, isLoading] = useBillingDetails();

    const { user } = useContext(AuthContext);
    const [axiosSecure] = useAxiosSecure();
    
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/profile/billing-details';

    const [loading, setLoading] = useState(false);
    const [cities, setCities] = useState([]);
    const [areas, setAreas] = useState([]);
    const [selectedCityId, setSelectedCityId] = useState(null);
    const [formData, setFormData] = useState({
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
        const fetchCities = async () => {
            try {
                const response = await axios.get("https://bdapi.vercel.app/api/v.1/district");
                setCities(response.data.data);
            } catch (error) {
                console.error("Error fetching cities:", error);
            }
        };
        fetchCities();
    }, []);

    useEffect(() => {
        const fetchAreas = async () => {
            if (selectedCityId) {
                try {
                    const response = await axios.get(`https://bdapi.vercel.app/api/v.1/upazilla/${selectedCityId}`);
                    setAreas(response.data.data);
                } catch (error) {
                    console.error("Error fetching areas:", error);
                }
            }
        };
        fetchAreas();
    }, [selectedCityId]);

    const handleBillingChange = (e) => {
        const { name, value } = e.target;

        if (name === "city") {
            const selectedCity = cities.find(city => city.name === value);
            setFormData({
                ...formData,
                city: value,
                cityId: selectedCity?.id || "",
                area: ""
            });
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    const handleSaveBilling = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {

            if (billingDetails?._id) {

                const response = await axiosSecure.put(`/billing-details/${billingDetails?._id}`, formData);
                if (response.status === 200) {
                    toast.success(response?.data?.message, {
                        position: "top-right",
                        autoClose: 1000,
                    });
                    navigate(from, { replace: true });
                }

            } else {
                const response = await axiosSecure.post("/billing-details", formData);
                if (response.status === 200) {
                    toast.success(response?.data?.message, {
                        position: "top-right",
                        autoClose: 1000,
                    });
                    navigate(from, { replace: true });
                }
            }

        } catch (error) {
            console.error("Error saving billing details:", error);
        } finally {
            setLoading(false);
        }
    };

    if (isLoading) return <MySpinner />

    return (
        <form onSubmit={handleSaveBilling} className="border p-6 rounded-lg shadow-md space-y-4">
            <h2 className="text-xl font-semibold">Billing Details</h2>
            <div className="grid grid-cols-2 gap-4">
                <input
                    type="text"
                    name="name"
                    placeholder="Name *"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary col-span-2"
                    value={formData.name}
                    onChange={handleBillingChange}
                    required
                />
                <input
                    type="number"
                    name="phoneNumber"
                    placeholder="Phone Number *"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                    value={formData.phoneNumber}
                    onChange={handleBillingChange}
                    required
                />
                <input
                    type="number"
                    name="altPhoneNumber"
                    placeholder="Alternative Phone Number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                    value={formData.altPhoneNumber}
                    onChange={handleBillingChange}
                />
                <select
                    name="city"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                    value={formData.city}
                    onChange={(e) => {
                        const selectedCity = cities.find(city => city.name === e.target.value);
                        setFormData({ ...formData, city: e.target.value });
                        setSelectedCityId(selectedCity?.id || null);
                    }}
                    required
                >
                    <option value="">Select City</option>
                    {cities.map((city) => (
                        <option key={city.id} value={city.name}>
                            {city.name}
                        </option>
                    ))}
                </select>
                <select
                    name="area"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                    value={formData.area}
                    onChange={handleBillingChange}
                    required
                >
                    <option value="">Select Area</option>
                    {areas.map((area) => (
                        <option key={area.id} value={area.name}>
                            {area.name}
                        </option>
                    ))}
                </select>
                <input
                    type="text"
                    name="address"
                    placeholder="Address *"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm col-span-2 focus:outline-none focus:ring-primary focus:border-primary"
                    value={formData.address}
                    onChange={handleBillingChange}
                    required
                />
            </div>
            <textarea
                name="additionalInfo"
                placeholder="Additional Information"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm mt-4 h-24 focus:outline-none focus:ring-primary focus:border-primary"
                value={formData.additionalInfo}
                onChange={handleBillingChange}
            />
            <div className="text-center">
                <Button disabled={loading} type="submit" className="rounded-none bg-primary font-medium px-10">
                    {loading ? "Saving Billing Address" : "Save Billing Address"}
                </Button>
            </div>
        </form>
    );
};

export default BillingDetails;