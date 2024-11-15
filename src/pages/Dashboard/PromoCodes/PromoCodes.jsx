import { useState } from "react";
import NewPromoModal from "../../../components/Dashboard/NewPromoModal/NewPromoModal";
import {
    Card,
    CardHeader,
    Typography,
    Button,
    CardBody,
    IconButton,
} from "@material-tailwind/react";
import { TbCategoryPlus } from "react-icons/tb";
import { AiOutlineDelete } from "react-icons/ai";
import { formattedDate } from "../../../utils";
import usePromoCodes from "../../../hooks/usePromoCodes";
import MySpinner from "../../../components/Shared/MySpinner/MySpinner";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const TABLE_HEAD = ["#", "Code", "Discount Type", "Discount", "Created", "Expired", "Action"];

const PromoCodes = () => {
    const [promoCodes, isLoading, refetch] = usePromoCodes();
    const [axiosSecure] = useAxiosSecure();

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open);

    const handleDeletePromo = (promoCodeId) => {

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
    
                axiosSecure.delete(`/promo-codes/${promoCodeId}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "The promo code has been deleted.",
                                icon: "success"
                            });
                        }
                    })
                    .catch(error => {
                        console.error("Error deleting promo code:", error);
                        Swal.fire({
                            title: "Error!",
                            text: "There was an issue deleting the promo code.",
                            icon: "error"
                        });
                    });
            }
        });
    };    

    if (isLoading) return <MySpinner />

    return (
        <>
            <Card className="h-full w-full">
                <CardHeader floated={false} shadow={false} className="rounded-none">
                    <div className="flex items-center justify-between gap-8">
                        <div>
                            <Typography variant="h5" color="blue-gray">
                                Promo Code list ({promoCodes?.length})
                            </Typography>
                            <Typography color="gray" className="mt-1 font-normal">
                                See information about all promo codes
                            </Typography>
                        </div>
                        <div>
                            <Button onClick={handleOpen} size="sm" className="flex items-center gap-2 rounded-none bg-primary font-medium">
                                <TbCategoryPlus size={20} />
                                New Promo Code
                            </Button>
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
                            {promoCodes.map(
                                ({ _id, promoCode, discountType, discount, createdAt, expiryDate }, index) => {
                                    const isLast = index === promoCodes.length - 1;
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
                                                    {promoCode}
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal capitalize"
                                                >
                                                    {discountType}
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal"
                                                >
                                                    {discount}
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
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal"
                                                >
                                                    {formattedDate(expiryDate)}
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                <IconButton onClick={() => handleDeletePromo(_id)} size="sm" variant="text" className="rounded-full">
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

            <NewPromoModal open={open} handleOpen={handleOpen} />
        </>
    );
};

export default PromoCodes;