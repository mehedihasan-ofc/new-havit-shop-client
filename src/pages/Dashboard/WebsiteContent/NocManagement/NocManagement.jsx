import { Avatar, Button, Card, CardBody, CardHeader, IconButton, Typography } from "@material-tailwind/react";
import { AiOutlineDelete } from "react-icons/ai";
import { LuEye } from "react-icons/lu";
import { PiFlagBannerFold } from "react-icons/pi";
import { Link } from "react-router-dom";
import NoDataFound from "../../../Static/NoDataFound/NoDataFound";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useState } from "react";
import CtreateNocModal from "../../../../components/Modal/CtreateNocModal/CtreateNocModal";
import useNoc from "../../../../hooks/useNoc";
import { formattedDate } from "../../../../utils";
import MySpinner from "../../../../components/Shared/MySpinner/MySpinner";
import Swal from "sweetalert2";

const TABLE_HEAD = ["#", "Image", "Created At", "Action"];

const NocManagement = () => {

    const [noc, loading, refetch] = useNoc();
    const [axiosSecure] = useAxiosSecure();

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open);
    
    const handleDeleteNOC = (id) => {
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

                axiosSecure.delete(`/noc/${id}`)
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
        return <MySpinner />;
    }
    
    return (
        <>
            <Card className="h-full w-full">
                <CardHeader floated={false} shadow={false} className="rounded-none">
                    <div className="flex items-center justify-between gap-8">
                        <div>
                            <Typography variant="h5" color="blue-gray">
                                NOC list ({noc?.length})
                            </Typography>
                            <Typography color="gray" className="mt-1 font-normal">
                                See information about all banners
                            </Typography>
                        </div>
                        <div>
                            <Button onClick={handleOpen} size="sm" className="flex items-center gap-2 rounded-none bg-primary font-medium">
                                <PiFlagBannerFold size={20} />
                                Create a NOC
                            </Button>
                        </div>
                    </div>
                </CardHeader>
                
                {noc?.length > 0 ? <CardBody className="overflow-scroll p-0 mt-5">
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
                            {noc.map(
                                ({ _id, image, createdAt }, index) => {
                                    const isLast = index === noc.length - 1;
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
                                                <Avatar src={image} alt={_id} size="sm" variant="rounded" />
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

                                                <Link target="_blank" to={image}>
                                                    <IconButton size="sm" variant="text" className="rounded-full">
                                                        <LuEye className="text-primary" size={18} />
                                                    </IconButton>
                                                </Link>

                                                <IconButton onClick={() => handleDeleteNOC(_id)} size="sm" variant="text" className="rounded-full">
                                                    <AiOutlineDelete className="text-red-600" size={18} />
                                                </IconButton>
                                            </td>
                                        </tr>
                                    );
                                },
                            )}
                        </tbody>
                    </table>
                </CardBody> : <div className="mt-5"><NoDataFound /></div>}
            </Card>

            <CtreateNocModal open={open} handleOpen={handleOpen} refetch={refetch} />
        </>
    );
};

export default NocManagement;