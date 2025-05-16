import { useState, useEffect } from "react";
import MySpinner from "../../../components/Shared/MySpinner/MySpinner";
import useProducts from "../../../hooks/useProducts";
import { Button } from "@material-tailwind/react";
import axios from "axios";

const AddNewOrder = () => {
    const [products, loading] = useProducts();
    console.log(products);

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
    const [selectedProducts, setSelectedProducts] = useState([]);

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

    const handleAddProduct = (product) => {
        const exists = selectedProducts.some((p) => p._id === product._id);
        if (!exists) {
            setSelectedProducts((prev) => [
                ...prev,
                { ...product, selectedFlavor: "", quantity: 1 },
            ]);
        }
    };

    const handleProductInputChange = (productId, field, value) => {
        setSelectedProducts((prev) =>
            prev.map((p) =>
                p._id === productId ? { ...p, [field]: value } : p
            )
        );
    };

    const handleRemoveProduct = (productId) => {
        setSelectedProducts((prev) =>
            prev.filter((p) => p._id !== productId)
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const payload = {
                ...formData,
                products: selectedProducts.map(({ _id, selectedFlavor, quantity }) => ({
                    productId: _id,
                    flavor: selectedFlavor,
                    quantity: parseInt(quantity),
                })),
            };
            console.log("Submitting order:", payload);
            // You can send `payload` to your backend here
        } catch (error) {
            console.error("Submission error:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return <MySpinner />;
    }

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
                        className="w-full px-3 py-2 border rounded-md"
                        rows="3"
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium">Search Products</label>
                    <input
                        type="text"
                        placeholder="Search by name"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-3 py-2 border rounded-md mb-3"
                    />
                    <div className="h-60 overflow-y-auto border rounded p-2">
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map((product) => {
                                const hasDiscount = product.price < product.regularPrice;
                                const discountPercentage = Math.round(
                                    ((product.regularPrice - product.price) / product.regularPrice) * 100
                                );

                                return (
                                    <div
                                        key={product._id}
                                        className="flex items-center rounded-md shadow-sm border px-3 py-2 gap-3 mb-2"
                                    >
                                        <input
                                            type="checkbox"
                                            id={product._id}
                                            checked={selectedProducts.some((p) => p._id === product._id)}
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    handleAddProduct(product);
                                                } else {
                                                    handleRemoveProduct(product._id);
                                                }
                                            }}
                                        />
                                        <label htmlFor={product._id} className="flex items-center gap-3">
                                            <img
                                                src={product.images[0]?.url}
                                                alt={product.name}
                                                className="w-10 h-10 rounded"
                                            />
                                            <span className="overflow-hidden text-ellipsis">{product.name}</span>
                                            <span className="font-medium">৳{product.price}</span>
                                            {hasDiscount && (
                                                <div className="flex items-center gap-2">
                                                    <div className="bg-secondary text-primary px-2 rounded">
                                                        <span className="text-xs line-through">
                                                            ৳{product.regularPrice.toFixed(2)}
                                                        </span>
                                                    </div>
                                                    <div className="bg-[#f74b81] text-white px-2">
                                                        <span className="text-xs font-medium">{discountPercentage}% OFF</span>
                                                    </div>
                                                </div>
                                            )}
                                            <span className="font-normal text-sm">Sold: {product.soldCount}</span>
                                            <span className="font-normal text-sm">Stock: {product.availableStock}</span>
                                        </label>
                                    </div>
                                );
                            })
                        ) : (
                            <p className="text-gray-500">No products found.</p>
                        )}
                    </div>
                </div>

                {selectedProducts.length > 0 && (
                    <div>
                        <h3 className="text-lg font-medium mt-6 mb-2">Selected Products</h3>
                        {selectedProducts.map((product) => (
                            <div key={product._id} className="border px-4 py-2 mb-2 rounded space-y-2">
                                <div className="flex justify-between">
                                    <h4 className="font-semibold">{product.name}</h4>
                                    <button
                                        onClick={() => handleRemoveProduct(product._id)}
                                        type="button"
                                        className="text-red-600 text-sm"
                                    >
                                        Remove
                                    </button>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium">Flavor</label>
                                        {Array.isArray(product.flavor) && product.flavor.length > 0 ? (
                                            <select
                                                value={product.selectedFlavor}
                                                onChange={(e) =>
                                                    handleProductInputChange(product._id, "selectedFlavor", e.target.value)
                                                }
                                                className="w-full px-3 py-2 border rounded-md"
                                                required
                                            >
                                                <option value="">Select flavor</option>
                                                {product.flavor.map((flavor) => (
                                                    <option key={flavor} value={flavor}>
                                                        {flavor}
                                                    </option>
                                                ))}
                                            </select>
                                        ) : (
                                            <p className="text-sm text-gray-500 pt-2 italic">No flavours.</p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium">Quantity</label>
                                        <input
                                            type="number"
                                            value={product.quantity}
                                            onChange={(e) =>
                                                handleProductInputChange(product._id, "quantity", e.target.value)
                                            }
                                            min="1"
                                            className="w-full px-3 py-2 border rounded-md"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
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
