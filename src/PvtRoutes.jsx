import { Outlet, Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const PvtRoutes = () => {
  let auth = Cookies.get('access-token')
  return auth ? <Outlet /> : <Navigate to="/login" />
}

export default PvtRoutes