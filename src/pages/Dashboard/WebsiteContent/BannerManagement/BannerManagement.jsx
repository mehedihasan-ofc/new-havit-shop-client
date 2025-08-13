import {
    Card,
    CardHeader,
    Typography,
    Button,
    CardBody,
    Avatar,
    IconButton,
} from "@material-tailwind/react";
import { useState } from "react";
import { PiFlagBannerFold } from "react-icons/pi";
import CreateBannerModal from "../../../../components/Modal/CreateBannerModal/CreateBannerModal";
import useBanners from "../../../../hooks/useBanners";
import MySpinner from "../../../../components/Shared/MySpinner/MySpinner";
import { formattedDate, deleteImage } from "../../../../utils";
import { AiOutlineDelete } from "react-icons/ai";
import { LuEye } from "react-icons/lu";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import NoDataFound from "../../../Static/NoDataFound/NoDataFound";

const TABLE_HEAD = ["#", "Image", "Created At", "Action"];

const BannerManagement = () => {

    const [banners, loading, refetch] = useBanners();
    const [axiosSecure] = useAxiosSecure();

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open);

    const handleDeleteBanner = async (id, imageUrl) => {
        const confirm = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        });

        if (confirm.isConfirmed) {
            try {
                // First delete the image file from /image/:id
                await deleteImage(imageUrl);

                // Then delete the banner document from DB
                const res = await axiosSecure.delete(`/banners/${id}`);

                if (res.data.deletedCount > 0) {
                    refetch();
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                    });
                }
            } catch (err) {
                console.error("Error deleting banner:", err);
                Swal.fire({
                    title: "Error",
                    text: "Failed to delete banner",
                    icon: "error"
                });
            }
        }
    };

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
                                Banner list ({banners?.length})
                            </Typography>
                            <Typography color="gray" className="mt-1 font-normal">
                                See information about all banners
                            </Typography>
                        </div>
                        <div>
                            <Button onClick={handleOpen} size="sm" className="flex items-center gap-2 rounded-none bg-primary font-medium">
                                <PiFlagBannerFold size={20} />
                                Create a Banner
                            </Button>
                        </div>
                    </div>
                </CardHeader>

                {banners?.length > 0 ? <CardBody className="overflow-scroll p-0 mt-5">
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
                            {banners.map(
                                ({ _id, image, createdAt }, index) => {
                                    const isLast = index === banners.length - 1;
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

                                                <IconButton onClick={() => handleDeleteBanner(_id, image)} size="sm" variant="text" className="rounded-full">
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

            <CreateBannerModal open={open} handleOpen={handleOpen} refetch={refetch} />
        </>
    );
};

export default BannerManagement;