import useRoles from "../../../../hooks/useRoles";
import { Card, Chip, IconButton, Typography } from "@material-tailwind/react";
import MySpinner from "../../../../components/Shared/MySpinner/MySpinner";
import { formattedDate } from "../../../../utils";
import { PiNotePencil } from "react-icons/pi";
import { AiOutlineDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const TABLE_HEAD = ["#", "Role Name", "Status", "Permissions", "Created", "Actions"];

const AllRoles = () => {

    const [rolesData, isLoading, refetch] = useRoles();
    const [axiosSecure] = useAxiosSecure();
    const navigate = useNavigate();

    const handleDelete = (id) => {

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                // axiosSecure.delete(`/products/${id}`)
                //     .then(res => {
                //         if (res.data.deletedCount > 0) {
                //             refetch();
                //             Swal.fire({
                //                 title: "Deleted!",
                //                 text: "Your file has been deleted.",
                //                 icon: "success"
                //             });
                //         }
                //     })
            }
        });
    }

    if (isLoading) return <MySpinner />

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
                    {rolesData?.map(({ _id, roleName, isActive, featurePermissions, createdAt }, index) => {
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
                                        <IconButton size="sm" variant="text" className="rounded-full">
                                            <PiNotePencil className="text-teal-600" size={20} />
                                        </IconButton>

                                        <IconButton onClick={() => handleDelete(_id)} size="sm" variant="text" className="rounded-full">
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