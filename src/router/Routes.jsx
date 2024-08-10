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
import ProfilePersonalInfo from "../pages/Profile/ProfilePersonalInfo/ProfilePersonalInfo";
import ProfileOrders from "../pages/Profile/ProfileOrders/ProfileOrders";
import ProfileAddress from "../pages/Profile/ProfileAddress/ProfileAddress";
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

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: "/",
                element: <Home />
            },
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
                path: "personal-info",
                element: <ProfilePersonalInfo />
            },
            {
                path: "orders",
                element: <ProfileOrders />
            },
            {
                path: "address",
                element: <ProfileAddress />
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
            // Website Content
            {
                path: "banner-management",
                element: <BannerManagement />
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
            // Users
            {
                path: "create-role",
                element: <CreateRole />
            },
            {
                path: "all-roles",
                element: <AllRoles />
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
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/register",
        element: <Register />
    }
]);

export default router;