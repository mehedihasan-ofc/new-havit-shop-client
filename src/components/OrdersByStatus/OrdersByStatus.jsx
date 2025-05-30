import Swal from "sweetalert2";
import { Card, CardBody, Chip, IconButton, Typography } from "@material-tailwind/react";
import MySpinner from "../Shared/MySpinner/MySpinner";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";
import { formattedDate } from "../../utils";
import { useNavigate } from "react-router-dom";
import useOrdersByStatus from "../../hooks/useOrdersByStatus";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useState } from "react";
import { toast } from "react-toastify";

const TABLE_HEAD = ["#", "Order ID", "Order Date", "Pay Method", "Del Status", "Total", "Pay Status", "Actions"];

const OrdersByStatus = ({ activeStatus }) => {

    const [orders, isLoading, refetch] = useOrdersByStatus(activeStatus);
    const [axiosSecure] = useAxiosSecure();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleDelete = async (orderId) => {
        setLoading(true);

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const { data } = await axiosSecure.delete(`/orders/${orderId}`);

                    if (data.deletedCount > 0) {
                        refetch();
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                        });
                    } else {
                        toast.error("Failed to delete the order.");
                    }
                } catch (error) {
                    console.error("Delete error: ", error);
                    toast.error("An error occurred. Please try again.");
                } finally {
                    setLoading(false);
                }
            }
            setLoading(false);
        });
    };

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case "pending":
                return "amber";
            case "processing":
                return "blue";
            case "shipped":
                return "indigo";
            case "delivered":
                return "green";
            case "cancelled":
                return "red";
            default:
                return "gray";
        }
    };

    const getPaymentStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case "pending":
                return "amber";
            case "paid":
                return "green";
            case "unpaid":
                return "red";
            default:
                return "gray";
        }
    };

    return (
        <Card className="h-full w-full">
            {isLoading ? (
                <MySpinner />
            ) : (
                <CardBody className="px-0 overflow-x-auto">
                    <table className="mt-4 w-full min-w-max table-auto text-left">
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
                                            className="font-normal leading-none font-serif opacity-70"
                                        >
                                            {head}
                                        </Typography>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {orders.length === 0 ? (
                                <tr>
                                    <td colSpan={TABLE_HEAD.length} className="p-4 text-center">
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal opacity-70"
                                        >
                                            No orders found.
                                        </Typography>
                                    </td>
                                </tr>
                            ) : (
                                orders.map(
                                    (
                                        {
                                            _id,
                                            orderId,
                                            orderDate,
                                            paymentMethod,
                                            deliveryStatus,
                                            payableTotal,
                                            paymentStatus,
                                        },
                                        index
                                    ) => {
                                        const isLast = index === orders.length - 1;
                                        const classes = isLast
                                            ? "p-4"
                                            : "p-4 border-b border-blue-gray-50";

                                        return (
                                            <tr key={_id} className="text-sm">
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
                                                        #{orderId}
                                                    </Typography>
                                                </td>

                                                <td className={classes}>
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                        {formattedDate(orderDate)}
                                                    </Typography>
                                                </td>

                                                <td className={classes}>
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal capitalize"
                                                    >
                                                        {paymentMethod}
                                                    </Typography>
                                                </td>

                                                <td className={classes}>
                                                    <div className="w-max">
                                                        <Chip
                                                            size="sm"
                                                            variant="ghost"
                                                            value={deliveryStatus}
                                                            color={getStatusColor(deliveryStatus)}
                                                        />
                                                    </div>
                                                </td>

                                                <td className={classes}>
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                        ৳{payableTotal}
                                                    </Typography>
                                                </td>

                                                <td className={classes}>
                                                    <div className="w-max">
                                                        <Chip
                                                            size="sm"
                                                            variant="ghost"
                                                            value={paymentStatus}
                                                            color={getPaymentStatusColor(paymentStatus)}
                                                        />
                                                    </div>
                                                </td>

                                                <td className={classes}>
                                                    <div>
                                                        <IconButton onClick={() => navigate(`/dashboard/order-details/${_id}`)} variant="text" className="rounded-full">
                                                            <MdOutlineRemoveRedEye size={18} />
                                                        </IconButton>

                                                        <IconButton disabled={loading} onClick={() => handleDelete(_id)} variant="text" className="rounded-full">
                                                            <AiOutlineDelete size={18} />
                                                        </IconButton>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    }
                                )
                            )}
                        </tbody>
                    </table>
                </CardBody>
            )}
        </Card>
    );
};

export default OrdersByStatus;