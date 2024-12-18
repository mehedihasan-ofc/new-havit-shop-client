import { useState } from "react";
import { features } from "../../../../database/data";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { toast } from "react-toastify";
import { Button } from "@material-tailwind/react";
import SVG from "../../../../assets/svg/img-status-8.svg";

const CreateRole = () => {

    const [roleName, setRoleName] = useState("");
    const [selectedFeatures, setSelectedFeatures] = useState({});
    const [axiosSecure] = useAxiosSecure();
    const [loading, setLoading] = useState(false);

    // Handle parent feature selection
    const handleParentCheckbox = (featureName) => {
        setSelectedFeatures((prev) => {
            const updated = { ...prev };
            if (updated[featureName]) {
                delete updated[featureName]; // Uncheck parent removes all subfeatures
            } else {
                const feature = features.find((f) => f.name === featureName);
                updated[featureName] = feature.subFeatures ? [...feature.subFeatures] : [];
            }
            return updated;
        });
    };

    // Handle subfeature selection
    const handleSubCheckbox = (parentName, subFeature) => {
        setSelectedFeatures((prev) => {
            const updated = { ...prev };
            if (!updated[parentName]) updated[parentName] = [];
            const isSelected = updated[parentName].find((sf) => sf.name === subFeature.name);
            if (isSelected) {
                updated[parentName] = updated[parentName].filter((sf) => sf.name !== subFeature.name);
            } else {
                updated[parentName].push(subFeature);
            }
            if (updated[parentName].length === 0) delete updated[parentName];
            return updated;
        });
    };

    // Generate final data structure
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission
        setLoading(true);

        try {
            // Construct feature permissions from selected features
            const featurePermissions = features
                .filter((feature) => selectedFeatures[feature.name])
                .map((feature) => {
                    const subFeatures = selectedFeatures[feature.name];
                    return {
                        ...feature,
                        subFeatures: subFeatures?.length > 0 ? subFeatures : [],
                    };
                });

            // Prepare role payload
            const rolePayload = {
                roleName,
                featurePermissions,
                isActive: true,
                createdAt: new Date().toISOString(),
            };

            // API call to create the role
            const { data } = await axiosSecure.post('/roles', rolePayload);

            if (data.insertedId) {
                // Show success toast notification
                toast.success('Role created successfully!', {
                    position: "top-right",
                    autoClose: 1000,
                    pauseOnHover: false,
                });

                // Reset form data after successful submission
                setRoleName(""); // Clear role name input
                setSelectedFeatures({}); // Clear selected features
            }
        } catch (error) {
            // Log error and show error notification
            console.error("Error during API call:", error);
            toast.error("Failed to create role. Please try again.", {
                position: "top-right",
                autoClose: 2000,
                pauseOnHover: false,
            });
        } finally {
            // Stop loading spinner
            setLoading(false);
        }
    };

    return (
        <div className="border shadow mx-auto">
            <div className="relative">

                <img className="absolute top-0 right-0" src={SVG} alt="background" />

                {/* Role Name Input */}
                <form onSubmit={handleSubmit} className="space-y-6 max-w-full p-10">
                    <div>
                        <label htmlFor="role-name" className="block text-gray-700 font-bold mb-2">
                            Role Name:
                        </label>
                        <input
                            id="role-name"
                            type="text"
                            value={roleName}
                            onChange={(e) => setRoleName(e.target.value)}
                            placeholder="Enter Role Name"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                            required
                        />
                    </div>

                    {/* Feature Permission Section */}
                    <div>
                        <p className="text-lg font-semibold mb-2">Feature Permission:</p>
                        <div className="grid grid-cols-3 gap-4">
                            {features.map((feature) => (
                                <div key={feature.index} className="mb-2">
                                    {/* Parent Feature */}
                                    <div className="flex items-center mb-1">
                                        <input
                                            type="checkbox"
                                            id={`feature-${feature.name}`}
                                            checked={!!selectedFeatures[feature.name]}
                                            onChange={() => handleParentCheckbox(feature.name)}
                                            className="mr-2"
                                        />
                                        <label htmlFor={`feature-${feature.name}`} className="font-medium">
                                            {feature.name}
                                        </label>
                                    </div>

                                    {/* Subfeatures */}
                                    {feature.subFeatures?.length > 0 && (
                                        <div className="ml-6">
                                            {feature.subFeatures.map((sub) => (
                                                <div key={sub.index} className="flex items-center mb-1">
                                                    <input
                                                        type="checkbox"
                                                        id={`subfeature-${sub.name}`}
                                                        checked={
                                                            selectedFeatures[feature.name]?.some((sf) => sf.name === sub.name)
                                                        }
                                                        onChange={() => handleSubCheckbox(feature.name, sub)}
                                                        className="mr-2"
                                                    />
                                                    <label htmlFor={`subfeature-${sub.name}`} className="text-gray-700">
                                                        {sub.name}
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex items-center justify-center">
                        <Button
                            type="submit"
                            loading={loading}
                            className="rounded-none bg-primary font-medium px-10"
                        >
                            {loading ? 'Processing...' : 'Submit'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateRole;