import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import useRoles from "../../../../hooks/useRoles";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import MySpinner from "../../../../components/Shared/MySpinner/MySpinner";
import Swal from "sweetalert2";
import SVG from "../../../../assets/svg/img-status-2.svg";

const RoleAssignment = () => {
    const [axiosSecure] = useAxiosSecure();

    // Custom hooks for roles and fetching users
    const [rolesData, , refetchRoles] = useRoles();
    const { data: usersData = [], isLoading } = useQuery({
        queryKey: ["usersData"],
        queryFn: async () => {
            const res = await axiosSecure.get("/users");
            return res.data;
        },
    });

    const [searchEmail, setSearchEmail] = useState(""); // For search input
    const [selectedUser, setSelectedUser] = useState(null); // For selected user

    if (isLoading) return <MySpinner />;

    // Handle search logic
    const handleSearch = () => {
        const user = usersData.find((user) => user.email === searchEmail.trim());
        if (user) {
            setSelectedUser(user);
        } else {
            Swal.fire({
                title: "User Not Found",
                text: "No user found with this email address.",
                icon: "error",
                confirmButtonText: "Okay",
            });
            setSelectedUser(null);
        }
    };

    // Handle role assignment
    const handleRoleAssignment = async (role) => {
        if (!selectedUser) return;

        const result = await Swal.fire({
            title: `Assign Role: ${role}`,
            text: `Are you sure you want to assign the role "${role}" to ${selectedUser.fullName}?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, Assign",
            cancelButtonText: "Cancel",
            customClass: {
                confirmButton: "bg-green-500 text-white px-4 py-2 rounded",
                cancelButton: "bg-gray-200 text-gray-700 px-4 py-2 rounded",
            },
        });

        if (result.isConfirmed) {
            try {
                const res = await axiosSecure.put(`/users/${selectedUser._id}/role`, { role });
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        title: "Success",
                        text: "Role assigned successfully!",
                        icon: "success",
                        confirmButtonText: "Okay",
                    });
                    refetchRoles();
                    setSelectedUser(null);
                    setSearchEmail("");
                } else {
                    Swal.fire("Error", "Failed to assign the role.", "error");
                }
            } catch (error) {
                Swal.fire("Error", error.message, "error");
            }
        }
    };

    return (
        <div className="border shadow max-w-3xl mx-auto">
            <div className="relative">
                <img className="absolute top-0 right-0" src={SVG} alt="background" />

                <div className="space-y-6 p-10">
                    <h2 className="text-2xl font-bold text-center text-primary">Role Assignment</h2>

                    {/* Search User */}
                    <div className="flex items-center gap-4">
                        <input
                            type="email"
                            placeholder="Enter user email"
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                            value={searchEmail}
                            onChange={(e) => setSearchEmail(e.target.value)}
                        />
                        <button
                            onClick={handleSearch}
                            className="px-4 py-2 bg-primary text-white font-semibold rounded-md shadow hover:bg-green-600 transition"
                        >
                            Search
                        </button>
                    </div>

                    {/* Selected User Card */}
                    {selectedUser && (
                        <div className="p-6 bg-white shadow-md rounded-lg border border-gray-200">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-lg font-semibold text-primary">
                                    {selectedUser.fullName.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold text-gray-800">{selectedUser.fullName}</h2>
                                    <p className="text-sm text-gray-500">{selectedUser.email}</p>
                                    <p className="text-sm">
                                        <span className="font-semibold">Current Role:</span>{" "}
                                        <span className="text-primary">{selectedUser.role}</span>
                                    </p>
                                </div>
                            </div>

                            {/* Role Assignment Options */}
                            <div className="mt-4">
                                <p className="font-medium text-gray-700 mb-2">Assign New Role:</p>
                                <div className="flex flex-wrap gap-2">
                                    {rolesData.map((role) => (
                                        <button
                                            key={role}
                                            onClick={() => handleRoleAssignment(role)}
                                            className="px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-primary hover:text-white transition"
                                        >
                                            {role}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RoleAssignment;