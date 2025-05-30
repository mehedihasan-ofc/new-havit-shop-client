import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import {
    Card,
    CardHeader,
    Input,
    Typography,
    Button,
    CardBody,
    Chip,
    Tabs,
    TabsHeader,
    Tab,
    IconButton
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { MdAddShoppingCart, MdOutlineRemoveRedEye } from "react-icons/md";
import { useContext, useState } from "react";
import { AuthContext } from "../../../provider/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import MySpinner from "../../../components/Shared/MySpinner/MySpinner";
import { formattedDate } from "../../../utils";
import { AiOutlineDelete } from "react-icons/ai";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const TABS = [
    { label: "All", value: "all" },
    { label: "Pending", value: "pending" },
    { label: "Confirmed", value: "confirmed" },
    { label: "Packaging", value: "packaging" },
    { label: "Out for Delivery", value: "out_for_delivery" },
    { label: "Delivered", value: "delivered" },
    { label: "Returned", value: "returned" },
    { label: "Failed to Deliver", value: "failed_to_deliver" },
    { label: "Canceled", value: "canceled" }
];

const TABLE_HEAD = ["#", "Order ID", "Order Date", "Pay Method", "Del Status", "Total", "Pay Status", "Actions"];

const CustomOrder = () => {

    const [selectedStatus, setSelectedStatus] = useState("all");

    const { user } = useContext(AuthContext);
    const token = localStorage.getItem('access-token');
    const [axiosSecure] = useAxiosSecure();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const { data: customOrders = [], isLoading, refetch } = useQuery({
        queryKey: ['customOrders', user?.email, selectedStatus],
        enabled: !!user?.email && !!token,
        queryFn: async () => {
            const res = await axiosSecure(`/custom-orders/${selectedStatus}`);
            return res.data;
        },
    });

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
                    const { data } = await axiosSecure.delete(`/custom-orders/${orderId}`);

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

    return (
        <Card className="h-full w-full">
            <CardHeader floated={false} shadow={false} className="rounded-none">
                <div className="mb-6 flex items-center justify-between gap-8">

                    <div className="w-full md:w-72">
                        <Input
                            label="Search"
                            icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                        />
                    </div>

                    <div>
                        <Link to="/dashboard/add-custom-order">
                            <Button size="sm" className="flex items-center gap-2 rounded-none bg-primary font-medium">
                                <MdAddShoppingCart size={20} />
                                Add New Order
                            </Button>
                        </Link>
                    </div>
                </div>

                <div className="space-y-4">
                    <Tabs value={selectedStatus}>
                        <TabsHeader
                            className="rounded-none bg-secondary"
                            indicatorProps={{
                                className:
                                    "shadow rounded-none",
                            }}
                        >
                            {TABS.map(({ label, value }) => (
                                <Tab key={value} value={value} onClick={() => setSelectedStatus(value)}
                                    className={`text-xs font-semibold font-serif px-0 ${selectedStatus === value && "text-primary"}`}
                                >
                                    {label}
                                </Tab>
                            ))}
                        </TabsHeader>
                    </Tabs>
                </div>
            </CardHeader>

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
                            {customOrders.length === 0 ? (
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
                                customOrders.map(
                                    (
                                        {
                                            _id,
                                            orderId,
                                            createdAt,
                                            paymentMethod,
                                            deliveryStatus,
                                            total,
                                            paymentStatus,
                                        },
                                        index
                                    ) => {
                                        const isLast = index === customOrders.length - 1;
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
                                                        {formattedDate(createdAt)}
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
                                                        ৳{total}
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
                                                        <IconButton onClick={() => navigate(`/dashboard/single-custom-order-details/${_id}`)} variant="text" className="rounded-full">
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

export default CustomOrder;