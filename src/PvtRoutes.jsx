import { Outlet, Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const PvtRoutes = () => {
  let auth = Cookies.get('access-token')
  //temp until vercel domain gets whitelist
  // return auth ? <Outlet /> : <Navigate to="/login" />

  return <Outlet />
}

export default PvtRoutes