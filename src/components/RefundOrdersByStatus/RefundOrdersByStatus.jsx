import { Card, CardBody, IconButton, Typography } from "@material-tailwind/react";
import useRefundOrdersByStatus from "../../hooks/useRefundOrdersByStatus";
import MySpinner from "../Shared/MySpinner/MySpinner";
import { formattedDate } from "../../utils";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const TABLE_HEAD = ["#", "Order ID", "Ordered", "Delivered", "Requested", "Total", "Actions"];

const RefundOrdersByStatus = ({ status }) => {

    const [refundOrders, isLoading, refetch] = useRefundOrdersByStatus(status);
    const navigate = useNavigate();

    console.log(refundOrders);

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
                                            className="font-normal leading-none opacity-70"
                                        >
                                            {head}
                                        </Typography>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {refundOrders.length === 0 ? (
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
                                refundOrders.map(
                                    (
                                        {
                                            _id,
                                            orderId,
                                            orderDate,
                                            deliveryDate,
                                            refundRequestedAt,
                                            payableTotal
                                        },
                                        index
                                    ) => {
                                        const isLast = index === refundOrders.length - 1;
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
                                                        className="font-normal"
                                                    >
                                                        {formattedDate(deliveryDate)}
                                                    </Typography>
                                                </td>

                                                <td className={classes}>
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                        {formattedDate(refundRequestedAt)}
                                                    </Typography>
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
                                                    <div>
                                                        <IconButton onClick={() => navigate(`/dashboard/refund-order-details/${_id}`)} variant="text" className="rounded-full">
                                                            <MdOutlineRemoveRedEye size={18} />
                                                        </IconButton>

                                                        <IconButton variant="text" className="rounded-full">
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

export default RefundOrdersByStatus;