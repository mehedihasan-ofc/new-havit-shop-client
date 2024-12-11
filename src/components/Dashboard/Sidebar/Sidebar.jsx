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
import useRole from "../../../hooks/useRole";
import useSubscriptions from "../../../hooks/useSubscriptions";
import useMessages from "../../../hooks/useMessages";
import { AuthContext } from "../../../provider/AuthProvider";
import Swal from "sweetalert2";
import { BsSliders2 } from "react-icons/bs";
import useLogo from "../../../hooks/useLogo";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { RiRefund2Fill, RiShieldUserLine } from "react-icons/ri";

const Sidebar = () => {

    const [logoData] = useLogo();
    // const [role] = useRole();

    const { user, logOut } = useContext(AuthContext);
    const token = localStorage.getItem('access-token');
    const [axiosSecure] = useAxiosSecure();

    const [subscriptions] = useSubscriptions();
    const [messages] = useMessages();
    const [open, setOpen] = useState(0);

    const { data: orders = [] } = useQuery({
        queryKey: ['orders', user?.email],
        enabled: !!user?.email && !!token,
        queryFn: async () => {
            const res = await axiosSecure(`https://server.havitshopbd.com/orders/all`);
            return res.data;
        },
    });

    // Group orders by status
    const orderCounts = orders.reduce((counts, order) => {
        counts[order.deliveryStatus] = (counts[order.deliveryStatus] || 0) + 1;
        return counts;
    }, {});

    // Get count for a specific status
    const getOrderCount = (status) => orderCounts[status] || 0;

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
                    .catch(err => console.log(err.message));
            }
        });
    }

    return (
        <Card className="h-screen rounded-none shadow p-4 overflow-y-auto">

            <div className="mb-2">
                <Link to="/"><img src={logoData?.logo} alt="brand" className="w-[150px] h-[70px] object-cover mx-auto" /></Link>
            </div>

            <hr className="border-blue-gray-50" />

            <List>

                <Link to="dashboard-home">
                    <ListItem>
                        <ListItemPrefix>
                            <LuLayoutDashboard size={20} />
                        </ListItemPrefix>
                        Dashboard
                    </ListItem>
                </Link>

                <Accordion
                    open={open === 6}
                    icon={
                        <ChevronDownIcon
                            strokeWidth={2.5}
                            className={`mx-auto h-4 w-4 transition-transform ${open === 6 ? "rotate-180" : ""}`}
                        />
                    }
                >
                    <ListItem className="p-0" selected={open === 6}>
                        <AccordionHeader onClick={() => handleOpen(6)} className="border-b-0 p-3">
                            <ListItemPrefix>
                                <BsSliders2 size={20} />
                            </ListItemPrefix>
                            <Typography color="blue-gray" className="mr-auto font-normal">
                                Profile Settings
                            </Typography>
                        </AccordionHeader>
                    </ListItem>
                    <AccordionBody className="py-1">
                        <List className="p-0">

                            <Link to="logo">
                                <ListItem>
                                    <ListItemPrefix>
                                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                    </ListItemPrefix>
                                    Logo
                                </ListItem>
                            </Link>

                            <Link to="contact-info">
                                <ListItem>
                                    <ListItemPrefix>
                                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                    </ListItemPrefix>
                                    Contact Info
                                </ListItem>
                            </Link>

                            <Link to="social-media">
                                <ListItem>
                                    <ListItemPrefix>
                                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                    </ListItemPrefix>
                                    Social Media
                                </ListItem>
                            </Link>

                            <Link to="about-us">
                                <ListItem>
                                    <ListItemPrefix>
                                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                    </ListItemPrefix>
                                    About Us
                                </ListItem>
                            </Link>

                        </List>
                    </AccordionBody>
                </Accordion>


                <Accordion
                    open={open === 1}
                    icon={
                        <ChevronDownIcon
                            strokeWidth={2.5}
                            className={`mx-auto h-4 w-4 transition-transform ${open === 1 ? "rotate-180" : ""}`}
                        />
                    }
                >
                    <ListItem className="p-0" selected={open === 1}>
                        <AccordionHeader onClick={() => handleOpen(1)} className="border-b-0 p-3">
                            <ListItemPrefix>
                                <TbWorldStar size={20} />
                            </ListItemPrefix>
                            <Typography color="blue-gray" className="mr-auto font-normal">
                                Website Content
                            </Typography>
                        </AccordionHeader>
                    </ListItem>
                    <AccordionBody className="py-1">
                        <List className="p-0">

                            <Link to="banner-management">
                                <ListItem>
                                    <ListItemPrefix>
                                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                    </ListItemPrefix>
                                    Banner Management
                                </ListItem>
                            </Link>

                            <Link to="noc-management">
                                <ListItem>
                                    <ListItemPrefix>
                                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                    </ListItemPrefix>
                                    NOC Management
                                </ListItem>
                            </Link>

                            <Link to="ads-management">
                                <ListItem>
                                    <ListItemPrefix>
                                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                    </ListItemPrefix>
                                    Ads Management
                                </ListItem>
                            </Link>

                            <Link to="blog-management">
                                <ListItem>
                                    <ListItemPrefix>
                                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                    </ListItemPrefix>
                                    Blog Management
                                </ListItem>
                            </Link>

                            <Link to="breaking-text">
                                <ListItem>
                                    <ListItemPrefix>
                                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                    </ListItemPrefix>
                                    Breaking Text
                                </ListItem>
                            </Link>

                            <Link to="welcome-modal">
                                <ListItem>
                                    <ListItemPrefix>
                                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                    </ListItemPrefix>
                                    Welcome Modal
                                </ListItem>
                            </Link>

                        </List>
                    </AccordionBody>
                </Accordion>

                <hr className="border-blue-gray-50" />

                <Accordion
                    open={open === 8}
                    icon={
                        <ChevronDownIcon
                            strokeWidth={2.5}
                            className={`mx-auto h-4 w-4 transition-transform ${open === 8 ? "rotate-180" : ""}`}
                        />
                    }
                >
                    <ListItem className="p-0" selected={open === 8}>
                        <AccordionHeader onClick={() => handleOpen(8)} className="border-b-0 p-3">
                            <ListItemPrefix>
                                <HiOutlineShoppingBag size={20} />
                            </ListItemPrefix>
                            <Typography color="blue-gray" className="mr-auto font-normal">
                                Orders
                            </Typography>
                        </AccordionHeader>
                    </ListItem>
                    <AccordionBody className="py-1">
                        <List className="p-0">

                            <Link to="orders/all">
                                <ListItem>
                                    <ListItemPrefix>
                                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                    </ListItemPrefix>
                                    All
                                    <ListItemSuffix>
                                        <Chip value={orders.length} size="sm" variant="ghost" color="teal" className="rounded-full" />
                                    </ListItemSuffix>
                                </ListItem>
                            </Link>

                            <Link to="orders/pending">
                                <ListItem>
                                    <ListItemPrefix>
                                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                    </ListItemPrefix>
                                    Pending
                                    <ListItemSuffix>
                                        <Chip value={getOrderCount('pending')} size="sm" variant="ghost" color="teal" className="rounded-full" />
                                    </ListItemSuffix>
                                </ListItem>
                            </Link>

                            <Link to="orders/confirmed">
                                <ListItem>
                                    <ListItemPrefix>
                                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                    </ListItemPrefix>
                                    Confirmed
                                    <ListItemSuffix>
                                        <Chip value={getOrderCount('confirmed')} size="sm" variant="ghost" color="teal" className="rounded-full" />
                                    </ListItemSuffix>
                                </ListItem>
                            </Link>

                            <Link to="orders/packaging">
                                <ListItem>
                                    <ListItemPrefix>
                                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                    </ListItemPrefix>
                                    Packaging
                                    <ListItemSuffix>
                                        <Chip value={getOrderCount('packaging')} size="sm" variant="ghost" color="amber" className="rounded-full" />
                                    </ListItemSuffix>
                                </ListItem>
                            </Link>

                            <Link to="orders/out-for-delivery">
                                <ListItem>
                                    <ListItemPrefix>
                                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                    </ListItemPrefix>
                                    Out For Delivery
                                    <ListItemSuffix>
                                        <Chip value={getOrderCount('out-for-delivery')} size="sm" variant="ghost" color="amber" className="rounded-full" />
                                    </ListItemSuffix>
                                </ListItem>
                            </Link>

                            <Link to="orders/delivered">
                                <ListItem>
                                    <ListItemPrefix>
                                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                    </ListItemPrefix>
                                    Delivered
                                    <ListItemSuffix>
                                        <Chip value={getOrderCount('delivered')} size="sm" variant="ghost" color="green" className="rounded-full" />
                                    </ListItemSuffix>
                                </ListItem>
                            </Link>

                            <Link to="orders/returned">
                                <ListItem>
                                    <ListItemPrefix>
                                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                    </ListItemPrefix>
                                    Returned
                                    <ListItemSuffix>
                                        <Chip value={getOrderCount('returned')} size="sm" variant="ghost" color="red" className="rounded-full" />
                                    </ListItemSuffix>
                                </ListItem>
                            </Link>

                            <Link to="orders/failed-to-deliver">
                                <ListItem>
                                    <ListItemPrefix>
                                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                    </ListItemPrefix>
                                    Failed To Deliver
                                    <ListItemSuffix>
                                        <Chip value={getOrderCount('failed-to-deliver')} size="sm" variant="ghost" color="red" className="rounded-full" />
                                    </ListItemSuffix>
                                </ListItem>
                            </Link>

                            <Link to="orders/canceled">
                                <ListItem>
                                    <ListItemPrefix>
                                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                    </ListItemPrefix>
                                    Canceled
                                    <ListItemSuffix>
                                        <Chip value={getOrderCount('canceled')} size="sm" variant="ghost" color="red" className="rounded-full" />
                                    </ListItemSuffix>
                                </ListItem>
                            </Link>
                        </List>
                    </AccordionBody>
                </Accordion>

                <Accordion
                    open={open === 9}
                    icon={
                        <ChevronDownIcon
                            strokeWidth={2.5}
                            className={`mx-auto h-4 w-4 transition-transform ${open === 9 ? "rotate-180" : ""}`}
                        />
                    }
                >
                    <ListItem className="p-0" selected={open === 9}>
                        <AccordionHeader onClick={() => handleOpen(9)} className="border-b-0 p-3">
                            <ListItemPrefix>
                                <RiRefund2Fill size={20} />
                            </ListItemPrefix>
                            <Typography color="blue-gray" className="mr-auto font-normal">
                                Refund Request
                            </Typography>
                        </AccordionHeader>
                    </ListItem>
                    <AccordionBody className="py-1">
                        <List className="p-0">

                            <Link to="refund-pending">
                                <ListItem>
                                    <ListItemPrefix>
                                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                    </ListItemPrefix>
                                    Pending
                                    <ListItemSuffix>
                                        <Chip value="14" size="sm" variant="ghost" color="pink" className="rounded-full" />
                                    </ListItemSuffix>
                                </ListItem>
                            </Link>

                            <Link to="refund-approved">
                                <ListItem>
                                    <ListItemPrefix>
                                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                    </ListItemPrefix>
                                    Approved
                                    <ListItemSuffix>
                                        <Chip value="14" size="sm" variant="ghost" color="teal" className="rounded-full" />
                                    </ListItemSuffix>
                                </ListItem>
                            </Link>

                            <Link to="refund-refunded">
                                <ListItem>
                                    <ListItemPrefix>
                                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                    </ListItemPrefix>
                                    Refunded
                                    <ListItemSuffix>
                                        <Chip value="14" size="sm" variant="ghost" color="green" className="rounded-full" />
                                    </ListItemSuffix>
                                </ListItem>
                            </Link>

                            <Link to="refund-rejected">
                                <ListItem>
                                    <ListItemPrefix>
                                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                    </ListItemPrefix>
                                    Rejected
                                    <ListItemSuffix>
                                        <Chip value="14" size="sm" variant="ghost" color="red" className="rounded-full" />
                                    </ListItemSuffix>
                                </ListItem>
                            </Link>
                        </List>
                    </AccordionBody>
                </Accordion>

                <Accordion
                    open={open === 3}
                    icon={
                        <ChevronDownIcon
                            strokeWidth={2.5}
                            className={`mx-auto h-4 w-4 transition-transform ${open === 3 ? "rotate-180" : ""}`}
                        />
                    }
                >
                    <ListItem className="p-0" selected={open === 3}>
                        <AccordionHeader onClick={() => handleOpen(3)} className="border-b-0 p-3">
                            <ListItemPrefix>
                                <LuPlusSquare size={20} />
                            </ListItemPrefix>
                            <Typography color="blue-gray" className="mr-auto font-normal">
                                Category
                            </Typography>
                        </AccordionHeader>
                    </ListItem>
                    <AccordionBody className="py-1">
                        <List className="p-0">

                            <Link to="new-category">
                                <ListItem>
                                    <ListItemPrefix>
                                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                    </ListItemPrefix>
                                    New Category
                                </ListItem>
                            </Link>

                            <Link to="category-list">
                                <ListItem>
                                    <ListItemPrefix>
                                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                    </ListItemPrefix>
                                    Category List
                                </ListItem>
                            </Link>
                        </List>
                    </AccordionBody>
                </Accordion>

                <Accordion
                    open={open === 4}
                    icon={
                        <ChevronDownIcon
                            strokeWidth={2.5}
                            className={`mx-auto h-4 w-4 transition-transform ${open === 4 ? "rotate-180" : ""}`}
                        />
                    }
                >
                    <ListItem className="p-0" selected={open === 4}>
                        <AccordionHeader onClick={() => handleOpen(4)} className="border-b-0 p-3">
                            <ListItemPrefix>
                                <LuCopyPlus size={20} />
                            </ListItemPrefix>
                            <Typography color="blue-gray" className="mr-auto font-normal">
                                Subcategory
                            </Typography>
                        </AccordionHeader>
                    </ListItem>
                    <AccordionBody className="py-1">
                        <List className="p-0">

                            <Link to="new-subcategory">
                                <ListItem>
                                    <ListItemPrefix>
                                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                    </ListItemPrefix>
                                    New Subcategory
                                </ListItem>
                            </Link>

                            <Link to="subcategory-list">
                                <ListItem>
                                    <ListItemPrefix>
                                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                    </ListItemPrefix>
                                    Subcategory List
                                </ListItem>
                            </Link>
                        </List>
                    </AccordionBody>
                </Accordion>

                <Accordion
                    open={open === 2}
                    icon={
                        <ChevronDownIcon
                            strokeWidth={2.5}
                            className={`mx-auto h-4 w-4 transition-transform ${open === 2 ? "rotate-180" : ""}`}
                        />
                    }
                >
                    <ListItem className="p-0" selected={open === 2}>
                        <AccordionHeader onClick={() => handleOpen(2)} className="border-b-0 p-3">
                            <ListItemPrefix>
                                <MdOutlineShoppingCartCheckout size={20} />
                            </ListItemPrefix>
                            <Typography color="blue-gray" className="mr-auto font-normal">
                                Products
                            </Typography>
                        </AccordionHeader>
                    </ListItem>
                    <AccordionBody className="py-1">
                        <List className="p-0">
                            <Link to="product-list">
                                <ListItem>
                                    <ListItemPrefix>
                                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                    </ListItemPrefix>
                                    Product List
                                </ListItem>
                            </Link>

                            <Link to="add-new-product">
                                <ListItem>
                                    <ListItemPrefix>
                                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                    </ListItemPrefix>
                                    Add New Product
                                </ListItem>
                            </Link>
                        </List>
                    </AccordionBody>
                </Accordion>

                <Accordion
                    open={open === 7}
                    icon={
                        <ChevronDownIcon
                            strokeWidth={2.5}
                            className={`mx-auto h-4 w-4 transition-transform ${open === 7 ? "rotate-180" : ""}`}
                        />
                    }
                >
                    <ListItem className="p-0" selected={open === 7}>
                        <AccordionHeader onClick={() => handleOpen(7)} className="border-b-0 p-3">
                            <ListItemPrefix>
                                <MdOutlineCampaign size={20} />
                            </ListItemPrefix>
                            <Typography color="blue-gray" className="mr-auto font-normal">
                                Campaign Builder
                            </Typography>
                        </AccordionHeader>
                    </ListItem>
                    <AccordionBody className="py-1">
                        <List className="p-0">

                            <Link to="campaign-details">
                                <ListItem>
                                    <ListItemPrefix>
                                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                    </ListItemPrefix>
                                    Campaign Details
                                </ListItem>
                            </Link>

                            <Link to="add-new-campaign-product">
                                <ListItem>
                                    <ListItemPrefix>
                                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                    </ListItemPrefix>
                                    Add New Product
                                </ListItem>
                            </Link>

                            <Link to="create-campaign">
                                <ListItem>
                                    <ListItemPrefix>
                                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                    </ListItemPrefix>
                                    Create Campaign
                                </ListItem>
                            </Link>

                        </List>
                    </AccordionBody>
                </Accordion>

                <Link to="promo-codes">
                    <ListItem>
                        <ListItemPrefix>
                            <TbMapDiscount size={20} />
                        </ListItemPrefix>
                        Promo Codes
                    </ListItem>
                </Link>

                <hr className="border-blue-gray-50" />

                <Accordion
                    open={open === 5}
                    icon={
                        <ChevronDownIcon
                            strokeWidth={2.5}
                            className={`mx-auto h-4 w-4 transition-transform ${open === 5 ? "rotate-180" : ""}`}
                        />
                    }
                >
                    <ListItem className="p-0" selected={open === 5}>
                        <AccordionHeader onClick={() => handleOpen(5)} className="border-b-0 p-3">
                            <ListItemPrefix>
                                <RiShieldUserLine size={20} />
                            </ListItemPrefix>
                            <Typography color="blue-gray" className="mr-auto font-normal">
                                Users
                            </Typography>
                        </AccordionHeader>
                    </ListItem>
                    <AccordionBody className="py-1">
                        <List className="p-0">

                            <Link to="all-roles">
                                <ListItem>
                                    <ListItemPrefix>
                                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                    </ListItemPrefix>
                                    All Roles
                                </ListItem>
                            </Link>

                            <Link to="create-role">
                                <ListItem>
                                    <ListItemPrefix>
                                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                    </ListItemPrefix>
                                    Create Role
                                </ListItem>
                            </Link>

                            <Link to="role-assignment">
                                <ListItem>
                                    <ListItemPrefix>
                                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                    </ListItemPrefix>
                                    Role Assignment
                                </ListItem>
                            </Link>

                            <hr className="border-blue-gray-50" />

                            <Link to="customers">
                                <ListItem>
                                    <ListItemPrefix>
                                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                    </ListItemPrefix>
                                    Customers
                                </ListItem>
                            </Link>
                        </List>
                    </AccordionBody>
                </Accordion>

                <Link to="subscriptions">
                    <ListItem>
                        <ListItemPrefix>
                            <HiOutlineShoppingBag size={20} />
                        </ListItemPrefix>
                        Subscriptions
                        <ListItemSuffix>
                            <Chip value={subscriptions?.length} size="sm" variant="ghost" color="teal" className="rounded-full" />
                        </ListItemSuffix>
                    </ListItem>
                </Link>

                <Link to="messages">
                    <ListItem>
                        <ListItemPrefix>
                            <FiMessageCircle size={20} />
                        </ListItemPrefix>
                        Messages
                        <ListItemSuffix>
                            <Chip value={messages?.length} size="sm" variant="ghost" color="teal" className="rounded-full" />
                        </ListItemSuffix>
                    </ListItem>
                </Link>

                <hr className="border-blue-gray-50" />

                <ListItem onClick={handleLogOut}>
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