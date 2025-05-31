import { useContext, useState } from "react";
import {
    Card,
    Typography,
    List,
    ListItem,
    ListItemPrefix,
    ListItemSuffix,
    Chip,
    Accordion,
    AccordionHeader,
    AccordionBody,
} from "@material-tailwind/react";
import { PowerIcon } from "@heroicons/react/24/solid";
import {
    ChevronRightIcon,
    ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { LuCopyPlus, LuLayoutDashboard, LuPlusSquare } from "react-icons/lu";
import { TbMapDiscount, TbWorldStar } from "react-icons/tb";
import { MdOutlineCampaign, MdOutlineShoppingCartCheckout } from "react-icons/md";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { FiMessageCircle } from "react-icons/fi";
import { LiaDonateSolid } from "react-icons/lia";
import useSubscriptions from "../../../hooks/useSubscriptions";
import useMessages from "../../../hooks/useMessages";
import { AuthContext } from "../../../provider/AuthProvider";
import Swal from "sweetalert2";
import { BsSliders2 } from "react-icons/bs";
import useLogo from "../../../hooks/useLogo";
import { RiCustomerServiceLine, RiRefund2Fill, RiShieldUserLine } from "react-icons/ri";
import useOrdersByStatus from "../../../hooks/useOrdersByStatus";
import useRefundOrdersByStatus from "../../../hooks/useRefundOrdersByStatus";
import useAdminAuth from "../../../hooks/useAdminAuth";

const Sidebar = () => {
    const [, adminData] = useAdminAuth();
    const [logoData] = useLogo();
    const { logOut } = useContext(AuthContext);

    const [subscriptions] = useSubscriptions();
    const [messages] = useMessages();
    const [open, setOpen] = useState(0);

    const [orders] = useOrdersByStatus("all");
    const [refundOrders] = useRefundOrdersByStatus("all");

    // Group orders by status
    const orderCounts = orders.reduce((counts, order) => {
        counts[order.deliveryStatus] = (counts[order.deliveryStatus] || 0) + 1;
        return counts;
    }, {});

    // Group refund orders by status
    const refundOrderCounts = refundOrders.reduce((counts, order) => {
        counts[order.refundStatus] = (counts[order.refundStatus] || 0) + 1;
        return counts;
    }, {});

    // Get count for a specific status
    const getOrderCount = (status) => orderCounts[status] || 0;

    // Get count for a specific refund status
    const getRefundOrderCount = (status) => refundOrderCounts[status] || 0;

    const handleOpen = (value) => {
        setOpen(open === value ? 0 : value);
    };

    const handleLogOut = () => {
        Swal.fire({
            title: "Are you sure want to sign out?",
            text: "You will need to log in again to access your account.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, sign out!"
        }).then((result) => {
            if (result.isConfirmed) {
                logOut()
                    .then(() => {
                        Swal.fire({
                            title: "Signed Out",
                            text: "You have successfully signed out.",
                            icon: "success"
                        });
                    })
                    .catch(() => {
                        Swal.fire({
                            title: "Error",
                            text: "Failed to sign out. Please try again.",
                            icon: "error"
                        });
                    });
            }
        });
    };

    const iconMapping = {
        LuLayoutDashboard: <LuLayoutDashboard size={20} />,
        BsSliders2: <BsSliders2 size={20} />,
        IoMdPerson: <TbWorldStar size={20} />,
        LiaDonateSolid: <LiaDonateSolid size={20} />,
        RiCustomerServiceLine: <RiCustomerServiceLine size={20} />,
        HiOutlineShoppingBag: <HiOutlineShoppingBag size={20} />,
        RiRefund2Fill: <RiRefund2Fill size={20} />,
        LuPlusSquare: <LuPlusSquare size={20} />,
        LuCopyPlus: <LuCopyPlus size={20} />,
        MdOutlineShoppingCartCheckout: <MdOutlineShoppingCartCheckout size={20} />,
        MdOutlineCampaign: <MdOutlineCampaign size={20} />,
        TbMapDiscount: <TbMapDiscount size={20} />,
        RiShieldUserLine: <RiShieldUserLine size={20} />,
        FiMessageCircle: <FiMessageCircle size={20} />,
    };


    const formatToKebabCase = (text) => {
        return text.toLowerCase().replace(/ /g, "-");
    };

    const getChipColorAndValue = (name, subFeatureName) => {
        if (name === "Orders") {
            const colorMap = {
                All: "teal",
                Pending: "teal",
                Confirmed: "teal",
                Packaging: "amber",
                "Out For Delivery": "amber",
                Delivered: "green",
                Returned: "red",
                "Failed To Deliver": "red",
                Canceled: "red",
            };
            return {
                color: colorMap[subFeatureName] || "gray",
                value: subFeatureName === "All" ? orders.length : getOrderCount(formatToKebabCase(subFeatureName)),
            };
        }

        if (name === "Refund Request") {
            const colorMap = {
                Pending: "pink",
                Approved: "teal",
                Refunded: "green",
                Rejected: "red",
            };
            return {
                color: colorMap[subFeatureName] || "gray",
                value: getRefundOrderCount(subFeatureName.toLowerCase()),
            };
        }

        return null;
    };

    const renderSubFeatures = (name, subFeatures) => {
        return subFeatures.map((subFeature, index) => {
            const chipData = getChipColorAndValue(name, subFeature.name);

            return (
                <Link to={subFeature.path} key={index}>
                    <ListItem>
                        <ListItemPrefix>
                            <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                        </ListItemPrefix>
                        {subFeature.name}

                        {chipData && (
                            <ListItemSuffix>
                                <Chip
                                    value={chipData.value}
                                    size="sm"
                                    variant="ghost"
                                    color={chipData.color}
                                    className="rounded-full"
                                />
                            </ListItemSuffix>
                        )}
                    </ListItem>
                </Link>
            );
        });
    };

    return (
        <Card className="h-screen rounded-none shadow p-4 overflow-y-auto">
            <div className="mb-2">
                <Link to="/"><img src={logoData?.logo} alt="brand" className="w-[150px] h-[70px] object-cover mx-auto" /></Link>
            </div>
            <hr className="border-blue-gray-50" />

            <List>
                {adminData?.role?.featurePermissions?.sort((a, b) => a.index - b.index).map((feature) => {

                    const IconComponent = iconMapping[feature.sidebarIcon];

                    if (feature.subFeatures?.length > 0) {
                        return (
                            <Accordion
                                key={feature.index}
                                open={open === feature.index}
                                icon={
                                    <ChevronDownIcon
                                        strokeWidth={2.5}
                                        className={`mx-auto h-4 w-4 transition-transform ${open === feature.index ? "rotate-180" : ""}`}
                                    />
                                }
                            >
                                <ListItem className="p-0" selected={open === feature.index}>
                                    <AccordionHeader onClick={() => handleOpen(feature.index)} className="border-b-0 p-3">
                                        <ListItemPrefix>{IconComponent}</ListItemPrefix>
                                        <Typography color="blue-gray" className="mr-auto font-normal font-serif">
                                            {feature.name}
                                        </Typography>
                                    </AccordionHeader>
                                </ListItem>
                                <AccordionBody className="py-1">
                                    <List className="p-0 font-serif">{renderSubFeatures(feature.name, feature.subFeatures)}</List>
                                </AccordionBody>
                            </Accordion>
                        );
                    }

                    return (
                        <Link to={feature.path} key={feature.index}>
                            <ListItem className="font-serif">
                                <ListItemPrefix>{IconComponent}</ListItemPrefix>
                                {feature.name}
                                {(feature?.name === "Subscriptions" || feature?.name === "Messages") && (
                                    <ListItemSuffix>
                                        <Chip
                                            value={feature?.name === "Subscriptions" ? subscriptions?.length : messages?.length}
                                            size="sm"
                                            variant="ghost"
                                            color="teal"
                                            className="rounded-full"
                                        />
                                    </ListItemSuffix>
                                )}
                            </ListItem>
                        </Link>
                    );
                })}

                <hr className="border-blue-gray-50" />
                <ListItem onClick={handleLogOut} className="font-serif">
                    <ListItemPrefix>
                        <PowerIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    Log Out
                </ListItem>
            </List>
        </Card>
    );
};

export default Sidebar;