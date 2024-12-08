import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import {
    Card,
    CardHeader,
    Input,
    Typography,
    CardBody,
    Chip,
    Tabs,
    TabsHeader,
    Tab,
    IconButton,
} from "@material-tailwind/react";
import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { AuthContext } from "../../../provider/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import MySpinner from "../../../components/Shared/MySpinner/MySpinner";
import { formattedDate } from "../../../utils";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";
import Swal from "sweetalert2";
import ViewOrderModal from "../../../components/Modal/ViewOrderModal/ViewOrderModal";

const TABS = [
    {
        label: "All",
        value: "all",
    },
    {
        label: "Pending",
        value: "pending",
    },
    {
        label: "Processing",
        value: "processing",
    },
    {
        label: "Shipped",
        value: "shipped",
    },
    {
        label: "Delivered",
        value: "delivered",
    },
    {
        label: "Cancelled",
        value: "cancelled",
    }
];

const TABLE_HEAD = ["#", "Order ID", "Order Date", "Pay Method", "Del Status", "Total", "Pay Status", "Actions"];

const Orders = () => {
    const [activeTab, setActiveTab] = useState("all");

    const { user } = useContext(AuthContext);
    const token = localStorage.getItem('access-token');
    const [axiosSecure] = useAxiosSecure();

    // Modal Data
    const [orderId, setOrderId] = useState();
    const [open, setOpen] = useState(false);

    const { data: orders = [], isLoading, refetch } = useQuery({
        queryKey: ['orders', user?.email, activeTab],
        enabled: !!user?.email && !!token,
        queryFn: async () => {
            const res = await axiosSecure(`https://havit-shop.onrender.com/orders/${activeTab}`);
            return res.data;
        },
    });

    const handleOpen = () => setOpen(!open);

    const handleViewOrder = (id) => {
        setOrderId(id);
        handleOpen();
    }

    const handleDelete = async (orderId) => {

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

                axiosSecure.delete(`/orders/${orderId}`)
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
        <>
            <Card className="h-full w-full">
                <CardHeader floated={false} shadow={false} className="rounded-none">
                    <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                        <Tabs value={activeTab} className="w-full md:w-max">
                            <TabsHeader
                                className="rounded-none"
                                indicatorProps={{
                                    className: "rounded-none",
                                }}
                            >
                                {TABS.map(({ label, value }) => (
                                    <Tab
                                        onClick={() => setActiveTab(value)}
                                        key={value}
                                        value={value}
                                        className="text-sm"
                                    >
                                        &nbsp;&nbsp;{label}&nbsp;&nbsp;
                                    </Tab>
                                ))}
                            </TabsHeader>
                        </Tabs>

                        {/* <div className="w-full md:w-72">
                            <Input
                                label="Search"
                                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                            />
                        </div> */}
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
                                                className="font-normal leading-none opacity-70"
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
                                                            <IconButton onClick={() => handleViewOrder(_id)} variant="text" className="rounded-full">
                                                                <MdOutlineRemoveRedEye size={18} />
                                                            </IconButton>

                                                            <IconButton onClick={() => handleDelete(_id)} variant="text" className="rounded-full">
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

            <ViewOrderModal open={open} handleOpen={handleOpen} orderId={orderId} onRefetch={refetch} />
        </>
    );
};

export default Orders;