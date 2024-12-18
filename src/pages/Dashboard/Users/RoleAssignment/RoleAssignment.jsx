import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import useRoles from "../../../../hooks/useRoles";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import MySpinner from "../../../../components/Shared/MySpinner/MySpinner";
import Swal from "sweetalert2";
import SVG from "../../../../assets/svg/img-status-2.svg";
import { Button } from "@material-tailwind/react";

const RoleAssignment = () => {
    const [axiosSecure] = useAxiosSecure();

    const [rolesData, , refetch] = useRoles();
    const { data: usersData = [], isLoading } = useQuery({
        queryKey: ["usersData"],
        queryFn: async () => {
            const res = await axiosSecure.get("/users");
            return res.data;
        },
    });

    const [searchEmail, setSearchEmail] = useState("");
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedRole, setSelectedRole] = useState({});
    const [isAssigning, setIsAssigning] = useState(false);

    // Handle search logic
    const handleSearch = (e) => {
        e.preventDefault();

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
    const handleRoleAssignment = async () => {

        if (!selectedUser._id || !selectedRole?._id) {
            Swal.fire({
                title: "Error",
                text: "Please select a role to assign.",
                icon: "error",
                confirmButtonText: "Okay",
            });
            return;
        }

        const result = await Swal.fire({
            title: `Assign Role: ${selectedRole?.roleName}`,
            text: `Are you sure you want to assign the role "${selectedRole?.roleName}" to ${selectedUser.fullName}?`,
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
            setIsAssigning(true);
            try {
                const { data } = await axiosSecure.put(`/role/users/${selectedUser?._id}`, { roleId: selectedRole?._id });

                if (data.modifiedCount > 0) {
                    Swal.fire({
                        title: "Success",
                        text: "Role assigned successfully!",
                        icon: "success",
                        confirmButtonText: "Okay",
                    });
                    refetch();
                    setSelectedUser(null);
                    setSearchEmail("");
                    setSelectedRole("");
                } else {
                    Swal.fire("Error", "Failed to assign the role.", "error");
                }
            } catch (error) {
                Swal.fire("Error", error.message, "error");
            } finally {
                setIsAssigning(false);
            }
        }
    };

    if (isLoading) return <MySpinner />;

    return (
        <div className="border shadow max-w-3xl mx-auto">
            <div className="relative">
                <img className="absolute top-0 right-0" src={SVG} alt="background" />

                <div className="space-y-6 p-10">
                    <h2 className="text-2xl font-bold text-center text-primary">Role Assignment</h2>

                    {/* Search User */}
                    <form onSubmit={handleSearch} className="w-2/3 mx-auto flex items-center gap-2">
                        <input
                            type="email"
                            placeholder="Enter user email"
                            className="flex-1 px-4 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                            value={searchEmail}
                            onChange={(e) => setSearchEmail(e.target.value)}
                            required
                        />
                        <Button type="submit" className="rounded-none bg-primary shadow-sm hover:shadow-md">Search</Button>
                    </form>

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
                                        <span className="text-primary capitalize">{selectedUser.role}</span>
                                    </p>
                                </div>
                            </div>

                            {/* Role Assignment Dropdown */}
                            <div className="mt-4">
                                <p className="font-medium text-gray-700 mb-2">Assign New Role:</p>

                                <select
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                                    value={selectedRole?._id || ""}
                                    onChange={(e) => {
                                        const selectedRoleId = e.target.value;
                                        const role = rolesData.find((r) => r._id === selectedRoleId);
                                        setSelectedRole(role);
                                    }}
                                >
                                    <option value="">Select a Role</option>
                                    {rolesData?.map((role) => (
                                        <option key={role._id} value={role._id}>
                                            {role.roleName}
                                        </option>
                                    ))}
                                </select>

                                <Button onClick={handleRoleAssignment} disabled={isAssigning} className="rounded-none bg-primary shadow-sm hover:shadow-md w-full mt-4">
                                    {isAssigning ? "Assigning..." : "Assign Role"}
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RoleAssignment;