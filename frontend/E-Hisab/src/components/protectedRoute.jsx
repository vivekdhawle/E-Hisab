import { Outlet } from "react-router";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";
const ProtectedRoute=()=>{
        const isLoggedIn=useSelector((state)=>state.auth.status)
        return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
}
export default ProtectedRoute;
