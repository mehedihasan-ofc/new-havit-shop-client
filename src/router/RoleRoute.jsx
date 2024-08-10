import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import useRole from "../hooks/useRole";
import MySpinner from "../components/Shared/MySpinner/MySpinner";

const RoleRoute = ({children}) => {
    
    const { user, loading } = useContext(AuthContext);
    const [role, roleLoading] = useRole();
    const location = useLocation();

    if(loading || roleLoading) {
        return <MySpinner />
    }

    if(user && role) {
        return children;
    }
    
    return <Navigate to="/login" state={{ from: location }} replace />;
};

export default RoleRoute;