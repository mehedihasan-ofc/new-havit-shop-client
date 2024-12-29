import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../../../provider/AuthProvider";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import MySpinner from "../../../../components/Shared/MySpinner/MySpinner";
import SVG from "../../../../assets/svg/img-status-9.svg";
import { IoShieldCheckmarkOutline, IoTrashOutline } from "react-icons/io5";
import { Switch } from "@material-tailwind/react";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const RoleDetails = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const token = localStorage.getItem("access-token");
    const [axiosSecure] = useAxiosSecure();
    const [activeStatus, setActiveStatus] = useState(false);
    const [switchDisabled, setSwitchDisabled] = useState(false);

    const { data: roleData = {}, isLoading, refetch } = useQuery({
        queryKey: ["roleData", user?.email, id],
        enabled: !!user?.email && !!token && !!id,
        queryFn: async () => {
            const res = await axiosSecure(`/roles/${id}`);
            setActiveStatus(res.data.isActive);
            return res.data;
        },
    });

    if (isLoading) return <MySpinner />;

    const { roleName, featurePermissions, createdAt, assignedUsers } = roleData;

    // Toggle isActive switch
    const handleStatusToggle = async (value) => {
        Swal.fire({
            title: "Are you sure?",
            text: `You are about to change the status to ${value ? "Active" : "Inactive"}.`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, change it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                setSwitchDisabled(true);
                setActiveStatus(value);
                try {
                    const { data } = await axiosSecure.put(`/roles/${id}`, { isActive: value });
                    if (data?.modifiedCount > 0) {
                        refetch();
                        toast.success("Status updated successfully!", {
                            position: "top-right",
                            autoClose: 1000,
                            pauseOnHover: false,
                        });
                    }
                } catch (error) {
                    console.error("Error during API call:", error);
                    toast.error("Failed to update status. Please try again.", {
                        position: "top-right",
                        autoClose: 1000,
                        pauseOnHover: false,
                    });
                    setActiveStatus(!value);
                } finally {
                    setSwitchDisabled(false);
                }
            }
        });
    };

    // Handle user delete
    const handleDeleteUser = async (userId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This user will be removed from the assigned list.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {

                    const { data } = await axiosSecure.put(`/role/users/${userId}`, { roleId: null });

                    if (data?.modifiedCount > 0) {
                        refetch();
                        Swal.fire({
                            icon: "success",
                            title: "Deleted!",
                            text: "The user has been removed successfully.",
                            timer: 1500,
                            showConfirmButton: false,
                        });
                    } else {
                        toast.warning("No changes were made.", {
                            position: "top-right",
                            autoClose: 1000,
                            pauseOnHover: false,
                        });
                    }
                } catch (error) {
                    console.error("Error during API call:", error);
                    toast.error("Failed to update user role. Please try again.", {
                        position: "top-right",
                        autoClose: 1000,
                        pauseOnHover: false,
                    });
                }
            }
        });
    };

    return (
        <div className="border shadow mx-auto p-6 rounded relative">
            <img className="absolute top-0 right-0 w-32 opacity-10" src={SVG} alt="background" />

            {/* Role Information */}
            <div className="mb-6">
                <p className="text-lg">
                    <span className="font-semibold">Role Name:</span> {roleName}
                </p>
                <div className="flex items-center gap-5 my-2">
                    <p className="text-lg">
                        <span className="font-semibold">Status:</span> {activeStatus ? "Active" : "Inactive"}
                    </p>
                    <Switch
                        color="teal"
                        checked={activeStatus}
                        disabled={switchDisabled}
                        onChange={(e) => handleStatusToggle(e.target.checked)}
                    />
                </div>
                <p className="text-lg">
                    <span className="font-semibold">Created At:</span> {new Date(createdAt).toLocaleString()}
                </p>
            </div>

            {/* Feature Permissions */}
            <div className="mb-6">
                <h2 className="text-xl font-bold text-primary mb-2">Feature Permissions:</h2>
                <div className="grid grid-cols-3 gap-4 border p-5 shadow rounded">
                    {featurePermissions.map((feature) => (
                        <div key={feature.name} className="mb-4">
                            {/* Parent Feature */}
                            <div className="flex items-center gap-2">
                                <IoShieldCheckmarkOutline size={20} />
                                <h3 className="text-lg font-semibold flex items-center">{feature.name}</h3>
                            </div>
                            {/* Subfeatures */}
                            {feature.subFeatures.length > 0 && (
                                <ul className="ml-7 mt-2 list-disc text-gray-700">
                                    {feature.subFeatures.map((sub) => (
                                        <li key={sub.name} className="flex items-center">
                                            <span className="text-gray-600">{sub.name}</span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Assigned Users */}
            <div>
                <h2 className="text-xl font-bold text-primary mb-2">Assigned Users:</h2>
                <div className="grid grid-cols-3 gap-4">
                    {assignedUsers.map((user) => (
                        <div key={user._id} className="flex items-center p-4 border rounded-md shadow-sm relative">
                            <img
                                src={user.profileImage}
                                alt={user.fullName}
                                className="w-12 h-12 rounded-full mr-4"
                            />
                            <div>
                                <p className="font-medium">{user.fullName}</p>
                                <p className="text-sm text-gray-500">{user.email}</p>
                            </div>
                            
                            {/* Delete Icon */}
                            <button
                                onClick={() => handleDeleteUser(user._id)}
                                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                            >
                                <IoTrashOutline size={20} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RoleDetails;