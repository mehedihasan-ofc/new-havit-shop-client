import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import Home from "../pages/Home/Home/Home";
import TermsConditions from "../pages/Static/TermsConditions/TermsConditions";
import PrivacyPolicy from "../pages/Static/PrivacyPolicy/PrivacyPolicy";
import ReturnPolicy from "../pages/Static/ReturnPolicy/ReturnPolicy";
import FAQ from "../pages/Static/FAQ/FAQ";
import Contact from "../pages/Static/Contact/Contact";
import About from "../pages/Static/About/About";
import Error from "../pages/Static/Error/Error";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";
import OurBlog from "../pages/Static/OurBlog/OurBlog";
import ReadBlog from "../pages/Static/ReadBlog/ReadBlog";
import DashboardHome from "../pages/Dashboard/DashboardHome/DashboardHome";
import BannerManagement from "../pages/Dashboard/WebsiteContent/BannerManagement/BannerManagement";
import AdsManagement from "../pages/Dashboard/WebsiteContent/AdsManagement/AdsManagement";
import BlogManagement from "../pages/Dashboard/WebsiteContent/BlogManagement/BlogManagement";
import ProfileLayout from "../layouts/ProfileLayout";
import ProfileDashboard from "../pages/Profile/ProfileDashboard/ProfileDashboard";
import ProfileOrders from "../pages/Profile/ProfileOrders/ProfileOrders";
import PrivateRoute from "./PrivateRoute";
import Customers from "../pages/Dashboard/Users/Customers/Customers";
import AllRoles from "../pages/Dashboard/Users/AllRoles/AllRoles";
import CreateRole from "../pages/Dashboard/Users/CreateRole/CreateRole";
import RoleRoute from "./RoleRoute";
import CreateBlog from "../pages/Dashboard/WebsiteContent/BlogManagement/CreateBlog";
import Subscriptions from "../pages/Dashboard/Subscriptions/Subscriptions";
import Messages from "../pages/Dashboard/Messages/Messages";
import NewCategory from "../pages/Dashboard/Category/NewCategory/NewCategory";
import CategoryList from "../pages/Dashboard/Category/CategoryList/CategoryList";
import NewSubcategory from "../pages/Dashboard/Subcategory/NewSubcategory/NewSubcategory";
import SubcategoryList from "../pages/Dashboard/Subcategory/SubcategoryList/SubcategoryList";
import AddProduct from "../pages/Dashboard/Ecommerce/AddProduct/AddProduct";
import ProductList from "../pages/Dashboard/Ecommerce/ProductList/ProductList";
import AllCategories from "../pages/AllCategories/AllCategories";
import ProductsByCategory from "../pages/ProductsByCategory/ProductsByCategory";
import ProductDetails from "../pages/ProductDetails/ProductDetails";
import AllProducts from "../pages/AllProducts/AllProducts";
import ViewCart from "../pages/ViewCart/ViewCart";
import Checkout from "../pages/Checkout/Checkout";
import PromoCodes from "../pages/Dashboard/PromoCodes/PromoCodes";
import BkashPayment from "../pages/BkashPayment/BkashPayment";
import OrderSuccess from "../pages/OrderSuccess/OrderSuccess";
import BreakingText from "../pages/Dashboard/WebsiteContent/BreakingText/BreakingText";
import ProfileOrderDetails from "../pages/Profile/ProfileOrderDetails/ProfileOrderDetails";
import ProfileTrackOrder from "../pages/Profile/ProfileTrackOrder/ProfileTrackOrder";
import BillingDetails from "../pages/Profile/BillingDetails/BillingDetails";
import ProfileAddress from "../pages/Profile/ProfileAddress/ProfileAddress";
import Welcome from "../pages/Dashboard/WebsiteContent/Welcome/Welcome";
import NocManagement from "../pages/Dashboard/WebsiteContent/NocManagement/NocManagement";
import SearchResults from "../pages/SearchResults/SearchResults";
import DiscountedProducts from "../pages/DiscountedProducts/DiscountedProducts";
import Logo from "../pages/Dashboard/ProfileSettings/Logo/Logo";
import ContactInfo from "../pages/Dashboard/ProfileSettings/ContactInfo/ContactInfo";
import SocialMedia from "../pages/Dashboard/ProfileSettings/SocialMedia/SocialMedia";
import AboutUs from "../pages/Dashboard/ProfileSettings/AboutUs/AboutUs";
import ProductEdit from "../pages/Dashboard/Ecommerce/ProductEdit/ProductEdit";
import CreateCampaign from "../pages/Dashboard/CampaignBuilder/CreateCampaign/CreateCampaign";
import CampaignDetails from "../pages/Dashboard/CampaignBuilder/CampaignDetails/CampaignDetails";
import AllOrders from "../pages/Dashboard/Orders/AllOrders/AllOrders";
import PendingOrders from "../pages/Dashboard/Orders/PendingOrders/PendingOrders";
import ConfirmedOrders from "../pages/Dashboard/Orders/ConfirmedOrders/ConfirmedOrders";
import PackagingOrders from "../pages/Dashboard/Orders/PackagingOrders/PackagingOrders";
import OutForDeliveryOrders from "../pages/Dashboard/Orders/OutForDeliveryOrders/OutForDeliveryOrders";
import DeliveredOrders from "../pages/Dashboard/Orders/DeliveredOrders/DeliveredOrders";
import ReturnedOrders from "../pages/Dashboard/Orders/ReturnedOrders/ReturnedOrders";
import FailedToDeliverOrders from "../pages/Dashboard/Orders/FailedToDeliverOrders/FailedToDeliverOrders";
import CanceledOrders from "../pages/Dashboard/Orders/CanceledOrders/CanceledOrders";
import RoleAssignment from "../pages/Dashboard/Users/RoleAssignment/RoleAssignment";
import CampaignEdit from "../pages/Dashboard/CampaignBuilder/CampaignEdit/CampaignEdit";
import RefundPending from "../pages/Dashboard/RefundRequest/RefundPending/RefundPending";
import RefundApproved from "../pages/Dashboard/RefundRequest/RefundApproved/RefundApproved";
import RefundRefunded from "../pages/Dashboard/RefundRequest/RefundRefunded/RefundRefunded";
import RefundRejected from "../pages/Dashboard/RefundRequest/RefundRejected/RefundRejected";
import OrderDetails from "../pages/Dashboard/Orders/OrderDetails/OrderDetails";
import ProfileMyReturns from "../pages/Profile/ProfileMyReturns/ProfileMyReturns";
import ProfileCancellations from "../pages/Profile/ProfileCancellations/ProfileCancellations";
import RefundOrderDetails from "../pages/Dashboard/RefundRequest/RefundOrderDetails/RefundOrderDetails";
import RoleDetails from "../pages/Dashboard/Users/RoleDetails/RoleDetails";
import Donation from "../pages/Dashboard/Donation/Donation";
import CustomOrder from "../pages/Dashboard/CustomOrder/CustomOrder";
import AddNewOrder from "../pages/Dashboard/CustomOrder/AddNewOrder";
import CustomOrderConfirm from "../pages/Dashboard/CustomOrder/CustomOrderConfirm";
import SingleCustomOrderDetails from "../pages/Dashboard/CustomOrder/SingleCustomOrderDetails";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            // ============================================>
            {
                path: "/search",
                element: <SearchResults />
            },
            {
                path: "/categories/all",
                element: <AllCategories />
            },
            {
                path: "/discounted-products",
                element: <DiscountedProducts />
            },
            {
                path: "/products/all",
                element: <AllProducts />
            },
            {
                path: "/products/categories/:categoryId",
                element: <ProductsByCategory />
            },
            {
                path: "/products/product-details/:productId",
                element: <ProductDetails />
            },
            {
                path: "/view-cart",
                element: <ViewCart />
            },
            {
                path: "/checkout",
                element: <Checkout />
            },
            {
                path: "/bkash-payment",
                element: <BkashPayment />
            },
            {
                path: "/order-success",
                element: <OrderSuccess />
            },
            // ===============================================================================
            // Static
            {
                path: "/terms-conditions",
                element: <TermsConditions />
            },
            {
                path: "/privacy-policy",
                element: <PrivacyPolicy />
            },
            {
                path: "/return-policy",
                element: <ReturnPolicy />
            },
            {
                path: "/faq",
                element: <FAQ />
            },
            {
                path: "/contact",
                element: <Contact />
            },
            {
                path: "/about",
                element: <About />
            },
            {
                path: "/our-blog",
                element: <OurBlog />
            },
            {
                path: "/read-blog/:id",
                element: <ReadBlog />
            },
            {
                path: "*",
                element: <Error />
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/register",
                element: <Register />
            }
        ]
    },
    {
        path: "/profile",
        element: <PrivateRoute><ProfileLayout /></PrivateRoute>,
        children: [
            {
                path: "*",
                element: <Error />
            },
            {
                path: "dashboard",
                element: <ProfileDashboard />
            },
            {
                path: "orders",
                element: <ProfileOrders />
            },
            {
                path: "order-details/:id",
                element: <ProfileOrderDetails />
            },
            {
                path: "my-returns",
                element: <ProfileMyReturns />
            },
            {
                path: "my-cancellations",
                element: <ProfileCancellations />
            },
            {
                path: "track-order",
                element: <ProfileTrackOrder />
            },
            {
                path: "billing-details",
                element: <ProfileAddress />
            },
            {
                path: "my-address",
                element: <BillingDetails />
            }
        ]
    },
    {
        path: "/dashboard",
        element: <RoleRoute><DashboardLayout /></RoleRoute>,
        children: [
            // Error
            {
                path: "*",
                element: <Error />
            },
            // Dashboard Home
            {
                path: "dashboard-home",
                element: <DashboardHome />
            },
            // Profile Settings
            {
                path: "logo",
                element: <Logo />
            },
            {
                path: "contact-info",
                element: <ContactInfo />
            },
            {
                path: "social-media",
                element: <SocialMedia />
            },
            {
                path: "about-us",
                element: <AboutUs />
            },
            // Website Content
            {
                path: "banner-management",
                element: <BannerManagement />
            },
            {
                path: "noc-management",
                element: <NocManagement />
            },
            {
                path: "ads-management",
                element: <AdsManagement />
            },
            {
                path: "blog-management",
                element: <BlogManagement />
            },
            {
                path: "create-blog",
                element: <CreateBlog />
            },
            {
                path: "breaking-text",
                element: <BreakingText />
            },
            {
                path: "welcome-modal",
                element: <Welcome />
            },
            // donation
            {
                path: "donation",
                element: <Donation />
            },
            // CUSTOM ORDER MANAGEMENT
            {
                path: "custom-order",
                element: <CustomOrder />
            },
            {
                path: "add-custom-order",
                element: <AddNewOrder />
            },
            {
                path: "confirm-custom-order",
                element: <CustomOrderConfirm />
            },
            {
                path: "single-custom-order-details/:id",
                element: <SingleCustomOrderDetails />
            },
            // ORDER MANAGEMENT
            {
                path: "orders/all",
                element: <AllOrders />
            },
            {
                path: "orders/pending",
                element: <PendingOrders />
            },
            {
                path: "orders/confirmed",
                element: <ConfirmedOrders />
            },
            {
                path: "orders/packaging",
                element: <PackagingOrders />
            },
            {
                path: "orders/out-for-delivery",
                element: <OutForDeliveryOrders />
            },
            {
                path: "orders/delivered",
                element: <DeliveredOrders />
            },
            {
                path: "orders/returned",
                element: <ReturnedOrders />
            },
            {
                path: "orders/failed-to-deliver",
                element: <FailedToDeliverOrders />
            },
            {
                path: "orders/canceled",
                element: <CanceledOrders />
            },
            {
                path: "order-details/:id",
                element: <OrderDetails />
            },
            // Refund
            {
                path: "refund-pending",
                element: <RefundPending />
            },
            {
                path: "refund-approved",
                element: <RefundApproved />
            },
            {
                path: "refund-refunded",
                element: <RefundRefunded />
            },
            {
                path: "refund-rejected",
                element: <RefundRejected />
            },
            {
                path: "refund-order-details/:id",
                element: <RefundOrderDetails />
            },
            // Category
            {
                path: "new-category",
                element: <NewCategory />
            },
            {
                path: "category-list",
                element: <CategoryList />
            },
            // Subcategory
            {
                path: "new-subcategory",
                element: <NewSubcategory />
            },
            {
                path: "subcategory-list",
                element: <SubcategoryList />
            },
            // Ecommerce
            {
                path: "add-new-product",
                element: <AddProduct />
            },
            {
                path: "product-list",
                element: <ProductList />
            },
            {
                path: "product-edit/:id",
                element: <ProductEdit />
            },
            {
                path: "campaign-details",
                element: <CampaignDetails />
            },
            {
                path: "create-campaign",
                element: <CreateCampaign />
            },
            {
                path: "campaign-edit/:id",
                element: <CampaignEdit />
            },
            // promo codes
            {
                path: "promo-codes",
                element: <PromoCodes />
            },
            // Users
            {
                path: "all-roles",
                element: <AllRoles />
            },
            {
                path: "role-details/:id",
                element: <RoleDetails />
            },
            {
                path: "create-role",
                element: <CreateRole />
            },
            {
                path: "role-assignment",
                element: <RoleAssignment />
            },
            {
                path: "customers",
                element: <Customers />
            },
            // subscriptions
            {
                path: "subscriptions",
                element: <Subscriptions />
            },
            {
                path: "messages",
                element: <Messages />
            }
        ]
    }
]);

export default router;