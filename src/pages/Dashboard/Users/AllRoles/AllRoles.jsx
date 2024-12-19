import useRoles from "../../../../hooks/useRoles";
import { Avatar, Card, Chip, IconButton, Typography } from "@material-tailwind/react";
import MySpinner from "../../../../components/Shared/MySpinner/MySpinner";
import { formattedDate } from "../../../../utils";
import { PiNotePencil } from "react-icons/pi";
import { AiOutlineDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import UserImg from "../../../../assets/user.jpg";
import { useState } from "react";

const TABLE_HEAD = ["#", "Role Name", "Status", "Permissions", "Assigned", "Created", "Actions"];

const AllRoles = () => {

    const [rolesData, isLoading, refetch] = useRoles();
    const [axiosSecure] = useAxiosSecure();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleDelete = async (id) => {

        setLoading(true);

        Swal.fire({
            title: "Are you sure?",
            text: "This will delete the role and update assigned users!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    // Make the delete request
                    const { data } = await axiosSecure.delete(`/roles/${id}`);

                    // Check the response message from the API
                    if (data.modifiedCount > 0) {
                        refetch();
                        Swal.fire({
                            title: "Deleted!",
                            text: "Role and users have been updated successfully.",
                            icon: "success"
                        });
                    } else {
                        Swal.fire({
                            title: "Error",
                            text: "There was an issue deleting the role or updating the users.",
                            icon: "error"
                        });
                    }
                } catch (error) {
                    Swal.fire({
                        title: "Error",
                        text: "An error occurred while deleting the role.",
                        icon: "error"
                    });
                } finally {
                    setLoading(false);
                }
            }
            setLoading(false);
        });
    };

    if (isLoading) return <MySpinner />;

    return (
        <Card className="h-full w-full overflow-scroll px-6 border rounded-none">
            <table className="w-full min-w-max table-auto text-left">
                <thead>
                    <tr>
                        {TABLE_HEAD.map((head) => (
                            <th key={head} className="border-b border-gray-300 pb-4 pt-10">
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-bold leading-none"
                                >
                                    {head}
                                </Typography>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rolesData?.map(({ _id, roleName, isActive, featurePermissions, assignedUsers, createdAt }, index) => {
                        const isLast = index === rolesData.length - 1;
                        const classes = isLast ? "py-4" : "py-4 border-b border-gray-300";

                        return (
                            <tr key={_id}>
                                <td className={classes}>
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-bold"
                                    >
                                        {index + 1}
                                    </Typography>
                                </td>
                                <td className={classes}>
                                    <div className="w-max">
                                        <Chip
                                            size="sm"
                                            value={roleName}
                                            color="pink"
                                            className="rounded-none capitalize font-medium"
                                        />
                                    </div>
                                </td>
                                <td className={classes}>
                                    <div className="w-max">
                                        <Chip
                                            size="sm"
                                            value={isActive ? "Active" : "Disabled"}
                                            color={isActive ? "teal" : "red"}
                                            className="rounded-none capitalize font-medium"
                                        />
                                    </div>
                                </td>
                                <td className={classes}>
                                    <div className="w-max">
                                        <Chip
                                            size="sm"
                                            value={`Access ${featurePermissions?.length}`}
                                            color="purple"
                                            className="rounded-none capitalize font-medium"
                                        />
                                    </div>
                                </td>

                                <td className={classes}>
                                    {
                                        assignedUsers && assignedUsers.length > 0 ? (
                                            <div className="flex items-center -space-x-4">
                                                {
                                                    assignedUsers?.map(user => (
                                                        <Avatar
                                                            key={user?._id}
                                                            size="sm"
                                                            variant="circular"
                                                            className="border-2 border-white hover:z-10 focus:z-10"
                                                            src={user?.profileImage || UserImg}
                                                            alt={user?.fullName} 
                                                        />
                                                    ))
                                                }
                                            </div>
                                        ) : (
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-semibold"
                                            >
                                                No users assigned
                                            </Typography>
                                        )
                                    }
                                </td>

                                <td className={classes}>
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-semibold"
                                    >
                                        {formattedDate(createdAt)}
                                    </Typography>
                                </td>

                                <td className={classes}>
                                    <div className="flex items-center gap-2">
                                        <IconButton onClick={() => navigate(`/dashboard/role-details/${_id}`)} size="sm" variant="text" className="rounded-full">
                                            <PiNotePencil className="text-teal-600" size={20} />
                                        </IconButton>

                                        <IconButton disabled={loading} onClick={() => handleDelete(_id)} size="sm" variant="text" className="rounded-full">
                                            <AiOutlineDelete className="text-red-600" size={20} />
                                        </IconButton>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </Card>
    );
};

export default AllRoles;