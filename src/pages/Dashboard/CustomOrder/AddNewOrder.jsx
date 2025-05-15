import { useState, useEffect } from "react";
import MySpinner from "../../../components/Shared/MySpinner/MySpinner";
import useProducts from "../../../hooks/useProducts";
import { Button } from "@material-tailwind/react";
import axios from "axios";

const AddNewOrder = () => {
    const [products, loading] = useProducts();

    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        city: "",
        area: "",
        address: "",
        additionalInfo: "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const [cities, setCities] = useState([]);
    const [areas, setAreas] = useState([]);
    const [selectedCityId, setSelectedCityId] = useState(null);

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedProductId, setSelectedProductId] = useState("");
    const [selectedFlavor, setSelectedFlavor] = useState("");
    const [quantity, setQuantity] = useState(1);

    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const selectedProduct = products.find((product) => product._id === selectedProductId);

    useEffect(() => {
        const fetchCities = async () => {
            try {
                const res = await axios.get("https://bdapi.vercel.app/api/v.1/district");
                setCities(res.data.data);
            } catch (err) {
                console.error("Error fetching cities:", err);
            }
        };
        fetchCities();
    }, []);

    useEffect(() => {
        const fetchAreas = async () => {
            if (selectedCityId) {
                try {
                    const res = await axios.get(`https://bdapi.vercel.app/api/v.1/upazilla/${selectedCityId}`);
                    setAreas(res.data.data);
                } catch (err) {
                    console.error("Error fetching areas:", err);
                }
            } else {
                setAreas([]);
            }
        };
        fetchAreas();
    }, [selectedCityId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleCityChange = (e) => {
        const selectedCityName = e.target.value;
        const selectedCity = cities.find((city) => city.name === selectedCityName);
        setFormData((prev) => ({
            ...prev,
            city: selectedCityName,
            area: "",
        }));
        setSelectedCityId(selectedCity?.id || null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const payload = {
                ...formData,
                productId: selectedProductId,
                flavor: selectedFlavor,
                quantity,
            };
            console.log("Submitting order:", payload);
            // Send to backend API if needed
        } catch (error) {
            console.error("Submission error:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) return <MySpinner />;

    return (
        <div className="border shadow rounded">
            <form onSubmit={handleSubmit} className="space-y-4 p-8">
                <h2 className="text-xl font-semibold text-center mb-4">Add Custom Order</h2>

                <div>
                    <label className="block mb-1 font-medium">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter full name"
                        className="w-full px-3 py-2 border rounded-md"
                        required
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium">Phone Number</label>
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Enter phone number"
                        className="w-full px-3 py-2 border rounded-md"
                        required
                    />
                </div>

                <div className="grid grid-cols-2 gap-5">
                    <div>
                        <label className="block mb-1 font-medium">City</label>
                        <select
                            name="city"
                            value={formData.city}
                            onChange={handleCityChange}
                            className="w-full px-3 py-2 border rounded-md"
                            required
                        >
                            <option value="">Select City</option>
                            {cities.map((city) => (
                                <option key={city.id} value={city.name}>{city.name}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">Area</label>
                        <select
                            name="area"
                            value={formData.area}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-md"
                            required
                            disabled={!formData.city}
                        >
                            <option value="">Select Area</option>
                            {areas.map((area) => (
                                <option key={area.id} value={area.name}>{area.name}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block mb-1 font-medium">Address</label>
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Enter full street address"
                        className="w-full px-3 py-2 border rounded-md"
                        required
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium">Additional Information</label>
                    <textarea
                        name="additionalInfo"
                        value={formData.additionalInfo}
                        onChange={handleChange}
                        placeholder="Any other instructions or notes"
                        className="w-full px-3 py-2 border rounded-md"
                        rows="3"
                    ></textarea>
                </div>

                <div>
                    <label className="block mb-1 font-medium">Search Products</label>
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-3 py-2 border rounded-md mb-4"
                    />
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-64 overflow-y-auto">
                        {filteredProducts.map((product) => (
                            <div
                                key={product._id}
                                onClick={() => {
                                    setSelectedProductId(product._id);
                                    setSelectedFlavor("");
                                    setQuantity(1);
                                }}
                                className={`border rounded-md p-3 cursor-pointer hover:border-blue-500 ${
                                    selectedProductId === product._id ? "border-blue-500 shadow" : ""
                                }`}
                            >
                                <img src={product.images[0]?.url} alt={product.name} className="w-full h-28 object-contain mb-2" />
                                <h4 className="text-sm font-semibold">{product.name}</h4>
                                <p className="text-xs text-gray-600">৳{product.price}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {selectedProduct && (
                    <div className="space-y-4">
                        {selectedProduct.flavor?.length > 0 && (
                            <div>
                                <label className="block mb-1 font-medium">Select Flavor</label>
                                <select
                                    value={selectedFlavor}
                                    onChange={(e) => setSelectedFlavor(e.target.value)}
                                    className="w-full px-3 py-2 border rounded-md"
                                    required
                                >
                                    <option value="">Choose Flavor</option>
                                    {selectedProduct.flavor.map((flavor, idx) => (
                                        <option key={idx} value={flavor}>{flavor}</option>
                                    ))}
                                </select>
                            </div>
                        )}

                        <div>
                            <label className="block mb-1 font-medium">Quantity</label>
                            <input
                                type="number"
                                min="1"
                                value={quantity}
                                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                                className="w-full px-3 py-2 border rounded-md"
                                required
                            />
                        </div>
                    </div>
                )}

                <div className="flex items-center justify-center">
                    <Button
                        type="submit"
                        className="rounded-none bg-primary font-medium px-10"
                        loading={isSubmitting}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Submitting..." : "Submit Order"}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default AddNewOrder;
