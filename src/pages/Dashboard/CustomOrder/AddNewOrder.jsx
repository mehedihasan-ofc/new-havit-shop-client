import { useState, useEffect } from "react";
import MySpinner from "../../../components/Shared/MySpinner/MySpinner";
import useProducts from "../../../hooks/useProducts";
import { Button } from "@material-tailwind/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const AddNewOrder = () => {
    const [products, loading] = useProducts();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        city: "",
        area: "",
        address: "",
        additionalInfo: "",
    });
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

    const handleNext = (e) => {
        e.preventDefault();

        if (selectedProducts.length === 0) {
            Swal.fire({
                icon: "warning",
                title: "No product selected",
                text: "Please select at least one product to proceed.",
                confirmButtonColor: "#3BB77E",
            });
            return;
        }

        const payload = {
            ...formData,
            products: selectedProducts.map(({ _id, skuCode, name, price, selectedFlavor, quantity, images }) => ({
                productId: _id,
                skuCode,
                name,
                price,
                image: images?.[0]?.url || "",
                flavor: selectedFlavor,
                quantity: parseInt(quantity),
            })),
        };

        navigate("/dashboard/confirm-custom-order", { state: payload });
    };

    const filteredProducts = products.filter((product) => {
        const query = searchTerm.toLowerCase();
        return (
            product.name.toLowerCase().includes(query) ||
            product.skuCode?.toLowerCase().includes(query)
        );
    });



    if (loading) {
        return <MySpinner />;
    }

    return (
        <div className="border shadow rounded">
            <form onSubmit={handleNext} className="space-y-4 p-8">
                <h2 className="text-3xl font-bold text-center mb-4 font-serif">Add Custom Order</h2>

                <div>
                    <label className="block mb-1 font-medium">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter full name"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
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
                        placeholder="01XXXXXXXXX"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
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
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
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
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
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
                        placeholder="Enter street/house/road"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                        required
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium">Additional Information</label>
                    <textarea
                        name="additionalInfo"
                        value={formData.additionalInfo}
                        onChange={handleChange}
                        placeholder="Any extra instruction?"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                        rows="3"
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium">Search Products</label>
                    <input
                        type="text"
                        placeholder="Search products by name or sku code..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full mb-3 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
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
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
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
                                            placeholder="Quantity"
                                            value={product.quantity}
                                            onChange={(e) =>
                                                handleProductInputChange(product._id, "quantity", e.target.value)
                                            }
                                            min="1"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
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
                    >
                        Next
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default AddNewOrder;
