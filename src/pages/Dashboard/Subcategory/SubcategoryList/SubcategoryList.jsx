import { Button, Card, CardBody, CardHeader, IconButton, Typography } from "@material-tailwind/react";
import useSubcategories from "../../../../hooks/useSubcategories";
import { Link } from "react-router-dom";
import { TbCategoryPlus } from "react-icons/tb";
import { AiOutlineDelete } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import { formattedDate } from "../../../../utils";
import MySpinner from "../../../../components/Shared/MySpinner/MySpinner";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const TABLE_HEAD = ["#", "Name", "Created At", "Action"];

const SubcategoryList = () => {
    
    const [subcategories, loading, refetch] = useSubcategories();
    const [axiosSecure] = useAxiosSecure();

    const handleDeleteCategory = (id) => {

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

                axiosSecure.delete(`/subcategories/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }

    if (loading) {
        return <MySpinner />
    }
    
    return (
        <>
            <Card className="h-full w-full">
                <CardHeader floated={false} shadow={false} className="rounded-none">
                    <div className="flex items-center justify-between gap-8">
                        <div>
                            <Typography variant="h5" color="blue-gray">
                                Subcategory list ({subcategories?.length})
                            </Typography>
                            <Typography color="gray" className="mt-1 font-normal">
                                See information about all subcategories
                            </Typography>
                        </div>
                        <div>
                            <Link to="/dashboard/new-subcategory">
                                <Button size="sm" className="flex items-center gap-2 rounded-none bg-primary font-medium">
                                    <TbCategoryPlus size={20} />
                                    Create a subcategory
                                </Button>
                            </Link>
                        </div>
                    </div>
                </CardHeader>
                <CardBody className="overflow-scroll p-0 mt-5">
                    <table className="w-full min-w-max table-auto text-left">
                        <thead>
                            <tr>
                                {TABLE_HEAD.map((head) => (
                                    <th
                                        key={head}
                                        className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                                    >
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal leading-none opacity-70"
                                        >
                                            {head}
                                        </Typography>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {subcategories.map(
                                ({ _id, name, createdAt }, index) => {
                                    const isLast = index === subcategories.length - 1;
                                    const classes = isLast
                                        ? "p-4"
                                        : "p-4 border-b border-blue-gray-50";

                                    return (
                                        <tr key={_id}>
                                            <td className={classes}>
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal"
                                                >
                                                    {index + 1}
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal"
                                                >
                                                    {name}
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal"
                                                >
                                                    {formattedDate(createdAt)}
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                <IconButton size="sm" variant="text" className="rounded-full">
                                                    <CiEdit className="text-amber-800" size={20} />
                                                </IconButton>

                                                <IconButton onClick={() => handleDeleteCategory(_id)} size="sm" variant="text" className="rounded-full">
                                                    <AiOutlineDelete className="text-red-600" size={20} />
                                                </IconButton>
                                            </td>
                                        </tr>
                                    );
                                },
                            )}
                        </tbody>
                    </table>
                </CardBody>
            </Card>
        </>
    );
};

export default SubcategoryList;